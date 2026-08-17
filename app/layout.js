import { Raleway, Libre_Baskerville, Libre_Franklin } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ChromeGate from "@/components/ChromeGate";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const baskerville = Libre_Baskerville({
  variable: "--font-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
});

const franklin = Libre_Franklin({
  variable: "--font-franklin",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://www.troykarnes.com"),
  title: {
    template: "%s | Troy Karnes",
    default: "Troy Karnes: Book Coach and Ghostwriter",
  },
  description:
    "I help founders, executives, and consultants write the books they've been carrying.",
  openGraph: {
    type: "website",
    siteName: "Troy Karnes",
    title: "Troy Karnes: Book Coach and Ghostwriter",
    description:
      "I help founders, executives, and consultants write the books they've been carrying.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Troy Karnes: Book Coach and Ghostwriter",
    description:
      "I help founders, executives, and consultants write the books they've been carrying.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${raleway.variable} ${baskerville.variable} ${franklin.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ChromeGate>
          <Nav />
        </ChromeGate>
        <main className="flex-1">{children}</main>
        <ChromeGate>
          <Footer />
        </ChromeGate>
      </body>
    </html>
  );
}
