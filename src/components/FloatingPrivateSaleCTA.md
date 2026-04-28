import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RotateCcw } from "lucide-react";

export default function FloatingPrivateSaleCTA({ hideWhenModalOpen = false }) {

  // State management
  const [isDragging, setIsDragging] = useState(false);
  const [isParked, setIsParked] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showCTA, setShowCTA] = useState(true);
  
  const desktopRef = useRef(null);

  // Scroll to Participate section
  const scrollToParticipate = () => {
    if (isDragging) return; // Don't scroll if dragging
    
    const participateSection = document.getElementById('participate');
    if (participateSection) {
      participateSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Resume floating animation
  const resumeFloating = (e) => {
    e.stopPropagation();
    setIsParked(false);
    setPosition({ x: 0, y: 0 });
  };

  // Desktop Mouse Events
  const handleMouseDown = (e) => {
    e.preventDefault();
    setIsDragging(true);
    setIsParked(true);
    
    const rect = desktopRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragOffset.x - window.innerWidth + desktopRef.current.offsetWidth + 32;
    const newY = e.clientY - dragOffset.y - (window.innerHeight * 0.35);
    
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Global event listeners (Desktop only now)
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <AnimatePresence>
      {showCTA && !hideWhenModalOpen && (
        <>
          {/* Desktop View ONLY - Floating/Draggable circular badge */}
          <motion.div
            ref={desktopRef}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: isParked ? [position.y, position.y - 15, position.y, position.y - 10, position.y] : [0, -15, 0, -10, 0],
              x: isParked ? [position.x, position.x + 8, position.x, position.x - 8, position.x] : [0, 8, 0, -8, 0],
            }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
              y: { 
                repeat: Infinity, 
                duration: 6,
                ease: "easeInOut" 
              },
              x: { 
                repeat: Infinity, 
                duration: 8,
                ease: "easeInOut" 
              }
            }}
            className="fixed right-8 top-[35%] z-[9997] hidden lg:block"
            style={{ 
              width: '90px', 
              height: '90px',
              cursor: isDragging ? 'grabbing' : 'grab'
            }}
            onMouseDown={handleMouseDown}
          >
            <motion.button
              onClick={scrollToParticipate}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-full h-full group"
              style={{ pointerEvents: isDragging ? 'none' : 'auto' }}
            >
              {/* Pulsing glow ring */}
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 0, 0.6]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-500 to-emerald-400"
              />

              {/* Main circular badge */}
              <div className={`relative w-full h-full rounded-full bg-gradient-to-br from-pink-500 via-purple-500 to-emerald-400 shadow-2xl shadow-pink-500/50 flex flex-col items-center justify-center p-2 border-4 ${
                isParked ? 'border-yellow-300/60' : 'border-white/20'
              }`}>
                
                {/* Rotating sparkle */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    ease: "linear"
                  }}
                  className="absolute -top-2 -right-2"
                >
                  <Sparkles className="text-yellow-300" size={20} fill="currentColor" />
                </motion.div>

                {/* 50% OFF */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5
                  }}
                  className="text-white font-black text-lg leading-none mb-0.5"
                >
                  50%
                </motion.div>
                <div className="text-white font-black text-xs leading-none mb-1">OFF</div>
                
                {/* Divider line */}
                <div className="w-10 h-0.5 bg-white/40 mb-1"></div>
                
                {/* JOIN NOW */}
                <div className="text-white font-bold text-xs leading-tight text-center">
                  JOIN<br/>NOW
                </div>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-full"></div>
            </motion.button>

            {/* Reset Button - Only visible when parked */}
            {isParked && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={resumeFloating}
                className="absolute -left-10 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-emerald-400 to-blue-500 shadow-lg flex items-center justify-center hover:scale-110 transition-transform border-2 border-white/30"
                title="Resume floating"
              >
                <RotateCcw size={14} className="text-white" />
              </motion.button>
            )}
          </motion.div>

          {/* ❌ MOBILE VIEW REMOVED - No more floating CTA on mobile! */}

          {/* Custom Tooltip - Desktop only */}
          <style>{`
            @media (min-width: 1024px) {
              .fixed.right-8:hover::after {
                content: "✋ Move Me (Drag to Reposition)";
                position: absolute;
                bottom: -35px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(to right, rgba(236, 72, 153, 0.95), rgba(16, 185, 129, 0.95));
                color: white;
                padding: 6px 12px;
                border-radius: 8px;
                font-size: 11px;
                font-weight: 600;
                white-space: nowrap;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                animation: fadeIn 0.3s ease;
                pointer-events: none;
                z-index: 10000;
              }
            }
            
            @keyframes fadeIn {
              from { opacity: 0; transform: translateX(-50%) translateY(-5px); }
              to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}