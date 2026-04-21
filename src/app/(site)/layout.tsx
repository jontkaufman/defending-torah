import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <Nav />
      <main id="main-content" role="main" className="relative z-[1] flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
