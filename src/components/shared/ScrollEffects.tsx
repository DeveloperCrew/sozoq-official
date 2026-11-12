"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/* Page-wide scroll animations, mounted once in the root layout:
   1) text reveal (headings, paragraphs, cards) as they enter the viewport
   2) the scroll-linked "process" line on the home page (desktop + mobile)
   3) the scroll-linked grey -> black process row on the service detail pages */

/* ============================ 1) text reveal ============================ */

const SELECTORS = [
  /* shared footer + /work page */
  ".work__title-1",
  ".work__title-2",
  ".proj__title",
  ".proj__desc",
  ".proj__link-wrap",
  ".contact__title",
  ".contact__mail-wrap",
  ".legal__copy",
  ".legal__link",
  /* /contact */
  ".ct__h1",
  ".ct__lead",
  ".ct-card",
  ".ct-form",
  /* /services + legal pages */
  ".svcp__h1",
  ".svcp__lead",
  ".svcp__label",
  ".svcp__h2",
  ".svcp__p",
  ".svcp__updated",
  ".svcp__h3",
  ".svcp__li",
  ".svcp__line",
  /* case studies */
  ".case-eyebrow",
  ".case-h2",
  ".case-body p",
  ".case-list__intro",
  ".case-list__row h3",
  ".case-list__row p",
  ".case-list__outro",
  ".case-fig__caption",
  /* home: desktop */
  ".dh-hero__title > span",
  ".dh-hero__text",
  ".dh-tag",
  ".dh-trusted__title",
  ".dh-eyebrow",
  ".dh-h2",
  ".dh-lead",
  ".dh-svc",
  ".dh-proj__title",
  ".dh-proj__desc",
  ".dh-step__title",
  ".dh-step__text",
  ".dh-about__copy p",
  ".dh-faq__item",
  ".dh-contact__title",
  ".dh-legal__copy",
  /* home: mobile */
  ".mh-hero__title > span",
  ".mh-hero__text",
  ".mh-tag",
  ".mh-trusted__title",
  ".mh-eyebrow",
  ".mh-h2",
  ".mh-lead",
  ".mh-svc",
  ".mh-proj__title",
  ".mh-proj__desc",
  ".mh-step__title",
  ".mh-step__text",
  ".mh-about__copy p",
  ".mh-faq__item",
  ".mh-contact__title",
  ".mh-legal__copy",
  /* service detail pages */
  ".sd-eyebrow__in",
  ".sd-h1",
  ".sd-hero__lead",
  ".sd-fig",
  ".sd-sec__label",
  ".sd-h2",
  "p.sd-p",
  ".sd-item",
  ".sd-step__title",
  ".sd-step__desc",
  ".sd-bul li",
].join(",");

/* CONTAINERS (cards / boxes): the whole box rises + fades in, one by one */
const BOX_SELECTORS = [
  ".ct-card",
  ".ct-form",
  ".dh-faq__item",
  ".mh-faq__item",
  ".dh-svc",
  ".mh-svc",
  ".sd-fig",
].join(",");

/* TEXT revealed LINE BY LINE (add selectors here to use it on more text) */
const LINE_SELECTORS = [".ct__lead", ".dh-hero__text", ".mh-hero__text"].join(
  ",",
);

/* BODY text: the whole paragraph comes up at once (no splitting).
   Headings use the mask effect below, other short labels fade word by word. */
const BLOCK_SELECTORS = [
  ".proj__desc",
  ".svcp__lead",
  ".svcp__p",
  ".svcp__updated",
  ".svcp__h3",
  ".svcp__li",
  ".svcp__line",
  ".case-body p",
  ".case-list__intro",
  ".case-list__row p",
  ".case-list__outro",
  ".dh-proj__desc",
  ".mh-proj__desc",
  ".dh-lead",
  ".mh-lead",
  ".dh-about__copy p",
  ".mh-about__copy p",
  ".dh-step__text",
  ".mh-step__text",
  ".sd-hero__lead",
  "p.sd-p",
  ".sd-item",
  ".sd-step__desc",
  ".sd-bul li",
].join(",");

/* HEADINGS: each word slides up from behind a mask (like a clipped line).
   Add / remove selectors here to choose which text gets this effect. */
