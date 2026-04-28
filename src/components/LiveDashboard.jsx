import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Users, Flame, DollarSign, ExternalLink, RefreshCw } from "lucide-react";

const TOKEN_ADDRESS = "0x66c6Fc5E7F99272134a52DF9E88D94eD83E89278";
const LP_PAIR = "0xF3a06E9Dc5d89B2fD8d7d30946c9aeddc5e01E28";
const RPC = "https://bsc-dataseed.binance.org";
const TOTAL_SUPPLY = 100000;

const BALANCE_OF_SIG = "0x70a08231";

async function rpcCall(to, data) {
  const res = await fetch(RPC, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_call", params: [{ to, data }, "latest"] }),
  });
  const json = await res.json();
  return json.result;
}

function padAddress(addr) {
  return BALANCE_OF_SIG + addr.replace("0x", "").toLowerCase().padStart(64, "0");
}

function hexToDecimal(hex) {
  if (!hex || hex === "0x") return 0;
  return parseInt(hex, 16) / 1e18;
}

function formatNum(n, decimals = 0) {
  if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
  if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
  return n.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const cardStyles = {
  pink: {
    bg: "rgba(236, 72, 153, 0.04)",
    border: "border-pink-500/30",
    iconBg: "bg-pink-500/20",
    icon: "text-pink-500",
    label: "text-pink-500",
    value: "text-pink-400",
    shadow: "shadow-[0_2px_12px_rgba(236,72,153,0.06)]",
  },
  emerald: {
    bg: "rgba(16, 185, 129, 0.04)",
    border: "border-emerald-500/30",
    iconBg: "bg-emerald-500/20",
    icon: "text-emerald-500",
    label: "text-emerald-500",
    value: "text-emerald-400",
    shadow: "shadow-[0_2px_12px_rgba(16,185,129,0.06)]",
  },
  blue: {
    bg: "rgba(59, 130, 246, 0.04)",
    border: "border-blue-500/30",
    iconBg: "bg-blue-500/20",
    icon: "text-blue-500",
    label: "text-blue-500",
    value: "text-blue-400",
    shadow: "shadow-[0_2px_12px_rgba(59,130,246,0.06)]",
  },
  amber: {
    bg: "rgba(245, 158, 11, 0.04)",
    border: "border-amber-500/30",
    iconBg: "bg-amber-500/20",
    icon: "text-amber-500",
    label: "text-amber-500",
    value: "text-amber-400",
    shadow: "shadow-[0_2px_12px_rgba(245,158,11,0.06)]",
  },
};

export default function LiveDashboard() {
  const [data, setData] = useState({ price: null, marketCap: null, holders: null, burned: null, circulatingSupply: null });
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const dexRes = await fetch(`https://api.dexscreener.com/latest/dex/pairs/bsc/${LP_PAIR}`);
      const dexData = await dexRes.json();
      const pair = dexData?.pair || dexData?.pairs?.[0];
      const price = pair ? parseFloat(pair.priceUsd) : null;

      // Burned = INITIAL_SUPPLY - current totalSupply (deflationary burn reduces totalSupply)
      let burned = null;
      let circulating = TOTAL_SUPPLY;
      try {
        const totalSupplyHex = await rpcCall(TOKEN_ADDRESS, "0x18160ddd");
        const currentSupply = hexToDecimal(totalSupplyHex);
        burned = TOTAL_SUPPLY - currentSupply;
        circulating = currentSupply;
      } catch { burned = null; }

      const marketCap = price ? price * circulating : null;

      // Holders via BscScan API (free tier, no key needed for basic calls)
      let holders = null;
      try {
        const holdersRes = await fetch(
          `https://api.bscscan.com/api?module=token&action=tokenholdercount&contractaddress=${TOKEN_ADDRESS}`
        );
        const holdersData = await holdersRes.json();
        if (holdersData.status === "1" && holdersData.result) {
          holders = parseInt(holdersData.result);
        }
      } catch { /* silent */ }

      setData({ price, marketCap, holders, burned, circulatingSupply: circulating });
      setLastUpdate(new Date());
      setLoading(false);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

  // Colors shuffled: pink → emerald → blue → amber (no adjacent match)
  const stats = [
    {
      label: "PTDT Price",
      value: data.price ? `$${data.price.toFixed(6)}` : "—",
      icon: DollarSign,
      color: "pink",
      href: `https://dexscreener.com/bsc/${LP_PAIR}`,
    },
    {
      label: "Market Cap",
      value: data.marketCap ? `$${formatNum(data.marketCap)}` : "—",
      icon: TrendingUp,
      color: "emerald",
    },
    {
      label: "Holders",
      value: data.holders !== null ? formatNum(data.holders) : "—",
      icon: Users,
      color: "blue",
      href: `https://bscscan.com/token/${TOKEN_ADDRESS}`,
    },
    {
      label: "Burned",
      value: data.burned !== null ? `${formatNum(data.burned, 2)} PTDT` : "—",
      icon: Flame,
      color: "amber",
      sub: data.burned !== null ? `${((data.burned / TOTAL_SUPPLY) * 100).toFixed(4)}% of supply` : "",
    },
  ];

  return (
    <section id="live-dashboard" className="relative z-10 py-20 px-6 md:px-12 scroll-mt-[85px]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 text-sm font-mono tracking-wider mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            LIVE ON-CHAIN DATA
          </div>
          <h2 className="font-montserrat text-4xl md:text-5xl font-bold mb-3" style={{ color: "#FB0A8B", letterSpacing: "-0.035em" }}>
            Live Dashboard
          </h2>
          <p className="font-lexend text-lg text-gray-400 max-w-2xl mx-auto" style={{ fontWeight: 300 }}>
            Real-time data pulled directly from BNB Smart Chain. No middleman, no cache.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8 items-stretch">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            const c = cardStyles[stat.color];

            const Card = (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                style={{ backgroundColor: c.bg }}
                className={`relative rounded-2xl p-5 border ${c.border} ${c.shadow} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group h-full`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-xl ${c.iconBg} flex items-center justify-center`}>
                    <Icon size={20} className={c.icon} />
                  </div>
                  {stat.href && (
                    <ExternalLink size={14} className="text-gray-500 group-hover:text-gray-300 transition-colors" />
                  )}
                </div>
                <div className={`font-montserrat text-sm font-semibold ${c.label} tracking-wide mb-2`}>
                  {stat.label}
                </div>
                <div className={`font-montserrat text-2xl font-bold ${c.value}`}>
                  {loading ? (
                    <div className="h-8 w-28 bg-white/5 rounded animate-pulse" />
                  ) : (
                    stat.value
                  )}
                </div>
                {stat.sub && !loading && (
                  <div className="font-mono text-xs text-gray-400 mt-2">{stat.sub}</div>
                )}
              </motion.div>
            );

            return stat.href ? (
              <a key={stat.label} href={stat.href} target="_blank" rel="noopener noreferrer" className="no-underline h-full">
                {Card}
              </a>
            ) : (
              <div key={stat.label} className="h-full">{Card}</div>
            );
          })}
        </div>

        {/* Footer bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap items-center justify-between gap-3 text-sm text-gray-400 font-mono"
        >
          <div className="flex items-center gap-4">
            <span>Network: <span className="text-yellow-400 font-semibold">BSC Mainnet</span></span>
            <span>Supply: <span className="text-gray-200 font-semibold">{formatNum(TOTAL_SUPPLY)}</span></span>
          </div>
          <div className="flex items-center gap-4">
            {lastUpdate && <span>Updated: {lastUpdate.toLocaleTimeString()}</span>}
            <button onClick={fetchData} className="flex items-center gap-1.5 text-pink-400 hover:text-pink-300 transition-colors cursor-pointer font-semibold">
              <RefreshCw size={14} /> Refresh
            </button>
            <a href="/ptdt-docs/dashboard.html" className="text-emerald-400 hover:text-emerald-300 transition-colors font-semibold">
              Full Dashboard →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
