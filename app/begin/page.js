export const metadata = {
  title: "Begin: Book a Discovery Call | Troy Karnes",
  description:
    "45 minutes. No pitch. Just a conversation about your book.",
};

export default function Begin() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-32">
      <div className="text-[11px] uppercase tracking-[2.5px] text-accent font-[var(--font-ui)] font-semibold mb-6">
        Begin
      </div>
      <h1 className="font-[var(--font-display)] font-bold text-5xl leading-tight mb-6">
        Book a discovery call
      </h1>
      <p className="font-[var(--font-ui)] text-lg text-brand mb-10">
        45 minutes. No pitch. Just a conversation about your book.
      </p>
      <p className="font-[var(--font-ui)] text-xs uppercase tracking-[1.5px] text-foreground/50">
        Phase 1 scaffold. TidyCal embed and contact form come in Phase 2.
      </p>
    </section>
  );
}
