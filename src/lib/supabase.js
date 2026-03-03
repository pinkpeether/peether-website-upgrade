import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file.'
  );
}

// Check if we're in browser (not SSR)
const isBrowser = typeof window !== 'undefined';

// 🔐 Check if this is a password recovery URL BEFORE creating client
let isPasswordRecovery = false;

if (isBrowser) {
  const hash = window.location.hash || '';
  const search = window.location.search || '';
  const pathname = window.location.pathname || '';
  
  isPasswordRecovery = 
    hash.includes('type=recovery') ||
    search.includes('type=recovery') ||
    pathname === '/reset-password' ||
    pathname.includes('reset-password');
  
  // 🔐 Set global flag for App.jsx to detect
  if (isPasswordRecovery) {
    window.__PTDT_PASSWORD_RECOVERY__ = true;
  }
  
  // Log for debugging
  console.log('🔐 [supabase.js] Init Check:', {
    isPasswordRecovery,
    pathname,
    hasHash: hash.length > 1,
    hasSearch: search.length > 1,
    url: window.location.href.substring(0, 120)
  });
}

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    // 🔐 KEY FIX: Disable auto-detection for recovery URLs
    // This prevents auto-sign-in when user clicks reset password link
    detectSessionInUrl: !isPasswordRecovery,
    storageKey: 'ptdt-auth-token',
    storage: isBrowser ? window.localStorage : undefined,
  },
  db: {
    schema: 'public',
  },
  global: {
    headers: {
      'x-application-name': 'ptdt-taxi',
    },
  },
});

// 🔐 If this IS a recovery URL, manually handle the session
// This gives us control over showing the reset modal first
if (isBrowser && isPasswordRecovery) {
  console.log('🔐 [supabase.js] Password recovery mode - handling manually');
  
  // Extract tokens from URL
  const getRecoveryTokens = () => {
    // Check hash first (Supabase default)
    if (window.location.hash && window.location.hash.length > 1) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const accessToken = hashParams.get('access_token');
      const refreshToken = hashParams.get('refresh_token');
      if (accessToken) {
        console.log('🔐 [supabase.js] Tokens found in HASH');
        return { accessToken, refreshToken };
      }
    }
    
    // Check query params (alternative format)
    if (window.location.search && window.location.search.length > 1) {
      const queryParams = new URLSearchParams(window.location.search);
      const accessToken = queryParams.get('access_token');
      const refreshToken = queryParams.get('refresh_token');
      if (accessToken) {
        console.log('🔐 [supabase.js] Tokens found in QUERY');
        return { accessToken, refreshToken };
      }
    }
    
    console.log('🔐 [supabase.js] No tokens in URL - will check existing session');
    return null;
  };
  
  const tokens = getRecoveryTokens();
  
  if (tokens?.accessToken) {
    console.log('🔐 [supabase.js] Setting recovery session...');
    
    // Set the session manually so user can update password
    supabase.auth.setSession({
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken || '',
    }).then(({ data, error }) => {
      if (error) {
        console.error('🔐 [supabase.js] Session error:', error.message);
      } else {
        console.log('🔐 [supabase.js] Recovery session set!', data?.user?.email);
        // Dispatch event to notify App.jsx
        window.dispatchEvent(new CustomEvent('passwordRecoveryReady'));
      }
    });
  } else {
    // No tokens but recovery URL - still dispatch event
    // ResetPassword component will check for existing session
    console.log('🔐 [supabase.js] No tokens, dispatching recovery event anyway');
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('passwordRecoveryReady'));
    }, 100);
  }
}

// ========== HELPER FUNCTIONS ==========

/**
 * Get current authenticated user
 * @returns {Promise<User|null>}
 */
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) {
    console.error('Error getting user:', error.message);
    return null;
  }
  return user;
};

/**
 * Get current session
 * @returns {Promise<Session|null>}
 */
