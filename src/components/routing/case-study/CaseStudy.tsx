import Link from "next/link";
import CaseToc from "./CaseToc";
import WireframeToggle from "./WireframeToggle";
import { ICONS } from "@/data/content";
import type { CaseFigureData, CaseSectionData, CaseStudyData } from "@/types";

/* one framed image (dark tile, rounded, 1px transparent border as in Figma) */
function Figure({
  src,
  alt,
  caption,
  shape,
}: CaseFigureData & { shape: string }) {
  return (
    <figure className="case-fig">
      <div className={`case-fig__frame case-fig__frame--${shape}`}>
        <img className="case-fig__img" src={src} alt={alt} loading="lazy" />
      </div>
      {caption ? (
        <figcaption className="case-fig__caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function Section({ s }: { s: CaseSectionData }) {
  const cls = [
    "case-sec",
    s.first && "case-sec--first",
    s.lead && "case-sec--lead",
    s.tail && "case-sec--tail",
    s.last && "case-sec--last",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={cls} id={s.id}>
      <div className="case-sec__text">
        {s.title ? (
          <>
            <p className="case-eyebrow">{s.label}</p>
            <h2 className="case-h2">{s.title}</h2>
          </>
        ) : (
          <h2 className="case-eyebrow case-eyebrow--h">{s.label}</h2>
        )}
        <div className={`case-body${s.title ? "" : " case-body--flush"}`}>
          {s.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>

        {/* optional list (used by Mealbox: Discover / Plan / Shop / Prepare) */}
        {s.list ? (
          <div className="case-list">
            <p className="case-list__intro">{s.list.intro}</p>
            <ul className="case-list__rows">
              {s.list.items.map((i) => (
                <li key={i.term} className="case-list__row">
                  <h3>{i.term}</h3>
                  <p>{i.text}</p>
                </li>
              ))}
            </ul>
            <p className="case-list__outro">{s.list.outro}</p>
          </div>
        ) : null}
      </div>

      {s.layout === "grid" ? (
        <div className="case-sec__media case-grid">
          {(s.figures ?? []).map((f) => (
            <Figure key={f.src} {...f} shape="thumb" />
          ))}
        </div>
      ) : s.layout === "toggle" && s.toggle ? (
        <div className="case-sec__media case-sec__media--toggle">
          <WireframeToggle {...s.toggle} />
        </div>
      ) : s.layout !== "none" && s.figures ? (
        <div className="case-sec__media">
          <Figure {...s.figures[0]} shape={s.layout} />
        </div>
      ) : null}
    </section>
  );
}

export default function CaseStudy({ data }: { data: CaseStudyData }) {
  const toc = data.sections.map(({ id, label }) => ({ id, label }));

  return (
    <div className="case">
      <div className="case__inner">
        {/* breadcrumb */}
        <Link className="case-back" href="/#work">
          <img src={ICONS.arrowLeft18} alt="" width={18} height={18} />
          <span>All Works</span>
        </Link>

        {/* intro + project facts */}
        <div className="case-intro">
          <div className="case-intro__main">
            <p className="case-eyebrow">{data.brand}</p>
            <h1 className="case-h1">{data.title}</h1>
            <p className="case-lead">
              {data.intro.map((part, i) =>
                typeof part === "string" ? (
                  part
                ) : (
                  <span className="case-caps" key={i}>
                    {part.caps}
                  </span>
                ),
              )}
            </p>
          </div>

          <dl className="case-facts">
            {data.meta.map((m) => (
              <div className="case-facts__item" key={m.term}>
                <dt>{m.term}</dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* hero image */}
        <figure className="case-fig case-fig--hero">
          <div className="case-fig__frame case-fig__frame--hero">
            <div className="case-hero__stage">
              <img
                className="case-hero__img"
                src={data.hero.src}
                alt={data.hero.alt}
              />
            </div>
          </div>
        </figure>

        {/* the short version */}
        <section className="case-short">
          <h2 className="case-eyebrow">The short version</h2>
          <dl className="case-short__grid">
            {data.summary.map((item) => (
              <div className="case-short__item" key={item.term}>
                <dt>{item.term}</dt>
                <dd>
                  {item.live ? (
                    <>
                      {item.live.pre}
                      <span className="case-caps">{item.live.caps}</span>
                      {item.live.mid}
                      <a
                        href={item.live.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.live.label}
                      </a>
                      {item.live.post}
                    </>
                  ) : (
                    item.text
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* sidebar + article */}
        <div className="case-layout">
          <aside className="case-layout__side">
            <CaseToc items={toc} />
          </aside>
          <article className="case-article">
            {data.sections.map((s) => (
              <Section s={s} key={s.id} />
            ))}
          </article>
        </div>
      </div>
    </div>
  );
}
