import { motion, AnimatePresence } from "framer-motion";
import { Rocket } from "lucide-react";
import { useState, useEffect } from "react";

export default function FloatingDAppButton() {
  const [showFAB, setShowFAB] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show FAB after scrolling down 400px
      setShowFAB(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showFAB && (
        <motion.a
          href="https://dapp.ptdt.taxi"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-24 right-8 z-40 group"
          title="Launch DApp"
        >
          {/* Main button */}
          <div className="relative">
            {/* Pulsing glow effect */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur-xl"
            />
            
            {/* Button content */}
            <div className="relative flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 text-white rounded-full font-montserrat font-bold shadow-2xl hover:shadow-pink-500/50 transition-all">
              <span className="hidden sm:inline">Launch DApp</span>
              <motion.div
                animate={{ rotate: [0, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Rocket size={20} />
              </motion.div>
            </div>

            {/* Sparkle effect on hover */}
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
              initial={{ scale: 0 }}
              whileHover={{ scale: 1 }}
            >
              <span className="absolute inset-0 bg-yellow-300 rounded-full animate-ping" />
            </motion.div>
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  );
}