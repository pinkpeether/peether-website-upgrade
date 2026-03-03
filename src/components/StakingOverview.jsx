import { motion } from "framer-motion";
import { Coins, Zap, Crown, ArrowRight, Lock, TrendingUp, Shield } from "lucide-react";
import ParticleCanvas from "./ParticleCanvas";

const STAKING_TIERS = [
  {
    name: "Bronze",
    icon: Coins,
    apy: "12%",
    minStake: "100 PTDT",
    lockPeriod: "30 Days",
    gradient: "from-amber-600 to-amber-400",
    cardBg: "bg-amber-950",
    borderColor: "border-amber-500/50",
    hoverBorder: "hover:border-amber-400",
    iconBg: "bg-amber-500/25",
    iconColor: "text-amber-400",
    titleColor: "text-amber-300",
    shadow: "shadow-[0_4px_20px_rgba(245,158,11,0.12)]",
    features: ["Daily reward accrual", "Auto-compound option", "Early exit with penalty"],
  },
  {
    name: "Silver",
    icon: Zap,
    apy: "15%",
    minStake: "500 PTDT",
    lockPeriod: "90 Days",
    gradient: "from-slate-400 to-gray-300",
    cardBg: "bg-slate-900",
    borderColor: "border-gray-400/50",
    hoverBorder: "hover:border-gray-300",
    iconBg: "bg-gray-400/20",
    iconColor: "text-gray-300",
    titleColor: "text-gray-200",
    shadow: "shadow-[0_4px_20px_rgba(148,163,184,0.12)]",
    popular: true,
    features: ["Daily reward accrual", "Auto-compound option", "Priority fee distribution", "Early exit with reduced penalty"],
  },
  {
    name: "Gold",
    icon: Crown,
    apy: "18%",
    minStake: "1,000 PTDT",
    lockPeriod: "180 Days",
    gradient: "from-yellow-500 to-amber-300",
    cardBg: "bg-yellow-950",
    borderColor: "border-yellow-500/50",
    hoverBorder: "hover:border-yellow-400",
    iconBg: "bg-yellow-500/25",
    iconColor: "text-yellow-400",
    titleColor: "text-yellow-300",
    shadow: "shadow-[0_4px_20px_rgba(234,179,8,0.15)]",
    features: ["Maximum reward rate", "Priority fee distribution", "Auto-compound option", "Governance voting rights", "VIP community access"],
  },
];

export default function StakingOverview() {
  return (
    <section id="staking" className="relative z-10 py-24 px-6 md:px-12 scroll-mt-[85px]">
      <ParticleCanvas particleCount={40} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/40 text-pink-400 text-sm font-mono tracking-wider mb-4">
            <TrendingUp size={14} />
            EARN REAL YIELD
          </div>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold mb-3" style={{ color: "#FB0A8B", letterSpacing: "-0.035em" }}>
            Staking Pools
          </h2>
          <p className="font-lexend text-lg text-gray-400 max-w-2xl mx-auto" style={{ fontWeight: 300 }}>
            Stake PTDT and earn rewards from the protocol's fee distribution.
            Every ride triggers the Fee Distributor — <span className="text-emerald-400 font-semibold">60% burned, 40% to stakers</span>.
          </p>
        </motion.div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {STAKING_TIERS.map((tier, i) => {
            const Icon = tier.icon;
            return (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className={`relative ${tier.cardBg} rounded-2xl border ${tier.borderColor} ${tier.hoverBorder} ${tier.shadow} transition-all duration-300 overflow-hidden group hover:scale-[1.02]`}
              >
                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl">
                    Most Popular
                  </div>
                )}

                {/* Top gradient accent */}
                <div className={`h-1.5 bg-gradient-to-r ${tier.gradient}`} />

                <div className="p-7">
                  {/* Icon + Name */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-14 h-14 rounded-xl ${tier.iconBg} flex items-center justify-center`}>
                      <Icon size={28} className={tier.iconColor} />
                    </div>
                    <div>
                      <h3 className={`font-montserrat text-xl font-bold ${tier.titleColor}`}>
                        {tier.name}
                      </h3>
                      <span className={`text-xs font-mono tracking-wider ${tier.iconColor}`}>
                        TIER {i + 1}
                      </span>
                    </div>
                  </div>

                  {/* APY */}
                  <div className="mb-6">
                    <div className="font-montserrat text-sm font-semibold text-gray-400 tracking-wide mb-1">
                      ANNUAL YIELD
                    </div>
                    <div className={`font-montserrat text-5xl font-black bg-gradient-to-r ${tier.gradient} bg-clip-text text-transparent`}>
                      {tier.apy}
                    </div>
                    <div className="font-mono text-xs text-gray-500 mt-1">APY</div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between py-2.5 border-t border-white/10">
                      <span className="text-sm text-gray-400 flex items-center gap-2">
                        <Coins size={14} /> Min Stake
                      </span>
                      <span className="text-sm text-white font-semibold">{tier.minStake}</span>
                    </div>
                    <div className="flex items-center justify-between py-2.5 border-t border-white/10">
                      <span className="text-sm text-gray-400 flex items-center gap-2">
                        <Lock size={14} /> Lock Period
                      </span>
                      <span className="text-sm text-white font-semibold">{tier.lockPeriod}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2.5 mb-7">
                    {tier.features.map((f, fi) => (
                      <div key={fi} className="flex items-start gap-2.5 text-sm text-gray-300">
                        <span className="text-emerald-400 mt-0.5 flex-shrink-0 font-bold">✓</span>
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href="https://dapp.ptdt.taxi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r ${tier.gradient} text-black font-montserrat font-bold text-sm transition-all hover:scale-[1.02] hover:shadow-lg no-underline`}
                  >
                    Stake Now <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom info bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="bg-slate-900 rounded-2xl border border-slate-600/40 p-7 shadow-[0_4px_15px_rgba(0,0,0,0.2)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Shield size={24} className="text-emerald-400" />
              <span className="text-base text-gray-200 font-semibold">Audited Smart Contract</span>
              <span className="text-sm text-gray-400">Security score 9.2/10</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Coins size={24} className="text-pink-400" />
              <span className="text-base text-gray-200 font-semibold">Real Yield</span>
              <span className="text-sm text-gray-400">Rewards from actual protocol fees</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Lock size={24} className="text-yellow-400" />
              <span className="text-base text-gray-200 font-semibold">LP Locked</span>
              <span className="text-sm text-gray-400">Liquidity secured via LPTimeLock</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
