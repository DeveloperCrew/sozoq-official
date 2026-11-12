/* /terms and /privacy – same layout as /services:
   h1 + intro on top, then one row per section (label column | heading + body). */

import type { LegalBlock, LegalDoc } from "@/types";

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

/* turns a plain https:// URL inside a line into a link */
function Linkify({ text }: { text: string }) {
  const m = text.match(/^(.*?)(https?:\/\/\S+)(.*)$/);
  if (!m) return <>{text}</>;
  return (
    <>
      {m[1]}
      <a className="svcp__link" href={m[2]}>
        {m[2]}
      </a>
      {m[3]}
    </>
  );
}

function Block({ block }: { block: LegalBlock }) {
  switch (block.t) {
    case "h3":
      return <h3 className="svcp__h3">{block.x}</h3>;
    case "ul":
      return (
        <ul className="svcp__list">
          {block.items.map((item, i) => (
            <li className="svcp__li" key={i}>
              {typeof item === "string" ? (
                item
              ) : (
                <>
                  <strong className="svcp__strong">{item.b}</strong> {item.x}
                </>
              )}
            </li>
          ))}
        </ul>
      );
    case "lines":
      return (
        <div className="svcp__lines">
          {block.rows.map((row, i) => (
            <p className="svcp__line" key={i}>
              <Linkify text={row} />
            </p>
          ))}
        </div>
      );
    default:
      return <p className="svcp__p">{block.x}</p>;
  }
}

export default function LegalPage({ doc }: { doc: LegalDoc }) {
  const { title, updated, intro, sections } = doc;

  return (
    <div className="svcp">
      <div className="svcp__inner">
        <header className="svcp__intro">
          <h1 className="svcp__h1">{title}</h1>
          <p className="svcp__updated">{updated}</p>
          {intro.map((text, i) => (
            <p className="svcp__lead" key={i}>
              {text}
            </p>
          ))}
        </header>

        {sections.map((section, i) => {
          const id = slug(section.heading);
          return (
            <section
              className="svcp__item"
              id={id}
              aria-labelledby={`${id}-title`}
              key={id}
            >
              <p className="svcp__label">{String(i + 1).padStart(2, "0")}</p>
              <div className="svcp__body">
                <h2 className="svcp__h2" id={`${id}-title`}>
                  {section.heading}
                </h2>
                {section.blocks.map((block, j) => (
                  <Block block={block} key={j} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
