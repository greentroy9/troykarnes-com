import { NextResponse } from "next/server";

// Diagnostic: reports the health of journal env vars WITHOUT revealing them.
// Protected by the journal login (proxy.js).
const VARS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
  "ANTHROPIC_API_KEY",
  "JOURNAL_PASSWORD",
  "JOURNAL_SESSION_SECRET",
  "CRON_SECRET",
  "NEXT_PUBLIC_VAPID_PUBLIC_KEY",
  "VAPID_PRIVATE_KEY",
  "VAPID_SUBJECT",
];

export async function GET() {
  const report = {};
  for (const name of VARS) {
    const v = process.env[name];
    if (!v) {
      report[name] = "MISSING";
      continue;
    }
    // eslint-disable-next-line no-control-regex
    const clean = /^[\x20-\x7e]*$/.test(v);
    report[name] = clean
      ? `ok (${v.length} chars, starts "${v.slice(0, 4)}")`
      : `CORRUPTED — contains non-ASCII characters (${v.length} chars)`;
  }
  return NextResponse.json(report);
}
