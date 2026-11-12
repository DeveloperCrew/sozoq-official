/* Workley case-study page – copy from Figma "workley" frames
   (desktop 3881:3489 · mobile 3881:3739, file gyHsVxMJIrtU3hoqXsb3b7). */
import type { WorkleyData } from "@/types";

const IMG = "/assets/images";
const ICO = "/assets/icons";

export const WORKLEY: WorkleyData = {
  metaTitle: "Workley – App | Sozoq",
  metaDescription:
    "Workley connects Citizens who need a helping hand with Heroes ready to step up, turning everyday requests into meaningful acts of help.",

  // the desktop frame says "Workley", the mobile frame says "SOZOKYU" – both kept as designed
  eyebrow: { desktop: "Workley", mobile: "SOZOKYU" },
  title: "Everyday Heroes, Real-World Impact.",
  lead: "What if everyday tasks became missions and ordinary people became heroes? Workley connects Citizens who need a helping hand with Heroes ready to step up, turning everyday requests into meaningful acts of help.",

  // desktop says "Project Duration", mobile says "Duration"
  meta: [
    { term: "Service", mobileTerm: "Service", value: "App & Dashboard" },
    { term: "Industry", mobileTerm: "Industry", value: "Service Based" },
    { term: "Project Duration", mobileTerm: "Duration", value: "-" },
  ],

  images: {
    hero: `${IMG}/workley-app.webp`,
    hourglass: `${ICO}/workley-hourglass.svg`,
    bag: `${ICO}/workley-bag.svg`,
  },

  soon: {
    ghost: "COMING SOON",
    kicker: "SOMETHING IS IN THE WORKS",
    title: "Coming Soon",
    text: "We are putting the finishing touches on this project.",
    link: "Check back shortly",
  },
};
