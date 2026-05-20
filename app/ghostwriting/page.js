import Image from "next/image";

export const metadata = {
  title: "Book Ghostwriting | Troy Karnes",
  description:
    "Three times per year I work with a leader to fully ghostwrite their book. Apply for a session to discuss your idea.",
};

export default function Ghostwriting() {
  return (
    <section className="bg-background pt-[120px] pb-[100px] px-6">
      <div className="max-w-7xl mx-auto grid gap-12 md:grid-cols-[2fr_3fr] items-center">
        <div>
          <Image
            src="/images/TK%20sitting%20mountains.jpg"
            alt="Troy Karnes sitting on a rock with the Colorado foothills behind him"
            width={3200}
            height={4000}
            sizes="(max-width: 768px) 100vw, 40vw"
            className="w-full h-auto"
            priority
          />
        </div>
        <div>
          <h1 className="font-[var(--font-display)] font-bold text-[52px] leading-[1.1] mb-10">
            Ghostwriting
          </h1>

          <p className="font-[var(--font-body)] text-[17px] leading-[1.75] mb-8">
            Three times per year I will work with a leader to fully ghostwrite
            their book. Typically projects take 9-14 months from start to
            finish. The experience includes private sessions to begin the
            journey, on-going interviews to fully encapsulate your ideas and
            preserve your voice, research as needed, review sessions so you
            always feel connected to the work, and copy-editing with a curated
            group of professionals. Every step is designed to ensure you have
            an elevated experience and walk away with an incredible manuscript.
          </p>

          <p className="font-[var(--font-body)] text-[17px] leading-[1.75] mb-10">
            With limited capacity for these experiences, please click below to
            apply for a session where we can discuss your idea.
          </p>

          <a
            href="https://tidycal.com/troydkarnes/discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent text-background font-medium text-[15px] px-10 py-[18px] hover:bg-brand transition-colors"
          >
            Apply Here →
          </a>
        </div>
      </div>
    </section>
  );
}
