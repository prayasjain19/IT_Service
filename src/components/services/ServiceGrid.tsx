
'use client';

import { Service } from '@/core/entities/Service.entity';
import { motion } from 'framer-motion';

interface Props {
  services: Service[];
}

export default function ServiceGrid({ services }: Props) {
  return (
    // Outer container for consistent padding and max-width on larger screens
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.15, // Slightly increased delay for a staggered effect
              duration: 0.6, // Slower transition for a smoother feel
              ease: "easeOut" // Use a more natural easing function
            }}
            viewport={{ once: true, amount: 0.3 }} // Trigger when 30% of item is in view
            className="
              relative
              flex flex-col items-center text-center 
              bg-[#202542]
              border border-transparent 
              rounded-xl
              p-8
              shadow-lg shadow-purple-500/10 
              transform transition-all duration-500 ease-in-out
              hover:shadow-xl hover:shadow-purple-500/40
              hover:border-purple-600
              hover:scale-[1.02] group
            "
          >
            {service.iconUrl && (
              // Icon container for better alignment and spacing
              <div className="mb-6">
                <img
                  src={service.iconUrl}
                  alt={service.title}
                  className="w-16 h-16 object-contain mx-auto" // Slightly larger icon, ensure object-contain
                />
              </div>
            )}
            <h3 className="
              text-2xl font-bold text-white
              mb-3 tracking-wide
              group-hover:text-purple-300 transition-colors duration-300 
            ">
              {service.title}
            </h3>
            <p className="
              text-gray-300 text-base leading-relaxed // Standard base font size, relaxed line height
              mb-0 
            ">
              {service.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
