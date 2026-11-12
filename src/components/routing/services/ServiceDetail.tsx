import type { CSSProperties } from "react";
import type { HeroImage, ServicePageData } from "@/data/servicePages";

/* Service detail page template (website development, branding, app, cms, …).
   Header + footer are the shared components; this is everything between.
   The desktop (.sd-d) and mobile (.sd-m) trees are separate because the two
   Figma frames differ in copy and structure; CSS shows one per breakpoint. */

type Vars = CSSProperties & Record<`--${string}`, string | number>;

function Eyebrow({ d }: { d: ServicePageData }) {
  return (
    <div className="sd-eyebrow">
      <p className="sd-eyebrow__in">
        <span className="sd-sq" />
        <span className="sd-eyebrow__code">{d.eyebrow.code}</span>
        <span className="sd-dash">-</span>
        <span className="sd-eyebrow__name">{d.eyebrow.name}</span>
      </p>
    </div>
  );
}

function Hero({
  d,
  img,
  mobile,
}: {
  d: ServicePageData;
  img: HeroImage;
  mobile?: boolean;
}) {
  const centred = img.w != null && img.h != null;
  const title = (mobile && d.mobile.title) || d.title;
  // desktop-only box widths (the mobile CSS sets its own widths)
  const vars: Vars | undefined = mobile
    ? undefined
    : {
        ...(d.desktop.titleW != null && { "--h1-w": `${d.desktop.titleW}px` }),
        ...(d.desktop.leadW != null && { "--lead-w": `${d.desktop.leadW}px` }),
      };
  return (
    <section className="sd-hero" style={vars}>
      <div className="sd-hero__copy">
        <div className="sd-hero__head">
          <Eyebrow d={d} />
          <h1 className="sd-h1">
            {title[0]}
            <span className="sd-red">{title[1]}</span>
            {title[2]}
          </h1>
        </div>
        <p className="sd-hero__lead">{d.lead}</p>
      </div>
      <figure
        className={`sd-fig${centred ? " sd-fig--center" : ""}`}
        style={d.hero.bg ? { background: d.hero.bg } : undefined}
      >
        <img
          src={img.src}
          alt=""
          style={
            centred
              ? {
                  width: img.w,
                  height: img.h,
                  left: `calc(50% + ${img.dx ?? 0}px)`,
                  top: `calc(50% + ${img.dy ?? 0}px)`,
                }
              : undefined
          }
        />
      </figure>
    </section>
  );
}

function ListItem({
  n,
  name,
  wide,
  label,
}: {
  n: number;
  name: string;
  wide?: boolean;
  /** shown instead of the zero-padded number when the Figma frame differs */
  label?: string;
}) {
  return (
    <span className={`sd-item${wide ? " sd-item--wide" : ""}`}>
      <span className="sd-sq" />
      <span className="sd-item__t">{label ?? String(n).padStart(2, "0")}</span>
      <span className="sd-dash">-</span>
      <span className="sd-item__t">{name}</span>
    </span>
  );
}

