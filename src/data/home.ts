/*
  Home page content shared by the desktop (>= 768px) and mobile (<= 767px)
  layouts. Anything that is different per layout lives in desktopHome.ts /
  mobileHome.ts.
*/
import { IMAGES } from "./content";
import type {
  EyebrowData,
  HeroData,
  HomeFooterData,
  HomeIcons,
  HomeProject,
  ProcessStepData,
} from "@/types";

export const HOME_ICON_DIR = "/assets/icons/mobile";
export const HOME_LOGO_DIR = "/assets/logos/mobile";

export const HOME_ICONS: HomeIcons = {
  whatsappHeader: `${HOME_ICON_DIR}/whatsapp-header.svg`,
  whatsappFooter: `${HOME_ICON_DIR}/whatsapp-footer.svg`,
  arrowBtn: `${HOME_ICON_DIR}/arrow-right-btn.svg`,
  arrowUpRight: `${HOME_ICON_DIR}/arrow-up-right.svg`,
  explore: `${HOME_ICON_DIR}/explore-arrow.svg`,
  faqPlus: `${HOME_ICON_DIR}/faq-plus.svg`,
  mailArrow: `${HOME_ICON_DIR}/footer-mail-arrow.svg`,
  linkArrow: `${HOME_ICON_DIR}/footer-link-arrow.svg`,
};

export const HOME_HERO: HeroData = {
  tags: ["DESIGN", "DEVELOP ", "GROW"], // "DEVELOP " keeps Figma's trailing space
  titleLine1: "we are a creative",
  titleLine2: "Tech Agency",
  text: "Let's build something awesome together. Got an idea? We've got the team to make it happen.",
  viewWork: { label: "View work", href: "/work" },
  startWork: { label: "Start Work", href: "/contact" },
  budget: {
    lead: "Not sure what it'll cost?",
    label: "Calculate your budget",
    href: "/contact",
  },
  status: "globally Available",
};

export const HOME_EYEBROWS: Record<
  "services" | "work" | "process" | "about" | "faq",
  EyebrowData
> = {
  services: { n: "01", label: "service’s which we provide " },
  work: { n: "02", label: "Selected Works" },
  process: { n: "03", label: "THE Process" },
  about: { n: "04", label: "Little about sozoq" },
  faq: { n: "05", label: "Questions" },
};

export const HOME_SERVICES_TEXT =
  "We combine design, technology and strategy to build brands, digital products and solutions that help businesses grow.";

export const HOME_WORK_TEXT =
  "A fresh batch of ideas, designs and digital experiences we've been cooking up.";

export const HOME_PROCESS_TEXT =
  "We turn random “what ifs” into real brands, websites and digital products.";

export const HOME_PROCESS_STEPS: ProcessStepData[] = [
  {
    n: "01",
    icon: `${HOME_ICON_DIR}/process-idea.svg`,
    title: "Brainstorm",
    text: "First, we get inside your head.",
    accent: true,
  },
  {
    n: "02",
    icon: `${HOME_ICON_DIR}/process-lab.svg`,
    title: "Creative Lab",
    text: "Ideas go in. Magic comes out.",
  },
  {
    n: "03",
    icon: `${HOME_ICON_DIR}/process-rocket.svg`,
    title: "Big Launch",
    text: "Less talk. More impact.",
  },
];

export const HOME_FOOTER: HomeFooterData = {
  title: "Have something in mind?",
  email: "hello@sozoq.in",
  whatsapp: "Whatsapp",
  copy: "©2026 SOZOQ, All Rights Reserved",
};

/* ---------- 02 Selected works ----------
   box = [left, top, width, height] inside the 415 x 285 desktop card
   (measured from the card's inside edge). Draw order = array order.
   Desktop positions the images from CSS by `role`; mobile scales `box`. */
export const HOME_PROJECTS: HomeProject[] = [
  {
    name: "Workley",
    sub: "App",
    desc: "A digital platform built to celebrate everyday heroes, connecting people with meaningful opportunities through an engaging and accessible experience.",
    link: "Explore Workley",
    href: "/work/workley",
    icon: `${HOME_ICON_DIR}/workley-logo.svg`,
    images: [
      { role: "button", src: IMAGES.workleyButton, box: [21, 161, 75, 75] },
      { role: "cap", src: IMAGES.workleyCap, box: [292, 42, 92, 85] },
      { role: "main", src: IMAGES.workleyMain, box: [59, 74, 296, 136] },
    ],
  },
  {
    name: "Fitside",
    sub: "E Com Website",
    desc: "A modern fashion storefront designed to showcase the brand, highlight its collections, and deliver a seamless online shopping experience.",
    link: "Explore Fitside",
    href: "/work/sozokyu",
    icon: "/assets/icons/project-fitside.webp",
    images: [
      {
        role: "button",
        src: IMAGES.sozokyuButton,
        box: [40.71, 165.87, 103.821, 108.009],
      },
      {
        role: "cap",
        src: IMAGES.sozokyuCap,
        box: [262, -9, 105.85, 106.151],
      },
      { role: "main", src: IMAGES.sozokyuMain, box: [90, 44, 233, 196] },
    ],
  },
  {
    name: "Fitside",
    sub: "Dashboard",
    desktopTitle: "Fitside -\u00a0 Dashboard", // Figma has two spaces here
    desc: "A centralised dashboard designed to simplify e-commerce management, organise store operations, and make everyday tasks easier to handle.",
    link: "Explore Fitside",
    href: "/work/sozokyu-dashboard",
    icon: "/assets/icons/project-fitside.webp",
    images: [
      { role: "cap", src: IMAGES.dashCap, box: [207, 7, 126.59, 118.639] },
      {
        role: "button",
        src: IMAGES.dashButton,
        box: [62.5, 150.08, 127.429, 127.874],
      },
      { role: "main", src: IMAGES.dashMain, box: [129.5, 44, 154, 196] },
    ],
  },
  {
    name: "MealBox",
    sub: "Recipe App",
    desc: "A food discovery platform connecting recipe exploration with grocery shopping, helping users find recipes and shop for the ingredients they need.",
    link: "Explore MealBox",
    href: "/work/mealbox",
    icon: "/assets/icons/project-mealbox.webp",
    images: [
      {
        role: "button",
        src: IMAGES.mealButton,
        box: [26, 160, 72.063, 70.297],
      },
      { role: "cap", src: IMAGES.mealCap, box: [305, 52, 85.247, 75.502] },
      {
        role: "main",
        src: IMAGES.mealMain,
        box: [58.5, 86, 296, 112],
        radius: 10,
      },
    ],
  },
];
