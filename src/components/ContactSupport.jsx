import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { sendSupportEmails } from '../services/brevoService';

export default function ContactSupport({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', type: '' });

    // Validation
    if (!formData.name.trim()) {
      setStatus({ loading: false, message: '❌ Please enter your name', type: 'error' });
      setTimeout(() => setStatus({ loading: false, message: '', type: '' }), 3000);
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      setStatus({ loading: false, message: '❌ Please enter a valid email', type: 'error' });
      setTimeout(() => setStatus({ loading: false, message: '', type: '' }), 3000);
      return;
    }

    if (!formData.subject.trim()) {
      setStatus({ loading: false, message: '❌ Please enter a subject', type: 'error' });
      setTimeout(() => setStatus({ loading: false, message: '', type: '' }), 3000);
      return;
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      setStatus({ loading: false, message: '❌ Please enter a message (at least 10 characters)', type: 'error' });
      setTimeout(() => setStatus({ loading: false, message: '', type: '' }), 3000);
      return;
    }

    try {
      await sendSupportEmails(formData);
      
      setStatus({ 
        loading: false, 
        message: '✅ Message sent! We\'ll respond within 24 hours.', 
        type: 'success' 
      });

      // Reset form after 2 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setStatus({ loading: false, message: '', type: '' });
        onClose();
      }, 2000);

    } catch (error) {
      console.error('Support form error:', error);
      setStatus({ 
        loading: false, 
        message: '⚠️ Failed to send. Please email token@ptdt.taxi directly.', 
        type: 'error' 
      });
      setTimeout(() => setStatus({ loading: false, message: '', type: '' }), 5000);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-[999] px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          onClick={(e) => e.stopPropagation()}
          className="relative bg-white rounded-2xl w-full max-w-2xl border border-gray-300 shadow-2xl max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white flex items-center justify-center z-10 shadow-lg border-2 border-pink-300"
          >
            <X size={20} />
          </motion.button>

          {/* Content */}
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-pink-500 mb-2">Contact Support</h2>
              <p className="text-gray-600">We're here to help! Send us a message and we'll respond within 24 hours.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  disabled={status.loading}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-gray-50 text-gray-900"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  disabled={status.loading}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-gray-50 text-gray-900"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  disabled={status.loading}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-gray-50 text-gray-900"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us what you need help with..."
                  rows="6"
                  disabled={status.loading}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all bg-gray-50 text-gray-900 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status.loading}
                className="w-full py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {status.loading ? 'SENDING...' : 'SEND MESSAGE'}
              </button>

              {/* Status Message */}
              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg text-center font-medium ${
                    status.type === 'success' 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}
                >
                  {status.message}
                </motion.div>
              )}
            </form>

            {/* Footer */}
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Prefer email? Contact us directly at{' '}
                <a href="mailto:token@ptdt.taxi" className="text-pink-500 font-semibold hover:underline">
                  token@ptdt.taxi
                </a>
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}