const MASK_SELECTORS = [
  ".work__title-1",
  ".work__title-2",
  ".proj__title",
  ".contact__title",
  ".ct__h1",
  ".svcp__h1",
  ".svcp__h2",
  ".case-h2",
  ".case-list__row h3",
  ".dh-hero__title > span",
  ".mh-hero__title > span",
  ".dh-h2",
  ".mh-h2",
  ".dh-svc__title",
  ".dh-proj__title",
  ".mh-proj__title",
  ".dh-step__title",
  ".mh-step__title",
  ".dh-trusted__title",
  ".mh-trusted__title",
  ".dh-contact__title",
  ".mh-contact__title",
  ".sd-h1",
  ".sd-h2",
  ".sd-step__title",
].join(",");

/* split an element's text into words (links, icons and counters stay intact).
   every word / icon gets class "rv-ch" and an index in --i */
function splitWords(el: HTMLElement, mask: boolean): number {
  let i = 0;
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child instanceof Text) {
        const text = child.textContent ?? "";
        if (!text.trim()) return;
        const frag = document.createDocumentFragment();
        text.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(part));
            return;
          }
          const word = document.createElement("span");
          if (mask) {
            // outer span = the mask, inner span = the word that slides up
            word.className = "rv-w rv-mask";
            const inner = document.createElement("span");
            inner.className = "rv-ch";
            inner.style.setProperty("--i", String(i++));
            inner.textContent = part;
            word.appendChild(inner);
          } else {
            word.className = "rv-w rv-ch";
            word.style.setProperty("--i", String(i++));
            word.textContent = part;
          }
          frag.appendChild(word);
        });
        child.replaceWith(frag);
      } else if (child instanceof HTMLElement || child instanceof SVGElement) {
        const tag = child.tagName.toUpperCase();
        if (tag === "IMG" || tag === "SVG") {
          child.classList.add("rv-ch"); // icons animate as one piece
          child.style.setProperty("--i", String(i++));
        } else if (tag !== "BR") {
          walk(child);
        }
      }
    });
  };
  walk(el);
  return i;
}

/* line mode: give every word the index of the LINE it sits on,
   so all words of one line share the same delay */
function assignLines(el: HTMLElement) {
  let line = -1;
  let lastTop: number | null = null;
  el.querySelectorAll<HTMLElement>(".rv-ch").forEach((u) => {
    const top = u.offsetTop;
    if (lastTop === null || Math.abs(top - lastTop) > 4) {
      line++;
      lastTop = top;
    }
    u.style.setProperty("--i", String(line));
  });
}

/* paragraphs + boxes: animated from JS (no CSS needed).
   hidden state = inline style, reveal = Web Animations API */
function hideBlock(el: HTMLElement, dist: number) {
  el.style.opacity = "0";
  el.style.translate = `0 ${dist}px`;
}
function playBlock(el: HTMLElement, step: number) {
  const box = el.hasAttribute("data-reveal-box");
  const dist = box ? 36 : 24;
  el.style.removeProperty("opacity");
  el.style.removeProperty("translate");
  if (!el.animate) return;
  el.animate(
    [
      { opacity: 0, translate: `0 ${dist}px` },
      { opacity: 1, translate: "0 0" },
    ],
    {
      duration: box ? 900 : 800,
      // paragraphs wait 250ms extra, boxes use a wider gap between each other
      delay: box ? step * 160 : 250 + step * 80,
      easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      fill: "backwards",
    },
  );
}

