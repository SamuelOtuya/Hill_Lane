"use client";

import { Drawer, Sidebar, TextInput } from "flowbite-react";
import { useState } from "react";
import logoH from "../../assets/logoH.jpg";
import {
  HiChartPie,
  HiLogin,
  HiMenu,
  HiPencil,
  HiSearch,
  HiShoppingBag,
  HiUsers,
} from "react-icons/hi";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="flex px-5 py-3 justify-between items-center">
      <img src={logoH} alt="Urban Drive Logo" className="h-10 w-30" />
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
                    <Sidebar.Item href="/" icon={HiChartPie}>
                      Home
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/find-car"
                      icon={HiShoppingBag}
                    >
                      Find a Car
                    </Sidebar.Item>
                    <Sidebar.Item href="/about" icon={HiUsers}>
                      About Us
                    </Sidebar.Item>
                    <Sidebar.Item href="/contact" icon={HiLogin}>
                      Contact Us
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/blogs"
                      icon={HiPencil}
                    >
                      Blogs
                    </Sidebar.Item>
                    <Sidebar.Item
                      href="/faqs"
                      icon={HiPencil}
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
