"use client";

import { Drawer, Sidebar, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import logoH from "../../assets/logoH.jpg";
import {
  HiHome,
  HiMenu,
  HiNewspaper,
  HiPhone,
  HiQuestionMarkCircle,
  HiSearch,
  HiShoppingBag,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div
        className={`w-full bg-white shadow-md transition-all duration-300 ${
          isSticky ? "fixed top-0 left-0 z-50" : "relative"
        }`}
      >
      <div className="flex px-5 py-3 justify-between items-center shadow-md">
        <Link to="/">
      <img src={logoH} alt="Urban Drive Logo" className="h-10 w-30" />
      </Link>
        <button onClick={() => setIsOpen(true)}>
          <HiMenu className="text-2xl text-slate-600" />
        </button>
      </div>
      <Drawer position="right" open={isOpen} onClose={handleClose}>
        <Drawer.Header title="MENU" titleIcon={() => <></>} />
        <Drawer.Items>
          <Sidebar
            aria-label="Sidebar with multi-level dropdown example"
            className="[&>div]:bg-transparent [&>div]:p-0"
          >
            <div className="flex h-full flex-col justify-between py-2">
              <div>
                <form className="pb-3 md:hidden">
                  <TextInput
                    icon={HiSearch}
                    type="search"
                    placeholder="Search"
                    required
                    size={32}
                  />
                </form>
                <Sidebar.Items>
                  <Sidebar.ItemGroup>
                    <Sidebar.Item href="/" icon={HiHome}>
                      Home
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/find-car"
                      icon={HiSearch}
                    >
                      Find a Car
                    </Sidebar.Item>
                    <Sidebar.Item href="/about" icon={HiShoppingBag}>
                      About Us
                    </Sidebar.Item>
                    <Sidebar.Item href="/contact" icon={HiPhone}>
                      Contact Us
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/blogs"
                      icon={HiNewspaper}
                    >
                      Blogs
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/faqs"
                      icon={HiQuestionMarkCircle}
                    >
                      FAQs
                    </Sidebar.Item>
                  </Sidebar.ItemGroup>
                 
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
      </div>
    </>
  );
}

