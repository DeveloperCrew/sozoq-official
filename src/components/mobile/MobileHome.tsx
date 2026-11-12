import MobileScrollTop from "./MobileScrollTop";
import FaqList from "../shared/FaqList";
import PhotoStack from "../shared/PhotoStack";
import CatRunner from "../shared/CatRunner";
import {
  Eyebrow,
  HomeFooter,
  ProcessSteps,
  StatusLine,
  TrustedBy,
} from "../shared/HomeBlocks";
import { ABOUT_PARAGRAPHS, FAQS, ICONS, WHATSAPP_URL } from "@/data/content";
import {
  HOME_EYEBROWS,
  HOME_HERO,
  HOME_ICONS,
  HOME_PROCESS_STEPS,
  HOME_PROCESS_TEXT,
  HOME_WORK_TEXT,
} from "@/data/home";
import {
  M_PROCESS_HEADING,
  M_SERVICES,
  M_TRUSTED,
  M_WORK_ITEMS,
} from "@/data/mobileHome";
import type { CSSVars } from "@/types";

/*
  MOBILE HOME (<= 767px) – built 1:1 from the Figma mobile design
  (node 4151:5506, 390px frame). Hidden on desktop by CSS.
  Styles: styles/mobile-home.css
*/

const eb = HOME_EYEBROWS;

