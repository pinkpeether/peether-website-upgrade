import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Wallet, Globe, Calendar, Award, LogOut } from "lucide-react";

const AccountModal = ({ isOpen, onClose, userData, onSignOut }) => {
  if (!isOpen || !userData) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const truncateWallet = (wallet) => {
    if (!wallet || wallet.length < 12) return wallet || "Not connected";
    return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
  };

  const handleSignOut = () => {
    onSignOut();
    onClose();
  };

  const handleClose = (e) => {
    e.stopPropagation();
    onClose?.();
  };

  // Get tier info
  const getTierInfo = () => {
    const tier = userData.tier?.toUpperCase() || 'STANDARD';
    switch (tier) {
      case 'GOLD':
        return { label: 'Gold', color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-200', icon: '👑' };
      case 'SILVER':
        return { label: 'Silver', color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-200', icon: '🥈' };
      case 'BRONZE':
        return { label: 'Bronze', color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-200', icon: '🥉' };
      default:
        return { label: 'Standard', color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-200', icon: '⭐' };
    }
  };

  const tierInfo = getTierInfo();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{
            background: 'rgba(0, 0, 0, 0.15)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative rounded-[24px] w-full max-w-[550px] p-[6px]"
            style={{
              boxShadow: `
                0 0 40px rgba(255, 255, 255, 0.6),
                0 0 60px rgba(255, 255, 255, 0.4),
                0 25px 60px rgba(0, 0, 0, 0.4),
                inset 0 2px 6px rgba(255, 255, 255, 0.9),
                inset 2px 0 6px rgba(255, 255, 255, 0.5),
                inset 0 -2px 6px rgba(0, 0, 0, 0.08),
                inset -2px 0 6px rgba(0, 0, 0, 0.05),
                0 0 0 1px rgba(75, 85, 99, 0.2)
              `,
            }}
          >
            <div className="bg-white rounded-[18px] w-full h-full overflow-hidden">
              {/* Close Button */}
              <motion.button
                onClick={handleClose}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center z-10 transition-all"
                style={{
                  background: 'linear-gradient(135deg, #FB0A8B, #d9076f)',
                  boxShadow: '0 4px 12px rgba(251, 10, 139, 0.3)',
                }}
              >
                <X size={18} className="text-white" />
              </motion.button>

              {/* Content */}
              <div className="p-6">
                {/* Header */}
                <div className="text-center mb-5">
                  <h2 
                    className="font-montserrat text-2xl font-bold mb-1"
                    style={{
                      background: 'linear-gradient(135deg, #FB0A8B, #d9076f)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    My Account
                  </h2>
                  <p className="font-lexend text-sm text-gray-500">
                    PTDT Token Holder
                  </p>
                </div>

                {/* User Name & Tier */}
                <div className="text-center mb-5 pb-5 border-b border-gray-100">
                  <h3 className="font-montserrat text-xl font-bold text-gray-800 mb-2">
                    {userData.fullName || "User"}
                  </h3>
                  <div className="inline-flex items-center gap-2">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold ${tierInfo.bg} ${tierInfo.color} ${tierInfo.border} border`}>
                      <span>{tierInfo.icon}</span>
                      {tierInfo.label} Tier
                    </span>
                    {userData.isWhitelisted && (
                      <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold bg-purple-50 text-purple-600 border border-purple-200">
                        ⭐ VIP
                      </span>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-5">
                  {/* Email */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-9 h-9 rounded-lg bg-pink-100 flex items-center justify-center flex-shrink-0">
                      <Mail size={18} className="text-pink-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-lexend mb-1">Email</p>
                      <p className="text-sm font-medium text-gray-800 break-all font-lexend">
                        {userData.email || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Wallet - Shows full address with word-break */}
                  <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <Wallet size={18} className="text-purple-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-lexend mb-1">Wallet Address</p>
                      <p className="text-sm font-medium text-gray-800 font-mono break-all leading-relaxed">
                        {userData.wallet || (
                          <span className="text-gray-400 font-lexend">Not connected</span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Country */}
                  {userData.country && (
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Globe size={18} className="text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-gray-500 font-lexend mb-1">Country</p>
                        <p className="text-sm font-medium text-gray-800 font-lexend">
                          {userData.country}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Member Since */}
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <Calendar size={18} className="text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500 font-lexend mb-1">Member Since</p>
                      <p className="text-sm font-medium text-gray-800 font-lexend">
                        {formatDate(userData.registeredAt)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Token Balance */}
                <div className="p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl border border-pink-100 mb-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award size={20} className="text-pink-600" />
                      <span className="text-sm font-medium text-gray-700 font-lexend">PTDT Balance</span>
                    </div>
                    <span className="text-xl font-bold text-pink-600 font-montserrat">0 PTDT</span>
                  </div>
                </div>

                {/* Sign Out Button */}
                <motion.button
                  onClick={handleSignOut}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-12 rounded-xl font-montserrat font-bold text-sm text-white flex items-center justify-center gap-2 transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #FB0A8B, #d9076f)',
                    boxShadow: '0 4px 15px rgba(251, 10, 139, 0.3)',
                  }}
                >
                  <LogOut size={18} />
                  Sign Out
                </motion.button>

                {/* Footer */}
                <p className="text-center text-xs text-gray-500 mt-4 font-lexend">
                  Need help?{" "}
                  <a
                    href="mailto:token@ptdt.taxi"
                    className="text-pink-600 font-medium hover:underline"
                  >
                    token@ptdt.taxi
                  </a>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AccountModal;