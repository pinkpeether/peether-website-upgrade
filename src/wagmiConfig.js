import { http, createConfig } from 'wagmi';
import { bsc } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

// ============================================================
// WALLETCONNECT PROJECT ID
// ============================================================
const WALLETCONNECT_PROJECT_ID = '8d99762e2511ff5391bceae936308d08';

// ============================================================
// ENVIRONMENT DETECTION (NEW - ONLY ADDITION)
// ============================================================
const isDevelopment = typeof window !== 'undefined' && 
  (window.location.hostname === 'localhost' || 
   window.location.hostname === '127.0.0.1');

const SITE_URL = isDevelopment 
  ? `http://${window.location.host}`
  : 'https://ptdt.taxi';

// ============================================================
// METADATA FOR WALLETCONNECT (UPDATED)
// ============================================================
const metadata = {
  name: 'Peether - PTDT',
  description: 'Empowering women globally with blockchain technology',
  url: SITE_URL, // ✅ DYNAMIC URL (was hardcoded)
  icons: ['https://ptdt.taxi/ptdtlogo.png']
};

// ============================================================
// EIP-6963 PROVIDER STORE (UNCHANGED - YOUR CODE)
// ============================================================
let discoveredProviders = [];

if (typeof window !== 'undefined') {
  window.addEventListener('eip6963:announceProvider', (event) => {
    const { info, provider } = event.detail;
    
    // Avoid duplicates
    if (!discoveredProviders.find(p => p.info.uuid === info.uuid)) {
      discoveredProviders.push({ info, provider });
      console.log('🔔 EIP-6963 Wallet Discovered:', info.name, info.rdns);
    }
  });
  
  // Request wallets to announce themselves
  window.dispatchEvent(new Event('eip6963:requestProvider'));
}

// ============================================================
// PROVIDER DETECTION HELPERS (UNCHANGED - YOUR CODE)
// ============================================================

// Get MetaMask via EIP-6963 or fallback
export const getMetaMaskProvider = () => {
  if (typeof window === 'undefined') return undefined;
  
  // Method 1: EIP-6963 (Modern & Reliable)
  const metamaskEIP6963 = discoveredProviders.find(
    (p) => p.info.rdns === 'io.metamask' || 
           p.info.name.toLowerCase().includes('metamask')
  );
  if (metamaskEIP6963) {
    return metamaskEIP6963.provider;
  }
  
  // Method 2: Check providers array
  if (window.ethereum?.providers?.length) {
    const metamask = window.ethereum.providers.find(
      (p) => p.isMetaMask && !p.isTrust && !p.isTrustWallet
    );
    if (metamask) return metamask;
  }
  
  // Method 3: Direct check (only if NOT Trust)
  if (window.ethereum?.isMetaMask && 
      !window.ethereum?.isTrust && 
      !window.ethereum?.isTrustWallet) {
    return window.ethereum;
  }
  
  return undefined;
};

// Get Trust Wallet via EIP-6963 or fallback
export const getTrustWalletProvider = () => {
  if (typeof window === 'undefined') return undefined;
  
  // Method 1: EIP-6963 (Modern & Reliable)
  const trustEIP6963 = discoveredProviders.find(
    (p) => p.info.rdns === 'com.trustwallet.app' || 
           p.info.name.toLowerCase().includes('trust')
  );
  if (trustEIP6963) {
    console.log('✅ Found Trust Wallet via EIP-6963');
    return trustEIP6963.provider;
  }
  
  // Method 2: Trust Wallet's own namespace
  if (window.trustwallet) {
    return window.trustwallet;
  }
  
  // Method 3: Check providers array
  if (window.ethereum?.providers?.length) {
    const trust = window.ethereum.providers.find(
      (p) => p.isTrust || p.isTrustWallet
    );
    if (trust) return trust;
  }
  
  // Method 4: window.ethereum is Trust
  if (window.ethereum?.isTrust || window.ethereum?.isTrustWallet) {
    return window.ethereum;
  }
  
  return undefined;
};

// Get all discovered providers (for debugging)
export const getDiscoveredProviders = () => discoveredProviders;

// ============================================================
// WAGMI CONFIG - BSC MAINNET (UNCHANGED - YOUR CODE)
// ============================================================
export const config = createConfig({
  chains: [bsc], // ✅ MAINNET ONLY
  connectors: [
    // MetaMask - with EIP-6963 support
    injected({
      shimDisconnect: true,
      target: {
        id: 'metaMask',
        name: 'MetaMask',
        provider: getMetaMaskProvider,
      },
    }),
    
    // Trust Wallet - with EIP-6963 support
    injected({
      shimDisconnect: true,
      target: {
        id: 'trustWallet',
        name: 'Trust Wallet',
        provider: getTrustWalletProvider,
      },
    }),
    
    // WalletConnect v2
    walletConnect({
      projectId: WALLETCONNECT_PROJECT_ID,
      metadata, // ✅ NOW USES DYNAMIC URL
      showQrModal: true,
      qrModalOptions: {
        themeMode: 'light',
        themeVariables: {
          '--wcm-z-index': '99999',
          '--wcm-accent-color': '#ec4899',
          '--wcm-background-color': '#ffffff',
        },
      },
    }),
  ],
  transports: {
    [bsc.id]: http('https://bsc-dataseed1.binance.org'), // ✅ MAINNET RPC
  },
});

// ✅ Export only BSC Mainnet
export { bsc };