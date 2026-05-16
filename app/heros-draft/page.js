import Image from "next/image";
import CTASection from "@/components/CTASection";
import TestimonialBlock from "@/components/TestimonialBlock";

export const metadata = {
  title: "The Hero's Draft: Book Coaching | Troy Karnes",
  description:
    "Six to nine months of structured book coaching for founders, executives, and consultants writing the book they've been carrying.",
};

const epicPhases = [
  {
    letter: "E",
    name: "Edge",
    placeholder: "[EPIC: Edge description . Troy to supply.]",
  },
  {
    letter: "P",
    name: "Plot",
    placeholder: "[EPIC: Plot description . Troy to supply.]",
  },
  {
    letter: "I",
    name: "Infrastructure",
    placeholder: "[EPIC: Infrastructure description . Troy to supply.]",
  },
  {
    letter: "C",
    name: "Compose",
    placeholder: "[EPIC: Compose description . Troy to supply.]",
  },
];

// TODO Phase 3: replace with Notion fetch filtered by service = "coaching"
const testimonials = [
  {
    quote: "[Placeholder testimonial. Replace with a real coaching client quote when ready. Two to four sentences works best.]",
    name: "[Client name]",
    title: "[Title or descriptor]",
  },
  {
    quote: "[Second placeholder testimonial. Focus on what changed in the writer. The finish line is secondary.]",
    name: "[Client name]",
    title: "[Title or descriptor]",
  },
];

