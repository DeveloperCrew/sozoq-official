"use client";

import { useEffect, useState } from "react";
import type { MouseEvent } from "react";

interface TocItem {
  id: string;
  label: string;
}

/* "In this project" sidebar – highlights the section being read and
   smooth-scrolls to a section when clicked. */
export default function CaseToc({ items }: { items: TocItem[] }) {
  const [current, setCurrent] = useState(items[0]?.id);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);
    if (!els.length || typeof IntersectionObserver === "undefined") return;

    // a section is "current" while it crosses the upper part of the screen
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setCurrent(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  const go = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", `#${id}`);
    setCurrent(id);
  };

  return (
    <nav className="case-toc" aria-label="In this project">
      <p className="case-eyebrow">In this project</p>
      <ul className="case-toc__list">
        {items.map(({ id, label }) => (
          <li key={id}>
            <a
              className={`case-toc__link${current === id ? " is-current" : ""}`}
              href={`#${id}`}
              aria-current={current === id ? "true" : undefined}
              onClick={(e) => go(e, id)}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
