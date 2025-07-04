"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar as NavbarEntity } from "@/core/entities/Navbar.entity";
import { motion } from "framer-motion";


export default function Header() {
  const [links, setLinks] = useState<NavbarEntity[]>([]);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const fetchLinks = async () => {
      const res = await fetch("/api/header");
      const data = await res.json();
      setLinks(data);
    };
    fetchLinks();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map((link) => document.querySelector(link.href) as HTMLElement | null);
      const scrollY = window.scrollY + 100;

      for (let i = 0; i < sections.length; i++) {
        const sec = sections[i];
        if (!sec) continue;
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          setActive(links[i].href);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [links]);

  const onButtonClick = () => {
    const section = document.getElementById("contact");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  }
  return (
    <nav className="bg-[#1A1F3E]/90 backdrop-blur-md text-white px-6 md:px-12 py-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <Link href="/" passHref>
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-xl md:text-2xl font-extrabold cursor-pointer hover:text-purple-400 transition-colors duration-300"
          >
            🚀 IT Services
          </motion.h1>
        </Link>

        {/* Center: Nav Links */}
        <div className="hidden md:flex gap-8 justify-center items-center">
          {links.map((link) => (
            <motion.a
              key={link.id}
              href={link.href}
              whileHover={{ scale: 1.05 }}
              className={`text-sm md:text-base transition-all font-medium ${active === link.href
                  ? "text-purple-400 font-semibold"
                  : "text-gray-200 hover:text-purple-300"
                }`}
            >
              {link.title}
            </motion.a>
          ))}
        </div>

        {/* Right: Get Quote Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={onButtonClick}
          className="hidden md:block bg-purple-600 hover:bg-purple-700 text-white px-5 py-2 rounded-lg font-medium transition duration-300"
        >
          Get a Quote
        </motion.button>
      </div>
    </nav>
  );
}
