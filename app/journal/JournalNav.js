"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/journal", label: "Check-in", icon: "✏️" },
  { href: "/journal/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/journal/archive", label: "Archive", icon: "📚" },
  { href: "/journal/year", label: "Year", icon: "🏆" },
  { href: "/journal/settings", label: "Settings", icon: "⚙️" },
];

export default function JournalNav() {
  const pathname = usePathname();
  if (pathname === "/journal/login") return null;
  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-background border-t border-divider pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-2xl mx-auto flex">
        {tabs.map((t) => {
          const active =
            t.href === "/journal"
              ? pathname === "/journal"
              : pathname.startsWith(t.href);
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-[11px] ${
                active ? "text-brand font-semibold" : "text-ink/60"
              }`}
            >
              <span className="text-lg leading-none">{t.icon}</span>
              {t.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
