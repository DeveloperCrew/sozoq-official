import Clock from "./Clock";
import { FOOTER_LINKS, IMAGES, WHATSAPP_FOOTER_URL } from "@/data/content";
import { HOME_FOOTER, HOME_ICONS } from "@/data/home";
import type { CSSVars, EyebrowData, ProcessStepData, TrustedData } from "@/types";

/* Home-page blocks that look the same on desktop and mobile; only the CSS
   prefix differs: "dh" = desktop home (>= 768px), "mh" = mobile home (<= 767px). */
type Prefix = "dh" | "mh";

/* "01 - Service's which we provide" label with the red square */
export function Eyebrow({
  prefix,
  n,
  label,
  tone,
}: EyebrowData & { prefix: Prefix; tone?: "process" | "about" }) {
  return (
    <div className={`${prefix}-eyebrow${tone ? ` ${prefix}-eyebrow--${tone}` : ""}`}>
      <div className={`${prefix}-eyebrow__row`}>
        <span className={`${prefix}-eyebrow__sq`} />
        <span className={`${prefix}-eyebrow__n`}>{n}</span>
        <span className={`${prefix}-eyebrow__dash`}>-</span>
        <span className={`${prefix}-eyebrow__t`}>{label}</span>
      </div>
    </div>
  );
}

/* "Trusted by over 10+ companies" + scrolling logo marquee */
export function TrustedBy({ prefix, data }: { prefix: Prefix; data: TrustedData }) {
  return (
    <div className={`${prefix}-trusted`}>
      <p className={`${prefix}-trusted__title`}>
        <span className={`${prefix}-trusted__ink`}>{data.lead}</span>{" "}
        <span className={`${prefix}-trusted__accent`}>{data.accent} </span>
      </p>
      <div className={`${prefix}-trusted__marquee`} aria-hidden="true">
        <div className={`${prefix}-trusted__track`}>
          {[0, 1, 2, 3].map((n) => (
            <div className={`${prefix}-trusted__set`} key={n}>
              {data.logos.map((l) => (
                <span
                  className={`${prefix}-trusted__logo`}
                  style={{ width: l.w, height: l.h, padding: l.pad }}
                  key={l.src}
                >
                  <img src={l.src} alt="" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* the three "process" steps (desktop also draws the connecting lines) */
export function ProcessSteps({
  prefix,
  steps,
}: {
  prefix: Prefix;
  steps: ProcessStepData[];
}) {
  return (
    <ol className={`${prefix}-steps`}>
      {prefix === "dh" ? (
        <>
          <span className="dh-steps__line dh-steps__line--a" aria-hidden="true" />
          <span className="dh-steps__line dh-steps__line--b" aria-hidden="true" />
        </>
      ) : null}
      {steps.map((s) => (
        <li className={`${prefix}-step`} key={s.n}>
          <span
            className={`${prefix}-step__icon${s.accent ? ` ${prefix}-step__icon--accent` : ""}`}
          >
            <span
              className={`${prefix}-step__glyph`}
              style={
                {
                  WebkitMaskImage: `url(${s.icon})`,
                  maskImage: `url(${s.icon})`,
                } as CSSVars
              }
            />
          </span>
          <p className={`${prefix}-step__n`}>{s.n}</p>
          <h3 className={`${prefix}-step__title`}>{s.title}</h3>
          <p className={`${prefix}-step__text`}>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}

/* the red "Have something in mind?" card + copyright / legal links.
   Only the desktop footer carries the #contact anchor. */
export function HomeFooter({ prefix, id }: { prefix: Prefix; id?: string }) {
  return (
    <footer className={`${prefix}-footer`} id={id}>
      <div className={`${prefix}-contact`}>
        <div className={`${prefix}-contact__bg`} aria-hidden="true">
          <img src={IMAGES.footerTexture} alt="" />
          <span />
        </div>
        <div className={`${prefix}-contact__info`}>
          <h3 className={`${prefix}-contact__title`}>{HOME_FOOTER.title}</h3>
          <a className={`${prefix}-contact__mail`} href={`mailto:${HOME_FOOTER.email}`}>
            <span>{HOME_FOOTER.email}</span>
            <img src={HOME_ICONS.mailArrow} alt="" width={16} height={16} />
          </a>
        </div>
        <a
          className={`${prefix}-fwa`}
          href={WHATSAPP_FOOTER_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className={`${prefix}-fwa__well`} />
          <span className={`${prefix}-fwa__ribs`} />
          <img
            className={`${prefix}-fwa__icon`}
            src={HOME_ICONS.whatsappFooter}
            alt=""
            width={15}
            height={15}
          />
          <span className={`${prefix}-fwa__label`}>{HOME_FOOTER.whatsapp}</span>
        </a>
      </div>

      <div className={`${prefix}-legal`}>
        <p className={`${prefix}-legal__copy`}>{HOME_FOOTER.copy}</p>
        <nav className={`${prefix}-legal__links`} aria-label="Footer">
          {FOOTER_LINKS.map((l) => (
            <a
              className={`${prefix}-legal__link`}
              href={l.href}
              key={l.label}
              {...(l.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <span>{l.label}</span>
              {l.external ? (
                <img src={HOME_ICONS.linkArrow} alt="" width={11} height={15} />
              ) : null}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

/* "globally Available" + live IST clock */
export function StatusLine({ prefix, text }: { prefix: Prefix; text: string }) {
  return (
    <>
      <p className={`${prefix}-status__live`}>{text}</p>
      <p className={`${prefix}-status__time`}>
        <Clock />
      </p>
    </>
  );
}
