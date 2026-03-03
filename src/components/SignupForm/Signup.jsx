import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { sendSignupEmails } from "../../services/brevoService";
import Select from "react-select";
import { generateAuthToken } from "../../utils/authToken";
import { supabase } from "../../lib/supabase";
import "./Signup.css";

const countryOptions = [
  { value: 'Afghanistan', label: 'Afghanistan' },
  { value: 'Albania', label: 'Albania' },
  { value: 'Algeria', label: 'Algeria' },
  { value: 'Andorra', label: 'Andorra' },
  { value: 'Angola', label: 'Angola' },
  { value: 'Antigua and Barbuda', label: 'Antigua and Barbuda' },
  { value: 'Argentina', label: 'Argentina' },
  { value: 'Armenia', label: 'Armenia' },
  { value: 'Australia', label: 'Australia' },
  { value: 'Austria', label: 'Austria' },
  { value: 'Azerbaijan', label: 'Azerbaijan' },
  { value: 'Bahamas', label: 'Bahamas' },
  { value: 'Bahrain', label: 'Bahrain' },
  { value: 'Bangladesh', label: 'Bangladesh' },
  { value: 'Barbados', label: 'Barbados' },
  { value: 'Belarus', label: 'Belarus' },
  { value: 'Belgium', label: 'Belgium' },
  { value: 'Belize', label: 'Belize' },
  { value: 'Benin', label: 'Benin' },
  { value: 'Bhutan', label: 'Bhutan' },
  { value: 'Bolivia', label: 'Bolivia' },
  { value: 'Bosnia and Herzegovina', label: 'Bosnia and Herzegovina' },
  { value: 'Botswana', label: 'Botswana' },
  { value: 'Brazil', label: 'Brazil' },
  { value: 'Brunei', label: 'Brunei' },
  { value: 'Bulgaria', label: 'Bulgaria' },
  { value: 'Burkina Faso', label: 'Burkina Faso' },
  { value: 'Burundi', label: 'Burundi' },
  { value: 'Cabo Verde', label: 'Cabo Verde' },
  { value: 'Cambodia', label: 'Cambodia' },
  { value: 'Cameroon', label: 'Cameroon' },
  { value: 'Canada', label: 'Canada' },
  { value: 'Central African Republic', label: 'Central African Republic' },
  { value: 'Chad', label: 'Chad' },
  { value: 'Chile', label: 'Chile' },
  { value: 'China', label: 'China' },
  { value: 'Colombia', label: 'Colombia' },
  { value: 'Comoros', label: 'Comoros' },
  { value: 'Congo (Congo-Brazzaville)', label: 'Congo (Congo-Brazzaville)' },
  { value: 'Costa Rica', label: 'Costa Rica' },
  { value: 'Croatia', label: 'Croatia' },
  { value: 'Cuba', label: 'Cuba' },
  { value: 'Cyprus', label: 'Cyprus' },
  { value: 'Czech Republic', label: 'Czech Republic' },
  { value: 'Democratic Republic of the Congo', label: 'Democratic Republic of the Congo' },
  { value: 'Denmark', label: 'Denmark' },
  { value: 'Djibouti', label: 'Djibouti' },
  { value: 'Dominica', label: 'Dominica' },
  { value: 'Dominican Republic', label: 'Dominican Republic' },
  { value: 'Ecuador', label: 'Ecuador' },
  { value: 'Egypt', label: 'Egypt' },
  { value: 'El Salvador', label: 'El Salvador' },
  { value: 'Equatorial Guinea', label: 'Equatorial Guinea' },
  { value: 'Eritrea', label: 'Eritrea' },
  { value: 'Estonia', label: 'Estonia' },
  { value: 'Eswatini', label: 'Eswatini' },
  { value: 'Ethiopia', label: 'Ethiopia' },
  { value: 'Fiji', label: 'Fiji' },
  { value: 'Finland', label: 'Finland' },
  { value: 'France', label: 'France' },
  { value: 'Gabon', label: 'Gabon' },
  { value: 'Gambia', label: 'Gambia' },
  { value: 'Georgia', label: 'Georgia' },
  { value: 'Germany', label: 'Germany' },
  { value: 'Ghana', label: 'Ghana' },
  { value: 'Greece', label: 'Greece' },
  { value: 'Grenada', label: 'Grenada' },
  { value: 'Guatemala', label: 'Guatemala' },
  { value: 'Guinea', label: 'Guinea' },
  { value: 'Guinea-Bissau', label: 'Guinea-Bissau' },
  { value: 'Guyana', label: 'Guyana' },
  { value: 'Haiti', label: 'Haiti' },
  { value: 'Honduras', label: 'Honduras' },
  { value: 'Hungary', label: 'Hungary' },
  { value: 'Iceland', label: 'Iceland' },
  { value: 'India', label: 'India' },
  { value: 'Indonesia', label: 'Indonesia' },
  { value: 'Iran', label: 'Iran' },
  { value: 'Iraq', label: 'Iraq' },
  { value: 'Ireland', label: 'Ireland' },
  { value: 'Israel', label: 'Israel' },
  { value: 'Italy', label: 'Italy' },
  { value: 'Ivory Coast', label: 'Ivory Coast' },
  { value: 'Jamaica', label: 'Jamaica' },
  { value: 'Japan', label: 'Japan' },
  { value: 'Jordan', label: 'Jordan' },
  { value: 'Kazakhstan', label: 'Kazakhstan' },
  { value: 'Kenya', label: 'Kenya' },
  { value: 'Kiribati', label: 'Kiribati' },
  { value: 'Kuwait', label: 'Kuwait' },
  { value: 'Kyrgyzstan', label: 'Kyrgyzstan' },
  { value: 'Laos', label: 'Laos' },
  { value: 'Latvia', label: 'Latvia' },
  { value: 'Lebanon', label: 'Lebanon' },
  { value: 'Lesotho', label: 'Lesotho' },
  { value: 'Liberia', label: 'Liberia' },
  { value: 'Libya', label: 'Libya' },
  { value: 'Liechtenstein', label: 'Liechtenstein' },
  { value: 'Lithuania', label: 'Lithuania' },
  { value: 'Luxembourg', label: 'Luxembourg' },
  { value: 'Madagascar', label: 'Madagascar' },
  { value: 'Malawi', label: 'Malawi' },
  { value: 'Malaysia', label: 'Malaysia' },
  { value: 'Maldives', label: 'Maldives' },
  { value: 'Mali', label: 'Mali' },
  { value: 'Malta', label: 'Malta' },
  { value: 'Marshall Islands', label: 'Marshall Islands' },
  { value: 'Mauritania', label: 'Mauritania' },
  { value: 'Mauritius', label: 'Mauritius' },
  { value: 'Mexico', label: 'Mexico' },
  { value: 'Micronesia', label: 'Micronesia' },
  { value: 'Moldova', label: 'Moldova' },
  { value: 'Monaco', label: 'Monaco' },
  { value: 'Mongolia', label: 'Mongolia' },
  { value: 'Montenegro', label: 'Montenegro' },
  { value: 'Morocco', label: 'Morocco' },
  { value: 'Mozambique', label: 'Mozambique' },
  { value: 'Myanmar', label: 'Myanmar' },
  { value: 'Namibia', label: 'Namibia' },
  { value: 'Nauru', label: 'Nauru' },
  { value: 'Nepal', label: 'Nepal' },
  { value: 'Netherlands', label: 'Netherlands' },
  { value: 'New Zealand', label: 'New Zealand' },
  { value: 'Nicaragua', label: 'Nicaragua' },
  { value: 'Niger', label: 'Niger' },
  { value: 'Nigeria', label: 'Nigeria' },
  { value: 'North Korea', label: 'North Korea' },
  { value: 'North Macedonia', label: 'North Macedonia' },
  { value: 'Norway', label: 'Norway' },
  { value: 'Oman', label: 'Oman' },
  { value: 'Pakistan', label: 'Pakistan' },
  { value: 'Palau', label: 'Palau' },
  { value: 'Palestine', label: 'Palestine' },
  { value: 'Panama', label: 'Panama' },
  { value: 'Papua New Guinea', label: 'Papua New Guinea' },
  { value: 'Paraguay', label: 'Paraguay' },
  { value: 'Peru', label: 'Peru' },
  { value: 'Philippines', label: 'Philippines' },
  { value: 'Poland', label: 'Poland' },
  { value: 'Portugal', label: 'Portugal' },
  { value: 'Qatar', label: 'Qatar' },
  { value: 'Romania', label: 'Romania' },
  { value: 'Russia', label: 'Russia' },
  { value: 'Rwanda', label: 'Rwanda' },
  { value: 'Saint Kitts and Nevis', label: 'Saint Kitts and Nevis' },
  { value: 'Saint Lucia', label: 'Saint Lucia' },
  { value: 'Saint Vincent and the Grenadines', label: 'Saint Vincent and the Grenadines' },
  { value: 'Samoa', label: 'Samoa' },
  { value: 'San Marino', label: 'San Marino' },
  { value: 'Sao Tome and Principe', label: 'Sao Tome and Principe' },
  { value: 'Saudi Arabia', label: 'Saudi Arabia' },
  { value: 'Senegal', label: 'Senegal' },
  { value: 'Serbia', label: 'Serbia' },
  { value: 'Seychelles', label: 'Seychelles' },
  { value: 'Sierra Leone', label: 'Sierra Leone' },
  { value: 'Singapore', label: 'Singapore' },
  { value: 'Slovakia', label: 'Slovakia' },
  { value: 'Slovenia', label: 'Slovenia' },
  { value: 'Solomon Islands', label: 'Solomon Islands' },
  { value: 'Somalia', label: 'Somalia' },
  { value: 'South Africa', label: 'South Africa' },
  { value: 'South Korea', label: 'South Korea' },
  { value: 'South Sudan', label: 'South Sudan' },
  { value: 'Spain', label: 'Spain' },
  { value: 'Sri Lanka', label: 'Sri Lanka' },
  { value: 'Sudan', label: 'Sudan' },
  { value: 'Suriname', label: 'Suriname' },
  { value: 'Sweden', label: 'Sweden' },
  { value: 'Switzerland', label: 'Switzerland' },
  { value: 'Syria', label: 'Syria' },
  { value: 'Taiwan', label: 'Taiwan' },
  { value: 'Tajikistan', label: 'Tajikistan' },
  { value: 'Tanzania', label: 'Tanzania' },
  { value: 'Thailand', label: 'Thailand' },
  { value: 'Timor-Leste', label: 'Timor-Leste' },
  { value: 'Togo', label: 'Togo' },
  { value: 'Tonga', label: 'Tonga' },
  { value: 'Trinidad and Tobago', label: 'Trinidad and Tobago' },
  { value: 'Tunisia', label: 'Tunisia' },
  { value: 'Turkey', label: 'Turkey' },
  { value: 'Turkmenistan', label: 'Turkmenistan' },
  { value: 'Tuvalu', label: 'Tuvalu' },
  { value: 'Uganda', label: 'Uganda' },
  { value: 'Ukraine', label: 'Ukraine' },
  { value: 'United Arab Emirates', label: 'United Arab Emirates' },
  { value: 'United Kingdom', label: 'United Kingdom' },
  { value: 'United States', label: 'United States' },
  { value: 'Uruguay', label: 'Uruguay' },
  { value: 'Uzbekistan', label: 'Uzbekistan' },
  { value: 'Vanuatu', label: 'Vanuatu' },
  { value: 'Vatican City', label: 'Vatican City' },
  { value: 'Venezuela', label: 'Venezuela' },
  { value: 'Vietnam', label: 'Vietnam' },
  { value: 'Yemen', label: 'Yemen' },
  { value: 'Zambia', label: 'Zambia' },
  { value: 'Zimbabwe', label: 'Zimbabwe' },
  { value: 'other', label: 'other' }
];


