'use client';
import { motion } from 'framer-motion';
import Image from "next/image";
import boy from "../../../public/assests/boy.png";

export default function AboutSection() {
    return (
        <section id="about" className="py-20 px-4 md:px-16 bg-transparent scroll-mt-20">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto text-center"
            >
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">About Us</h2>
                <p className="text-gray-300 mb-6 text-lg">
                    We are a modern IT solutions provider, focused on building scalable and
                    efficient systems tailored for your business. With a blend of design,
                    development, and strategy, we help startups and enterprises grow faster.
                </p>
                <div className="grid md:grid-cols-2 gap-8 items-center mt-10">
                    <Image
                        src={boy}
                        alt="About Team"
                        width={500}
                        height={500}
                        className="rounded-2xl shadow-lg border border-purple-400"
                    />
                    <div className="text-left">
                        <h3 className="text-2xl font-semibold text-white mb-2">Why Choose Us?</h3>
                        <ul className="list-disc list-inside text-gray-300 space-y-2">
                            <li>🔥 Expert developers with real-world experience</li>
                            <li>⚡ Fast, secure, and scalable applications</li>
                            <li>🎯 Dedicated project handling and support</li>
                            <li>💡 Creative UI/UX with modern tools</li>
                        </ul>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
