"use client";

import { useEffect, useRef, useState } from "react";
import type { MouseEvent as ReactMouseEvent } from "react";
import FaqList from "../shared/FaqList";
import PhotoStack from "../shared/PhotoStack";
import CatRunner from "../shared/CatRunner";
import ServiceMenu from "../shared/ServiceMenu";
import {
  Eyebrow,
  HomeFooter,
  ProcessSteps,
  StatusLine,
  TrustedBy,
} from "../shared/HomeBlocks";
import { ABOUT_PARAGRAPHS, CASE_NAV_LINKS, ICONS } from "@/data/content";
import {
  D_FAQ,
  D_PROCESS_HEADING,
  D_RULER_LEFT,
  D_SERVICES,
  D_TRUSTED,
} from "@/data/desktopHome";
import {
  HOME_EYEBROWS,
  HOME_HERO,
  HOME_ICONS,
  HOME_PROCESS_STEPS,
  HOME_PROCESS_TEXT,
  HOME_PROJECTS,
  HOME_WORK_TEXT,
} from "@/data/home";
import type { CSSVars } from "@/types";

/*
  DESKTOP HOME (>= 768px) – built from the Figma desktop design
  (node 4168:8659, 1440px frame). Hidden on mobile by CSS.
  Styles: styles/desktop-home.css
*/

const eb = HOME_EYEBROWS;
/* DOM order of the images inside a project card (CSS positions them by role) */
const CARD_IMAGE_ORDER = ["main", "cap", "button"] as const;
type DesktopServiceItem = (typeof D_SERVICES.items)[number];

/* small rotated ruler label (50, 100, 150 ...) */
function RulerItem({ value, faded }: { value: number; faded?: boolean }) {
  return (
    <div className="dh-ruler__item">
      <div className="dh-ruler__rot">
        <p className={`dh-ruler__label${faded ? " is-faded" : ""}`}>{value}</p>
        <span className="dh-ruler__tick" />
      </div>
    </div>
  );
}

function SvcCard({ s }: { s: DesktopServiceItem }) {
  return (
    <a
      className={`dh-svc dh-svc--${s.size}`}
      href={"href" in s ? s.href : "/#service"}
    >
      <span className="dh-svc__bg" aria-hidden="true" />
      <span className="dh-svc__top">
        <span className="dh-svc__code">{s.code}</span>
        <span
          className="dh-svc__arrow"
          aria-hidden="true"
          style={{ "--mask": `url(${HOME_ICONS.arrowUpRight})` } as CSSVars}
        />
      </span>
      <span className="dh-svc__body">
        <span
          className="dh-svc__icon"
          aria-hidden="true"
          style={{ "--mask": `url(${s.icon})` } as CSSVars}
        />
        <h3 className="dh-svc__title">{s.title}</h3>
        <p className="dh-svc__text">{s.text}</p>
      </span>
    </a>
  );
}

