import type { CSSProperties } from "react";

/* Shared types for the data files and components. */

/** inline style that also accepts CSS custom properties, e.g. { "--i": 3 } */
export type CSSVars = CSSProperties & Record<`--${string}`, string | number>;

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
  /** home-page section that marks this link as "current" while scrolling */
  section?: string;
}

export interface FooterLink {
  label: string;
  href: string;
  external: boolean;
}

export interface FooterCta {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
}

export interface Person {
  name: string;
  role: string;
  photo: string;
  /** which part of a tall photo is kept (CSS object-position) */
  focus?: string;
  /** zoom level (1 = none) */
  zoom?: number;
  /** the point the photo zooms into */
  zoomOrigin?: string;
}

export interface FaqItem {
  q: string;
  a?: string;
}

/* ---------- home page (desktop + mobile) ---------- */

export interface EyebrowData {
  n: string;
  label: string;
}

export interface Cta {
  label: string;
  href: string;
}

export interface HeroData {
  tags: string[];
  titleLine1: string;
  titleLine2: string;
  text: string;
  viewWork: Cta;
  startWork: Cta;
  budget: { lead: string; label: string; href: string };
  status: string;
}

export interface TrustedLogo {
  src: string;
  w: number;
  h: number;
  pad?: string;
}

export interface TrustedData {
  lead: string;
  accent: string;
  logos: TrustedLogo[];
}

export interface ProcessStepData {
  n: string;
  icon: string;
  title: string;
  text: string;
  accent?: boolean;
}

export interface HomeFooterData {
  title: string;
  email: string;
  whatsapp: string;
  copy: string;
}

export type HomeIcons = Record<
  | "whatsappHeader"
  | "whatsappFooter"
  | "arrowBtn"
  | "arrowUpRight"
  | "explore"
  | "faqPlus"
  | "mailArrow"
  | "linkArrow",
  string
>;

/* ---------- work / projects ---------- */

export interface Project {
  title: string;
  desc: string;
  cta: string;
  href: string;
  icon: string;
  images: { main: string; cap: string; button: string };
}

/* ---------- case studies ---------- */

export interface CaseFigureData {
  src: string;
  alt: string;
  caption?: string;
}

export interface CaseToggleData {
  colour: { src: string; alt: string };
  wireframe: { src: string; alt: string };
  defaultColour?: boolean;
}

export interface CaseListData {
  intro: string;
  items: { term: string; text: string }[];
  outro: string;
}

export type CaseLayout = "none" | "single" | "tall" | "grid" | "toggle";

export interface CaseSectionData {
  id: string;
  label: string;
  title?: string;
  body: string[];
  layout: CaseLayout;
  first?: boolean;
  lead?: boolean;
  tail?: boolean;
  last?: boolean;
  list?: CaseListData;
  figures?: CaseFigureData[];
  toggle?: CaseToggleData;
}

export interface CaseSummaryItem {
  term: string;
  text?: string;
  live?: {
    pre: string;
    caps: string;
    mid: string;
    label: string;
    href: string;
    post: string;
  };
}

export interface CaseStudyData {
  brand: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  /** strings render as-is, { caps } renders upper-cased */
  intro: (string | { caps: string })[];
  meta: { term: string; value: string }[];
  hero: { src: string; alt: string };
  summary: CaseSummaryItem[];
  sections: CaseSectionData[];
}

/* ---------- inner pages ---------- */

export interface ServicesPageData {
  title: string;
  lead: string;
  items: {
    id: string;
    label: string;
    heading: string;
    paragraphs: string[];
  }[];
}

export interface ContactPageData {
  title: string;
  lead: string;
  emails: string[];
  phone: string;
  phoneHref: string;
  whatsappText: string;
  office: string;
  services: string[];
  thanks: string;
  thanksButton: string;
  thanksImage: string;
}

export type LegalListItem = string | { b: string; x: string };

export type LegalBlock =
  | { t: "p"; x: string }
  | { t: "h3"; x: string }
  | { t: "ul"; items: LegalListItem[] }
  | { t: "lines"; rows: string[] };

export interface LegalDoc {
  title: string;
  updated: string;
  intro: string[];
  sections: { heading: string; blocks: LegalBlock[] }[];
}

export interface WorkleyData {
  metaTitle: string;
  metaDescription: string;
  eyebrow: { desktop: string; mobile: string };
  title: string;
  lead: string;
  meta: { term: string; mobileTerm: string; value: string }[];
  images: { hero: string; hourglass: string; bag: string };
  soon: {
    ghost: string;
    kicker: string;
    title: string;
    text: string;
    link: string;
  };
}

/* ---------- contact form ---------- */

export interface ContactFormValues {
  name: string;
  email: string;
  service: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

/* ---------- home page: selected works (shared by desktop + mobile) ---------- */

export type HomeProjectRole = "main" | "cap" | "button";

export interface HomeProjectImage {
  role: HomeProjectRole;
  src: string;
  /** [left, top, width, height] inside the 415 x 285 desktop card */
  box: [number, number, number, number];
  radius?: number;
}

export interface HomeProject {
  /** brand part of the title, e.g. "Workley" */
  name: string;
  /** what it is, e.g. "App" */
  sub: string;
  /** desktop title when it differs from `${name} - ${sub}` */
  desktopTitle?: string;
  desc: string;
  link: string;
  href: string;
  icon: string;
  images: HomeProjectImage[];
}
