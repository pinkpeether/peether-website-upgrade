import React, { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../../lib/supabase";
import { generateAuthToken } from "../../utils/authToken";
import "./SignIn.css";

const SignIn = ({ onClose, onAuthChange, onOpenSignup }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState({ loading: false, message: "" });
  const [redirectingToDApp, setRedirectingToDApp] = useState(false);
  const [userData, setUserData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showResetEmailSent, setShowResetEmailSent] = useState(false); // NEW: Beautiful notification state

  const clearStatusAfterDelay = (delay = 3000) => {
    setTimeout(() => setStatus({ loading: false, message: "" }), delay);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, message: "" });

    // Validation
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setStatus({ loading: false, message: "❌ Please enter a valid email address" });
      clearStatusAfterDelay();
      return;
    }

    if (!formData.password) {
      setStatus({ loading: false, message: "❌ Please enter your password" });
      clearStatusAfterDelay();
      return;
    }

    try {
      // 1. Sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email.toLowerCase(),
        password: formData.password,
      });

      if (authError) {
        console.error("Sign in error:", authError);
        
        // Handle specific error messages
        if (authError.message.includes("Invalid login credentials")) {
          setStatus({ loading: false, message: "❌ Invalid email or password" });
        } else if (authError.message.includes("Email not confirmed")) {
          setStatus({ loading: false, message: "❌ Please verify your email first" });
        } else {
          setStatus({ loading: false, message: `❌ ${authError.message}` });
        }
        clearStatusAfterDelay(5000);
        return;
      }

      if (!authData.user) {
        setStatus({ loading: false, message: "❌ Sign in failed. Please try again." });
        clearStatusAfterDelay();
        return;
      }

      // 2. Fetch user profile from profiles table
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single();

      if (profileError) {
        console.error("Profile fetch error:", profileError);
        // Continue anyway - user is authenticated
      }

      // 3. Build session data
      const sessionData = {
        id: authData.user.id,
        fullName: profile?.full_name || authData.user.user_metadata?.full_name || 'User',
        email: authData.user.email,
        wallet: profile?.wallet || authData.user.user_metadata?.wallet || '',
        country: profile?.country || authData.user.user_metadata?.country || '',
        tier: profile?.tier || 'STANDARD',
        isWhitelisted: profile?.is_whitelisted || false,
        registeredAt: profile?.registered_at || authData.user.created_at,
      };

      setUserData(sessionData);

      // 4. Notify app of auth change
      if (onAuthChange) onAuthChange(true, sessionData);
      window.dispatchEvent(new CustomEvent("sessionChange"));

      // 5. Check for DApp redirect intent
      const redirectIntent = localStorage.getItem("ptdt_redirect_after_auth");
      
      if (redirectIntent === "dapp") {
        setStatus({ loading: false, message: "✅ Successfully signed in!" });
        setRedirectingToDApp(true);
        
        try {
          const authToken = generateAuthToken(sessionData);
          localStorage.removeItem("ptdt_redirect_after_auth");
          
          setTimeout(() => {
            window.open(`https://dapp.ptdt.taxi?auth=${authToken}`, '_blank');
            setTimeout(() => {
              if (onClose) onClose();
            }, 500);
          }, 2000);
          
        } catch (error) {
          console.error('Error generating auth token:', error);
          setTimeout(() => {
            window.open('https://dapp.ptdt.taxi', '_blank');
            if (onClose) onClose();
          }, 2000);
        }
      } else {
        setStatus({ loading: false, message: "✅ Successfully signed in!" });
        setTimeout(() => {
          if (onClose) onClose();
        }, 1000);
      }

    } catch (error) {
      console.error("Sign In Error:", error);
      setStatus({ loading: false, message: "⚠️ Sign in failed. Please try again." });
      clearStatusAfterDelay(5000);
    }
  };

  const handleSignupClick = (e) => {
    e.preventDefault();
    if (onClose) onClose();
    setTimeout(() => {
      if (onOpenSignup) onOpenSignup();
    }, 100);
  };

