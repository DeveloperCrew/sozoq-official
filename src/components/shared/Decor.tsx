/* Small layout decorations shared by the header and the /work page. */

export function Dot({ className = "" }: { className?: string }) {
  return <span className={`dot ${className}`.trim()} />;
}

/* rotated ruler labels (e.g. "50") in the header margin */
export function Ruler({ values }: { values: number[] }) {
  return (
    <div className="ruler ruler--header">
      {values.map((value) => (
        <div className="ruler__item" key={value}>
          <div className="ruler__rot">
            <p className="ruler__label ruler__label--solid">{value}</p>
            <span className="ruler__tick" />
          </div>
        </div>
      ))}
    </div>
  );
}

/* full-width hairline with a dot at each end (bottom of the /work page) */
export function SectionRule() {
  return <div className="work__rule work__rule--end" />;
}
