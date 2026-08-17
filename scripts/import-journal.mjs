// One-time import of historical HALT Journal data.
// Usage: node scripts/import-journal.mjs <path-to-journal-import.json>
// The JSON file is generated from the Google Sheets export and contains
// { entries: [...], prompts: [...] }. It holds personal data — keep it out of git.

import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

// Load .env.local (no dotenv dependency)
try {
  const envText = readFileSync(new URL("../.env.local", import.meta.url), "utf-8");
  for (const line of envText.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2];
  }
} catch {
  /* rely on ambient env */
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error("Missing Supabase env vars.");
  process.exit(1);
}
const supabase = createClient(url, key, { auth: { persistSession: false } });

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/import-journal.mjs <journal-import.json>");
  process.exit(1);
}
const { entries, prompts } = JSON.parse(readFileSync(file, "utf-8"));

async function main() {
  // Guard against double-import
  const { count } = await supabase
    .from("journal_entries")
    .select("id", { count: "exact", head: true });
  if (count > 0) {
    console.error(
      `journal_entries already has ${count} rows. Aborting to avoid duplicates.`
    );
    process.exit(1);
  }

  console.log(`Importing ${entries.length} entries…`);
  const BATCH = 50;
  for (let i = 0; i < entries.length; i += BATCH) {
    const batch = entries.slice(i, i + BATCH);
    let lastError;
    for (let attempt = 1; attempt <= 4; attempt++) {
      const { error } = await supabase.from("journal_entries").insert(batch);
      lastError = error;
      if (!error) break;
      await new Promise((r) => setTimeout(r, 1500 * attempt));
    }
    if (lastError) {
      console.error(`Batch at ${i} failed after retries:`, lastError.message);
      process.exit(1);
    }
    process.stdout.write(`  ${Math.min(i + BATCH, entries.length)}/${entries.length}\r`);
  }
  console.log("\nEntries done.");

  console.log(`Importing ${prompts.length} prompts…`);
  const { count: pcount } = await supabase
    .from("journal_prompts")
    .select("id", { count: "exact", head: true });
  if (pcount > 0) {
    console.log(`journal_prompts already has ${pcount} rows — skipping.`);
  } else {
    for (let i = 0; i < prompts.length; i += 200) {
      const { error } = await supabase
        .from("journal_prompts")
        .insert(prompts.slice(i, i + 200));
      if (error) {
        console.error(`Prompt batch at ${i} failed:`, error.message);
        process.exit(1);
      }
    }
    console.log("Prompts done.");
  }

  const { count: final } = await supabase
    .from("journal_entries")
    .select("id", { count: "exact", head: true });
  console.log(`✅ Import complete. journal_entries now has ${final} rows.`);
}

main();
