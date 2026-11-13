import type { Metadata } from "next";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import WorkleyCase from "@/components/routing/workley/WorkleyCase";
import { CASE_NAV_LINKS } from "@/data/content";
import { WORKLEY } from "@/data/workley";
import "./workley.css";

/* /work/workley – a static route, so it wins over the dynamic /work/[slug] */
export const metadata: Metadata = {
  title: WORKLEY.metaTitle,
  description: WORKLEY.metaDescription,
  alternates: { canonical: "/work/workley" },
};

export default function WorkleyPage() {
  return (
    <main
      className="page page--case page--no-nav"
      data-name="Case study – Workley"
    >
      <Header
        navLinks={CASE_NAV_LINKS}
        homeHref="/#home"
        currentHref="/#work"
        variant="case"
      />
      <WorkleyCase />
      <Footer />
    </main>
  );
}
