import type { Metadata, Viewport } from "next";
import { Familjen_Grotesk, Inter, Geist, Geist_Mono } from "next/font/google";
import "@fontsource/bluu-next/700.css"; // headline font (Velvetyne, OFL)
import "@fontsource/cal-sans/400.css"; // case-study headings (OFL)
import "@/styles/globals.css";
import "@/styles/mobile-home.css";
import "@/styles/desktop-home.css";
import "@/styles/cat-runner.css";
import ScrollEffects from "@/components/shared/ScrollEffects";
import RegisterSW from "@/components/shared/RegisterSW";
import OrganizationSchema from "@/components/shared/OrganizationSchema";
import { GoogleTagManager } from "@next/third-parties/google";

const familjen = Familjen_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--ff-familjen",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--ff-inter",
  display: "swap",
});

const geist = Geist({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--ff-geist",
  display: "swap",
});
const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--ff-geist-mono",
  display: "swap",
});
/* extra face used only by the mobile home (Figma: Geist Mono Medium) */
const geistMonoMd = Geist_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--ff-geist-mono-md",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.sozoq.in/"),
  title: "SOZOQ – Creative Tech Agency",
  description:
    "We are a creative tech agency. Design, develop and grow with us.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://sozoq.in",
    siteName: "SOZOQ",
    title: "SOZOQ – Creative Tech Agency",
    description:
      "We are a creative tech agency. Design, develop and grow with us.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SOZOQ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "SOZOQ – Creative Tech Agency",
    description:
      "We are a creative tech agency. Design, develop and grow with us.",
    images: ["/og-image.png"],
  },
  appleWebApp: {
    capable: true,
    title: "SOZOQ",
    statusBarStyle: "default",
  },
};

const fontVars = [familjen, inter, geist, geistMono, geistMonoMd]
  .map((f) => f.variable)
  .join(" ");

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={fontVars}>
      <GoogleTagManager gtmId="GTM-K3CB2JBW" />
      <body>
        <OrganizationSchema />
        <ScrollEffects />
        <RegisterSW />
        {children}
      </body>
    </html>
  );
}
