"use client";

import { useEffect, useRef, useState } from "react";
import {
  CAT_CLIPS,
  CAT_SCRIPT,
  CAT_SHEET as S,
  CAT_STRIDE,
  type CatClip,
} from "@/data/cat";

/*
  CatRunner – the pixel cat that lives on the hero "platform" (the line above
  GLOBALLY AVAILABLE). One requestAnimationFrame loop drives everything:
  position uses transform only (GPU), frames are swapped only when the pose
  changes, and walking speed is locked to the walk cycle so paws never slide.
  Pauses off-screen / in a hidden tab, respects prefers-reduced-motion.
  Styles: styles/cat-runner.css
*/

const ease = (t: number) => t * t * (3 - 2 * t);

export default function CatRunner() {
  const rootRef = useRef<HTMLDivElement>(null);
  const catRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [debug, setDebug] = useState(false);

  useEffect(() => {
    setDebug(new URLSearchParams(location.search).has("catdebug"));
    const img = new Image();
    img.onload = () => setReady(true);
    img.src = S.src;
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const cat = catRef.current;
    if (!ready || !root || !cat) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let scale = 0.6;
    let trackW = 0;
    let x = 0; // px from the left of the track
    let flip = 1;
    let raf = 0;
    let last = 0;
    let visible = false;
    let shown = ""; // last applied frame key

    /* ---- state ---- */
    let stepI = 0;
    let stepT = 0; // seconds in current step
    let stepFrom = 0; // x when a walk started
    let clipT = 0; // seconds into the current clip
    let walkPhase = 0; // accumulated walk-cycle frames
    let current: CatClip = CAT_CLIPS.sit;

    const measure = () => {
      scale =
        parseFloat(getComputedStyle(root).getPropertyValue("--cat-s")) || 0.6;
      trackW = Math.max(
        0,
        root.clientWidth - (S.cellW - 2 * S.pad + 2 * S.gap) * scale,
      );
    };

    const draw = (clip: CatClip, frame: number, px: number) => {
      const col = clip.frames[frame % clip.frames.length];
      const key = `${clip.row}-${col}-${scale}`;
      if (key !== shown) {
        shown = key;
        cat.style.backgroundPosition = `${-Math.round((S.colX0 + col * S.cellW) * scale)}px ${-Math.round(S.rowY0[clip.row] * scale)}px`;
      }
      const foot = Math.round(S.rowFoot[clip.row] * scale);
      cat.style.transform = `translate3d(${Math.round(px + (S.gap - S.pad) * scale)}px, ${foot}px, 0)`;
    };

    const startStep = (i: number) => {
      stepI = i % CAT_SCRIPT.length;
      stepT = 0;
      clipT = 0;
      const s = CAT_SCRIPT[stepI];
      stepFrom = x;
      current =
        s.do === "walk"
          ? s.dir === 1
            ? CAT_CLIPS.walkR
            : CAT_CLIPS.walkL
          : CAT_CLIPS[s.clip];
      if (s.do === "walk") walkPhase = 0;
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      const s = CAT_SCRIPT[stepI];
      stepT += dt;

      if (s.do === "walk") {
        const target = s.to * trackW;
        const dist = Math.abs(target - stepFrom) || 1;
        const travelled = Math.abs(x - stepFrom);
        const left = Math.abs(target - x);
        /* ease in / out so the cat accelerates and brakes naturally */
        const k = Math.min(
          1,
          0.25 + travelled / (36 * scale),
          0.25 + left / (36 * scale),
        );
        const speed =
          ((CAT_STRIDE * scale * current.fps) / current.frames.length) * k;
        x += s.dir * speed * dt;
        walkPhase += current.fps * k * dt;
        if (s.dir === 1 ? x >= target : x <= target) {
          x = target;
          startStep(stepI + 1);
        }
        void dist;
        draw(current, Math.floor(walkPhase), x);
      } else {
        clipT += dt;
        const total = current.frames.length;
        const once = s.seconds === undefined;
        const cycles = once ? (s.loops ?? 1) : 0;
        const f = Math.floor(clipT * current.fps);
        const done = once ? f >= total * cycles : stepT >= (s.seconds ?? 0);
        draw(current, once ? Math.min(f, total * cycles - 1) : f, x);
        if (done) startStep(stepI + 1);
      }
    };

    const start = () => {
      cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    measure();
    x = 0;
    startStep(0);

    if (reduced.matches) {
      /* no motion: a calm sitting cat in the middle of the platform */
      current = CAT_CLIPS.sit;
      draw(current, 1, trackW * 0.5);
      root.dataset.static = "";
      return;
    }

    const ro = new ResizeObserver(() => {
      const before = trackW || 1;
      measure();
      x = (x / before) * trackW; // keep the same relative spot on resize
      stepFrom = (stepFrom / before) * trackW;
    });
    ro.observe(root);

    const io = new IntersectionObserver(
      ([e]) => {
        visible = e.isIntersecting && !document.hidden;
        last = performance.now();
      },
      { threshold: 0 },
    );
    io.observe(root);
    const onVis = () => {
      visible = !document.hidden && visible;
      last = performance.now();
    };
    document.addEventListener("visibilitychange", onVis);
    start();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [ready]);

  return (
    <>
      <div
        ref={rootRef}
        className={`cat${ready ? " is-ready" : ""}`}
        aria-hidden="true"
      >
        <div ref={catRef} className="cat__sprite" />
      </div>
      {debug ? <CatDebug /> : null}
    </>
  );
}

/* ?catdebug=1 – shows the sheet with the cell grid for calibration */
function CatDebug() {
  const k = 0.5;
  return (
    <div
      className="cat-debug"
      style={{ width: S.width * k, height: S.height * k }}
    >
      <img src={S.src} alt="" width={S.width * k} height={S.height * k} />
      {S.rowY0.flatMap((y, r) =>
        [0, 1, 2, 3].map((c) => (
          <i
            key={`${r}-${c}`}
            style={{
              left: (S.colX0 + c * S.cellW) * k,
              top: y * k,
              width: S.cellW * k,
              height: S.cellH * k,
            }}
          />
        )),
      )}
    </div>
  );
}
