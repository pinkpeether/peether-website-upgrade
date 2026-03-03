import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import './ResetPassword.css';

export default function ResetPassword({ onClose, onSuccess }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isValidLink, setIsValidLink] = useState(true);
  const [checkingSession, setCheckingSession] = useState(true);
  const [userEmail, setUserEmail] = useState(null);
  const [countdown, setCountdown] = useState(5);

  // Check for recovery session on mount
  useEffect(() => {
    const checkSession = async () => {
      console.log('🔐 [ResetPassword] Checking session...');
      
      try {
        const hash = window.__PTDT_RECOVERY_HASH__ || window.location.hash.substring(1);
        const hashParams = new URLSearchParams(hash);
        const accessToken = hashParams.get('access_token');
        const type = hashParams.get('type');
        
        const queryParams = new URLSearchParams(window.location.search);
        const tokenFromQuery = queryParams.get('access_token');
        const typeFromQuery = queryParams.get('type');
        
        const hasValidToken = 
          (accessToken && type === 'recovery') || 
          (tokenFromQuery && typeFromQuery === 'recovery');
        
        console.log('🔐 [ResetPassword] Token check:', { hasValidToken, type, typeFromQuery });

        if (window.location.hash) {
          console.log('🔐 [ResetPassword] Clearing URL hash...');
          window.history.replaceState(null, '', window.location.pathname);
        }
        
        if (window.__PTDT_RECOVERY_HASH__) {
          delete window.__PTDT_RECOVERY_HASH__;
        }
        
        if (window.__PTDT_PASSWORD_RECOVERY__) {
          delete window.__PTDT_PASSWORD_RECOVERY__;
        }

        if (hasValidToken && accessToken) {
          console.log('🔐 [ResetPassword] Setting session from token...');
          
          const refreshToken = hashParams.get('refresh_token') || queryParams.get('refresh_token') || '';
          
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          
          if (sessionError) {
            console.error('🔐 [ResetPassword] Session error:', sessionError);
            setIsValidLink(false);
            setError('Invalid or expired reset link. Please request a new one.');
          } else if (data.session) {
            console.log('🔐 [ResetPassword] Session set successfully:', data.session.user.email);
            setUserEmail(data.session.user.email);
            setIsValidLink(true);
          }
        } else {
          const { data: { session } } = await supabase.auth.getSession();
          
          if (session) {
            console.log('🔐 [ResetPassword] Existing session found:', session.user.email);
            setUserEmail(session.user.email);
            setIsValidLink(true);
          } else {
            console.log('🔐 [ResetPassword] No valid session or token');
            setIsValidLink(false);
            setError('Invalid or expired reset link. Please request a new one.');
          }
        }
      } catch (err) {
        console.error('🔐 [ResetPassword] Check error:', err);
        setIsValidLink(false);
        setError('Something went wrong. Please try again.');
      } finally {
        setCheckingSession(false);
      }
    };

    setTimeout(checkSession, 300);
  }, []);

  // Countdown timer for redirect after success
  useEffect(() => {
    if (success && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (success && countdown === 0) {
      handleSuccessComplete();
    }
  }, [success, countdown]);

  // Simple password validation (min 6 characters + match)
  const isPasswordValid = password.length >= 6;
  const passwordsMatch = password === confirmPassword && password.length > 0;
  const canSubmit = isPasswordValid && passwordsMatch;

  // Handle success completion
  const handleSuccessComplete = async () => {
    try {
      await supabase.auth.signOut();
      window.history.replaceState({}, document.title, '/');
      
      if (window.__PTDT_PASSWORD_RECOVERY__) {
        delete window.__PTDT_PASSWORD_RECOVERY__;
      }
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error('Error during success completion:', err);
      if (onClose) onClose();
    }
  };

  // Handle form submission
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');

    if (!canSubmit) {
      setError('Please enter a valid password (min 6 characters) and confirm it');
      return;
    }

    setLoading(true);

    try {
      console.log('🔐 [ResetPassword] Updating password...');
      
      const { error: updateError } = await supabase.auth.updateUser({
        password: password
      });

      if (updateError) {
        console.error('🔐 [ResetPassword] Update error:', updateError);
        throw updateError;
      }
      
      console.log('🔐 [ResetPassword] Password updated successfully!');
      setSuccess(true);

    } catch (err) {
      console.error('🔐 [ResetPassword] Error:', err);
      setError(err.message || 'Failed to reset password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle close/cancel
  const handleClose = () => {
    window.history.replaceState({}, document.title, '/');
    
    if (window.__PTDT_PASSWORD_RECOVERY__) {
      delete window.__PTDT_PASSWORD_RECOVERY__;
    }
    
    if (onClose) onClose();
  };

  // ==================== LOADING STATE ====================
  if (checkingSession) {
    return (
      <div className="reset-overlay" onClick={(e) => e.stopPropagation()}>
        <div className="reset-card">
          <div className="reset-loading">
            <div className="reset-spinner"></div>
            <p>Verifying reset link...</p>
          </div>
        </div>
      </div>
    );
  }

  // ==================== SUCCESS STATE ====================
  if (success) {
    return (
      <div className="reset-overlay">
        <div className="reset-card">
          {/* Success Icon */}
          <div className="reset-success-icon">
            <svg className="reset-checkmark" viewBox="0 0 52 52">
              <circle className="reset-checkmark-circle" cx="26" cy="26" r="25" fill="none" />
              <path className="reset-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
          
          <h2 className="reset-success-title">Password Updated!</h2>
          
          <p className="reset-success-message">
            Your password has been successfully changed.
          </p>

          {/* Confirmation Box */}
          <div className="reset-confirmation-box">
            <div className="reset-confirmation-header">
              <span>🔒</span>
              <span>Security Confirmation</span>
            </div>
            
            <div className="reset-confirmation-details">
              {userEmail && (
                <div className="reset-detail-row">
                  <span>Account:</span>
                  <span>{userEmail}</span>
                </div>
              )}
              <div className="reset-detail-row">
                <span>Changed on:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className="reset-detail-row">
                <span>Time:</span>
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="reset-info-box">
            <p>✅ You'll need to sign in with your new password</p>
          </div>

          {/* Countdown */}
          <div className="reset-countdown">
            <div className="reset-countdown-spinner"></div>
            <span>Redirecting to sign in in <strong>{countdown}</strong> seconds...</span>
          </div>

          {/* Manual Button */}
          <button onClick={handleSuccessComplete} className="reset-btn reset-btn-submit">
            <span className="relative flex items-center gap-3">
              <span>SIGN IN NOW</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </button>
        </div>
      </div>
    );
  }

  // ==================== INVALID LINK STATE ====================
  if (!isValidLink) {
    return (
      <div className="reset-overlay" onClick={handleClose}>
        <div className="reset-card" onClick={(e) => e.stopPropagation()}>
          <button className="reset-close-btn" onClick={handleClose}>✕</button>
          
          {/* Logo */}
          <img src="/ptdtlogo.png" alt="PTDT" className="reset-logo" />
          
          <h2 className="reset-heading">Invalid Reset Link</h2>
          
          <p className="reset-subtitle">
            This password reset link is invalid or has expired.
          </p>

          {/* Help Box */}
          <div className="reset-help-box">
            <p className="reset-help-title">Common reasons:</p>
            <ul>
              <li>Link has expired (valid for 1 hour)</li>
              <li>Link has already been used</li>
              <li>Link was copied incorrectly</li>
            </ul>
          </div>
          
          <button onClick={handleClose} className="reset-btn reset-btn-submit">
            <span className="relative flex items-center gap-3">
              <span>BACK TO HOME</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </button>

          <p className="reset-support-text">
            Need help? <a href="mailto:support@ptdt.taxi">Contact Support</a>
          </p>
        </div>
      </div>
    );
  }

  // ==================== MAIN RESET FORM ====================
  return (
    <div className="reset-overlay" onClick={handleClose}>
      <div className="reset-card" onClick={(e) => e.stopPropagation()}>
        <button className="reset-close-btn" onClick={handleClose}>✕</button>

        {/* Header - Matches Signup */}
        <div className="reset-header">
          <img src="/ptdtlogo.png" alt="PTDT" className="reset-logo" />
          <h2 className="reset-heading">Reset Password</h2>
          <p className="reset-subtitle">
            Create a strong new password for your account
            {userEmail && (
              <>
                <br />
                <span className="reset-user-email">{userEmail}</span>
              </>
            )}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="reset-status">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleResetPassword} className="reset-form">
          {/* New Password */}
          <div className="reset-input-group">
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password (min 6 characters)"
                required
                autoFocus
                disabled={loading}
                className="reset-input"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="reset-input-group">
            <div className="password-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                required
                disabled={loading}
                className="reset-input"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="password-toggle"
                tabIndex={-1}
              >
                {showConfirmPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button - Matches Signup CREATE ACCOUNT button */}
          <button
            type="submit"
            disabled={loading || !canSubmit}
            className="reset-btn reset-btn-submit"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {loading ? (
              <span className="relative flex items-center gap-2">
                <span className="reset-btn-spinner"></span>
                <span>UPDATING PASSWORD...</span>
              </span>
            ) : (
              <span className="relative flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>UPDATE PASSWORD</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}