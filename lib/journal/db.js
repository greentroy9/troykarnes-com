import { createClient } from "@supabase/supabase-js";

// Server-side admin client. Never import this in client components.
let _client;
export function db() {
  if (!_client) {
    _client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      { auth: { persistSession: false } }
    );
  }
  return _client;
}

// Date string (YYYY-MM-DD) for "today" in a given IANA timezone.
export function todayInTz(tz = "America/Denver") {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: tz,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

// Deterministic prompt pick: same prompt all day for a given date.
export function hashString(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) >>> 0;
  return h;
}
