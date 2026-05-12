export const metadata = {
  title: "Book Ghostwriting | Troy Karnes",
  description:
    "I write the book. You put your name on it. For leaders whose time is the binding constraint.",
};

export default function Ghostwriting() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-32">
      <div className="text-[11px] uppercase tracking-[2.5px] text-accent font-[var(--font-ui)] font-semibold mb-6">
        Ghostwriting
      </div>
      <h1 className="font-[var(--font-display)] font-bold text-5xl leading-tight mb-6">
        Book Ghostwriting
      </h1>
      <p className="font-[var(--font-ui)] text-lg text-brand mb-10">
        I write the book. You put your name on it.
      </p>
      <p className="font-[var(--font-ui)] text-xs uppercase tracking-[1.5px] text-foreground/50">
        Phase 1 scaffold — full page content comes in Phase 2.
      </p>
    </section>
  );
}
