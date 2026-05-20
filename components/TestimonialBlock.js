export default function TestimonialBlock({ quote, name, title }) {
  return (
    <figure className="bg-background p-8 md:p-10 h-full flex flex-col">
      <blockquote className="font-[var(--font-body)] text-base leading-[1.8] mb-6 flex-1">
        <span className="text-accent text-3xl leading-none font-[var(--font-display)] mr-1 align-top">
          &ldquo;
        </span>
        {quote}
        <span className="text-accent text-3xl leading-none font-[var(--font-display)] ml-1 align-top">
          &rdquo;
        </span>
      </blockquote>
      <figcaption className="text-[13px] font-[var(--font-ui)]">
        {name && <div className="font-semibold">{name}</div>}
        {title && (
          <div className={`text-foreground/60 ${name ? "mt-1" : ""}`}>
            {title}
          </div>
        )}
      </figcaption>
    </figure>
  );
}
