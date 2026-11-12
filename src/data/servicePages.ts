/* Service detail pages (/services/<slug>) – one shared template, one data set per page.
   Figma file gyHsVxMJIrtU3hoqXsb3b7
     website  desktop 4218:2761 · mobile 4218:2996
     branding desktop 4220:3261 · mobile 4233:4308
     ui/ux    desktop 4232:3793 · mobile 4238:4668
     seo      desktop 4232:3506 · mobile 4237:4483
     app      desktop 4217:1638 · mobile 4217:2340
     cms      desktop 4232:4013 · mobile 4238:5194
   The desktop and mobile frames share most copy but a few section labels,
   headings and the process steps differ, so those live under `desktop` / `mobile`. */

export interface HeroImage {
  src: string;
  /** set for a small image centred in the grey tile; omit for a full-bleed image */
  w?: number;
  h?: number;
  /** centring offsets in px (Figma uses calc(50% + n)) */
  dx?: number;
  dy?: number;
}

export interface ServicePageData {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: { code: string; name: string };
  title: readonly [string, string];
  lead: string;
  hero: {
    desktop: HeroImage;
    mobile: HeroImage;
    /** hero tile background when it is not the default #eee (app development uses #f8f8f8) */
    bg?: string;
  };
  build: { label: string; heading: string; text: string; items: string[] };
  /** `text` may be "" – the step then shows only its label (app development) */
  steps: { title: string; text: string; icon: string }[];
  perf: string[];
  desktop: {
    process: { label: string; heading: string; text: string };
    perf: { label: string; heading: string };
    /** hero heading box width, px (default: full 602px column) */
    titleW?: number;
    /** hero paragraph width, px (default 320) */
    leadW?: number;
    /** numbered list width, px (default 444) */
    listW?: number;
    /** process row has no fixed 62px height; the connecting line sits at the icon centre (y 34) */
    flowAuto?: boolean;
    /** icon-only process row (six steps, label under each dot, no description) – app development */
    flowIcons?: boolean;
  };
  mobile: {
    /** mobile heading when it differs from `title` (e.g. a trailing black full stop) */
    title?: readonly [string, string, string?];
    /** how many leading list rows carry a bottom rule on mobile (default 4) */
    lineRows?: number;
    /** list numbers shown on mobile, when the mobile frame differs from 01…n */
    numbers?: string[];
    /** mobile bullets when the mobile frame words them differently from `perf` */
    perfItems?: string[];
    process: {
      label: string;
      heading: string;
      /** paragraph under the mobile process heading (only some mobile frames have one) */
      text?: string;
      /** mobile steps show a description under the title (website) or only the title (branding) */
      showText: boolean;
      /** gap above the steps, px */
      flowTop: number;
      /** connecting line, px from the left / width */
      line: { left: number; width: number };
    };
    perf: { label: string; heading: string };
  };
}

const WEB_IMG = "/assets/images/website-service";
const WEB_ICON = "/assets/icons/website-service";
const BRAND_IMG = "/assets/images/branding-service";
const BRAND_ICON = "/assets/icons/branding-service";
const UIUX_IMG = "/assets/images/uiux-service";
const SEO_IMG = "/assets/images/seo-service";
const SEO_ICON = "/assets/icons/seo-service";

