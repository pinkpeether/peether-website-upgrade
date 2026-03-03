import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Copy, Check, ExternalLink, FileText, Lock, Globe } from "lucide-react";

const CONTRACTS = [
  {
    label: "PTDT Token",
    address: "0x66c6Fc5E7F99272134a52DF9E88D94eD83E89278",
    bscscan: "https://bscscan.com/token/0x66c6Fc5E7F99272134a52DF9E88D94eD83E89278",
    description: "Main BEP-20 token with anti-whale, burn, and blacklist mechanics",
    color: "pink",
  },
  {
    label: "Fee Distributor",
    address: "0xB1a2639558CEA79B19242931a1744AE53ec8D0f1",
    bscscan: "https://bscscan.com/address/0xB1a2639558CEA79B19242931a1744AE53ec8D0f1#code",
    description: "60% burn / 40% staker distribution on every transaction",
    color: "emerald",
  },
  {
    label: "Staking Pool",
    address: "0xfa6A09A581447255BD916ad98cf852fEFbC72494",
    bscscan: "https://bscscan.com/address/0xfa6A09A581447255BD916ad98cf852fEFbC72494#code",
    description: "Bronze, Silver, Gold tiers with 12–18% APY",
    color: "purple",
  },
  {
    label: "LP Pair (PancakeSwap V2)",
    address: "0xF3a06E9Dc5d89B2fD8d7d30946c9aeddc5e01E28",
    bscscan: "https://bscscan.com/address/0xF3a06E9Dc5d89B2fD8d7d30946c9aeddc5e01E28",
    description: "PTDT/BNB liquidity pool — locked via LPTimeLock contract",
    color: "amber",
  },
];

const BADGES = [
  {
    icon: Shield,
    label: "Audit Score 9.2/10",
    sub: "Professional security audit completed",
    color: "emerald",
    href: "https://lime-capitalist-canid-406.mypinata.cloud/ipfs/bafkreibvhgi5mhutt6agzrdjki7gxecpr5cvx26yvdyn6kigyumzm6ghuq",
  },
  {
    icon: Globe,
    label: "OFAC Cleared",
    sub: "U.S. Treasury sanctions scan passed",
    color: "blue",
    href: "/ptdt-docs/verified.html",
  },
  {
    icon: Globe,
    label: "OFSI Cleared",
    sub: "UK Treasury sanctions scan passed",
    color: "purple",
    href: "/ptdt-docs/verified.html",
  },
  {
    icon: Lock,
    label: "LP Locked",
    sub: "6-month liquidity lock active",
    color: "amber",
  },
  {
    icon: FileText,
    label: "BSCScan Verified",
    sub: "Source code publicly verified on-chain",
    color: "cyan",
    href: "https://bscscan.com/token/0x66c6Fc5E7F99272134a52DF9E88D94eD83E89278#code",
  },
  {
    icon: Shield,
    label: "UK Registered",
    sub: "Pink Taxi Group Ltd. — Companies House",
    color: "pink",
  },
];

const tintStyles = {
  pink: {
    bg: "rgba(236, 72, 153, 0.04)",
    border: "border-pink-500/30",
    hoverBorder: "hover:border-pink-400",
    title: "text-pink-500",
    icon: "text-pink-500",
    iconBg: "bg-pink-500/20",
    shadow: "shadow-[0_2px_12px_rgba(236,72,153,0.06)]",
  },
  emerald: {
    bg: "rgba(16, 185, 129, 0.04)",
    border: "border-emerald-500/30",
    hoverBorder: "hover:border-emerald-400",
    title: "text-emerald-500",
    icon: "text-emerald-500",
    iconBg: "bg-emerald-500/20",
    shadow: "shadow-[0_2px_12px_rgba(16,185,129,0.06)]",
  },
  blue: {
    bg: "rgba(59, 130, 246, 0.04)",
    border: "border-blue-500/30",
    hoverBorder: "hover:border-blue-400",
    title: "text-blue-500",
    icon: "text-blue-500",
    iconBg: "bg-blue-500/20",
    shadow: "shadow-[0_2px_12px_rgba(59,130,246,0.06)]",
  },
  purple: {
    bg: "rgba(168, 85, 247, 0.04)",
    border: "border-purple-500/30",
    hoverBorder: "hover:border-purple-400",
    title: "text-purple-500",
    icon: "text-purple-500",
    iconBg: "bg-purple-500/20",
    shadow: "shadow-[0_2px_12px_rgba(168,85,247,0.06)]",
  },
  amber: {
    bg: "rgba(245, 158, 11, 0.04)",
    border: "border-amber-500/30",
    hoverBorder: "hover:border-amber-400",
    title: "text-amber-500",
    icon: "text-amber-500",
    iconBg: "bg-amber-500/20",
    shadow: "shadow-[0_2px_12px_rgba(245,158,11,0.06)]",
  },
  cyan: {
    bg: "rgba(6, 182, 212, 0.04)",
    border: "border-cyan-500/30",
    hoverBorder: "hover:border-cyan-400",
    title: "text-cyan-500",
    icon: "text-cyan-500",
    iconBg: "bg-cyan-500/20",
    shadow: "shadow-[0_2px_12px_rgba(6,182,212,0.06)]",
  },
};

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  return (
    <button onClick={handleCopy} className="p-2.5 rounded-lg bg-white/10 hover:bg-pink-500/20 border border-white/20 transition-all cursor-pointer flex-shrink-0" title="Copy address">
      {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} className="text-gray-300" />}
    </button>
  );
}

