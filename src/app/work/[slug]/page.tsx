import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import CaseStudy from "@/components/routing/case-study/CaseStudy";
import { CASE_NAV_LINKS, CASE_STUDIES } from "@/data/content";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return Object.keys(CASE_STUDIES).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = CASE_STUDIES[slug];
  if (!data) return {};
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: `/work/${slug}` },
  };
}

export default async function CasePage({ params }: { params: Params }) {
  const { slug } = await params;
  const data = CASE_STUDIES[slug];
  if (!data) notFound();

  return (
    <main
      className="page page--case page--no-nav"
      data-name={`Case study – ${data.brand}`}
    >
      <Header
        navLinks={CASE_NAV_LINKS}
        homeHref="/#home"
        currentHref="/work"
        variant="case"
      />
      <CaseStudy data={data} />
      <Footer />
    </main>
  );
}
