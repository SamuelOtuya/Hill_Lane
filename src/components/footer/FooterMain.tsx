"use client";

import { Footer } from "flowbite-react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";
import { FaLocationArrow, FaPhoneAlt } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

export function FooterMain() {
  return (
    <Footer bgDark>
      <div className="w-full ">
        <div className="grid w-full grid-cols-2 gap-8 px-6 py-14 md:grid-cols-4 sm:px-20">
          <div className="space-y-5 text-white">
            <div className="flex items-center gap-3">
              <FaLocationArrow className="text-[#fe2a39] text-xl"/>
              <span className="text-sm">Opposite Flamingo Towers, Upperhill, Nairobi, Kenya</span>
            </div>
            <div className="flex items-center gap-3">
              <IoMail className="text-[#fe2a39] text-lg"/>
              <span className="text-sm">Info@hillianeautoshop.co.ke</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#fe2a39] text-lg"/>
              <span className="text-sm">+254 792 254 254 (Landline)</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#fe2a39] text-lg"/>
              <span className="text-sm">+254 754 877 376 (WhatsApp)</span>
            </div>
          </div>
          <div className="space-y-4 text-white">
            <h1 className="text-[#fe2a39] text-xl font-semibold">Our Info</h1>
            <p className="text-sm">About Us</p>
            <p className="text-sm">Terms of Use</p>
            <p className="text-sm">Privacy Policy</p>
            <p className="text-sm">Environmental Policy</p>
          </div>
          <div className="space-y-4 text-white">
            <h1 className="text-[#fe2a39] text-xl font-semibold">Subscribe Us</h1>
            <input 
              type="email" 
              placeholder="Your email" 
              className="p-2 rounded w-full text-sm" 
            />
            <button className="bg-[#fe2a39] text-white p-2 rounded w-full text-sm hover:bg-[#e02432] transition-colors">
              Subscribe
            </button>
          </div>
          <div className="space-y-4 text-white">
            <h1 className="text-[#fe2a39] text-xl font-semibold">Contact Us</h1>
            <p className="text-sm">Follow us on social media:</p>
            <div className="flex space-x-4">
              <Footer.Icon href="https://www.facebook.com/hilllaneautoshop/" icon={BsFacebook} className="text-white hover:text-[#fe2a39] transition-colors" />
              <Footer.Icon href="#" icon={BsInstagram} className="text-white hover:text-[#fe2a39] transition-colors" />
              <Footer.Icon href="#" icon={BsTwitter} className="text-white hover:text-[#fe2a39] transition-colors" />
              <Footer.Icon href="#" icon={BsGithub} className="text-white hover:text-[#fe2a39] transition-colors" />
              <Footer.Icon href="#" icon={BsDribbble} className="text-white hover:text-[#fe2a39] transition-colors" />
            </div>
          </div>
        </div>
        <div className="w-full bg-[#2b3444] px-4 py-6 sm:flex sm:items-center sm:justify-between items-center">
          <div className="mt-4 space-x-6 sm:mt-0 sm:justify-center">
          <p className="text-center text-white">
            Copyright © {new Date().getFullYear()}{" "}
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-800 font-medium text-red-600"
            >
              Hillane Autoshop™
            </a>
            
            . Designed by{" "}
            <a
              href="https://gbt.co.ke/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-green-600 font-medium text-green-500"
            >
              GreenBear Technologies
            </a>
            . All rights reserved.
          </p>
          </div>
        </div>
      </div>
    </Footer>
  );
}