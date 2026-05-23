import Image from "next/image";
import SubstackSubscribe from "@/components/SubstackSubscribe";
import ReviewsCarousel from "@/components/ReviewsCarousel";

export const metadata = {
  title: "My Work | Troy Karnes",
  description:
    "No Silver Bullets and the HALT Blog. Honest stories and insights about how to manage challenges we all face.",
};

// TODO Phase 3: replace with Notion fetch (book review database)
const reviews = [
  {
    quote:
      "[Placeholder Amazon review. Replace with one of the 17 real reviews. Two to four sentences.]",
    name: "",
    title: "Amazon reviewer",
  },
  {
    quote: "[Second placeholder review.]",
    name: "",
    title: "Amazon reviewer",
  },
  {
    quote: "[Third placeholder review.]",
    name: "",
    title: "Amazon reviewer",
  },
];

// TODO Phase 3: replace with Notion fetch (most recent 4-6 posts)
const posts = [
  {
    title: "[Placeholder post title 1]",
    excerpt:
      "[Two-sentence excerpt from the most recent post. Will be pulled from Notion in Phase 3 so Troy can update without a deploy.]",
    url: "https://haltblog.substack.com/",
    date: "Wed, May 14",
  },
  {
    title: "[Placeholder post title 2]",
    excerpt: "[Two-sentence excerpt.]",
    url: "https://haltblog.substack.com/",
    date: "Wed, May 7",
  },
  {
    title: "[Placeholder post title 3]",
    excerpt: "[Two-sentence excerpt.]",
    url: "https://haltblog.substack.com/",
    date: "Wed, Apr 30",
  },
  {
    title: "[Placeholder post title 4]",
    excerpt: "[Two-sentence excerpt.]",
    url: "https://haltblog.substack.com/",
    date: "Wed, Apr 23",
  },
];

export default function MyWork() {
  return (
    <>
      <h1 className="sr-only">My Work</h1>

      {/* SECTION 1 — The Book (cover + headline + essay + buttons) */}
      <section className="bg-black text-background pt-[120px] pb-20 px-6">
        <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-2 items-center">
          <div>
            <Image
              src="/images/NSB%20Cover%20Mock%20Up.png"
              alt="No Silver Bullets by Troy Karnes, book cover on a desk with reading glasses and a notebook"
              width={1200}
              height={959}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-auto"
              priority
            />
          </div>
          <div>
            <h2 className="font-[var(--font-display)] font-bold text-[44px] leading-tight mb-8">
              No Silver Bullets
            </h2>
            <p className="font-[var(--font-body)] text-[15px] leading-[1.8] text-[#cccccc] mb-5">
              Everyone thinks we should solve problems all the time, and I get
              it. Successful people make a lot of money running into problems,
              solve them, then simplify them for the masses. But in my
              experience, and according to my research, I&apos;ve found the
              real problems in our lives will never go away. And, in fact, we
              will end up with better results when we realize nurturing those
              issues instead of playing problem whack-a-mole with our lives.
            </p>
            <p className="font-[var(--font-body)] text-[15px] leading-[1.8] text-[#cccccc] mb-5">
              I saw this with some pretty extreme examples of issues I will
              deal with the rest of my life, namely cancer, addiction, raising
              a son on the spectrum, and burnout at work. But everyone else
              can see this as well. Everyone gets hungry, feels emotions,
              interacts with other people, and manages their energy on a daily
              basis.
            </p>
            <p className="font-[var(--font-body)] text-[15px] leading-[1.8] text-[#cccccc] mb-10">
              This book outlines the science, stories, and systems I use to
              nurture these aspects of my life to bring calm in a chaotic
              world.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href="https://buy.stripe.com/cNi00kgxY75zeF0cXg9k400"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent text-background font-medium text-[15px] px-8 py-4 hover:bg-brand transition-colors"
              >
                Buy Directly →
              </a>
              <a
                href="https://www.audible.com/pd/No-Silver-Bullets-Audiobook/B0G3BVDN83"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block border border-background text-background font-medium text-[15px] px-8 py-4 hover:bg-background hover:text-foreground transition-colors"
              >
                Listen on Audible →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Reviews carousel */}
      <section className="bg-surface py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-[var(--font-display)] font-bold text-[32px] leading-tight">
              What readers have said
            </h2>
          </div>
          <ReviewsCarousel reviews={reviews} />
        </div>
      </section>

      {/* SECTION 4 — HALT Blog */}
      <section id="blog" className="bg-background py-24 px-6 scroll-mt-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="text-[11px] uppercase tracking-[2.5px] text-accent font-semibold mb-6">
              From the Newsletter
            </div>
            <h2 className="font-[var(--font-display)] font-bold text-[38px] leading-tight mb-4">
              HALT Blog
            </h2>
            <p className="font-[var(--font-body)] text-[17px] leading-[1.75] max-w-2xl mx-auto">
              Honest (and sometimes embarrassing) stories and insights about
              how to manage challenges we all face.
            </p>
          </div>
          <div className="divide-y divide-surface">
            {posts.map((post, i) => (
              <a
                key={i}
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-8 group"
              >
                <div className="text-[12px] uppercase tracking-[1.5px] text-foreground/60 font-medium mb-3">
                  {post.date}
                </div>
                <h3 className="font-[var(--font-display)] font-bold text-[26px] leading-snug mb-3 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="font-[var(--font-body)] text-[16px] leading-[1.75] text-foreground/80 mb-3">
                  {post.excerpt}
                </p>
                <span className="text-accent text-sm font-medium underline">
                  Read on Substack →
                </span>
              </a>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a
              href="https://haltblog.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-foreground text-foreground font-medium text-[15px] px-8 py-4 hover:bg-foreground hover:text-background transition-colors"
            >
              See the full archive →
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 5 — Stay in Touch */}
      <section className="bg-surface py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-[11px] uppercase tracking-[2.5px] text-accent font-semibold mb-6">
            Stay in Touch
          </div>
          <h2 className="font-[var(--font-display)] font-bold text-[34px] leading-tight mb-6">
            Subscribe to HALT Blog
          </h2>
          <p className="font-[var(--font-body)] text-base leading-[1.75] mb-8">
            One email when there&apos;s something worth saying. Free.
          </p>
          <div className="max-w-md mx-auto">
            <SubstackSubscribe />
          </div>
        </div>
      </section>
    </>
  );
}
