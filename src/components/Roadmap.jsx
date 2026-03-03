import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Ensure you have lucide-react installed or use any SVG icon

// --- Data moved outside component for optimization ---
const ROADMAP_DATA = [
  {
    phase: "Phase 1",
    timeframe: "Q1 2025 (Oct-Dec 2025)",
    title: "Foundation & Launch",
    status: "in-progress",
    milestones: [
      "Smart contract development & audit",
      "Website & brand identity launch",
      "Whitepaper release",
      "Community building & social media",
      "Private sale launch",
      "Early investor onboarding"
    ]
  },
  {
    phase: "Phase 2",
    timeframe: "Q2 2025 (Jan-Mar 2026)",
    title: "Token Sale & Exchange",
    status: "upcoming",
    milestones: [
      "Complete private sale round",
      "PancakeSwap DEX listing",
      "Liquidity pool establishment",
      "CoinMarketCap & CoinGecko listing",
      "First CEX partnership announcement",
      "Marketing campaign launch"
    ]
  },
  {
    phase: "Phase 3",
    timeframe: "Q3 2025 (Apr-Jun 2026)",
    title: "Ecosystem Expansion",
    status: "upcoming",
    milestones: [
      "Mobile app beta launch (iOS & Android)",
      "Driver onboarding program rollout",
      "Integration with existing Pink Taxi ops",
      "Referral & bounty program activation",
      "Strategic ride-sharing partnerships",
      "Additional CEX listings (Tier 2)"
    ]
  },
  {
    phase: "Phase 4",
    timeframe: "Q4 2025 (Jul-Sep 2026)",
    title: "Global Scaling",
    status: "upcoming",
    milestones: [
      "Expansion to 5 new countries",
      "Pink Miles loyalty program launch",
      "Major CEX listing (Binance/Gate.io)",
      "Women's organizations partnership",
      "Enhanced security features & audits",
      "Community governance framework"
    ]
  },
  {
    phase: "Phase 5",
    timeframe: "2026 & Beyond (Oct 2026+)",
    title: "Innovation & Sustainability",
    status: "upcoming",
    milestones: [
      "AI-powered safety features",
      "Multi-chain expansion",
      "DAO governance implementation",
      "NFT driver achievements",
      "Carbon-neutral fleet initiative",
      "Global brand recognition"
    ]
  }
];

export default function Roadmap() {
  const canvasRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // --- Canvas Background Logic ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    let rafId;
    
    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      color: Math.random() > 0.5 ? "rgba(251, 10, 139, 0.15)" : "rgba(0, 226, 110, 0.15)",
      dx: Math.random() * 0.5 - 0.25,
      dy: Math.random() * 0.5 - 0.25,
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        p.x += p.dx;
        p.y += p.dy;
        
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      
      rafId = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("resize", setSize);
    return () => {
      window.removeEventListener("resize", setSize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // --- Carousel Logic ---
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === ROADMAP_DATA.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? ROADMAP_DATA.length - 1 : prev - 1));
  };

  // --- Animation Variants ---
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  // Helper to get status styling
  const getStatusStyle = (status) => {
    switch(status) {
      case 'completed': return { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Completed' };
      case 'in-progress': return { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'In Progress' };
      default: return { bg: 'bg-gray-100', text: 'text-gray-600', label: 'Upcoming' };
    }
  };

  const currentData = ROADMAP_DATA[currentIndex];
  const statusStyle = getStatusStyle(currentData.status);

  return (
    <section id="roadmap" className="relative z-10 py-24 px-6 md:px-12 scroll-mt-[85px]">
      {/* Canvas Background */}
      <canvas 
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{ pointerEvents: 'none' }}
      />

      {/* Fonts */}
      <style>{`  // ✅ CORRECT - Remove jsx attribute
  @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&family=Lexend:wght@300;400;500&display=swap');
  .font-montserrat { font-family: 'Montserrat', sans-serif; }
  .font-lexend { font-family: 'Lexend', sans-serif; }
`}</style>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
        <motion.div>
  <h2 className="font-montserrat text-4xl md:text-5xl font-bold mb-2" style={{ color: '#FB0A8B' }}>
    Roadmap
  </h2>
</motion.div>
          <p className="font-lexend text-xl text-gray-600 font-light">
            Building the future of safe transportation, one milestone at a time.
          </p>
        </div>

        {/* Main Slider Container */}
        <div 
          className="relative max-w-4xl mx-auto min-h-[450px] md:min-h-[400px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Navigation Arrows */}
          <button 
            onClick={prevSlide}
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 z-20 p-3 bg-white rounded-full shadow-lg text-pink-300 hover:text-[#FB0A8B] hover:scale-110 transition-all border border-gray-100"
            aria-label="Previous Slide"
          >
            <ChevronLeft size={32} />
          </button>

          <button 
            onClick={nextSlide}
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 z-20 p-3 bg-white rounded-full shadow-lg text-pink-300 hover:text-[#FB0A8B] hover:scale-110 transition-all border border-gray-100"
            aria-label="Next Slide"
          >
            <ChevronRight size={32} />
          </button>

          {/* Card Content */}
          <div className="w-full h-full flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full bg-white/80 backdrop-blur-md border border-white/50 rounded-3xl shadow-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 items-start"
              >
                {/* Left Column: Header Info */}
                <div className="w-full md:w-2/5 flex flex-col h-full border-b md:border-b-0 md:border-r border-gray-200 pb-6 md:pb-0 md:pr-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-montserrat font-bold text-[#FB0A8B] text-lg">
                      {currentData.phase}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${statusStyle.bg} ${statusStyle.text}`}>
                      {statusStyle.label}
                    </span>
                  </div>
                  
                  <h3 className="font-montserrat text-3xl md:text-4xl font-extrabold text-gray-400 mb-2 leading-tight">
                    {currentData.title}
                  </h3>
                  
                  <p className="font-lexend text-lg text-gray-500 font-medium mb-6">
                    {currentData.timeframe}
                  </p>

                  {/* Decorative Progress Bar for Visuals */}
                  <div className="mt-auto">
                    <div className="text-xs text-gray-400 mb-1 font-lexend uppercase tracking-wider">Phase Completion</div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${currentData.status === 'completed' ? 'bg-emerald-500 w-full' : currentData.status === 'in-progress' ? 'bg-[#FB0A8B] w-1/2 animate-pulse' : 'bg-gray-300 w-0'}`}
                      />
                    </div>
                  </div>
                </div>

                {/* Right Column: Milestones */}
                <div className="w-full md:w-3/5">
                  <ul className="space-y-4">
                    {currentData.milestones.map((milestone, idx) => (
                      <motion.li 
                        key={idx}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + (idx * 0.05) }}
                        className="flex items-start gap-3"
                      >
                        <span className={`mt-1.5 min-w-[10px] h-2.5 rounded-full ${
                          currentData.status === 'completed' ? 'bg-emerald-500' : 
                          currentData.status === 'in-progress' && idx < 3 ? 'bg-[#FB0A8B]' : 'bg-gray-300'
                        }`} />
                        <span className="font-lexend text-lg text-gray-700 leading-relaxed">
                          {milestone}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-3 mt-10">
          {ROADMAP_DATA.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-[#FB0A8B]" : "w-3 bg-gray-300 hover:bg-[#FB0A8B]/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}