import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import ParticleCanvas from "./ParticleCanvas";

export default function Tokenomics() {
  const [hoveredSegment, setHoveredSegment] = useState(null);
  const canvasRef = useRef(null);

  const tokenInfo = [
    { label: "Name", value: "Peether", color: "pink" },
    { label: "Symbol", value: "PTDT", color: "green" },
    { label: "Total Supply", value: "100,000", color: "pink" },
    { label: "Network/Standard", value: "BSC/BEP-20", color: "green" },
  ];

  // Token Distribution Data
  const tokenDistribution = [
    { category: "Private Sale", percentage: 5, tokens: "5,000", purpose: "Early supporter allocation", color: "#ec4899" },
    { category: "Liquidity Pool", percentage: 5, tokens: "5,000", purpose: "DEX liquidity provision", color: "#10b981" },
    { category: "Team Allocation", percentage: 15, tokens: "15,000", purpose: "Core team compensation", color: "#a855f7" },
    { category: "IT & Development", percentage: 25, tokens: "25,000", purpose: "Technical infrastructure & R&D", color: "#3b82f6" },
{ category: "Advisor & Legal", percentage: 15, tokens: "15,000", purpose: "Strategic advisors & compliance", color: "#f59e0b" },  
    { category: "Marketing & Bounty", percentage: 10, tokens: "10,000", purpose: "Brand awareness & campaigns", color: "#ef4444" },
    { category: "Referral Program", percentage: 5, tokens: "5,000", purpose: "Community referral incentives", color: "#14b8a6" },
    { category: "Reserve / Treasury", percentage: 12, tokens: "12,000", purpose: "Strategic reserves & partnerships", color: "#8b5cf6" },
    { category: "Community Growth", percentage: 8, tokens: "8,000", purpose: "Ecosystem development initiatives", color: "#06b6d4" }
  ];

  // Calculate SVG donut chart segments
  const generateDonutSegments = () => {
    const radius = 95;
    const innerRadius = 60;
    const centerX = 120;
    const centerY = 120;
    
    let currentAngle = -90;
    
    return tokenDistribution.map((item, index) => {
      const angle = (item.percentage / 100) * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      
      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);
      
      const x3 = centerX + innerRadius * Math.cos(endRad);
      const y3 = centerY + innerRadius * Math.sin(endRad);
      const x4 = centerX + innerRadius * Math.cos(startRad);
      const y4 = centerY + innerRadius * Math.sin(startRad);
      
      const largeArc = angle > 180 ? 1 : 0;
      
      const pathData = [
        `M ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
        `L ${x3} ${y3}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}`,
        'Z'
      ].join(' ');
      
      currentAngle = endAngle;
      
      return {
        pathData,
        ...item,
        index
      };
    });
  };

  const donutSegments = generateDonutSegments();

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

    // Create 60 particles
    for (let i = 0; i < 60; i++) {
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

return (
  <section id="tokenomics" className="relative z-10 py-24 px-6 md:px-12 scroll-mt-[85px]">
      {/* Animated dots background */}
      <canvas 
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{ pointerEvents: 'none' }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-5"
        >
          <h2 
            className="font-montserrat text-4xl md:text-5xl font-bold mb-2"
            style={{ color: '#FB0A8B', letterSpacing: '-0.035em' }}
          >
            Tokenomics
          </h2>
          <p className="font-lexend text-xl text-gray-700" style={{ fontWeight: 300 }}>
            PTDT Token Economics & Utility
          </p>
        </motion.div>

        {/* Token Information Cards - NO ANIMATIONS (as per requirements) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16 justify-center"
        >
          {tokenInfo.map((item, i) => (
            <div
              key={i}
              className={`relative py-4 px-5 rounded-2xl shadow-xl transition-all hover:scale-105 text-center overflow-hidden 
  ${item.color === "green"
    ? "bg-transparent border border-emerald-500/40"
    : "bg-transparent border border-pink-400/40"
  }`}
              style={{

              }}
            >
              {/* Content */}
              <div className="relative z-10">
                <div className="font-lexend text-sm font-semibold text-gray-400 mb-2" style={{ fontWeight: 400 }}>
                  {item.label}
                </div>
                <div className="font-montserrat text-2xl font-bold text-gray-400 drop-shadow-lg">
                  {item.value}
                </div>
              </div>

              {/* Glass effect overlay */}
              <div 
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: "linear-gradient(180deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)",
                  pointerEvents: "none"
                }}
              />
            </div>
          ))}
        </motion.div>

        {/* REMOVED: Token Utility & Benefits Section (as per requirements) */}

        {/* Token Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h3 
            className="font-montserrat text-3xl font-bold text-center mb-0"
            style={{ color: '#7e7e7eff', letterSpacing: '-0.025em' }}
          >
            Peether PTDT | Token Distribution
          </h3>
          
          <div className="flex flex-col items-center justify-center gap-1 -mt-6">
            
            {/* Donut Chart */}
            <motion.div 
              className="relative flex-shrink-0"
              whileInView={{ rotate: 360 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <svg width="380" height="380" viewBox="0 0 240 240" className="transform -rotate-90">
                {donutSegments.map((segment, index) => (
                  <motion.path
                    key={index}
                    d={segment.pathData}
                    fill={segment.color}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: index * 0.1,
                      duration: 0.5,
                      type: "spring"
                    }}
                    onMouseEnter={() => setHoveredSegment(index)}
                    onMouseLeave={() => setHoveredSegment(null)}
                    className="cursor-pointer transition-all"
                    style={{
                      filter: hoveredSegment === index ? 'brightness(1.3)' : 'brightness(1)',
                      transformOrigin: 'center',
                      transform: hoveredSegment === index ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                ))}
                
                {/* Center Circle */}
                <circle cx="120" cy="120" r="55" fill="#ffffff" stroke="#f0f0f0" strokeWidth="1" />
                <text 
                  x="120" 
                  y="115"
                  textAnchor="middle" 
                  className="fill-emerald-500 font-bold font-montserrat"
                  style={{ fontSize: '24px', transform: 'rotate(90deg)', transformOrigin: 'center' }}
                >
                  100K
                </text>
                <text 
                  x="120" 
                  y="135" 
                  textAnchor="middle" 
                  className="fill-gray-600 text-sm font-lexend"
                  style={{ fontSize: '14px', transform: 'rotate(90deg)', transformOrigin: 'center' }}
                >
                  Total Supply
                </text>
              </svg>
            </motion.div>

            {/* Legend Grid - ALWAYS VISIBLE TEXT (no hover required, as per requirements) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 w-full max-w-4xl mx-auto px-4">
              {tokenDistribution.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03 }}
                  onMouseEnter={() => setHoveredSegment(index)}
                  onMouseLeave={() => setHoveredSegment(null)}
                  className={`p-4 rounded-lg transition-all cursor-pointer border ${
                    hoveredSegment === index 
                      ? 'bg-gray-50 shadow-md scale-102 border-gray-300' 
                      : 'bg-white/80 hover:bg-gray-50/50 border-gray-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="w-5 h-5 rounded-full flex-shrink-0 shadow-md mt-0.5"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="flex-1">
                      {/* Headline - Always Visible */}
                      <div className="font-montserrat text-gray-800 font-bold text-base mb-1">
                        {item.category}
                      </div>
                      {/* Percentage & Tokens - Always Visible */}
                      <div className="font-lexend text-gray-600 text-sm mb-2">
                        <span className="font-semibold text-pink-600">{item.percentage}%</span> • {item.tokens} tokens
                      </div>
                      {/* Purpose/Description - ALWAYS VISIBLE (no hover needed) */}
                      <div className="font-lexend text-gray-600 text-sm leading-relaxed">
                        {item.purpose}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="mt-3 text-center">
            <p className="font-lexend text-gray-500 text-sm" style={{ fontWeight: 300 }}>
              Fixed supply • No additional minting • 100% transparent allocation
            </p>
          </div>
        </motion.div>

        {/* Transaction Benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="-mt-8 text-center bg-gradient-to-r from-transparent via-gray-300/30 to-transparent rounded-2xl p-8 border border-gray-200/30 shadow-lg"
        >
          <h4 className="font-montserrat text-3xl font-bold mb-1 text-pink-500">
            Why Peether's PTDT Tokens?
          </h4>
          <p className="font-lexend text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed" style={{ fontWeight: 300 }}>
            Peether's PTDT tokens serve as the sole payment method for transactions within the Pink Taxi ecosystem, ensuring faster, more reliable, and secure payments. Built on Binance Smart Chain for maximum efficiency and minimal fees.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
