export const metadata = {
  title: "The Hero's Draft — Book Coaching | Troy Karnes",
  description:
    "Six to nine months of structured book coaching for founders, executives, and consultants writing the book they've been carrying.",
};

export default function HerosDraft() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-32">
      <div className="text-[11px] uppercase tracking-[2.5px] text-accent font-[var(--font-ui)] font-semibold mb-6">
        Book Coaching
      </div>
      <h1 className="font-[var(--font-display)] font-bold text-5xl leading-tight mb-6">
        The Hero&apos;s Draft
      </h1>
      <p className="font-[var(--font-ui)] text-lg text-brand mb-10">
        You write the book. I guide you through it.
      </p>
      <p className="font-[var(--font-ui)] text-xs uppercase tracking-[1.5px] text-foreground/50">
        Phase 1 scaffold — full page content (EPIC framework, testimonials, CTA)
        comes in Phase 2.
      </p>
    </section>
  );
}
