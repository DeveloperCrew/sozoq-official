"use client";

import { useEffect } from "react";

/* The floating menu's "Home" link points at #home, which belongs to the
   desktop hero (hidden on mobile). On mobile, scroll to the top instead. */
export default function MobileScrollTop() {
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const onClick = (e: MouseEvent) => {
      const target = e.target;
      const a = target instanceof Element ? target.closest('a[href="#home"]') : null;
      if (!a || !mq.matches) return;
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
