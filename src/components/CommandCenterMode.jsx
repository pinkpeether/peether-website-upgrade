import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Shield, BookOpen, BarChart3, Zap, X, ExternalLink, Terminal, FileCode, GitBranch } from 'lucide-react';

export default function CommandCenterMode() {
  const [isActive, setIsActive] = useState(() => {
    // Check localStorage for saved preference
    return localStorage.getItem('ptdt_command_center') === 'true';
  });
  
  const [stats, setStats] = useState({
    transactions: 1247,
    nodes: 45,
    price: 1.02,
    volume: 45230
  });

  // Simulate live stats updates
  useEffect(() => {
    if (!isActive) return;
    
    const interval = setInterval(() => {
      setStats(prev => ({
        transactions: prev.transactions + Math.floor(Math.random() * 5),
        nodes: 42 + Math.floor(Math.random() * 8),
        price: +(1.0 + Math.random() * 0.15).toFixed(2),
        volume: prev.volume + Math.floor(Math.random() * 500)
      }));
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isActive]);

  // Save preference to localStorage
  useEffect(() => {
    localStorage.setItem('ptdt_command_center', isActive);
    
    // Add/remove dark mode class to body
    if (isActive) {
      document.body.classList.add('command-center-mode');
    } else {
      document.body.classList.remove('command-center-mode');
    }
  }, [isActive]);

  const toggleMode = () => setIsActive(!isActive);

  return (
    <>
      {/* Global Styles */}
      <style>{`
        body.command-center-mode {
          background: linear-gradient(to bottom right, #0a0a0f, #1a1a2e, #0a0a0f) !important;
        }
        
        body.command-center-mode .hero-section,
        body.command-center-mode .about-section,
        body.command-center-mode .participate-section {
          opacity: 0.6;
          filter: brightness(0.7);
        }
      `}</style>

      {/* Toggle Button - Fixed Bottom Right */}
      <motion.button
        onClick={toggleMode}
        className={`fixed bottom-6 right-6 z-[9999] px-6 py-3 rounded-full font-bold shadow-2xl transform transition-all duration-300 hover:scale-110 flex items-center gap-2 ${
          isActive
            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
            : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isActive ? <X size={20} /> : <Zap size={20} />}
        <span className="font-montserrat font-bold text-sm">
          {isActive ? 'EXIT BUILDER MODE' : 'BUILDER MODE'}
        </span>
      </motion.button>

      {/* Sidebar - Only shows when active */}
      <AnimatePresence>
        {isActive && (
          <motion.aside
            initial={{ x: -400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -400, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed left-0 top-[114px] bottom-0 w-80 bg-black/90 backdrop-blur-xl z-[9998] shadow-2xl border-r border-pink-500/20 overflow-y-auto"
          >
            <div className="p-6">
              
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                  <Terminal size={24} className="text-pink-500" />
                  <h2 className="text-white font-bold text-xl font-montserrat">COMMAND CENTER</h2>
                </div>
                <p className="text-gray-400 text-sm">Full developer control panel</p>
              </div>

              {/* Live Network Stats */}
              <div className="mb-8">
                <h3 className="text-purple-300 font-semibold mb-4 flex items-center gap-2 font-montserrat">
                  <BarChart3 size={18} />
                  LIVE NETWORK
                </h3>
                
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-purple-900/60 to-pink-900/40 rounded-lg p-4 border border-purple-500/30">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-gray-400 text-xs">Transactions</span>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                    <div className="text-white text-2xl font-bold">{stats.transactions.toLocaleString()}</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-900/60 to-purple-900/40 rounded-lg p-4 border border-blue-500/30">
                    <div className="text-gray-400 text-xs mb-1">Active Nodes</div>
                    <div className="text-white text-2xl font-bold">{stats.nodes}</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-900/60 to-emerald-900/40 rounded-lg p-4 border border-green-500/30">
                    <div className="text-gray-400 text-xs mb-1">PTDT Price</div>
                    <div className="text-white text-2xl font-bold">${stats.price}</div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-pink-900/60 to-purple-900/40 rounded-lg p-4 border border-pink-500/30">
                    <div className="text-gray-400 text-xs mb-1">24h Volume</div>
                    <div className="text-white text-2xl font-bold">${stats.volume.toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {/* Quick Access Links */}
              <div className="mb-8">
                <h3 className="text-purple-300 font-semibold mb-4 flex items-center gap-2 font-montserrat">
                  <FileCode size={18} />
                  DEVELOPER TOOLS
                </h3>
                
                <nav className="space-y-2">
                  <a 
                    href="/ptdt-docs/ptdt_api_docs.html"
                    className="flex items-center gap-3 bg-purple-900/40 hover:bg-purple-800/60 rounded-lg p-3 transition-colors text-white group"
                  >
                    <Code size={18} className="text-purple-400 group-hover:text-purple-300" />
                    <span className="text-sm">API Documentation</span>
                  </a>
                  
                  <a 
                    href="/ptdt-docs/ptdt_security_response_page.html"
                    className="flex items-center gap-3 bg-purple-900/40 hover:bg-purple-800/60 rounded-lg p-3 transition-colors text-white group"
                  >
                    <Shield size={18} className="text-green-400 group-hover:text-green-300" />
                    <span className="text-sm">Security Audit</span>
                  </a>
                  
                  <a 
                    href="/ptdt-docs/ptdt_integrated_guide.html"
                    className="flex items-center gap-3 bg-purple-900/40 hover:bg-purple-800/60 rounded-lg p-3 transition-colors text-white group"
                  >
                    <BookOpen size={18} className="text-blue-400 group-hover:text-blue-300" />
                    <span className="text-sm">Integration Guide</span>
                  </a>
                  
                  <a 
                    href="/ptdt-docs/dashboard.html"
                    className="flex items-center gap-3 bg-purple-900/40 hover:bg-purple-800/60 rounded-lg p-3 transition-colors text-white group"
                  >
                    <BarChart3 size={18} className="text-yellow-400 group-hover:text-yellow-300" />
                    <span className="text-sm">Live Dashboard</span>
                  </a>
                  
                  <a 
                    href="https://github.com/pinkpeether/peether-protocol"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-purple-900/40 hover:bg-purple-800/60 rounded-lg p-3 transition-colors text-white group"
                  >
                    <GitBranch size={18} className="text-pink-400 group-hover:text-pink-300" />
                    <span className="text-sm">GitHub Repository</span>
                    <ExternalLink size={14} className="ml-auto opacity-50" />
                  </a>
                </nav>
              </div>

              {/* System Status */}
              <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4">
                <div className="flex items-center gap-2 text-green-400 text-sm mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="font-semibold">All Systems Operational</span>
                </div>
                <div className="text-green-300/70 text-xs">
                  BSC Network: Active<br/>
                  API Endpoints: 100% Uptime<br/>
                  Smart Contract: Verified
                </div>
              </div>

              {/* Quick Code Snippet */}
              <div className="mt-8 bg-gray-900 rounded-lg p-4 border border-purple-500/30">
                <div className="text-purple-300 text-xs font-mono mb-2">// Quick Start</div>
                <code className="text-green-400 text-xs font-mono block">
                  npm install @ptdt/sdk<br/>
                  <span className="text-gray-500">// Start building now!</span>
                </code>
              </div>

            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Content Spacer - Pushes content right when sidebar is active */}
      {isActive && (
        <div className="fixed left-0 top-[114px] w-80 h-screen pointer-events-none" />
      )}
    </>
  );
}