/*
  Mobile home page content (<= 767px) – Figma mobile frame (node 4151:5506).
  Content shared with the desktop home lives in home.ts.

  IMPORTANT: this file must contain DATA only (no components, no JSX).
  The component lives in components/mobile/MobileHome.tsx.
*/
import { HOME_LOGO_DIR, HOME_PROJECTS, HOME_SERVICES_TEXT } from "./home";
import type { HomeProject, TrustedData } from "@/types";
import { SERVICE_ICONS } from "./content";

/* logo slot is 20px high on mobile */
export const M_TRUSTED: TrustedData = {
  lead: "Trusted by over",
  accent: "10+ companies",
  logos: [
    { src: `${HOME_LOGO_DIR}/trusted-1.svg`, w: 20, h: 20 },
    { src: `${HOME_LOGO_DIR}/trusted-2.svg`, w: 24, h: 20 },
    {
      src: `${HOME_LOGO_DIR}/trusted-3-chain.png`,
      w: 40,
      h: 20,
      pad: "1px 6px",
    },
    { src: `${HOME_LOGO_DIR}/trusted-4-moove.png`, w: 54, h: 20, pad: "0 2px" },
    { src: `${HOME_LOGO_DIR}/trusted-5.svg`, w: 20, h: 20 },
    { src: `${HOME_LOGO_DIR}/trusted-6.svg`, w: 36, h: 20 },
    { src: `${HOME_LOGO_DIR}/trusted-7.svg`, w: 32, h: 20 },
  ],
};

interface MobileService {
  code: string;
  /** page the card opens (defaults to /services) */
  href?: string;
  icon: string;
  iconW: number;
  title: string;
  text: string;
  softBorder?: boolean;
}

/* heading = [word, word, red word, red word on 2nd line]
   icon slot is 32px high; iconW follows each SVG's aspect ratio
   (app icon is 10x14 -> 23px wide, the rest are square -> 32px) */
export const M_SERVICES = {
  heading: ["Six", "disciplines,", "one", "Agency."],
  text: HOME_SERVICES_TEXT,
  items: [
    {
      code: "S-01",
      href: "/services/app-development",
      icon: SERVICE_ICONS.app,
      iconW: 23,
      title: "App Development",
      text: "Native iOS & Android, built to ship.",
    },
    {
      code: "S-02",
      href: "/services/website-development",
      icon: SERVICE_ICONS.website,
      iconW: 32,
      title: "Website Development",
      text: "Fast, modern sites that convert visitors into customers - engineered to scale.",
      softBorder: true,
    },
    {
      code: "S-03",
      href: "/services/branding",
      icon: SERVICE_ICONS.branding,
      iconW: 32,
      title: "Branding",
      text: "Identity systems with a backbone.",
    },
    {
      code: "S-04",
      href: "/services/ui-ux-design",
      icon: SERVICE_ICONS.uiux,
      iconW: 32,
      title: "UI/UX Design",
      text: "Interfaces people actually enjoy.",
      softBorder: true,
    },
    {
      code: "S-05",
      href: "/services/seo-marketing",
      icon: SERVICE_ICONS.seo,
      iconW: 32,
      title: "SEO & Marketing",
      text: "Get found, get clicked, get customers.",
    },
    {
      code: "S-06",
      href: "/services/cms-development",
      icon: SERVICE_ICONS.cms,
      iconW: 32,
      title: "CMS Development",
      text: "Content you can update yourself, without calling a developer.",
      softBorder: true,
    },
  ] satisfies MobileService[],
};

/* Project card on mobile is 358 x 221.8. The images were laid out for the
   415 x 285 desktop card, so scale + centre them (uniform scale, no distortion). */
const S = 0.78;
const OX = (358 - 415 * S) / 2;
const OY = (221.8125 - 285 * S) / 2;
const fit = ([x, y, w, h]: [number, number, number, number]) => [
  +(x * S + OX).toFixed(2),
  +(y * S + OY).toFixed(2),
  +(w * S).toFixed(2),
  +(h * S).toFixed(2),
];

export interface MobileProject {
  title: string;
  titleEnd: string;
  desc: string;
  link: string;
  href: string;
  icon: string;
  images: { src: string; box: number[]; radius?: number }[];
}

const toMobile = (p: HomeProject): MobileProject => ({
  title: p.name,
  titleEnd: p.sub,
  desc: p.desc,
  link: p.link,
  href: p.href,
  icon: p.icon,
  images: p.images.map(({ src, box, radius }) => ({
    src,
    box: fit(box),
    ...(radius ? { radius: radius * S } : {}),
  })),
});

export const M_WORK_ITEMS: MobileProject[] = HOME_PROJECTS.map(toMobile);

export const M_PROCESS_HEADING = "Less overthinking. More making.";
