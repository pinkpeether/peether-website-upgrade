import { motion } from "framer-motion";
import { Shield, Users, TrendingUp, Award } from "lucide-react";
import ParticleCanvas from "./ParticleCanvas";

export default function About() {
  return (
    <section id="about" className="relative z-10 py-24 px-6 md:px-12 scroll-mt-[85px]">
      {/* Optimized Particle Background */}
      <ParticleCanvas particleCount={60} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 
            className="font-montserrat text-4xl md:text-5xl font-bold mb-3"
            style={{ color: '#FB0A8B', letterSpacing: '-0.035em' }}
          >
            About Peether PTDT
          </h2>
          <p className="font-lexend text-xl italic text-gray-700 max-w-3xl mx-auto" style={{ fontWeight: 300 }}>
            From Pink Taxi's Legacy to Crypto's Future
          </p>
          <p className="font-lexend text-2xl text-gray-600 font-semibold max-w-3xl mx-auto mt-3" style={{ fontWeight: 400 }}>
            19 Years of Women's Safety. Now Fueled by Blockchain.
          </p>
        </motion.div>

        {/* Quick Impact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-pink-400/40 shadow-lg text-center">
            <Users className="mx-auto mb-3 text-pink-500" size={32} />
            <div className="font-montserrat text-3xl font-bold text-pink-500 mb-1">3000+</div>
            <div className="font-lexend text-sm text-gray-600" style={{ fontWeight: 300 }}>Women Drivers</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-emerald-400/40 shadow-lg text-center">
            <Shield className="mx-auto mb-3 text-emerald-500" size={32} />
            <div className="font-montserrat text-3xl font-bold text-emerald-500 mb-1">100%</div>
            <div className="font-lexend text-sm text-gray-600" style={{ fontWeight: 300 }}>Women-Only</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-pink-400/40 shadow-lg text-center">
            <TrendingUp className="mx-auto mb-3 text-pink-500" size={32} />
            <div className="font-montserrat text-3xl font-bold text-pink-500 mb-1">10+</div>
            <div className="font-lexend text-sm text-gray-600" style={{ fontWeight: 300 }}>Countries</div>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-emerald-400/40 shadow-lg text-center">
            <Award className="mx-auto mb-3 text-emerald-500" size={32} />
            <div className="font-montserrat text-3xl font-bold text-emerald-500 mb-1">2006</div>
            <div className="font-lexend text-sm text-gray-600" style={{ fontWeight: 300 }}>Est. Since</div>
          </div>
        </motion.div>

        {/* Core Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-transparent via-gray-300/30 to-transparent rounded-2xl p-8 md:p-8 border border-gray-200/10 shadow-lg hover:border-gray-400/50 transition-all">
            <h3 className="font-montserrat text-2xl md:text-3xl font-semibold text-pink-500 mb-6 text-center tracking-tight">
              Our Mission
            </h3>
            <p className="font-lexend text-lg leading-relaxed text-gray-700 text-center max-w-5xl mx-auto" style={{ fontWeight: 300 }}>
              Pink Taxi didn't just move women—it moved cultures. Now, Peether PTDT turbocharges that mission:
              <br /><br />
              <span className="text-pink-500 font-semibold">For Riders:</span> Turn every ride into a paid journey with PTDT rewards.
              <br />
              <span className="text-emerald-500 font-semibold">For Drivers:</span> A crypto-powered income stream wrapped in safety.
              <br />
              <span className="text-yellow-600 font-semibold">For Holders:</span> Own a token backed by 19 years of real-world demand.
              <br /><br />
              No charity. No handouts. Just <span className="font-semibold text-gray-800">a blockchain-powered engine for women's independence</span>.
            </p>
          </div>
        </motion.div>

        {/* REMOVED: Problem & Solution Grid (as per requirements) */}

        {/* Global Recognition - SIMPLIFIED (removed 2 lines of text) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <h3 className="font-montserrat text-2xl md:text-3xl font-bold text-pink-500 mb-6 tracking-tight">
            A Global Movement
          </h3>
          
          {/* REMOVED: 2 paragraph lines - Only keeping the 4 rectangle containers below */}
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <div className="font-montserrat px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-pink-400/40 shadow-lg text-pink-500 font-semibold hover:border-pink-500/60 hover:scale-105 transition-all">
              🌍 10+ Countries
            </div>
            <div className="font-montserrat px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-emerald-400/40 shadow-lg text-emerald-500 font-semibold hover:border-emerald-400/60 hover:scale-105 transition-all">
              📅 Since 2006
            </div>
            <div className="font-montserrat px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-pink-400/40 shadow-lg text-pink-500 font-semibold hover:border-pink-500/60 hover:scale-105 transition-all">
              👩 Women Empowerment
            </div>
            <div className="font-montserrat px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-emerald-400/40 shadow-lg text-emerald-500 font-semibold hover:border-emerald-400/60 hover:scale-105 transition-all">
              ⛓️ Blockchain Powered
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
