"use client";

import { Drawer, Sidebar, TextInput } from "flowbite-react";
import { useState } from "react";
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

  return (
    <>
      <div className="flex px-5 py-3 justify-between items-center">
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
                  {/* <Sidebar.ItemGroup>
                    <Sidebar.Item
                      href="https://github.com/themesberg/flowbite-react/"
                      icon={HiClipboard}
                    >
                      Docs
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="https://flowbite-react.com/"
                      icon={HiCollection}
                    >
                      Components
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="https://github.com/themesberg/flowbite-react/issues"
                      icon={HiInformationCircle}
                    >
                      Help
                    </Sidebar.Item>
                  </Sidebar.ItemGroup> */}
                </Sidebar.Items>
              </div>
            </div>
          </Sidebar>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
