import { useState, useEffect, useCallback, useRef } from "react";
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from './wagmiConfig';
import CookieConsent from './components/CookieConsent/CookieConsent';
import Navbar from "./assets/Navbar";
import Background from "./components/Background";
import VideoSplash from "./components/VideoSplash";
import Hero from "./components/Hero";
import HeroSeparator from "./components/HeroSeparator";
import PageSeparator from "./components/PageSeparator";
import About from "./components/About";
import LiveDashboard from "./components/LiveDashboard";
import Tokenomics from "./components/Tokenomics";
import StakingOverview from "./components/StakingOverview";
import Roadmap from "./components/Roadmap";
import SmartContracts from "./components/SmartContracts";
import Legacy from "./components/Legacy";
import Gallery from "./components/Gallery";
import EcosystemHub from "./components/EcosystemHub";
import Participate from "./components/Participate";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";
import SectionNavigator from "./components/SectionNavigator";
import FloatingAddToMetaMaskCTA from "./components/FloatingAddToMetaMaskCTA";

import WelcomeNewUserModal from "./components/WelcomeNewUserModal";
import ResetPassword from "./pages/ResetPassword";
import { supabase, subscribeToAuthSync, broadcastSignIn, broadcastSignOut } from 
"./lib/supabase";
import "./App.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const POPUP_CONFIG = {
  FIRST_SHOW_DELAY: 30000,
  REPEAT_INTERVAL: 180000,
  MAX_SHOWS_PER_SESSION: 3,
  STORAGE_KEY: 'ptdt_popup_data'
};

