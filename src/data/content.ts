import type {
  CaseStudyData,
  ContactPageData,
  FaqItem,
  FooterLink,
  NavLink,
  Person,
  Project,
  ServicesPageData,
} from "@/types";

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "#home", active: true },
  { label: "Service", href: "/#service", section: "#service" },
  { label: "Work", href: "/work", section: "#work" },
  { label: "Contact", href: "/contact", section: "#contact" },
];
const SVC_ICON_DIR = "/assets/icons/services";
export const SERVICE_ICONS = {
  app: `${SVC_ICON_DIR}/app-development.svg`,
  website: `${SVC_ICON_DIR}/website-development.svg`,
  branding: `${SVC_ICON_DIR}/branding.svg`,
  uiux: `${SVC_ICON_DIR}/ui-ux-design.svg`,
  seo: `${SVC_ICON_DIR}/seo-marketing.svg`,
  cms: `${SVC_ICON_DIR}/cms-development.svg`,
};
export const SERVICE_MENU_ITEMS = [
  {
    label: "App Development",
    href: "/services/app-development",
    icon: SERVICE_ICONS.app,
  },
  {
    label: "Website Development",
    href: "/services/website-development",
    icon: SERVICE_ICONS.website,
  },
  {
    label: "Branding",
    href: "/services/branding",
    icon: SERVICE_ICONS.branding,
  },
  {
    label: "UI/UX Design",
    href: "/services/ui-ux-design",
    icon: SERVICE_ICONS.uiux,
  },
  {
    label: "SEO & Marketing",
    href: "/services/seo-marketing",
    icon: SERVICE_ICONS.seo,
  },
  {
    label: "CMS Development",
    href: "/services/cms-development",
    icon: SERVICE_ICONS.cms,
  },
];
export const ICONS = {
  wordmark: "/assets/icons/wordmark.svg",
  bullet: "/assets/icons/bullet.svg",
  arrowRightSm: "/assets/icons/arrow-right-sm.svg",
  arrowLeft: "/assets/icons/arrow-left.svg",
  arrowLeft18: "/assets/icons/arrow-left-18.svg", // case-study breadcrumb
  arrowRight: "/assets/icons/arrow-right.svg",
  external16: "/assets/icons/external-16.svg",
  external11: "/assets/icons/external-11.svg",
  whatsapp: "/assets/icons/whatsapp.svg",
};

/* Raster images (public/assets/images) */
const IMG = "/assets/images";
export const IMAGES = {
  appA: `${IMG}/service-app-1.png`,
  appB: `${IMG}/service-app-2.png`,
  appC: `${IMG}/service-app-3.png`,
  webA: `${IMG}/service-web-1.png`,
  webB: `${IMG}/service-web-2.png`,
  webC: `${IMG}/service-web-3.png`,

  // Graphic Design (card 3)
  graphicA: `${IMG}/service-graphic-1.webp`, // keyboard
  graphicB: `${IMG}/service-graphic-2.webp`, // figma
  graphicC: `${IMG}/service-graphic-3.webp`, // heart

  // SEO & Marketing (card 4)
  seoA: `${IMG}/service-seo-1.webp`, // person
  seoB: `${IMG}/service-seo-2.webp`, // magnifier
  seoC: `${IMG}/service-seo-3.webp`, // SEO rocket

  // Work cards – Workley app
  workleyMain: `${IMG}/app_main.webp`,
  workleyCap: `${IMG}/app_gear.webp`,
  workleyButton: `${IMG}/app_nut.webp`,

  // Work cards – Fitside website (bag top-right, heart bottom-left)
  sozokyuMain: `${IMG}/web_main.webp`,
  sozokyuCap: `${IMG}/web_bag.webp`,
  sozokyuButton: `${IMG}/web_heart.webp`,

  // Work cards – Fitside dashboard (docs top-right, megaphone bottom-left)
  dashMain: `${IMG}/dashboard_main.webp`,
  dashCap: `${IMG}/dashboard_docs.webp`,
  dashButton: `${IMG}/dashboard_mic.webp`,

  // Work cards – Mealbox
  mealMain: `${IMG}/mealbox_main.webp`,
  mealCap: `${IMG}/mealbox_noodle.webp`,
  mealButton: `${IMG}/mealbox_cake.webp`,

  aboutShiva: `${IMG}/about-shiva.webp`,
  aboutManjunath: `${IMG}/about-manjunath.png`,
  footerTexture: `${IMG}/footer-texture.png`,
};