export default function MobileHome() {
  return (
    <div className="mh" data-name="Mobile home">
      <MobileScrollTop />

      {/* ---------- top bar ---------- */}
      <div className="mh-top">
        <a className="mh-top__logo" href="/" aria-label="Sozoq home">
          <img
            src={ICONS.wordmark}
            alt="Sozoq"
            width={85.909}
            height={17.997}
          />
        </a>
        <a
          className="mh-wa"
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
        >
          <span className="mh-wa__well" />
          <span className="mh-wa__ribs" />
          <img
            className="mh-wa__icon"
            src={HOME_ICONS.whatsappHeader}
            alt=""
            width={12}
            height={12}
          />
          <span className="mh-wa__label">Whatsapp</span>
        </a>
      </div>

      {/* ---------- hero ---------- */}
      <section className="mh-hero">
        <div className="mh-grid" aria-hidden="true" />

        <div className="mh-hero__stack">
          <ul className="mh-tags">
            {HOME_HERO.tags.map((t) => (
              <li className="mh-tag" key={t}>
                <img src={ICONS.bullet} alt="" width={6} height={6} />
                <span>{t}</span>
              </li>
            ))}
          </ul>

          <div className="mh-hero__copy">
            <h1 className="mh-hero__title">
              <span>{HOME_HERO.titleLine1}</span>
              <span className="mh-hero__title-accent">
                {HOME_HERO.titleLine2}
              </span>
            </h1>
            <p className="mh-hero__text">{HOME_HERO.text}</p>
          </div>

          <div className="mh-hero__ctas">
            <a className="mh-cta mh-cta--light" href={HOME_HERO.viewWork.href}>
              <span className="mh-cta__well" />
              <span className="mh-cta__ribs" />
              <span className="mh-cta__label">{HOME_HERO.viewWork.label}</span>
              <img
                className="mh-cta__icon"
                src={HOME_ICONS.arrowBtn}
                alt=""
                width={16}
                height={16}
              />
            </a>
            <a className="mh-cta mh-cta--dark" href={HOME_HERO.startWork.href}>
              <span className="mh-cta__well" />
              <span className="mh-cta__ribs" />
              <span className="mh-cta__label">{HOME_HERO.startWork.label}</span>
            </a>
          </div>
        </div>

        <CatRunner />

        <div className="mh-status">
          <StatusLine prefix="mh" text={HOME_HERO.status} />
        </div>
      </section>

      {/* ---------- trusted by ---------- */}
      <TrustedBy prefix="mh" data={M_TRUSTED} />

      {/* ---------- 01 services ---------- */}
      <section className="mh-services" id="service">
        <div className="mh-grid" aria-hidden="true" />
        <div className="mh-services__in">
          <div className="mh-head">
            <div>
              <Eyebrow prefix="mh" {...eb.services} />
              <h2 className="mh-h2 mh-services__h2">
                {M_SERVICES.heading[0]} {M_SERVICES.heading[1]}{" "}
                <span className="mh-red">{M_SERVICES.heading[2]}</span>
                <br />
                <span className="mh-red">{M_SERVICES.heading[3]}</span>
              </h2>
            </div>
            <p className="mh-lead">{M_SERVICES.text}</p>
          </div>

          <ul className="mh-svc__list">
            {M_SERVICES.items.map((s) => (
              <li key={s.code}>
                <a
                  className={`mh-svc${"softBorder" in s ? " mh-svc--soft" : ""}`}
                  href={"href" in s ? s.href : "/#service"}
                >
                  <span className="mh-svc__bg" aria-hidden="true" />
                  <span className="mh-svc__top">
                    <span className="mh-svc__code">{s.code}</span>
                    <img
                      src={HOME_ICONS.arrowUpRight}
                      alt=""
                      width={16}
                      height={16}
                    />
                  </span>
                  <span className="mh-svc__body">
                    <img
                      className="mh-svc__icon"
                      src={s.icon}
                      alt=""
                      width={s.iconW}
                      height={32}
                    />
                    <h3 className="mh-svc__title">{s.title}</h3>
                    <p className="mh-svc__text">{s.text}</p>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- 02 selected works ---------- */}
      <section className="mh-work">
        <div className="mh-head">
          <div>
            <Eyebrow prefix="mh" {...eb.work} />
            <h2 className="mh-h2 mh-work__h2">
              <span className="mh-work__h2-in">
                What&apos;s cooking at <span className="mh-red">SOZOQ?</span>
              </span>
            </h2>
          </div>
          <p className="mh-lead">{HOME_WORK_TEXT}</p>
        </div>

        <ul className="mh-work__list">
          {M_WORK_ITEMS.map((p) => (
            <li className="mh-proj" key={`${p.title}-${p.titleEnd}`}>
              <div className="mh-proj__info">
                <div className="mh-proj__text">
                  <img
                    className="mh-proj__icon"
                    src={p.icon}
                    alt=""
                    width={28}
                    height={28}
                  />
                  <h3 className="mh-proj__title">
                    {p.title}
                    <span className="mh-proj__dash">-</span>
                    {p.titleEnd}
                  </h3>
                  <p className="mh-proj__desc">{p.desc}</p>
                </div>
                <a className="mh-proj__link" href={p.href}>
                  <span>{p.link}</span>
                  <img src={HOME_ICONS.explore} alt="" width={15} height={15} />
                </a>
              </div>

              <div className="mh-proj__card">
                <span className="mh-proj__card-border" aria-hidden="true" />
                {p.images.map((im) => (
                  <img
                    key={im.src}
                    src={im.src}
                    alt=""
                    style={
                      {
                        "--x": `${im.box[0]}px`,
                        "--y": `${im.box[1]}px`,
                        width: im.box[2],
                        height: im.box[3],
                        borderRadius: im.radius,
                      } as CSSVars
                    }
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- 03 process ---------- */}
      <section className="mh-process">
        <Eyebrow prefix="mh" {...eb.process} tone="process" />
        <div className="mh-process__intro">
          <h2 className="mh-h2 mh-process__h2">{M_PROCESS_HEADING}</h2>
          <p className="mh-process__text">{HOME_PROCESS_TEXT}</p>
        </div>
        <ProcessSteps prefix="mh" steps={HOME_PROCESS_STEPS} />
      </section>

      {/* ---------- 04 about ---------- */}
      <section className="mh-about">
        <div className="mh-about__in">
          <div className="mh-grid" aria-hidden="true" />
          <Eyebrow prefix="mh" {...eb.about} tone="about" />
          <div className="mh-about__body">
            <PhotoStack className="mh-about__side" />
            <div className="mh-about__copy">
              {ABOUT_PARAGRAPHS.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- 05 faq ---------- */}
      <section className="mh-faq">
        <Eyebrow prefix="mh" {...eb.faq} />
        <h2 className="mh-h2 mh-faq__h2">
          Commonly Asked <span className="mh-red">Questions</span>
        </h2>
        <FaqList
          prefix="mh"
          items={FAQS}
          initialOpen={-1}
          icon={HOME_ICONS.faqPlus}
        />
      </section>

      {/* ---------- footer ---------- */}
      <HomeFooter prefix="mh" />
    </div>
  );
}
