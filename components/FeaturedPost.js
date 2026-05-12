export default function FeaturedPost({
  title,
  excerpt,
  url,
  label = "Latest issue",
}) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="text-[11px] uppercase tracking-[2px] text-foreground/60 font-medium mb-4">
        {label}
      </div>
      <h3 className="font-[var(--font-display)] font-semibold text-[20px] leading-snug mb-4 group-hover:text-accent transition-colors">
        {title}
      </h3>
      <p className="font-[var(--font-body)] text-[15px] leading-[1.75] text-foreground/80 mb-6">
        {excerpt}
      </p>
      <span className="text-accent text-sm font-medium underline">
        Read this week&apos;s issue →
      </span>
    </a>
  );
}