/* ---------- Services page thumbnails (mobile), same order as SERVICES_PAGE.items ---------- */
export const SERVICE_IMAGES: string[][] = [
  [IMAGES.appA, IMAGES.appB, IMAGES.appC],
  [IMAGES.webC, IMAGES.webA, IMAGES.webB],
  [IMAGES.graphicA, IMAGES.graphicB, IMAGES.graphicC],
  [IMAGES.seoA, IMAGES.seoB, IMAGES.seoC],
];

/* ---------- Work ---------- */
export const PROJECTS: Project[] = [
  {
    title: "Workley - App",
    desc: "A digital platform built to celebrate everyday heroes, connecting people with meaningful opportunities through an engaging and accessible experience.",
    cta: "Explore Workley",
    href: "/work/workley",
    icon: "/assets/icons/project-workley.webp",
    images: {
      main: IMAGES.workleyMain,
      cap: IMAGES.workleyCap,
      button: IMAGES.workleyButton,
    },
  },
  {
    title: "Fitside - E Com Website",
    desc: "A modern fashion storefront designed to showcase the brand, highlight its collections, and deliver a seamless online shopping experience.",
    cta: "Explore Fitside",
    href: "/work/sozokyu",
    icon: "/assets/icons/project-fitside.webp",
    images: {
      main: IMAGES.sozokyuMain,
      cap: IMAGES.sozokyuCap,
      button: IMAGES.sozokyuButton,
    },
  },
  {
    title: "Fitside - Dashboard",
    desc: "A centralised dashboard designed to simplify e-commerce management, organise store operations, and make everyday tasks easier to handle.",
    cta: "Explore Fitside",
    href: "/work/sozokyu-dashboard",
    icon: "/assets/icons/project-fitside.webp",
    images: {
      main: IMAGES.dashMain,
      cap: IMAGES.dashCap,
      button: IMAGES.dashButton,
    },
  },
  {
    title: "MealBox - Recipe App",
    desc: "A food discovery platform connecting recipe exploration with grocery shopping, helping users find recipes and shop for the ingredients they need.",
    cta: "Explore MealBox",
    href: "/work/mealbox",
    icon: "/assets/icons/project-mealbox.webp",
    images: {
      main: IMAGES.mealMain,
      cap: IMAGES.mealCap,
      button: IMAGES.mealButton,
    },
  },
];

/* ---------- About ---------- */
export const PEOPLE: Person[] = [
  { name: "Manjunath MS", role: "Founder & CPO", photo: IMAGES.aboutManjunath },
  {
    name: "Shiva Shankar",
    role: "Founder & COO",
    photo: IMAGES.aboutShiva,
    focus: "50% 42%", // which part of the tall photo is kept
    zoom: 2, // zoom level (1 = none, 2 = double)
    zoomOrigin: "48% 42%", // the point it zooms into (the face)
  },
];

export const ABOUT_PARAGRAPHS: string[] = [
  "Well, it all started with two founders, a suspicious number of ideas, and the dangerous belief that “we could probably build that ourselves.”",
  "One random idea turned into ten. Ten turned into a hundred. Sleep schedules? Questionable. Brainstorming sessions? Unnecessarily long. The urge to build cool stuff? Absolutely uncontrollable.",
  "And somewhere between designing pixels, writing code, breaking things (and occasionally fixing them), SOZOQ happened.",
  "We’re a creative tech agency that mixes design, technology, and a healthy amount of chaos to build brands, websites, apps, and digital experiences that actually make people feel something.",
];

