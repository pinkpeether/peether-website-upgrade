import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Newsletter from './Newsletter';
import ContactSupport from './ContactSupport';
import { 
  Mail, 
  ChevronUp,
  Heart,
  Shield,
  Award,
  CheckCircle,
  Users
} from "lucide-react";

// Import social media SVG icons
const TwitterIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const FacebookIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TelegramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
  </svg>
);

const DiscordIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.317 4.369A19.791 19.791 0 0 0 15.126 3a13.92 13.92 0 0 0-.662 1.357 18.27 18.27 0 0 0-4.93 0A13.92 13.92 0 0 0 8.874 3a19.736 19.736 0 0 0-5.192 1.37C.533 9.024-.32 13.579.107 18.071a19.9 19.9 0 0 0 6.362 3.215c.515-.708.973-1.457 1.366-2.24-.752-.285-1.468-.642-2.143-1.066.179-.132.354-.269.523-.41 4.126 1.94 8.604 1.94 12.682 0 .17.141.344.278.523.41-.675.424-1.392.781-2.144 1.066.393.783.851 1.532 1.366 2.24a19.86 19.86 0 0 0 6.363-3.215c.5-5.207-.854-9.72-3.688-13.702ZM8.02 15.331c-1.239 0-2.256-1.146-2.256-2.547 0-1.401 1-2.547 2.256-2.547 1.255 0 2.272 1.146 2.255 2.547 0 1.401-1 2.547-2.255 2.547Zm7.96 0c-1.239 0-2.255-1.146-2.255-2.547 0-1.401 1-2.547 2.255-2.547 1.256 0 2.273 1.146 2.256 2.547 0 1.401-1 2.547-2.256 2.547Z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 .5C5.649.5.5 5.649.5 12A11.5 11.5 0 0 0 8.36 22.63c.575.104.785-.25.785-.555 0-.274-.01-1-.015-1.962-3.182.692-3.854-1.533-3.854-1.533-.52-1.322-1.27-1.675-1.27-1.675-1.038-.71.078-.696.078-.696 1.148.08 1.752 1.178 1.752 1.178 1.02 1.748 2.676 1.243 3.328.95.103-.739.4-1.243.727-1.53-2.54-.29-5.211-1.27-5.211-5.654 0-1.249.446-2.27 1.176-3.07-.118-.288-.51-1.45.112-3.024 0 0 .96-.307 3.146 1.173a10.93 10.93 0 0 1 5.73 0c2.186-1.48 3.144-1.173 3.144-1.173.624 1.575.232 2.737.114 3.024.732.8 1.175 1.821 1.175 3.07 0 4.395-2.675 5.36-5.223 5.644.412.355.779 1.055.779 2.126 0 1.535-.014 2.773-.014 3.15 0 .308.207.665.79.553A11.502 11.502 0 0 0 23.5 12C23.5 5.649 18.351.5 12 .5Z"/>
  </svg>
);

const YouTubeIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const MediumIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
  </svg>
);

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showContactSupport, setShowContactSupport] = useState(false);

  const socialLinks = [
    {
      name: "Telegram",
      href: "https://t.me/PeetherPTDT",
      icon: <TelegramIcon />,
      gradient: "from-cyan-400 to-blue-500",
      hoverGlow: "group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]",
      followers: "Active"
    },
    {
      name: "Twitter",
      href: "https://x.com/PTDT_Token",
      icon: <TwitterIcon />,
      gradient: "from-blue-400 to-blue-600",
      hoverGlow: "group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]",
      followers: "9K+"
    },
    {
      name: "Discord",
      href: "https://discord.gg/UKDBwm8x",
      icon: <DiscordIcon />,
      gradient: "from-indigo-500 to-violet-600",
      hoverGlow: "group-hover:shadow-[0_0_20px_rgba(99,102,241,0.5)]",
      followers: "Community"
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/PTDToken/",
      icon: <FacebookIcon />,
      gradient: "from-blue-600 to-blue-800",
      hoverGlow: "group-hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]",
      followers: "15K+"
    },
    {
      name: "GitHub",
      href: "https://github.com/pinkpeether/peether-protocol",
      icon: <GitHubIcon />,
      gradient: "from-slate-700 to-gray-900",
      hoverGlow: "group-hover:shadow-[0_0_20px_rgba(71,85,105,0.5)]",
      followers: "Source"
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@PinkTaxiGroupLtdUK",
      icon: <YouTubeIcon />,
      gradient: "from-red-500 to-red-700",
      hoverGlow: "group-hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]",
      followers: "Videos"
    }
  ];

  const mediumLink = {
    name: "Medium",
    href: "https://medium.com/pink-taxi/followers",
    icon: <MediumIcon />,
    gradient: "from-emerald-400 via-green-500 to-emerald-600",
    hoverGlow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.7)]",
    followers: "17,474",
    badge: "🔥 HUGE Community"
  };

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Tokenomics", href: "#tokenomics" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "Legacy", href: "#legacy" },
    { name: "Participate", href: "#participate" },
    { name: "FAQ", href: "#faq" }
  ];

  // Handle scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer id="footer" className="relative z-10 text-white overflow-hidden">
      {/* Wave SVG Divider */}
      <div className="relative">
        <svg 
          className="w-full h-24 md:h-32" 
          viewBox="0 0 1440 120" 
          preserveAspectRatio="none"
          style={{ transform: 'translateY(0px)' }}
        >
          <path 
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z" 
            fill="currentColor"
            className="text-zinc-900/80"
          />
        </svg>
      </div>

      {/* Main Footer Content */}
      <div className="relative bg-gradient-to-b from-zinc-900/80 via-zinc-900/90 to-zinc-950 py-16 px-6 md:px-12">
        {/* Decorative blur elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* 4 Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            
            {/* Column 1: Brand */}
            <div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-emerald-400 mb-4">
                Peether - PTDT
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                PTDT is a complete infrastructure, not an application. The token is the fuel, the API is the engine.
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-1 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-xs text-emerald-400">
                  <Shield size={12} />
                  <span>Audited</span>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 bg-blue-500/10 border border-blue-500/30 rounded-full text-xs text-blue-400">
                  <CheckCircle size={12} />
                  <span>KYC</span>
                </div>
                <div className="flex items-center gap-1 px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-xs text-yellow-400">
                  <Award size={12} />
                  <span>BSC</span>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link, idx) => (
                  <motion.li 
                    key={idx}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a 
                      href={link.href} 
                      className="text-gray-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-2"
                    >
                      <span className="text-pink-500">›</span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

 {/* Column 3: Legal, Resources & SUPPORT - ENHANCED */}
<div>
  <h4 className="text-lg font-semibold text-white mb-4">Legal & Support</h4>
  <ul className="space-y-3 mb-6">
    <motion.li whileHover={{ x: 5 }}>
      <a 
        href="/privacy.html" 
        target="_blank"
        className="text-gray-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-2"
      >
        <span className="text-pink-500">›</span>
        Privacy Policy
      </a>
    </motion.li>
    <motion.li whileHover={{ x: 5 }}>
      <a 
        href="/terms.html" 
        target="_blank"
        className="text-gray-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-2"
      >
        <span className="text-pink-500">›</span>
        Terms of Service
      </a>
    </motion.li>
    <motion.li whileHover={{ x: 5 }}>
      <a 
        href="mailto:dev@ptdt.taxi" 
        className="text-gray-400 hover:text-emerald-400 transition-colors inline-flex items-center gap-2"
      >
        <Mail size={16} className="text-pink-500" />
        dev@ptdt.taxi
      </a>
    </motion.li>
  </ul>

  {/* STANDOUT CONTACT SUPPORT SECTION */}
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="relative p-4 rounded-xl bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-blue-600/10 border-2 border-cyan-400/40 overflow-hidden group"
  >
    {/* Animated glow effect */}
    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-cyan-400/20 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    {/* Pulsing indicator */}
    <div className="absolute top-2 right-2">
      <span className="relative flex h-3 w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
      </span>
    </div>

    <div className="relative z-10">
      <div className="flex items-center gap-2 mb-2">
        <Mail size={18} className="text-cyan-400" />
        <h5 className="text-white font-bold text-sm">Need Help?</h5>
      </div>
      
      <p className="text-gray-300 text-xs mb-3 leading-relaxed">
        Our support team is here 24/7 to assist you with any questions.
      </p>
      
      <motion.button
        onClick={() => setShowContactSupport(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center gap-2"
      >
        <Mail size={16} />
        Contact Support
      </motion.button>
    </div>
  </motion.div>
</div>

            {/* Column 4: Newsletter - NOW USING NEWSLETTER COMPONENT */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Stay Updated</h4>
              <p className="text-gray-400 text-sm mb-4">
                Subscribe to get the latest news and updates about PTDT.
              </p>
              
              {/* NEWSLETTER COMPONENT - BREVO POWERED */}
              <Newsletter />
            </div>
          </div>

          {/* Social Media Icons - STANDARD 4 + SPECIAL MEDIUM */}
          <div className="border-t border-zinc-800 pt-8">
            
            {/* MEDIUM - SPECIAL HIGHLIGHT SECTION */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-6 rounded-xl bg-gradient-to-r from-emerald-500/10 via-green-500/10 to-emerald-500/10 border-2 border-pink-500/30"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <motion.a
                    href={mediumLink.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative p-4 rounded-xl bg-gradient-to-br ${mediumLink.gradient} transition-all ${mediumLink.hoverGlow} shadow-lg`}
                    title={mediumLink.name}
                  >
                    <div className="relative z-10">
                      {mediumLink.icon}
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                  </motion.a>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="text-white font-bold text-xl">Medium Community</h5>
                      <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-full font-semibold animate-pulse">
                        {mediumLink.badge}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={18} className="text-pink-400" />
                      <span className="text-3xl font-bold text-emerald-400">{mediumLink.followers}</span>
                      <span className="text-gray-400 text-sm">Followers</span>
                    </div>
                  </div>
                </div>
                
                <a
                  href={mediumLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all"
                >
                  Follow on Medium
                </a>
              </div>
            </motion.div>

            {/* STANDARD SOCIAL MEDIA ICONS */}
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-x-[1px] gap-y-3 sm:gap-x-[2px] sm:gap-y-4 w-fit mx-auto mb-8 px-1 sm:px-0">
              {socialLinks.map((social, idx) => (
                <motion.div
                  key={idx}
                  className="flex w-[58px] sm:w-[62px] flex-col items-center gap-2"
                >
                  <motion.a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    className={`group relative p-3 rounded-xl bg-gradient-to-br ${social.gradient} transition-all ${social.hoverGlow}`}
                    title={social.name}
                  >
                    <div className="relative z-10">
                      {social.icon}
                    </div>
                    <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity blur-sm"></div>
                  </motion.a>
                  <span className="text-xs text-gray-500 font-semibold text-center leading-tight">
                    {social.followers}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Copyright */}
            <div className="text-center space-y-2">
              <p className="text-gray-400 text-sm">
                Copyrights © 2026 Peether - PTDT. Pink Taxi Group LTD. UK. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs flex items-center justify-center gap-1">
                Made with <Heart size={12} className="text-pink-500 fill-current animate-pulse" /> for women's safety
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-pink-500 to-emerald-400 text-white rounded-full shadow-lg hover:shadow-xl transition-all z-50 hover:scale-110"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 p-3 bg-gradient-to-r from-pink-500 to-emerald-400 text-white rounded-full shadow-lg hover:shadow-xl transition-all z-50 hover:scale-110"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* CONTACT SUPPORT MODAL - ADD THIS */}
      <ContactSupport 
        isOpen={showContactSupport}
        onClose={() => setShowContactSupport(false)}
      />
    </footer>
  );
}

// Inside your Footer component JSX:
<div className="newsletter-section">
  <h3>Subscribe to PTDT Updates</h3>
  <p>Get the latest news about our token sale and platform updates</p>
  <Newsletter />
</div>
