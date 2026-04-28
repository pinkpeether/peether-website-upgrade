import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, ChevronDown, ChevronUp, X, Mail, 
  HelpCircle, Shield, Wallet, TrendingUp, Users, 
  Globe, Award, MessageCircle, Sparkles
} from "lucide-react";

const faqCategories = {
  general: {
    name: "General",
    icon: <HelpCircle size={20} />,
    solidColor: "#FB0A8B", // Pink
    iconColor: "text-pink-500",
    questions: [
      {
        q: "What is Peether PTDT?",
        a: "Peether PTDT (Peether Token) is a blockchain-based token powering a women-empowerment transportation platform. The concept originated in 2006 as Pink Taxi and has since expanded to 18+ countries, providing safe transportation for women and employment opportunities for female drivers."
      },
      {
        q: "What is the main objective of Peether PTDT?",
        a: "The main objective is to reduce and eliminate sexual harassment cases involving women during commuting. We provide safe, secure, and hassle-free transportation while empowering women economically through employment opportunities."
      },
      {
        q: "Why is Peether PTDT needed?",
        a: "In a world where a substantial portion of women using public transport face harassment, providing safe commuting is crucial for social stability. Peether PTDT addresses this critical need globally."
      },
      {
        q: "What makes Peether PTDT different from other ride-sharing platforms?",
        a: "Peether PTDT is exclusively women-focused with only female drivers and passengers, blockchain-based transparency and security, social impact mission (women empowerment), global presence in 18+ countries, proven track record since 2006, and token-based economy with rewards."
      },
      {
        q: "Is Pink Taxi only for women?",
        a: "Yes, Pink Taxi is a women-only service. Both drivers and passengers are female, creating a safe, comfortable environment for women."
      }
    ]
  },
  token: {
    name: "Token & Purchase",
    icon: <TrendingUp size={20} />,
    solidColor: "#10B981", // Emerald
    iconColor: "text-emerald-500",
    questions: [
      {
        q: "What is the Peether PTDT token symbol?",
        a: "The token symbol is PTDT (Peether Token)."
      },
      {
        q: "What are the benefits for token holders?",
        a: "Token holders receive: Free rides throughout the year in operational cities, ability to use tokens anywhere globally, enhanced earning opportunities (for driver token holders), participation in the token economy, and rewards and bonus miles."
      },
      {
        q: "How can I purchase PTDT tokens?",
        a: "Tokens can be purchased during our private sale using USDT on the Binance Smart Chain network. You need a BEP-20 compatible wallet like MetaMask or Trust Wallet. If you need assistance, contact support@ptdt.taxi"
      },
      {
        q: "What is the minimum and maximum purchase amount?",
        a: "Minimum: 10 USDT, Maximum per transaction: 500 USDT"
      },
      {
        q: "When will Peether PTDT be listed on exchanges?",
        a: "Exchange listings are planned for Q2-Q3 2025, starting with PancakeSwap (BSC DEX), followed by major centralized exchanges."
      },
      {
        q: "What exchanges are you targeting?",
        a: "We are in discussions with major exchanges including Binance, and will list on PancakeSwap initially, followed by other major platforms."
      }
    ]
  },
  technical: {
    name: "Technical",
    icon: <Shield size={20} />,
    solidColor: "#8B5CF6", // Purple
    iconColor: "text-purple-500",
    questions: [
      {
        q: "What network is Peether PTDT on?",
        a: "Peether PTDT operates on the Binance Smart Chain (BSC) using the BEP-20 token standard."
      },
      {
        q: "What wallet should I use?",
        a: "We recommend: Desktop - MetaMask or Trust Wallet Desktop, Mobile - Trust Wallet app. Your wallet must support BSC/BEP-20 tokens. Important: Never use exchange wallets directly. Always use a personal wallet where you control the private keys."
      }
    ]
  },
  operations: {
    name: "Operations & Expansion",
    icon: <Globe size={20} />,
    solidColor: "#3B82F6", // Blue
    iconColor: "text-blue-500",
    questions: [
      {
        q: "Where does Pink Taxi operate?",
        a: "Pink Taxi operates in 18+ countries including UAE, United States, India, Pakistan, Malaysia, Thailand, Australia, South Africa, Egypt, Turkey, Kuwait, Lebanon, Mexico, Iran, Russia, Armenia, and Mongolia."
      },
      {
        q: "What regions are priorities for expansion?",
        a: "Our expansion priorities include: Southern & Latin America, African markets, European markets, and strengthening presence in existing Asian markets. The Asian region shows particularly high demand given the history and success of the service."
      },
      {
        q: "How does Pink Taxi empower women?",
        a: "Pink Taxi provides a platform for women to participate in the economy and earn income with dignity and safety. It offers employment as drivers and ensures safe transportation for female passengers, eliminating fear of harassment."
      },
      {
        q: "Do drivers receive safety training?",
        a: "Yes! Our driver induction program includes extensive self-defense training. Female self-defense professionals with wide experience conduct regular training sessions at different skill levels for all drivers."
      }
    ]
  },
  tokenomics: {
    name: "Tokenomics & Rewards",
    icon: <Award size={20} />,
    solidColor: "#F59E0B", // Yellow/Amber
    iconColor: "text-yellow-500",
    questions: [
      {
        q: "How will token sale funds be used?",
        a: "Funds will be allocated as follows: 25% IT & Development, 15% Team Allocation, 15% Advisor & Legal, 12% Reserve/Treasury, 10% Marketing & Bounty, 8% Community Growth, 5% Private Sale, 5% Liquidity Pool, 5% Referral Program."
      },
      {
        q: "Is there a bounty program?",
        a: "Yes! Participants supporting Peether PTDT through social media and promotional activities can earn Peether PTDT tokens through our bounty campaign. Details will be announced through official channels."
      }
    ]
  }
};

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [popularQuestions, setPopularQuestions] = useState([]);
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

  useEffect(() => {
    // Simulate popular questions (in real app, this would come from analytics)
    const popular = [
      { category: "general", index: 0 },
      { category: "token", index: 2 },
      { category: "technical", index: 0 },
      { category: "operations", index: 0 }
    ];
    setPopularQuestions(popular);
  }, []);

  // Get all questions for filtering
  const getAllQuestions = () => {
    const allQuestions = [];
    Object.entries(faqCategories).forEach(([categoryKey, category]) => {
      category.questions.forEach((q, index) => {
        allQuestions.push({
          ...q,
          categoryKey,
          categoryName: category.name,
          categorySolidColor: category.solidColor,
          categoryIconColor: category.iconColor,
          index
        });
      });
    });
    return allQuestions;
  };

  // Filter questions based on search and category
  const getFilteredQuestions = () => {
    let questions = getAllQuestions();

    // Filter by category
    if (selectedCategory !== "all") {
      questions = questions.filter(q => q.categoryKey === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      questions = questions.filter(q => 
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return questions;
  };

  const toggleQuestion = (categoryKey, index) => {
    const key = `${categoryKey}-${index}`;
    setExpandedQuestion(expandedQuestion === key ? null : key);
  };

  const filteredQuestions = getFilteredQuestions();

  // Glass effect style helper
  const glassStyle = {
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    background: "linear-gradient(135deg, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.1) 100%)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)"
  };

  return (
    <section id="faq" className="relative z-10 py-24 px-6 md:px-12 scroll-mt-[85px]">
      {/* Animated dots background */}
      <canvas 
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0"
        style={{ pointerEvents: 'none' }}
      />

      {/* Add Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Lexend:wght@100;200;300;400;500&display=swap');
        
        .font-montserrat {
          font-family: 'Montserrat', sans-serif;
        }
        
        .font-lexend {
          font-family: 'Lexend', sans-serif;
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - SOLID PURPLE WITH GLASS EFFECT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <motion.div 
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 rounded-full px-6 py-2 mb-8 shadow-lg"
            style={{ 
              backgroundColor: '#a5a5a5ff',
            }}
          >
            <MessageCircle className="text-white" size={20} />
            <span className="font-montserrat text-sm font-semibold text-gray-150">Got Questions? We've Got Answers</span>
          </motion.div>

          <h2 
            className="font-montserrat text-5xl md:text-6xl font-semibold mb-6"
            style={{ color: '#FB0A8B', letterSpacing: '-0.035em' }}
          >
            Frequently Asked Questions
          </h2>
          <p className="font-lexend text-xl text-gray-700 max-w-3xl mx-auto" style={{ fontWeight: 300 }}>
            Everything you need to know about Peether PTDT and the Pink Taxi revolution
          </p>
        </motion.div>

        {/* Search Bar - GREY TINT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={24} />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="font-lexend w-full pl-10 pr-5 py-5 bg-gray-50 backdrop-blur-sm border-2 border-gray-200 rounded-2xl text-gray-800 text-lg placeholder:text-gray-400 focus:border-pink-400 focus:outline-none transition-all shadow-md"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 transition-colors"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Tabs - REVERSED STYLE: No background, colored text, grey outline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`font-montserrat px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-4 border ${
                selectedCategory === "all"
                  ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-xl border-transparent"
                  : "bg-transparent border-gray-300 shadow-lg hover:shadow-xl hover:scale-105"
              }`}
              style={selectedCategory !== "all" ? { color: '#FB0A8B' } : {}}
            >
              <Sparkles size={18} className={selectedCategory === "all" ? "text-white" : ""} style={selectedCategory !== "all" ? { color: '#FB0A8B' } : {}} />
              All Questions
            </button>
            {Object.entries(faqCategories).map(([key, category]) => (
              <button
                key={key}
                onClick={() => setSelectedCategory(key)}
                className={`font-montserrat px-6 py-3 rounded-full font-semibold transition-all flex items-center gap-2 border
                  ${selectedCategory === key 
                    ? "text-white shadow-xl border-transparent"
                    : "bg-transparent border-gray-300 shadow-lg hover:shadow-xl hover:scale-105"
                }`}
                style={selectedCategory === key 
                  ? { backgroundColor: category.solidColor } 
                  : { color: category.solidColor }
                }
              >
                <span style={selectedCategory !== key ? { color: category.solidColor } : { color: 'white' }}>
                  {category.icon}
                </span>
                {category.name}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Popular Questions - REDUCED SPACING */}
        {!searchQuery && selectedCategory === "all" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <div className="text-center mb-8">
              <h3 className="font-montserrat text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                <Sparkles className="text-yellow-500" size={24} />
                Most Popular Questions
              </h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {popularQuestions.map((popular, idx) => {
                const category = faqCategories[popular.category];
                const question = category.questions[popular.index];
                return (
                  <motion.button
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    onClick={() => toggleQuestion(popular.category, popular.index)}
                    className="bg-white/90 backdrop-blur-sm rounded-xl p-6 border-6 border-gray-200 hover:border-pink-300 transition-all text-left group hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <div className="flex items-start gap-4">
                      <div 
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md text-white"
                        style={{ backgroundColor: category.solidColor }}
                      >
                        {category.icon}
                      </div>
                      <div>
                        <p className="font-montserrat text-gray-800 font-semibold text-lg mb-1 group-hover:text-pink-500 transition-colors">
                          {question.q}
                        </p>
                        <p className="font-lexend text-gray-600 text-sm line-clamp-2" style={{ fontWeight: 300 }}>
                          {question.a}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Questions List */}
        {(searchQuery || selectedCategory !== "all") && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="space-y-4 mb-8"
          >
            <AnimatePresence mode="wait">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((question, index) => {
                const isExpanded = expandedQuestion === `${question.categoryKey}-${question.index}`;
                return (
                  <motion.div
                    key={`${question.categoryKey}-${question.index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="bg-white/90 backdrop-blur-sm rounded-xl border-2 border-gray-200 hover:border-pink-300 transition-all overflow-hidden shadow-lg hover:shadow-xl"
                  >
                    <button
                      onClick={() => toggleQuestion(question.categoryKey, question.index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left group"
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md text-white"
                          style={{ backgroundColor: question.categorySolidColor }}
                        >
                          <HelpCircle size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="font-montserrat text-gray-800 font-semibold text-lg group-hover:text-pink-500 transition-colors">
                            {question.q}
                          </p>
                          <p className="font-lexend text-gray-500 text-sm mt-1" style={{ fontWeight: 300 }}>
                            {question.categoryName}
                          </p>
                        </div>
                      </div>
                      <div className="ml-4">
                        {isExpanded ? (
                          <ChevronUp className="text-pink-500" size={24} />
                        ) : (
                          <ChevronDown className="text-gray-400 group-hover:text-pink-500 transition-colors" size={24} />
                        )}
                      </div>
                    </button>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-6 pt-2 border-t border-gray-200">
                            <div className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 ml-14">
                              <p className="font-lexend text-gray-700 text-base leading-relaxed" style={{ fontWeight: 300 }}>
                                {question.a}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Search className="text-gray-400" size={40} />
                </div>
                <p className="font-montserrat text-xl text-gray-600 mb-2">No questions found</p>
                <p className="font-lexend text-gray-500" style={{ fontWeight: 300 }}>Try adjusting your search or filters</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        )}

        {/* Default Message - REDUCED PADDING */}
        {!searchQuery && selectedCategory === "all" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-10"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-50 to-emerald-50 flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Search className="text-pink-500" size={40} />
            </div>
            <h3 className="font-montserrat text-2xl font-bold text-gray-800 mb-2 tracking-normal">Find Your Answer</h3>
            <p className="font-lexend text-gray-600 text-lg mb-1" style={{ fontWeight: 300 }}>
              Use the search bar above to find answers to your questions
            </p>
            <p className="font-lexend text-gray-500" style={{ fontWeight: 300 }}>
              Or select a category to browse specific topics
            </p>
          </motion.div>
        )}

        {/* Contact Support CTA - PINK-PURPLE GRADIENT WITH GREY BUTTON */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 text-center"
        >
          <div className="bg-gradient-to-r from-pink-500 to-pink-700 backdrop-blur-sm rounded-2xl p-10 shadow-2xl relative overflow-hidden">
            {/* Shimmer effect */}
            <div className="absolute inset-0 opacity-30">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
            
            <div className="relative z-10">
              <Mail className="mx-auto mb-4 text-white drop-shadow-lg" size={48} />
              <h3 className="font-montserrat text-2xl font-bold text-white mb-3 drop-shadow">Still have questions?</h3>
              <p className="font-lexend text-white/90 mb-6 max-w-2xl mx-auto" style={{ fontWeight: 300 }}>
                Can't find the answer you're looking for? Our support team is here to help you 24/7.
              </p>
              <a
                href="mailto:support@ptdt.taxi"
                className="font-montserrat inline-flex items-center gap-2 px-10 py-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all hover:from-gray-700 hover:to-gray-800"
              >
                <Mail size={20} />
                Contact Support
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
