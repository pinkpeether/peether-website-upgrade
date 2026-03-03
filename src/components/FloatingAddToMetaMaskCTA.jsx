import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Wallet } from "lucide-react";

export default function FloatingAddToMetaMaskCTA({ hideWhenModalOpen = false }) {
  // State management
  const [isDragging, setIsDragging] = useState(false);
  const [isParked, setIsParked] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showCTA, setShowCTA] = useState(true);
  const [dragStartTime, setDragStartTime] = useState(0);
  const [showWalletSelector, setShowWalletSelector] = useState(false);
  const [availableWallets, setAvailableWallets] = useState([]);
  
  const desktopRef = useRef(null);
  const hasMoved = useRef(false);

  // Detect available wallets on mount
  useEffect(() => {
    detectWallets();
  }, []);

  const detectWallets = () => {
    const wallets = [];
    
    // Check for MetaMask
    if (window.ethereum && window.ethereum.isMetaMask) {
      wallets.push({ name: 'MetaMask', provider: window.ethereum, icon: '🦊' });
    }
    
    // Check for TrustWallet
    if (window.ethereum && window.ethereum.isTrust) {
      wallets.push({ name: 'TrustWallet', provider: window.ethereum, icon: '🛡️' });
    }
    
    // Check if both exist but need to check providers array
    if (window.ethereum && window.ethereum.providers) {
      window.ethereum.providers.forEach(provider => {
        if (provider.isMetaMask && !wallets.find(w => w.name === 'MetaMask')) {
          wallets.push({ name: 'MetaMask', provider, icon: '🦊' });
        }
        if (provider.isTrust && !wallets.find(w => w.name === 'TrustWallet')) {
          wallets.push({ name: 'TrustWallet', provider, icon: '🛡️' });
        }
      });
    }
    
    setAvailableWallets(wallets);
    console.log('🔍 Detected wallets:', wallets.map(w => w.name).join(', '));
  };

  // Add PTDT to specific wallet
  const addToWallet = async (walletProvider, walletName) => {
    console.log(`🔷 Adding PTDT to ${walletName}...`);
    
    try {
      const tokenParams = {
        type: 'ERC20',
        options: {
          address: '0x66c6Fc5E7F99272134a52DF9E88D94eD83E89278',
          symbol: 'PTDT',
          decimals: 18,
          image: 'https://ptdt.taxi/logos/32x32.png',
        },
      };

      // Try to add the token
      const wasAdded = await walletProvider.request({
        method: 'wallet_watchAsset',
        params: tokenParams,
      });
      
      console.log('📊 Request response:', wasAdded);
      
      if (wasAdded) {
        console.log(`✅ PTDT added to ${walletName} successfully!`);
        alert(`🎉 PTDT token added to ${walletName} successfully!`);
      } else {
        // User rejected
        console.log('⚠️ User rejected the request');
        alert('Token addition was cancelled.');
      }
      
      setShowWalletSelector(false);
      
    } catch (error) {
      console.error('❌ Error adding token:', error);
      
      // Handle "already added" error gracefully
      if (error.message && error.message.includes('already')) {
        console.log('ℹ️ Token already exists in wallet');
        alert(`✅ PTDT is already in your ${walletName}!\n\nNote: If you don't see the logo, you may need to:\n1. Remove PTDT from your wallet\n2. Click this button again to re-add it with the logo`);
      } else {
        alert(`Error adding token to ${walletName}: ${error.message}`);
      }
      
      setShowWalletSelector(false);
    }
  };

  // Handle main button click
  const handleMainClick = async (e) => {
    e.stopPropagation();
    console.log('🔷 Button clicked! Checking wallets...');
    
    // Prevent click if user was dragging
    if (hasMoved.current) {
      console.log('⚠️ Movement detected - ignoring click');
      hasMoved.current = false;
      return;
    }
    
    if (!window.ethereum) {
      console.error('❌ No wallet detected!');
      alert('No crypto wallet detected! Please install MetaMask or TrustWallet.');
      return;
    }
    
    // Refresh wallet detection
    detectWallets();
    
    if (availableWallets.length === 0) {
      alert('No compatible wallet found. Please install MetaMask or TrustWallet.');
      return;
    }
    
    if (availableWallets.length === 1) {
      // Only one wallet - add directly
      await addToWallet(availableWallets[0].provider, availableWallets[0].name);
    } else {
      // Multiple wallets - show selector
      setShowWalletSelector(true);
    }
  };

  // Resume floating animation
  const resumeFloating = (e) => {
    e.stopPropagation();
    setIsParked(false);
    setPosition({ x: 0, y: 0 });
  };

  // Desktop Mouse Events with drag threshold
  const handleMouseDown = (e) => {
    // Don't start drag on the button itself
    if (e.target.closest('button')) {
      return;
    }
    
    e.preventDefault();
    setDragStartTime(Date.now());
    hasMoved.current = false;
    
    const rect = desktopRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    // Small delay before enabling drag
    setTimeout(() => {
      if (Date.now() - dragStartTime < 150) {
        setIsDragging(true);
        setIsParked(true);
      }
    }, 150);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    hasMoved.current = true;
    
    const newX = e.clientX - dragOffset.x - window.innerWidth + 
      desktopRef.current.offsetWidth + 32;
    const newY = e.clientY - dragOffset.y - (window.innerHeight * 0.35);
    
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragStartTime(0);
  };

  // Global event listeners
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  return (
    <AnimatePresence>
      {showCTA && !hideWhenModalOpen && (
        <>
          {/* Wallet Selector Modal */}
          {showWalletSelector && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] flex items-center justify-center"
              onClick={() => setShowWalletSelector(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 shadow-2xl border border-orange-500/30 max-w-sm mx-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 mb-4">
                  <Wallet className="text-orange-500" size={24} />
                  <h3 className="text-xl font-bold text-white">Choose Your Wallet</h3>
                </div>
                
                <p className="text-gray-300 text-sm mb-6">
                  Multiple wallets detected. Select which one to add PTDT to:
                </p>
                
                <div className="space-y-3">
                  {availableWallets.map((wallet, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToWallet(wallet.provider, wallet.name)}
                      className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg flex items-center justify-between transition-all"
                    >
                      <span className="flex items-center gap-3">
                        <span className="text-2xl">{wallet.icon}</span>
                        <span>{wallet.name}</span>
                      </span>
                      <span className="text-sm opacity-80">→</span>
                    </motion.button>
                  ))}
                </div>
                
                <button
                  onClick={() => setShowWalletSelector(false)}
                  className="w-full mt-4 text-gray-400 hover:text-white text-sm py-2 transition-colors"
                >
                  Cancel
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* Desktop View - Floating/Draggable circular badge */}
          <motion.div
            ref={desktopRef}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: 1, 
              scale: 1,
              y: isParked ? [position.y, position.y - 15, position.y, position.y - 10, position.y] : [0, -15, 0, -10, 0],
              x: isParked ? [position.x, position.x + 8, position.x, position.x - 8, position.x] : [0, 8, 0, -8, 0],
            }}
            transition={{
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
              y: { 
                repeat: Infinity, 
                duration: 6,
                ease: "easeInOut" 
              },
              x: { 
                repeat: Infinity, 
                duration: 8,
                ease: "easeInOut" 
              }
            }}
            className="fixed right-8 top-[35%] z-[9997] hidden lg:block"
            style={{ 
              width: '90px', 
              height: '90px',
              cursor: isDragging ? 'grabbing' : 'default'
            }}
            onMouseDown={handleMouseDown}
          >
            <motion.button
              onClick={handleMainClick}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-full h-full group cursor-pointer"
            >
              {/* Pulsing glow ring */}
              <motion.div
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 0, 0.6]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-500 to-orange-400"
              />

              {/* Main circular badge */}
              <div className={`relative w-full h-full rounded-full bg-gradient-to-br from-orange-500 via-orange-600 to-orange-400 shadow-2xl shadow-orange-500/50 flex flex-col items-center justify-center p-2 border-4 ${
                isParked ? 'border-yellow-300/60' : 'border-white/20'
              }`}>
                
                {/* Wallet Icon */}
                <Wallet className="w-8 h-8 text-white pointer-events-none" strokeWidth={2.5} />

                {/* Text */}
                <div className="text-white font-bold text-xs leading-tight text-center mt-1 pointer-events-none">
                  Add PTDT<br/>to Wallet
                </div>
              </div>

              {/* Shine effect on hover */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-x-full group-hover:translate-x-full pointer-events-none"></div>
            </motion.button>

            {/* Reset Button - Only visible when parked */}
            {isParked && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                onClick={resumeFloating}
                className="absolute -left-10 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 shadow-lg flex items-center justify-center hover:scale-110 transition-transform border-2 border-white/30"
                title="Resume floating"
              >
                <RotateCcw size={14} className="text-white" />
              </motion.button>
            )}
          </motion.div>

          {/* Custom Tooltip - Desktop only */}
          <style>{`
            @media (min-width: 1024px) {
              .fixed.right-8:hover::after {
                content: "🖱️ Click to Add PTDT | Drag to Move";
                position: absolute;
                bottom: -35px;
                left: 50%;
                transform: translateX(-50%);
                background: linear-gradient(to right, rgba(249, 115, 22, 0.95), rgba(251, 146, 60, 0.95));
                color: white;
                padding: 6px 12px;
                border-radius: 8px;
                font-size: 11px;
                font-weight: 600;
                white-space: nowrap;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                animation: fadeIn 0.3s ease;
                pointer-events: none;
                z-index: 10000;
              }
            }
            
            @keyframes fadeIn {
              from { opacity: 0; transform: translateX(-50%) translateY(-5px); }
              to { opacity: 1; transform: translateX(-50%) translateY(0); }
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  );
}