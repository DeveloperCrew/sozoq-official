import type { Metadata } from "next";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import LegalPage from "@/components/routing/legal/LegalPage";
import { INNER_NAV_LINKS } from "@/data/content";
import { PRIVACY_PAGE } from "@/data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy – Sozoq",
  description:
    "How SOZOQ collects, uses, stores, shares and protects your information.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return (
    <main
      className="page page--case page--services page--legal"
      data-name="Privacy Policy"
    >
      <Header
        navLinks={INNER_NAV_LINKS}
        homeHref="/"
        currentHref="/privacy"
        variant="back"
      />
      <LegalPage doc={PRIVACY_PAGE} />
      <Footer />
    </main>
  );
}