function Steps({
  d,
  mobile,
}: {
  d: ServicePageData;
  mobile?: boolean;
}) {
  const { line, showText } = d.mobile.process;
  const showDesc = !mobile || showText;
  const vars: Vars | undefined = mobile
    ? { "--line-left": `${line.left}px`, "--line-w": `${line.width}px` }
    : undefined;
  return (
    <div
      className={`sd-flow${mobile ? " sd-flow--m" : ""}${
        !mobile && d.desktop.flowAuto ? " sd-flow--auto" : ""
      }${d.desktop.flowIcons ? " sd-flow--icons" : ""}`}
      style={vars}
    >
      <div className="sd-flow__in">
        <span className="sd-flow__line" aria-hidden="true" />
        <div className="sd-flow__row">
          {d.steps.map((s, i) => (
            <div className={`sd-step sd-step--${i + 1}`} key={s.title}>
              <span className="sd-step__dot">
                <img src={s.icon} alt="" />
              </span>
              <div className="sd-step__txt">
                <p className="sd-step__title">{s.title}</p>
                {showDesc && s.text ? <p className="sd-step__desc">{s.text}</p> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Perf({ items }: { items: string[] }) {
  return (
    <>
      {items.map((t) => (
        <ul className="sd-bul" key={t}>
          <li>{t}</li>
        </ul>
      ))}
    </>
  );
}

export default function ServiceDetail({ data: d }: { data: ServicePageData }) {
  const items = d.build.items;
  const flowVars: Vars = { "--flow-pt": `${d.mobile.process.flowTop}px` };
  // desktop list = two items per row; a rule under every row except the last
  const deskRows = Array.from({ length: Math.ceil(items.length / 2) }, (_, r) => r * 2);
  const listVars: Vars | undefined =
    d.desktop.listW != null ? { "--list-w": `${d.desktop.listW}px` } : undefined;
  const mobileLines = d.mobile.lineRows ?? 4;
  return (
    <div className="sd">
      {/* ===================== DESKTOP ===================== */}
      <div className="sd__inner sd-d">
        <Hero d={d} img={d.hero.desktop} />

        <section className="sd-sec">
          <p className="sd-sec__label">{d.build.label}</p>
          <div className="sd-sec__main">
            <h2 className="sd-h2">{d.build.heading}</h2>
            <p className="sd-p">{d.build.text}</p>
            <div className="sd-list" style={listVars}>
              {deskRows.map((i, r) => (
                <div
                  className={`sd-row${r < deskRows.length - 1 ? " sd-row--line" : ""}`}
                  key={i}
                >
                  <ListItem n={i + 1} name={items[i]} />
                  <ListItem n={i + 2} name={items[i + 1]} wide />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sd-sec">
          <p className="sd-sec__label">{d.desktop.process.label}</p>
          <div className="sd-sec__main">
            <h2 className="sd-h2">{d.desktop.process.heading}</h2>
            <p className="sd-p">{d.desktop.process.text}</p>
            <Steps d={d} />
          </div>
        </section>

        <section className="sd-sec sd-sec--last">
          <p className="sd-sec__label">{d.desktop.perf.label}</p>
          <div className="sd-sec__main">
            <h2 className="sd-h2">{d.desktop.perf.heading}</h2>
            <div className="sd-bullets">
              <Perf items={d.perf} />
            </div>
          </div>
        </section>
      </div>

      {/* ===================== MOBILE ===================== */}
      <div className="sd__inner sd-m">
        <Hero d={d} img={d.hero.mobile} mobile />

        <section className="sd-sec">
          <p className="sd-sec__label">{d.build.label}</p>
          <div className="sd-sec__main">
            <h2 className="sd-h2">{d.build.heading}</h2>
            <p className="sd-p">{d.build.text}</p>
            <div className="sd-list">
              {items.map((name, i) => (
                <div
                  className={`sd-row${i < mobileLines ? " sd-row--line" : ""}`}
                  key={name}
                >
                  <ListItem n={i + 1} name={name} label={d.mobile.numbers?.[i]} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="sd-sec">
          <p className="sd-sec__label">{d.mobile.process.label}</p>
          <div className="sd-sec__main">
            <h2 className="sd-h2">{d.mobile.process.heading}</h2>
            {d.mobile.process.text ? (
              <p className="sd-p sd-p--tight">{d.mobile.process.text}</p>
            ) : null}
            <div className="sd-p sd-p--flow" style={flowVars}>
              <Steps d={d} mobile />
            </div>
          </div>
        </section>

        <section className="sd-sec sd-sec--last">
          <p className="sd-sec__label">{d.mobile.perf.label}</p>
          <div className="sd-sec__main">
            <h2 className="sd-h2">{d.mobile.perf.heading}</h2>
            <div className="sd-bullets">
              <Perf items={d.mobile.perfItems ?? d.perf} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