/* ---------- S-02 Website development ---------- */
export const WEBSITE_SERVICE: ServicePageData = {
  slug: "website-development",
  metaTitle: "Website Development – Sozoq",
  metaDescription:
    "We build fast, responsive and easy-to-use websites that help businesses stand out, connect with customers and get things done.",
  eyebrow: { code: "s2", name: "Website development" },
  title: ["Websites that do more than ", "just look good."],
  lead: "We build fast, responsive and easy-to-use websites that help businesses stand out, connect with customers and get things done.",
  hero: {
    desktop: { src: `${WEB_IMG}/hero-desktop.png` },
    mobile: { src: `${WEB_IMG}/hero-mobile.png` },
  },
  build: {
    label: "What we build",
    heading: "More than just a website.",
    text: "From simple business websites to complex web platforms, we build digital experiences that work for your business.",
    items: [
      "Business Websites",
      "E-commerce Websites",
      "Portfolio Websites",
      "Landing Pages",
      "Web Applications",
      "Custom Websites",
    ],
  },
  steps: [
    {
      title: "design",
      text: "Clean layouts and designs that match your brand.",
      icon: `${WEB_ICON}/pen-tool-minus.svg`,
    },
    {
      title: "develop",
      text: "Responsive websites built with modern technologies.",
      icon: `${WEB_ICON}/ai-programming.svg`,
    },
    {
      title: "Performance",
      text: "Fast-loading pages and smooth user experiences.",
      icon: `${WEB_ICON}/laptop-performance.svg`,
    },
  ],
  perf: [
    "Fast-loading pages with smooth navigation.",
    "Responsive layouts for mobiles, tablets and desktops.",
    "SEO-friendly structure and third-party integrations.",
  ],
  desktop: {
    process: {
      label: "MADE FOR YOUR BUSINESS",
      heading: "Built around your business. Not a template.",
      text: "Every business is different. We focus on creating websites that are easy to use, look great and work smoothly.",
    },
    perf: {
      label: "BUILT FOR EVERY SCREEN",
      heading: "Websites built to perform.",
    },
  },
  mobile: {
    process: {
      label: "From idea to app",
      heading: "A clear process, Better results.",
      showText: true,
      flowTop: 20,
      line: { left: 50, width: 258 },
    },
    perf: {
      label: "built for real users",
      heading: "Performance in every detail.",
    },
  },
};

/* ---------- S-03 Branding ---------- */
export const BRANDING_SERVICE: ServicePageData = {
  slug: "branding",
  metaTitle: "Branding – Sozoq",
  metaDescription:
    "We create logos and visual identities that give your business a clear look, a unique style and a consistent presence.",
  eyebrow: { code: "s3", name: "Branding" },
  title: ["Brands that ", "People remember."],
  lead: "We create logos and visual identities that give your business a clear look, a unique style and a consistent presence.",
  hero: {
    desktop: {
      src: `${BRAND_IMG}/hero-desktop.png`,
      w: 137,
      h: 133,
      dx: 0.5,
      dy: 0,
    },
    mobile: {
      src: `${BRAND_IMG}/hero-mobile.png`,
      w: 104,
      h: 101,
      dx: 0,
      dy: 0.5,
    },
  },
  build: {
    label: "OUR BRANDING SERVICES",
    heading: "Everything your brand needs.",
    text: "From the first logo to the complete brand identity, we create the visual elements that make your business stand out.",
    items: [
      "Logo Design",
      "Brand Identity",
      "Typography",
      "Colour Palette",
      "Packaging Design",
      "Brand Guidelines",
    ],
  },
  steps: [
    {
      title: "Discover",
      text: "Understand your business and audience.",
      icon: `${BRAND_ICON}/investigation.svg`,
    },
    {
      title: "Define",
      text: "Set the brand direction and style.",
      icon: `${BRAND_ICON}/note-edit.svg`,
    },
    {
      title: "Design",
      text: "Create the logo and visual identity.",
      icon: `${WEB_ICON}/pen-tool-minus.svg`,
    },
    {
      title: "Deliver",
      text: "Prepare your complete brand kit.",
      icon: `${BRAND_ICON}/ai-elements.svg`,
    },
  ],
  perf: [
    "Unique logos and visual elements that reflect your business.",
    "Consistent colours, typography and design across platforms.",
    "Brand assets ready for websites, social media and print.",
  ],
  desktop: {
    process: {
      label: "OUR APPROACH",
      heading: "First, we get to know you.",
      text: "We understand your business, explore ideas and build a brand identity that fits your vision.",
    },
    perf: {
      label: "BUILT TO BE RECOGNIZED",
      heading: "A brand identity that works everywhere.",
    },
  },
  mobile: {
    process: {
      label: "OUR APPROACH",
      heading: "First, we get to know you.",
      showText: false,
      flowTop: 24,
      line: { left: 30, width: 303 },
    },
    perf: {
      label: "BUILT TO BE RECOGNIZED",
      heading: "A brand identity that works everywhere.",
    },
  },
};

