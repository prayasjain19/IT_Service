"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Navbar as NavbarEntity } from "@/core/entities/Navbar.entity";
import { motion } from 'framer-motion';

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
      const sections = links.map(link => document.querySelector(link.href));
      const scrollY = window.scrollY + 100; // offset for header

      if (!sections) return;

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

  return (
    <nav className="bg-[#1A1F3E] text-white px-6 py-4 shadow-lg sticky top-0 z-50 backdrop-blur-md bg-opacity-80">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Animate IT Services heading */}
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl font-bold"
        >
          🚀 IT Services
        </motion.h1>

        <div className="flex gap-6">
          {links.map((link) => (
            <motion.a
              key={link.id}
              href={link.href}
              whileHover={{ scale: 1.05 }}
              className={`transition-colors ${
                active === link.href ? 'text-purple-400 font-semibold' : 'text-white'
              }`}
            >
              {link.title}
            </motion.a>
          ))}
        </div>
      </div>
    </nav>
  );
}
