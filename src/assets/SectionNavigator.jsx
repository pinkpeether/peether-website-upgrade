import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function SectionNavigator({ hideWhenModalOpen = false }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [showNav, setShowNav] = useState(false);

  const sections = [
    'hero',
    'about',
    'live-dashboard',
    'tokenomics',
    'staking',
    'roadmap',
    'smart-contracts',
    'legacy',
    'gallery',
    'ecosystem',
    'participate',
    'faq'
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowNav(window.scrollY > 300);
      
      // Improved section detection
      const scrollPos = window.scrollY + 150;
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = window.scrollY + rect.top;
          
          if (scrollPos >= elementTop - 100) {
            setCurrentSection(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (!element) return;
    
    if (sectionId === 'hero') {
      const videoElement = document.getElementById('video');
      if (videoElement) {
        window.scrollTo({ top: videoElement.offsetHeight, behavior: 'smooth' });
      }
    } else {
      const yOffset = -72;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const navigateUp = () => {
    if (currentSection > 0) {
      scrollToSection(sections[currentSection - 1]);
    }
  };

  const navigateDown = () => {
    if (currentSection < sections.length - 1) {
      scrollToSection(sections[currentSection + 1]);
    }
  };

return (
  <AnimatePresence>
    {showNav && !hideWhenModalOpen && (

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-28 right-6 z-[9999] flex flex-col gap-2"
        >
          <motion.button
            onClick={navigateUp}
            disabled={currentSection === 0}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-12 h-12 rounded-full backdrop-blur-sm border-2 flex items-center justify-center transition-all ${
              currentSection === 0 
                ? 'bg-gray-100/80 border-gray-200/50 opacity-50 cursor-not-allowed shadow-sm' 
                : 'bg-gradient-to-br from-pink-50/90 to-white/90 border-pink-200/50 hover:border-pink-300 hover:from-pink-100/90 hover:to-pink-50/90 shadow-lg hover:shadow-pink-200/30'
            }`}
          >
            <ChevronUp 
              className={currentSection === 0 ? 'text-gray-400' : 'text-pink-500'} 
              size={24} 
            />
          </motion.button>

          <div className="flex flex-col items-center gap-1.5 py-2 px-3 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-gray-200/50">
            {sections.map((_, index) => (
              <motion.div
                key={index}
                animate={{
                  scale: currentSection === index ? 1.3 : 1,
                  opacity: currentSection === index ? 1 : 0.5
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSection === index 
                    ? 'bg-gradient-to-r from-pink-400 to-pink-500 shadow-sm shadow-pink-300/50' 
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <motion.button
            onClick={navigateDown}
            disabled={currentSection === sections.length - 1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`w-12 h-12 rounded-full backdrop-blur-sm border-2 flex items-center justify-center transition-all ${
              currentSection === sections.length - 1 
                ? 'bg-gray-100/80 border-gray-200/50 opacity-50 cursor-not-allowed shadow-sm' 
                : 'bg-gradient-to-br from-emerald-50/90 to-white/90 border-emerald-200/50 hover:border-emerald-300 hover:from-emerald-100/90 hover:to-emerald-50/90 shadow-lg hover:shadow-emerald-200/30'
            }`}
          >
            <ChevronDown 
              className={currentSection === sections.length - 1 ? 'text-gray-400' : 'text-emerald-500'} 
              size={24} 
            />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}