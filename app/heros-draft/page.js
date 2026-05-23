import Image from "next/image";
import Link from "next/link";
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
    body: "Every great book grows from a strong positioning statement, written by the right person. This statement intentionally speaks to a chosen audience hungry for the answers you have. We finish this phase with a sharp reader profile and an answer to “what is your book about?”",
  },
  {
    letter: "P",
    name: "Plot",
    body: "I give the same advice to anyone starting on a book project: spend 3x more time on the table of contents than you want to. Spend the time here and the writing phase gets dramatically easier. We finish this phase with a table of contents and summaries for each chapter.",
  },
  {
    letter: "I",
    name: "Infrastructure",
    body: "Every hour we spend building your book's infrastructure will save you many more sitting in the writer's chair figuring out what to write. When we finish this phase, you will have detailed outlines of every chapter, notes on the evidence you intend to use, and the stories you'll use to bring the chapter to life for your reader.",
  },
  {
    letter: "C",
    name: "Compose",
    body: "Now we write in earnest. We have all of the materials and preparation we need, and we put them to work. With weekly access to writing sessions (Author's Hours), developmental calls, and feedback on every chapter, you'll have the support to stick with it and finish your Hero's Draft.",
  },
];

const support = [
  {
    name: "Author's Hours",
    body: "Weekly hour-long blocks so you can write alongside other authors. Sharing the time and space with other writers builds the creation muscles you need. Many writers will put down 1,000 words in these sessions.",
  },
  {
    name: "The Notes",
    body: "Continual feedback on the work you do will elevate your work and expedite the process. Bi-weekly time with me will ensure you get the guidance to maintain momentum through every phase.",
  },
  {
    name: "The Margins",
    body: "Between our calls, you still have my support. I'll make notes on your work and reply to emails and voice messages to keep the momentum going on your journey.",
  },
];

// TODO Phase 3: replace with Notion fetch filtered by service = "coaching"
const testimonials = [
  {
    quote:
      "I have also embraced a more holistic and emotionally intelligent leadership style, which the entire team has responded favorably to. Working with Troy has been a wonderful personal development experience.",
    name: "",
    title: "",
  },
  {
    quote:
      "Get off the fence and jump into a project with Troy. His approach to solving problems is very thoughtful, collaborative and educational.",
    name: "",
    title: "",
  },
];