export default function DesktopHome() {
  const svc = D_SERVICES.items;

  /* "Service" nav link: click toggles the dropdown instead of navigating */
  const [svcOpen, setSvcOpen] = useState(false);

  /* nav shrinks to just the "Q" when scrolling down, expands when scrolling up */
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [navSettled, setNavSettled] =
    useState(true); /* true = fully expanded & idle */
  const collapsedAt = useRef(0);

  /* close the dropdown on outside click or Escape */
  useEffect(() => {
    if (!svcOpen) return;
    const onDown = (e: MouseEvent) => {
      if (!(e.target as Element).closest(".has-svc-menu")) setSvcOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSvcOpen(false);
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [svcOpen]);

  /* let the Service dropdown overflow only once the nav has finished expanding */
  useEffect(() => {
    setNavSettled(false);
    if (navCollapsed) return;
    const t = window.setTimeout(() => setNavSettled(true), 700);
    return () => window.clearTimeout(t);
  }, [navCollapsed]);

  /* collapse the nav on scroll down, expand on scroll up */
  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;
    const THRESHOLD = 10;

    const update = () => {
      const y = window.scrollY;
      const delta = y - lastY;
      if (y < 80) {
        setNavCollapsed(false);
        lastY = y;
      } else if (delta > THRESHOLD) {
        collapsedAt.current = performance.now();
        setNavCollapsed(true);
        setSvcOpen(false);
        lastY = y;
      } else if (delta < -THRESHOLD) {
        setNavCollapsed(false);
        lastY = y;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="dh" data-name="Desktop home">
      {/* =============== HERO (header + stage + status + trusted) =============== */}
      <section className="dh-hero" id="home">
        {/* header row */}
        <div className="dh-row dh-row--top">
          <div className="dh-side dh-side--l dh-side--top">
            <div className="dh-ruler dh-ruler--top">
              <RulerItem value={50} />
            </div>
          </div>
          <div className="dh-mid dh-mid--top">
            <nav
              className={`dh-nav${navCollapsed ? " is-collapsed" : ""}${navSettled ? " is-settled" : ""}`}
              aria-label="Main"
              onMouseEnter={() => {
                /* ignore hover right after collapsing, so it doesn't flicker */
                if (performance.now() - collapsedAt.current > 800)
                  setNavCollapsed(false);
              }}
              onFocus={() => setNavCollapsed(false)}
            >
              <a className="dh-nav__logo" href="#home" aria-label="Sozoq home">
                <img
                  src={ICONS.wordmark}
                  alt="Sozoq"
                  width={85.909}
                  height={17.997}
                />
              </a>
              <div className="dh-nav__links-wrap">
                <ul className="dh-nav__links">
                  {CASE_NAV_LINKS.map((l) => {
                    const isService = l.label === "Service";
                    return (
                      <li
                        key={l.label}
                        className={
                          isService
                            ? `has-svc-menu${svcOpen ? " is-open" : ""}`
                            : undefined
                        }
                      >
                        <a
                          className={`dh-nav__link${l.active ? " is-active" : ""}`}
                          href={l.href}
                          {...(isService && {
                            "aria-haspopup": "menu" as const,
                            "aria-expanded": svcOpen,
                            onClick: (e: ReactMouseEvent) => {
                              e.preventDefault();
                              setSvcOpen((o) => !o);
                            },
                          })}
                        >
                          {l.label}
                        </a>
                        {isService ? <ServiceMenu /> : null}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </nav>
          </div>
          <div className="dh-side dh-side--r dh-side--top" />
        </div>

        {/* stage */}
        <div className="dh-row dh-row--stage">
          <div className="dh-side dh-side--l dh-side--stage">
            <div className="dh-ruler dh-ruler--stage">
              {D_RULER_LEFT.map((v) => (
                <RulerItem value={v} faded key={v} />
              ))}
            </div>
          </div>

          <div className="dh-mid dh-mid--stage">
            <div className="dh-hero__lines" aria-hidden="true" />
            <CatRunner />

            <div className="dh-hero__stack">
              <ul className="dh-tags">
                {HOME_HERO.tags.map((t) => (
                  <li className="dh-tag" key={t}>
                    <img src={ICONS.bullet} alt="" width={6} height={6} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>

              <div className="dh-hero__copy">
                <h1 className="dh-hero__title">
                  <span>{HOME_HERO.titleLine1}</span>
                  <span className="dh-hero__title-accent">
                    {HOME_HERO.titleLine2}
                  </span>
                </h1>
                <p className="dh-hero__text">{HOME_HERO.text}</p>
              </div>

              <div className="dh-hero__ctas">
                <a
                  className="dh-cta dh-cta--light"
                  href={HOME_HERO.viewWork.href}
                >
                  <span className="dh-cta__well" />
                  <span className="dh-cta__ribs" />
                  <span className="dh-cta__label">
                    {HOME_HERO.viewWork.label}
                  </span>
                  <img
                    className="dh-cta__icon"
                    src={HOME_ICONS.arrowBtn}
                    alt=""
                    width={16}
                    height={16}
                  />
                </a>
                <a
                  className="dh-cta dh-cta--dark"
                  href={HOME_HERO.startWork.href}
                >
                  <span className="dh-cta__well" />
                  <span className="dh-cta__ribs" />
                  <span className="dh-cta__label">
                    {HOME_HERO.startWork.label}
                  </span>
                </a>
              </div>
            </div>
          </div>

          <div className="dh-side dh-side--r dh-side--stage" />
        </div>

        {/* status bar */}
        <div className="dh-row dh-row--status">
          <div className="dh-side dh-side--l dh-side--status" />
          <div className="dh-mid dh-mid--status">
            <StatusLine prefix="dh" text={HOME_HERO.status} />
          </div>
          <div className="dh-side dh-side--r dh-side--status" />
        </div>

        {/* trusted by */}
        <TrustedBy prefix="dh" data={D_TRUSTED} />
      </section>

      {/* =============== 01 SERVICES =============== */}
      <section className="dh-sec dh-services" id="service">
        <div className="dh-vlines dh-vlines--svc" aria-hidden="true" />
        <div className="dh-wrap">
          <div className="dh-head">
            <div className="dh-head__l">
              <Eyebrow prefix="dh" {...eb.services} />
              <h2 className="dh-h2">
                {D_SERVICES.heading[0]}
                <span className="dh-red">{D_SERVICES.heading[1]}</span>
              </h2>
            </div>
            <p className="dh-lead">{D_SERVICES.text}</p>
          </div>

          <div className="dh-svc-grid">
            <SvcCard s={svc[0]} />
            <div className="dh-svc-col">
              <SvcCard s={svc[1]} />
              <div className="dh-svc-pair">
                <SvcCard s={svc[2]} />
                <SvcCard s={svc[3]} />
              </div>
            </div>
            <SvcCard s={svc[4]} />
            <SvcCard s={svc[5]} />
          </div>
        </div>
      </section>

      {/* =============== 02 SELECTED WORKS =============== */}
      <section className="dh-sec dh-work" id="work">
        <div className="dh-wrap">
          <div className="dh-head">
            <div className="dh-head__l">
              <Eyebrow prefix="dh" {...eb.work} />
              <h2 className="dh-h2">
                What&apos;s cooking at <span className="dh-red">SOZOQ?</span>
              </h2>
            </div>
            <p className="dh-lead">{HOME_WORK_TEXT}</p>
          </div>

          <ul className="dh-work__list">
            {HOME_PROJECTS.map((p) => (
              <li
                className={`dh-proj dh-proj--${p.href.split("/").pop()}`}
                key={p.href}
              >
                <div className="dh-proj__info">
                  <img
                    className="dh-proj__icon"
                    src={p.icon}
                    alt=""
                    width={28}
                    height={28}
                  />
                  <h3 className="dh-proj__title">
                    {p.desktopTitle ?? `${p.name} - ${p.sub}`}
                  </h3>
                  <p className="dh-proj__desc">{p.desc}</p>
                  <a className="dh-proj__link" href={p.href}>
                    <span>{p.link}</span>
                    <img
                      src={HOME_ICONS.explore}
                      alt=""
                      width={15}
                      height={15}
                    />
                  </a>
                </div>

                <div className="dh-proj__card">
                  <div className="dh-proj__card-border" />
                  {CARD_IMAGE_ORDER.map((role) => {
                    const im = p.images.find((i) => i.role === role);
                    return im ? (
                      <img
                        key={role}
                        className={`dh-proj__img dh-proj__img--${role}`}
                        src={im.src}
                        alt=""
                      />
                    ) : null;
                  })}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =============== 03 PROCESS =============== */}
      <section className="dh-sec dh-process">
        <div className="dh-wrap">
          <div className="dh-head dh-head--process">
            <div className="dh-head__l">
              <Eyebrow prefix="dh" {...eb.process} />
              <h2 className="dh-h2 dh-process__h2">
                {D_PROCESS_HEADING[0]}
                <span className="dh-red">{D_PROCESS_HEADING[1]}</span>
              </h2>
            </div>
            <p className="dh-lead dh-process__text">{HOME_PROCESS_TEXT}</p>
          </div>

          <ProcessSteps prefix="dh" steps={HOME_PROCESS_STEPS} />
        </div>
      </section>

      {/* =============== 04 ABOUT =============== */}
      <section className="dh-sec dh-about" id="about">
        <div className="dh-vlines dh-vlines--about" aria-hidden="true">
          {Array.from({ length: 20 }, (_, i) => (
            <i
              key={i}
              style={{
                left: `calc(${(i * 100) / 19}% - ${i === 19 ? 1 : 0}px)`,
              }}
            />
          ))}
        </div>
        <div className="dh-about__in">
          <Eyebrow prefix="dh" {...eb.about} />
          <div className="dh-about__row">
            <PhotoStack className="dh-about__side" />
            <div className="dh-about__copy">
              {ABOUT_PARAGRAPHS.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =============== 05 FAQ =============== */}
      <section className="dh-sec dh-faq" id="faq">
        <div className="dh-faq__in">
          <div className="dh-faq__head">
            <Eyebrow prefix="dh" {...eb.faq} />
            <h2 className="dh-h2">
              {D_FAQ.heading[0]}
              <span className="dh-red">{D_FAQ.heading[1]}</span>
            </h2>
          </div>
          <FaqList
            prefix="dh"
            items={D_FAQ.items}
            initialOpen={D_FAQ.openIndex}
            icon={HOME_ICONS.faqPlus}
          />
        </div>
      </section>

      {/* =============== FOOTER =============== */}
      <HomeFooter prefix="dh" id="contact" />
    </div>
  );
}
