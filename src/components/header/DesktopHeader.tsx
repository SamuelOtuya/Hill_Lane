"use client";

import { Link, useLocation } from "react-router-dom";
import { FaPhoneAlt, FaSearch } from "react-icons/fa";
import { IoMail, IoLocationSharp } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import logoH from "../../assets/logoH.jpg";

type Tab = {
  name: string;
  link: string;
};

export function DesktopHeader() {
  const location = useLocation(); // ✅ Get current pathname

  const tabs: Tab[] = [
    { name: "Home", link: "/vehicle-listings" },
    { name: "Find A Car", link: "/find-car" },
    { name: "About Us", link: "/about-us" },
    { name: "Contact Us", link: "/contact" },
    { name: "Blog", link: "/blog" },
    { name: "FAQs", link: "/faqs" },
  ];

  return (
    <div>
      {/* Top Header */}
      <div className="bg-[#020e26] text-white p-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          {/* Left: Contact Info */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <FaPhoneAlt className="text-gray-300" />
              <span>Call Us On - +254792254254</span>
            </div>
            <div className="flex items-center gap-2">
              <IoMail className="text-gray-300" />
              <span>info@hilllaneautoshop.co.ke</span>
            </div>
            <div className="flex items-center gap-2">
              <IoLocationSharp className="text-gray-300" />
              <span>Opposite Flamingo Towers, Upperhill, Nairobi, Kenya</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-md p-5">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/vehicle-listings">
            <img src={logoH} alt="Hill Lane Auto Shop" className="h-10" />
          </Link>

          {/* Navigation Links */}
          <div className="flex gap-6">
            <Link to="/find-car">
            <div className="text-xl pt-1"><FaSearch /></div>
            </Link>
            {tabs.map((tab) => (
              <Link key={tab.name} to={tab.link}>
                <button
                  className={`text-[15px] font-bold uppercase ${
                    location.pathname === tab.link
                      ? "text-[#fe2a39] border-b-2 border-[#fe2a39]"
                      : "text-black hover:text-[#fe2a39] border-b-2 border-transparent hover:border-[#fe2a39] transition-all duration-300"
                  }`}
                >
                  {tab.name}
                </button>
              </Link>
            ))}
          </div>

          {/* Login Button */}
          <Link to="https://admin.hilllaneautoshop.co.ke">
            <button className="flex items-center gap-2 border px-4 py-1 text-blue-600 border-blue-600 rounded-md hover:bg-blue-600 hover:text-white transition" >
              <FiLogIn />
              Login
            </button>
          </Link>
        </div>
      </nav>
    </div>
  );
}
