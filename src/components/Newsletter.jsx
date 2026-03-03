import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sendNewsletterEmails } from '../services/brevoService';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ loading: false, message: '', type: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: '', type: '' });

    // Validation
    if (!email.trim() || !email.includes('@')) {
      setStatus({ 
        loading: false, 
        message: '❌ Please enter a valid email address', 
        type: 'error' 
      });
      setTimeout(() => setStatus({ loading: false, message: '', type: '' }), 3000);
      return;
    }

    try {
      await sendNewsletterEmails({ email });
      
      setStatus({ 
        loading: false, 
        message: '🎉 Subscribed! Check your email for confirmation.', 
        type: 'success' 
      });

      // Reset form after 3 seconds
      setTimeout(() => {
        setEmail('');
        setStatus({ loading: false, message: '', type: '' });
      }, 3000);

    } catch (error) {
      console.error('Newsletter subscription error:', error);
      setStatus({ 
        loading: false, 
        message: '⚠️ Subscription failed. Please try again.', 
        type: 'error' 
      });
      setTimeout(() => setStatus({ loading: false, message: '', type: '' }), 4000);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          disabled={status.loading}
          className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-200 bg-white text-gray-900 placeholder-gray-500 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <motion.button
          type="submit"
          disabled={status.loading}
          whileHover={{ scale: status.loading ? 1 : 1.05 }}
          whileTap={{ scale: status.loading ? 1 : 0.95 }}
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-lg hover:from-pink-600 hover:to-purple-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg whitespace-nowrap"
        >
          {status.loading ? 'SUBSCRIBING...' : 'SUBSCRIBE'}
        </motion.button>
      </form>

      {/* Status Message */}
      {status.message && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-4 p-3 rounded-lg text-center font-medium text-sm ${
            status.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {status.message}
        </motion.div>
      )}
    </div>
  );
}