/* ---------- FAQ ---------- */
export const FAQS: FaqItem[] = [
  {
    q: "What services does SOZOQ offer?",
    a: "Sozoq provides UI/UX design, website development, mobile app development, Saas and branding services. We help businesses build strong digital products from concept to launch.",
  },
  {
    q: "Do you provide development services too?",
    a: "Yes, we do. We handle both design and development, ensuring your website or app is visually appealing, user-friendly, and fully functional.",
  },
  {
    q: "Do you work with startups or only established businesses?",
    a: "We work with startups, small businesses, and growing companies. Whether you're starting from scratch or improving an existing product, we can help.",
  },
  {
    q: "How long does it take to complete a project?",
    a: "Project timelines depend on the scope and complexity. A simple website may take a few weeks, while larger projects like mobile apps may take longer. We provide a clear timeline before starting.",
  },
  {
    q: "Do you offer custom design solutions?",
    a: "Yes. Every project is custom-made based on your business needs, target audience, and goals. We do not use generic templates unless requested.",
  },
  {
    q: "Will I get support after project completion?",
    a: "Yes, we provide post-launch support and maintenance based on the agreed service plan.",
  },
  {
    q: "How do we get started?",
    a: "You can contact us through our website or email or whatsapp us with your requirements. We’ll discuss your needs and provide a proposal tailored to your project.",
  },
];

/* ---------- Footer ---------- */
export const FOOTER_LINKS: FooterLink[] = [
  { label: "Privacy & Policy", href: "/privacy", external: false },
  { label: "Terms & Conditions", href: "/terms", external: false },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sozoq.tech?rpxt=cXI5eGYwOHIydDZ2",
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/sozoqtech/",
    external: true,
  },
];

