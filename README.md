# Sozoq website

Next.js (App Router) + TypeScript.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
```

Contact form email: set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` (optionally `CONTACT_FROM_EMAIL`) in `.env.local`.

## Structure

```
src/
  app/                    routes only (page.tsx per route) + api/contact/route.ts
  components/
    shared/               used on several routes: Header, NavLinks, Footer, Decor (Dot/Ruler/SectionRule),
                          Clock, ScrollEffects (text reveal + process line), and the blocks both home
                          layouts share: HomeBlocks, FaqList, PhotoStack
    desktop/              DesktopHome   (>= 768px)
    mobile/               MobileHome, MobileScrollTop   (<= 767px)
    routing/              one folder per route
      services/ work/ case-study/ workley/ contact/ legal/
  data/                   content.ts (site + inner pages), home.ts (shared home content),
                          desktopHome.ts, mobileHome.ts, workley.ts, legal.ts
  styles/                 globals.css, mobile-home.css, desktop-home.css
  types/                  shared TypeScript types
```

The home page renders both `MobileHome` and `DesktopHome`; CSS shows only the one that matches the screen width.
Plain `<img>` tags are used on purpose (images are pre-sized in `public/assets`).
