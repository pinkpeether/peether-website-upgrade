console.log('📄📄📄 INDEX PAGE LOADED - BUILD VERSION 2.0 📄📄📄');

export { Page }

import { useState, useEffect } from 'react'

// 🔐 CRITICAL: This detection MUST run before App loads
const runRecoveryDetection = () => {
  if (typeof window === 'undefined') return false;
  
  const hash = window.location.hash || '';
  const search = window.location.search || '';
  
  const isRecovery = 
    hash.includes('type=recovery') || 
    search.includes('type=recovery') ||
    hash.includes('type=password_recovery');
  
  if (isRecovery) {
    window.__PTDT_PASSWORD_RECOVERY__ = true;
    
    if (hash.includes('access_token')) {
      window.__PTDT_RECOVERY_HASH__ = hash.substring(1);
    }
    
    console.log('🔐 [index.page] PASSWORD RECOVERY DETECTED!');
  }
  
  return isRecovery;
};

if (typeof window !== 'undefined') {
  runRecoveryDetection();
}

function Page() {
  const [AppComponent, setAppComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    runRecoveryDetection();
    
    import('../src/App').then((module) => {
      setAppComponent(() => module.default);
      setIsLoading(false);
    });
  }, []);

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
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
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