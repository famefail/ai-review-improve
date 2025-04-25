"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import Logo from "../atoms/Logo";
import NavItem from "../molecules/NavItem";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  // ตรวจจับการเลื่อน scroll เพื่อเปลี่ยนสไตล์ navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Logo isScrolled={isScrolled} />

        <div className="hidden md:flex space-x-8">
          <NavItem href="#features" isScrolled={isScrolled}>
            ฟีเจอร์
          </NavItem>
          <NavItem href="#benefits" isScrolled={isScrolled}>
            ประโยชน์
          </NavItem>
          <NavItem
            href="https://famefail.github.io/ai-review-improve"
            isScrolled={isScrolled}
          >
            เอกสาร
          </NavItem>
        </div>

        <div className="flex space-x-3">
          <Link
            className={`transition-colors ${
              isScrolled
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white text-blue-700 hover:bg-blue-50"
            } px-4 py-2 rounded-md font-medium`}
            href="/overview"
          >
            เข้าใช้งานระบบ
          </Link>
        </div>
      </div>
    </nav>
  );
}
