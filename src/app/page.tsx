import Header from "@/components/shared/Header";
import MobileHome from "@/components/mobile/MobileHome";
import DesktopHome from "@/components/desktop/DesktopHome";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};
export default function Home() {
  return (
    <main className="page page--home" data-name="Sozoq">
      {/* the shared header only keeps the floating mobile menu on the home page */}
      <Header />
      {/* mobile home (<= 767px) – hidden on desktop by CSS */}
      <MobileHome />
      {/* desktop home (>= 768px) – hidden on mobile by CSS */}
      <DesktopHome />
    </main>
  );
}