export const getCurrentSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) {
    console.error('Error getting session:', error.message);
    return null;
  }
  return session;
};

/**
 * Get user profile from profiles table
 * @param {string} userId 
 * @returns {Promise<Object|null>}
 */
export const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
    
  if (error) {
    console.error('Error fetching profile:', error.message);
    return null;
  }
  return data;
};

/**
 * Get user profile by email
 * @param {string} email 
 * @returns {Promise<Object|null>}
 */
export const getProfileByEmail = async (email) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('email', email.toLowerCase())
    .single();
    
  if (error && error.code !== 'PGRST116') {
    console.error('Error fetching profile by email:', error.message);
    return null;
  }
  return data;
};

/**
 * Update user profile
 * @param {string} userId 
 * @param {Object} updates 
 * @returns {Promise<Object|null>}
 */
export const updateUserProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating profile:', error.message);
    return null;
  }
  return data;
};

/**
 * Sign out user
 * @returns {Promise<boolean>}
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error signing out:', error.message);
    return false;
  }
  return true;
};

// ========== AUTH STATE LISTENER ==========

/**
 * Subscribe to auth state changes
 * @param {Function} callback - Called with (event, session)
 * @returns {Function} Unsubscribe function
 */
export const onAuthStateChange = (callback) => {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
  return () => subscription.unsubscribe();
};

/**
 * Check if current page is password recovery
 * @returns {boolean}
 */
export const isRecoveryPage = () => {
  if (typeof window === 'undefined') return false;
  return (
    window.location.hash.includes('type=recovery') ||
    window.location.search.includes('type=recovery') ||
    window.location.pathname === '/reset-password' ||
    window.location.pathname.includes('reset-password') ||
    window.__PTDT_PASSWORD_RECOVERY__ === true
  );
};

// ============================================
// 🔄 CROSS-TAB SESSION SYNC SYSTEM
// ============================================

const BROADCAST_CHANNEL_NAME = 'ptdt-auth-sync';
const STORAGE_SYNC_KEY = 'ptdt-auth-sync-event';

class CrossTabSync {
  constructor() {
    this.listeners = new Set();
    this.broadcastChannel = null;
    this.lastEventId = null;
    this.isInitialized = false;
  }

