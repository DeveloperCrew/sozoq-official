import { CONTACT_PAGE, WHATSAPP_URL } from "@/data/content";
import ContactForm from "./ContactForm";
import type { ComponentType, ReactNode } from "react";

/* 16px red line icons (Figma: mail-02, call-spark-02, whatsapp-business, location-09) */
const icon = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.1,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;
const MailIcon = () => (
  <svg {...icon}>
    <rect x="1.75" y="3.25" width="12.5" height="9.5" rx="1.75" />
    <path d="m2.5 4.5 5.5 4 5.5-4" />
  </svg>
);
const CallIcon = () => (
  <svg {...icon}>
    <path d="M5.4 2.2 4 2.6C3 3 2.6 4 3 5.2c.9 2.6 3.1 5.2 5.7 6.6 1.1.6 2.2.2 2.7-.8l.5-1.4c.1-.3 0-.6-.3-.8l-1.7-1c-.3-.2-.6-.1-.8.1l-.5.6a5.7 5.7 0 0 1-2.4-2.4l.6-.5c.2-.2.3-.5.1-.8l-.9-1.7c-.2-.3-.5-.4-.8-.2Z" />
    <path d="M11.5 1.5v3M10 3h3" />
  </svg>
);
const WhatsappIcon = () => (
  <svg {...icon}>
    <path d="M8 1.75a6.25 6.25 0 0 0-5.4 9.4l-.85 3.1 3.2-.83A6.25 6.25 0 1 0 8 1.75Z" />
    <path d="M6.3 5v6h2.1a1.6 1.6 0 0 0 0-3.2H6.3m0 0h1.8a1.4 1.4 0 0 0 0-2.8H6.3" />
  </svg>
);
const PinIcon = () => (
  <svg {...icon}>
    <path d="M8 14.25s4.5-3.9 4.5-7.4a4.5 4.5 0 0 0-9 0c0 3.5 4.5 7.4 4.5 7.4Z" />
    <circle cx="8" cy="6.75" r="1.6" />
  </svg>
);

function InfoCard({
  icon: Icon,
  label,
  className = "",
  children,
}: {
  icon: ComponentType;
  label: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={`ct-card ${className}`}>
      <span className="ct-card__icon">
        <Icon />
      </span>
      <div className="ct-card__text">
        <p className="ct-card__label">{label}</p>
        {children}
      </div>
    </div>
  );
}

/* /contact – Figma 4007:1663 (desktop) · 4011:3486 (mobile) */
export default function ContactPage() {
  const c = CONTACT_PAGE;

  return (
    <div className="ct">
      <div className="ct__inner">
        <header className="ct__intro">
          <h1 className="ct__h1">{c.title}</h1>
          <p className="ct__lead">
            <span className="ct-only-desktop">{c.lead}</span>
            <span className="ct-only-mobile">{c.leadMobile ?? c.lead}</span>
          </p>
        </header>

        <div className="ct__grid">
          <div className="ct__info">
            <InfoCard icon={MailIcon} label="Email" className="ct-card--email">
              {c.emails.map((mail) => (
                <a
                  className="ct-card__value"
                  href={`mailto:${mail}`}
                  key={mail}
                >
                  {mail}
                </a>
              ))}
            </InfoCard>

            <div className="ct__pair">
              <InfoCard icon={CallIcon} label="Call">
                <a className="ct-card__value" href={c.phoneHref}>
                  {c.phone}
                </a>
              </InfoCard>
              <InfoCard icon={WhatsappIcon} label="WhatsApp">
                <a
                  className="ct-card__value"
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {c.whatsappText}
                </a>
              </InfoCard>
            </div>

            <InfoCard icon={PinIcon} label="Office" className="ct-card--office">
              <p className="ct-card__value ct-card__value--sm">{c.office}</p>
            </InfoCard>
          </div>

          <ContactForm
            services={c.services}
            thanks={c.thanks}
            thanksButton={c.thanksButton}
            thanksImage={c.thanksImage}
            thanksImageBlink={c.thanksImageBlink}
            whatsappUrl={WHATSAPP_URL}
          />
        </div>
      </div>
    </div>
  );
}
