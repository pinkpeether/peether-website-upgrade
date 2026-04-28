import { motion } from "framer-motion";
import {
  BookOpen, Code, BarChart3, FileCheck, ShieldCheck,
  Download, FileText, Globe, Layers, ExternalLink
} from "lucide-react";

const RESOURCES = [
  {
    title: "Main Guide",
    description: "Complete integration guide, contract overview, and getting started documentation for the Peether protocol.",
    icon: BookOpen,
    href: "/ptdt-docs/mainguide.html",
    color: "pink",
    tag: "DOCS",
  },
  {
    title: "API Documentation",
    description: "Endpoints, staking calculator, contract ABIs, and developer reference for building on PTDT.",
    icon: Code,
    href: "/ptdt-docs/apidocs.html",
    color: "blue",
    tag: "DEV",
  },
  {
    title: "Live Dashboard",
    description: "Real-time token analytics, holder count, burn tracker, DexScreener charts, and transaction feed.",
    icon: BarChart3,
    href: "/ptdt-docs/dashboard.html",
    color: "emerald",
    tag: "ANALYTICS",
  },
  {
    title: "WhitePaper",
    description: "Full technical and business whitepaper covering the Peether PTDT protocol vision and architecture.",
    icon: FileText,
    href: "https://whitepaper.ptdt.taxi/",
    color: "purple",
    tag: "PAPER",
    external: true,
  },
  {
    title: "Verified Certificate",
    description: "OFAC & OFSI government sanctions compliance — 100% cleared by Blockchair. Full transparency.",
    icon: ShieldCheck,
    href: "/ptdt-docs/verified.html",
    color: "amber",
    tag: "COMPLIANCE",
  },
  {
    title: "Security Rebuttal",
    description: "Detailed response to GoPlus security flags with evidence, technical proof, and full context.",
    icon: FileCheck,
    href: "/ptdt-docs/rebuttal.html",
    color: "cyan",
    tag: "SECURITY",
  },
  {
    title: "Project Scope",
    description: "Industry-standard breakdown: what it takes vs. what one founder delivered. Dedicated to John McAfee.",
    icon: Layers,
    href: "/scope.html",
    color: "pink",
    tag: "OVERVIEW",
  },
  {
    title: "Downloads",
    description: "Brand assets, logos, audit PDF, whitepaper PDF, and media kit — everything you need in one place.",
    icon: Download,
    href: "/ptdt-docs/downloads.html",
    color: "slate",
    tag: "ASSETS",
  },
  {
    title: "DApp Portal",
    description: "Staking, rewards, wallet connection, and full protocol interaction — your gateway to PTDT.",
    icon: Globe,
    href: "https://dapp.ptdt.taxi",
    color: "emerald",
    tag: "APP",
    external: true,
  },
];

