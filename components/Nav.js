import Link from "next/link";

const links = [
  { href: "/", label: "Home", hideOnMobile: true },
  { href: "/heros-draft", label: "The Hero's Draft" },
  { href: "/ghostwriting", label: "Ghostwriting", hideOnMobile: true },
  { href: "/about", label: "About" },
  { href: "/writing", label: "My Work" },
];

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-surface">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between gap-4 md:gap-6 font-[var(--font-ui)] text-[13px]">
        <Link
          href="/"
          className="font-[var(--font-display)] font-bold text-base hover:text-brand whitespace-nowrap"
        >
          Troy Karnes
        </Link>
        <div className="flex items-center gap-4 md:gap-7">
          {links.map(({ href, label, hideOnMobile }) => (
            <Link
              key={href}
              href={href}
              className={`font-medium hover:text-brand whitespace-nowrap ${
                hideOnMobile ? "hidden md:inline-block" : ""
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/begin"
            className="bg-accent text-background font-medium px-[18px] py-[8px] hover:bg-brand whitespace-nowrap"
          >
            Apply Here →
          </Link>
        </div>
      </div>
    </nav>
  );
}
