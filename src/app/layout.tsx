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
  title: "SOZOQ",
  description:
    "We are a creative tech agency. Design, develop and grow with us.",
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
      <body>
        <ScrollEffects />
        <RegisterSW />
        {children}
      </body>
    </html>
  );
}