// Very light tint (~4%) backgrounds + solid color headlines
const colorStyles = {
  pink: {
    cardBg: "rgba(236, 72, 153, 0.04)",
    border: "border-pink-500/30",
    hoverBorder: "hover:border-pink-400",
    iconBg: "bg-pink-500/20",
    iconColor: "text-pink-500",
    titleColor: "text-pink-500",
    tagBg: "bg-pink-500/15",
    tagText: "text-pink-400",
    shadow: "shadow-[0_2px_12px_rgba(236,72,153,0.06)]",
    hoverShadow: "hover:shadow-[0_6px_24px_rgba(236,72,153,0.12)]",
    arrow: "text-pink-500",
  },
  emerald: {
    cardBg: "rgba(16, 185, 129, 0.04)",
    border: "border-emerald-500/30",
    hoverBorder: "hover:border-emerald-400",
    iconBg: "bg-emerald-500/20",
    iconColor: "text-emerald-500",
    titleColor: "text-emerald-500",
    tagBg: "bg-emerald-500/15",
    tagText: "text-emerald-400",
    shadow: "shadow-[0_2px_12px_rgba(16,185,129,0.06)]",
    hoverShadow: "hover:shadow-[0_6px_24px_rgba(16,185,129,0.12)]",
    arrow: "text-emerald-500",
  },
  blue: {
    cardBg: "rgba(59, 130, 246, 0.04)",
    border: "border-blue-500/30",
    hoverBorder: "hover:border-blue-400",
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-500",
    titleColor: "text-blue-500",
    tagBg: "bg-blue-500/15",
    tagText: "text-blue-400",
    shadow: "shadow-[0_2px_12px_rgba(59,130,246,0.06)]",
    hoverShadow: "hover:shadow-[0_6px_24px_rgba(59,130,246,0.12)]",
    arrow: "text-blue-500",
  },
  purple: {
    cardBg: "rgba(168, 85, 247, 0.04)",
    border: "border-purple-500/30",
    hoverBorder: "hover:border-purple-400",
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-500",
    titleColor: "text-purple-500",
    tagBg: "bg-purple-500/15",
    tagText: "text-purple-400",
    shadow: "shadow-[0_2px_12px_rgba(168,85,247,0.06)]",
    hoverShadow: "hover:shadow-[0_6px_24px_rgba(168,85,247,0.12)]",
    arrow: "text-purple-500",
  },
  amber: {
    cardBg: "rgba(245, 158, 11, 0.04)",
    border: "border-amber-500/30",
    hoverBorder: "hover:border-amber-400",
    iconBg: "bg-amber-500/20",
    iconColor: "text-amber-500",
    titleColor: "text-amber-500",
    tagBg: "bg-amber-500/15",
    tagText: "text-amber-400",
    shadow: "shadow-[0_2px_12px_rgba(245,158,11,0.06)]",
    hoverShadow: "hover:shadow-[0_6px_24px_rgba(245,158,11,0.12)]",
    arrow: "text-amber-500",
  },
  cyan: {
    cardBg: "rgba(6, 182, 212, 0.04)",
    border: "border-cyan-500/30",
    hoverBorder: "hover:border-cyan-400",
    iconBg: "bg-cyan-500/20",
    iconColor: "text-cyan-500",
    titleColor: "text-cyan-500",
    tagBg: "bg-cyan-500/15",
    tagText: "text-cyan-400",
    shadow: "shadow-[0_2px_12px_rgba(6,182,212,0.06)]",
    hoverShadow: "hover:shadow-[0_6px_24px_rgba(6,182,212,0.12)]",
    arrow: "text-cyan-500",
  },
  slate: {
    cardBg: "rgba(148, 163, 184, 0.04)",
    border: "border-slate-500/30",
    hoverBorder: "hover:border-slate-400",
    iconBg: "bg-slate-500/20",
    iconColor: "text-slate-400",
    titleColor: "text-slate-300",
    tagBg: "bg-slate-500/15",
    tagText: "text-slate-400",
    shadow: "shadow-[0_2px_12px_rgba(148,163,184,0.04)]",
    hoverShadow: "hover:shadow-[0_6px_24px_rgba(148,163,184,0.10)]",
    arrow: "text-slate-400",
  },
};

export default function EcosystemHub() {
  return (
    <section id="ecosystem" className="relative z-10 py-24 px-6 md:px-12 scroll-mt-[85px]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-sm font-mono tracking-wider mb-4">
            <Layers size={14} />
            ECOSYSTEM
          </div>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold mb-3" style={{ color: "#FB0A8B", letterSpacing: "-0.035em" }}>
            Resources & Documentation
          </h2>
          <p className="font-lexend text-lg text-gray-400 max-w-2xl mx-auto" style={{ fontWeight: 300 }}>
            Everything you need — documentation, analytics, compliance, and developer tools — all in one place.
          </p>
        </motion.div>

        {/* Resource Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {RESOURCES.map((res, i) => {
            const Icon = res.icon;
            const c = colorStyles[res.color];

            return (
              <motion.a
                key={res.title}
                href={res.href}
                target={res.external ? "_blank" : "_self"}
                rel={res.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                style={{ backgroundColor: c.cardBg }}
                className={`group relative rounded-2xl border ${c.border} ${c.hoverBorder} ${c.shadow} ${c.hoverShadow} transition-all duration-300 p-6 no-underline hover:-translate-y-1`}
              >
                {/* Top row: icon + tag */}
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-12 h-12 rounded-xl ${c.iconBg} flex items-center justify-center`}>
                    <Icon size={22} className={c.iconColor} />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`${c.tagBg} ${c.tagText} px-2.5 py-1 rounded-md text-[10px] font-mono tracking-wider font-bold`}>
                      {res.tag}
                    </span>
                    {res.external && <ExternalLink size={14} className="text-gray-500" />}
                  </div>
                </div>

                {/* Title — solid color, always visible */}
                <h3 className={`font-montserrat text-lg font-bold ${c.titleColor} mb-3`}>
                  {res.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed">
                  {res.description}
                </p>

                {/* Arrow */}
                <div className={`mt-5 flex items-center gap-1.5 text-sm ${c.arrow} font-montserrat font-semibold`}>
                  <span>{res.external ? "Open" : "View"}</span>
                  <span className="group-hover:translate-x-1.5 transition-transform">→</span>
                </div>
              </motion.a>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-500 mb-4 font-lexend">
            Developer? Check the GitHub repository for full source code.
          </p>
          <a
            href="https://github.com/pinkpeether/peether-protocol"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/20 text-gray-300 hover:text-white hover:border-white/40 transition-all text-sm font-medium no-underline"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            View on GitHub
            <ExternalLink size={12} />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
