import { NextResponse } from "next/server";
import { db } from "@/lib/journal/db";

// POST — save a push subscription
export async function POST(request) {
  const sub = await request.json().catch(() => null);
  if (!sub?.endpoint) {
    return NextResponse.json({ error: "invalid subscription" }, { status: 400 });
  }
  // Upsert by endpoint: remove any existing row for this endpoint first.
  const supabase = db();
  await supabase
    .from("push_subscriptions")
    .delete()
    .eq("subscription->>endpoint", sub.endpoint);
  const { error } = await supabase
    .from("push_subscriptions")
    .insert({ subscription: sub });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

// DELETE — remove a subscription (turn reminders off on this device)
export async function DELETE(request) {
  const { endpoint } = await request.json().catch(() => ({}));
  if (!endpoint) {
    return NextResponse.json({ error: "endpoint required" }, { status: 400 });
  }
  await db()
    .from("push_subscriptions")
    .delete()
    .eq("subscription->>endpoint", endpoint);
  return NextResponse.json({ ok: true });
}
