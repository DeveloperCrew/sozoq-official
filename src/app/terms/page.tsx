import type { Metadata } from "next";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import LegalPage from "@/components/routing/legal/LegalPage";
import { INNER_NAV_LINKS } from "@/data/content";
import { TERMS_PAGE } from "@/data/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions – Sozoq",
  description:
    "The terms that govern your use of the SOZOQ website and services.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return (
    <main
      className="page page--case page--services page--legal"
      data-name="Terms & Conditions"
    >
      <Header
        navLinks={INNER_NAV_LINKS}
        homeHref="/"
        currentHref="/terms"
        variant="back"
      />
      <LegalPage doc={TERMS_PAGE} />
      <Footer />
    </main>
  );
}
