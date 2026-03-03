import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Participate({ 
  isAuthenticated,
  user,
}) {
  const canvasRef = useRef(null);

  // Canvas particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    setSize();

    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 3 + 1,
      color: Math.random() > 0.5 ? "rgba(251, 10, 139, 0.15)" : "rgba(16, 185, 129, 0.15)",
      dx: Math.random() * 0.5 - 0.25,
      dy: Math.random() * 0.5 - 0.25,
    }));

    let rafId;
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

  return (
    <section id="participate" className="relative z-10 py-24 px-6 md:px-12 scroll-mt-[85px]">
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold mb-3 text-[#FB0A8B]">
            Join the Revolution
          </h2>
          <p className="font-lexend text-lg text-gray-600 max-w-2xl mx-auto">
            Secure your Peether PTDT tokens. The bigger you buy, the more you save.
          </p>
          
          {isAuthenticated && user && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium"
            >
              <span>✅</span>
              <span>Welcome back, {user.fullName?.split(' ')[0]}!</span>
            </motion.div>
          )}
        </div>

        {/* CTA for joining */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <a
            href="https://dapp.ptdt.taxi"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 text-white font-montserrat font-bold text-lg rounded-full shadow-[0_0_30px_rgba(236,72,153,0.5)] hover:shadow-[0_0_50px_rgba(236,72,153,0.8)] hover:scale-105 transition-all no-underline"
          >
            🚀 Launch DApp
          </a>
          <p className="mt-6 text-sm text-gray-500 font-lexend">
            Connect your wallet and start earning with Peether PTDT.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
