import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// 🔥 EARLY DETECTION: Check for password recovery BEFORE React loads
const checkPasswordRecovery = () => {
  const hash = window.location.hash || '';
  const search = window.location.search || '';
  const pathname = window.location.pathname || '';
  
  const isRecovery = 
    hash.includes('type=recovery') || 
    search.includes('type=recovery') ||
    hash.includes('type=password_recovery') ||
    search.includes('type=password_recovery');
  
  console.log('🔐 [main.jsx] Early Recovery Check:', {
    isRecovery,
    hash: hash.substring(0, 100) + '...',
    search,
    pathname,
    fullUrl: window.location.href
  });
  
  if (isRecovery) {
    // Store flag for App.jsx to pick up
    window.__PTDT_PASSWORD_RECOVERY__ = true;
    console.log('🔐 [main.jsx] Password recovery flag set!');
  }
  
  return isRecovery;
};

checkPasswordRecovery();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)