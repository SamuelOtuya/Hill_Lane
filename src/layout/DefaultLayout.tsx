import React from "react";
import { DesktopHeader } from "../components/header/DesktopHeader";
import { MobileNav } from "../components/header/MobileNav";
import { FooterMain } from "../components/footer/FooterMain";
import { useLocation } from "react-router-dom";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const {pathname} = useLocation();
  console.log(pathname)
  return (
    <div>
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

      <div >
        <FooterMain/>
      </div>
    </div>
  );
};

export default DefaultLayout;
