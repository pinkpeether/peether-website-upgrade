import { motion } from "framer-motion";
import { ArrowRight, Rocket, ShieldCheck, ExternalLink } from "lucide-react";
import PTDTShowcase from "./PTDTShowcase";
import SloganAnimation from "./SloganAnimation";
import ParticleCanvas from "./ParticleCanvas";
import { generateAuthToken } from "../utils/authToken";
import { supabase } from "../lib/supabase";

export default function Hero() {
  // ========== DApp Click Handler (Supabase Version) ==========
  const handleDAppClick = async (e) => {
    e.preventDefault();
    
    try {
      // Check if user is signed in via Supabase
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // User NOT signed in - Store intention and trigger signup
        localStorage.setItem("ptdt_redirect_after_auth", "dapp");
        
        // Dispatch custom event to open signup modal
        window.dispatchEvent(new CustomEvent("openSignupModal"));
        
        // Scroll to top for better UX
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      
      // User IS signed in - Get profile data
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
      
      // Build user data for token
      const userData = {
        id: session.user.id,
        fullName: profile?.full_name || session.user.user_metadata?.full_name || 'User',
        email: session.user.email,
        wallet: profile?.wallet || session.user.user_metadata?.wallet || '',
        country: profile?.country || session.user.user_metadata?.country || '',
        tier: profile?.tier || 'STANDARD',
        isWhitelisted: profile?.is_whitelisted || false,
        registeredAt: profile?.registered_at || session.user.created_at,
      };
      
      // Generate auth token and redirect
      const authToken = generateAuthToken(userData);
      window.open(`https://dapp.ptdt.taxi?auth=${authToken}`, '_blank');
      
    } catch (error) {
      console.error('Error handling DApp click:', error);
      // Fallback: just open DApp without token
      window.open('https://dapp.ptdt.taxi', '_blank');
    }
  };
  // ============================================

  return (
    <section 
      id="hero" 
      className="relative z-content flex flex-col items-center justify-center text-center pt-32 md:pt-40 pb-10 px-4 sm:px-6 md:px-12 min-h-screen overflow-x-hidden scroll-mt-[72px]" 
    >
      {/* Optimized Particle Background */}
      <ParticleCanvas particleCount={60} />

      <div className="mb-12 max-w-5xl mx-auto w-full relative z-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="font-montserrat text-5xl md:text-6xl lg:text-7xl font-bold mb-2"
            style={{
              color: '#FB0A8B', letterSpacing: '0px' 
            }}
          >
            Peether PTDT
          </h1>
        </motion.div>

        <span
          className="text-xl sm:text-xl md:text-3xl text-gray-500 block mb-10"
          style={{ fontWeight: 500, fontSize: "1.5rem", letterSpacing: "-0.5px" }}
        >
          Pink Taxi Drive Token
        </span>

        {/* Animated Slogan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="my-10"
        >
          <SloganAnimation />
        </motion.div>

        <motion.p 
          className="font-lexend text-base sm:text-lg md:text-xl text-gray-600 mb-12 max-w-4xl mx-auto px-2"
          style={{ fontWeight: 200 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <br />
          <span className="text-lg sm:text-xl md:text-2xl text-gray-800 block mb-5" style={{ fontWeight: 300 }}>
            Born in 2006 <span className="text-pink-500 font-semibold">|</span> Reborn on-chain.
          </span>
          <span className="block mb-4 text-gray-700">
            Peether - PTDT powers the Pink Taxi ecosystem - where every ride{" "}
            <span className="text-pink-500 font-semibold">pays you</span>, 
            every driver <span className="text-pink-500 font-semibold">earns more</span>, and blockchain turns wheels into wealth.
          </span>
          <span className="font-semibold italic text-gray-800 block" style={{ fontWeight: 500 }}>
            19 Years of Women's Safety. Now Fueled by Blockchain.
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10"
        >
          {/* PRIMARY CTA - Launch DApp */}
          <motion.button
            onClick={handleDAppClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-montserrat px-8 py-4 bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 text-white rounded-full font-bold text-lg shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:shadow-[0_0_40px_rgba(236,72,153,0.8)] transition-all inline-flex items-center gap-3 group relative overflow-hidden cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-3">
              <Rocket size={22} className="group-hover:rotate-12 transition-transform" />
              <span>Launch DApp</span>
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
            </span>
          </motion.button>

          <a href="#about" className="font-montserrat px-8 py-3 bg-white text-gray-800 border-2 border-gray-300 rounded-full font-semibold text-lg hover:bg-gray-50 hover:border-gray-400 hover:scale-105 transition-all inline-flex items-center gap-2">
            Learn More <ArrowRight size={20} />
          </a>

          <a href="#tokenomics" className="font-montserrat px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-semibold text-lg shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:shadow-[0_0_30px_rgba(16,185,129,0.7)] hover:scale-105 transition-all">
            View Tokenomics
          </a>
        </motion.div>

        {/* Phone Showcase — MOVED TO BOTTOM, smaller */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-4 mb-4 flex justify-center w-full px-4 overflow-x-hidden"
        >
          <div className="w-full max-w-[260px]">
            <PTDTShowcase
              logoSrc="/ptdtlogo.png"
              backgroundSrc="/ptdt-stars.png"
              ctaHref="/join-driver"
              autoplay
              loop
              bezel="dark"
            />
          </div>
        </motion.div>

        {/* Verified & Trusted Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12 mb-4"
        >
          <p className="text-center text-gray-400 text-sm tracking-[0.2em] uppercase mb-6 font-medium">
            Verified & Trusted
          </p>
          
          <a
            href="https://lime-capitalist-canid-406.mypinata.cloud/ipfs/bafkreibvhgi5mhutt6agzrdjki7gxecpr5cvx26yvdyn6kigyumzm6ghuq"
            target="_blank"
            rel="noopener noreferrer"
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 max-w-xl sm:max-w-3xl mx-auto cursor-pointer group"
          >
            {/* Audited Badge - Highlighted */}
            <div className="flex flex-col items-center gap-2 transition-transform group-hover:scale-105">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center shadow-lg">
                <ShieldCheck size={28} className="text-white sm:w-10 sm:h-10" />
              </div>
              <span className="text-teal-600 font-bold text-xs sm:text-base">Audited 9.2/10</span>
            </div>

            {/* LP Locked Badge */}
            <div className="flex flex-col items-center gap-2 transition-transform group-hover:scale-105">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-gray-200 bg-white/50 flex items-center justify-center">
                <span className="text-2xl sm:text-4xl">🔒</span>
              </div>
              <span className="text-gray-600 font-medium text-xs sm:text-base">LP Locked 6 Months</span>
            </div>

            {/* Verified Contract Badge */}
            <div className="flex flex-col items-center gap-2 transition-transform group-hover:scale-105">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-gray-200 bg-white/50 flex items-center justify-center">
                <span className="text-2xl sm:text-4xl text-gray-700">✓</span>
              </div>
              <span className="text-gray-600 font-medium text-xs sm:text-base">Verified Contract</span>
            </div>

            {/* UK Registered Badge */}
            <div className="flex flex-col items-center gap-2 transition-transform group-hover:scale-105">
              <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full border-2 border-gray-200 bg-white/50 flex items-center justify-center">
                <span className="text-2xl sm:text-4xl">🏢</span>
              </div>
              <span className="text-gray-600 font-medium text-xs sm:text-base">UK Registered</span>
            </div>
          </a>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mt-16 px-2"
        >
          <div className="py-3 px-4 sm:py-4 sm:px-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-400/40 shadow-lg">
            <div className="font-montserrat text-2xl sm:text-3xl font-bold text-emerald-500">18+</div>
            <div className="font-lexend text-xs sm:text-sm text-gray-600 mt-1" style={{ fontWeight: 300 }}>Countries</div>
          </div>
          <div className="py-3 px-4 sm:py-4 sm:px-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-pink-400/40 shadow-lg">
            <div className="font-montserrat text-2xl sm:text-3xl font-bold text-pink-500">2006</div>
            <div className="font-lexend text-xs sm:text-sm text-gray-600 mt-1" style={{ fontWeight: 300 }}>Since</div>
          </div>
          <div className="py-3 px-4 sm:py-4 sm:px-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-emerald-400/40 shadow-lg">
            <div className="font-montserrat text-2xl sm:text-3xl font-bold text-emerald-500">100K</div>
            <div className="font-lexend text-xs sm:text-sm text-gray-600 mt-1" style={{ fontWeight: 300 }}>Total Supply</div>
          </div>
          <div className="py-3 px-4 sm:py-4 sm:px-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-pink-400/40 shadow-lg">
            <div className="font-montserrat text-2xl sm:text-3xl font-bold text-pink-500">BSC</div>
            <div className="font-lexend text-xs sm:text-sm text-gray-600 mt-1" style={{ fontWeight: 300 }}>Network</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}