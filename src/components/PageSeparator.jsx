import { motion } from "framer-motion";


export default function PageSeparator() {
  return (
    <div className="relative py-4 overflow-hidden">
      {/* Gradient line - dark grey for black background */}
      <div className="relative h-0.5 px bg-gradient-to-r from-transparent via-gray-400/30 to-transparent">
        {/* Animated shimmer - very subtle */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-600/30 to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>
      
      {/* Center dot accent with subtle colors */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800/70 px-2">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-pink-400/50"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-gray-500/60"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400/50"></div>
        </div>
      </div>
    </div>
  );
}
