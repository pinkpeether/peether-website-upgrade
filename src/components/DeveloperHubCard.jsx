import { motion } from 'framer-motion';
import { Code, Shield, BookOpen, BarChart3, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

export default function DeveloperHubCard() {
  return (
    <div className="relative w-full max-w-7xl mx-auto my-16 px-4">
      
      {/* Main Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        
        {/* Glow Effect Background */}
        <div className="absolute -inset-4 bg-gradient-to-r from-pink-600 via-purple-600 to-green-600 rounded-3xl blur-2xl opacity-30 animate-pulse"></div>
        
        {/* Main Card - COMPACT HEIGHT */}
        <div className="relative bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-3xl overflow-hidden shadow-2xl border border-pink-500/20">
          
          {/* Animated Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(57,191,57,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(57,191,57,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          </div>
          
          {/* Content - REDUCED PADDING */}
          <div className="relative p-8 lg:p-12">
            
            {/* Badge - NOW ABOVE DESCRIPTION */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded-xl mb-6 shadow-lg"
            >
              <Sparkles size={20} className="text-white" />
              <span className="text-white font-bold text-sm">NOW LIVE: Developer Ecosystem</span>
            </motion.div>

            {/* Description - MOVED UP */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mb-10"
            >
              <p className="text-xl lg:text-2xl text-gray-300 max-w-3xl">
                Complete infrastructure to build blockchain-powered ride-hailing. 
                Production-ready APIs, security audits, and comprehensive documentation.
              </p>
            </motion.div>

            {/* Features Grid - TIGHTER SPACING */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
            >
              <a href="/ptdt-docs/ptdt_api_docs.html" className="group bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-pink-500/20 hover:border-pink-500/50 hover:bg-white/10 transition-all cursor-pointer">
                <Code size={28} className="text-pink-500 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-base mb-1">API Docs</h4>
                <p className="text-gray-400 text-xs mb-2">REST API & Web3 reference</p>
                <span className="text-pink-500 text-xs flex items-center gap-1">
                  Explore <ArrowRight size={14} />
                </span>
              </a>

              <a href="/ptdt-docs/ptdt_security_response_page.html" className="group bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-green-500/20 hover:border-green-500/50 hover:bg-white/10 transition-all cursor-pointer">
                <Shield size={28} className="text-green-500 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-base mb-1">Security</h4>
                <p className="text-gray-400 text-xs mb-2">9.2/10 Audit • OFAC Verified</p>
                <span className="text-green-500 text-xs flex items-center gap-1">
                  View Audit <ArrowRight size={14} />
                </span>
              </a>

              <a href="/ptdt-docs/ptdt_integrated_guide.html" className="group bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-purple-500/20 hover:border-purple-500/50 hover:bg-white/10 transition-all cursor-pointer">
                <BookOpen size={28} className="text-purple-500 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-base mb-1">Guides</h4>
                <p className="text-gray-400 text-xs mb-2">Integration & tutorials</p>
                <span className="text-purple-500 text-xs flex items-center gap-1">
                  Get Started <ArrowRight size={14} />
                </span>
              </a>

              <a href="/ptdt-docs/dashboard.html" className="group bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-blue-500/20 hover:border-blue-500/50 hover:bg-white/10 transition-all cursor-pointer">
                <BarChart3 size={28} className="text-blue-500 mb-2 group-hover:scale-110 transition-transform" />
                <h4 className="text-white font-bold text-base mb-1">Dashboard</h4>
                <p className="text-gray-400 text-xs mb-2">Live network metrics</p>
                <span className="text-blue-500 text-xs flex items-center gap-1">
                  View Stats <ArrowRight size={14} />
                </span>
              </a>
            </motion.div>

            {/* CTA Buttons - SMALLER */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <a 
                href="/ptdt-docs/ptdt_integrated_guide.html"
                className="group bg-gradient-to-r from-pink-500 to-purple-500 px-6 py-3 rounded-full font-bold text-white text-sm shadow-xl hover:shadow-pink-500/50 hover:scale-105 transition-all flex items-center gap-2"
              >
                Start Building
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              
              <a
                href="https://github.com/pinkpeether/peether-protocol"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/10 border border-white/20 px-6 py-3 rounded-full font-bold text-white text-sm hover:bg-white/20 transition-all flex items-center gap-2"
              >
                View on GitHub
                <ExternalLink size={18} />
              </a>
            </motion.div>

            {/* Stats Bar - COMPACT */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1 }}
              className="pt-6 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div>
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">9.2/10</div>
                <div className="text-gray-400 text-xs">Security Score</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500">100%</div>
                <div className="text-gray-400 text-xs">Open Source</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Production</div>
                <div className="text-gray-400 text-xs">Ready</div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="text-base font-bold text-green-500">Live</div>
                </div>
                <div className="text-gray-400 text-xs">All Systems</div>
              </div>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </div>
  );
}