/* ---------- Case study pages (/work/[slug]) ---------- */
/* nav used on inner pages: section links point back to the home page */
export const CASE_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/", active: true },
  { label: "Service", href: "/#service" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

export const CASE_STUDIES: Record<string, CaseStudyData> = {
  sozokyu: {
    brand: "Sozokyu",
    metaTitle: "Sozokyu – E-Commerce Website | Sozoq",
    metaDescription:
      "A fresh fit. A fresh digital experience. How Sozoq built a modern e-commerce storefront for the clothing brand Sozokyu.",
    title: "A fresh fit. A fresh digital experience.",
    // strings render as-is, { caps } renders upper-cased (as in the Figma)
    intro: [
      "We teamed up with ",
      { caps: "Sozokyu" },
      " to bring its fashion identity to the web. The mission? Build a modern e-commerce storefront that looks sharp, feels intuitive, and gives the brand room to grow.",
    ],
    meta: [
      { term: "Service", value: "E-Commerce Website" },
      { term: "Industry", value: "Clothing Brand" },
      { term: "Duration", value: "6 Weeks" },
    ],
    hero: {
      src: `${IMG}/mock_up.webp`,
      alt: "Sozokyu public homepage, captured 12 September 2026",
    },
    summary: [
      {
        term: "The brief",
        text: "Create a digital storefront that puts the products in the spotlight without making shopping feel like a treasure hunt.",
      },
      {
        term: "Our part",
        text: "Brand experience, UI/UX design, visual direction, and website development.",
      },
      {
        term: "The scope",
        text: "Interface design, responsive layouts, product presentation, and front-end and back-end implementation.",
      },
      {
        term: "The live experience",
        live: {
          pre: "Explore ",
          caps: "Sozokyu",
          mid: " at ",
          label: "sozokyu.vercel.app",
          href: "https://sozokyu.vercel.app",
          post: ".",
        },
      },
    ],
    // `layout`: single (880 × 607) · tall (880 × 729) · grid (2 × 2 with captions) · none
    sections: [
      {
        id: "starting-point",
        label: "The starting point",
        title: "A brand needs more than a pretty URL.",
        body: [
          "A great brand deserves a website that lives up to it.",
          "Sozokyu needed a digital storefront that could bring its identity online while making the shopping experience straightforward. We approached the project with one goal: create a website where the design catches your eye and the experience keeps things moving.",
        ],
        layout: "none",
        first: true,
      },
      {
        id: "product-approach",
        label: "The product approach",
        title: "Good design. Zero unnecessary drama.",
        body: [
          "Before getting into the code, we focused on how the website should look, feel, and function.",
          "The priority was to establish a clear visual hierarchy, organise the content, and create an interface that guides visitors naturally from the first impression to product discovery.",
          "No clutter for the sake of looking fancy. Every section needs a reason to exist.",
        ],
        layout: "single",
        lead: true, // 48px top padding in the Figma
        figures: [
          {
            src: `${IMG}/layout.webp`,
            alt: "Sozokyu product card, delivery address form and cart item",
          },
        ],
      },
      {
        id: "art-direction",
        label: "Art direction",
        title: "Let the fits do the talking.",
        body: [
          "Every visual choice has a job. The typography sets the tone, the layout creates breathing room, and the product imagery gets its moment in the spotlight.",
          "The goal? A storefront that feels like a fashion brand, not another cookie-cutter online shop.",
        ],
        layout: "grid",
        figures: [
          {
            src: `${IMG}/model-1.webp`,
            alt: "Model in a cream varsity-style hoodie and olive cargo pants",
            caption:
              "Cream varsity hoodie with olive cargo pants: a relaxed, everyday look.",
          },
          {
            src: `${IMG}/model-2.webp`,
            alt: "Model in a navy-striped half-zip sweater and wide-leg jeans",
            caption:
              "Navy-striped half-zip with wide-leg denim: classic stripes, modern fit.",
          },
          {
            src: `${IMG}/model-3.webp`,
            alt: "Model in a black hoodie, white cargo pants and sunglasses",
            caption:
              "Black hoodie with white cargo pants: a clean, high-contrast streetwear look.",
          },
          {
            src: `${IMG}/model-4.webp`,
            alt: "Model in a cream jacket with a printed landscape motif",
            caption:
              "Printed landscape jacket over a knit: the statement piece of the set.",
          },
        ],
      },
      {
        id: "design-development",
        label: "Design & development",
        title: "From Figma vibes to browser reality.",
        body: [
          "A design looks great in a mockup. Making it work on a real screen? That's where things get interesting.",
          "We translated the visual direction into a working web interface, bringing layouts, typography, spacing, and interactive elements together in the browser.",
          "The focus was on keeping the implemented experience consistent with the design while making the interface practical to use and easier to maintain.",
        ],
        layout: "toggle",
        // "Wireframe" ⇄ "Full colour" switch (same as Figma). Files: case-sozokyu-wireframe.png / case-sozokyu-colour.png
        toggle: {
          colour: {
            src: `${IMG}/case-sozokyu-colour.webp`,
            alt: "Sozokyu product page in full colour",
          },
          wireframe: {
            src: `${IMG}/case-sozokyu-wireframe.webp`,
            alt: "Sozokyu product page as a grey wireframe",
          },
          defaultColour: false,
        },
      },
      {
        id: "the-build",
        label: "The Build",
        title: "One website. Multiple screen sizes.",
        body: [
          "Your customers aren't all shopping from the same device, so the experience shouldn't depend on one.",
          "We considered responsive layouts and adaptable content presentation to help the website work across different screen sizes.",
          "From layout proportions to readable content and accessible controls, the details matter. Because a website that looks good only on your laptop is only doing half the job.",
        ],
        layout: "tall",
        tail: true, // grid row is 48px taller than the image in the Figma
        figures: [
          {
            src: `${IMG}/collections_image.webp`,
            alt: "Sozokyu site on screen – making the next action obvious",
          },
        ],
      },
      {
        id: "under-the-hood",
        label: "Under the hood",
        title: "Pretty on the outside. Thought through on the inside.",
        body: [
          "A polished website needs more than good visuals. Its interface should also have a sensible structure.",
          "The development approach focuses on consistent layout patterns, reusable interface elements, and predictable behaviour. These foundations help keep the website organised as the experience evolves.",
          "The aim is simple: make the code support the design, not fight it.",
        ],
        layout: "none",
      },
      {
        id: "final-build",
        label: "The final build",
        title: "From design files to the real deal.",
        body: [
          "The result is a live storefront that gives Sozokyu a dedicated digital presence and brings its brand experience into the browser.",
          "It's where visual design meets practical implementation—and where the idea finally becomes something people can explore.",
          "Less mockup. More make it real.",
        ],
        layout: "none",
      },
      {
        id: "whats-next",
        label: "What's next?",
        // no heading in the Figma – the label itself is the title
        body: [
          "The web is never really done, and that's a good thing.",
          "Performance checks, usability testing, responsive refinements, and feedback from real shoppers can help identify what to improve next.",
          "The goal is to keep making the experience smoother as the brand grows.",
        ],
        layout: "none",
        lead: true,
        last: true,
      },
    ],
  },
  mealbox: {
    brand: "Meal Box",
    metaTitle: "Mealbox – Recipe App | Sozoq",
    metaDescription:
      "Got ingredients? We've got ideas. How Sozoq designed MealBox, a recipe discovery and grocery shopping experience in one app.",
    title: "Got ingredients? We've got ideas.",
    intro: [
      "MealBox brings recipe discovery, meal planning, and grocery shopping together in one experience. Find something delicious to cook, check what ingredients you're missing, and shop for everything you need without jumping between apps.",
    ],
    meta: [
      { term: "Service", value: "UI/UX Design" },
      { term: "Industry", value: "Food and Quick Commerce" },
      { term: "Duration", value: "4 Weeks" },
    ],
    hero: {
      src: `${IMG}/mealbox-hero.webp`,
      alt: "MealBox recipe app screens on two phones",
    },
    summary: [
      {
        term: "The Challenge",
        text: "Deciding what to cook is hard enough. Finding a recipe, checking ingredients, and shopping for missing groceries shouldn't feel like three different missions.",
      },
      {
        term: "Our part",
        text: "Product Strategy · UI/UX Design · Interface Design",
      },
      {
        term: "The scope",
        text: "Recipe discovery, ingredient-based search, smart filters, nutritional information, grocery shopping, and ingredient selection.",
      },
    ],
    sections: [
      {
        id: "starting-point",
        label: "The starting point",
        title: "Recipe found. Three ingredients missing. Now what?",
        body: [
          "Finding a recipe is only half the battle. You still need to check your kitchen, figure out what's missing, and head to the grocery store.",
          "MealBox connects these steps, helping users go from recipe inspiration to ingredient shopping in a more convenient way.",
        ],
        layout: "none",
        first: true,
      },
      {
        id: "product-decision",
        label: "The product decision",
        title: "One craving. One recipe. One shopping list.",
        body: [
          "We explored a connected experience where users can discover recipes based on ingredients they already have or search for something specific.",
          "Once they've found their dish, they can identify missing ingredients and move towards grocery shopping without starting the process all over again.",
          "The idea is simple: connect what people want to cook with what they need to buy.",
        ],
        layout: "single",
        lead: true,
        figures: [
          {
            src: `${IMG}/mealbox-decision.webp`,
            alt: "MealBox product card, delivery form and cart item",
          },
        ],
      },
      {
        id: "design-direction",
        label: "The design direction",
        title: "Fresh ideas. Fresh ingredients. Zero clutter.",
        body: [
          "MealBox needed an interface that could bring two different experiences together: exploring food and shopping for groceries.",
          "We focused on clear navigation, organised content, and an intuitive visual hierarchy to make both experiences feel like parts of the same product.",
        ],
        layout: "none",
      },
      {
        id: "concept-to-interface",
        label: "From concept to interface",
        title: "Two experiences. One hungry user.",
        body: [],
        list: {
          intro:
            "The product brings recipe discovery and grocery shopping into a connected journey.",
          items: [
            {
              term: "Discover",
              text: "Explore recipes using ingredients, preferences, and filters.",
            },
            {
              term: "Plan",
              text: "Review recipe details and identify the ingredients needed.",
            },
            {
              term: "Shop",
              text: "Browse the required groceries and select the items to purchase.",
            },
            {
              term: "Prepare",
              text: "Get everything ready for the cooking adventure.",
            },
          ],
          outro:
            "Each step helps users move closer to their goal without unnecessary friction.",
        },
        layout: "grid",
        figures: [
          {
            src: `${IMG}/mealbox-art-1.webp`,
            alt: "MealBox Discover screen",
            caption: "Discover",
          },
          {
            src: `${IMG}/mealbox-art-2.webp`,
            alt: "MealBox Plan screen",
            caption: "Plan",
          },
          {
            src: `${IMG}/mealbox-art-3.webp`,
            alt: "MealBox Shop screen",
            caption: "Shop",
          },
          {
            src: `${IMG}/mealbox-art-4.webp`,
            alt: "MealBox Prepare screen",
            caption: "Prepare",
          },
        ],
      },
      {
        id: "experience",
        label: "The experience",
        title: "Find the recipe. Grab the groceries. Get cooking.",
        body: [
          "MealBox is designed to make the journey from inspiration to preparation feel effortless.",
          "Users can discover recipes, explore nutritional information, identify missing ingredients, and shop for groceries within the broader experience.",
          "No more finding the perfect recipe only to realise you're missing half the ingredients.",
        ],
        layout: "none",
      },
      {
        id: "design-development",
        label: "Design & development",
        title: "Good food starts with a good flow.",
        body: [
          "Bringing recipes and grocery shopping together requires more than putting two features on the same screen.",
          "We approached the experience around a connected user journey, with clear information architecture and consistent interface patterns to make moving between discovery and shopping feel natural.",
        ],
        layout: "single",
        figures: [
          {
            src: `${IMG}/mealbox-flow.webp`,
            alt: "MealBox on desktop and mobile",
          },
        ],
      },
      {
        id: "final-build",
        label: "The final build",
        title: "Your kitchen's new favourite sidekick.",
        body: [
          "MealBox combines recipe discovery and grocery shopping into one food-focused experience, helping users find inspiration, plan what they need, and shop for missing ingredients.",
        ],
        layout: "none",
      },
      {
        id: "whats-next",
        label: "What's next?",
        title: "From grocery lists to smarter meal planning.",
        body: [
          "The experience could evolve with personalised recommendations, saved grocery lists, smarter meal planning, and more tailored shopping suggestions.",
          "The bigger vision? Make deciding what to cook—and getting everything ready to cook it—feel like one seamless experience.",
        ],
        layout: "none",
        last: true,
      },
    ],
  },
  /* ---- Sozokyu – E Com Dashboard (Figma node 3895:4497, "Sozokyu Dashboard") ---- */
  "sozokyu-dashboard": {
    brand: "Sozokyu Dashboard",
    metaTitle: "Sozokyu – E-Commerce Dashboard | Sozoq",
    metaDescription:
      "Behind every great storefront is a little organised chaos. How Sozoq designed and built the admin dashboard for the clothing brand Sozokyu.",
    title: "Behind every great storefront is a little organised chaos.",
    intro: [
      "The storefront is where customers shop. The admin dashboard is where the magic gets managed. We approached Sozokyu's admin experience with a focus on simplifying store operations through a structured, easy-to-navigate interface.",
    ],
    meta: [
      { term: "Service", value: "E-Commerce Website" },
      { term: "Industry", value: "Clothing Brand" },
      { term: " Duration", value: "8 Weeks" },
    ],
    // laptop scene + masked screen (same mock-up as the Workley page)
    hero: {
      src: `${IMG}/dashboard-hero.webp`,
      alt: "Sozokyu dashboard on a Mac Studio",
    },
    summary: [
      {
        term: "The Challenge",
        text: "Managing an online store shouldn't feel like juggling a hundred tabs. The goal was to bring essential store management tasks into one organised workspace.",
      },
      {
        term: "Our part",
        // double spaces around "&" are in the Figma text (rendered with pre-wrap)
        text: "UI/UX Design · Dashboard Design  &  Development",
      },
      {
        term: "The scope",
        text: "Dashboard interface, data presentation, store management workflows, and admin experience.",
      },
    ],
    sections: [
      {
        id: "starting-point",
        label: "The starting point",
        title: "Selling is the fun part. Managing everything? Not always.",
        body: [
          "Behind every product listing and customer order is a whole lot of information to keep track of.",
          "The challenge was to create an admin experience that makes store operations easier to navigate, helping administrators access important information without getting lost in the details.",
        ],
        layout: "none",
        first: true,
      },
      {
        id: "approach",
        label: "The approach",
        title: "Less hunting. More handling.",
        body: [
          "We focused on organising the dashboard around clear information hierarchy, intuitive navigation, and easily scannable data.",
          "The idea was simple: put the right information in the right place, reduce unnecessary complexity, and make everyday management tasks easier to access.",
        ],
        layout: "single",
        lead: true,
        figures: [
          {
            src: `${IMG}/dashboard-approach.webp`,
            alt: "Sozokyu dashboard overview",
          },
        ],
      },
      {
        id: "interface",
        label: "The interface",
        title: "All the important stuff. One home.",
        body: [
          "A dashboard should answer questions before administrators have to go looking for them.",
          "We approached the interface with a structured layout that gives key information its own space and keeps navigation consistent across the experience.",
          "The result is an interface designed to make store management feel more organised and less overwhelming.",
        ],
        layout: "single",
        figures: [
          {
            src: `${IMG}/dashboard-interface.webp`,
            alt: "Sozokyu dashboard interface",
          },
        ],
      },
      {
        id: "experience",
        label: "The experience",
        title: "Products, orders, and everything in between.",
        body: [
          "E-commerce management involves multiple moving parts. The interface needs to make switching between tasks feel natural rather than turning every action into a mini adventure.",
          "The design focuses on clear navigation, consistent layouts, and readable information so administrators can move through their workflows with less friction.",
        ],
        layout: "single",
        figures: [
          {
            src: `${IMG}/dashboard-experience.webp`,
            alt: "Sozokyu dashboard products and orders screen",
          },
        ],
      },
      {
        id: "under-the-hood",
        label: "Under the hood",
        title: "Organised on screen. Thoughtful behind the scenes.",
        body: [
          "A good admin dashboard is more than a collection of cards and charts. Its structure needs to support the way information is organised and how administrators interact with it.",
          "We focused on a consistent interface system, reusable design patterns, and a layout that can accommodate different types of operational information.",
          "The goal? A dashboard that feels cohesive today and is easier to extend tomorrow.",
        ],
        layout: "none",
      },
      {
        id: "final-build",
        label: "The final build",
        title: "From storefront to control room.",
        body: [
          "The admin dashboard brings the operational side of Sozokyu into a dedicated workspace, giving the store a foundation for managing its e-commerce activities.",
          "It's not the flashy side of fashion—but it's the side that helps keep everything moving.",
        ],
        layout: "none",
      },
      {
        id: "whats-next",
        label: "What's next?",
        title: "Better systems. Smoother operations.",
        body: [
          "As the store evolves, the dashboard can evolve with it. Further improvements could include more detailed reporting, smarter inventory insights, and streamlined administrative workflows.",
          "Because the best dashboard isn't the one with the most charts. It's the one that makes the work easier.",
        ],
        layout: "none",
      },
    ],
  },
};

/* nav used on every inner page (services, work, contact, terms, privacy) */
export const INNER_NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Service", href: "/#service" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
];

