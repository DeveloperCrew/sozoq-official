import { HOME_ICONS, HOME_PROJECTS } from "@/data/home";
import { M_WORK_ITEMS } from "@/data/mobileHome";
import type { CSSVars } from "@/types";
import type { ReactNode } from "react";
import { Eyebrow } from "../../shared/HomeBlocks";
import { HOME_EYEBROWS, HOME_WORK_TEXT } from "@/data/home";

/* "Work. / A selection of Best projects." heading band with its four corner
   dots. `children` is rendered inside the middle column (the cat mascot). */
export function WorkHead({
  title = "Work.",
  subtitle = "A selection of Best projects.",
  children,
}: {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <>
      <div className="work__head">
        <div className="work__col work__col--left" />
        <div className="work__col work__col--mid">
          <div className="work__title">
            <p className="work__title-1">{title}</p>
            <p className="work__title-2">{subtitle}</p>
          </div>
          {children}
        </div>
        <div className="work__col work__col--right" />
      </div>
    </>
  );
}

/* DOM order of the images inside a desktop project card (CSS positions them by role) */
const CARD_IMAGE_ORDER = ["main", "cap", "button"] as const;

/* same project cards as the home page: .dh shows at >= 768px, .mh at <= 767px */
export function ProjectList() {
  return (
    <div className="work__new">
      {/* ---------- desktop ---------- */}
      <div className="dh">
        <section className="dh-sec dh-work dh-work--page">
          <div className="dh-wrap">
            <div className="dh-head">
              <div className="dh-head__l">
                <Eyebrow prefix="dh" {...HOME_EYEBROWS.work} />
                <h2 className="dh-h2">
                  What&apos;s cooking at <span className="dh-red">SOZOQ?</span>
                </h2>
              </div>
              <p className="dh-lead">{HOME_WORK_TEXT}</p>
            </div>

            <ul className="dh-work__list">
              {HOME_PROJECTS.map((p) => {
                const slug = p.href.split("/").pop();
                return (
                  <li
                    /* "proj--workley" keeps the cat mascot animation working */
                    className={`dh-proj dh-proj--${slug}`}
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
                );
              })}
            </ul>
          </div>
        </section>
      </div>

      {/* ---------- mobile ---------- */}
      <div className="mh">
        <section className="mh-work">
          <div className="mh-head">
            <div>
              <Eyebrow prefix="mh" {...HOME_EYEBROWS.work} />
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
                    <img
                      src={HOME_ICONS.explore}
                      alt=""
                      width={15}
                      height={15}
                    />
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
      </div>
    </div>
  );
}
