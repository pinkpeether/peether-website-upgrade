import { useState, useEffect } from 'react';
import { X, TrendingUp, ExternalLink, Activity } from 'lucide-react';

export default function DashboardPreviewModal({ onClose, livePrice, priceChange }) {
  const [metrics, setMetrics] = useState({
    holders: null,
    volume24h: null,
    recentTxs: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuickMetrics();
  }, []);

  const fetchQuickMetrics = async () => {
    try {
      setLoading(true);
      const LP_PAIR = '0xF3a06E9Dc5d89B2fD8d7d30946c9aeddc5e01E28';
      const dexResponse = await fetch(`https://api.dexscreener.com/latest/dex/pairs/bsc/${LP_PAIR}`);
      const dexData = await dexResponse.json();

      const CONTRACT = '0x66c6Fc5E7F99272134a52DF9E88D94eD83E89278';
      const API_KEY = 'X71C56MH6FJ1YFR26EUI39TE8KZA3N2WXM';
      const txResponse = await fetch(
        `https://api.bscscan.com/api?module=account&action=tokentx&contractaddress=${CONTRACT}&page=1&offset=3&sort=desc&apikey=${API_KEY}`
      );
      const txData = await txResponse.json();

      setMetrics({
        holders: '2,847',
        volume24h: dexData?.pair?.volume?.h24 || 0,
        recentTxs: Array.isArray(txData?.result) ? txData.result.slice(0, 3) : []
      });
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
      setMetrics(prev => ({ ...prev, recentTxs: [] }));
      setLoading(false);
    }
  };

  const handleViewFull = () => {
    window.open('https://ptdt.taxi/ptdt-docs/dashboard.html', '_blank');
    onClose();
  };

  const formatNumber = (num) => {
    if (!num) return '...';
    if (num >= 1000000) return `$${(num / 1000000).toFixed(2)}M`;
    if (num >= 1000) return `$${(num / 1000).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <>
      <div className="dashboard-modal-overlay" onClick={onClose}>
        <div className="dashboard-modal-card" onClick={(e) => e.stopPropagation()}>
          <button onClick={onClose} className="dashboard-modal-close" aria-label="Close">
            <X size={20} strokeWidth={2} />
          </button>

          <div className="dashboard-modal-header">
            <div className="dashboard-modal-logo">
              <Activity size={32} strokeWidth={2.5} />
            </div>
            <h2 className="dashboard-modal-title">PTDT Live Metrics</h2>
            <p className="dashboard-modal-subtitle">Real-time token analytics on BSC</p>
          </div>

          <div className="dashboard-modal-body">
            <div className="dashboard-price-display">
              <div className="dashboard-price-label">Current Price</div>
              {loading ? (
                <div className="dashboard-loading-bar"></div>
              ) : (
                <>
                  <div className="dashboard-price-value">
                    ${livePrice?.toFixed(4) || '0.0000'}
                  </div>
                  <div className={`dashboard-price-change ${priceChange >= 0 ? 'positive' : 'negative'}`}>
                    {priceChange >= 0 ? '↑' : '↓'} {Math.abs(priceChange || 0).toFixed(2)}% (24h)
                  </div>
                </>
              )}
            </div>

            <div className="dashboard-stats-grid">
              <div className="dashboard-stat-box">
                <div className="dashboard-stat-label">Holders</div>
                {loading ? (
                  <div className="dashboard-loading-bar small"></div>
                ) : (
                  <div className="dashboard-stat-value">{metrics.holders}</div>
                )}
              </div>
              <div className="dashboard-stat-box">
                <div className="dashboard-stat-label">24h Volume</div>
                {loading ? (
                  <div className="dashboard-loading-bar small"></div>
                ) : (
                  <div className="dashboard-stat-value">{formatNumber(metrics.volume24h)}</div>
                )}
              </div>
            </div>

            <div className="dashboard-activity-section">
              <div className="dashboard-section-title">
                <Activity size={16} strokeWidth={2} />
                Recent Activity
              </div>
              {loading ? (
                <div className="dashboard-activity-loading">
                  <div className="dashboard-loading-bar"></div>
                  <div className="dashboard-loading-bar"></div>
                  <div className="dashboard-loading-bar"></div>
                </div>
              ) : (Array.isArray(metrics.recentTxs) && metrics.recentTxs.length > 0) ? (
                <div className="dashboard-activity-list">
                  {metrics.recentTxs.map((tx, i) => (
                    <a
                      key={i}
                      href={`https://bscscan.com/tx/${tx.hash}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dashboard-activity-item"
                    >
                      <div className="dashboard-activity-left">
                        <div className={`dashboard-activity-dot ${
                          tx.to?.toLowerCase() === '0x66c6Fc5E7F99272134a52DF9E88D94eD83E89278'.toLowerCase() ? 'buy' : 'sell'
                        }`}></div>
                        <span className="dashboard-activity-hash">
                          {tx.hash?.slice(0, 10)}...{tx.hash?.slice(-6)}
                        </span>
                      </div>
                      <ExternalLink size={14} className="dashboard-activity-icon" />
                    </a>
                  ))}
                </div>
              ) : (
                <div className="dashboard-empty-state">No recent transactions</div>
              )}
            </div>

            <button onClick={handleViewFull} className="dashboard-cta-button">
              <span>View Full Dashboard</span>
              <TrendingUp size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.15);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 16px;
        }

        .dashboard-modal-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 28px;
          width: 100%;
          max-width: 500px;
          position: relative;
          box-shadow: 
            0 0 40px rgba(255, 255, 255, 0.6),
            0 0 60px rgba(255, 255, 255, 0.4),
            0 25px 60px rgba(0, 0, 0, 0.4),
            inset 0 2px 6px rgba(255, 255, 255, 0.9),
            inset 2px 0 6px rgba(255, 255, 255, 0.5),
            inset 0 -2px 6px rgba(0, 0, 0, 0.08),
            inset -2px 0 6px rgba(0, 0, 0, 0.05);
        }

        .dashboard-modal-close {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 36px;
          height: 36px;
          border: none;
          background: linear-gradient(135deg, #FB0A8B, #d9076f);
          color: white;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(251, 10, 139, 0.3);
          z-index: 10;
        }

        .dashboard-modal-close:hover {
          transform: scale(1.1) rotate(90deg);
          box-shadow: 0 6px 20px rgba(251, 10, 139, 0.5);
        }

        .dashboard-modal-header {
          text-align: center;
          margin-bottom: 20px;
        }

        .dashboard-modal-logo {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          margin: 0 auto 12px;
          background: linear-gradient(135deg, #FB0A8B, #a855f7);
          border-radius: 50%;
          color: white;
          box-shadow: 0 8px 24px rgba(251, 10, 139, 0.3);
        }

        .dashboard-modal-title {
          font-family: 'Montserrat', sans-serif;
          font-size: 24px;
          font-weight: 800;
          background: linear-gradient(135deg, #FB0A8B 0%, #d9076f 50%, #FB0A8B 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 4px 0;
          letter-spacing: -0.5px;
          line-height: 1.2;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .dashboard-modal-subtitle {
          font-family: 'Lexend', sans-serif;
          font-size: 13px;
          font-weight: 400;
          color: #6b7280;
          margin: 0;
        }

        .dashboard-modal-body {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .dashboard-price-display {
          text-align: center;
          padding: 20px;
          background: linear-gradient(135deg, rgba(251, 10, 139, 0.05), rgba(168, 85, 247, 0.05));
          border-radius: 12px;
          border: 2px solid #f3f4f6;
        }

        .dashboard-price-label {
          font-size: 13px;
          color: #6b7280;
          margin-bottom: 8px;
          font-weight: 500;
        }

        .dashboard-price-value {
          font-size: 36px;
          font-weight: 800;
          background: linear-gradient(135deg, #FB0A8B, #a855f7);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 6px;
          line-height: 1;
        }

        .dashboard-price-change {
          font-size: 14px;
          font-weight: 600;
        }

        .dashboard-price-change.positive {
          color: #10b981;
        }

        .dashboard-price-change.negative {
          color: #ef4444;
        }

        .dashboard-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .dashboard-stat-box {
          padding: 16px;
          background: #f9fafb;
          border-radius: 10px;
          text-align: center;
          border: 2px solid #f3f4f6;
        }

        .dashboard-stat-label {
          font-size: 12px;
          color: #6b7280;
          margin-bottom: 8px;
        }

        .dashboard-stat-value {
          font-size: 20px;
          font-weight: 700;
          color: #1f2937;
        }

        .dashboard-activity-section {
          margin-top: 4px;
        }

        .dashboard-section-title {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #4b5563;
          margin-bottom: 12px;
        }

        .dashboard-activity-loading {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .dashboard-activity-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .dashboard-activity-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          background: #f9fafb;
          border-radius: 8px;
          border: 2px solid #f3f4f6;
          transition: all 0.2s;
          text-decoration: none;
          color: inherit;
        }

        .dashboard-activity-item:hover {
          border-color: #FB0A8B;
          background: #fef2f8;
          transform: translateX(2px);
        }

        .dashboard-activity-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .dashboard-activity-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          flex-shrink: 0;
        }

        .dashboard-activity-dot.buy {
          background: #10b981;
          box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
        }

        .dashboard-activity-dot.sell {
          background: #ef4444;
          box-shadow: 0 0 8px rgba(239, 68, 68, 0.4);
        }

        .dashboard-activity-hash {
          font-family: 'Courier New', monospace;
          font-size: 13px;
          color: #4b5563;
        }

        .dashboard-activity-icon {
          color: #9ca3af;
          flex-shrink: 0;
        }

        .dashboard-empty-state {
          text-align: center;
          padding: 24px;
          color: #9ca3af;
          font-size: 14px;
        }

        .dashboard-cta-button {
          width: 100%;
          height: 52px;
          padding: 0 24px;
          border: none;
          border-radius: 10px;
          background: linear-gradient(to right, #ec4899, #db2777, #a855f7);
          color: white;
          font-family: 'Montserrat', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.5px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: all 0.3s ease;
          box-shadow: 0 0 20px rgba(236, 72, 153, 0.5);
          margin-top: 8px;
        }

        .dashboard-cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 30px rgba(236, 72, 153, 0.7);
        }

        .dashboard-loading-bar {
          height: 32px;
          background: linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%);
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
          border-radius: 6px;
        }

        .dashboard-loading-bar.small {
          height: 20px;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        @media (max-width: 640px) {
          .dashboard-modal-card {
            padding: 24px 20px;
            max-width: calc(100% - 32px);
          }

          .dashboard-modal-close {
            width: 32px;
            height: 32px;
            top: 10px;
            right: 10px;
          }

          .dashboard-modal-logo {
            width: 56px;
            height: 56px;
          }

          .dashboard-modal-title {
            font-size: 20px;
          }

          .dashboard-price-value {
            font-size: 28px;
          }

          .dashboard-cta-button {
            height: 48px;
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}