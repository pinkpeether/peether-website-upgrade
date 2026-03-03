import { motion } from "framer-motion";
import { Award, Globe, Users, Sparkles, TrendingUp, Heart } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Legacy() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    
    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();

    const particles = [];
    const colors = ["rgba(251, 10, 139, 0.25)", "rgba(0, 226, 110, 0.3)"]; // Pink + Green with opacity

    // Create 80 particles
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 4 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        dx: Math.random() * 0.6 - 0.3,
        dy: Math.random() * 0.6 - 0.3,
      });
    }

    let rafId;
    const animate = () => {
      // Fill with white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw particles
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.fill();
        
        // Move particles
        p.x += p.dx;
        p.y += p.dy;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      });
      
      rafId = requestAnimationFrame(animate);
    };
    animate();

    const onResize = () => setSize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const achievements = [
    {
      icon: <Globe className="text-pink-500" size={32} />,
      number: "10+",
      label: "Countries Worldwide",
      description: "Operating across continents"
    },
    {
      icon: <Users className="text-emerald-500" size={32} />,
      number: "3000+",
      label: "Women Empowered",
      description: "Drivers & passengers served"
    },
    {
      icon: <Award className="text-pink-500" size={32} />,
      number: "19",
      label: "Years of Trust",
      description: "Since 2006"
    },
    {
      icon: <Heart className="text-emerald-500" size={32} />,
      number: "100%",
      label: "Safety Record",
      description: "Commitment to women's safety"
    }
  ];

  const timeline = [
    { year: "2006", event: "Pink Taxi Founded", description: "First women-only taxi service launched", color: "pink" },
    { year: "2010", event: "Regional Expansion", description: "Expanded to 5 countries across Asia & Middle East", color: "green" },
    { year: "2015", event: "Global Recognition", description: "International media coverage & women's safety awards", color: "pink" },
    { year: "2020", event: "Digital Transformation", description: "Launched mobile booking & digital payment systems", color: "green" },
    { year: "2025", event: "Blockchain Revolution", description: "PTDT token launch - The future begins", color: "pink" }
  ];

  return (
    <section id="legacy" className="relative z-10 py-24 px-6 md:px-12 scroll-mt-[85px]">
      {/* Animated dots background */}
      <canvas 
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{ pointerEvents: 'none' }}
      />

      {/* Add Google Fonts and shimmer animation */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Lexend:wght@100;200;300;400;500&display=swap');
        
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
        
        .font-lexend {
          font-family: 'Lexend', sans-serif;
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 
            className="font-montserrat text-4xl md:text-5xl font-bold mb-3"
            style={{ color: '#FB0A8B', letterSpacing: '-0.035em' }}
          >
            Our Legacy
          </h2>
          <p className="font-lexend text-xl text-gray-700 max-w-3xl mx-auto" style={{ fontWeight: 300 }}>
            19 years of empowering women, one ride at a time
          </p>
        </motion.div>

        {/* Achievement Stats - Moved up since Pink Taxi Story is removed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border border-pink-300/30 shadow-lg hover:border-pink-400/50 transition-all text-center hover:scale-105 hover:shadow-xl"
              >
                <div className="flex justify-center mb-3">
                  {achievement.icon}
                </div>
                <div className="font-montserrat text-3xl font-bold text-gray-800 mb-1">
                  {achievement.number}
                </div>
                <div className="font-lexend text-sm font-semibold text-gray-700 mb-1" style={{ fontWeight: 400 }}>
                  {achievement.label}
                </div>
                <div className="font-lexend text-xs text-gray-500" style={{ fontWeight: 300 }}>
                  {achievement.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Section - LIGHT GREY METALLIC WITH COLORED TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 className="font-montserrat text-3xl font-bold text-center mb-12 text-gray-800 tracking-tight">
            Our Journey Through Time
          </h3>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-pink-400 via-emerald-400 to-pink-400 opacity-30"></div>
            
            {/* Timeline Events - LIGHT GREY METALLIC STYLE */}
            <div className="space-y-0.5">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ 
                    opacity: 0,
                    x: 0,
                    scale: 0.8
                  }}
                  whileInView={{ 
                    opacity: 1,
                    x: 0,
                    scale: 1
                  }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.8,
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  className={`flex items-center gap-4 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  {/* Animated Content Block */}
                  <motion.div 
                    className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}
                    initial={{
                      x: index % 2 === 0 ? "50%" : "-50%",
                    }}
                    whileInView={{
                      x: 0,
                    }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 80,
                      damping: 20
                    }}
                  >
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="relative rounded-2xl shadow-xl transition-all overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200"
                      style={{
                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255,255,255,0.5)",
                      }}
                    >
                      {/* Metallic shine effect */}
                      <div 
                        className="absolute inset-0 opacity-30"
                        style={{
                          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.8) 50%, transparent 60%)",
                          animation: "shimmer 3s infinite",
                        }}
                      />
                      
                      {/* Content */}
                      <div className="relative z-10 p-6">
                        <div 
                          className={`font-montserrat text-2xl font-bold mb-2 ${
                            item.color === "pink" ? "text-pink-500" : "text-emerald-500"
                          }`}
                        >
                          {item.year}
                        </div>
                        <div className="font-montserrat text-xl font-semibold text-gray-600 mb-2">
                          {item.event}
                        </div>
                        <div className="font-lexend text-black" style={{ fontWeight: 300 }}>
                          {item.description}
                        </div>
                      </div>

                      {/* Glass effect overlay */}
                      <div 
                        className="absolute inset-0 rounded-2xl"
                        style={{
                          background: "linear-gradient(180deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.05) 100%)",
                          pointerEvents: "none"
                        }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Center Dot */}
                  <motion.div 
                    className="relative z-20 hidden lg:flex"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.2 + 0.3,
                      type: "spring",
                      stiffness: 200
                    }}
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                      className={`w-8 h-8 ${
                        item.color === "pink" ? "bg-pink-500" : "bg-emerald-500"
                      } rounded-full border-4 border-white shadow-lg`}
                    />
                  </motion.div>

                  {/* Spacer */}
                  <div className="hidden lg:block flex-1"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