function useTextReveal() {
  const pathname = usePathname();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const els = Array.from(document.querySelectorAll<HTMLElement>(SELECTORS));
    let pending = els.slice();
    let raf = 0;
    const originals = new Map<HTMLElement, string>();
    const lineEls: HTMLElement[] = [];

    // reveal everything whose top edge is inside the viewport
    const check = () => {
      raf = 0;
      const limit = window.innerHeight * 0.92;
      // at the very bottom of the page, reveal everything left (footer bar)
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      let n = 0;
      pending = pending.filter((el) => {
        const r = el.getBoundingClientRect();
        if ((r.top < limit || atBottom) && r.bottom > 0) {
          const step = Math.min(n++, 6);
          el.style.setProperty("--base", `${step * 80}ms`);
          el.setAttribute("data-reveal", "in");
          if (
            el.hasAttribute("data-reveal-block") ||
            el.hasAttribute("data-reveal-box")
          ) {
            playBlock(el, step);
          }
          return false;
        }
        return true;
      });
      if (!pending.length) stop();
    };
    const queue = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    const stop = () => {
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };

    // 1) split text and hide everything not yet revealed
    els.forEach((el) => {
      if (getComputedStyle(el).display === "inline") {
        el.style.display = "inline-block";
      }
      if (el.matches(BOX_SELECTORS)) {
        // whole container: animated by CSS only, text inside is not split
        el.setAttribute("data-reveal-box", "");
        hideBlock(el, 36);
        el.setAttribute("data-reveal", "out");
        return;
      }
      if (el.matches(BLOCK_SELECTORS)) {
        // body paragraph: animate the whole block, no splitting
        el.setAttribute("data-reveal-block", "");
        hideBlock(el, 24);
        el.setAttribute("data-reveal", "out");
        return;
      }
      if (el.matches(LINE_SELECTORS)) {
        // line by line: words share the delay of the line they sit on
        originals.set(el, el.innerHTML);
        splitWords(el, false);
        lineEls.push(el);
        el.style.setProperty("--d", "450ms"); // gap between lines
        assignLines(el);
        el.setAttribute("data-reveal", "out");
        return;
      }
      originals.set(el, el.innerHTML);
      const isMask = el.matches(MASK_SELECTORS);
      const count = splitWords(el, isMask);
      // headings / labels: one step per WORD (long ones squeezed to ~1s)
      const step = isMask ? 110 : 90;
      el.style.setProperty(
        "--d",
        `${Math.min(step, 1000 / Math.max(count, 1))}ms`,
      );
      el.setAttribute("data-reveal", "out");
    });

    // line breaks change on resize / when fonts finish loading: recompute
    let relayoutTimer: ReturnType<typeof setTimeout> | undefined;
    const relayout = () => {
      clearTimeout(relayoutTimer);
      relayoutTimer = setTimeout(() => lineEls.forEach(assignLines), 120);
    };
    window.addEventListener("resize", relayout);
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(relayout);
    }

    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);

    // 2) next frames: reveal what is already on screen (hero etc.)
    //    two frames so the "out" state is painted first and the transition runs
    requestAnimationFrame(() => requestAnimationFrame(check));

    // safety net: never leave text hidden for more than 4s while in view
    const t = setTimeout(check, 4000);

    return () => {
      clearTimeout(t);
      clearTimeout(relayoutTimer);
      window.removeEventListener("resize", relayout);
      cancelAnimationFrame(raf);
      stop();
      els.forEach((el) => {
        el.removeAttribute("data-reveal");
        el.removeAttribute("data-reveal-block");
        el.removeAttribute("data-reveal-box");
        el.style.removeProperty("opacity");
        el.style.removeProperty("translate");
        el.style.removeProperty("--base");
        el.style.removeProperty("--d");
        const html = originals.get(el);
        if (html !== undefined) el.innerHTML = html;
      });
    };
  }, [pathname]);
}

/* ===================== 2) scroll-linked process line ===================== */

/* Desktop: one red line from icon 1 to icon 3. --p (0..1) is how much of it is
   drawn; icon 2 / icon 3 light up (class is-lit-2 / is-lit-3 on the list) when
   the line reaches their left edge.
   Mobile: a short vertical red line in the gap above step 2 and above step 3
   (--p2 / --p3), then that icon lights up. */
