import React from "react";
import { DesktopHeader } from "../components/header/DesktopHeader";
import { MobileNav } from "../components/header/MobileNav";
import { FooterMain } from "../components/footer/FooterMain";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="hidden md:block">
        <DesktopHeader />
      </div>

      <div className="block md:hidden">
        <MobileNav/> 
      </div>

      <div className="min-h-screen">{children}</div>

      <div>
        <FooterMain/>
      </div>
    </div>
  );
};

export default DefaultLayout;
