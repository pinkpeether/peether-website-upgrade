import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './CookieConsent.css';

// Cookie preference keys
const COOKIE_CONSENT_KEY = 'ptdt_cookie_consent';
const COOKIE_PREFERENCES_KEY = 'ptdt_cookie_preferences';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  // Check if consent was already given
  useEffect(() => {
    const hasConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    
    if (!hasConsent) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
      if (savedPreferences) {
        setPreferences(JSON.parse(savedPreferences));
      }
    }
  }, []);

  // 🔥 Prevent body scroll when preferences modal is open
  useEffect(() => {
    if (showPreferences) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showPreferences]);

  const saveConsent = (prefs) => {
    localStorage.setItem(COOKIE_CONSENT_KEY, 'true');
    localStorage.setItem(COOKIE_PREFERENCES_KEY, JSON.stringify(prefs));
    setPreferences(prefs);
    setIsVisible(false);
    setShowPreferences(false);

    window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { 
      detail: prefs 
    }));

    console.log('🍪 Cookie preferences saved:', prefs);
  };

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      functional: true,
    });
  };

  const handleRejectAll = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      functional: false,
    });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  const togglePreference = (key) => {
    if (key === 'necessary') return;
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="cookie-backdrop"
        onClick={() => showPreferences && setShowPreferences(false)}
      />

      {!showPreferences ? (
        /* ============ INITIAL BANNER ============ */
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="cookie-container"
        >
          <div className="cookie-banner">
            <div className="cookie-banner-content">
              <div className="cookie-icon-wrapper">
                <span className="cookie-icon">🍪</span>
              </div>
              
              <div className="cookie-text">
                <h3 className="cookie-title">We Value Your Privacy</h3>
                <p className="cookie-description">
                  We use cookies to enhance your browsing experience, serve personalized content, 
                  and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
                  <a href="/privacy.html" target="_blank" rel="noopener noreferrer" className="cookie-link">
                    Learn more
                  </a>
                </p>
              </div>
            </div>

            <div className="cookie-actions">
              <button 
                onClick={handleRejectAll}
                className="cookie-btn cookie-btn-reject"
              >
                Reject All
              </button>
              <button 
                onClick={() => setShowPreferences(true)}
                className="cookie-btn cookie-btn-preferences"
              >
                Manage Preferences
              </button>
              <button 
                onClick={handleAcceptAll}
                className="cookie-btn cookie-btn-accept"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        /* ============ PREFERENCES MODAL (FIXED) ============ */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="cookie-modal-overlay"
        >
          <div className="cookie-modal-wrapper">
            <div className="cookie-preferences">
              {/* Header - Sticky */}
              <div className="cookie-preferences-header">
                <div className="cookie-preferences-title-wrapper">
                  <span className="cookie-icon">🍪</span>
                  <h3 className="cookie-preferences-title">Cookie Preferences</h3>
                </div>
                <button 
                  onClick={() => setShowPreferences(false)}
                  className="cookie-close-btn"
                >
                  ✕
                </button>
              </div>

              <p className="cookie-preferences-description">
                Manage your cookie preferences below. You can enable or disable different types of cookies.
                Note that disabling some cookies may affect your experience on our website.
              </p>

              <div className="cookie-categories">
                {/* Necessary Cookies */}
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <div className="cookie-category-info">
                      <div className="cookie-category-icon necessary">🔒</div>
                      <div>
                        <h4 className="cookie-category-title">Necessary Cookies</h4>
                        <p className="cookie-category-description">
                          Essential for the website to function properly. These cannot be disabled.
                        </p>
                      </div>
                    </div>
                    <div className="cookie-toggle-wrapper">
                      <span className="cookie-always-on">Always On</span>
                    </div>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <div className="cookie-category-info">
                      <div className="cookie-category-icon analytics">📊</div>
                      <div>
                        <h4 className="cookie-category-title">Analytics Cookies</h4>
                        <p className="cookie-category-description">
                          Help us understand how visitors interact with our website by collecting anonymous data.
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => togglePreference('analytics')}
                      className={`cookie-toggle ${preferences.analytics ? 'active' : ''}`}
                    >
                      <span className="cookie-toggle-slider" />
                    </button>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <div className="cookie-category-info">
                      <div className="cookie-category-icon marketing">📢</div>
                      <div>
                        <h4 className="cookie-category-title">Marketing Cookies</h4>
                        <p className="cookie-category-description">
                          Used to deliver personalized advertisements and track campaign effectiveness.
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => togglePreference('marketing')}
                      className={`cookie-toggle ${preferences.marketing ? 'active' : ''}`}
                    >
                      <span className="cookie-toggle-slider" />
                    </button>
                  </div>
                </div>

                {/* Functional Cookies */}
                <div className="cookie-category">
                  <div className="cookie-category-header">
                    <div className="cookie-category-info">
                      <div className="cookie-category-icon functional">⚙️</div>
                      <div>
                        <h4 className="cookie-category-title">Functional Cookies</h4>
                        <p className="cookie-category-description">
                          Enable enhanced functionality like remembering your preferences and settings.
                        </p>
                      </div>
                    </div>
                    <button 
                      onClick={() => togglePreference('functional')}
                      className={`cookie-toggle ${preferences.functional ? 'active' : ''}`}
                    >
                      <span className="cookie-toggle-slider" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="cookie-preferences-actions">
                <button 
                  onClick={handleRejectAll}
                  className="cookie-btn cookie-btn-reject"
                >
                  Reject All
                </button>
                <button 
                  onClick={handleSavePreferences}
                  className="cookie-btn cookie-btn-save"
                >
                  Save Preferences
                </button>
                <button 
                  onClick={handleAcceptAll}
                  className="cookie-btn cookie-btn-accept"
                >
                  Accept All
                </button>
              </div>

              <div className="cookie-footer-links">
                <a href="/privacy.html" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                <span className="cookie-divider">|</span>
                <a href="/terms.html" target="_blank" rel="noopener noreferrer">Terms of Service</a>
                <span className="cookie-divider">|</span>
                <a href="/cookies.html" target="_blank" rel="noopener noreferrer">Cookie Policy</a>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Hook to check cookie consent status
export const useCookieConsent = () => {
  const [consent, setConsent] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
    if (savedPreferences) {
      setConsent(JSON.parse(savedPreferences));
    }

    const handleConsentUpdate = (event) => {
      setConsent(event.detail);
    };

    window.addEventListener('cookieConsentUpdated', handleConsentUpdate);
    return () => window.removeEventListener('cookieConsentUpdated', handleConsentUpdate);
  }, []);

  return consent;
};

// Utility to check specific consent
export const hasConsent = (type) => {
  const savedPreferences = localStorage.getItem(COOKIE_PREFERENCES_KEY);
  if (!savedPreferences) return false;
  
  const preferences = JSON.parse(savedPreferences);
  return preferences[type] === true;
};

export default CookieConsent;