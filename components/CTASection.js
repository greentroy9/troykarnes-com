export default function CTASection({
  headline = "Ready to write the book you've been carrying?",
  subhead = "45 minutes. No pitch. Just a conversation about your book.",
  buttonText = "Book a free discovery call",
  buttonHref = "https://tidycal.com/troydkarnes/discovery",
}) {
  return (
    <section className="bg-brand text-background py-[100px] px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-[var(--font-display)] font-bold text-[44px] leading-tight mb-6">
          {headline}
        </h2>
        <p className="text-[17px] text-[#d4e8ce] mb-10">{subhead}</p>
        <a
          href={buttonHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-accent text-background font-medium text-[15px] px-10 py-[18px] hover:bg-foreground transition-colors"
        >
          {buttonText}
        </a>
      </div>
    </section>
  );
}
