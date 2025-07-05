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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Contact Info  */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center bg-[#202542] p-8 rounded-2xl shadow-xl shadow-purple-500/20 space-y-8"
          >
            <h3 className="text-3xl font-bold text-white mb-4">Get in Touch</h3>
            <p className="text-gray-400 text-base leading-relaxed">
              Have a project in mind or just want to chat? Reach out to us through the details below or use the form on the right. We're always eager to connect!
            </p>

            {/* Individual Contact Info Items */}
            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 text-purple-400 text-2xl mt-1">
                  {/* <FaMapMarkerAlt /> */} 📍
                </div>
                <div>
                  <h4 className="text-purple-300 text-xl font-semibold">Office Address</h4>
                  <p className="text-gray-200">
                    NextGen IT Solutions<br />
                    123 Tech Street, 5th Floor<br />
                    Bangalor - 56000100
                  </p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 text-purple-400 text-2xl mt-1">
                  {/* <FaEnvelope /> */} 📧
                </div>
                <div>
                  <h4 className="text-purple-300 text-xl font-semibold">Email Us</h4>
                  <p className="text-gray-200">
                    <a href="mailto:support@nextgenit.com" className="hover:text-purple-400 transition-colors">support@nextgenit.com</a>
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 text-purple-400 text-2xl mt-1">
                  {/* <FaPhone /> */} 📞
                </div>
                <div>
                  <h4 className="text-purple-300 text-xl font-semibold">Call Us</h4>
                  <p className="text-gray-200">
                    <a href="tel:+919876543210" className="hover:text-purple-400 transition-colors">+91 9876 000</a>
                  </p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 text-purple-400 text-2xl mt-1">
                  {/* <FaClock /> */} ⏰
                </div>
                <div>
                  <h4 className="text-purple-300 text-xl font-semibold">Working Hours</h4>
                  <p className="text-gray-200">Mon - Fri: 9:00 AM - 6:00 PM IST</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form  */}
          <motion.form
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
            className="bg-[#202542] rounded-2xl p-8 shadow-xl shadow-purple-500/20 space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
              <input
                type="text"
                id="name"
                {...register('name', { required: 'Name is required' })}
                className="w-full px-4 py-3 rounded-lg bg-[#0f1117] border border-gray-700 text-white focus:outline-none focus:border-purple-500 placeholder-gray-500"
                placeholder="John Doe"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <input
                type="email"
                id="email"
                {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
                className="w-full px-4 py-3 rounded-lg bg-[#0f1117] border border-gray-700 text-white focus:outline-none focus:border-purple-500 placeholder-gray-500"
                placeholder="john@example.com"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
              <textarea
                id="message"
                rows={5}
                {...register('message', { required: 'Message is required' })}
                className="w-full px-4 py-3 rounded-lg bg-[#0f1117] border border-gray-700 text-white focus:outline-none focus:border-purple-500 placeholder-gray-500"
                placeholder="Type your message here..."
              />
              {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 rounded-xl text-white font-semibold transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {statusMessage && (
              <p
                className={`text-sm text-center mt-4 ${
                  statusMessage.includes('✅') ? 'text-green-400' : 'text-red-400'
                }`}
              >
                {statusMessage}
              </p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}