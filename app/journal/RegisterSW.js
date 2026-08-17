"use client";
import { useEffect } from "react";

export default function RegisterSW() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/journal-sw.js", { scope: "/journal" })
        .catch(() => {});
    }
  }, []);
  return null;
}
