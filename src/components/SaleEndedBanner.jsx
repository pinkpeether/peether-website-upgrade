import { motion } from "framer-motion";
import { Trophy, TrendingUp, Users, Globe, Gift } from "lucide-react";

export default function SaleEndedBanner() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden"
    >
      {/* Compact Banner - 70% Taller */}
      <div className="relative bg-gradient-to-br from-white via-pink-50 to-purple-50 border-2 border-pink-200 rounded-3xl p-12 md:p-12 shadow-2xl">
        
        {/* Header with Trophy */}
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          {/* Trophy Icon - Larger */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full blur-xl opacity-50 animate-pulse" />
            <div className="relative w-20 h-20 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
              <Trophy className="w-10 h-10 text-white" />
            </div>
          </div>
          
          {/* Title - Inline */}
          <h2 className="text-3xl md:text-5xl font-bold font-montserrat">
            <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              🎉 Private Sale Complete! 🎉
            </span>
          </h2>
        </motion.div>

        {/* Thank You Message */}
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center text-gray-800 text-xl md:text-2xl mb-10 font-lexend max-w-3xl mx-auto leading-relaxed"
        >
          A heartfelt <span className="text-pink-600 font-semibold">THANK YOU</span> to our incredible community! 
          Your trust and support have made this milestone possible. We are forever grateful! 🙏
        </motion.p>

        {/* Stats - Single Row */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8"
        >
          {/* Holders */}
          <div className="bg-white border-2 border-green-200 rounded-2xl px-6 py-5 text-center shadow-md hover:shadow-lg transition-shadow min-w-[130px]">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-green-600 font-montserrat mb-1">101</p>
            <p className="text-sm text-gray-500 font-lexend">Holders</p>
          </div>

          {/* Raised */}
          <div className="bg-white border-2 border-purple-200 rounded-2xl px-6 py-5 text-center shadow-md hover:shadow-lg transition-shadow min-w-[130px]">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-purple-600 font-montserrat mb-1">$1,042</p>
            <p className="text-sm text-gray-500 font-lexend">USDT Raised</p>
          </div>

          {/* Investors */}
          <div className="bg-white border-2 border-blue-200 rounded-2xl px-6 py-5 text-center shadow-md hover:shadow-lg transition-shadow min-w-[130px]">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-blue-600 font-montserrat mb-1">100</p>
            <p className="text-sm text-gray-500 font-lexend">Investors</p>
          </div>

          {/* Countries */}
          <div className="bg-white border-2 border-teal-200 rounded-2xl px-6 py-5 text-center shadow-md hover:shadow-lg transition-shadow min-w-[130px]">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-3xl font-bold text-teal-600 font-montserrat mb-1">57</p>
            <p className="text-sm text-gray-500 font-lexend">Countries</p>
          </div>

          {/* Bonus PTDT */}
          <div className="bg-white border-2 border-amber-200 rounded-2xl px-6 py-5 text-center shadow-md hover:shadow-lg transition-shadow min-w-[130px]">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <Gift className="w-6 h-6 text-white" />
              </div>
            </div>
            <p className="text-2xl font-bold text-amber-600 font-montserrat mb-1">143.37</p>
            <p className="text-sm text-gray-500 font-lexend">Bonus PTDT</p>
          </div>
        </motion.div>

        {/* Thank You - Compact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-2 text-pink-600 text-base md:text-lg"
        >
          <span className="text-xl animate-pulse">❤️</span>
          <span className="font-semibold font-lexend text-center">
            Thank you to our PTDT family across 57 countries!
          </span>
          <span className="text-xl animate-pulse">❤️</span>
        </motion.div>

      </div>
    </motion.div>
  );
}
