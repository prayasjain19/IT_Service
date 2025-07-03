'use client';

import { useEffect, useState } from 'react';
import { Service } from '@/core/entities/Service.entity';
import { ServiceApiRepository } from '@/infrastructure/fronetend/repositories/Service.api';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AdminServiceList() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const repo = new ServiceApiRepository();
        const data = await repo.findAll();
        setServices(data);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const repo = new ServiceApiRepository();
      await repo.delete(id);
      setServices(prev => prev.filter(service => service.id !== id));
      toast.success('Service deleted successfully');
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete service');
    }
  };

  const handleEdit = (id: number) => {
    router.push(`/sxs_admin/services/edit/${id}`);
  };

  return (
    <div className="min-h-screen px-6 py-16 md:px-16 bg-[#0f1117] text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-white mb-8 text-center">
          Manage <span className="text-purple-400">Services</span>
        </h1>

        {loading && <p className="text-gray-400 text-center">Loading services...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!loading && services.length === 0 && (
          <p className="text-gray-400 text-center">No services found.</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-6">
          {services.map(service => (
            <div
              key={service.id}
              className="bg-[#202542] p-6 rounded-2xl border border-purple-700/30 shadow-lg hover:shadow-xl transition-all"
            >
              {service.iconUrl && (
                <img
                  src={service.iconUrl}
                  alt={service.title}
                  className="w-12 h-12 mb-4 object-contain"
                />
              )}
              <h2 className="text-xl font-semibold text-white mb-2">{service.title}</h2>
              <p className="text-gray-300 text-sm mb-4">{service.description}</p>
              <p className="text-xs text-gray-500 mb-4">
                Updated: {new Date(service.updatedAt).toLocaleDateString()}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => handleEdit(service.id)}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-1.5 rounded-xl transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1.5 rounded-xl transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
