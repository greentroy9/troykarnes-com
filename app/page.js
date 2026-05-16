import Image from "next/image";
import Link from "next/link";
import FeaturedPost from "@/components/FeaturedPost";
import SubstackSubscribe from "@/components/SubstackSubscribe";
import CTASection from "@/components/CTASection";

// TODO Phase 3: replace with Notion fetch
const featuredPost = {
  title: "Placeholder: latest Substack post title",
  excerpt:
    "Two-sentence excerpt of the latest issue lives here. Pulled from Notion in Phase 3 so Troy can swap it without a deploy.",
  url: "https://haltblog.substack.com/",
};

export default function Home() {
  return (
    <>
      {/* SECTION 1 — Hero */}
      <section className="bg-background pt-[120px] pb-[100px] px-6">
        <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-[3fr_2fr] items-center">
          <div>
            <div className="text-[11px] uppercase tracking-[2.5px] text-accent font-semibold mb-6">
              Write Your Hero Draft
            </div>
            <h1 className="font-[var(--font-display)] font-bold text-[52px] leading-[1.1] mb-6">
              Too much wisdom gets wasted when your book goes unwritten.
            </h1>
            <p className="text-[18px] text-brand mb-8">
              I&apos;m the guide who helps you finish what most people never do.
            </p>
            <p className="font-[var(--font-body)] text-base leading-[1.75] mb-10 max-w-xl">
              I work with founders, executives, and consultants who have piles
              of ideas, talks, and half-drafts ready to polish into a
              manuscript.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <Link
                href="/heros-draft"
                className="inline-block bg-accent text-background font-medium text-[15px] px-8 py-4 hover:bg-brand transition-colors"
              >
                The Hero&apos;s Draft →
              </Link>
            </div>
          </div>
          <div>
            <Image
              src="/images/troy-mtn.jpg"
              alt="Troy Karnes in the Colorado foothills"
              width={1366}
              height={1708}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="w-full h-auto"
              priority
            />
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
              <h2 className="font-[var(--font-display)] font-bold text-[28px] mb-6">
                The Hero&apos;s Draft
              </h2>
              <p className="font-[var(--font-body)] text-base leading-[1.75] mb-6">
                81% of people believe they have a book in them, but most never
                write it. I help you finish your Hero Draft through my EPIC
                process. I&apos;ll help you find your edge, plot out the idea,
                build the infrastructure, and compose your manuscript. Write the
                book you&apos;ve been thinking about.
              </p>
              <Link
                href="/heros-draft"
                className="text-accent underline font-medium text-[15px] hover:text-brand transition-colors"
              >
                Learn about The Hero&apos;s Draft →
              </Link>
            </div>
            <div className="md:pl-12">
              <h2 className="font-[var(--font-display)] font-bold text-[28px] mb-6">
                Ghostwriting
              </h2>
              <p className="font-[var(--font-body)] text-base leading-[1.75] mb-6">
                Ask me about a more done-for-you service, where you provide the
                insights and I put words to them.
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

      {/* Divider — moves from "services for you" into "Troy's own work" */}
      <div className="bg-surface pb-16 text-center" aria-hidden="true">
        <span className="text-accent text-3xl font-[var(--font-display)] tracking-[0.6em]">
          ⁂
        </span>
      </div>

      {/* SECTION 3 — The Book */}
      <section className="bg-black text-background py-20 px-6">
        <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-2 items-center">
          <div>
            <Image
              src="/images/NSB%20Cover%20Mock%20Up.png"
              alt="No Silver Bullets by Troy Karnes, book cover on a desk with reading glasses and a notebook"
              width={1200}
              height={959}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-auto"
            />
          </div>
          <div>
            <h2 className="font-[var(--font-display)] font-bold text-[38px] leading-tight mb-6">
              No Silver Bullets
            </h2>
            <p className="font-[var(--font-body)] text-[15px] leading-[1.8] text-[#cccccc] mb-4 max-w-xl">
              The issues beneath your biggest challenges are never going away.
              So learn to manage them.
            </p>
            <p className="font-[var(--font-body)] text-[15px] leading-[1.8] text-[#cccccc] mb-10 max-w-xl">
              Nobody makes good decisions when they&apos;re Hungry, Angry,
              Lonely, or Tired. Learn how to manage them from someone who fought
              rare cancer while getting sober.
            </p>
            <div className="flex flex-wrap items-center gap-4">
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
                className="inline-block border border-background text-background font-medium text-[15px] px-8 py-4 hover:bg-background hover:text-foreground transition-colors"
              >
                Listen on Audible →
              </a>
              <Link
                href="/book"
                className="text-accent font-medium text-[15px] hover:text-background transition-colors"
              >
                Read more →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Newsletter */}
      <section className="bg-surface py-20 px-6">
        <div className="max-w-7xl mx-auto grid gap-16 md:grid-cols-[55fr_45fr] items-start">
          <div>
            <div className="text-[11px] uppercase tracking-[2.5px] text-accent font-semibold mb-6">
              From the Newsletter
            </div>
            <h2 className="font-[var(--font-display)] font-bold text-[34px] leading-tight mb-6">
              Subscribe to HALT Blog
            </h2>
            <p className="font-[var(--font-body)] text-base leading-[1.75] mb-8 max-w-xl">
              Honest (and sometimes embarrassing) stories and insights about
              how to manage challenges we all face.
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

      {/* SECTION 6 — Final CTA */}
      <CTASection
        headline="Ready to go write that book?"
        subhead="Let's have a conversation about it."
      />
    </>
  );
}
