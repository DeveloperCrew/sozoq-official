import Link from "next/link";
import { ICONS, IMAGES } from "@/data/content";
import { WORKLEY as W } from "@/data/workley";

/* Workley case study (Figma "workley", desktop 3881:3489 / mobile 3881:3739).
   Header + footer are the shared components; this is everything between. */
export default function WorkleyCase() {
  return (
    <div className="wk">
      <div className="wk__inner">
        {/* breadcrumb (desktop only – mobile uses the "All work" link in the header) */}
        <Link className="wk-back" href="/#work">
          <img src={ICONS.arrowLeft18} alt="" width={18} height={18} />
          <span>All Works</span>
        </Link>

        {/* intro + project facts */}
        <div className="wk-intro">
          <div className="wk-intro__main">
            <p className="wk-eyebrow">
              <span className="wk-only-desktop">{W.eyebrow.desktop}</span>
              <span className="wk-only-mobile">{W.eyebrow.mobile}</span>
            </p>
            <h1 className="wk-h1">{W.title}</h1>
            <p className="wk-lead">{W.lead}</p>
          </div>

          <dl className="wk-facts">
            {W.meta.map((m) => (
              <div className="wk-facts__item" key={m.term}>
                <dt>
                  <span className="wk-only-desktop">{m.term}</span>
                  <span className="wk-only-mobile">{m.mobileTerm}</span>
                </dt>
                <dd>{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* hero image */}
        <figure className="wk-fig">
          <div className="wk-fig__frame">
            <img
              className="wk-fig__img"
              src={W.images.hero}
              alt="Workley app preview"
            />
          </div>
        </figure>

        {/* coming soon */}
        <section className="wk-soon" aria-labelledby="wk-soon-title">
          <p className="wk-soon__ghost wk-soon__ghost--a" aria-hidden="true">
            {W.soon.ghost}
          </p>
          <p className="wk-soon__ghost wk-soon__ghost--b" aria-hidden="true">
            {W.soon.ghost}
          </p>
          <p className="wk-soon__ghost wk-soon__ghost--c" aria-hidden="true">
            {W.soon.ghost}
          </p>

          <div className="wk-card">
            <div className="wk-card__bg" aria-hidden="true">
              <img className="wk-card__tex" src={IMAGES.footerTexture} alt="" />
              <div className="wk-card__shade" />
            </div>

            <div className="wk-card__icon">
              <span className="wk-card__icon-d">
                <img src={W.images.hourglass} alt="" width={24} height={24} />
              </span>
              <img
                className="wk-card__icon-m"
                src={W.images.bag}
                alt=""
                width={22}
                height={22}
              />
            </div>

            <p className="wk-card__kicker">{W.soon.kicker}</p>
            <h2 className="wk-card__title" id="wk-soon-title">
              {W.soon.title}
            </h2>
            <p className="wk-card__text">{W.soon.text}</p>
            <p className="wk-card__link">{W.soon.link}</p>
          </div>
        </section>
      </div>
    </div>
  );
}