/* ---------- S-04 UI/UX design ---------- */
export const UIUX_SERVICE: ServicePageData = {
  slug: "ui-ux-design",
  metaTitle: "UI/UX Design – Sozoq",
  metaDescription:
    "We design digital experiences that look good, feel natural and make complicated things simple. From the first sketch to the final screen, every detail has a purpose.",
  eyebrow: { code: "s4", name: "Ui/ux design" },
  title: ["Less confusion. More clicks. ", "Better experiences."],
  lead: "We design digital experiences that look good, feel natural and make complicated things simple. From the first sketch to the final screen, every detail has a purpose.",
  hero: {
    // same artwork in both frames (Figma "image 176"), scaled per breakpoint
    desktop: { src: `${UIUX_IMG}/hero.webp`, w: 209, h: 157, dx: 0.5, dy: 0 },
    mobile: { src: `${UIUX_IMG}/hero.webp`, w: 160, h: 120, dx: 0, dy: 0 },
  },
  build: {
    label: "WHAT WE BUILD",
    heading: "Everything your product needs to feel right.",
    text: "From understanding your users to designing every screen, we create experiences that are easy to use and built around real needs.",
    items: [
      "User Research & Discovery",
      "User Flow & Information Architecture",
      "Wireframing & Prototyping",
      "Website & App UI Design",
      "Design Systems & Components",
      "Usability Testing",
    ],
  },
  steps: [
    {
      title: "Discover",
      text: "Understand the user problem.",
      icon: `${BRAND_ICON}/investigation.svg`,
    },
    {
      title: "Define",
      text: "Plan the structure and user flow.",
      icon: `${BRAND_ICON}/note-edit.svg`,
    },
    {
      title: "Design",
      text: "Create the screens and interactions.",
      icon: `${WEB_ICON}/pen-tool-minus.svg`,
    },
    {
      title: "Deliver",
      // the Figma frame breaks this line by hand after "hand"
      text: "Prototype, test and hand\nover.",
      icon: `${BRAND_ICON}/ai-elements.svg`,
    },
  ],
  perf: [
    "User-friendly interfaces designed around real customer needs.",
    "Clear layouts and navigation that make every interaction simple.",
    "Consistent UI designs for websites, apps and digital products.",
  ],
  desktop: {
    process: {
      label: "THE DESIGN JOURNEY",
      heading: "A little sketch. A lot of thinking. One great product.",
      text: "Every great interface starts somewhere. We take it through four stages to make sure nothing gets missed.",
    },
    perf: {
      label: "DESIGNED TO FEEL RIGHT",
      heading: "Digital experiences that just make sense.",
    },
    leadW: 346,
    listW: 525,
  },
  mobile: {
    // mobile frame: red "Better experiences" then a black full stop
    title: ["Less confusion. More clicks. ", "Better experiences", "."],
    process: {
      label: "THE DESIGN JOURNEY",
      heading: "A little sketch. A lot of thinking. One great product.",
      showText: false,
      flowTop: 24,
      line: { left: 30, width: 303 },
    },
    perf: {
      label: "DESIGNED TO FEEL RIGHT",
      heading: "Digital experiences that just make sense.",
    },
  },
};