const selectStyles = {
  control: (base, state) => ({
    ...base,
    minHeight: "56px",
    padding: "0 8px",
    borderRadius: "12px",
    border: state.isFocused ? "2px solid #FB0A8B" : "2px solid #e5e7eb",
    backgroundColor: "#ffffff",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(251, 10, 139, 0.1)" : "none",
    fontSize: "16px",
    fontFamily: "Lexend', sans-serif",
    cursor: "pointer",
    transition: "all 0.2s ease",
    "&:hover": {
      borderColor: "#FB0A8B",
      boxShadow: "0 0 0 3px rgba(251, 10, 139, 0.05)"
    },
  }),
  placeholder: (base) => ({
    ...base,
    color: "#9ca3af",
    fontWeight: 400,
    fontSize: "16px"
  }),
  singleValue: (base) => ({
    ...base,
    color: "#1f2937",
    fontWeight: 500,
    fontSize: "16px"
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "12px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
    border: "2px solid #e5e7eb",
    overflow: "hidden",
    zIndex: 9999
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: "200px",
    padding: "8px"
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#FB0A8B"
      : state.isFocused
        ? "rgba(251,10,139,0.1)"
        : "white",
    color: state.isSelected ? "white" : "#1f2937",
    fontSize: "15px",
    fontWeight: state.isSelected ? 600 : 400,
    padding: "12px 16px",
    cursor: "pointer",
    borderRadius: "8px",
    margin: "2px 0",
    transition: "all 0.15s ease"
  }),
  indicatorSeparator: () => ({ display: "none" }),
  dropdownIndicator: (base, state) => ({
    ...base,
    color: state.isFocused ? "#FB0A8B" : "#6b7280",
    transition: "all 0.2s ease",
    "&:hover": { color: "#FB0A8B" }
  }),
};