const handleForgotPassword = async (e) => {
  e.preventDefault();
  
  // Check if email is entered
  if (!formData.email.trim()) {
    setStatus({
      loading: false,
      message: '❌ Please enter your email address first.'
    });
    clearStatusAfterDelay(5000);
    return;
  }

  setStatus({ loading: true, message: '📧 Sending reset email...' });

  try {
    // Use the EXACT domain - this ensures proper redirect
    const redirectUrl = window.location.origin; // https://ptdt.taxi
    
    console.log('🔐 Sending reset email with redirect:', redirectUrl);
    
    const { error } = await supabase.auth.resetPasswordForEmail(
      formData.email.trim().toLowerCase(), 
      {
        redirectTo: redirectUrl,
      }
    );

    if (error) throw error;

    // Clear status and show beautiful notification
    setStatus({ loading: false, message: '' });
    setShowResetEmailSent(true);
    
    // Auto-hide notification after 8 seconds
    setTimeout(() => {
      setShowResetEmailSent(false);
    }, 8000);

  } catch (error) {
    console.error('Reset password error:', error);
    setStatus({
      loading: false,
      message: `❌ ${error.message || 'Failed to send reset email. Please try again.'}`
    });
    clearStatusAfterDelay(5000);
  }
};

  // Redirecting Screen
  if (redirectingToDApp) {
    return (
      <div className="signin-overlay" onClick={(e) => e.stopPropagation()}>
        <div className="signin-card" onClick={(e) => e.stopPropagation()}>
          <div className="success-icon">
            <svg className="success-checkmark" viewBox="0 0 52 52">
              <circle className="success-checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
              <path className="success-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
          <h2 className="success-title">Welcome Back!</h2>
          <p className="success-message">Successfully signed in to your account</p>
          <div className="success-details">
            <div className="success-detail-item">
              <span className="success-icon-emoji">🎉</span>
              <span>Welcome back to PTDT!</span>
            </div>
            <div className="success-detail-item redirect-item">
              <span className="success-icon-emoji">🚀</span>
              <span className="signin-redirect-message">Redirecting to DApp...</span>
            </div>
          </div>
          <div className="signin-loader"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="signin-overlay" onClick={onClose}>
      <div className="signin-card" onClick={(e) => e.stopPropagation()}>
        <button className="signin-close-btn" onClick={onClose}>✕</button>
        
        <div className="signin-header">
          <img src="/ptdtlogo.png" alt="PTDT Logo" className="signin-logo" />
          <h2 className="signin-heading">Welcome Back</h2>
          <p className="signin-subtitle">
            Sign in to access your PTDT account
          </p>
        </div>

        {/* 🎉 Beautiful Reset Email Sent Notification */}
        {showResetEmailSent && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="reset-email-notification"
          >
            <div className="reset-email-card">
              <div className="reset-email-content">
                {/* Icon */}
                <div className="reset-email-icon-wrapper">
                  <div className="reset-email-icon">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                
                {/* Text */}
                <div className="reset-email-text">
                  <h4 className="reset-email-title">Reset Email Sent! ✨</h4>
                  <p className="reset-email-message">
                    Check your inbox for a password reset link.
                  </p>
                  <div className="reset-email-address">
                    <div className="reset-email-dot"></div>
                    <span>{formData.email}</span>
                  </div>
                </div>
                
                {/* Close button */}
                <button
                  onClick={() => setShowResetEmailSent(false)}
                  className="reset-email-close"
                >
                  ✕
                </button>
              </div>
              
              {/* Progress bar */}
              <motion.div
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 8, ease: 'linear' }}
                className="reset-email-progress"
              />
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="signin-form">
          <div className="signin-input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={status.loading}
              autoFocus
              autoComplete="email"
              className="signin-input"
            />
          </div>

          {/* Password Input with Toggle - UPDATED */}
          <div className="signin-input-group password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={status.loading}
              autoComplete="current-password"
              className="signin-input"
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

          {/* Forgot Password Link */}
          <div className="signin-forgot-wrapper">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="signin-forgot-btn"
              disabled={status.loading}
            >
              Forgot password?
            </button>
          </div>

          <button type="submit" className="signin-btn signin-btn-primary" disabled={status.loading}>
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {status.loading ? (
              <span className="relative flex items-center gap-2">
                <span className="signin-btn-spinner"></span>
                <span>SIGNING IN...</span>
              </span>
            ) : (
              <span className="relative flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span>SIGN IN</span>
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

        {status.message && (
          <div className="signin-status">
            {status.message}
          </div>
        )}

        <div className="signin-footer">
          <p className="signin-footer-text">
            Don't have an account?{" "}
            <a href="#signup" onClick={handleSignupClick} className="signin-footer-link">
              Sign Up
            </a>
          </p>
        </div>

        <div className="signin-steps-section">
          <h4 className="signin-steps-title">🔐 Secure Sign In</h4>

          <div className="signin-step">
            <span className="signin-step-number">1</span>
            <div className="signin-step-content">
              <h5>Enter Credentials</h5>
              <p>Use your registered email and password</p>
            </div>
          </div>

          <div className="signin-step">
            <span className="signin-step-number">2</span>
            <div className="signin-step-content">
              <h5>Access Account</h5>
              <p>Get instant access to your PTDT dashboard</p>
            </div>
          </div>

          <div className="signin-step">
            <span className="signin-step-number">3</span>
            <div className="signin-step-content">
              <h5>Launch DApp</h5>
              <p>Seamlessly connect to the PTDT DApp</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;