/* ---------- S-05 SEO & Marketing ---------- */
export const SEO_SERVICE: ServicePageData = {
  slug: "seo-marketing",
  metaTitle: "SEO & Marketing – Sozoq",
  metaDescription:
    "We help businesses improve their online presence, reach the right audience and turn more visitors into customers through SEO and digital marketing.",
  eyebrow: { code: "s5", name: "SEo & Marketing" },
  title: ["More visibility, ", "Real Growth."],
  lead: "We help businesses improve their online presence, reach the right audience and turn more visitors into customers through SEO and digital marketing.",
  hero: {
    // same artwork in both frames (Figma "image 175"), scaled per breakpoint
    desktop: { src: `${SEO_IMG}/hero.webp`, w: 236, h: 118, dx: 0, dy: 0.5 },
    mobile: { src: `${SEO_IMG}/hero.webp`, w: 171, h: 85, dx: 0.5, dy: 0.5 },
  },
  build: {
    label: "WHAT WE DO",
    heading: "Digital marketing that gets you noticed.",
    text: "From search engines to social media, we help your business reach more people and build a stronger online presence.",
    items: [
      "Search Engine Optimization (SEO)",
      "Google Ads & PPC",
      "Social Media Marketing",
      "Content Marketing",
      "Email Marketing",
      "Local SEO",
      "Analytics & Reporting",
      "Conversion Optimization",
    ],
  },
  steps: [
    {
      title: "Data Driven",
      text: "We use insights to make better decisions.",
      icon: `${SEO_ICON}/database-lightning.svg`,
    },
    {
      title: "Audience Focused",
      text: "We target people who matter to your business.",
      icon: `${SEO_ICON}/target-02.svg`,
    },
    {
      title: "Growth Focused",
      text: "We work towards more traffic, leads and sales.",
      icon: `${SEO_ICON}/chart-line-data-01.svg`,
    },
  ],
  perf: [
    "SEO strategies to improve search rankings and visibility.",
    "Targeted ads across Google and social media.",
    "Content and campaigns that reach the right audience.",
    "Performance tracking to improve traffic, leads and conversions.",
  ],
  desktop: {
    process: {
      label: "HOW WE WORK",
      heading: "Smart marketing. No random guessing.",
      text: "We use the right mix of data, creativity and marketing strategies to help your business grow online.",
    },
    perf: {
      label: "BUILT FOR BETTER REACH",
      heading: "Marketing that gets you noticed.",
    },
    titleW: 552,
    listW: 547,
    flowAuto: true,
  },
  mobile: {
    // every row but the last has a rule on the mobile frame
    lineRows: 7,
    // the mobile frame numbers the last three rows "06" (the desktop frame says 06, 07, 08)
    numbers: ["01", "02", "03", "04", "05", "06", "06", "06"],
    process: {
      label: "HOW WE WORK",
      heading: "Smart marketing. No random guessing.",
      showText: true,
      flowTop: 24,
      line: { left: 50, width: 258 },
    },
    perf: {
      label: "BUILT FOR BETTER REACH",
      heading: "Marketing that gets you noticed.",
    },
  },
};

/* ---------- S-01 App development ---------- */
const APP_IMG = "/assets/images/app-service";
const APP_ICON = "/assets/icons/app-service";
export const APP_SERVICE: ServicePageData = {
  slug: "app-development",
  metaTitle: "App Development – Sozoq",
  metaDescription:
    "We design and develop mobile experiences that feel natural, useful and easy to use. From idea to launch, we build apps that make a real difference.",
  eyebrow: { code: "s1", name: "App development" },
  title: ["Apps designed for the way ", "people move."],
  lead: "We design and develop mobile experiences that feel natural, useful and easy to use. From idea to launch, we build apps that make a real difference.",
  hero: {
    // Figma "image 172" – 122x135 on desktop, 101x111 on mobile, centred in a #f8f8f8 tile
    desktop: { src: `${APP_IMG}/hero.webp`, w: 122, h: 135, dx: 0, dy: 0 },
    mobile: { src: `${APP_IMG}/hero.webp`, w: 101, h: 111, dx: 0.5, dy: 0.5 },
    bg: "#f8f8f8",
  },
  build: {
    label: "What we build",
    heading: "Solution for every business.",
    text: "From simple mobile apps to complex platforms, we build digital products that help you move forward.",
    items: [
      "Business Apps",
      "Customer Apps",
      "Service Platforms",
      "Booking Apps",
      "Custom Apps",
      "Mobile Experience",
    ],
  },
  steps: [
    { title: "Idea", text: "", icon: `${APP_ICON}/idea-01.svg` },
    { title: "Flow", text: "", icon: `${APP_ICON}/flow.svg` },
    { title: "Design", text: "", icon: `${APP_ICON}/pen-tool-minus.svg` },
    { title: "Develop", text: "", icon: `${APP_ICON}/ai-programming.svg` },
    { title: "Test", text: "", icon: `${APP_ICON}/input-long-text.svg` },
    { title: "Launch", text: "", icon: `${APP_ICON}/rocket-01.svg` },
  ],
  perf: [
    "Clear interactions without unnecessary complexity.",
    "Designed for different screen sizes and devices.",
    "APIs and backend system integrated where needed.",
  ],
  desktop: {
    process: {
      label: "From idea to app",
      heading: "A clear process, Better results.",
      text: "We follow a simple, proven process to make sure every app is built with purpose, performance and attention to detail.",
    },
    perf: {
      label: "built for real users",
      heading: "Performance in every detail.",
    },
    flowIcons: true,
  },
  mobile: {
    // the mobile frame has no full stop after the first bullet
    perfItems: [
      "Clear interactions without unnecessary complexity",
      "Designed for different screen sizes and devices.",
      "APIs and backend system integrated where needed.",
    ],
    process: {
      label: "From idea to app",
      heading: "A clear process, Better results.",
      text: "We follow a simple, proven process to make sure every app is built with purpose, performance and attention to detail.",
      showText: false,
      flowTop: 24,
      line: { left: 30, width: 296 },
    },
    perf: {
      label: "built for real users",
      heading: "Performance in every detail.",
    },
  },
};