  init() {
    if (this.isInitialized || typeof window === 'undefined') return;
    this.isInitialized = true;

    console.log('🔄 [CrossTabSync] Initializing...');

    // Method 1: BroadcastChannel API (Chrome, Firefox, Edge)
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        this.broadcastChannel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        this.broadcastChannel.onmessage = (event) => {
          if (event.data?.id !== this.lastEventId) {
            this.handleIncomingMessage(event.data);
          }
        };
        console.log('🔄 [CrossTabSync] BroadcastChannel ready');
      } catch (e) {
        console.warn('🔄 [CrossTabSync] BroadcastChannel failed:', e);
      }
    }

    // Method 2: localStorage fallback (Safari, older browsers)
    window.addEventListener('storage', (event) => {
      if (event.key === STORAGE_SYNC_KEY && event.newValue) {
        try {
          const data = JSON.parse(event.newValue);
          if (data.id !== this.lastEventId) {
            this.handleIncomingMessage(data);
          }
        } catch (e) {
          console.error('🔄 [CrossTabSync] Storage parse error:', e);
        }
      }
    });

    // Method 3: Refresh session when tab becomes visible
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        console.log('🔄 [CrossTabSync] Tab visible - checking session...');
        this.refreshSession();
      }
    });

    // Method 4: Refresh session when window gains focus
    window.addEventListener('focus', () => {
      console.log('🔄 [CrossTabSync] Window focused - checking session...');
      this.refreshSession();
    });

    console.log('🔄 [CrossTabSync] Initialized successfully');
  }

  // Generate unique event ID
  generateEventId() {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  // Broadcast auth event to other tabs
  broadcast(eventType, data = {}) {
    if (typeof window === 'undefined') return;

    const eventId = this.generateEventId();
    this.lastEventId = eventId;

    const message = {
      id: eventId,
      type: eventType,
      timestamp: Date.now(),
      ...data
    };

    console.log('🔄 [CrossTabSync] Broadcasting:', eventType);

    // Send via BroadcastChannel
    if (this.broadcastChannel) {
      try {
        this.broadcastChannel.postMessage(message);
      } catch (e) {
        console.error('🔄 [CrossTabSync] Broadcast error:', e);
      }
    }

    // Also send via localStorage (Safari fallback)
    try {
      localStorage.setItem(STORAGE_SYNC_KEY, JSON.stringify(message));
      // Clean up immediately - we just need the event to fire
      setTimeout(() => {
        localStorage.removeItem(STORAGE_SYNC_KEY);
      }, 100);
    } catch (e) {
      console.error('🔄 [CrossTabSync] Storage error:', e);
    }
  }

  // Handle incoming message from another tab
  handleIncomingMessage(data) {
    console.log('🔄 [CrossTabSync] Received from other tab:', data.type);

    // Notify all listeners
    this.listeners.forEach((callback) => {
      try {
        callback(data);
      } catch (e) {
        console.error('🔄 [CrossTabSync] Listener error:', e);
      }
    });

    // Auto-refresh session for auth events
    if (['SIGNED_IN', 'SIGNED_OUT', 'SESSION_REFRESH'].includes(data.type)) {
      this.refreshSession();
    }
  }

  // Refresh session from Supabase
  async refreshSession() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('🔄 [CrossTabSync] Session refresh error:', error);
        return null;
      }

      // Notify listeners of session state
      this.listeners.forEach((callback) => {
        try {
          callback({
            type: 'SESSION_REFRESHED',
            hasSession: !!session,
            userId: session?.user?.id || null,
            email: session?.user?.email || null,
            timestamp: Date.now()
          });
        } catch (e) {
          console.error('🔄 [CrossTabSync] Listener error:', e);
        }
      });

      return session;
    } catch (e) {
      console.error('🔄 [CrossTabSync] Refresh error:', e);
      return null;
    }
  }

  // Subscribe to cross-tab events
  subscribe(callback) {
    this.listeners.add(callback);
    console.log('🔄 [CrossTabSync] Subscriber added. Total:', this.listeners.size);
    
    // Return unsubscribe function
    return () => {
      this.listeners.delete(callback);
      console.log('🔄 [CrossTabSync] Subscriber removed. Total:', this.listeners.size);
    };
  }

  // Broadcast sign in event
  broadcastSignIn(userId, email) {
    this.broadcast('SIGNED_IN', { userId, email });
  }

  // Broadcast sign out event
  broadcastSignOut() {
    this.broadcast('SIGNED_OUT', {});
  }

  // Force all tabs to refresh their session
  broadcastSessionRefresh() {
    this.broadcast('SESSION_REFRESH', {});
  }

  // Cleanup
  destroy() {
    if (this.broadcastChannel) {
      this.broadcastChannel.close();
      this.broadcastChannel = null;
    }
    this.listeners.clear();
    this.isInitialized = false;
    console.log('🔄 [CrossTabSync] Destroyed');
  }
}

// Create singleton instance
export const crossTabSync = new CrossTabSync();

// Auto-initialize if in browser
if (typeof window !== 'undefined') {
  crossTabSync.init();
  
  // Expose for debugging (optional - remove in production)
  window.__PTDT_CROSS_TAB_SYNC__ = crossTabSync;
}

// Export helper functions for easy use
export const subscribeToAuthSync = (callback) => crossTabSync.subscribe(callback);
export const broadcastSignIn = (userId, email) => crossTabSync.broadcastSignIn(userId, email);
export const broadcastSignOut = () => crossTabSync.broadcastSignOut();
export const broadcastSessionRefresh = () => crossTabSync.broadcastSessionRefresh();

export default supabase;