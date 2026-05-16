export const metadata = {
  title: "No Silver Bullets | Troy Karnes",
  description:
    "Built around the HALT framework (Hungry, Angry, Lonely, Tired), a book about the problems that don't go away.",
};

export default function Book() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-32">
      <div className="text-[11px] uppercase tracking-[2.5px] text-accent font-[var(--font-ui)] font-semibold mb-6">
        The Book
      </div>
      <h1 className="font-[var(--font-display)] font-bold text-5xl leading-tight mb-6">
        No Silver Bullets
      </h1>
      <p className="font-[var(--font-ui)] text-lg text-brand mb-10">
        Hungry. Angry. Lonely. Tired.
      </p>
      <p className="font-[var(--font-ui)] text-xs uppercase tracking-[1.5px] text-foreground/50">
        Phase 1 scaffold. Full page content comes in Phase 2.
      </p>
    </section>
  );
}
