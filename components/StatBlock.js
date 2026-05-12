export default function StatBlock({ number, label }) {
  return (
    <div className="text-center px-6">
      <div className="font-[var(--font-display)] font-bold text-[48px] text-brand leading-none mb-3">
        {number}
      </div>
      <div className="text-[11px] uppercase tracking-[1.5px] text-foreground/70 font-medium">
        {label}
      </div>
    </div>
  );
}
