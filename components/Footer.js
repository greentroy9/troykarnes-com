import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="bg-black text-background py-[60px] font-[var(--font-ui)]">
        <div className="max-w-7xl mx-auto px-6 grid gap-12 md:grid-cols-3">
          <div>
            <div className="font-[var(--font-display)] font-bold text-lg mb-4">
              Troy Karnes
            </div>
            <p className="font-[var(--font-body)] text-[15px] leading-relaxed mb-6 text-background/85">
              I help founders, executives, and consultants write the books
              they&apos;ve been carrying.
            </p>
            <div className="flex gap-5 text-sm">
              <a
                href="https://www.linkedin.com/in/troykarnes/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                LinkedIn
              </a>
              <a
                href="https://haltblog.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                Substack
              </a>
            </div>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-[2px] text-accent font-semibold mb-4">
              Navigation
            </div>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/heros-draft" className="hover:text-accent">
                  The Hero&apos;s Draft
                </Link>
              </li>
              <li>
                <Link href="/ghostwriting" className="hover:text-accent">
                  Ghostwriting
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent">
                  About
                </Link>
              </li>
              <li>
                <Link href="/writing" className="hover:text-accent">
                  Writing
                </Link>
              </li>
              <li>
                <Link href="/book" className="hover:text-accent">
                  No Silver Bullets
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] uppercase tracking-[2px] text-accent font-semibold mb-4">
              Stay in Touch
            </div>
            <form
              action="https://haltblog.substack.com/api/v1/free?nojs=true"
              method="post"
              target="_blank"
              className="flex flex-col gap-2"
            >
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                required
                aria-label="Email address"
                className="w-full px-3 py-2 bg-background text-foreground text-sm placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent"
              />
              <button
                type="submit"
                className="bg-accent text-background font-medium text-sm px-4 py-2 hover:bg-brand"
              >
                Subscribe →
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="bg-brand text-background text-[11px] py-3 text-center font-[var(--font-ui)]">
        © 2025 Troy Karnes · All rights reserved
      </div>
    </footer>
  );
}
