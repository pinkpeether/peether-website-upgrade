import { motion } from "framer-motion";


export default function HeroSeparator() {
  return (
    <div className="relative py-6 overflow-hidden">
      {/* Top line - dark grey for black background */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-700/40 to-transparent -translate-y-9"></div>
      
      {/* Bottom line - dark grey for black background */}
      <div className="absolute top-1/2 left-0 right-0 h-px inset-0 bg-gradient-to-r from-transparent via-gray-700/40 translate-y-9"></div>
      
      {/* Center logo container */}
      <motion.div 
        className="relative flex justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Glowing shadow around the circle */}
        <div className="absolute inset-0 rounded-full shadow-[0_0_30px_rgba(251,10,139,0.3),0_0_50px_rgba(0,225,110,0.2)] blur-md"></div>
        
        <div className="relative bg-gradient-to-br from-gray-700 to-gray-800 rounded-full border border-gray-600/70 shadow-lg">
          {/* Logo with transparency */}
          <img 
            src="/web-app-manifest-512x512.png" 
            alt="PTDT" 
            className="h-12 w-12 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
            onError={(e) => {
              e.currentTarget.src = "/pinkptdtlogo.png";
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
