export const metadata = {
  title: "About | Troy Karnes",
  description:
    "Cancer survivor, person in active recovery, author of No Silver Bullets, and the person who helps founders write the book they've been carrying.",
};

export default function About() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-32">
      <div className="text-[11px] uppercase tracking-[2.5px] text-accent font-[var(--font-ui)] font-semibold mb-6">
        About
      </div>
      <h1 className="font-[var(--font-display)] font-bold text-5xl leading-tight mb-6">
        About Troy
      </h1>
      <p className="font-[var(--font-ui)] text-xs uppercase tracking-[1.5px] text-foreground/50">
        Phase 1 scaffold. Full page content comes in Phase 2.
      </p>
    </section>
  );
}
