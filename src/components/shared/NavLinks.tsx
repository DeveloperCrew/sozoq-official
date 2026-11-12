"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import type { NavLink, CSSVars } from "@/types";
import { SERVICE_MENU_ITEMS } from "@/data/content";
import ServiceMenu from "./ServiceMenu";

/* icons are only shown in the floating mobile bar (hidden on desktop by CSS) */
const ICON_BY_LABEL: Record<string, string> = {
  Home: "/assets/icons/nav/home.svg",
  Work: "/assets/icons/nav/work.svg",
  Service: "/assets/icons/nav/service.svg",
  Contact: "/assets/icons/nav/contact.svg",
};
/* filled icons for the selected tab, kept in code so no extra svg files are needed */
const svgUrl = (inner: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">${inner}</svg>`,
  )}")`;

const G = "#7a7a80"; // grey fill of the selected icon

const ICON_FILLED_BY_LABEL: Record<string, string> = {
  Home: svgUrl(
    `<path fill="${G}" stroke="${G}" stroke-width="1.5" stroke-linejoin="round" d="M3 11.9896V14.5C3 17.7998 3 19.4497 4.02513 20.4749C5.05025 21.5 6.70017 21.5 10 21.5H14C17.2998 21.5 18.9497 21.5 19.9749 20.4749C21 19.4497 21 17.7998 21 14.5V11.9896C21 10.3083 21 9.46773 20.6441 8.74005C20.2882 8.01237 19.6247 7.49628 18.2976 6.46411L16.2976 4.90855C14.2331 3.30285 13.2009 2.5 12 2.5C10.7991 2.5 9.76689 3.30285 7.70242 4.90855L5.70241 6.46411C4.37533 7.49628 3.71179 8.01237 3.3559 8.74005C3 9.46773 3 10.3083 3 11.9896Z"/><path d="M12 14.5V17.5" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>`,
  ),
  Service: svgUrl(
    `<path fill="${G}" stroke="${G}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" d="M12 6.5C7.9197 6.5 4.55286 9.55471 4.06165 13.502C3.99344 14.05 3.51867 14.4791 3.05228 14.7749C2.63889 15.0371 2.33878 15.4673 2.2534 15.9796L2 17H22L21.7466 15.9796C21.6612 15.4673 21.3611 15.0371 20.9477 14.7749C20.4813 14.4791 20.0066 14.05 19.9384 13.502C19.4471 9.55471 16.0803 6.5 12 6.5Z"/><path d="M12 6.5V3.5M12 3.5H9.5M12 3.5H14.5" stroke="${G}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M19 5.5L18.5 6.5M20.5009 8.5L21.5 8" stroke="${G}" stroke-width="1.5" stroke-linecap="round"/><path d="M5 5.5L5.5 6.5M3.49913 8.5L2.5 8" stroke="${G}" stroke-width="1.5" stroke-linecap="round"/><path d="M2 20.5H22" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/>`,
  ),
  Work: svgUrl(
    `<path d="M8.5 6.5C8.5 5.09554 8.5 4.39331 8.83706 3.88886C8.98298 3.67048 9.17048 3.48298 9.38886 3.33706C9.89331 3 10.5955 3 12 3C13.4045 3 14.1067 3 14.6111 3.33706C14.8295 3.48298 15.017 3.67048 15.1629 3.88886C15.5 4.39331 15.5 5.09554 15.5 6.5" stroke="${G}" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill="${G}" stroke="${G}" stroke-width="1.5" stroke-linejoin="round" d="M22 13.5V14C22 17.2998 22 18.9497 20.9749 19.9749C19.9497 21 18.2998 21 15 21H9C5.70017 21 4.05025 21 3.02513 19.9749C2 18.9497 2 17.2998 2 14V13.5C2 10.2002 2 8.55025 3.02513 7.52513C4.05025 6.5 5.70017 6.5 9 6.5H15C18.2998 6.5 19.9497 6.5 20.9749 7.52513C22 8.55025 22 10.2002 22 13.5Z"/><path d="M2 12.5H22" stroke="#fff" stroke-width="1.5" stroke-linecap="round"/><path d="M12 11.5V14" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>`,
  ),
  Contact: svgUrl(
    `<path fill="${G}" stroke="${G}" stroke-width="1.5" stroke-linejoin="round" d="M4.74038 14.3685L6.69351 12.9816C7.24445 12.5904 7.80305 12.3282 8.44034 12.1585C9.17201 11.9636 9.5 11.5644 9.5 10.711C9.5 8.54629 14.5 8.31595 14.5 10.711C14.5 11.5644 14.828 11.9636 15.5597 12.1585C16.202 12.3295 16.7599 12.5934 17.3065 12.9816L19.2596 14.3685C20.1434 14.9961 20.5547 15.2995 20.7842 15.7819C21 16.2358 21 16.768 21 17.8324C21 19.7461 21 20.703 20.4642 21.3164C19.8152 22.0593 18.128 21.9955 17.0917 21.9955H6.90833C5.87197 21.9955 4.21909 22.0986 3.5358 21.3164C3 20.703 3 19.7461 3 17.8324C3 16.768 3 16.2358 3.21584 15.7819C3.44526 15.2995 3.85662 14.9961 4.74038 14.3685Z"/><path fill="${G}" stroke="${G}" stroke-width="1.5" stroke-linejoin="round" d="M6.96014 3.69772C5.6417 4.07415 4.69384 4.54112 3.82645 5.10455C2.45318 5.9966 1.86443 7.60404 2.02607 9.15513C2.09439 9.81068 2.62064 10.1241 3.23089 9.95455C3.69451 9.82571 4.15888 9.7003 4.61961 9.56364C5.96706 9.16397 6.28399 8.67812 6.47124 7.29885L6.96014 3.69772ZM6.96014 3.69772C10.2186 2.76743 13.7814 2.76743 17.0399 3.69772M17.0399 3.69772C18.3583 4.07415 19.3062 4.54112 20.1735 5.10455C21.5468 5.9966 22.1356 7.60404 21.9739 9.15513C21.9056 9.81068 21.3794 10.1241 20.7691 9.95455C20.3055 9.82571 19.8411 9.7003 19.3804 9.56364C18.0329 9.16397 17.716 8.67812 17.5288 7.29885L17.0399 3.69772Z"/><circle cx="12" cy="17" r="2" fill="#fff"/>`,
  ),
};