// ============================================================
// SIGNUP FORM COMPONENT
// ============================================================
const SignupForm = ({ 
  onClose, 
  onAuthChange, 
  onOpenAccount, 
  onOpenSignIn,
  isAuthenticated: parentIsAuthenticated  // NEW: Receive auth state from parent
}) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    country: null,
    wallet: "",
    agreed: false,
  });

  const [status, setStatus] = useState({ loading: false, message: "" });
  const [userData, setUserData] = useState(null);
  const [redirectingToDApp, setRedirectingToDApp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ============================================================
  // REFS TO PREVENT RACE CONDITIONS
  // ============================================================
  
  // Tracks if this component instance performed a signup
  const didSignupRef = useRef(false);
  
  // Tracks if component is still mounted (prevents state updates after unmount)
  const isMountedRef = useRef(true);
  
  // Tracks if we've already shown the welcome back screen (prevents re-triggering)
  const hasShownWelcomeBackRef = useRef(false);

  // ============================================================
  // MOUNT/UNMOUNT TRACKING
  // ============================================================
  useEffect(() => {
    isMountedRef.current = true;
    
    // Reset refs on fresh mount
    didSignupRef.current = false;
    hasShownWelcomeBackRef.current = false;
    
    console.log("🟢 Signup component MOUNTED");
    
    return () => {
      isMountedRef.current = false;
      console.log("🔴 Signup component UNMOUNTING");
    };
  }, []);

  // ============================================================
  // SESSION CHECK - WITH ALL GUARDS
  // ============================================================
  useEffect(() => {
    // GUARD 1: Don't run if we're in the middle of submitting
    if (isSubmitting) {
      console.log("🚫 Session check BLOCKED - isSubmitting is true");
      return;
    }
    
    // GUARD 2: Don't run if we just completed a signup
    if (didSignupRef.current) {
      console.log("🚫 Session check BLOCKED - didSignupRef is true");
      return;
    }
    
    // GUARD 3: Don't run if parent already knows user is authenticated
    // This is the KEY fix - parent (Navbar) knows auth state, trust it!
    if (parentIsAuthenticated) {
      console.log("🚫 Session check BLOCKED - parentIsAuthenticated is true");
      return;
    }

    const checkExistingSession = async () => {
      // GUARD 4: Double-check all conditions inside async function
      if (!isMountedRef.current) {
        console.log("🚫 Session check ABORTED - component unmounted");
        return;
      }
      
      if (didSignupRef.current || isSubmitting || parentIsAuthenticated) {
        console.log("🚫 Session check ABORTED - guards triggered inside async");
        return;
      }

      try {
        const { data: { session } } = await supabase.auth.getSession();

        // GUARD 5: Check all conditions AGAIN after await (async gap!)
        if (!isMountedRef.current || didSignupRef.current || isSubmitting || parentIsAuthenticated) {
          console.log("🚫 Session check ABORTED - guards triggered after getSession");
          return;
        }

        if (session?.user) {
          console.log("📍 Session found, checking profile...");
          
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          // GUARD 6: Final check before setting state
          if (!isMountedRef.current || didSignupRef.current || isSubmitting || parentIsAuthenticated) {
            console.log("🚫 Session check ABORTED - guards triggered after profile fetch");
            return;
          }

          if (profile && !hasShownWelcomeBackRef.current) {
            console.log("👋 Setting userData for Welcome Back screen");
            hasShownWelcomeBackRef.current = true;
            
            const sessionData = {
              id: session.user.id,
              fullName: profile.full_name,
              email: profile.email,
              wallet: profile.wallet,
              country: profile.country,
              tier: profile.tier,
              isWhitelisted: profile.is_whitelisted,
              registeredAt: profile.registered_at,
            };
            
            setUserData(sessionData);
            if (onAuthChange) onAuthChange(true, sessionData, false); // false = not new signup
          }
        }
      } catch (error) {
        console.error("Session check error:", error);
      }
    };

    checkExistingSession();
  }, [onAuthChange, parentIsAuthenticated]); // Removed isSubmitting - it shouldn't trigger re-checks

  // ============================================================
  // HELPER FUNCTIONS
  // ============================================================
  
  const isEmailRegistered = async (email) => {
    const { data } = await supabase
      .from('profiles')
      .select('email')
      .eq('email', email.toLowerCase())
      .single();

    return !!data;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // ============================================================
  // SIGN OUT HANDLER
  // ============================================================
  const handleSignOut = async () => {
    console.log("🔴 Sign Out clicked in Signup.jsx");

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Supabase sign out error:", error);
        return;
      }

      console.log("✅ Supabase sign out successful");

      // Reset all refs
      didSignupRef.current = false;
      hasShownWelcomeBackRef.current = false;
      
      setUserData(null);
      setIsSubmitting(false);

      if (onAuthChange) {
        onAuthChange(false, null, false);
      }

      window.dispatchEvent(new CustomEvent("sessionChange"));

      if (onClose) {
        onClose();
      }

      console.log("✅ Sign out complete, modal closed");

    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  // ============================================================
  // NAVIGATION HANDLERS
  // ============================================================
  const handleSignInClick = (e) => {
    e.preventDefault();
    if (onClose) onClose();
    setTimeout(() => {
      if (onOpenSignIn) onOpenSignIn();
    }, 100);
  };

  // ============================================================
  // FORM SUBMIT HANDLER
  // ============================================================
  const handleSubmit = async (e) => {
  e.preventDefault();
  
  console.log("🚀 Form submit started");
  
  // Set loading state ONLY - don't set didSignupRef yet
  setIsSubmitting(true);
  setStatus({ loading: true, message: "" });

  // ========== VALIDATION (didSignupRef stays false during this) ==========
  if (!formData.firstName.trim()) {
    setStatus({ loading: false, message: "❌ Please enter your first name" });
    setIsSubmitting(false);
    return;
  }
  if (!formData.lastName.trim()) {
    setStatus({ loading: false, message: "❌ Please enter your last name" });
    setIsSubmitting(false);
    return;
  }
  if (!formData.email.trim() || !formData.email.includes("@")) {
    setStatus({ loading: false, message: "❌ Please enter a valid email" });
    setIsSubmitting(false);
    return;
  }
  if (!formData.password || formData.password.length < 6) {
    setStatus({ loading: false, message: "❌ Password must be at least 6 characters" });
    setIsSubmitting(false);
    return;
  }

  const emailExists = await isEmailRegistered(formData.email);
  if (emailExists) {
    setStatus({ loading: false, message: "❌ Email already registered. Please sign in." });
    setIsSubmitting(false);
    return;
  }

  if (!formData.country) {
    setStatus({ loading: false, message: "❌ Please select your country" });
    setIsSubmitting(false);
    return;
  }
  if (!formData.wallet.trim()) {
    setStatus({ loading: false, message: "❌ Please enter wallet address" });
    setIsSubmitting(false);
    return;
  }
  if (!formData.agreed) {
    setStatus({ loading: false, message: "❌ Please accept Terms & Privacy" });
    setIsSubmitting(false);
    return;
  }

  // ========== VALIDATION PASSED - NOW set didSignupRef ==========
  // This is the ONLY place we set this to true
  didSignupRef.current = true;
  console.log("✅ Validation passed, starting signup process...");

  // ========== SIGNUP PROCESS ==========
  try {
    const fullName = `${formData.firstName} ${formData.lastName}`;
    
    console.log("📝 Creating Supabase auth user...");

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email.toLowerCase(),
      password: formData.password,
      options: {
        data: {
          full_name: fullName,
          wallet: formData.wallet,
          country: formData.country.value,
        }
      }
    });

    if (authError) {
      console.error("Supabase Auth Error:", authError);
      setStatus({ loading: false, message: `❌ ${authError.message}` });
      setIsSubmitting(false);
      didSignupRef.current = false;
      return;
    }

    if (!authData.user) {
      setStatus({ loading: false, message: "❌ Failed to create account. Please try again." });
      setIsSubmitting(false);
      didSignupRef.current = false;
      return;
    }

    console.log("✅ Auth user created, creating profile...");

    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: authData.user.id,
        email: formData.email.toLowerCase(),
        full_name: fullName,
        wallet: formData.wallet,
        country: formData.country.value,
        tier: 'STANDARD',
        is_whitelisted: false,
        registered_at: new Date().toISOString(),
      });

    if (profileError) {
      console.error("Profile creation error:", profileError);
    }

    const sessionData = {
      id: authData.user.id,
      fullName: fullName,
      email: formData.email.toLowerCase(),
      wallet: formData.wallet,
      country: formData.country.value,
      tier: 'STANDARD',
      isWhitelisted: false,
      registeredAt: new Date().toISOString(),
    };

    // Send emails in background (don't await)
    sendSignupEmails({
      fullName: fullName,
      email: formData.email,
      country: formData.country.value,
      wallet: formData.wallet,
    }).catch(err => console.error("Email sending error:", err));

    console.log("🎉 Signup.jsx: Notifying App.jsx of new signup");
    if (onAuthChange) onAuthChange(true, sessionData, true);
    window.dispatchEvent(new CustomEvent("sessionChange"));

    const redirectIntent = localStorage.getItem("ptdt_redirect_after_auth");

    if (redirectIntent === "dapp") {
      console.log("🚀 Redirecting to DApp...");
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
      console.log("🎉 Signup complete - closing form, App.jsx shows Welcome Modal");
      
      // Close immediately - no delay needed
      if (onClose) onClose();
    }

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      country: null,
      wallet: "",
      agreed: false
    });
    setStatus({ loading: false, message: "" });

  } catch (error) {
    console.error("Signup error:", error);
    setStatus({ loading: false, message: "⚠️ Failed. Try again or email token@ptdt.taxi" });
    setIsSubmitting(false);
    didSignupRef.current = false;
  }
};

  // ============================================================
  // RENDER: REDIRECTING TO DAPP
  // ============================================================
  if (redirectingToDApp) {
    return (
      <div className="signup-overlay" onClick={(e) => e.stopPropagation()}>
        <div className="signup-card" onClick={(e) => e.stopPropagation()}>
          <div className="success-icon">
            <svg className="success-checkmark" viewBox="0 0 52 52">
              <circle className="success-checkmark-circle" cx="26" cy="26" r="25" fill="none" />
              <path className="success-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
            </svg>
          </div>
          <h2 className="success-title">Registration Successful!</h2>
          <p className="success-message">Your account has been created successfully</p>
          <div className="success-details">
            <div className="success-detail-item">
              <span className="success-icon-emoji">🎉</span>
              <span>Welcome to the PTDT community!</span>
            </div>
            <div className="success-detail-item">
              <span className="success-icon-emoji">📧</span>
              <span>Confirmation email sent to <strong>{userData?.email || formData.email}</strong></span>
            </div>
            <div className="success-detail-item redirect-item">
              <span className="success-icon-emoji">🚀</span>
              <span className="signup-redirect-message">Redirecting to DApp...</span>
            </div>
          </div>
          <div className="signup-loader"></div>
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER: WELCOME BACK (EXISTING USER)
  // Only show if:
  // 1. We have userData (from session check)
  // 2. We did NOT just sign up (didSignupRef is false)
  // 3. We're not submitting
  // 4. Parent doesn't already know we're authenticated
  // ============================================================
  const shouldShowWelcomeBack = userData && 
                                 !didSignupRef.current && 
                                 !isSubmitting && 
                                 !parentIsAuthenticated;

  if (shouldShowWelcomeBack) {
    console.log("👋 Rendering Welcome Back screen");
    return (
      <div className="signup-overlay" onClick={onClose}>
        <div className="signup-card" onClick={(e) => e.stopPropagation()}>
          <button className="signup-close-btn" onClick={onClose}>✕</button>
          <img src="/ptdtlogo.png" alt="PTDT" className="signup-logo" />
          <h2 className="signup-heading">Welcome Back!</h2>
          <p className="signup-subtitle">You're already registered for the PTDT Token Sale</p>
          <button
            className="signup-btn signup-btn-primary"
            onClick={() => {
              onClose();
              setTimeout(() => {
                if (onOpenAccount) onOpenAccount();
              }, 150);
            }}
          >
            <span>MY ACCOUNT</span>
            <span className="btn-icon">✓</span>
          </button>
          <button
            type="button"
            className="signup-btn signup-btn-outline"
            onClick={handleSignOut}
          >
            <span>SIGN OUT</span>
          </button>
        </div>
      </div>
    );
  }

  // ============================================================
  // RENDER: MAIN SIGNUP FORM
  // ============================================================
  return (
    <div className="signup-overlay" onClick={onClose}>
      <div className="signup-card" onClick={(e) => e.stopPropagation()}>
        <button className="signup-close-btn" onClick={onClose}>✕</button>

        <div className="signup-header">
          <img src="/ptdtlogo.png" alt="PTDT" className="signup-logo" />
          <h2 className="signup-heading">Join – Peether PTDT</h2>
          <p className="signup-subtitle">
            Sign up now for early access to exclusive token sale benefits
          </p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="signup-input-group">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              disabled={status.loading}
              className="signup-input"
              autoComplete="given-name"
            />
          </div>

          <div className="signup-input-group">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              disabled={status.loading}
              className="signup-input"
              autoComplete="family-name"
            />
          </div>

          <div className="signup-input-group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              disabled={status.loading}
              className="signup-input"
              autoComplete="email"
            />
          </div>

          <div className="signup-input-group password-input-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              disabled={status.loading}
              className="signup-input"
              autoComplete="new-password"
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

          <div className="signup-input-group">
            <Select
              options={countryOptions}
              value={formData.country}
              onChange={(opt) => setFormData({ ...formData, country: opt })}
              placeholder="Select your country"
              isSearchable={true}
              isDisabled={status.loading}
              styles={selectStyles}
              className="signup-select"
            />
          </div>

          <div className="signup-input-group">
            <input
              type="text"
              name="wallet"
              placeholder="Wallet Address (0x...)"
              value={formData.wallet}
              onChange={handleChange}
              disabled={status.loading}
              className="signup-input signup-input-mono"
              autoComplete="off"
            />
          </div>

          <div className="signup-checkbox-wrapper">
            <label className="signup-checkbox-label">
              <input
                type="checkbox"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                disabled={status.loading}
                className="signup-checkbox-input"
              />
              <span className="signup-checkbox-custom"></span>
              <span className="signup-checkbox-text">
                I agree to the{" "}
                <a href="/terms.html" target="_blank" rel="noopener noreferrer" className="signup-link">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy.html" target="_blank" rel="noopener noreferrer" className="signup-link">
                  Privacy Policy
                </a>
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="signup-btn signup-btn-submit"
            disabled={status.loading}
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {status.loading ? (
              <span className="relative flex items-center gap-2">
                <span className="signup-btn-spinner"></span>
                <span>CREATING ACCOUNT...</span>
              </span>
            ) : (
              <span className="relative flex items-center gap-3">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                <span>CREATE ACCOUNT</span>
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
          <div className="signup-status">
            {status.message}
          </div>
        )}

        <div className="signup-footer">
          <p className="signup-footer-text">
            Already have an account?{" "}
            <a href="#signin" onClick={handleSignInClick} className="signup-footer-link">
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;