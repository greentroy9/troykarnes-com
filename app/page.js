import Link from "next/link";
import ImagePlaceholder from "@/components/ImagePlaceholder";
import StatBlock from "@/components/StatBlock";
import FeaturedPost from "@/components/FeaturedPost";
import SubstackSubscribe from "@/components/SubstackSubscribe";
import CTASection from "@/components/CTASection";

// TODO Phase 3: replace with Notion fetch
const featuredPost = {
  title: "Placeholder: latest HALT on Hump Day post title",
  excerpt:
    "Two-sentence excerpt of the latest issue lives here. Pulled from Notion in Phase 3 so Troy can swap it without a deploy.",
  url: "https://haltblog.substack.com/",
};

// TODO Phase 3: optionally pull from Notion
const stats = [
  { number: "17", label: "Amazon reviews for No Silver Bullets" },
  { number: "6–9 mo", label: "Typical time to a finished draft" },
  // Third stat reserved for Big Five publisher announcement
  // { number: "TBD", label: "Forthcoming book with [publisher]" },
];

export default function Home() {
  return (
    <>
      {/* SECTION 1 — Hero */}
      <section className="bg-background pt-[120px] pb-[100px] px-6">
        <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-[3fr_2fr] items-center">
          <div>
            <div className="text-[11px] uppercase tracking-[2.5px] text-accent font-semibold mb-6">
              Book Coaching &amp; Ghostwriting
            </div>
            <h1 className="font-[var(--font-display)] font-bold text-[52px] leading-[1.1] mb-6">
              For senior leaders writing the book they&apos;ve been carrying.
            </h1>
            <p className="text-[18px] text-brand mb-8">
              You write. I guide. The journey changes you.
            </p>
            <p className="font-[var(--font-body)] text-base leading-[1.75] mb-10 max-w-xl">
              I work with founders, executives, and consultants who have ideas,
              talks, and half-drafts — but no spine. Six to nine months of
              structured guidance gets you to a first draft you wrote yourself.
              Or I write it for you.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/heros-draft"
                className="inline-block bg-accent text-background font-medium text-[15px] px-8 py-4 hover:bg-brand transition-colors"
              >
                The Hero&apos;s Draft →
              </Link>
              <Link
                href="/ghostwriting"
                className="text-brand underline font-medium text-[15px] hover:text-accent transition-colors"
              >
                Book ghostwriting →
              </Link>
            </div>
          </div>
          <div>
            <ImagePlaceholder label="Hero photo of Troy" aspectRatio="4 / 5" />
          </div>
        </div>
      </section>

      {/* SECTION 2 — Two Paths */}
      <section className="bg-surface py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-[11px] uppercase tracking-[2.5px] text-accent font-semibold mb-12">
            Two Ways to Work Together
          </div>
          <div className="grid gap-12 md:grid-cols-2 md:gap-0">
            <div className="md:pr-12 md:border-r md:border-divider">
              <h2 className="font-[var(--font-display)] font-bold text-[28px] mb-3">
                The Hero&apos;s Draft
              </h2>
              <div className="text-[13px] text-brand font-medium mb-6">
                Starting at $9,000
              </div>
              <p className="font-[var(--font-body)] text-base leading-[1.75] mb-6">
                You write the book. I guide you through it. A six-to-nine month
                engagement with a structured framework, a weekly writing lab,
                and someone who has built books from scratch holding you
                accountable to finishing yours. For leaders who want the writing
                to develop them — not just the outcome.
              </p>
              <Link
                href="/heros-draft"
                className="text-accent underline font-medium text-[15px] hover:text-brand transition-colors"
              >
                Learn about The Hero&apos;s Draft →
              </Link>
            </div>
            <div className="md:pl-12">
              <h2 className="font-[var(--font-display)] font-bold text-[28px] mb-3">
                Book Ghostwriting
              </h2>
              <div className="text-[13px] text-brand font-medium mb-6">
                Starting at $30,000
              </div>
              <p className="font-[var(--font-body)] text-base leading-[1.75] mb-6">
                I write the book. You put your name on it. Deep interviews,
                source-material review, and a manuscript written in your voice —
                while you stay on the work that only you can do. For leaders
                whose time is the binding constraint.
              </p>
              <Link
                href="/ghostwriting"
                className="text-accent underline font-medium text-[15px] hover:text-brand transition-colors"
              >
                Learn about ghostwriting →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Social Proof */}
      <section className="bg-background py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-[var(--font-display)] font-bold text-[32px] mb-8">
            Who I work with
          </h2>
          <p className="font-[var(--font-body)] text-[17px] leading-[1.7] mb-16">
            I write for the founder of a $38M-valuation company, an investor
            with $20M+ in exits, a business coach, and a technology founder
            writing on leadership.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 sm:gap-y-0 sm:divide-x sm:divide-surface">
            {stats.map((stat) => (
              <StatBlock
                key={stat.label}
                number={stat.number}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — From the Substack */}
      <section className="bg-surface py-20 px-6">
        <div className="max-w-7xl mx-auto grid gap-16 md:grid-cols-[55fr_45fr] items-start">
          <div>
            <div className="text-[11px] uppercase tracking-[2.5px] text-accent font-semibold mb-6">
              Weekly Writing
            </div>
            <h2 className="font-[var(--font-display)] font-bold text-[34px] leading-tight mb-6">
              HALT on Hump Day
            </h2>
            <p className="font-[var(--font-body)] text-base leading-[1.75] mb-8 max-w-xl">
              Every Wednesday I share what I&apos;m learning about managing the
              things that derail us — Hungry, Angry, Lonely, Tired — and how
              that connects to doing the kind of work that lasts. Free. No
              pitch. Just the writing.
            </p>
            <SubstackSubscribe className="max-w-md" />
          </div>
          <div>
            <FeaturedPost
              title={featuredPost.title}
              excerpt={featuredPost.excerpt}
              url={featuredPost.url}
            />
          </div>
        </div>
      </section>

      {/* SECTION 5 — The Book */}
      <section className="bg-black text-background py-20 px-6">
        <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-[2fr_3fr] items-center">
          <div>
            <ImagePlaceholder
              label="No Silver Bullets cover"
              aspectRatio="2 / 3"
              className="!bg-surface"
            />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[2.5px] text-accent font-semibold mb-6">
              The Book
            </div>
            <h2 className="font-[var(--font-display)] font-bold text-[38px] leading-tight mb-6">
              No Silver Bullets
            </h2>
            <p className="font-[var(--font-body)] text-[15px] leading-[1.8] text-[#cccccc] mb-10 max-w-xl">
              Built around the HALT framework — Hungry, Angry, Lonely, Tired —
              this is a book about the problems that don&apos;t go away. And the
              life you can build around them anyway.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="https://buy.stripe.com/cNi00kgxY75zeF0cXg9k400"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent text-background font-medium text-[15px] px-8 py-4 hover:bg-brand transition-colors"
              >
                Buy directly →
              </a>
              <a
                href="https://www.audible.com/pd/No-Silver-Bullets-Audiobook/B0G3BVDN83"
                target="_blank"
                rel="noopener noreferrer"
                className="text-background underline font-medium text-[15px] hover:text-accent transition-colors"
              >
                Listen on Audible →
              </a>
              <Link
                href="/book"
                className="text-accent font-medium text-[15px] hover:text-background transition-colors"
              >
                Read more about the book →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — Final CTA */}
      <CTASection />
    </>
  );
}
