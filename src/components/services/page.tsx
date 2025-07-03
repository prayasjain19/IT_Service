// app/services/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { Service } from '@/core/entities/Service.entity';
import { ServiceApiRepository } from '@/infrastructure/fronetend/repositories/Service.api';
import ServiceGrid from './ServiceGrid';

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const repo = new ServiceApiRepository();
        const data = await repo.findAll();
        setServices(data);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services.');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <section className="min-h-screen py-24 px-6 md:px-16 bg-[#0f1117] text-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
          Our <span className="text-purple-400">Services</span>
        </h2>

        <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto mb-16">
          Explore the wide range of services we offer — tailored to drive growth, efficiency,
          and scalability for your business using modern technologies and secure architecture.
        </p>

        {loading && <p className="text-gray-400 text-lg">Loading services...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && services.length > 0 && <ServiceGrid services={services} />}
        {!loading && services.length === 0 && (
          <p className="text-gray-500">No services found at the moment.</p>
        )}
      </div>
    </section>
  );
}
