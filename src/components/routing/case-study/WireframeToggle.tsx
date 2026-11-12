"use client";

import { useState } from "react";
import type { SyntheticEvent } from "react";
import type { CaseToggleData, CSSVars } from "@/types";

/* "Wireframe ⇄ Full colour" switch + the 880 × 607 framed screenshot under it
   (Figma "Sozokyu Dashboard" 3895:4674 – toggle 3895:4675, frame 3895:4702).

   Both screens sit in the same frame; the wireframe layer is on top and is
   wiped in / out (Colour → Wireframe: right → left,
   Wireframe → Colour: left → right) when the switch (or either
   label) is used. Every measurement is the Figma value expressed as a % of
   the frame so it scales with the column. */

/* ── switch size: change ONLY these numbers (originals: 88 / 30 / 6 / 9 / 4) ── */
const SWITCH_W = 128; // total width
const SWITCH_H = 32; // total height
const GROOVE = 8; // thickness of the dark bar
const TICK_LONG = 12; // long tick height
const TICK_SHORT = 6; // short tick height

/* long ticks every 35px, 3 short ticks between each pair */
const longX: number[] = [];
for (let x = 9; x <= SWITCH_W - 9; x += 35) longX.push(x);

/* [x, top] – top row sits 3px from the top, bottom row 3px from the bottom */
const TICKS_LONG: [number, number][] = longX.flatMap((x): [number, number][] => [
  [x, 3],
  [x, SWITCH_H - 3 - TICK_LONG],
]);
const TICKS_SHORT: [number, number][] = longX.slice(0, -1).flatMap((x) =>
  [8, 18, 28].flatMap((o): [number, number][] => [
    [x + o, 3],
    [x + o, SWITCH_H - 3 - TICK_SHORT],
  ]),
);

/* a missing file shouldn't show the browser's broken-image glyph */
const hideBroken = (e: SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.style.visibility = "hidden";
};

export default function WireframeToggle({
  colour,
  wireframe,
  defaultColour = true,
}: CaseToggleData) {
  const [isColour, setIsColour] = useState(defaultColour);
  /* counts clicks – used as a key so the shine animation replays every time */
  const [clicks, setClicks] = useState(0);

  const choose = (value: boolean) => {
    setIsColour(value);
    setClicks((c) => c + 1);
  };

  return (
    <div className="case-toggle">
      <div className="case-toggle__bar">
        <button
          type="button"
          className={`case-toggle__label${isColour ? "" : " is-on"}`}
          onClick={() => choose(false)}
        >
          Wireframe
        </button>

        <button
          type="button"
          role="switch"
          aria-checked={isColour}
          aria-label="Full colour"
          className={`case-switch${isColour ? " is-on" : ""}`}
          style={{
            "--w": `${SWITCH_W}px`,
            "--h": `${SWITCH_H}px`,
            "--g": `${GROOVE}px`,
            "--tl": `${TICK_LONG}px`,
            "--ts": `${TICK_SHORT}px`,
          } as CSSVars}
          onClick={() => choose(!isColour)}
        >
          <span className="case-switch__groove">
            <span className="case-switch__fill" />
          </span>
          {TICKS_LONG.map(([x, top]) => (
            <span
              key={`l${x}-${top}`}
              className="case-switch__tick case-switch__tick--long"
              style={{ left: x - 0.5, top }}
            />
          ))}
          {TICKS_SHORT.map(([x, top]) => (
            <span
              key={`s${x}-${top}`}
              className="case-switch__tick case-switch__tick--short"
              style={{ left: x - 0.5, top }}
            />
          ))}
          <span className="case-switch__knob">
            <span className="case-switch__glow" />
            {/* shine sweep – plays 1s after each click, knob only */}
            {clicks > 0 && (
              <span
                key={clicks}
                className="case-switch__shine"
                aria-hidden="true"
              />
            )}
          </span>
        </button>

        <button
          type="button"
          className={`case-toggle__label${isColour ? " is-on" : ""}`}
          onClick={() => choose(true)}
        >
          Full colour
        </button>
      </div>

      <figure className="case-dash">
        {/* full-colour screenshot */}
        <div className="case-dash__shot" aria-hidden={!isColour}>
          <img
            className="case-dash__shot-img"
            src={colour.src}
            alt={colour.alt}
            loading="eager"
            decoding="async"
            onError={hideBroken}
          />
        </div>

        {/* wireframe (on top, wipes in from the right / out to the right) */}
        <div
          className={`case-dash__wire${isColour ? "" : " is-on"}`}
          aria-hidden={isColour}
        >
          <img
            className="case-dash__wire-img"
            src={wireframe.src}
            alt={wireframe.alt}
            loading="eager"
            decoding="async"
            onError={hideBroken}
          />
        </div>
      </figure>
    </div>
  );
}
