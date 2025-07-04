'use client';

import { motion } from "framer-motion";
import { Button } from "../ui/button";
import Image from "next/image";
import backGr from "../../../public/assets/background.png"

export default function HomeSection() {
  const onScrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center bg-black text-white overflow-hidden"
    >
      {/* Background Image */}
      <Image
        src={backGr}
        alt="Hero Background"
        fill
        className="object-cover z-0 brightness-100"
        priority
      />

      {/* Softer Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#050716]/10 via-[#0F142A]/20 to-black/20 z-10" />

      {/* Content - Left Aligned */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-20 px-6 md:px-16 max-w-4xl"
      >
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-left">
          Empowering <span className="text-purple-400">Digital Growth</span><br />
          with <span className="text-white">Scalable IT Solutions</span>
        </h1>

        <p className="text-gray-300 text-base sm:text-lg mt-6 max-w-xl text-left">
          Build smarter applications, automate workflows, and innovate faster with our enterprise-grade IT services.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-start gap-4">
          <Button
            onClick={() => onScrollTo("services")}
            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 rounded-xl text-base sm:text-lg font-medium transition duration-300"
          >
            Explore Services
          </Button>

          <Button
            onClick={() => onScrollTo("about")}
            className="border border-purple-500 text-purple-300 hover:bg-purple-600 hover:text-white px-8 py-6 rounded-xl text-base sm:text-lg font-medium transition duration-300"
          >
            Learn More
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