interface NavLinksProps {
  links: NavLink[];
  /** page the link list belongs to; without it the home page's "#home" is current */
  currentHref?: string;
}

export default function NavLinks({ links, currentHref }: NavLinksProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const pillRef = useRef<HTMLLIElement>(null);
  const [sheetOpen, setSheetOpen] = useState(false); // mobile bottom sheet
  const [menuOpen, setMenuOpen] = useState(false); // desktop dropdown
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  /* close the sheet on Escape or when the viewport grows to desktop */
  useEffect(() => {
    if (!sheetOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setSheetOpen(false);
    const mq = window.matchMedia("(min-width: 768px)");
    const onMq = () => mq.matches && setSheetOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [sheetOpen]);

  /* desktop dropdown: close on outside click or Escape */
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!(e.target as Element).closest(".has-svc-menu")) setMenuOpen(false);
    };
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  /* desktop: hide nav on scroll down, show it on a small scroll up
     (the CSS for this only applies at >= 768px) */
  useEffect(() => {
    const root = document.documentElement;
    let lastY = window.scrollY;
    let ticking = false;
    const TOP_ZONE = 80; // always visible near the top
    const DELTA = 6; // ignore tiny jitters

    const update = () => {
      const y = Math.max(window.scrollY, 0);
      if (y < TOP_ZONE) {
        root.classList.remove("nav-hidden");
      } else if (y - lastY > DELTA) {
        root.classList.add("nav-hidden"); // scrolling down
      } else if (lastY - y > DELTA) {
        root.classList.remove("nav-hidden"); // scrolling up
      } else {
        ticking = false;
        return;
      }
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      root.classList.remove("nav-hidden");
    };
  }, []);

  /* lets CSS restyle the nav while the sheet is open
     (the sheet itself is sized purely by CSS from --nav-w / --nav-bottom) */
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("svc-sheet-open", sheetOpen);
    return () => root.classList.remove("svc-sheet-open");
  }, [sheetOpen]);

  /* mobile bar: black pill slides from the previous tab to the current one */
  useEffect(() => {
    const list = listRef.current;
    const pill = pillRef.current;
    if (!list || !pill) return;

    const KEY = "nav-pill";
    const current = () =>
      list.querySelector<HTMLElement>(".nav__link.is-current");
    const rectOf = (el: HTMLElement) => ({
      x: el.offsetLeft,
      y: el.offsetTop,
      w: el.offsetWidth,
      h: el.offsetHeight,
    });
    type R = ReturnType<typeof rectOf>;
    const apply = (r: R) => {
      pill.style.width = `${r.w}px`;
      pill.style.height = `${r.h}px`;
      pill.style.transform = `translate(${r.x}px, ${r.y}px)`;
    };
    const save = (r: R) => {
      try {
        sessionStorage.setItem(KEY, JSON.stringify(r));
      } catch {}
    };

    const cur = current();
    if (!cur) {
      list.removeAttribute("data-ready");
      return;
    }

    const target = rectOf(cur);
    let prev: R | null = null;
    try {
      prev = JSON.parse(sessionStorage.getItem(KEY) || "null");
    } catch {}

    // start where the pill was on the last page, then slide to the new tab
    pill.style.transition = "none";
    apply(prev ?? target);
    list.setAttribute("data-ready", "");
    void pill.offsetWidth; // force reflow
    requestAnimationFrame(() => {
      pill.style.transition = "";
      apply(target);
    });
    save(target);

    // re-measure without animation on resize / when the font finishes loading
    const remeasure = () => {
      const c = current();
      if (!c) return;
      const r = rectOf(c);
      pill.style.transition = "none";
      apply(r);
      save(r);
    };
    window.addEventListener("resize", remeasure);
    document.fonts?.ready.then(remeasure);
    return () => window.removeEventListener("resize", remeasure);
  }, [currentHref, sheetOpen]);

  return (
    <>
      <ul className="nav__links" ref={listRef}>
        <li className="nav__pill" ref={pillRef} aria-hidden="true" />
        {links.map(({ label, href, active, section }) => {
          const iconSrc = ICON_BY_LABEL[label];
          const isService = label === "Service";
          const isPageCurrent = currentHref
            ? href === currentHref
            : (section || href) === "#home";
          /* while the services sheet is open, the black pill moves to Service */
          const isCurrent = sheetOpen ? isService : isPageCurrent;
          return (
            <li
              key={label}
              className={
                isService
                  ? `has-svc-menu${menuOpen ? " is-open" : ""}`
                  : undefined
              }
            >
              <a
                className={`nav__link${active ? " nav__link--active" : ""}${
                  isCurrent ? " is-current" : ""
                }`}
                href={href}
                aria-current={isPageCurrent ? "true" : undefined}
                {...(isService
                  ? {
                      "aria-haspopup": "true" as const,
                      "aria-expanded": sheetOpen || menuOpen,
                      onClick: (e: React.MouseEvent) => {
                        /* never navigate: mobile opens the bottom sheet,
                           desktop toggles the dropdown */
                        e.preventDefault();
                        if (window.matchMedia("(max-width: 767px)").matches) {
                          setSheetOpen((o) => !o);
                        } else {
                          setMenuOpen((o) => !o);
                        }
                      },
                    }
                  : {
                      onClick: () => {
                        setSheetOpen(false);
                        setMenuOpen(false);
                      },
                    })}
              >
                {iconSrc ? (
                  <span
                    className="nav__icon"
                    aria-hidden="true"
                    style={
                      {
                        "--icon": `url(${iconSrc})`,
                        "--icon-filled": ICON_FILLED_BY_LABEL[label],
                      } as CSSVars
                    }
                  />
                ) : null}
                <span>{label}</span>
              </a>
              {isService ? <ServiceMenu /> : null}
            </li>
          );
        })}
      </ul>
      {mounted
        ? createPortal(
            <div
              className={`svc-sheet${sheetOpen ? " is-open" : ""}`}
              aria-hidden={!sheetOpen}
            >
              <div
                className="svc-sheet__backdrop"
                onClick={() => setSheetOpen(false)}
              />
              <div
                className="svc-sheet__card"
                role="dialog"
                aria-label="Services"
              >
                {SERVICE_MENU_ITEMS.map(({ label, href, icon }) => (
                  <a
                    key={href}
                    className="svc-sheet__item"
                    href={href}
                    tabIndex={sheetOpen ? 0 : -1}
                  >
                    <img src={icon} alt="" width={15} height={15} />
                    <span>{label}</span>
                  </a>
                ))}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