export default function HerosDraft() {
  return (
    <>
      {/* SECTION 1 — Hero */}
      <section className="bg-background pt-[120px] pb-[80px] px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-[11px] uppercase tracking-[2.5px] text-accent font-semibold mb-6">
            Book Coaching
          </div>
          <h1 className="font-[var(--font-display)] font-bold text-[52px] leading-[1.1] mb-6">
            The Hero&apos;s Draft
          </h1>
          <p className="text-[20px] text-brand mb-8 leading-snug">
            You write the book. I guide you through it. The writing changes you
            along the way.
          </p>
          <p className="font-[var(--font-body)] text-[17px] leading-[1.75] mb-10 max-w-2xl">
            For founders, executives, and consultants who&apos;ve been carrying
            a book for years. The talks. The half-drafts. The framework you
            keep meaning to write down. Six to nine months of structured
            guidance, a weekly writing lab, and someone who&apos;s built books
            from scratch holding you accountable to finishing yours.
          </p>
          <a
            href="https://tidycal.com/troydkarnes/discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent text-background font-medium text-[15px] px-8 py-4 hover:bg-brand transition-colors"
          >
            Book a discovery call →
          </a>
        </div>
      </section>

      {/* SECTION 2 — Coaching vs Ghostwriting (qualifier) */}
      <section className="bg-surface py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-[11px] uppercase tracking-[2.5px] text-accent font-semibold mb-12">
            Is The Hero&apos;s Draft Right For You?
          </div>
          <div className="grid gap-12 md:grid-cols-2 md:gap-0">
            <div className="md:pr-12 md:border-r md:border-divider">
              <h2 className="font-[var(--font-display)] font-bold text-[24px] mb-4">
                Choose The Hero&apos;s Draft when…
              </h2>
              <ul className="space-y-3 font-[var(--font-body)] text-base leading-[1.7]">
                <li>You want writing the book to change you.</li>
                <li>You want to be the one who actually wrote it.</li>
                <li>You can carve out three to five hours a week for nine months.</li>
                <li>You like structure and a weekly cadence to keep you honest.</li>
              </ul>
            </div>
            <div className="md:pl-12">
              <h2 className="font-[var(--font-display)] font-bold text-[24px] mb-4">
                Choose Ghostwriting when…
              </h2>
              <ul className="space-y-3 font-[var(--font-body)] text-base leading-[1.7]">
                <li>Time is short. You can&apos;t spend three hours a week on it for nine months.</li>
                <li>You&apos;d rather work through it in conversation than in writing.</li>
                <li>You want the manuscript in your voice without doing the writing yourself.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — EPIC framework */}
      <section className="bg-background py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[11px] uppercase tracking-[2.5px] text-accent font-semibold mb-6">
              The Method
            </div>
            <h2 className="font-[var(--font-display)] font-bold text-[38px] leading-tight mb-4">
              The EPIC Process
            </h2>
            <p className="font-[var(--font-body)] text-[17px] leading-[1.7] max-w-2xl mx-auto">
              Four phases that move you from idea to finished manuscript without
              wasting your most precious working hours on the wrong work.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-2">
            {epicPhases.map((phase) => (
              <div key={phase.letter} className="flex gap-6">
                <div className="font-[var(--font-display)] font-bold text-[72px] text-accent leading-none">
                  {phase.letter}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-[var(--font-display)] font-bold text-[22px] mb-3">
                    {phase.name}
                  </h3>
                  <p className="font-[var(--font-body)] text-[15px] leading-[1.75] text-foreground/80">
                    {phase.placeholder}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Editorial photo break */}
      <div className="bg-background">
        <Image
          src="/images/troy-hero.jpg"
          alt="Troy Karnes against an adobe wall"
          width={6000}
          height={4000}
          sizes="100vw"
          className="w-full h-auto"
        />
      </div>

      {/* SECTION 4 — Weekly Writing Lab */}
      <section className="bg-surface py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-[11px] uppercase tracking-[2.5px] text-accent font-semibold mb-6">
            The Mechanic
          </div>
          <h2 className="font-[var(--font-display)] font-bold text-[34px] leading-tight mb-6">
            The Weekly Writing Lab
          </h2>
          <p className="font-[var(--font-body)] text-base leading-[1.75] mb-6">
            [Placeholder: describe what the weekly writing lab actually is.
            What happens on each call? Who else is there? Group format or 1:1?
            What does Troy bring vs. what does the writer bring? What&apos;s the
            cadence between calls? Troy to supply.]
          </p>
          <p className="font-[var(--font-body)] text-base leading-[1.75]">
            [Placeholder: a second paragraph on the texture. What people
            actually report after a few weeks. What the rhythm feels like. What
            changes in how they relate to the work.]
          </p>
        </div>
      </section>

      {/* SECTION 5 — Timeline + Investment + Risk reversal */}
      <section className="bg-background py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[11px] uppercase tracking-[2.5px] text-accent font-semibold mb-6">
              The Particulars
            </div>
            <h2 className="font-[var(--font-display)] font-bold text-[32px] leading-tight">
              What you can expect
            </h2>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            <div>
              <div className="font-[var(--font-display)] font-bold text-[40px] text-brand leading-none mb-3">
                6–9 mo
              </div>
              <div className="text-[11px] uppercase tracking-[1.5px] text-foreground/70 font-medium mb-3">
                Timeline
              </div>
              <p className="font-[var(--font-body)] text-[15px] leading-[1.7]">
                From edge to manuscript. Most engagements land in this window.
              </p>
            </div>
            <div>
              <div className="font-[var(--font-display)] font-bold text-[40px] text-brand leading-none mb-3">
                $9,000
              </div>
              <div className="text-[11px] uppercase tracking-[1.5px] text-foreground/70 font-medium mb-3">
                Starting Investment
              </div>
              <p className="font-[var(--font-body)] text-[15px] leading-[1.7]">
                [Placeholder: one sentence on what the investment covers and how
                it scales. Troy to confirm whether pricing belongs on the page.]
              </p>
            </div>
            <div>
              <div className="font-[var(--font-display)] font-bold text-[40px] text-brand leading-none mb-3">
                ↺
              </div>
              <div className="text-[11px] uppercase tracking-[1.5px] text-foreground/70 font-medium mb-3">
                Risk Reversal
              </div>
              <p className="font-[var(--font-body)] text-[15px] leading-[1.7]">
                [Placeholder: refundable kickoff window and pause rights. Troy
                to supply specifics. Often the deciding factor for serious
                buyers.]
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — Testimonials */}
      <section className="bg-surface py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[11px] uppercase tracking-[2.5px] text-accent font-semibold mb-6">
              From Writers I&apos;ve Worked With
            </div>
            <h2 className="font-[var(--font-display)] font-bold text-[32px] leading-tight">
              What finishing looks like
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((t, i) => (
              <TestimonialBlock
                key={i}
                quote={t.quote}
                name={t.name}
                title={t.title}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7 — Final CTA */}
      <CTASection
        headline="Ready to write your Hero's Draft?"
        subhead="45 minutes. No pitch. Just a conversation about your book."
      />
    </>
  );
}
