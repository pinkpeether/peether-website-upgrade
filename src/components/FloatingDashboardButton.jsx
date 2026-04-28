import { useState, useEffect } from 'react';
import { Activity, TrendingUp } from 'lucide-react';
import DashboardPreviewModal from './DashboardPreviewModal';

export default function FloatingDashboardButton() {
  const [showModal, setShowModal] = useState(false);
  const [livePrice, setLivePrice] = useState(null);
  const [priceChange, setPriceChange] = useState(null);

  // Auto-popup 5 seconds after page load (once per session)
  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem('ptdt-dashboard-seen');
    
    if (!hasSeenModal) {
      const timer = setTimeout(() => {
        setShowModal(true);
        sessionStorage.setItem('ptdt-dashboard-seen', 'true');
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  // Fetch live price every 30 seconds
  useEffect(() => {
    fetchLivePrice();
    const interval = setInterval(fetchLivePrice, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchLivePrice = async () => {
    try {
      const LP_PAIR = '0xF3a06E9Dc5d89B2fD8d7d30946c9aeddc5e01E28';
      const response = await fetch(`https://api.dexscreener.com/latest/dex/pairs/bsc/${LP_PAIR}`);
      const data = await response.json();
      
      if (data?.pair) {
        setLivePrice(parseFloat(data.pair.priceUsd));
        setPriceChange(parseFloat(data.pair.priceChange?.h24));
      }
    } catch (error) {
      console.error('Failed to fetch live price:', error);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setShowModal(true)}
        className="floating-dashboard-btn"
        aria-label="Open Live Dashboard"
      >
        {/* Pulsing Background Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brandPink to-purple-600 animate-pulse-glow"></div>
        
        {/* Main Button Content */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          <Activity className="w-7 h-7 text-white mb-1" strokeWidth={2.5} />
          <span className="text-[10px] font-semibold text-white/90">LIVE</span>
        </div>

        {/* Live Indicator Dot */}
        <span className="absolute -top-1 -right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
        </span>

        {/* Optional: Live Price Badge (shows on hover) */}
        {livePrice && (
          <div className="absolute -top-12 right-0 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 pointer-events-none">
            <div className="bg-gray-900/95 text-white px-3 py-2 rounded-lg shadow-xl 
                          backdrop-blur-sm border border-white/10">
              <div className="text-xs text-gray-400 mb-0.5">PTDT Price</div>
              <div className="text-sm font-bold">${livePrice.toFixed(4)}</div>
              {priceChange && (
                <div className={`text-xs ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {priceChange >= 0 ? '+' : ''}{priceChange.toFixed(2)}%
                </div>
              )}
            </div>
          </div>
        )}
      </button>

      {/* Preview Modal */}
      {showModal && (
        <DashboardPreviewModal
          onClose={() => setShowModal(false)}
          livePrice={livePrice}
          priceChange={priceChange}
        />
      )}

      {/* Styles */}
      <style jsx>{`
        .floating-dashboard-btn {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 9999;
          width: 72px;
          height: 72px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          box-shadow: 0 10px 40px rgba(255, 79, 163, 0.4);
          transition: all 0.3s ease;
          animation: float 3s ease-in-out infinite;
        }

        .floating-dashboard-btn:hover {
          transform: scale(1.1);
          box-shadow: 0 15px 50px rgba(255, 79, 163, 0.6);
        }

        .floating-dashboard-btn:active {
          transform: scale(0.95);
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
            box-shadow: 0 0 20px rgba(255, 79, 163, 0.6);
          }
          50% {
            opacity: 0.8;
            box-shadow: 0 0 40px rgba(255, 79, 163, 0.9);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        /* Mobile Adjustments */
        @media (max-width: 640px) {
          .floating-dashboard-btn {
            width: 64px;
            height: 64px;
            bottom: 20px;
            right: 20px;
          }
        }

        /* Hide on very small screens if needed */
        @media (max-width: 380px) {
          .floating-dashboard-btn {
            width: 56px;
            height: 56px;
          }
        }
      `}</style>
    </>
  );
}
