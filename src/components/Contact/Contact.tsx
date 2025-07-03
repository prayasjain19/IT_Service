'use client';

import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { useState } from 'react';

type FormValues = {
    name: string;
    email: string;
    message: string;
};

export default function ContactPage() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormValues>();

    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    const onSubmit = async (data: FormValues) => {
        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
                {
                    from_name: data.name,
                    from_email: data.email,
                    message: data.message,
                },
                process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
            );
            setStatusMessage('✅ Message sent successfully!');
            reset();
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatusMessage('❌ Failed to send message. Please try again.');
        }
    };

    return (
        <section id="contact" className="min-h-screen bg-[#0f1117] text-white py-24 px-6 md:px-16">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 60 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-6">
                        <span className="text-purple-400">Contact</span> Us
                    </h2>
                    <p className="text-gray-300 text-lg md:text-xl text-center max-w-2xl mx-auto mb-16">
                        We'd love to hear from you. Whether you’re curious about features, a free trial, or even press —
                        we're ready to answer any and all questions.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.form
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="bg-[#202542] rounded-2xl p-8 shadow-lg shadow-purple-500/10 space-y-6"
                    >
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                            <input
                                type="text"
                                {...register('name', { required: 'Name is required' })}
                                className="w-full px-4 py-3 rounded-lg bg-[#0f1117] border border-gray-700 text-white focus:outline-none focus:border-purple-500"
                                placeholder="John Doe"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                            <input
                                type="email"
                                {...register('email', { required: 'Email is required' })}
                                className="w-full px-4 py-3 rounded-lg bg-[#0f1117] border border-gray-700 text-white focus:outline-none focus:border-purple-500"
                                placeholder="john@example.com"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                            <textarea
                                rows={5}
                                {...register('message', { required: 'Message is required' })}
                                className="w-full px-4 py-3 rounded-lg bg-[#0f1117] border border-gray-700 text-white focus:outline-none focus:border-purple-500"
                                placeholder="Type your message here..."
                            />
                            {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-semibold transition duration-300"
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>

                        {statusMessage && (
                            <p className={`text-sm text-center mt-4 ${statusMessage.includes('✅') ? 'text-green-400' : 'text-red-400'}`}>
                                {statusMessage}
                            </p>
                        )}
                    </motion.form>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true }}
                        className="bg-[#202542] p-8 rounded-2xl shadow-lg shadow-purple-500/10 space-y-6 flex flex-col justify-center"
                    >
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="text-purple-400 text-2xl">📍</div>
                                <div>
                                    <h4 className="text-white font-semibold text-lg">Office Address</h4>
                                    <p className="text-gray-300">
                                        NextGen IT Solutions<br />
                                        123 Tech Street,<br />
                                        Bangalore, India - 560001
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="text-purple-400 text-2xl">📧</div>
                                <div>
                                    <h4 className="text-white font-semibold text-lg">Email</h4>
                                    <p className="text-gray-300">support@nextgenit.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="text-purple-400 text-2xl">📞</div>
                                <div>
                                    <h4 className="text-white font-semibold text-lg">Phone</h4>
                                    <p className="text-gray-300">+91 98765 43210</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="text-purple-400 text-2xl">⏰</div>
                                <div>
                                    <h4 className="text-white font-semibold text-lg">Working Hours</h4>
                                    <p className="text-gray-300">Mon - Fri: 9:00 AM - 6:00 PM IST</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
