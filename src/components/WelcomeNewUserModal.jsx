import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const WelcomeNewUserModal = ({ isOpen, onClose, userData, onOpenAccount }) => {
  // Trigger confetti on mount
  useEffect(() => {
    if (isOpen) {
      // Multiple confetti bursts
      const duration = 3000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 10000 };

      function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
      }

      const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Use portal to render at document.body level (outside all other modals)
  return createPortal(
    <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="relative rounded-[24px] w-full max-w-lg p-[6px]"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: `
            0 0 40px rgba(255, 255, 255, 0.6),
                0 0 60px rgba(255, 255, 255, 0.4),
                0 25px 60px rgba(0, 0, 0, 0.4),
                inset 0 2px 6px rgba(255, 255, 255, 0.9),
                inset 2px 0 6px rgba(255, 255, 255, 0.5),
                inset 0 -2px 6px rgba(0, 0, 0, 0.08),
                inset -2px 0 6px rgba(0, 0, 0, 0.05),
                0 0 0 1px rgba(75, 85, 99, 0.2)
          `,
        }}
      >
        <div className="relative bg-white rounded-[18px] w-full shadow-2xl p-8">
          {/* Close Button */}
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white flex items-center justify-center shadow-lg border-2 border-pink-300 z-10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>

          {/* Celebration Icon with Glow */}
          <div className="relative flex justify-center mb-6">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
              className="relative"
            >
              {/* Outer Glow Rings */}
              <motion.div
                className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 via-purple-500 to-pink-400 blur-2xl opacity-60"
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 0.8, 0.6],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              
              {/* Main Circle */}
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-pink-500 via-purple-600 to-pink-600 flex items-center justify-center shadow-[0_0_60px_rgba(236,72,153,0.6)]">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, delay: 0.5, repeat: 3 }}
                  className="text-6xl"
                >
                  🎉
                </motion.div>
              </div>

              {/* Floating Sparkles */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-2xl"
                  style={{
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    y: [-20, -40],
                  }}
                  transition={{ 
                    duration: 2,
                    delay: 0.5 + i * 0.2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  ✨
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center font-montserrat text-4xl font-bold mb-2"
          >
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome to PTDT!
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center font-lexend text-lg text-gray-600 mb-8"
          >
            Your journey with Peether Token starts now! 🚀
          </motion.p>

          {/* Success Info Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4 mb-8"
          >
            {/* Account Created Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-200">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-montserrat font-bold text-gray-800 text-base">Account Created!</p>
                <p className="font-lexend text-sm text-gray-600">You're officially part of the PTDT family</p>
              </div>
            </div>

            {/* Email Confirmation Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
                <span className="text-3xl">📧</span>
              </div>
              <div className="flex-1">
                <p className="font-montserrat font-bold text-gray-800 text-base">Check Your Email</p>
                <p className="font-lexend text-xs text-gray-600 truncate">{userData?.email}</p>
              </div>
            </div>

            {/* Token Sale Access Card */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 border-2 border-pink-200">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
                <span className="text-3xl">💎</span>
              </div>
              <div className="flex-1">
                <p className="font-montserrat font-bold text-gray-800 text-base">Ready to Participate!</p>
                <p className="font-lexend text-sm text-gray-600">Access the private token sale now</p>
              </div>
            </div>
          </motion.div>

          {/* Action Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            onClick={onOpenAccount || onClose}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-purple-600 to-pink-500 text-white font-montserrat font-bold text-lg shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:shadow-[0_0_40px_rgba(236,72,153,0.7)] transition-all relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Go to My Account</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </motion.button>

          {/* Footer Note */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center font-lexend text-xs text-gray-400 mt-6"
          >
            Ready to explore? Check your dashboard for next steps! ✨
          </motion.p>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default WelcomeNewUserModal;