function AppContent() {
  const [showSignup, setShowSignup] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  
  // Auth state - single source of truth
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Popup state 
  const [showSignUpPopUp, setShowSignUpPopUp] = useState(false); 
  const [popUpShowCount, setPopUpShowCount] = useState(0);

  // Welcome Modal state 
  const [showWelcomeModal, setShowWelcomeModal] = useState(false); 
  const [welcomeUserData, setWelcomeUserData] = useState(null);

  // 🔒 Reset Password Modal state 
  const [showResetPassword, setShowResetPassword] = useState(false);

  // Flag to prevent race condition 
  const isInitialized = useRef(false); 
  const initialCheckDone = useRef(false);

  // Build user data from session (FAST - uses session metadata) 
  const buildUserDataFast = useCallback((session) => { 
    if (!session?.user) return null; 
    return { 
      id: session.user.id, 
      fullName: session.user.user_metadata?.full_name || 'User', 
      email: session.user.email, 
      wallet: session.user.user_metadata?.wallet || "", 
      country: session.user.user_metadata?.country || "", 
      tier: 'STANDARD', 
      isWhitelisted: false, 
      registeredAt: session.user.created_at, 
    }; 
  }, []);

  // Build user data with DB query (background update) 
  const buildUserDataFromDB = useCallback(async (session) => { 
    if (!session?.user) return null; 
    try { 
      const { data: profile, error } = await supabase 
      .from('profiles') 
      .select("*") 
      .eq('id', session.user.id) 
      .maybeSingle(); 
      if (error && error.code !== 'PGRST116') { 
        console.error('Profile fetch error:', error.message); 
        return null; 
      } 
      if (profile) { 
        return { 
          id: session.user.id, 
          fullName: profile.full_name || session.user.user_metadata?.full_name || 'User', 
          email: session.user.email, 
          wallet: profile.wallet || session.user.user_metadata?.wallet || "", 
          country: profile.country || session.user.user_metadata?.country || "", 
          tier: profile.tier || 'STANDARD', 
          isWhitelisted: profile.is_whitelisted || false, 
          registeredAt: profile.registered_at || session.user.created_at, 
        }; 
      } 
      return null; 
    } catch (err) { 
      console.error('DB query error:', err); 
      return null; 
    } 
  }, []);

  // 🔒 Check for password reset URL on mount 
  useEffect(() => { 
    const checkForPasswordReset = () => { 
      // Check for early detection flag from main.jsx 
      if (window.__PTDT_PASSWORD_RECOVERY__) { 
        console.log(' [App.jsx] Recovery flag detected from main.jsx!'); 
        return true; 
      } 
      const hash = window.location.hash || ""; 
      const search = window.location.search || ""; 
      const pathname = window.location.pathname || ""; 
      console.log(' [App.jsx] Checking for password reset:', { hash: hash.substring(0, 100), search, pathname }); 
      // Check hash params 
      if (hash.includes('type=recovery') || hash.includes('type=password_recovery')) { 
        console.log(' [App.jsx] Password recovery detected in hash!'); 
        return true; 
      } 
      // Check query params 
      if (search.includes('type=recovery') || search.includes('type=password_recovery')) { 
        console.log(' [App.jsx] Password recovery detected in search!'); 
        return true; 
      } 
      // Check pathname with tokens 
      if (pathname.includes('reset-password') || pathname.includes('recovery')) { 
        if (hash.includes('access_token') || search.includes('access_token')) { 
          console.log(' [App.jsx] Password recovery detected in pathname!'); 
          return true; 
        } 
      } 
      return false; 
    };

    const isRecovery = checkForPasswordReset(); 
    if (isRecovery) { 
      console.log(' [App.jsx] Showing reset password modal!'); 
      setShowResetPassword(true); 
    } 
    // Listen for custom event 
    const handleRecoveryReady = () => { 
      console.log(' [App.jsx] Received passwordRecoveryReady event'); 
      setShowResetPassword(true); 
    }; 
    window.addEventListener('passwordRecoveryReady', handleRecoveryReady); 
    return () => { 
      window.removeEventListener('passwordRecoveryReady', handleRecoveryReady); 
    }; 
  }, []);

  // ======== INSTANT SESSION CHECK ON MOUNT (RUNS ONCE) ======= 
  useEffect(() => { 
    if (initialCheckDone.current) return; 
    let isMounted = true; 
    initialCheckDone.current = true; 
    const initializeAuth = async () => { 
      try { 
        // FIRST: Check if this is a recovery URL BEFORE checking session 
        const hash = window.location.hash; 
        const search = window.location.search; 
        const pathname = window.location.pathname; 
        const isRecoveryUrl = hash.includes('type=recovery') || search.includes('type=recovery') || (pathname === '/reset-password' && (hash.includes('access_token') || search.includes('access_token'))); 
        if (isRecoveryUrl) { 
          console.log('Recovery URL detected in initializeAuth - showing reset modal'); 
          setShowResetPassword(true); 
          setIsLoading(false); 
          isInitialized.current = true; 
          return; // Don't proceed with normal auth flow 
        } 
        const { data: { session } } = await supabase.auth.getSession(); 
        if (session?.user && isMounted) { 
          // Use FAST session data immediately 
          const quickUserData = buildUserDataFast(session); 
          setUser(quickUserData); 
          setIsAuthenticated(true); 
          setIsLoading(false); 
          isInitialized.current = true; 
          // Fetch full profile in background 
          buildUserDataFromDB(session).then(fullUserData => { 
            if (isMounted && fullUserData) { 
              setUser(fullUserData); 
            } 
          }); 
        } else if (isMounted) { 
          setIsLoading(false); 
          isInitialized.current = true; 
        } 
      } catch (err) { 
        console.error('Session check error:', err); 
        if (isMounted) { 
          setIsLoading(false); 
          isInitialized.current = true; 
        } 
      } 
    }; 
    initializeAuth(); 
    return () => { 
      isMounted = false; 
    } 
  }, [buildUserDataFast, buildUserDataFromDB]);

  // ======== CROSS-TAB SESSION SYNC ======== 
  useEffect(() => { 
    if (typeof window === 'undefined') return; 
    console.log(' [App.jsx] Setting up cross-tab sync listener...'); 
    const unsubscribe = subscribeToAuthSync(async (event) => { 
      console.log(' [App.jsx] Cross-tab event received:', event.type); 
      // Skip if this is a password recovery session 
      if (showResetPassword || window.__PTDT_PASSWORD_RECOVERY__) { 
        console.log(' [App.jsx] Skipping sync during password recovery'); 
        return; 
      } 
      if (event.type === 'SIGNED_IN' || event.type === 'SESSION_REFRESHED') { 
        // Another tab signed in - refresh our session 
        try { 
          const { data: { session } } = await supabase.auth.getSession(); 
          if (session?.user) { 
            console.log(' [App.jsx] Syncing sign-in from other tab:', session.user.email); 
            const quickUserData = buildUserDataFast(session); 
            setUser(quickUserData); 
            setIsAuthenticated(true); 
            setIsLoading(false); 
            // Background fetch full profile 
            buildUserDataFromDB(session).then(fullUserData => { 
              if (fullUserData) { 
                setUser(fullUserData); 
              } 
            }); 
          } 
        } catch (err) { 
          console.error(' [App.jsx] Sync sign-in error:', err); 
        } 
      } 
      if (event.type === 'SIGNED_OUT') { 
        // Another tab signed out - sign out here too 
        console.log(' [App.jsx] Syncing sign-out from other tab'); 
        setUser(null); 
        setIsAuthenticated(false); 
        setIsLoading(false); 
      } 
    }); 
    return () => { 
      console.log('[App.jsx] Cleaning up cross-tab sync listener'); 
      unsubscribe(); 
    }; 
  }, [showResetPassword, buildUserDataFast, buildUserDataFromDB]);

  // ======== AUTH STATE CHANGE LISTENER ======== 
  useEffect(() => { 
    let isMounted = true; 
    const handleAuthChange = async (event, session) => { 
      console.log('[Auth event:', event); 
      // 🔥 Handle PASSWORD_RECOVERY event 
      if (event === 'PASSWORD_RECOVERY') { 
        console.log('[PASSWORD_RECOVERY event detected!'); 
        if (isMounted) { 
          setShowResetPassword(true); 
        } 
        return; // Don't process as normal sign in 
      } 
      // IGNORE initial events until our fast check is done 
      if ((event === 'INITIAL_SESSION' || event === 'SIGNED_IN') && !isInitialized.current) { 
        return; 
      } 
      // Handle SIGNED_IN (user just signed in via form) 
      if (event === 'SIGNED_IN' && session?.user && isInitialized.current) { 
        // 🔥 Check if this is from a recovery link - don't treat as normal sign in 
        const hash = window.location.hash; 
        const search = window.location.search; 
        if (hash.includes('type=recovery') || search.includes('type=recovery')) { 
          console.log('[Recovery sign-in detected, showing reset modal instead'); 
          setShowResetPassword(true); 
          return; // Don't treat as normal sign in 
        } 
        const quickUserData = buildUserDataFast(session); 
        if (isMounted) { 
          setUser(quickUserData); 
          setIsAuthenticated(true); 
          setIsLoading(false); 
          // Broadcast to other tabs 
          broadcastSignIn(session.user.id, session.user.email); 
        } 
        // Fetch full profile in background 
        buildUserDataFromDB(session).then(fullUserData => { 
          if (isMounted && fullUserData) { 
            setUser(fullUserData); 
          } 
        }); 
        return; 
      } 
      // Handle sign out 
      if (event === 'SIGNED_OUT') { 
        if (isMounted) { 
          setUser(null); 
          setIsAuthenticated(false); 
          setIsLoading(false); 
          // Broadcast to other tabs 
          broadcastSignOut(); 
        } 
        return; 
      } 
      // Handle token refresh 
      if (event === 'TOKEN_REFRESHED' && session?.user) { 
        const quickUserData = buildUserDataFast(session); 
        if (isMounted && quickUserData) { 
          setUser(quickUserData); 
          setIsAuthenticated(true); 
        } 
        return; 
      } 
    }; 
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange); 
    return () => { 
      isMounted = false; 
      subscription.unsubscribe(); 
    }; 
  }, [buildUserDataFast, buildUserDataFromDB]);

  // Handle auth change from child components (SignIn/SignUp) 
  const handleAuthChange = useCallback((authenticated, userData, isNewSignUp = false) => { 
    console.log("App.jsx handleAuthChange called:", { authenticated, isNewSignUp, email: userData?.email }); 
    setIsAuthenticated(authenticated); 
    setUser(userData); 
    setIsLoading(false); 
    // Broadcast to other tabs when auth changes from child components 
    if (authenticated && userData) { 
      broadcastSignIn(userData.id, userData.email); 
    } 
    // Show welcome modal for new signups 
    if (isNewSignUp && authenticated && userData) { 
      console.log("App.jsx: New signup detected - showing Welcome Modal!"); 
      setWelcomeUserData(userData); 
      setShowWelcomeModal(true); 
      setShowSignup(false); // Close signup modal 
    } 
  }, []);

  // Handle sign out 
  const handleSignOut = useCallback(async () => { 
    try { 
      await supabase.auth.signOut(); 
      // Broadcast will happen in onAuthStateChange listener 
    } catch (err) { 
      console.error('Sign out error:', err); 
    } 
  }, []);

  // Handle Welcome Modal Close 
  const handleWelcomeModalClose = useCallback(() => { 
    console.log("App.jsx: Closing Welcome Modal!"); 
    setShowWelcomeModal(false); 
    setWelcomeUserData(null); 
  }, []);

  // Handle Reset Password Modal Close 
  const handleResetPasswordClose = useCallback(() => { 
    console.log("App.jsx: Closing Reset Password Modal"); 
    setShowResetPassword(false); 
    // Clean up URL 
    window.history.replaceState({}, document.title, ''); 
  }, []);

  // 🏠 Handle Reset Password Success 
  const handleResetPasswordSuccess = useCallback(() => { 
    console.log("🔒 App.jsx: Password reset successful!"); 
    setShowResetPassword(false); 
    // Clean up URL 
    window.history.replaceState({}, document.title, ""); 
    // Show sign in modal after a short delay 
    setTimeout(() => { 
      setShowSignIn(true); 
    }, 500); 
  }, []);

  // ======== POPUP TIMER LOGIC ======= 
  useEffect(() => { 
    if (isAuthenticated || isLoading) { 
      setShowSignUpPopUp(false); 
      return; 
    } 
    if (showSignup || showSignIn || showResetPassword) { 
      return; 
    } 
    const getPopUpData = () => { 
      try { 
        const stored = sessionStorage.getItem(POPUP_CONFIG.STORAGE_KEY); 
        if (stored) return JSON.parse(stored); 
      } catch (e) { 
        console.error('Error reading popup data:', e); 
      } 
      return { showCount: 0, lastShown: 0, dismissed: false }; 
    }; 
    const savePopUpData = (data) => { 
      try { 
        sessionStorage.setItem(POPUP_CONFIG.STORAGE_KEY, JSON.stringify(data)); 
      } catch (e) { 
        console.error('Error saving popup data:', e); 
      } 
    }; 
    const popupData = getPopUpData(); 
    if (popupData.showCount >= POPUP_CONFIG.MAX_SHOWS_PER_SESSION) return; 
    let delay; 
    if (popupData.showCount === 0) { 
      delay = POPUP_CONFIG.FIRST_SHOW_DELAY; 
    } else { 
      const timeSinceLastShow = Date.now() - popupData.lastShown; 
      const remainingTime = POPUP_CONFIG.REPEAT_INTERVAL - timeSinceLastShow; 
      delay = Math.max(remainingTime, 10000); 
    } 
    const timer = setTimeout(() => { 
      if (!isAuthenticated && !showSignup && !showSignIn && !showResetPassword) { 
        setShowSignUpPopUp(true); 
        const newData = { 
          showCount: popupData.showCount + 1, 
          lastShown: Date.now(), 
          dismissed: false 
        }; 
        savePopUpData(newData); 
        setPopUpShowCount(newData.showCount); 
      } 
    }, delay); 
    return () => clearTimeout(timer); 
  }, [isAuthenticated, isLoading, showSignup, showSignIn, showResetPassword, popUpShowCount]);

  // ======== HANDLE URL TOKEN ======== 
  useEffect(() => { 
    const handleEmailToken = async () => { 
      const urlParams = new URLSearchParams(window.location.search); 
      const accessToken = urlParams.get('access_token'); 
      const refreshToken = urlParams.get('refresh_token'); 
      const type = urlParams.get('type'); 
      // Handle recovery type - don't auto-login 
      if (type === 'recovery') { 
        console.log('Recovery token detected in URL - showing reset modal'); 
        setShowResetPassword(true); 
        return; // Don't process further 
      } 
      if (type === 'signup' && accessToken && refreshToken) { 
        try { 
          await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken, }); 
          window.history.replaceState({}, document.title, window.location.pathname); 
          setTimeout(() => { 
            document.getElementById('participate')?.scrollIntoView({ behavior: 'smooth' }); 
          }, 500); 
        } catch (error) { 
          console.error('Error setting session from URL:', error); 
        } 
      } 
      // Handle hash tokens (but not recovery) 
      if (window.location.hash.includes('access_token') && !window.location.hash.includes('type=recovery')) { 
        const hashParams = new URLSearchParams(window.location.hash.substring(1)); 
        const hashAccessToken = hashParams.get('access_token'); 
        const hashRefreshToken = hashParams.get('refresh_token'); 
        const hashType = hashParams.get('type'); 
        // 🔥 Check for recovery in hash 
        if (hashType === 'recovery') { 
          console.log('Recovery token detected in hash - showing reset modal'); 
          setShowResetPassword(true); 
          return; 
        } 
        if (hashAccessToken && hashRefreshToken) { 
          try { 
            await supabase.auth.setSession({ access_token: hashAccessToken, refresh_token: hashRefreshToken, }); 
            window.history.replaceState({}, document.title, window.location.pathname); 
          } catch (error) { 
            console.error('Error setting session from hash:', error); 
          } 
        } 
      } 
    }; 
    handleEmailToken(); 
  }, []);

  // Popup handlers 
  const handlePopupClose = () => { 
    setShowSignUpPopUp(false); 
    try { 
      const stored = sessionStorage.getItem(POPUP_CONFIG.STORAGE_KEY); 
      if (stored) { 
        const data = JSON.parse(stored); 
        data.dismissed = true; 
        sessionStorage.setItem(POPUP_CONFIG.STORAGE_KEY, JSON.stringify(data)); 
      } 
    } catch (e) { 
      console.error('Error updating popup data:', e); 
    } 
  };

  const handlePopupSignupClick = () => { 
    setShowSignUpPopUp(false); 
    setShowSignup(true); 
  };

  const handleOpenSignup = () => { 
    setShowSignup(true); 
  };

  return (
    <div className="relative min-h-screen text-white font-poppins">
      <Background />
      
      {/* Fullscreen Video Splash (first visit only) */}
      <VideoSplash />
      
      <Navbar 
        key={`navbar-${isAuthenticated}-${user?.email || 'guest'}`}
        showSignup={showSignup}
        setShowSignup={setShowSignup}
        showSignIn={showSignIn}
        setShowSignIn={setShowSignIn}
        isAuthenticated={isAuthenticated}
        user={user}
        isLoading={isLoading}
        onAuthChange={handleAuthChange}
        onSignOut={handleSignOut}
      />
      
      <SectionNavigator hideWhenModalOpen={showSignup || showSignIn || 
showResetPassword} />
      
      {/* Floating MetaMask CTA */}
      <FloatingAddToMetaMaskCTA hideWhenModalOpen={showSignup || showSignIn || showResetPassword || showWelcomeModal} />
      
      <Hero />
      <HeroSeparator />
      
      <About />
      <PageSeparator />
      
      <LiveDashboard />
      <PageSeparator />
      
      <EcosystemHub />
      <PageSeparator />
      
      <StakingOverview />
      <PageSeparator />
      
      <SmartContracts />
      <PageSeparator />
      
      <Tokenomics />
      <PageSeparator />
      
      <Roadmap />
      <PageSeparator />
      
      <Legacy />
      <PageSeparator />
      
      <Gallery />
      <PageSeparator />
      
      <Participate
        onSignUpClick={handleOpenSignup}
        isAuthenticated={isAuthenticated}
        user={user}
        isLoading={isLoading}
      />
      
      <PageSeparator />
      
      <FAQ />
      
      <Footer />
      
      {/* OLD: Signup Popup - REMOVED */}
      {/* {showSignUpPopUp && !isAuthenticated && (
        <SignUpPopup
          onClose={handlePopupClose}
          onSignUpClick={handlePopupSignupClick}
        />
      )} */}
      
      {/* Welcome Modal for First-Time Signups */}
      {showWelcomeModal && welcomeUserData && (
        <WelcomeNewUserModal
          isOpen={showWelcomeModal}
          onClose={handleWelcomeModalClose}
          userData={welcomeUserData}
          onOpenAccount={() => {
            setShowWelcomeModal(false);
            setWelcomeUserData(null);
            // Dispatch event to open Account Modal in Navbar
            window.dispatchEvent(new CustomEvent("openAccountModal"));
          }}
        />
      )}
      
      {/* 🔥 Reset Password Modal */}
      {showResetPassword && (
        <ResetPassword
          onClose={handleResetPasswordClose}
          onSuccess={handleResetPasswordSuccess}
        />
      )}
      
      {/* 🍪 Cookie Consent Banner */}
      <CookieConsent />
    </div>
  );
}

export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </WagmiProvider>
  );
}