export default function HerosDraft() {
  return (
    <>
      {/* SECTION 1 — Hero */}
      <section className="bg-background pt-[120px] pb-[100px] px-6">
        <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-[3fr_2fr] items-center">
          <div>
            <h1 className="font-[var(--font-display)] font-bold text-[52px] leading-[1.1] mb-6">
              The Hero&apos;s Draft
            </h1>
            <p className="text-[20px] text-brand mb-8 leading-snug">
              Become the author your life has been building toward.
            </p>
            <p className="font-[var(--font-body)] text-[17px] leading-[1.75] mb-10 max-w-2xl">
              Writing a book requires more than writing. It takes{" "}
              <strong>defining your idea</strong>, figuring out exactly{" "}
              <strong>who it&apos;s for</strong>, and structuring{" "}
              <strong>tens of thousands of words</strong> to connect the two
              in a compelling way. Most people give up because they try to do
              it alone. Every hero needs a guide. I support you through the
              process, give you feedback on every chapter, and hold a writing
              lab so you can create a healthy writing habit.
            </p>
            <Link
              href="/begin"
              className="inline-block bg-accent text-background font-medium text-[15px] px-8 py-4 hover:bg-brand transition-colors"
            >
              Apply Here →
            </Link>
          </div>
          <div>
            <Image
              src="/images/Troy-white%20sweater.jpg"
              alt="Troy Karnes against a warm adobe wall in a white sweater"
              width={4000}
              height={6000}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </section>

      {/* SECTION 2 — The Method (EPIC) */}
      <section className="bg-surface py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[11px] uppercase tracking-[2.5px] text-accent font-semibold mb-6">
              The Method
            </div>
            <h2 className="font-[var(--font-display)] font-bold text-[38px] leading-tight mb-4">
              The EPIC Process
            </h2>
            <p className="font-[var(--font-body)] text-[17px] leading-[1.7] max-w-2xl mx-auto">
              Four phases that move you from idea to finished manuscript.
            </p>
          </div>
          <div className="grid gap-16 md:grid-cols-[3fr_2fr] items-start">
            <div className="space-y-12">
              {epicPhases.map((phase) => (
                <div key={phase.letter} className="grid grid-cols-[auto_1fr] gap-8 items-center">
                  <div className="font-[var(--font-display)] font-bold text-[160px] text-accent leading-none">
                    {phase.letter}
                  </div>
                  <div>
                    <h3 className="font-[var(--font-display)] font-bold text-[24px] mb-3">
                      {phase.name}
                    </h3>
                    <p className="font-[var(--font-body)] text-[15px] leading-[1.75] text-foreground/80">
                      {phase.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="md:sticky md:top-24">
              <Image
                src="/images/Journal%20Writing.jpg"
                alt="A page of handwritten journal notes"
                width={240}
                height={320}
                sizes="(max-width: 768px) 240px, 320px"
                className="w-full max-w-[320px] mx-auto h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Support */}
      <section className="bg-background py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="text-[11px] uppercase tracking-[2.5px] text-accent font-semibold mb-6">
              Support
            </div>
            <h2 className="font-[var(--font-display)] font-bold text-[38px] leading-tight">
              How I show up for you
            </h2>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            {support.map((item) => (
              <div key={item.name}>
                <h3 className="font-[var(--font-display)] font-bold text-[22px] text-accent text-center underline underline-offset-4 mb-4">
                  {item.name}
                </h3>
                <p className="font-[var(--font-body)] text-[15px] leading-[1.75] text-foreground/85">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — The Journey */}
      <section className="bg-surface py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-[var(--font-display)] font-bold text-[38px] leading-tight">
              The Journey
            </h2>
          </div>
          <div className="grid gap-12 md:grid-cols-3">
            <div className="text-center">
              <div className="font-[var(--font-display)] font-bold text-[40px] text-brand leading-none mb-3">
                9–12 mo
              </div>
              <div className="text-[11px] uppercase tracking-[1.5px] text-foreground/70 font-medium mb-3">
                Timeline
              </div>
              <p className="font-[var(--font-body)] text-[15px] leading-[1.7]">
                Most Hero&apos;s Drafts finish in this window, but I&apos;m
                flexible project-to-project.
              </p>
            </div>
            <div className="text-center">
              <div className="font-[var(--font-display)] font-bold text-[40px] text-brand leading-none mb-3">
                $9,500
              </div>
              <div className="text-[11px] uppercase tracking-[1.5px] text-foreground/70 font-medium mb-3">
                Starting Investment
              </div>
              <p className="font-[var(--font-body)] text-[15px] leading-[1.7]">
                Includes Author&apos;s Hours, bi-weekly calls for notes, and
                asynchronous feedback.
              </p>
            </div>
            <div className="text-center">
              <div className="font-[var(--font-display)] font-bold text-[40px] text-brand leading-none mb-3">
                ↺
              </div>
              <div className="text-[11px] uppercase tracking-[1.5px] text-foreground/70 font-medium mb-3">
                Risk Reversal
              </div>
              <p className="font-[var(--font-body)] text-[15px] leading-[1.7]">
                A project review call ensures we&apos;re a good fit. There&apos;s
                a 7-day refundable window when we start. Authors may pause up to
                60 days during our work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Words from clients */}
      <section className="bg-background py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-[var(--font-display)] font-bold text-[38px] leading-tight">
              Words from clients
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

      {/* SECTION 6 — Final CTA */}
      <CTASection
        headline="Ready to write your Hero's Draft?"
        subhead="Click below to tell me more about your project."
      />
    </>
  );
}
