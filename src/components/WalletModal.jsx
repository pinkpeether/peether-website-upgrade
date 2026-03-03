import { motion, AnimatePresence } from "framer-motion";
import { X, Loader2, ExternalLink, Check } from "lucide-react";
import { useConnect, useAccount } from 'wagmi';
import { useEffect, useState, useCallback } from 'react';
import { getMetaMaskProvider, getTrustWalletProvider } from '../wagmiConfig';

const WalletModal = ({ isOpen, onClose }) => {
  const { connectors, connect, error: connectError, reset } = useConnect();
  const { isConnected } = useAccount();
  
  const [connectingWallet, setConnectingWallet] = useState(null);
  const [error, setError] = useState(null);
  const [walletStatus, setWalletStatus] = useState({
    metamask: { installed: false },
    trustwallet: { installed: false },
  });
  const [showConflictWarning, setShowConflictWarning] = useState(false);

  // ========== WALLET DETECTION WITH EIP-6963 ==========
useEffect(() => {
  if (!isOpen) return;
  
  const detectWallets = () => {
    if (typeof window === 'undefined') return;
    
    // Trigger EIP-6963 discovery
    window.dispatchEvent(new Event('eip6963:requestProvider'));
    
    // Small delay to allow wallets to announce
    setTimeout(() => {
      const metamaskProvider = getMetaMaskProvider();
      const trustProvider = getTrustWalletProvider();
      
      const metamaskInstalled = !!metamaskProvider;
      const trustInstalled = !!trustProvider;
      const hasConflict = metamaskInstalled && trustInstalled;

      setWalletStatus({
        metamask: { installed: metamaskInstalled },
        trustwallet: { installed: trustInstalled },
      });
      
      setShowConflictWarning(hasConflict);

      console.log('🔍 Wallet Detection (with EIP-6963):', {
        metamaskInstalled,
        trustInstalled,
        conflict: hasConflict,
        providersArray: window.ethereum?.providers?.length || 0,
      });
    }, 100);
  };

  detectWallets();
  
  // Re-check after wallets have time to announce
  const timeout1 = setTimeout(detectWallets, 500);
  const timeout2 = setTimeout(detectWallets, 1500);
  
  return () => {
    clearTimeout(timeout1);
    clearTimeout(timeout2);
  };
}, [isOpen]);

  // Handle wagmi connection errors
  useEffect(() => {
    if (connectError) {
      console.error('❌ Wagmi connect error:', connectError);
      
      if (connectError.message?.includes('rejected') || connectError.code === 4001) {
        setError('Connection rejected. Please try again.');
      } else if (connectError.message?.includes('pending') || connectError.code === -32002) {
        setError('Request pending. Check your wallet extension.');
      } else {
        setError(connectError.shortMessage || connectError.message || 'Connection failed');
      }
      setConnectingWallet(null);
    }
  }, [connectError]);

  // Close modal when connected
  useEffect(() => {
    if (isConnected && isOpen) {
      const timeout = setTimeout(() => {
        onClose();
        setConnectingWallet(null);
        setError(null);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [isConnected, isOpen, onClose]);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setError(null);
      setConnectingWallet(null);
      reset?.();
    }
  }, [isOpen, reset]);

  // ========== GET SPECIFIC CONNECTORS ==========
  const getConnectorByTargetId = useCallback((targetId) => {
    console.log('🔎 Looking for connector:', targetId);
    console.log('📋 Available connectors:', connectors.map(c => ({ 
      id: c.id, 
      name: c.name, 
      type: c.type 
    })));
    
    // Find by exact ID match first
    let connector = connectors.find(c => c.id === targetId);
    
    // Fallback: find by name containing target
    if (!connector) {
      connector = connectors.find(c => 
        c.name?.toLowerCase().includes(targetId.toLowerCase())
      );
    }
    
    console.log('✅ Found connector:', connector?.id, connector?.name);
    return connector;
  }, [connectors]);

  // ========== CONNECTION HANDLER ==========
  const handleConnect = async (walletId) => {
    setConnectingWallet(walletId);
    setError(null);
    reset?.();

    try {
      // ===== WALLETCONNECT =====
      if (walletId === 'walletconnect') {
        const wcConnector = connectors.find(c => 
          c.id === 'walletConnect' || 
          c.id.toLowerCase().includes('walletconnect')
        );
        
        if (wcConnector) {
          console.log('🔗 Connecting via WalletConnect...');
          connect({ connector: wcConnector });
        } else {
          throw new Error('WalletConnect connector not found');
        }
        return;
      }

      // ===== METAMASK =====
      if (walletId === 'metamask') {
        const metamaskProvider = getMetaMaskProvider();
        
        if (!metamaskProvider) {
          window.open('https://metamask.io/download/', '_blank');
          setError('MetaMask not detected. Please install and refresh.');
          setConnectingWallet(null);
          return;
        }

        console.log('🦊 Connecting to MetaMask with specific provider...');
        
        // Find the MetaMask connector we created in wagmiConfig
        const metamaskConnector = getConnectorByTargetId('metaMask');
        
        if (metamaskConnector) {
          connect({ connector: metamaskConnector });
        } else {
          // Fallback: find any injected connector with MetaMask name
          const fallbackConnector = connectors.find(c => 
            c.name?.toLowerCase().includes('metamask') ||
            (c.type === 'injected' && c.id === 'injected')
          );
          
          if (fallbackConnector) {
            console.log('⚠️ Using fallback connector:', fallbackConnector.id);
            connect({ connector: fallbackConnector });
          } else {
            throw new Error('MetaMask connector not found');
          }
        }
        return;
      }

      // ===== TRUST WALLET =====
      if (walletId === 'trustwallet') {
        const trustProvider = getTrustWalletProvider();
        
        if (!trustProvider) {
          window.open('https://trustwallet.com/browser-extension', '_blank');
          setError('Trust Wallet not detected. Please install and refresh.');
          setConnectingWallet(null);
          return;
        }

        console.log('🛡️ Connecting to Trust Wallet with specific provider...');
        
        // Find the Trust Wallet connector we created in wagmiConfig
        const trustConnector = getConnectorByTargetId('trustWallet');
        
        if (trustConnector) {
          connect({ connector: trustConnector });
        } else {
          // Fallback: find any injected connector with Trust name
          const fallbackConnector = connectors.find(c => 
            c.name?.toLowerCase().includes('trust') ||
            (c.type === 'injected' && c.id === 'injected')
          );
          
          if (fallbackConnector) {
            console.log('⚠️ Using fallback connector:', fallbackConnector.id);
            connect({ connector: fallbackConnector });
          } else {
            throw new Error('Trust Wallet connector not found');
          }
        }
        return;
      }

    } catch (err) {
      console.error('❌ Connection error:', err);
      
      if (err.code === 4001) {
        setError('Connection rejected. Please try again.');
      } else if (err.code === -32002) {
        setError('Request pending. Check your wallet extension.');
      } else {
        setError(err.message || 'Connection failed. Please try again.');
      }
      setConnectingWallet(null);
    }
  };

  // Wallet options
  const wallets = [
    {
      id: 'metamask',
      name: 'MetaMask',
      icon: '🦊',
      description: 'Popular browser extension wallet',
      gradient: 'from-orange-500 to-amber-500',
      installed: walletStatus.metamask.installed,
    },
    {
      id: 'trustwallet',
      name: 'Trust Wallet',
      icon: '🛡️',
      description: 'Secure multi-chain wallet',
      gradient: 'from-blue-500 to-cyan-500',
      installed: walletStatus.trustwallet.installed,
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect',
      icon: '🔗',
      description: 'Connect with mobile wallet',
      gradient: 'from-purple-500 to-pink-500',
      installed: true,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="relative bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl"
          >
            {/* Close Button */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 text-white flex items-center justify-center shadow-lg border-2 border-pink-300"
            >
              <X size={20} />
            </motion.button>

            {/* Header */}
            <div className="text-center mb-6">
              <h2 className="font-montserrat text-2xl font-bold text-gray-800 mb-2">
                Connect Wallet
              </h2>
              <p className="font-lexend text-sm text-gray-500">
                Choose your preferred wallet
              </p>
            </div>

            {/* Conflict Info */}
            {showConflictWarning && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-xl"
              >
                <div className="flex items-start gap-2">
                  <Check size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-blue-700">
                    <strong>Multiple wallets detected!</strong> Each wallet will open separately when selected.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl"
                >
                  <p className="text-sm text-red-600 text-center">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Success Message */}
            <AnimatePresence>
              {isConnected && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-4 p-3 bg-green-50 border border-green-200 rounded-xl"
                >
                  <p className="text-sm text-green-600 text-center flex items-center justify-center gap-2">
                    <Check size={16} />
                    Wallet connected successfully!
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Wallet Options */}
            <div className="space-y-3">
              {wallets.map((wallet, index) => {
                const isConnecting = connectingWallet === wallet.id;
                const isDisabled = connectingWallet !== null && !isConnecting;

                return (
                  <motion.button
                    key={wallet.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleConnect(wallet.id)}
                    disabled={isDisabled || isConnected}
                    className={`
                      w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all
                      ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-pink-400 hover:shadow-lg cursor-pointer'}
                      ${isConnecting ? 'border-pink-400 bg-pink-50' : 'border-gray-200 bg-white'}
                    `}
                  >
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${wallet.gradient} flex items-center justify-center text-3xl shadow-lg`}>
                      {isConnecting ? (
                        <Loader2 className="w-7 h-7 text-white animate-spin" />
                      ) : (
                        wallet.icon
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 text-left">
                      <div className="font-montserrat font-bold text-gray-800 flex items-center gap-2">
                        {wallet.name}
                        {wallet.id !== 'walletconnect' && (
                          wallet.installed ? (
                            <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <Check size={10} />
                              Ready
                            </span>
                          ) : (
                            <span className="text-xs font-medium text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                              <ExternalLink size={10} />
                              Install
                            </span>
                          )
                        )}
                      </div>
                      <p className="font-lexend text-xs text-gray-500 mt-0.5">
                        {wallet.description}
                      </p>
                    </div>

                    {/* Arrow */}
                    <div className={`text-pink-500 transition-opacity ${isDisabled ? 'opacity-0' : 'opacity-50'}`}>
                      →
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* Help Text */}
            <div className="mt-6 p-3 bg-gray-50 rounded-xl">
              <p className="font-lexend text-xs text-gray-500 text-center">
                💡 Make sure your wallet extension is unlocked before connecting
              </p>
            </div>

            {/* Footer */}
            <div className="mt-4 text-center">
              <p className="font-lexend text-xs text-gray-400">
                By connecting, you agree to our{" "}
                <a href="/terms.html" className="text-pink-600 hover:underline">
                  Terms of Service
                </a>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WalletModal;