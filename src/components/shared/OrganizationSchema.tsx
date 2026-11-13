export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SOZOQ",
    url: "https://www.sozoq.in",
    logo: "https://www.sozoq.in/logo.png",
    description:
      "We are a creative tech agency. Design, develop and grow with us.",
    email: "hello@sozoq.in",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Kochi",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
    sameAs: [
      "https://www.instagram.com/sozoq.tech",
      "https://www.linkedin.com/company/sozoqtech/",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
