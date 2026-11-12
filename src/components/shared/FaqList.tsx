"use client";

import { useState } from "react";
import type { FaqItem } from "@/types";

interface FaqListProps {
  /** CSS prefix of the layout: "dh" (desktop) or "mh" (mobile) */
  prefix: "dh" | "mh";
  items: FaqItem[];
  /** question that is open on load (-1 = all closed) */
  initialOpen: number;
  icon: string;
}

/* Home FAQ accordion (desktop Figma 4168:7358 · mobile 4130:4243).
   Items without an answer in the data are shown but don't expand. */
export default function FaqList({ prefix, items, initialOpen, icon }: FaqListProps) {
  const [open, setOpen] = useState(initialOpen);

  return (
    <ul className={`${prefix}-faq__list`}>
      {items.map((f, i) => {
        const canOpen = Boolean(f.a);
        const isOpen = canOpen && open === i;
        return (
          <li className={`${prefix}-faq__item${isOpen ? " is-open" : ""}`} key={f.q}>
            <button
              type="button"
              className={`${prefix}-faq__btn`}
              aria-expanded={canOpen ? isOpen : undefined}
              aria-controls={canOpen ? `${prefix}-faq-a-${i}` : undefined}
              onClick={() => canOpen && setOpen(isOpen ? -1 : i)}
            >
              <span className={`${prefix}-faq__q`}>{f.q}</span>
              <span className={`${prefix}-faq__icon`} aria-hidden="true">
                <img src={icon} alt="" width={16} height={16} />
              </span>
            </button>
            {canOpen ? (
              <div
                className={`${prefix}-faq__a-wrap`}
                id={`${prefix}-faq-a-${i}`}
                role="region"
              >
                <div className={`${prefix}-faq__a`}>
                  <p>{f.a}</p>
                </div>
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
