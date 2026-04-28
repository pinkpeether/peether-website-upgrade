import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Rocket, ShieldCheck } from "lucide-react";
import SloganAnimation from "./SloganAnimation";
import ParticleCanvas from "./ParticleCanvas";
import { generateAuthToken } from "../utils/authToken";
import { supabase } from "../lib/supabase";

const GECKOTERMINAL_POOL_API = "https://api.geckoterminal.com/api/v2/networks/bsc/pools/0xf3a06e9dc5d89b2fd8d7d30946c9aeddc5e01e28";
const GECKOTERMINAL_TOKEN_INFO_API = "https://api.geckoterminal.com/api/v2/networks/bsc/tokens/0x66c6Fc5E7F99272134a52DF9E88D94eD83E89278/info";
const GECKOTERMINAL_URL = "https://www.geckoterminal.com/bsc/pools/0xf3a06e9dc5d89b2fd8d7d30946c9aeddc5e01e28";

const compactNumber = (value) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return "--";
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: number >= 1000 ? 1 : 2,
  }).format(number);
};

const formatUsd = (value) => {
  const number = Number(value);
  if (!Number.isFinite(number)) return "--";
  if (number >= 1) {
    return `$${number.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  return `$${number.toLocaleString("en-US", {
    minimumFractionDigits: 4,
    maximumFractionDigits: 6,
  })}`;
};

export default function Hero() {
  const [marketData, setMarketData] = useState(null);
  const [marketLoading, setMarketLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchMarketData = async () => {
      try {
        const [poolResponse, tokenResponse] = await Promise.all([
          fetch(GECKOTERMINAL_POOL_API),
          fetch(GECKOTERMINAL_TOKEN_INFO_API),
        ]);

        if (!poolResponse.ok || !tokenResponse.ok) {
          throw new Error("Failed to fetch GeckoTerminal market data");
        }

        const poolJson = await poolResponse.json();
        const tokenJson = await tokenResponse.json();

        const pool = poolJson?.data?.attributes;
        const token = tokenJson?.data?.attributes;

        if (!pool || !token) {
          throw new Error("Incomplete GeckoTerminal market data");
        }

        if (isMounted) {
          setMarketData({
            priceUsd: pool.base_token_price_usd,
            liquidityUsd: pool.reserve_in_usd,
            fdvUsd: pool.fdv_usd,
            holders: token.holders?.count,
            pairName: pool.pool_name,
            dexName: "PancakeSwap V2",
          });
        }
      } catch (error) {
        console.error("Error fetching GeckoTerminal market data:", error);
      } finally {
        if (isMounted) {
          setMarketLoading(false);
        }
      }
    };

    fetchMarketData();
    const intervalId = setInterval(fetchMarketData, 60000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, []);

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
      className="relative z-content flex flex-col items-center justify-center text-center pt-24 md:pt-28 pb-8 px-4 sm:px-6 md:px-12 min-h-screen overflow-x-hidden scroll-mt-[72px]" 
    >
      {/* Optimized Particle Background */}
      <ParticleCanvas particleCount={60} />

      <div className="mb-12 max-w-5xl mx-auto w-full relative z-10">
        {/* Hero Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-1 px-2"
        >
          <img
            src="/ptdt-main-new-logo.png"
            alt="PTDT Protocol Taxi Drive Token"
            className="w-full max-w-[252px] sm:max-w-[364px] md:max-w-[428px] h-auto mx-auto"
          />
        </motion.div>

        {/* Animated Slogan */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-1 mb-5 sm:mb-6 px-2"
        >
          <SloganAnimation />
        </motion.div>

        <motion.p 
          className="font-lexend text-sm leading-relaxed sm:text-lg md:text-xl text-gray-600 mb-7 max-w-4xl mx-auto px-3 sm:px-2"
          style={{ fontWeight: 200 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <span className="block mb-3 text-gray-700" style={{ fontWeight: 320 }}>
            Peether PTDT is a decentralized ride-hailing settlement layer on BNB Smart Chain (BEP-20) - built for real-world transactions, deflationary flow, and real yield for stakers.
          </span>
          <span className="text-[0.95rem] sm:text-base md:text-lg text-gray-800 block leading-relaxed" style={{ fontWeight: 420 }}>
            <span className="text-pink-500">60% Burned</span>
            <span className="text-gray-400">  |  </span>
            <span className="text-emerald-500">40% to Staker Yield</span>
            <span className="text-gray-400">  |  </span>
            <span className="text-purple-500">100K Fixed Supply</span>
          </span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-12 mb-6 w-full max-w-4xl mx-auto"
        >
          {/* PRIMARY CTA - Launch DApp */}
          <motion.button
            onClick={handleDAppClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-montserrat w-full sm:w-auto sm:min-w-[240px] px-8 py-3 bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 text-white rounded-full font-bold text-base sm:text-lg shadow-[0_0_30px_rgba(236,72,153,0.6)] hover:shadow-[0_0_40px_rgba(236,72,153,0.8)] transition-all inline-flex justify-center items-center gap-3 group relative overflow-hidden cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-3">
              <Rocket size={22} className="group-hover:rotate-12 transition-transform" />
              <span>Launch DApp</span>
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>→</motion.span>
            </span>
          </motion.button>

          <motion.a
            href={GECKOTERMINAL_URL}
            target="_blank"
            rel="noopener noreferrer"
            animate={{
              y: [0, -3, 0],
              scale: [1, 1.04, 1, 1.02, 1],
              boxShadow: [
                "0 0 0 rgba(16,185,129,0.00), 0 0 0 rgba(251,10,139,0.00)",
                "0 0 34px rgba(16,185,129,0.26), 0 0 22px rgba(251,10,139,0.16)",
                "0 0 26px rgba(251,10,139,0.22), 0 0 16px rgba(16,185,129,0.18)",
                "0 0 34px rgba(16,185,129,0.24), 0 0 20px rgba(251,10,139,0.12)",
                "0 0 0 rgba(16,185,129,0.00), 0 0 0 rgba(251,10,139,0.00)",
              ],
            }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="relative overflow-hidden w-full sm:w-auto sm:min-w-[240px] rounded-full transition-all inline-flex justify-center items-center translate-y-2 sm:translate-y-3 sm:mx-2 md:mx-3"
          >
            <img
              src="/gterminal_button.png"
              alt="GeckoTerminal"
              className="relative z-10 block h-auto w-full max-w-[280px] sm:max-w-[300px]"
            />
          </motion.a>

          <a href="#tokenomics" className="font-montserrat w-full sm:w-auto sm:min-w-[240px] px-8 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full font-semibold text-base sm:text-lg shadow-[0_0_20px_rgba(16,185,129,0.5)] hover:shadow-[0_0_30px_rgba(16,185,129,0.7)] hover:scale-105 transition-all inline-flex justify-center items-center">
            View Tokenomics
          </a>
        </motion.div>

        {/* Phone showcase hidden for now while GeckoTerminal live market is featured */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-2 mb-4 flex justify-center w-full px-1 sm:px-4 overflow-x-hidden"
        >
          <div className="relative w-full max-w-4xl">
            <div className="pointer-events-none absolute inset-0 rounded-[34px] bg-[radial-gradient(circle_at_top_left,rgba(251,10,139,0.18),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.18),transparent_36%)] blur-2xl" />

            <div className="relative overflow-hidden rounded-[30px] bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(249,250,251,0.96))] border-2 border-white/95 shadow-[0_22px_56px_rgba(148,163,184,0.16),0_8px_20px_rgba(17,24,39,0.04),inset_0_0_0_1px_rgba(148,163,184,0.32)] p-[1px]">
              <div className="relative overflow-hidden rounded-[29px] bg-[radial-gradient(circle_at_top_left,rgba(251,10,139,0.08),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.10),transparent_34%),linear-gradient(180deg,#ffffff_0%,#f8fafc_100%)] px-3 py-5 sm:px-6 sm:py-6">
                <div className="pointer-events-none absolute -top-8 left-10 h-24 w-24 rounded-full bg-pink-400/12 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-10 right-12 h-24 w-24 rounded-full bg-emerald-400/12 blur-3xl" />
                <div className="pointer-events-none absolute inset-0 opacity-70">
                  <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 1200 520"
                    fill="none"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <defs>
                      <linearGradient id="ptdtChartLine" x1="160" y1="360" x2="1030" y2="150" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FB0A8B" stopOpacity="0.18" />
                        <stop offset="0.55" stopColor="#C084FC" stopOpacity="0.14" />
                        <stop offset="1" stopColor="#10B981" stopOpacity="0.2" />
                      </linearGradient>
                      <linearGradient id="ptdtChartFill" x1="0" y1="120" x2="0" y2="420" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#10B981" stopOpacity="0.08" />
                        <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
                      </linearGradient>
                      <linearGradient id="ptdtVolumeBar" x1="0" y1="340" x2="0" y2="430" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#10B981" stopOpacity="0.18" />
                        <stop offset="1" stopColor="#10B981" stopOpacity="0.03" />
                      </linearGradient>
                      <linearGradient id="ptdtVolumeBarPink" x1="0" y1="340" x2="0" y2="430" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#FB0A8B" stopOpacity="0.16" />
                        <stop offset="1" stopColor="#FB0A8B" stopOpacity="0.03" />
                      </linearGradient>
                    </defs>

                    <g opacity="1">
                      <path d="M0 390H1200" stroke="#94A3B8" strokeWidth="1" />
                      <path d="M0 310H1200" stroke="#CBD5E1" strokeWidth="1" />
                      <path d="M0 230H1200" stroke="#CBD5E1" strokeWidth="1" />
                      <path d="M0 150H1200" stroke="#94A3B8" strokeWidth="1" />
                      <path d="M130 100V430" stroke="#D1D5DB" strokeWidth="1" />
                      <path d="M170 70V440" stroke="#E5E7EB" strokeWidth="1" />
                      <path d="M250 100V430" stroke="#E5E7EB" strokeWidth="1" />
                      <path d="M330 100V430" stroke="#D1D5DB" strokeWidth="1" />
                      <path d="M370 70V440" stroke="#EEF2F7" strokeWidth="1" />
                      <path d="M450 100V430" stroke="#E5E7EB" strokeWidth="1" />
                      <path d="M530 100V430" stroke="#D1D5DB" strokeWidth="1" />
                      <path d="M570 70V440" stroke="#EEF2F7" strokeWidth="1" />
                      <path d="M650 100V430" stroke="#E5E7EB" strokeWidth="1" />
                      <path d="M730 100V430" stroke="#D1D5DB" strokeWidth="1" />
                      <path d="M770 70V440" stroke="#EEF2F7" strokeWidth="1" />
                      <path d="M850 100V430" stroke="#E5E7EB" strokeWidth="1" />
                      <path d="M930 100V430" stroke="#D1D5DB" strokeWidth="1" />
                      <path d="M970 70V440" stroke="#E5E7EB" strokeWidth="1" />
                      <path d="M1050 100V430" stroke="#E5E7EB" strokeWidth="1" />
                    </g>

                    <g opacity="0.32">
                      <rect x="170" y="378" width="26" height="52" rx="10" fill="url(#ptdtVolumeBarPink)" />
                      <rect x="225" y="360" width="26" height="70" rx="10" fill="url(#ptdtVolumeBarPink)" />
                      <rect x="280" y="346" width="26" height="84" rx="10" fill="url(#ptdtVolumeBar)" />
                      <rect x="335" y="334" width="26" height="96" rx="10" fill="url(#ptdtVolumeBar)" />
                      <rect x="390" y="366" width="26" height="64" rx="10" fill="url(#ptdtVolumeBarPink)" />
                      <rect x="445" y="322" width="26" height="108" rx="10" fill="url(#ptdtVolumeBar)" />
                      <rect x="500" y="306" width="26" height="124" rx="10" fill="url(#ptdtVolumeBar)" />
                      <rect x="555" y="340" width="26" height="90" rx="10" fill="url(#ptdtVolumeBarPink)" />
                      <rect x="610" y="326" width="26" height="104" rx="10" fill="url(#ptdtVolumeBar)" />
                      <rect x="665" y="344" width="26" height="86" rx="10" fill="url(#ptdtVolumeBarPink)" />
                      <rect x="720" y="312" width="26" height="118" rx="10" fill="url(#ptdtVolumeBar)" />
                      <rect x="775" y="296" width="26" height="134" rx="10" fill="url(#ptdtVolumeBar)" />
                      <rect x="830" y="332" width="26" height="98" rx="10" fill="url(#ptdtVolumeBarPink)" />
                      <rect x="885" y="286" width="26" height="144" rx="10" fill="url(#ptdtVolumeBar)" />
                      <rect x="940" y="300" width="26" height="130" rx="10" fill="url(#ptdtVolumeBar)" />
                      <rect x="995" y="278" width="26" height="152" rx="10" fill="url(#ptdtVolumeBar)" />
                    </g>

                    <g opacity="0.52">
                      <path d="M205 318V378" stroke="#FB0A8B" strokeWidth="4" strokeLinecap="round" />
                      <rect x="195" y="334" width="20" height="26" rx="8" fill="#FB0A8B" fillOpacity="0.20" />

                      <path d="M270 286V350" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
                      <rect x="260" y="300" width="20" height="36" rx="8" fill="#10B981" fillOpacity="0.22" />

                      <path d="M335 262V330" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
                      <rect x="325" y="276" width="20" height="42" rx="8" fill="#10B981" fillOpacity="0.22" />

                      <path d="M400 250V315" stroke="#FB0A8B" strokeWidth="4" strokeLinecap="round" />
                      <rect x="390" y="264" width="20" height="34" rx="8" fill="#FB0A8B" fillOpacity="0.18" />

                      <path d="M465 228V300" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" />
                      <rect x="455" y="242" width="20" height="40" rx="8" fill="#8B5CF6" fillOpacity="0.18" />

                      <path d="M530 210V285" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
                      <rect x="520" y="222" width="20" height="48" rx="8" fill="#10B981" fillOpacity="0.24" />

                      <path d="M595 232V298" stroke="#FB0A8B" strokeWidth="4" strokeLinecap="round" />
                      <rect x="585" y="246" width="20" height="36" rx="8" fill="#FB0A8B" fillOpacity="0.18" />

                      <path d="M660 202V272" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
                      <rect x="650" y="214" width="20" height="44" rx="8" fill="#10B981" fillOpacity="0.22" />

                      <path d="M725 182V252" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
                      <rect x="715" y="194" width="20" height="46" rx="8" fill="#10B981" fillOpacity="0.22" />

                      <path d="M790 198V266" stroke="#FB0A8B" strokeWidth="4" strokeLinecap="round" />
                      <rect x="780" y="210" width="20" height="38" rx="8" fill="#FB0A8B" fillOpacity="0.18" />

                      <path d="M855 170V236" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
                      <rect x="845" y="182" width="20" height="40" rx="8" fill="#10B981" fillOpacity="0.24" />

                      <path d="M920 154V222" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" />
                      <rect x="910" y="166" width="20" height="42" rx="8" fill="#8B5CF6" fillOpacity="0.18" />

                      <path d="M985 142V210" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
                      <rect x="975" y="154" width="20" height="44" rx="8" fill="#10B981" fillOpacity="0.24" />
                    </g>

                    <path
                      d="M138 352C188 344 230 332 278 314C324 296 366 268 420 256C470 244 514 224 566 232C612 238 654 218 706 198C756 178 792 184 846 162C894 142 950 150 1002 130C1032 118 1056 112 1082 106"
                      stroke="url(#ptdtChartLine)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g opacity="0.76">
                      <circle cx="278" cy="314" r="5.5" fill="#FB0A8B" fillOpacity="0.35" />
                      <circle cx="420" cy="256" r="5.5" fill="#8B5CF6" fillOpacity="0.25" />
                      <circle cx="566" cy="232" r="5.5" fill="#10B981" fillOpacity="0.35" />
                      <circle cx="706" cy="198" r="5.5" fill="#FB0A8B" fillOpacity="0.28" />
                      <circle cx="846" cy="162" r="5.5" fill="#10B981" fillOpacity="0.35" />
                      <circle cx="1002" cy="130" r="5.5" fill="#10B981" fillOpacity="0.38" />
                    </g>
                    <path
                      d="M138 352C188 344 230 332 278 314C324 296 366 268 420 256C470 244 514 224 566 232C612 238 654 218 706 198C756 178 792 184 846 162C894 142 950 150 1002 130C1032 118 1056 112 1082 106V430H138Z"
                      fill="url(#ptdtChartFill)"
                    />
                  </svg>
                </div>

                <div className="relative mb-4 sm:mb-5 text-center -mt-2 sm:-mt-3">
                  <div className="inline-flex items-center gap-3 rounded-full border border-white/85 bg-white/86 px-3 py-1.5 sm:px-4 sm:py-2 shadow-[0_8px_20px_rgba(17,24,39,0.05)] mb-3 sm:mb-4">
                    <motion.span
                      className="h-2.5 w-2.5 rounded-full bg-pink-500"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7],
                        boxShadow: [
                          "0 0 0 0 rgba(251,10,139,0.28)",
                          "0 0 0 8px rgba(251,10,139,0.08)",
                          "0 0 0 0 rgba(251,10,139,0.28)",
                        ],
                      }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <span className="font-montserrat text-[11px] tracking-[0.28em] uppercase text-gray-600">
                      Live Market
                    </span>
                    <motion.span
                      className="h-2.5 w-2.5 rounded-full bg-emerald-500"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.7, 1, 0.7],
                        boxShadow: [
                          "0 0 0 0 rgba(16,185,129,0.28)",
                          "0 0 0 8px rgba(16,185,129,0.08)",
                          "0 0 0 0 rgba(16,185,129,0.28)",
                        ],
                      }}
                      transition={{
                        duration: 1.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.3,
                      }}
                    />
                  </div>

                  <h3 className="font-montserrat text-[1.55rem] min-[420px]:text-[1.75rem] sm:text-[2.6rem] leading-[1.02] font-bold tracking-[-0.04em] text-gray-950 px-2">
                    PTDT on GeckoTerminal
                  </h3>
                  <p className="font-lexend text-[0.78rem] min-[420px]:text-[0.84rem] sm:text-[0.95rem] text-gray-500 mt-1.5 tracking-[-0.01em] max-w-[94%] sm:max-w-none mx-auto leading-relaxed">
                    On-chain data meets deflationary ride-hailing infrastructure
                  </p>
                  <p className="font-lexend text-[0.9rem] min-[420px]:text-[0.98rem] sm:text-[1.18rem] text-gray-700 mt-1 sm:mt-1.5 tracking-[-0.02em] max-w-[92%] sm:max-w-none mx-auto leading-relaxed">
                    {marketData?.pairName || "PTDT / USDT"} on {marketData?.dexName || "PancakeSwap V2"}
                  </p>
                </div>

                <div className="relative grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
                  <div className="relative overflow-hidden rounded-[20px] border border-pink-700/35 bg-[linear-gradient(135deg,#fb0a8b_0%,#ff4fa8_100%)] px-4 py-4 text-center shadow-[0_14px_28px_rgba(251,10,139,0.20)] min-h-[110px] flex flex-col justify-center">
                    <motion.div
                      className="pointer-events-none absolute inset-0 rounded-[20px] p-[1px]"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent 0deg, transparent 302deg, rgba(190,24,93,0.00) 320deg, rgba(190,24,93,0.95) 338deg, rgba(255,135,195,0.90) 349deg, transparent 360deg)",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 3.8, repeat: Infinity, ease: "linear" }}
                    />
                    <p className="font-lexend text-[11px] uppercase tracking-[0.30em] text-white/80 mb-2">Price</p>
                    <p className="font-montserrat text-[1.28rem] min-[420px]:text-[1.4rem] sm:text-[1.65rem] leading-none font-bold text-white break-words">
                      {marketLoading ? "Loading..." : formatUsd(marketData?.priceUsd)}
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-[20px] border border-emerald-700/35 bg-[linear-gradient(135deg,#059669_0%,#34d399_100%)] px-4 py-4 text-center shadow-[0_14px_28px_rgba(16,185,129,0.20)] min-h-[110px] flex flex-col justify-center">
                    <motion.div
                      className="pointer-events-none absolute inset-0 rounded-[20px] p-[1px]"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent 0deg, transparent 302deg, rgba(4,120,87,0.00) 320deg, rgba(4,120,87,0.95) 338deg, rgba(110,231,183,0.90) 349deg, transparent 360deg)",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4.2, repeat: Infinity, ease: "linear", delay: 0.35 }}
                    />
                    <p className="font-lexend text-[11px] uppercase tracking-[0.30em] text-white/80 mb-2">Liquidity</p>
                    <p className="font-montserrat text-[1.28rem] min-[420px]:text-[1.4rem] sm:text-[1.65rem] leading-none font-bold text-white break-words">
                      {marketLoading ? "Loading..." : formatUsd(marketData?.liquidityUsd)}
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-[20px] border border-violet-700/35 bg-[linear-gradient(135deg,#7c3aed_0%,#a78bfa_100%)] px-4 py-4 text-center shadow-[0_14px_28px_rgba(139,92,246,0.20)] min-h-[110px] flex flex-col justify-center">
                    <motion.div
                      className="pointer-events-none absolute inset-0 rounded-[20px] p-[1px]"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent 0deg, transparent 302deg, rgba(109,40,217,0.00) 320deg, rgba(109,40,217,0.95) 338deg, rgba(196,181,253,0.90) 349deg, transparent 360deg)",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4.6, repeat: Infinity, ease: "linear", delay: 0.6 }}
                    />
                    <p className="font-lexend text-[11px] uppercase tracking-[0.30em] text-white/80 mb-2">FDV</p>
                    <p className="font-montserrat text-[1.28rem] min-[420px]:text-[1.4rem] sm:text-[1.65rem] leading-none font-bold text-white break-words">
                      {marketLoading ? "Loading..." : formatUsd(marketData?.fdvUsd)}
                    </p>
                  </div>

                  <div className="relative overflow-hidden rounded-[20px] border border-sky-700/35 bg-[linear-gradient(135deg,#0284c7_0%,#38bdf8_100%)] px-4 py-4 text-center shadow-[0_14px_28px_rgba(56,189,248,0.20)] min-h-[110px] flex flex-col justify-center">
                    <motion.div
                      className="pointer-events-none absolute inset-0 rounded-[20px] p-[1px]"
                      style={{
                        background:
                          "conic-gradient(from 0deg, transparent 0deg, transparent 302deg, rgba(3,105,161,0.00) 320deg, rgba(3,105,161,0.95) 338deg, rgba(125,211,252,0.90) 349deg, transparent 360deg)",
                        WebkitMask:
                          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                        WebkitMaskComposite: "xor",
                        maskComposite: "exclude",
                      }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4.9, repeat: Infinity, ease: "linear", delay: 0.9 }}
                    />
                    <p className="font-lexend text-[11px] uppercase tracking-[0.30em] text-white/80 mb-2">Holders</p>
                    <p className="font-montserrat text-[1.28rem] min-[420px]:text-[1.4rem] sm:text-[1.65rem] leading-none font-bold text-white break-words">
                      {marketLoading ? "Loading..." : compactNumber(marketData?.holders)}
                    </p>
                  </div>
                </div>

                <p className="relative mt-5 sm:mt-6 text-[0.88rem] min-[420px]:text-[0.94rem] sm:text-[0.98rem] text-gray-500 font-lexend text-center px-3">
                  Live data refreshes automatically from GeckoTerminal every 60 seconds.
                </p>
              </div>
            </div>
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