/* ---------- S-06 CMS development ---------- */
const CMS_IMG = "/assets/images/cms-service";
const CMS_ICON = "/assets/icons/cms-service";
export const CMS_SERVICE: ServicePageData = {
  slug: "cms-development",
  metaTitle: "CMS Development – Sozoq",
  metaDescription:
    "We build content management systems that make it easy to update pages, manage content and keep your website running without needing a developer every time.",
  eyebrow: { code: "s6", name: "Cms development" },
  title: ["Your website. Your content. ", "Your control."],
  lead: "We build content management systems that make it easy to update pages, manage content and keep your website running without needing a developer every time.",
  hero: {
    // Figma "image 177" / "image 178" – 183px square on desktop, 146px on mobile, centred in the grey tile
    desktop: { src: `${CMS_IMG}/hero.webp`, w: 183, h: 183, dx: 0.5, dy: 0 },
    mobile: { src: `${CMS_IMG}/hero.webp`, w: 146, h: 146, dx: 0, dy: 0 },
  },
  build: {
    label: "WHAT WE BUILD",
    heading: "Complete CMS solutions for your business.",
    text: "From simple content websites to custom management systems, we build solutions that make managing your digital content easier.",
    items: [
      "Custom CMS Development",
      "WordPress Development",
      "Headless CMS",
      "Content Management Dashboards",
      "CMS Integration",
      "Website Maintenance",
    ],
  },
  steps: [
    {
      title: "Create",
      // the Figma frame holds a second, empty line under steps 1 and 4 (zero-width space)
      text: "Add your content.\n\u200b",
      icon: `${CMS_ICON}/computer-add.svg`,
    },
    {
      title: "Edit",
      text: "Make changes whenever needed.",
      icon: `${CMS_ICON}/edit-04.svg`,
    },
    {
      title: "Review",
      text: "Check everything before publishing.",
      icon: `${CMS_ICON}/file-view.svg`,
    },
    {
      title: "Publish",
      text: "Push your updates live.\n\u200b",
      icon: `${CMS_ICON}/sent-02.svg`,
    },
  ],
  perf: [
    "Simple content editors to update your website without coding.",
    "Easy-to-manage pages, images, blogs and other content.",
    "Custom dashboards with the tools your team needs.",
  ],
  desktop: {
    process: {
      label: "THE CMS WORKFLOW",
      heading: "Write it. Edit it. Publish it.",
      text: "A simple workflow that gives you control over every part of your website.",
    },
    perf: {
      label: "BUILT TO BE MANAGED",
      heading: "Websites that are easy to update and manage.",
    },
    leadW: 346,
    listW: 525,
  },
  mobile: {
    process: {
      label: "THE CMS WORKFLOW",
      heading: "Write it. Edit it. Publish it.",
      showText: false,
      flowTop: 24,
      line: { left: 25, width: 302 },
    },
    perf: {
      label: "BUILT TO BE MANAGED",
      heading: "Websites that are easy to update and manage.",
    },
  },
};