/* ---------- Services page (/services) ----------
   Figma desktop 3976:5976 (1440px) · mobile 3978:6184 (390px) */
export const WHATSAPP_URL = "https://wa.me/919480182217";

/* footer "Whatsapp" button – opens the chat with this message preloaded */
const WHATSAPP_FOOTER_MESSAGE =
  "Hi SOZOQ!\nI'm interested in working with you. I'd like to discuss my project and explore how your team can help. Could we connect?";
export const WHATSAPP_FOOTER_URL = `${WHATSAPP_URL}?text=${encodeURIComponent(
  WHATSAPP_FOOTER_MESSAGE,
)}`;

export const SERVICES_PAGE: ServicesPageData = {
  title: "Digital services built around your business.",
  lead: "From product design and development to branding and digital marketing, we help businesses build their digital presence with the right strategy, technology, and creative execution.",
  items: [
    {
      id: "app-development",
      label: "App development",
      heading: "From product requirements to a working application.",
      paragraphs: [
        "We design and develop mobile and web applications around your business requirements, user workflows, and operational needs. From defining the product structure to building the interface and implementing its functionality, we focus on delivering applications that solve specific problems and support real use cases.",
        "Our app development services cover product planning, UI/UX design, frontend and backend development, API integrations, database architecture, and deployment. We work with you to define the required features, technical scope, and delivery milestones before development begins.",
        "Whether you\u2019re building a new digital product, developing an internal business tool, or improving an existing application, we handle the design and development process with a clear scope, defined deliverables, and a focus on maintainability.",
      ],
    },
    {
      id: "website-development",
      label: "Website development",
      heading: "From design concepts to functional websites.",
      paragraphs: [
        "We build websites based on your business goals, whether you need a corporate website, a marketing landing page, an e-commerce platform, or a custom web solution. Each website is developed with responsive layouts, clear navigation, and functionality suited to its intended purpose.",
        "Our website development services cover frontend development, backend systems, CMS integration, e-commerce functionality, third-party integrations, and deployment. We define the technical requirements, content structure, and project scope before development begins.",
        "From initial development to launch, we focus on delivering websites that are reliable, easy to maintain, and ready to support your business as it grows.",
      ],
    },
    {
      id: "graphic-design",
      label: "Graphic design",
      heading: "Visual assets built for your brand and business.",
      paragraphs: [
        "We create visual assets that align with your brand identity, communication goals, and target audience. From individual campaign creatives to complete sets of marketing materials, we maintain consistency across layouts, typography, colors, and imagery.",
        "Our graphic design services cover marketing creatives, social media graphics, advertising materials, brochures, presentations, packaging, and other business communication assets. We define the design requirements, formats, and intended use before starting each project.",
        "Whether you need assets for a product launch, an advertising campaign, or ongoing marketing activities, we deliver production-ready designs in the formats required for digital and print use.",
      ],
    },
    {
      id: "seo-marketing",
      label: "SEO & Marketing",
      heading: "Improve search visibility and reach the right audience.",
      paragraphs: [
        "We work on improving your website\u2019s search visibility, attracting relevant traffic, and connecting your business with potential customers through organic search and paid digital channels. Each activity is planned around your business goals, target market, and available budget.",
        "Our SEO and digital marketing services cover search engine optimization, keyword research, on-page optimization, technical SEO, content planning, paid advertising, and campaign management. We define the target audience, campaign objectives, and performance metrics before implementing a strategy.",
        "From optimizing existing web pages to managing digital campaigns, we track key performance metrics and use the results to identify opportunities for improvement.",
      ],
    },
  ],
};

