"use client";
import { useEffect, useRef, useState } from "react";
import { AFFIRMATIONS } from "@/lib/journal/affirmations";

function localDate() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

const SCALE = [1, 2, 3, 4];
const WORKOUTS = [
  "Cardio",
  "Strength Training",
  "Yoga",
  "Swim",
  "Sauna",
  "Walk",
  "None",
  "Other",
];

// Pick a hype line you haven't seen recently. Tracks used indexes in
// localStorage so the whole pool cycles before anything repeats.
function pickAffirmation() {
  const KEY = "halt_affirmations_seen";
  let seen = [];
  try {
    seen = JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {}
  let unseen = AFFIRMATIONS.map((_, i) => i).filter((i) => !seen.includes(i));
  if (unseen.length === 0) {
    seen = [];
    unseen = AFFIRMATIONS.map((_, i) => i);
  }
  const idx = unseen[Math.floor(Math.random() * unseen.length)];
  try {
    localStorage.setItem(KEY, JSON.stringify([...seen, idx]));
  } catch {}
  return AFFIRMATIONS[idx];
}

// Sobriety date. The count is always computed from this, never from the last
// logged number, so a past typo can't carry forward.
const SOBER_START = "2021-04-20";

function soberDays(today) {
  return Math.round(
    (new Date(`${today}T12:00:00`) - new Date(`${SOBER_START}T12:00:00`)) /
      86400000
  );
}

function soberHint(today) {
  return `Since 4/20/2021 → today makes ${soberDays(today)}`;
}

function ScaleRow({ value, onChange, low, high }) {
  return (
    <div>
      <div className="flex gap-2">
        {SCALE.map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={`flex-1 py-3 rounded-lg border text-base font-semibold ${
              value === n
                ? "bg-brand text-white border-brand"
                : "bg-white border-divider text-ink/70"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="flex justify-between text-[11px] text-ink/50 mt-1">
        <span>{low}</span>
        <span>{high}</span>
      </div>
    </div>
  );
}

function Field({ label, hint, children }) {
  return (
    <div className="mb-5">
      <label className="block font-semibold text-sm mb-1.5">{label}</label>
      {hint && <p className="text-xs text-ink/50 mb-1.5 -mt-1">{hint}</p>}
      {children}
    </div>
  );
}

const inputCls =
  "w-full border border-divider rounded-lg px-3 py-2.5 bg-white text-base";

function Meal({ name, food, setFood, plan, setPlan }) {
  return (
    <div className="mb-5 p-3 bg-surface/50 rounded-xl">
      <label className="block font-semibold text-sm mb-1.5">{name}</label>
      <input
        type="text"
        value={food}
        onChange={(e) => setFood(e.target.value)}
        placeholder={`What did you eat?`}
        className={`${inputCls} mb-2`}
      />
      <p className="text-xs text-ink/50 mb-1.5">Was it on plan?</p>
      <ScaleRow value={plan} onChange={setPlan} low="Way off" high="On plan" />
    </div>
  );
}

export default function CheckInPage() {
  const [info, setInfo] = useState(null);
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [transcribing, setTranscribing] = useState(false);
  const [otherWorkout, setOtherWorkout] = useState("");
  const [workouts, setWorkouts] = useState([]);
  function toggleWorkout(w) {
    setWorkouts((cur) => {
      if (cur.includes(w)) return cur.filter((x) => x !== w);
      // "None" is exclusive
      if (w === "None") return ["None"];
      return [...cur.filter((x) => x !== "None"), w];
    });
  }
  const [affirmation, setAffirmation] = useState("");
  const fileRef = useRef(null);
  const date = localDate();

  const [f, setF] = useState({
    days_sober: String(soberDays(localDate())),
    sleep: null,
    mood: null,
    goal_accomplished: "",
    workout_type: "",
    workout_minutes: "",
    breakfast: "",
    breakfast_plan: null,
    lunch: "",
    lunch_plan: null,
    dinner: "",
    dinner_plan: null,
    snacks: "",
    snacks_plan: null,
    weight: "",
    goal: "",
    journal: "",
  });
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: v }));
  const setE = (k) => (e) => setF((s) => ({ ...s, [k]: e.target.value }));

  useEffect(() => {
    fetch(`/api/journal/today?date=${date}`)
      .then((r) => r.json())
      .then(setInfo)
      .catch(() => setInfo({}));
  }, [date]);

  async function transcribe(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setTranscribing(true);
    setError("");
    try {
      const buf = await file.arrayBuffer();
      let binary = "";
      const bytes = new Uint8Array(buf);
      for (let i = 0; i < bytes.length; i += 0x8000) {
        binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
      }
      const res = await fetch("/api/journal/transcribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: btoa(binary),
          media_type: file.type || "image/jpeg",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Transcription failed");
      setF((s) => ({
        ...s,
        journal: s.journal ? `${s.journal}\n\n${data.text}` : data.text,
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setTranscribing(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }

  async function save() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/journal/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...f,
          workout_type:
            workouts
              .map((w) =>
                w === "Other" && otherWorkout.trim() ? otherWorkout.trim() : w
              )
              .join(", ") || null,
          entry_date: date,
          prompt: info?.prompt ? `${info.prompt.theme}: ${info.prompt.prompt}` : null,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      setAffirmation(pickAffirmation());
      setSaved(true);
      window.scrollTo(0, 0);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  if (saved) {
    return (
      <div className="max-w-2xl mx-auto px-5 pt-20 text-center">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="font-[var(--font-display)] font-bold text-2xl mb-3">
          Day {f.days_sober || "logged"}. Done.
        </h1>
        <p className="text-lg font-[var(--font-body)] text-ink/80 leading-relaxed mb-8 max-w-sm mx-auto">
          {affirmation}
        </p>
        <a
          href="/journal/dashboard"
          className="inline-block bg-brand text-white rounded-lg px-6 py-3 font-semibold"
        >
          View dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-5 pt-6">
      <header className="mb-6">
        <h1 className="font-[var(--font-display)] font-bold text-2xl">
          Daily Check-in
        </h1>
        <p className="text-sm text-ink/60">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
        {info?.alreadyLogged && (
          <p className="mt-2 text-sm bg-surface rounded-lg px-3 py-2">
            You already checked in today. Saving again adds a second entry.
          </p>
        )}
      </header>

      <Field label="Days Sober" hint={soberHint(date)}>
        <input
          type="text"
          inputMode="numeric" pattern="[0-9]*"
          value={f.days_sober}
          onChange={setE("days_sober")}
          className={inputCls}
        />
      </Field>

      <Field label="How did you sleep?">
        <ScaleRow value={f.sleep} onChange={set("sleep")} low="Terrible" high="Great" />
      </Field>

      <Field label="How was your day yesterday?">
        <ScaleRow value={f.mood} onChange={set("mood")} low="Awful" high="Kick-ass" />
      </Field>

      <Field
        label="Did you accomplish yesterday's goal?"
        hint={info?.yesterday?.goal ? `Yesterday's goal: ${info.yesterday.goal}` : null}
      >
        <div className="flex gap-2">
          {["Yes", "No"].map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => set("goal_accomplished")(v)}
              className={`flex-1 py-3 rounded-lg border font-semibold ${
                f.goal_accomplished === v
                  ? "bg-brand text-white border-brand"
                  : "bg-white border-divider text-ink/70"
              }`}
            >
              {v}
            </button>
          ))}
        </div>
      </Field>

      <Field label="Yesterday's workout" hint="Tap everything you did.">
        <div className="grid grid-cols-2 gap-2">
          {WORKOUTS.map((w) => {
            const on = workouts.includes(w);
            return (
              <button
                key={w}
                type="button"
                onClick={() => toggleWorkout(w)}
                className={`py-2.5 rounded-lg border text-sm font-medium ${
                  on
                    ? "bg-brand text-white border-brand"
                    : "bg-white border-divider text-ink/70"
                }`}
              >
                {on ? "✓ " : ""}
                {w}
              </button>
            );
          })}
        </div>
        {workouts.includes("Other") && (
          <input
            type="text"
            value={otherWorkout}
            onChange={(e) => setOtherWorkout(e.target.value)}
            placeholder="What did you do?"
            autoFocus
            className={`${inputCls} mt-2`}
          />
        )}
      </Field>

      <Field label="How many minutes did you work out?">
        <input
          type="text"
          inputMode="numeric" pattern="[0-9]*"
          value={f.workout_minutes}
          onChange={setE("workout_minutes")}
          className={inputCls}
        />
      </Field>

      <Meal
        name="Breakfast"
        food={f.breakfast}
        setFood={(v) => set("breakfast")(v)}
        plan={f.breakfast_plan}
        setPlan={set("breakfast_plan")}
      />
      <Meal
        name="Lunch"
        food={f.lunch}
        setFood={(v) => set("lunch")(v)}
        plan={f.lunch_plan}
        setPlan={set("lunch_plan")}
      />
      <Meal
        name="Dinner"
        food={f.dinner}
        setFood={(v) => set("dinner")(v)}
        plan={f.dinner_plan}
        setPlan={set("dinner_plan")}
      />
      <Meal
        name="Snacks"
        food={f.snacks}
        setFood={(v) => set("snacks")(v)}
        plan={f.snacks_plan}
        setPlan={set("snacks_plan")}
      />

      <Field label="Today's weight">
        <input
          type="text"
          inputMode="decimal" pattern="[0-9.]*"
          value={f.weight}
          onChange={setE("weight")}
          className={inputCls}
        />
      </Field>

      <Field label="What's your goal today?">
        <input
          type="text"
          value={f.goal}
          onChange={setE("goal")}
          className={inputCls}
        />
      </Field>

      <div className="mb-5">
        <div className="flex items-start justify-between gap-3 mb-1.5">
          <label className="block font-semibold text-sm">Journal</label>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={transcribing}
            className="shrink-0 text-xs bg-surface border border-divider rounded-lg px-3 py-1.5 font-medium disabled:opacity-50"
          >
            {transcribing ? "Transcribing…" : "📷 From photo"}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={transcribe}
            className="hidden"
          />
        </div>
        {info?.prompt && (
          <p className="text-sm bg-surface/70 rounded-lg px-3 py-2 mb-2 font-[var(--font-body)]">
            <span className="font-semibold">{info.prompt.theme}:</span>{" "}
            {info.prompt.prompt}
          </p>
        )}
        <textarea
          value={f.journal}
          onChange={setE("journal")}
          rows={10}
          placeholder="Write…"
          className={`${inputCls} font-[var(--font-body)] leading-relaxed`}
        />
      </div>

      {error && <p className="text-accent text-sm mb-4">{error}</p>}

      <button
        type="button"
        onClick={save}
        disabled={busy}
        className="w-full bg-accent text-white rounded-xl py-4 font-bold text-lg mb-8 disabled:opacity-50"
      >
        {busy ? "Saving…" : "Save check-in"}
      </button>
    </div>
  );
}
