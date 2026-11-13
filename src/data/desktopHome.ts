/*
  Desktop home page content – from the Figma desktop design
  (file "E-commeres", node 4168:8659, 1440px frame).

  Used ONLY by components/desktop/DesktopHome.tsx (>= 768px).
  Content shared with the mobile home lives in home.ts. Images / logos / icons
  are re-used from the mobile home (same artwork, only the size changes).
*/
import { HOME_LOGO_DIR, HOME_SERVICES_TEXT } from "./home";
import type { FaqItem, TrustedData } from "@/types";
import { SERVICE_ICONS } from "./content";

export const D_RULER_LEFT: number[] = [
  100, 150, 200, 300, 400, 500, 600, 650, 700, 750, 800, 850, 900,
];

/* Figma logo slot is 25px high (mobile = 20px, same artwork x1.25) */
export const D_TRUSTED: TrustedData = {
  lead: "Trusted by over",
  accent: "10+ companies",
  logos: [
    { src: `${HOME_LOGO_DIR}/trusted-1.svg`, w: 25, h: 25 },
    { src: `${HOME_LOGO_DIR}/trusted-2.svg`, w: 30, h: 25 },
    {
      src: `${HOME_LOGO_DIR}/trusted-3-chain.png`,
      w: 50,
      h: 25,
      pad: "1px 7px",
    },
    { src: `${HOME_LOGO_DIR}/trusted-4-moove.png`, w: 67, h: 25, pad: "0 3px" },
    { src: `${HOME_LOGO_DIR}/trusted-5.svg`, w: 25, h: 25 },
    { src: `${HOME_LOGO_DIR}/trusted-6.svg`, w: 45, h: 25 },
    { src: `${HOME_LOGO_DIR}/trusted-7.svg`, w: 40, h: 25 },
  ],
};

interface DesktopService {
  code: string;
  /** page the card opens (defaults to /services) */
  href?: string;
  /** "lg" = 556x464 card (36px pad, 36px icon, 30px title)
      "sm" = small card (28px pad, 28px icon, 20px title) */
  size: "lg" | "sm";
  icon: string;
  title: string;
  text: string;
}

/* ---------- 01 Services (desktop copy differs from mobile) ---------- */
export const D_SERVICES = {
  heading: ["Six disciplines, ", "one Agency."],
  text: HOME_SERVICES_TEXT,
  items: [
    {
      code: "S-01",
      href: "/services/app-development",
      size: "lg",
      icon: SERVICE_ICONS.app,
      title: "App Development",
      text: "iOS and Android app development, API integration, backend systems and app maintenance.",
    },
    {
      code: "S-02",
      href: "/services/website-development",
      size: "sm",
      icon: SERVICE_ICONS.website,
      title: "Website Development",
      text: "Business websites, e-commerce platforms, custom web applications and responsive web solutions.",
    },
    {
      code: "S-03",
      href: "/services/branding",
      size: "sm",
      icon: SERVICE_ICONS.branding,
      title: "Branding",
      text: "Logo design, brand identity, brand guidelines, visual systems and brand communication.",
    },
    {
      code: "S-04",
      href: "/services/ui-ux-design",
      size: "sm",
      icon: SERVICE_ICONS.uiux,
      title: "UI/UX Design",
      text: "User research, wireframing, interface design, prototyping and usability testing.",
    },
    {
      code: "S-05",
      href: "/services/seo-marketing",
      size: "lg",
      icon: SERVICE_ICONS.seo,
      title: "SEO & Marketing",
      text: "Search engine optimisation, social media management, content strategy and digital advertising.",
    },
    {
      code: "S-06",
      href: "/services/cms-development",
      size: "lg",
      icon: SERVICE_ICONS.cms,
      title: "CMS Development",
      text: "Custom CMS solutions, WordPress development, content management and website integrations.",
    },
  ] satisfies DesktopService[],
};

export const D_PROCESS_HEADING: [string, string] = [
  "Less overthinking. ",
  "More making.",
];

/* ---------- 05 FAQ ----------
   Figma: the 3rd question is the open one. */
export const D_FAQ: {
  heading: [string, string];
  openIndex: number;
  items: FaqItem[];
} = {
  heading: ["Commonly Asked ", "Questions"],
  openIndex: -1,
  items: [
    {
      q: "1. What services does SOZOQ offer?",
      a: "Sozoq provides UI/UX design, website development, mobile app development, Saas and branding services. We help businesses build strong digital products from concept to launch.",
    },
    {
      q: "2. Do you provide development services too? ",
      a: "Yes, we do. We handle both design and development, ensuring your website or app is visually appealing, user-friendly, and fully functional.",
    },
    {
      q: "3. Do you work with startups or only established businesses?",
      a: "We work with startups, small businesses, and growing companies. Whether you're starting from scratch or improving an existing product, we can help.",
    },
    {
      q: "4. How long does it take to complete a project?",
      a: "Project timelines depend on the scope and complexity. A simple website may take a few weeks, while larger projects like mobile apps may take longer. We provide a clear timeline before starting.",
    },
    {
      q: "5. Do you offer custom design solutions? ",
      a: "Yes. Every project is custom-made based on your business needs, target audience, and goals. We do not use generic templates unless requested.",
    },
    {
      q: "6. Will I get support after project completion?",
      a: "Yes, we provide post-launch support and maintenance based on the agreed service plan.",
    },
    {
      q: "7. How do we get started?",
      a: "You can contact us through our website or email or whatsapp us with your requirements. We’ll discuss your needs and provide a proposal tailored to your project.",
    },
  ],
};
