"use client";

import { useState } from "react";
import { ICONS, PEOPLE } from "@/data/content";
import type { Person } from "@/types";

function Polaroid({ person }: { person: Person }) {
  return (
    <div className="polaroid">
      <div className="polaroid__img" style={{ overflow: "hidden" }}>
        <img
          src={person.photo}
          alt={person.name.trim()}
          style={{
            objectPosition: person.focus,
            transform: person.zoom ? `scale(${person.zoom})` : undefined,
            transformOrigin: person.zoomOrigin,
          }}
        />
      </div>
      <div className="polaroid__caption">
        <p className="polaroid__name">{person.name}</p>
        {person.role ? <p className="polaroid__role">{person.role}</p> : null}
      </div>
    </div>
  );
}

/* Photo stack + counter + prev/next buttons (left column of the About row).
   `className` is the layout's wrapper class: "dh-about__side" or "mh-about__side". */
export default function PhotoStack({ className }: { className: string }) {
  const total = PEOPLE.length;
  const [active, setActive] = useState(0);
  const step = (d: number) => {
    if (total > 1) setActive((i) => (i + d + total) % total);
  };

  return (
    <div className={className}>
      <div className="about__photos">
        <div className="about__stack">
          {PEOPLE.map((person, i) => {
            // 0 = front photo, 1 = the one right behind it, others hidden
            const slot = (i - active + total) % total;
            const place =
              slot === 0
                ? "pol--front"
                : slot === 1
                  ? "pol--back"
                  : "pol--hidden";
            return (
              <div
                key={person.name}
                className={`pol ${place}`}
                onClick={() => slot < 2 && step(1)}
                onKeyDown={(e) => {
                  if (slot === 0 && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    step(1);
                  }
                }}
                role={slot === 0 ? "button" : undefined}
                tabIndex={slot === 0 ? 0 : undefined}
                aria-label={slot === 0 ? "Show next photograph" : undefined}
              >
                <div className="pol__rot">
                  <Polaroid person={person} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="about__controls">
        <p className="about__count">
          {String(active + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </p>
        <div className="about__btns">
          <button
            type="button"
            className="about__btn"
            aria-label="Previous photograph"
            onClick={() => step(-1)}
          >
            <img src={ICONS.arrowLeft} alt="" width={14} height={14} />
          </button>
          <button
            type="button"
            className="about__btn"
            aria-label="Next photograph"
            onClick={() => step(1)}
          >
            <img src={ICONS.arrowRight} alt="" width={14} height={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
