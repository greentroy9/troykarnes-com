import Image from "next/image";
import SubstackSubscribe from "@/components/SubstackSubscribe";

export const metadata = {
  title: "About | Troy Karnes",
  description:
    "Cancer survivor, person in active recovery, author of No Silver Bullets, and the person who helps founders write the book they've been carrying.",
};

export default function About() {
  return (
    <>
      {/* SECTION 1 — Personal story */}
      <section className="bg-background pt-[120px] pb-[100px] px-6">
        <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-[2fr_3fr] items-start">
          <div>
            <Image
              src="/images/FCSP%20Headshot.JPG"
              alt="Troy Karnes in a yellow t-shirt, sitting in a leather chair"
              width={2320}
              height={3088}
              sizes="(max-width: 768px) 100vw, 40vw"
              className="w-full h-auto"
              priority
            />
          </div>
          <div>
            <h1 className="font-[var(--font-display)] font-bold text-[52px] leading-[1.1] mb-10">
              About
            </h1>

            <p className="font-[var(--font-body)] text-[17px] leading-[1.75] mb-6">
              In short, I&apos;m a father, husband, cancer survivor, recovering
              alcoholic, author, speaker, authorship guide, and professional
              ghostwriter serving executives in tech, finance, human capital,
              and healthcare.
            </p>

            <p className="font-[var(--font-body)] text-[17px] leading-[1.75] mb-6">
              In the throes of simultaneously battling addiction and big,
              scary, dangerous, rare cancer, I found a form of personal
              development I have yet to match: authorship. We create the book,
              and in the process, it creates a better version of ourselves.
            </p>

            <p className="font-[var(--font-body)] text-[17px] leading-[1.75] mb-6">
              Away from the page, I spend time with my amazing, smart, and
              beautiful wife and our two rambunctious boys. Luckily, our house
              is still intact.
            </p>

            <p className="font-[var(--font-body)] text-[17px] leading-[1.75]">
              I also co-founded a nonprofit organization dedicated to raising
              money for cancer research that will surpass $1M in donations this
              year. Fuck Cancer, Stay Positive.
            </p>

            {/*
              Big Five publisher announcement — hidden until ready.
              When the announcement is live, render this block:

              <p className="font-[var(--font-body)] text-[17px] leading-[1.75] mt-8">
                [Big Five announcement copy]
              </p>
            */}
          </div>
        </div>
      </section>

      {/* SECTION 2 — Stay in Touch */}
      <section className="bg-surface py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="text-[11px] uppercase tracking-[2.5px] text-accent font-semibold mb-6">
            Stay in Touch
          </div>
          <h2 className="font-[var(--font-display)] font-bold text-[34px] leading-tight mb-6">
            Subscribe to HALT Blog
          </h2>
          <p className="font-[var(--font-body)] text-base leading-[1.75] mb-8">
            Honest (and sometimes embarrassing) stories and insights about how
            to manage challenges we all face.
          </p>
          <div className="max-w-md mx-auto">
            <SubstackSubscribe />
          </div>
        </div>
      </section>
    </>
  );
}