export default function SmartContracts() {
  return (
    <section id="smart-contracts" className="relative z-10 py-24 px-6 md:px-12 scroll-mt-[85px]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/15 border border-pink-500/40 text-pink-400 text-sm font-mono tracking-wider mb-4">
            <Shield size={14} />
            TRUST THE CODE
          </div>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold mb-3" style={{ color: "#FB0A8B", letterSpacing: "-0.035em" }}>
            Smart Contracts & Security
          </h2>
          <p className="font-lexend text-lg text-gray-400 max-w-2xl mx-auto" style={{ fontWeight: 300 }}>
            Every contract verified on BSCScan. Every function audited. Every compliance check passed.
          </p>
        </motion.div>

        {/* Audit Score Hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{ backgroundColor: "rgba(16, 185, 129, 0.04)" }}
          className="border border-emerald-500/30 rounded-2xl p-8 mb-8 shadow-[0_2px_12px_rgba(16,185,129,0.06)]"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="relative">
              <svg width="100" height="100" viewBox="0 0 100 100" className="transform -rotate-90">
                <circle cx="50" cy="50" r="42" stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
                <circle cx="50" cy="50" r="42" stroke="url(#scoreGrad)" strokeWidth="8" fill="none" strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 42 * 0.92} ${2 * Math.PI * 42}`} />
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#34D399" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-montserrat text-2xl font-black text-emerald-400">9.2</span>
              </div>
            </div>
            <div className="text-left">
              <div className="font-montserrat text-xl font-bold text-emerald-500 mb-1">Security Audit Score</div>
              <div className="text-sm text-gray-400 mb-3">Professional smart contract audit completed — all critical checks passed</div>
              <a href="https://lime-capitalist-canid-406.mypinata.cloud/ipfs/bafkreibvhgi5mhutt6agzrdjki7gxecpr5cvx26yvdyn6kigyumzm6ghuq" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-500 text-sm font-semibold hover:text-emerald-400 transition-colors">
                <FileText size={14} /> View Full Audit Report <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Contract Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          {CONTRACTS.map((c, i) => {
            const s = tintStyles[c.color];
            return (
              <motion.div
                key={c.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{ backgroundColor: s.bg }}
                className={`rounded-xl border ${s.border} ${s.hoverBorder} ${s.shadow} transition-all p-6 hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`font-montserrat text-base font-bold ${s.title}`}>{c.label}</h4>
                  <a href={c.bscscan} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition-colors">
                    <ExternalLink size={16} />
                  </a>
                </div>
                <p className="text-sm text-gray-400 mb-4">{c.description}</p>
                <div className="flex items-center gap-3">
                  <code className="flex-1 bg-slate-900/60 rounded-lg px-4 py-3 text-sm text-emerald-500 font-mono overflow-x-auto whitespace-nowrap border border-white/10 tracking-wide">
                    {c.address}
                  </code>
                  <CopyButton text={c.address} />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Compliance Badges — 3×2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {BADGES.map((badge, i) => {
            const Icon = badge.icon;
            const s = tintStyles[badge.color];

            const inner = (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.07 }}
                style={{ backgroundColor: s.bg }}
                className={`border ${s.border} ${s.hoverBorder} ${s.shadow} rounded-xl p-6 text-center hover:-translate-y-1 hover:shadow-lg transition-all`}
              >
                <div className={`w-12 h-12 rounded-xl ${s.iconBg} flex items-center justify-center mx-auto mb-3`}>
                  <Icon size={24} className={s.icon} />
                </div>
                <div className={`font-montserrat text-base font-bold ${s.title} mb-1.5`}>
                  {badge.label}
                </div>
                <div className="text-sm text-gray-400">{badge.sub}</div>
              </motion.div>
            );

            return badge.href ? (
              <a key={badge.label} href={badge.href} target="_blank" rel="noopener noreferrer" className="no-underline">{inner}</a>
            ) : (
              <div key={badge.label}>{inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
