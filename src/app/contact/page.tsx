import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import ContactPage from "@/components/routing/contact/ContactPage";
import { INNER_NAV_LINKS } from "@/data/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact – Sozoq",
  description:
    "Tell us where you want to go. Email, call or WhatsApp Sozoq – we reply within 1–2 business days.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <main
      className="page page--case page--services page--contact"
      data-name="Contact"
    >
      <Header
        navLinks={INNER_NAV_LINKS}
        homeHref="/"
        currentHref="/contact"
        variant="back"
      />
      <ContactPage />
      <Footer />
    </main>
  );
}
