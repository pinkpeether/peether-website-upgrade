import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Signup from "../components/SignupForm/Signup";
import SignIn from "../components/SignInForm/SignIn";
import AccountModal from "../components/AccountModal";
import { X, Menu, ChevronUp, UserCheck, LogOut, Rocket, ShieldCheck, ExternalLink } from "lucide-react";
import { generateAuthToken } from "../utils/authToken";
import { SignUpCircle } from "./icons/SignUpCircle";
import { SignInCircle } from "./icons/SignInCircle";

const navLinks = [
  { name: "About", href: "#about", id: "about" },
  { name: "Tokenomics", href: "#tokenomics", id: "tokenomics" },
  { name: "Roadmap", href: "#roadmap", id: "roadmap" },
  { name: "Legacy", href: "#legacy", id: "legacy" },
  { name: "Gallery", href: "#gallery", id: "gallery" },
  { name: "Participate", href: "#participate", id: "participate" },
  { name: "FAQ", href: "#faq", id: "faq" },
];

const sections = ["hero", "about", "tokenomics", "roadmap", "legacy", "gallery", "participate", "faq"];

export default function Navbar({ 
  showSignup, 
  setShowSignup,
  showSignIn,
  setShowSignIn,
  isAuthenticated,
  user,
  isLoading,
  onAuthChange,
  onSignOut,
}) {

  // ADD THIS DEBUG LOG
//  console.log('🎨 Navbar RENDER:', { 
 //   isAuthenticated, 
 //   userEmail: user?.email, 
 //   isLoading,
//    hasUser: !!user 
 // });

  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const toggleMenu = () => setIsOpen((prev) => !prev);

  // ========== FIXED: DApp Click Handler ==========
  const handleDAppClick = (e) => {
    e.preventDefault();
    console.log("🚀 Launch DApp clicked");
    
    if (!isAuthenticated || !user) {
      console.log("No session - showing signup");
      localStorage.setItem("ptdt_redirect_after_auth", "dapp");
      setShowSignup(true);
      setIsOpen(false);
      return;
    }
    
    try {
      const tokenData = {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        wallet: user.wallet || '',
        country: user.country || '',
        tier: user.tier || 'STANDARD',
        isWhitelisted: user.isWhitelisted || false,
        registeredAt: user.registeredAt,
      };
      
      const authToken = generateAuthToken(tokenData);
      const dappUrl = `https://dapp.ptdt.taxi?auth=${authToken}`;
      
      console.log("Opening DApp in new tab...");
      
      // FIXED: Always use window.open with _blank, never use location.href
      window.open(dappUrl, '_blank', 'noopener,noreferrer');
      
    } catch (error) {
      console.error('Error handling DApp click:', error);
      // Fallback - still open in new tab
      window.open('https://dapp.ptdt.taxi', '_blank', 'noopener,noreferrer');
    }
  };

  // Listen for openAccountModal event (from Welcome Modal)
  useEffect(() => {
  const handleOpenAccountModal = () => setShowAccountModal(true);
  window.addEventListener("openAccountModal", handleOpenAccountModal);
  return () => window.removeEventListener("openAccountModal", handleOpenAccountModal);
  }, []);

  // Listen for openSignInModal event
  useEffect(() => {
    const handleOpenSignInModal = () => setShowSignIn(true);
    window.addEventListener("openSignInModal", handleOpenSignInModal);
    return () => window.removeEventListener("openSignInModal", handleOpenSignInModal);
  }, [setShowSignIn]);

  // Auto-open Signup from URL
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const shouldOpenSignup = urlParams.get('openSignup');
    
    if (shouldOpenSignup === 'true') {
      setTimeout(() => setShowSignup(true), 300);
      const cleanUrl = window.location.pathname + window.location.hash;
      window.history.replaceState({}, document.title, cleanUrl);
    }
  }, [setShowSignup]);

  // Scroll Detection
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      setShowScrollTop(window.scrollY > 500);
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ESC Key Handler
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key !== "Escape") return;
      if (showSignup) setShowSignup(false);
      if (showSignIn) setShowSignIn(false);
      if (showAccountModal) setShowAccountModal(false);
      if (isOpen) setIsOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [showSignup, showSignIn, showAccountModal, isOpen, setShowSignup, setShowSignIn]);

  // Listen for openSignupModal event
  useEffect(() => {
    const handleOpenSignupModal = () => setShowSignup(true);
    window.addEventListener("openSignupModal", handleOpenSignupModal);
    return () => window.removeEventListener("openSignupModal", handleOpenSignupModal);
  }, [setShowSignup]);

  const handleSignOut = async () => {
    console.log("🔴 Navbar: Sign Out clicked");
    setShowAccountModal(false);
    setIsOpen(false);
    if (onSignOut) await onSignOut();
  };

  const handleOpenAccount = () => {
    setShowSignup(false);
    setShowSignIn(false);
    setIsOpen(false);
    setTimeout(() => setShowAccountModal(true), 100);
  };

  const handleOpenSignup = () => {
    setShowSignIn(false);
    setShowAccountModal(false);
    setTimeout(() => setShowSignup(true), 100);
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    
    if (element) {
      const offset = 114;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    
    if (isOpen) setIsOpen(false);
  };
  
  const getFirstName = () => user?.fullName?.split(" ")[0] || "User";

  const modalStyles = {
    WebkitOverflowScrolling: "touch",
    boxShadow: "0 12px 32px rgba(0,0,0,0.15),0 6px 16px rgba(0,0,0,0.1),inset 0 2px 4px rgba(255,255,255,0.9),inset 2px 0 4px rgba(255,255,255,0.5),inset 0 -2px 4px rgba(0,0,0,0.08),inset -2px 0 4px rgba(0,0,0,0.05),0 0 0 1px rgba(75,85,99,0.2)",
  };

  const AuditRibbon = () => (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative overflow-hidden shadow-[0_3px_3px_rgba(0,0,0,0.2)]"
      style={{ background: 'linear-gradient(to top, #777777ff, #6b21a8, #9e72e9ff)' }}
    >
      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
        @keyframes lubDub {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
          10% { transform: scale(1.1); box-shadow: 0 0 8px 3px rgba(255, 255, 255, 0.3); }
          20% { transform: scale(1); }
          30% { transform: scale(1.07); box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.2); }
          40% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }
        .animate-shimmer { animation: shimmer 3s infinite; }
        .animate-lub-dub { animation: lubDub 2s ease-in-out infinite; }
      `}</style>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
      
      <a
        href="https://lime-capitalist-canid-406.mypinata.cloud/ipfs/bafkreibvhgi5mhutt6agzrdjki7gxecpr5cvx26yvdyn6kigyumzm6ghuq"
        target="_blank"
        rel="noopener noreferrer"
        className="block max-w-7xl mx-auto px-3 sm:px-4 py-2 sm:py-2.5"
      >
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-white text-xs sm:text-sm">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <ShieldCheck size={16} className="text-purple-200 sm:w-[18px] sm:h-[18px]" />
            <span className="font-semibold hidden xs:inline">Smart Contract Security Verified</span>
            <span className="font-semibold xs:hidden">Security Verified</span>
          </div>
          <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-white/20 rounded-full font-bold text-[10px] sm:text-xs">9.2/10</span>
          <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-pink-600 hover:bg-pink-800 rounded-full font-bold text-xs border border-white/20 shadow-md cursor-pointer transition-colors animate-lub-dub">
            <span>View Audited Report</span>
            <ExternalLink size={14} />
          </span>
          <span className="sm:hidden flex items-center justify-center w-7 h-7 bg-purple-950/70 rounded-full border border-white/20 shadow-md animate-lub-dub">
            <ExternalLink size={12} className="text-white" />
          </span>
        </div>
      </a>
    </motion.div>
  );

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60]">
        <AuditRibbon />
      </div>

      <motion.nav
        initial={false}
        className={`fixed top-[42px] left-0 right-0 z-50 transition-all duration-500 bg-white ${
          scrolled ? "shadow-[0_6px_20px_rgba(0,0,0,0.2)]" : "shadow-[0_3px_6px_rgba(0,0,0,0.1)]"
        }`}
      >
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          <div className="max-w-7xl mx-auto px-6 py-3">
            <div className="flex items-center justify-between">
              <a 
                href="#hero" 
                onClick={(e) => handleNavClick(e, '#hero')}
                className="flex items-center gap-3 group relative"
              >
                <img
                  src="/pinkptdtlogo.png"
                  alt="PTDT Logo"
                  className="h-14 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(251,10,139,0.4)]"
                />
                {activeSection === "hero" && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full shadow-lg shadow-emerald-400/50"
                  >
                    <span className="absolute inset-0 bg-emerald-400 rounded-full animate-ping" />
                  </motion.div>
                )}
              </a>

              <div className="hidden lg:flex items-center gap-1">
                {navLinks.map((link, idx) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.a
                      key={idx}
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className={`font-lexend relative px-4 py-2.5 font-medium text-sm transition-all duration-300 rounded-full ${
                        isActive ? "text-pink-600 font-bold" : "text-gray-700 hover:text-pink-600"
                      }`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="navbar-underline"
                          className="absolute bottom-1 left-3 right-3 h-0.5 bg-pink-500 rounded-full"
                        />
                      )}
                      <span className="relative z-10">{link.name}</span>
                    </motion.a>
                  );
                })}

                <motion.a
                  href="https://www.ptdt.taxi/whitepaper.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-montserrat px-4 py-2 text-sm font-bold text-pink-600 hover:text-pink-700 transition-all"
                >
                  <span className="block text-center leading-tight">WHITE<br />PAPER</span>
                </motion.a>

                <motion.button
                  type="button"
                  onClick={handleDAppClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="font-montserrat px-3 py-2 bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 text-white rounded-full font-bold text-sm shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] inline-flex items-center gap-1 ml-2 transition-all"
                >
                  <Rocket size={18} />
                  <span>Launch DApp</span>
                </motion.button>

                {/* Auth Buttons - Desktop */}
{isLoading ? (
  // Show loading state instead of hiding everything
  <div className="ml-2 flex items-center gap-2">
    <div className="w-16 h-8 bg-gray-200 animate-pulse rounded-full"></div>
    <div className="w-16 h-8 bg-gray-200 animate-pulse rounded-full"></div>
  </div>
) : !isAuthenticated ? (
  <>
    <motion.button
      type="button"
      onClick={() => setShowSignup(true)}
      whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 20px rgba(255,57,170,0.5))" }}
      whileTap={{ scale: 0.95 }}
      className="relative ml-2 group transition-all duration-300"
      title="Sign Up"
    >
      <div className="relative w-16 h-16">
        <SignUpCircle size={64} className="absolute inset-0" />
        <div className="absolute inset-0 flex flex-col items-center justify-center font-montserrat font-bold text-pink-600 pointer-events-none z-10">
          <span className="text-[11px] tracking-wide leading-none">SIGN</span>
          <span className="text-[15px] font-extrabold leading-none -mt-0.1">UP</span>
        </div>
      </div>
    </motion.button>

    <motion.button
      type="button"
      onClick={() => setShowSignIn(true)}
      whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 20px rgba(42,233,123,0.5))" }}
      whileTap={{ scale: 0.95 }}
      className="relative ml-2 group transition-all duration-300"
      title="Sign In"
    >
      <div className="relative w-16 h-16">
        <SignInCircle size={64} className="absolute inset-0" />
        <div className="absolute inset-0 flex flex-col items-center justify-center font-montserrat font-bold text-emerald-600 pointer-events-none z-10">
          <span className="text-[10px] tracking-wide">SIGN</span>
          <span className="text-[15px] font-extrabold leading-none -mt-0.1">IN</span>
        </div>
      </div>
    </motion.button>
  </>
) : (
  <div className="flex items-center gap-2 ml-2">
    <motion.div className="font-lexend text-sm font-medium text-gray-700 px-2">
      Hi, <span className="text-pink-600 font-semibold">{getFirstName()}</span>!
    </motion.div>

    <motion.button
      type="button"
      onClick={handleOpenAccount}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="font-montserrat relative px-4 py-2.5 rounded-full font-bold text-sm text-white overflow-hidden shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600" />
      <span className="relative flex items-center gap-2">
        <UserCheck size={16} />
        <span>My Account</span>
      </span>
    </motion.button>

    <motion.button
      type="button"
      onClick={handleSignOut}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="font-montserrat relative px-4 py-2.5 rounded-full font-bold text-sm text-white overflow-hidden shadow-lg"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600" />
      <span className="relative flex items-center gap-2">
        <LogOut size={16} />
        <span>Sign Out</span>
      </span>
    </motion.button>
  </div>
)}
               
              </div>

              {/* Mobile: Launch DApp Button */}
              <motion.button
                type="button"
                onClick={handleDAppClick}
                whileTap={{ scale: 0.95 }}
                className="lg:hidden font-montserrat px-3 py-2 bg-gradient-to-r from-pink-500 via-pink-600 to-purple-600 text-white rounded-full font-bold text-[10px] shadow-[0_0_15px_rgba(236,72,153,0.4)] inline-flex items-center gap-1"
              >
                <Rocket size={12} />
                <span>DApp</span>
              </motion.button>

              {/* Mobile: Menu Toggle */}
              <motion.button
                type="button"
                onClick={toggleMenu}
                className="lg:hidden relative p-3 rounded-xl text-white shadow-lg transition-all"
                style={{
                  background: "linear-gradient(135deg, rgba(236,72,153,0.9), rgba(219,39,119,0.9))",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  boxShadow: "0 4px 16px 0 rgba(236,72,153,0.4)",
                }}
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                      <X size={24} />
                    </motion.div>
                  ) : (
                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                      <Menu size={24} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="px-6 py-4 bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
                  {isAuthenticated && user && (
                    <div className="font-lexend text-sm font-medium text-gray-700 mb-3 pb-3 border-b border-gray-200">
                      Welcome back, <span className="text-pink-600 font-semibold">{getFirstName()}</span>!
                    </div>
                  )}

                  {navLinks.map((link, idx) => (
                    <motion.button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        setTimeout(() => {
                          const element = document.getElementById(link.id);
                          if (element) {
                            const offset = 114;
                            const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
                            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                          }
                        }, 50);
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="font-lexend w-full text-left block px-4 py-3 font-medium rounded-xl transition-all text-gray-700 hover:text-pink-600 hover:bg-pink-50"
                    >
                      {link.name}
                    </motion.button>
                  ))}

                  <motion.a
                    href="https://www.ptdt.taxi/whitepaper.html"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="font-lexend block px-4 py-3 font-medium rounded-xl text-pink-600 hover:bg-pink-50 text-center"
                  >
                    WHITE PAPER
                  </motion.a>

                  {isAuthenticated ? (
                    <div className="space-y-3 mt-4">
                      <motion.button
                        type="button"
                        onClick={() => { setIsOpen(false); setTimeout(handleOpenAccount, 100); }}
                        className="font-montserrat w-full relative px-5 py-4 rounded-xl font-bold text-sm text-white overflow-hidden shadow-lg"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-emerald-600" />
                        <span className="relative flex items-center justify-center gap-2">
                          <UserCheck size={18} />
                          <span>My Account</span>
                        </span>
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={() => { setIsOpen(false); setTimeout(handleSignOut, 100); }}
                        className="font-montserrat w-full relative px-5 py-4 rounded-xl font-bold text-sm text-white overflow-hidden shadow-lg"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600" />
                        <span className="relative flex items-center justify-center gap-2">
                          <LogOut size={18} />
                          <span>Sign Out</span>
                        </span>
                      </motion.button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-4 mt-1 mb-2">
                      <motion.button
                        type="button"
                        onClick={() => { setIsOpen(false); setTimeout(() => setShowSignup(true), 100); }}
                        className="relative flex flex-col items-center gap-2"
                      >
                        <SignUpCircle size={80} className="drop-shadow-lg" />
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-montserrat font-bold text-[#ff39aa] text-[13px] leading-tight text-center pointer-events-none">
                          SIGN<br/>UP
                        </span>
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={() => { setIsOpen(false); setTimeout(() => setShowSignIn(true), 100); }}
                        className="relative flex flex-col items-center gap-2"
                      >
                        <SignInCircle size={80} className="drop-shadow-lg" />
                        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-montserrat font-bold text-[#2ae97b] text-[13px] leading-tight text-center pointer-events-none">
                          SIGN<br/>IN
                        </span>
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.nav>

      {/* Scroll to Top */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 p-4 bg-gradient-to-r from-pink-500 to-emerald-400 text-white rounded-full shadow-[0_0_30px_rgba(236,72,153,0.5)] z-50"
          >
            <ChevronUp size={24} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Signup Modal */}
      <AnimatePresence>
        {showSignup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowSignup(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative rounded-3xl w-full max-w-md max-h-[90dvh] p-[6px]"
              style={modalStyles}
            >
              <div className="bg-white rounded-[18px] w-full h-full overflow-y-auto overscroll-contain hide-scrollbar">
                <motion.button
                  type="button"
                  onClick={() => setShowSignup(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-2 right-2 w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white flex items-center justify-center z-10 shadow-lg border-2 border-pink-300"
                >
                  <X size={20} />
                </motion.button>
                <div className="p-4">
                  <Signup
                    onAuthChange={onAuthChange}
                    onClose={() => setShowSignup(false)}
                    onOpenAccount={handleOpenAccount}
                    onOpenSignIn={() => setShowSignIn(true)}
                    isAuthenticated={isAuthenticated}  // ADD THIS
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SignIn Modal */}
      <AnimatePresence>
        {showSignIn && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowSignIn(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative rounded-3xl w-full max-w-md max-h-[90dvh] p-[6px]"
              style={modalStyles}
            >
              <div className="bg-white rounded-[18px] w-full h-full overflow-y-auto overscroll-contain hide-scrollbar">
                <motion.button
                  type="button"
                  onClick={() => setShowSignIn(false)}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-2 right-2 w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white flex items-center justify-center z-10 shadow-lg border-2 border-pink-300"
                >
                  <X size={20} />
                </motion.button>
                <div className="p-4">
                  <SignIn 
                    onClose={() => setShowSignIn(false)} 
                    onAuthChange={onAuthChange} 
                    onOpenSignup={handleOpenSignup} 
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Account Modal */}
      <AccountModal 
        isOpen={showAccountModal} 
        onClose={() => setShowAccountModal(false)} 
        userData={user} 
        onSignOut={handleSignOut} 
      />
    </>
  );
}