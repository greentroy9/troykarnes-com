import JournalNav from "./JournalNav";
import RegisterSW from "./RegisterSW";

export const metadata = {
  title: { absolute: "HALT Journal" },
  description: "Private journal.",
  robots: { index: false, follow: false, nocache: true },
  manifest: "/journal.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HALT",
  },
  icons: {
    apple: "/journal-icon-192.png",
  },
};

export const viewport = {
  themeColor: "#69995d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function JournalLayout({ children }) {
  return (
    <div className="min-h-screen bg-background font-[var(--font-ui)] pb-20">
      <RegisterSW />
      {children}
      <JournalNav />
    </div>
  );
}
