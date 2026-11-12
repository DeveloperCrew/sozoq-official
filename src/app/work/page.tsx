import type { Metadata } from "next";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import { ProjectList } from "@/components/routing/work/WorkSection";
import { INNER_NAV_LINKS, WORK_PAGE } from "@/data/content";

/* /work – Figma 3979:6342 (1440px). Static route: it wins over /work/[slug]. */
export const metadata: Metadata = {
  title: WORK_PAGE.metaTitle,
  description: WORK_PAGE.metaDescription,
};

export default function WorkPage() {
  return (
    <main className="page page--case page--work" data-name="Work">
      <Header
        navLinks={INNER_NAV_LINKS}
        homeHref="/"
        currentHref="/work"
        variant="back"
      />

      <section className="work work--page work--new" id="work">
        <ProjectList />
      </section>

      <Footer />
    </main>
  );
}
