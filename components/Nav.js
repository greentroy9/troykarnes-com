import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/heros-draft", label: "The Hero's Draft" },
  { href: "/ghostwriting", label: "Ghostwriting" },
  { href: "/about", label: "About" },
  { href: "/writing", label: "Read" },
];

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-surface">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-6 font-[var(--font-ui)] text-[13px]">
        <Link
          href="/"
          className="font-[var(--font-display)] font-bold text-base hover:text-brand"
        >
          Troy Karnes
        </Link>
        <div className="flex items-center gap-7">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="font-medium hover:text-brand"
            >
              {label}
            </Link>
          ))}
          <a
            href="https://tidycal.com/troydkarnes/discovery"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent text-background font-medium px-[18px] py-[8px] hover:bg-brand"
          >
            Book a Call →
          </a>
        </div>
      </div>
    </nav>
  );
}
