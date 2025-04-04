import React from "react";
import { DesktopHeader } from "../components/header/DesktopHeader";
import { MobileNav } from "../components/header/MobileNav";
import { FooterMain } from "../components/footer/FooterMain";
import { useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa"; // Import WhatsApp icon

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const {pathname} = useLocation();
  console.log(pathname);

  // WhatsApp number - replace with your actual WhatsApp business number
  const whatsappNumber = "254792254254";
  const whatsappMessage = encodeURIComponent("Hello! I'm interested in your cars.");
  
  return (
    <div className="relative">
      <div className="hidden md:block">
        <DesktopHeader />
      </div>

      <div className="block md:hidden">
        <MobileNav/> 
      </div>

      <div 
        className={`pt-4 min-h-screen ${
          (pathname === "/search" || pathname === "/find-car" || pathname === "/faqs" || pathname === "/single-car/:id") 
            ? "grid md:grid-cols-[repeat(16,minmax(0,1fr))]" 
            : ""
        }`}
      >
        <div />
        <div className="md:col-[span_14/span_14]">
          {children}
        </div>
        <div />
      </div>

      {/* <div className="min-h-screen">{children}</div> */}

      <div>
        <FooterMain/>
      </div>
      
      {/* Floating WhatsApp button */}
      <a 
        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-colors z-50 flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
      >
        <FaWhatsapp size={30} />
      </a>
    </div>
  );
};

export default DefaultLayout;