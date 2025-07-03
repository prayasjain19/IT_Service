// components/HomeSection.tsx
"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HomeSection() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#050716] to-[#0F142A] px-6 md:px-16"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-4xl"
      >
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Empowering <span className="text-purple-400">Digital Growth</span><br />
          with Scalable IT Solutions
        </h1>
        <p className="text-gray-300 text-lg md:text-xl mt-6">
          Build smarter applications, automate processes, and scale confidently with our full-stack IT services.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">

          <button
            onClick={() => {
              const section = document.getElementById("services");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl text-lg font-medium transition duration-300"
          >
            Explore Services
          </button>
          <button
            onClick={() => {
              const section = document.getElementById("about");
              if (section) section.scrollIntoView({ behavior: "smooth" });
            }}
            className="border border-purple-600 text-purple-400 hover:bg-purple-600 hover:text-white px-6 py-3 rounded-xl text-lg font-medium transition duration-300"
          >
            Learn More
          </button>
        </div>

      </motion.div>
    </section>
  );
}
