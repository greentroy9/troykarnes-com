"use client";
import { usePathname } from "next/navigation";

// Hides the marketing site chrome (Nav/Footer) on journal pages.
export default function ChromeGate({ children }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/journal")) return null;
  return children;
}
