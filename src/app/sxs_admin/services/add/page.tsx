'use client';
import { CreateServiceDTO } from '@/core/dtos/Service.dto';
import { ServiceApiRepository } from '@/infrastructure/fronetend/repositories/Service.api';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const repo = new ServiceApiRepository();

const AddServicePage = () => {
    const router = useRouter();

    const [form, setForm] = useState<CreateServiceDTO>({
        title: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        //Input Validation
        if (!form.title || !form.description) {
            toast.error('Please fill out all fields.');
            return;
        }
        setLoading(true);
        try {
            await repo.create(form);
            toast.success('Service added successfully!');
            router.push('/sxs_admin/services');
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : 'Unexpected error';
            toast.error(`Error: ${msg}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="py-16 px-6 md:px-20 text-white min-h-screen bg-gradient-to-br from-[#131B4D] to-[#1A1F3E]">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl mx-auto bg-[#1A1F3E] border border-purple-700 p-8 rounded-2xl shadow-xl"
            >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-purple-300">➕ Add New Service</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm mb-1 text-gray-300">Service Title</label>
                        <input
                            id="title"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            type="text"
                            className="w-full p-3 bg-[#131B4D] border border-gray-600 rounded-xl outline-none text-white"
                            placeholder="e.g. Cloud Integration"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm mb-1 text-gray-300">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows={5}
                            className="w-full p-3 bg-[#131B4D] border border-gray-600 rounded-xl outline-none text-white resize-none"
                            placeholder="Describe the service in detail..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-purple-600 hover:bg-purple-700 transition-all text-white py-3 px-6 rounded-xl w-full font-semibold"
                    >
                        {loading ? 'Adding...' : 'Add Service'}
                    </button>
                </form>
            </motion.div>

        </section>
    )
}

export default AddServicePage;