function useProcessProgress() {
  useEffect(() => {
    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;

      /* ---------- desktop ---------- */
      document.querySelectorAll<HTMLElement>(".dh-steps").forEach((steps) => {
        if (!steps.getClientRects().length) return; // hidden (mobile layout)
        const icons = steps.querySelectorAll<HTMLElement>(".dh-step__icon");
        if (icons.length < 3) return;
        const first = icons[0].getBoundingClientRect();
        const last = icons[icons.length - 1].getBoundingClientRect();

        const p = reduce ? 1 : clamp((vh * 0.8 - first.top) / (vh * 0.45));
        steps.style.setProperty("--p", p.toFixed(3));

        // where the red line ends right now (x position on screen)
        const start = first.right;
        const end = last.left + last.width / 2;
        const x = start + p * (end - start);
        icons.forEach((icon, i) => {
          if (i === 0) return;
          steps.classList.toggle(
            `is-lit-${i + 1}`,
            x >= icon.getBoundingClientRect().left,
          );
        });
      });

      /* ---------- mobile ---------- */
      document.querySelectorAll<HTMLElement>(".mh-steps").forEach((steps) => {
        if (!steps.getClientRects().length) return; // hidden (desktop layout)
        const icons = steps.querySelectorAll<HTMLElement>(".mh-step__icon");
        icons.forEach((icon, i) => {
          if (i === 0) return;
          const top = icon.getBoundingClientRect().top;
          const p = reduce ? 1 : clamp((vh * 0.8 - top) / (vh * 0.2));
          steps.style.setProperty(`--p${i + 1}`, p.toFixed(3));
          steps.classList.toggle(`is-lit-${i + 1}`, p >= 0.98);
        });
      });
    };

    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, []);
}

/* ============ 3) service detail pages: grey -> black process progress ============ */

/* --p (0..1) is how much of the connecting line is drawn. Each circle turns
   black (class "is-lit") once the line reaches its centre. */
function useServiceFlowProgress() {
  const pathname = usePathname();

  useEffect(() => {
    const flows = Array.from(
      document.querySelectorAll<HTMLElement>(".sd-flow"),
    );
    if (!flows.length) return;

    const clamp = (v: number) => Math.min(1, Math.max(0, v));
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const maxScroll = document.documentElement.scrollHeight - vh;
      const leftToScroll = Math.max(0, maxScroll - window.scrollY);
      const atBottom = leftToScroll < 4;

      flows.forEach((flow) => {
        if (!flow.getClientRects().length) return; // hidden desktop/mobile copy
        const line = flow.querySelector<HTMLElement>(".sd-flow__line");
        const dots = Array.from(
          flow.querySelectorAll<HTMLElement>(".sd-step__dot"),
        );
        if (!line || dots.length < 2) return;

        const top = dots[0].getBoundingClientRect().top;

        /* where the dots will be when the page is scrolled to the very bottom */
        const finalTop = top - leftToScroll;

        /* start drawing when the dots reach 85% of the screen height;
           shorter distance on mobile = faster fill */
        const startTop = vh * 0.85;
        const span = vh * (window.innerWidth < 768 ? 0.22 : 0.4);

        /* finish at (start - span), but never below the lowest spot the dots
           can actually reach, so the line always completes before the page ends */
        const endTop = Math.max(startTop - span, finalTop + 40);
        const range = Math.max(startTop - endTop, 40);

        const p = reduce || atBottom ? 1 : clamp((startTop - top) / range);
        flow.style.setProperty("--p", p.toFixed(3));

        const lr = line.getBoundingClientRect();
        const x = lr.left + p * lr.width;
        dots.forEach((dot, i) => {
          const r = dot.getBoundingClientRect();
          const lit =
            p > 0 && (i === 0 || p >= 0.999 || x >= r.left + r.width / 2 - 1);
          dot.classList.toggle("is-lit", lit);
        });
      });
    };

    const queue = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("resize", queue);
    };
  }, [pathname]);
}

/* /#service etc.: the home page has a mobile and a desktop copy of some ids.
   The browser jumps to the first one, which is the hidden copy on desktop,
   so it never scrolls. Scroll to the visible copy instead. */
function useHashScroll() {
  useEffect(() => {
    const go = () => {
      const id = decodeURIComponent(window.location.hash.slice(1));
      if (!id) return;
      const el = Array.from(
        document.querySelectorAll<HTMLElement>(`[id="${id}"]`),
      ).find((e) => e.getClientRects().length > 0);
      el?.scrollIntoView();
    };
    const t = window.setTimeout(go, 100);
    window.addEventListener("hashchange", go);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("hashchange", go);
    };
  }, []);
}

export default function ScrollEffects() {
  useTextReveal();
  useProcessProgress();
  useServiceFlowProgress();
  useHashScroll();
  return null;
}