/* ---------- Contact page (/contact) ----------
   Figma: form 4007:1663 · after submit 4021:3965 · mobile 4011:3486 */
export const CONTACT_PAGE: ContactPageData = {
  title: "Something exciting on your mind?",
  lead: "Tell us where you want to go. We\u2019ll turn Zero Asset into Novel Artifact - and reply within 1\u20132 business days.",
  emails: ["hello@sozoq.in", "info@sozoq.in"],
  phone: "+91 9480182217",
  phoneHref: "tel:+919480182217",
  whatsappText: "Chat with us instantly",
  office: "Kuttipuzha, Kochi, Kerala, India",
  services: [
    "App development",
    "Website development",
    "Branding",
    "UI/UX Design",
    "SEO & Marketing",
    "CMS Development",
  ],
  thanks: "Thank You for your submission!",
  thanksButton: "Meawwwwww",
  thanksImage: "/assets/images/contact-thanks.webp",
};

/* ---------- /work page (Figma 3979:6342) ---------- */
export const WORK_PAGE = {
  metaTitle: "Work – Sozoq",
  metaDescription:
    "A selection of Sozoq's best projects: Workley, Fitside and MealBox – apps, e-commerce websites and dashboards.",
  title: "Work.",
  subtitle: "A selection of Best projects.",
};
