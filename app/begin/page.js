import ApplicationForm from "@/components/ApplicationForm";

export const metadata = {
  title: "Apply | Troy Karnes",
  description:
    "Apply for a book project with Troy Karnes. Tell me about your book, then book a 45-minute project review call.",
};

const FORMSPREE_URL = "https://formspree.io/f/mwvyynwn";

// Where Formspree redirects after a successful submission (in the new tab)
const NEXT_URL = "https://www.troykarnes.com/begin#book";

export default function Begin() {
  return (
    <>
      {/* SECTION 1 — Intro + application form */}
      <section className="bg-background pt-[120px] pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-[var(--font-display)] font-bold text-[52px] leading-[1.1] mb-6">
            Apply
          </h1>
          <p className="font-[var(--font-body)] text-[17px] leading-[1.75] mb-10">
            In service to respecting your time (and mine), please tell me a
            little bit about your project. I have limited capacity and
            don&apos;t want to waste either of our time if I&apos;m not the
            right person to give you and your work the time and respect it
            should get.
          </p>

          <ApplicationForm
            formspreeUrl={FORMSPREE_URL}
            nextUrl={NEXT_URL}
          />
        </div>
      </section>

      {/* SECTION 2 — Book the call */}
      <section
        id="book"
        className="bg-surface py-20 px-6 scroll-mt-24"
      >
        <div className="max-w-3xl mx-auto">
          <h2 className="font-[var(--font-display)] font-bold text-[32px] leading-tight mb-6">
            Pick a time
          </h2>
          <p className="font-[var(--font-body)] text-[16px] leading-[1.75] mb-8">
            Once your application is in, pick a 45-minute slot below. I&apos;ll
            have read through your answers before we talk.
          </p>
          <iframe
            src="https://tidycal.com/troydkarnes/intro-call?embed=true"
            title="Book a project review call with Troy Karnes"
            className="w-full bg-background"
            style={{ border: 0, minHeight: 800 }}
            scrolling="no"
          />
        </div>
      </section>
    </>
  );
}
