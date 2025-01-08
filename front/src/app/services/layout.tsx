import ServicesSection from "@/components/ServicesSection/ServicesSection";
import Testimonials from "@/components/TestmonialsCarousel/Testimonials";
const ServicesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white text-black">
      <header className="p-4 bg-black text-white text-center">
        <h1 className="text-2xl font-bold">Nuestros Servicios</h1>
      </header>
      <main>{children}</main>
      <footer className="p-4 bg-gray-800 text-white text-center">
        <p>Servicios Elysium un Deleite para nuestros Clientes</p>
      </footer>
      <ServicesSection />
      <Testimonials />
    </div>
  );
};

export default ServicesLayout;
