import { LandingHero } from "@/components/marketing/landing-hero";
import { ProductGrid } from "@/components/marketing/product-grid";
import { MobileNav } from "@/components/layout/mobile-nav";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <main className="relative min-h-screen">
      {/* Hero Section & Nav Superior */}
      <LandingHero />

      {/* Catálogo en Grilla con Filtros y Animaciones */}
      <ProductGrid />

      {/* Footer Minimalista */}
      <Footer />

      {/* Menú Flotante Inferior para Móviles */}
      <MobileNav />
    </main>
  );
}