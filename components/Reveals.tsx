"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Reveals() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Wait a frame so freshly-routed content is in the DOM.
    const id = requestAnimationFrame(() => {
      const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
      if (reduce || !("IntersectionObserver" in window)) {
        els.forEach((e) => e.classList.add("in"));
        return;
      }
      const io = new IntersectionObserver(
        (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } }),
        { threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
      );
      els.forEach((e) => io.observe(e));
      // store for cleanup
      (window as unknown as { __qaiIO?: IntersectionObserver }).__qaiIO = io;
    });
    return () => {
      cancelAnimationFrame(id);
      (window as unknown as { __qaiIO?: IntersectionObserver }).__qaiIO?.disconnect();
    };
  }, [pathname]);

  return null;
}
