import type { LegalBlock, LegalDoc, LegalListItem } from "@/types";

/* Legal pages content – /terms and /privacy.
   Text is used exactly as supplied; only the structure (sections, lists) is added.

   Block helpers:
     p(text)        paragraph
     h3(text)       sub-heading inside a section
     ul(...items)   bullet list (an item is a string, or { b, x } = bold lead-in + text)
     lines(...rows) stacked contact lines (URLs become links) */
const p = (x: string): LegalBlock => ({ t: "p", x });
const h3 = (x: string): LegalBlock => ({ t: "h3", x });
const ul = (...items: LegalListItem[]): LegalBlock => ({ t: "ul", items });
const lines = (...rows: string[]): LegalBlock => ({ t: "lines", rows });

export const TERMS_PAGE: LegalDoc = {
  title: "Terms & Conditions",
  updated: "Last Updated: 4 November 2026",
  intro: [
    "Welcome to SOZOQ. These Terms & Conditions govern your access to and use of the SOZOQ website, services and related digital platforms.",
    "By accessing our website or engaging our services, you agree to these Terms & Conditions. If you do not agree, please discontinue using our website and services.",
  ],
  sections: [
    {
      heading: "About SOZOQ",
      blocks: [
        p(
          "SOZOQ is a creative technology agency providing digital solutions to individuals, startups and businesses.",
        ),
        p("Our services include:"),
        ul(
          "UI/UX Design and Digital Product Design",
          "Branding and Visual Identity",
          "Website Design and Development",
          "Mobile Application Design and Development",
          "Graphic Design",
          "Search Engine Optimisation (SEO)",
          "Digital Marketing",
        ),
        p(
          "The availability and scope of each service will be determined by the specific proposal or agreement between SOZOQ and the client.",
        ),
      ],
    },
    {
      heading: "Use of Our Website",
      blocks: [
        p("When using our website, you agree to:"),
        ul(
          "Provide accurate and complete information when submitting enquiries or forms.",
          "Use the website only for lawful purposes.",
          "Not attempt to disrupt, damage or gain unauthorised access to our website or systems.",
          "Not copy, reproduce or distribute website content without prior written permission.",
          "Not use our website to distribute malicious software, spam or misleading information.",
        ),
        p(
          "SOZOQ reserves the right to restrict access to the website if these conditions are violated.",
        ),
      ],
    },
    {
      heading: "Services and Project Agreements",
      blocks: [
        p(
          "All services provided by SOZOQ are subject to individual project discussions, proposals and agreements.",
        ),
        p(
          "Before starting a project, the client may receive a proposal outlining:",
        ),
        ul(
          "Project scope and deliverables.",
          "Estimated timeline and milestones.",
          "Project cost and payment schedule.",
          "Number of revisions included.",
          "Additional requirements and associated costs.",
        ),
        p(
          "Any changes to the agreed project scope may result in additional charges or revised delivery timelines.",
        ),
        p(
          "A project is considered confirmed once the required proposal or agreement has been accepted and the agreed initial payment has been received.",
        ),
      ],
    },
    {
      heading: "Payments and Billing",
      blocks: [
        p(
          "All project payments must follow the payment schedule agreed upon in the project proposal.",
        ),
        ul(
          "An advance payment may be required before work begins.",
          "Payments must be made through the payment methods communicated by SOZOQ.",
          "Delayed payments may result in project suspension or revised delivery schedules.",
          "Any additional work outside the agreed scope may be billed separately.",
          "Applicable taxes, including GST where applicable, will be charged in accordance with Indian law.",
          "SOZOQ reserves the right to withhold final deliverables until all outstanding payments have been cleared.",
        ),
      ],
    },
    {
      heading: "Revisions and Changes",
      blocks: [
        p(
          "SOZOQ aims to deliver work that meets the agreed project requirements.",
        ),
        ul(
          "Each project includes the number of revisions specified in its proposal.",
          "Revision requests must remain within the originally agreed scope.",
          "Major changes to the original concept, requirements or functionality may be treated as additional work.",
          "Additional revisions or requests may involve additional charges.",
          "Client feedback and approvals should be provided within a reasonable timeframe to avoid delays.",
        ),
      ],
    },
    {
      heading: "Project Timelines and Delays",
      blocks: [
        p(
          "Project timelines are estimates based on the agreed scope and availability of required information.",
        ),
        p(
          "SOZOQ will make reasonable efforts to meet the agreed deadlines. However, delays may occur due to:",
        ),
        ul(
          "Late feedback or approvals from the client.",
          "Delayed content, assets or information.",
          "Changes in project requirements.",
          "Third-party service interruptions.",
          "Circumstances beyond our reasonable control.",
        ),
        p(
          "SOZOQ will communicate significant delays where reasonably possible. Any revised timeline will be discussed with the client.",
        ),
      ],
    },
    {
      heading: "Cancellation and Refund Policy",
      blocks: [
        p(
          "Clients may request project cancellation by communicating with SOZOQ in writing.",
        ),
        p("The following conditions apply:"),
        ul(
          "Payments for work already completed are non-refundable.",
          "Advance payments may be retained to cover work completed, resources allocated and expenses incurred.",
          "Any refundable amount, if applicable, will be determined based on the project's progress and the applicable agreement.",
          "If SOZOQ is unable to proceed with a project, the parties will discuss an appropriate settlement for the undelivered portion of the work.",
          "Approved expenses and third-party charges already incurred on behalf of the client may not be refundable.",
        ),
        p(
          "Any specific cancellation or refund terms agreed upon in a signed project agreement will also apply, subject to applicable law.",
        ),
      ],
    },
    {
      heading: "Intellectual Property Rights",
      blocks: [
        p("Unless otherwise agreed in writing:"),
        ul(
          "SOZOQ retains ownership of its pre-existing tools, frameworks, templates, processes and proprietary materials.",
          "Upon receipt of full payment, ownership of the final custom deliverables created specifically for the client will be transferred to the client, subject to third-party licensing restrictions.",
          "Third-party fonts, stock images, plugins, software and other licensed assets remain subject to their respective licence agreements.",
          "Unused concepts, rejected designs, drafts and internal working files remain the property of SOZOQ unless otherwise agreed.",
          "Clients must not use SOZOQ's branding, logo or proprietary materials without written permission.",
        ),
      ],
    },
    {
      heading: "Portfolio and Project Showcases",
      blocks: [
        p(
          "SOZOQ may showcase completed projects, designs and deliverables in its portfolio, website, presentations and marketing materials.",
        ),
        p(
          "Where a project involves confidential information or a non-disclosure agreement, SOZOQ will respect the agreed confidentiality obligations.",
        ),
        p(
          "Clients who require complete confidentiality must communicate this before the project begins and obtain written confirmation.",
        ),
      ],
    },
    {
      heading: "Client Responsibilities",
      blocks: [
        p("Clients are responsible for:"),
        ul(
          "Providing accurate project information and requirements.",
          "Ensuring they have the rights to use materials, images, content and assets supplied to SOZOQ.",
          "Reviewing and approving deliverables within agreed timelines.",
          "Maintaining ownership and access to their domain names, hosting accounts and third-party services unless otherwise agreed.",
          "Obtaining necessary permissions and licences for materials supplied to the project.",
          "Ensuring that their products, services and business activities comply with applicable laws.",
        ),
        p(
          "SOZOQ is not responsible for legal issues arising from materials or information supplied by the client.",
        ),
      ],
    },
    {
      heading: "Third-Party Services",
      blocks: [
        p(
          "Our projects may involve third-party platforms and services, including:",
        ),
        ul(
          "Hosting providers.",
          "Domain registrars.",
          "Payment gateways.",
          "Analytics platforms.",
          "Advertising platforms.",
          "APIs and external software integrations.",
          "Content management systems and plugins.",
        ),
        p(
          "These services are governed by their own terms, policies and licensing agreements.",
        ),
        p(
          "SOZOQ is not responsible for outages, pricing changes, service discontinuation, security incidents or other issues caused by third-party providers outside our reasonable control.",
        ),
      ],
    },
    {
      heading: "SEO and Digital Marketing Disclaimer",
      blocks: [
        p(
          "SEO and digital marketing results depend on several factors, including search engine algorithms, competition, market conditions, advertising platforms and audience behaviour.",
        ),
        p("SOZOQ does not guarantee:"),
        ul(
          "Specific search engine rankings.",
          "A fixed amount of website traffic.",
          "A particular number of leads or conversions.",
          "Guaranteed advertising performance or revenue.",
          "Specific business growth or commercial outcomes.",
        ),
        p(
          "We commit to providing the services and deliverables agreed upon in the project proposal.",
        ),
      ],
    },
    {
      heading: "Confidentiality",
      blocks: [
        p(
          "Both SOZOQ and its clients agree to handle confidential business information, project details, credentials and sensitive materials responsibly.",
        ),
        p(
          "Neither party should disclose confidential information to unauthorised third parties without prior consent, except where disclosure is required by law or necessary to perform the agreed services.",
        ),
        p(
          "These obligations may be further defined in a separate Non-Disclosure Agreement (NDA).",
        ),
      ],
    },
    {
      heading: "Limitation of Liability",
      blocks: [
        p(
          "To the extent permitted by applicable law, SOZOQ shall not be liable for indirect, incidental or consequential losses arising from the use of our website or services.",
        ),
        p(
          "This may include loss of profits, business opportunities, data or revenue.",
        ),
        p(
          "SOZOQ's aggregate liability arising from a particular project shall not exceed the total fees actually paid by the client for that project, except where such limitation is not permitted by applicable law.",
        ),
        p(
          "Nothing in these Terms excludes liability that cannot legally be excluded under applicable law.",
        ),
      ],
    },
    {
      heading: "Website Content and Accuracy",
      blocks: [
        p(
          "We make reasonable efforts to ensure that information on our website is accurate and up to date.",
        ),
        p(
          "However, descriptions, service information, pricing references, case studies and other content may change without prior notice.",
        ),
        p(
          "Website content is provided for general informational purposes and does not constitute a binding project offer unless expressly stated otherwise.",
        ),
      ],
    },
    {
      heading: "Privacy and Data Protection",
      blocks: [
        p("SOZOQ may collect personal information when visitors:"),
        ul(
          "Submit contact or enquiry forms.",
          "Communicate with our team.",
          "Request quotations or services.",
          "Interact with our website.",
        ),
        p(
          "Information will be handled in accordance with our Privacy Policy and applicable Indian data protection laws.",
        ),
        p(
          "We do not intentionally collect personal information beyond what is reasonably required for the relevant purpose.",
        ),
        p(
          "Please refer to our Privacy Policy for further information about data collection, processing, storage and user rights.",
        ),
      ],
    },
    {
      heading: "Suspension and Termination",
      blocks: [
        p(
          "SOZOQ reserves the right to suspend or discontinue website access or services where reasonably necessary, including in cases involving:",
        ),
        ul(
          "Breach of these Terms.",
          "Unlawful activities.",
          "Non-payment of agreed invoices.",
          "Misuse of our services or intellectual property.",
        ),
        p(
          "Where a client project is terminated, outstanding payments, completed work, intellectual property and refund matters will be handled according to the applicable project agreement and these Terms.",
        ),
      ],
    },
    {
      heading: "Changes to These Terms",
      blocks: [
        p(
          "SOZOQ may update these Terms & Conditions from time to time to reflect changes in our business operations, services, website functionality or applicable laws.",
        ),
        p(
          'Updated terms will be published on this page with a revised "Last Updated" date.',
        ),
        p(
          "Continued use of our website after publication of changes constitutes acceptance of the revised terms, to the extent permitted by applicable law.",
        ),
      ],
    },
    {
      heading: "Governing Law and Jurisdiction",
      blocks: [
        p("These Terms & Conditions shall be governed by the laws of India."),
        p(
          "Any disputes arising from the use of our website or services shall be subject to the jurisdiction of the competent courts at the location of SOZOQ's registered office, subject to applicable law.",
        ),
        p(
          "Both parties are encouraged to resolve disputes through mutual discussion before pursuing formal legal proceedings.",
        ),
      ],
    },
    {
      heading: "Contact Information",
      blocks: [
        p(
          "For questions, concerns or clarifications regarding these Terms & Conditions, please contact us.",
        ),
        lines(
          "SOZOQ – Creative Technology Agency",
          "Website: https://sozoq.in",
          "Email: hello@sozoq.in",
          "Registered Office: Kuttipuzha, Kochi, Kerala – 683578",
        ),
        p(
          "By using the SOZOQ website or engaging our services, you acknowledge that you have read and understood these Terms & Conditions.",
        ),
      ],
    },
  ],
};

