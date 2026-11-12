import { Ruler } from "./Decor";
import NavLinks from "./NavLinks";
import { ICONS, NAV_LINKS } from "@/data/content";
import type { NavLink } from "@/types";

interface HeaderProps {
  navLinks?: NavLink[];
  homeHref?: string;
  /** page the nav belongs to (highlights its link) */
  currentHref?: string;
  /** home: floating nav only · back: wordmark + "Back to Home" · case: wordmark + "Service" + "All work" */
  variant?: "home" | "back" | "case";
  /** "back" variant link (mobile top bar) – defaults to "Back to Home" */
  backHref?: string;
  backLabel?: string;
}

export default function Header({
  navLinks = NAV_LINKS,
  homeHref = "#home",
  currentHref,
  variant = "home",
  backHref = "/",
  backLabel = "Back to Home",
}: HeaderProps) {
  const nav = (
    <nav className="nav" aria-label="Main">
      <a className="nav__logo" href={homeHref} aria-label="Sozoq home">
        <img src={ICONS.wordmark} alt="Sozoq" width={85.909} height={17.997} />
      </a>
      <NavLinks links={navLinks} currentHref={currentHref} />
    </nav>
  );

  /* home page: the desktop + mobile home components draw their own header,
     the shared <header> only keeps the floating mobile menu */
  if (variant === "home") {
    return (
      <header className="row row--header row--header-home">
        <div className="col col--middle header__middle">{nav}</div>
      </header>
    );
  }

  return (
    <header className="row row--header">
      <div className="col col--side col--left header__margin">
        <Ruler values={[50]} />
      </div>

      <div className="col col--middle header__middle">
        {/* mobile only: top bar from the Figma mobile design.
            The page links live in the floating menu below. */}
        <div className="header__bar header__bar--case">
          <a
            className="header__wordmark"
            href={homeHref}
            aria-label="Sozoq home"
          >
            <img
              src={ICONS.wordmark}
              alt="Sozoq"
              width={85.909}
              height={17.995}
            />
          </a>

          {variant === "back" ? (
            <div className="header__links">
              <a className="header__link header__link--icon" href={backHref}>
                <img src={ICONS.arrowLeft18} alt="" width={15} height={15} />
                <span>{backLabel}</span>
              </a>
            </div>
          ) : (
            <div className="header__links">
              <a className="header__link header__link--icon" href="/work">
                <img src={ICONS.arrowLeft18} alt="" width={18} height={18} />
                <span>All work</span>
              </a>
            </div>
          )}
        </div>

        {nav}
      </div>

      <div className="col col--side col--right header__margin header__margin--right" />
    </header>
  );
}
