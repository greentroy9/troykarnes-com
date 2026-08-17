import { NextResponse } from "next/server";
import webpush from "web-push";
import { db, todayInTz } from "@/lib/journal/db";

export const maxDuration = 60;

// Fired by Vercel cron at 16:00 and 17:00 UTC.
// Sends the 10am Mountain Time goal reminder exactly once per day —
// the handler checks that it is currently the 10 o'clock hour in Denver
// (one of the two UTC slots matches depending on daylight saving).
export async function GET(request) {
  const auth = request.headers.get("authorization");
  if (process.env.CRON_SECRET && auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const hourDenver = Number(
    new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Denver",
      hour: "numeric",
      hour12: false,
    }).format(new Date())
  );
  if (hourDenver !== 10) {
    return NextResponse.json({ skipped: true, hourDenver });
  }

  const today = todayInTz("America/Denver");
  const supabase = db();

  // Only send once per day.
  const { data: kv } = await supabase
    .from("journal_kv")
    .select("value")
    .eq("key", "last_reminder_date")
    .maybeSingle();
  if (kv?.value === today) {
    return NextResponse.json({ skipped: true, reason: "already sent" });
  }

  // Today's goal (from this morning's check-in) or yesterday's as fallback.
  const { data: entries } = await supabase
    .from("journal_entries")
    .select("entry_date, goal")
    .order("entry_date", { ascending: false })
    .order("created_at", { ascending: false })
    .limit(1);
  const latest = entries?.[0];

  let body;
  if (latest?.entry_date === today && latest.goal) {
    body = `Today's goal: ${latest.goal}`;
  } else if (latest?.goal) {
    body = `You haven't checked in yet. Yesterday's goal was: ${latest.goal}`;
  } else {
    body = "Time to check in with your journal.";
  }

  webpush.setVapidDetails(
    process.env.VAPID_SUBJECT,
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );

  const { data: subs } = await supabase
    .from("push_subscriptions")
    .select("id, subscription");

  let sent = 0;
  for (const row of subs || []) {
    try {
      await webpush.sendNotification(
        row.subscription,
        JSON.stringify({
          title: "HALT Journal 🎯",
          body,
          url: "/journal",
        })
      );
      sent++;
    } catch (err) {
      // 404/410 = subscription expired; clean it up.
      if (err.statusCode === 404 || err.statusCode === 410) {
        await supabase.from("push_subscriptions").delete().eq("id", row.id);
      }
    }
  }

  await supabase
    .from("journal_kv")
    .upsert({ key: "last_reminder_date", value: today });

  return NextResponse.json({ sent });
}
