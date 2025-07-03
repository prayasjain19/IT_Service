'use client';

import { Service } from '@/core/entities/Service.entity';
import { motion } from 'framer-motion';

interface Props {
  services: Service[];
}

export default function ServiceGrid({ services }: Props) {
  return (
    <section className="py-20 px-6 sm:px-10 lg:px-16 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.1,
              duration: 0.6,
              ease: 'easeOut',
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="
              relative z-10
              bg-[#202542]/80 backdrop-blur-md
              border border-purple-500/10 
              rounded-2xl px-6 py-8 
              shadow-[0_0_20px_-5px_rgba(128,90,213,0.3)]
              hover:shadow-[0_0_40px_-5px_rgba(168,85,247,0.5)]
              hover:scale-[1.02] transition duration-300 ease-in-out
              text-center group
            "
          >
            {service.iconUrl && (
              <div className="mb-6 flex justify-center">
                <div className="p-3 bg-gradient-to-tr from-purple-600 to-purple-400 rounded-full shadow-lg shadow-purple-700/30">
                  <img
                    src={service.iconUrl}
                    alt={service.title}
                    className="w-12 h-12 object-contain"
                  />
                </div>
              </div>
            )}

            <h3 className="text-2xl font-bold text-purple-400 group-hover:text-purple-300 transition-colors mb-3">
              {service.title}
            </h3>

            <p className="text-gray-200 text-base leading-relaxed tracking-wide text-justify">
              {service.description}
            </p>

            {/* Optional divider */}
            <div className="w-10 h-1 bg-purple-500/30 mx-auto mt-6 rounded-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
