"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import boy from "../../../public/assests/boy1.png"// ensure correct path

export default function AboutSection() {
    return (
        <section id="about" className="min-h-screen py-24 px-6 md:px-16 bg-transparent scroll-mt-24 flex items-center">
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true }}
                className="max-w-7xl mx-auto"
            >
                <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-6">
                    About <span className="text-purple-400">Us</span>
                </h2>
                <p className="text-gray-300 text-lg md:text-xl text-center max-w-3xl mx-auto mb-14">
                    At <span className="text-white font-semibold">NextGen IT Solutions</span>, we combine
                    innovation with technology to help businesses scale faster, build smarter, and deliver
                    better digital experiences.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Image Block */}
                    <div className="flex justify-center">
                        <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-purple-600/30">
                            <Image
                                src={boy}
                                alt="Our Team"
                                width={450}
                                height={450}
                                className="rounded-3xl hover:scale-105 transition-transform duration-500 ease-in-out"
                            />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-6">Why Choose Us?</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="bg-[#202542] p-6 rounded-xl shadow-lg hover:scale-[1.02] transition duration-300">
                                <h4 className="text-purple-400 font-semibold text-lg mb-2 flex items-center gap-2">
                                    🚀 Scalable Architecture
                                </h4>
                                <p className="text-gray-300 text-base">
                                    We design systems that scale seamlessly — from MVPs to millions of users using microservices & cloud-native infra.
                                </p>
                            </div>

                            <div className="bg-[#202542] p-6 rounded-xl shadow-lg hover:scale-[1.02] transition duration-300">
                                <h4 className="text-purple-400 font-semibold text-lg mb-2 flex items-center gap-2">
                                    🔒 Enterprise-grade Security
                                </h4>
                                <p className="text-gray-300 text-base">
                                    Data encryption, role-based access, secure APIs — security is at the core of every solution we build.
                                </p>
                            </div>

                            <div className="bg-[#202542] p-6 rounded-xl shadow-lg hover:scale-[1.02] transition duration-300">
                                <h4 className="text-purple-400 font-semibold text-lg mb-2 flex items-center gap-2">
                                    ⚙️ Modern Tech Stack
                                </h4>
                                <p className="text-gray-300 text-base">
                                    We use React, Next.js, Node.js, Prisma, Docker, AWS, and more — enabling high-performance applications.
                                </p>
                            </div>

                            <div className="bg-[#202542] p-6 rounded-xl shadow-lg hover:scale-[1.02] transition duration-300">
                                <h4 className="text-purple-400 font-semibold text-lg mb-2 flex items-center gap-2">
                                    💼 Dedicated Engineering Team
                                </h4>
                                <p className="text-gray-300 text-base">
                                    Our developers collaborate with you at every step — from design sprints to final deployment & post-launch support.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