export const PRIVACY_PAGE: LegalDoc = {
  title: "Privacy Policy",
  updated: "Last Updated: 4 November 2026",
  intro: [
    "At SOZOQ, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, share and protect information when you visit our website, communicate with us or use our services.",
    "By accessing our website, you acknowledge that you have read this Privacy Policy.",
  ],
  sections: [
    {
      heading: "About This Policy",
      blocks: [
        p("This Privacy Policy applies to:"),
        ul(
          "Visitors browsing the SOZOQ website.",
          "Individuals submitting contact or enquiry forms.",
          "Prospective clients requesting quotations or consultations.",
          "Existing clients engaging our services.",
          "Individuals communicating with SOZOQ through email or other communication channels.",
        ),
        lines(
          "Website: https://sozoq.in",
          "Business: SOZOQ – Creative Technology Agency",
        ),
      ],
    },
    {
      heading: "Information We Collect",
      blocks: [
        p(
          "We may collect the following categories of information depending on how you interact with our website and services.",
        ),
        h3("2.1 Personal Information"),
        p("When you contact us or submit an enquiry, we may collect:"),
        ul(
          "Full name.",
          "Email address.",
          "Phone number.",
          "Company or organisation name.",
          "Job title or designation.",
          "Project requirements and descriptions.",
          "Other information you voluntarily provide.",
        ),
        h3("2.2 Technical Information"),
        p(
          "When you visit our website, certain technical information may be collected automatically, including:",
        ),
        ul(
          "IP address.",
          "Browser type and version.",
          "Device type and operating system.",
          "Website pages visited.",
          "Date and time of visits.",
          "Referring website or source.",
          "General website interaction data.",
        ),
        h3("2.3 Project and Client Information"),
        p(
          "When you engage our services, we may collect additional information necessary to deliver the project, including:",
        ),
        ul(
          "Business information.",
          "Project documents and requirements.",
          "Brand assets, images and content.",
          "Account or platform access details when required.",
          "Communication and feedback history.",
          "Billing and transaction-related information.",
        ),
        p(
          "We only request information that is reasonably necessary for the relevant purpose.",
        ),
      ],
    },
    {
      heading: "How We Use Your Information",
      blocks: [
        p("SOZOQ may use collected information for the following purposes:"),
        ul(
          "Responding to enquiries and contact requests.",
          "Understanding your project requirements.",
          "Preparing quotations and project proposals.",
          "Providing design, development, branding and marketing services.",
          "Communicating project updates and progress.",
          "Managing client relationships and support requests.",
          "Processing invoices and payments.",
          "Improving website performance and user experience.",
          "Analysing website traffic and usage patterns.",
          "Sending business updates or marketing communications where permitted.",
          "Preventing fraud, misuse and unauthorised access.",
          "Complying with applicable legal obligations.",
        ),
        p(
          "We do not use your personal information for purposes unrelated to the reason it was collected without an appropriate legal basis.",
        ),
      ],
    },
    {
      heading: "Cookies and Tracking Technologies",
      blocks: [
        p(
          "Our website may use cookies and similar technologies to improve functionality and understand how visitors interact with our website.",
        ),
        p("These technologies may be used for:"),
        ul(
          {
            b: "Essential Cookies:",
            x: "Support basic website functionality and security.",
          },
          {
            b: "Analytics Cookies:",
            x: "Help us understand website traffic, visitor behaviour and performance.",
          },
          {
            b: "Marketing Cookies:",
            x: "May be used to measure advertising performance or deliver relevant marketing content, where applicable.",
          },
        ),
        p(
          "You can manage or disable cookies through your browser settings. However, disabling certain cookies may affect website functionality.",
        ),
        p(
          "Where required, we will obtain appropriate consent before using non-essential cookies or tracking technologies.",
        ),
      ],
    },
    {
      heading: "How We Share Your Information",
      blocks: [
        p("SOZOQ does not sell or rent personal information to third parties."),
        p(
          "However, we may share relevant information with trusted third-party service providers when necessary to operate our business and deliver our services.",
        ),
        p("These may include:"),
        ul(
          "Website hosting providers.",
          "Domain and infrastructure providers.",
          "Email and communication platforms.",
          "Payment processing providers.",
          "Website analytics services.",
          "Marketing and advertising platforms.",
          "Software and API integration providers.",
          "Professional advisers and legal service providers.",
        ),
        p(
          "Such providers may process information on our behalf or independently under their own applicable privacy policies.",
        ),
        p(
          "We may also disclose information when required by law, legal proceedings or valid requests from authorised government authorities.",
        ),
      ],
    },
    {
      heading: "Data Storage and Security",
      blocks: [
        p(
          "We take reasonable technical and organisational measures to protect personal information against:",
        ),
        ul(
          "Unauthorised access.",
          "Accidental loss.",
          "Misuse or disclosure.",
          "Unauthorised modification.",
          "Destruction of information.",
        ),
        p(
          "Depending on the services used, information may be stored on secure servers or third-party cloud platforms.",
        ),
        p(
          "Although we take reasonable precautions, no method of electronic storage or internet transmission can guarantee absolute security.",
        ),
      ],
    },
    {
      heading: "Data Retention",
      blocks: [
        p(
          "We retain personal information only for as long as reasonably necessary to fulfil the purposes described in this policy.",
        ),
        p("Retention periods may depend on:"),
        ul(
          "The nature of the information.",
          "The duration of the client relationship.",
          "Ongoing project requirements.",
          "Legal, accounting and regulatory obligations.",
          "The resolution of disputes or outstanding matters.",
        ),
        p(
          "When information is no longer required, we will take reasonable steps to delete or anonymise it, subject to applicable legal retention requirements.",
        ),
      ],
    },
    {
      heading: "Your Privacy Rights",
      blocks: [
        p("Subject to applicable laws, you may have the right to:"),
        ul(
          "Request information about the personal data we process.",
          "Request correction of inaccurate or incomplete information.",
          "Request deletion of personal information where applicable.",
          "Withdraw consent for processing where consent is the legal basis.",
          "Request information about how your data is handled.",
          "Raise concerns or submit privacy-related complaints.",
          "Nominate another individual to exercise your rights where permitted by law.",
        ),
        p(
          "To exercise these rights, contact us using the details provided in this policy.",
        ),
        p(
          "We may need to verify your identity before processing certain requests.",
        ),
      ],
    },
    {
      heading: "Third-Party Websites and Services",
      blocks: [
        p(
          "Our website may contain links to external websites, platforms or services.",
        ),
        p(
          "These third-party websites operate independently and have their own privacy policies and data practices.",
        ),
        p(
          "SOZOQ does not control or take responsibility for the privacy practices, content or security of external websites.",
        ),
        p(
          "We recommend reviewing their privacy policies before sharing personal information.",
        ),
      ],
    },
    {
      heading: "Marketing and Communication",
      blocks: [
        p("We may use your contact information to communicate about:"),
        ul(
          "Your project enquiries.",
          "Quotations and proposals.",
          "Ongoing projects.",
          "Service-related updates.",
          "Business announcements.",
          "New services and relevant updates, where permitted.",
        ),
        p(
          "You can opt out of promotional communications at any time by following the unsubscribe instructions or contacting us directly.",
        ),
        p(
          "Opting out of marketing communications will not prevent us from sending essential service-related messages.",
        ),
      ],
    },
    {
      heading: "Children's Privacy",
      blocks: [
        p(
          "Our website and services are intended primarily for businesses, professionals and individuals who can legally engage with our services.",
        ),
        p(
          "We do not knowingly collect personal information from children in violation of applicable laws.",
        ),
        p(
          "If we become aware that personal information has been collected unlawfully from a child, we will take appropriate steps to address the issue.",
        ),
      ],
    },
    {
      heading: "International Data Transfers",
      blocks: [
        p(
          "Some third-party platforms and service providers used by SOZOQ may process or store information on servers located outside India.",
        ),
        p(
          "Where personal information is transferred internationally, we will take reasonable steps to ensure that such transfers comply with applicable Indian data protection requirements and restrictions.",
        ),
      ],
    },
    {
      heading: "Changes to This Privacy Policy",
      blocks: [
        p(
          "SOZOQ may update this Privacy Policy periodically to reflect changes in our services, technology, business practices or applicable laws.",
        ),
        p(
          'Any updates will be published on this page along with a revised "Last Updated" date.',
        ),
        p(
          "We encourage visitors and clients to review this page periodically.",
        ),
      ],
    },
    {
      heading: "Contact Us",
      blocks: [
        p(
          "If you have questions, concerns or requests relating to this Privacy Policy or the handling of your personal information, please contact us.",
        ),
        lines(
          "SOZOQ – Creative Technology Agency",
          "Website: https://sozoq.in",
          "Email: hello@sozoq.in",
          "Registered Office: Kuttipuzha, Kochi, Kerala – 683578",
          "Subject: Privacy Policy Enquiry",
        ),
        p(
          "We will make reasonable efforts to respond to privacy-related requests within the timelines required by applicable law.",
        ),
        p(
          "Your privacy matters to us. We aim to handle your information responsibly, transparently and securely.",
        ),
      ],
    },
  ],
};
