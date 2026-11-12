import type { Metadata } from "next";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ServiceDetail from "@/components/routing/services/ServiceDetail";
import { CASE_NAV_LINKS } from "@/data/content";
import { WEBSITE_SERVICE as DATA } from "@/data/servicePages";
import "@/styles/service-detail.css";

export const metadata: Metadata = {
  title: DATA.metaTitle,
  description: DATA.metaDescription,
};

/* /services/website-development – opened from its card on the home page */
export default function ServicePage() {
  return (
    <main
      className="page page--case page--sd"
      data-name={`Service – ${DATA.eyebrow.name}`}
    >
      <Header
        navLinks={CASE_NAV_LINKS}
        homeHref="/"
        currentHref="/#service"
        variant="back"
        backHref="/#service"
        backLabel="Back to Service"
      />
      <ServiceDetail data={DATA} />
      <Footer />
    </main>
  );
}
