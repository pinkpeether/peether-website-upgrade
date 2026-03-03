export { Page }

import { useState, useEffect } from 'react'

// 🔐 Recovery detection - runs immediately
const runRecoveryDetection = () => {
  if (typeof window === 'undefined') return false;
  
  const hash = window.location.hash || '';
  const search = window.location.search || '';
  
  const isRecovery = 
    hash.includes('type=recovery') || 
    search.includes('type=recovery') ||
    hash.includes('access_token') ||
    search.includes('token=');
  
  if (isRecovery || window.location.pathname.includes('reset-password')) {
    window.__PTDT_PASSWORD_RECOVERY__ = true;
    
    if (hash.includes('access_token')) {
      window.__PTDT_RECOVERY_HASH__ = hash.substring(1);
    }
    
    console.log('🔐 [reset-password.page] Recovery detected!');
  }
  
  return true; // Always treat this page as recovery
};

// Run detection immediately
if (typeof window !== 'undefined') {
  window.__PTDT_PASSWORD_RECOVERY__ = true; // Always set for this page
  runRecoveryDetection();
  console.log('🔐 [reset-password.page] Page loaded - recovery mode enabled');
}

function Page() {
  const [AppComponent, setAppComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Ensure recovery flag is set
    window.__PTDT_PASSWORD_RECOVERY__ = true;
    
    console.log('🔐 [reset-password.page] Loading App with recovery mode...');
    
    // Dynamic import App
    import('../src/App').then((module) => {
      console.log('🔐 [reset-password.page] App loaded, recovery flag:', window.__PTDT_PASSWORD_RECOVERY__);
      setAppComponent(() => module.default);
      setIsLoading(false);
    });
  }, []);

  // Loading state
  if (isLoading || !AppComponent) {
    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <img 
          src="/ptdtlogo.png" 
          alt="PTDT" 
          style={{ 
            width: '80px', 
            height: '80px',
            animation: 'pulse 1.5s ease-in-out infinite'
          }} 
        />
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(245, 184, 0, 0.2)',
          borderTopColor: '#f5b800',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
          Loading password reset...
        </p>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.7; transform: scale(0.95); }
          }
        `}</style>
      </div>
    );
  }

  return <AppComponent />;
}