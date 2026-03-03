/**
 * ====================================================================
 * PTDT Authentication Token System (Supabase Version)
 * ====================================================================
 * Securely generates and decodes authentication tokens for DApp access
 * 
 * Features:
 * - AES encryption for secure token transmission
 * - Time-based expiration (1 hour default)
 * - URL-safe encoding
 * - Tamper-proof validation
 * - Works with Supabase user data
 * ====================================================================
 */

import CryptoJS from 'crypto-js';
import { supabase } from '../lib/supabase';

// ========== CONFIGURATION ==========
// 🔐 SECRET KEY - MUST MATCH DAPP SITE!
const SECRET_KEY = import.meta.env.VITE_AUTH_SECRET || 'PTDT_SUPER_SECRET_KEY_CHANGE_IN_PRODUCTION_2024';

// Token validity duration (1 hour in milliseconds)
const TOKEN_EXPIRY_DURATION = 60 * 60 * 1000; // 1 hour

// ========== GENERATE AUTH TOKEN ==========
/**
 * Generates an encrypted authentication token for DApp access
 * 
 * @param {Object} userData - User data (from Supabase session/profile)
 * @param {string} userData.id - Supabase user ID
 * @param {string} userData.fullName - User's full name
 * @param {string} userData.email - User's email address
 * @param {string} userData.wallet - User's wallet address
 * @param {string} userData.country - User's country
 * @param {string} userData.tier - User's tier (STANDARD, BRONZE, SILVER, GOLD)
 * @param {boolean} userData.isWhitelisted - Whitelist status
 * 
 * @returns {string} Encrypted, URL-safe authentication token
 * 
 * @example
 * const token = generateAuthToken({
 *   id: 'uuid-from-supabase',
 *   fullName: 'John Doe',
 *   email: 'john@example.com',
 *   wallet: '0x123...',
 *   country: 'United States',
 *   tier: 'GOLD',
 *   isWhitelisted: true
 * });
 */
export const generateAuthToken = (userData) => {
  try {
    // Create payload with user data and metadata
    const payload = {
      // User data
      userId: userData.id || '',
      fullName: userData.fullName || '',
      email: userData.email || '',
      wallet: userData.wallet || '',
      country: userData.country || '',
      registeredAt: userData.registeredAt || new Date().toISOString(),
      
      // User privileges
      tier: userData.tier || 'STANDARD',
      isWhitelisted: userData.isWhitelisted || false,
      
      // Token metadata
      issuedAt: Date.now(),
      expiresAt: Date.now() + TOKEN_EXPIRY_DURATION,
      
      // Security fields
      tokenVersion: '2.0', // Updated version for Supabase
      issuer: 'ptdt.taxi',
      audience: 'dapp.ptdt.taxi',
    };

    // Convert payload to JSON string
    const payloadString = JSON.stringify(payload);

    // Encrypt the payload using AES
    const encrypted = CryptoJS.AES.encrypt(payloadString, SECRET_KEY).toString();

    // Make it URL-safe by encoding
    const urlSafe = encodeURIComponent(encrypted);

    console.log('✅ Auth token generated successfully');
    console.log(`📧 User: ${payload.email}`);
    console.log(`⭐ Tier: ${payload.tier}`);
    
    return urlSafe;

  } catch (error) {
    console.error('❌ Error generating auth token:', error);
    throw new Error('Failed to generate authentication token');
  }
};

// ========== GENERATE TOKEN FROM CURRENT SESSION ==========
/**
 * Generates a token from the current Supabase session
 * Useful when you need to get a token without having user data handy
 * 
 * @returns {Promise<string|null>} Token or null if not authenticated
 * 
 * @example
 * const token = await generateTokenFromSession();
 * if (token) {
 *   window.open(`https://dapp.ptdt.taxi?auth=${token}`, '_blank');
 * }
 */
export const generateTokenFromSession = async () => {
  try {
    // Get current session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      console.warn('⚠️ No active session found');
      return null;
    }
    
    // Fetch profile data
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    
    // Build user data
    const userData = {
      id: session.user.id,
      fullName: profile?.full_name || session.user.user_metadata?.full_name || 'User',
      email: session.user.email,
      wallet: profile?.wallet || session.user.user_metadata?.wallet || '',
      country: profile?.country || session.user.user_metadata?.country || '',
      tier: profile?.tier || 'STANDARD',
      isWhitelisted: profile?.is_whitelisted || false,
      registeredAt: profile?.registered_at || session.user.created_at,
    };
    
    // Generate and return token
    return generateAuthToken(userData);
    
  } catch (error) {
    console.error('❌ Error generating token from session:', error);
    return null;
  }
};

// ========== DECODE AUTH TOKEN ==========
/**
 * Decodes and validates an authentication token
 * 
 * @param {string} token - Encrypted authentication token
 * 
 * @returns {Object|null} Decoded user data if valid, null if invalid/expired
 * 
 * @example
 * const userData = decodeAuthToken(tokenFromURL);
 * if (userData) {
 *   console.log('Valid user:', userData.fullName);
 * } else {
 *   console.log('Invalid or expired token');
 * }
 */
export const decodeAuthToken = (token) => {
  try {
    // Decode from URL-safe format
    const encrypted = decodeURIComponent(token);

    // Decrypt the token
    const decrypted = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    
    // Convert to UTF-8 string
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);

    if (!decryptedString) {
      console.error('❌ Failed to decrypt token - invalid or corrupted');
      return null;
    }

    // Parse JSON payload
    const payload = JSON.parse(decryptedString);

    // ========== VALIDATION ==========
    
    // 1. Check if token has expired
    if (Date.now() > payload.expiresAt) {
      console.warn('⏰ Token has expired');
      return null;
    }

    // 2. Verify token issuer
    if (payload.issuer !== 'ptdt.taxi') {
      console.warn('⚠️ Invalid token issuer');
      return null;
    }

    // 3. Verify token audience
    if (payload.audience !== 'dapp.ptdt.taxi') {
      console.warn('⚠️ Invalid token audience');
      return null;
    }

    // 4. Check required fields
    if (!payload.email || !payload.fullName) {
      console.warn('⚠️ Token missing required fields');
      return null;
    }

    console.log('✅ Token validated successfully');

    // Return clean user data
    return {
      userId: payload.userId,
      fullName: payload.fullName,
      email: payload.email,
      wallet: payload.wallet,
      country: payload.country,
      registeredAt: payload.registeredAt,
      tier: payload.tier,
      isWhitelisted: payload.isWhitelisted,
      
      // Token metadata
      tokenIssuedAt: payload.issuedAt,
      tokenExpiresAt: payload.expiresAt,
      tokenVersion: payload.tokenVersion,
    };

  } catch (error) {
    console.error('❌ Error decoding token:', error);
    return null;
  }
};

// ========== VERIFY TOKEN VALIDITY ==========
/**
 * Quick check if a token is still valid
 * 
 * @param {string} token - Token to verify
 * @returns {boolean} True if valid, false otherwise
 */
export const isTokenValid = (token) => {
  if (!token) return false;
  
  const decoded = decodeAuthToken(token);
  return decoded !== null;
};

// ========== GET TOKEN EXPIRY TIME ==========
/**
 * Get remaining time until token expires
 * 
 * @param {string} token - Token to check
 * @returns {number|null} Milliseconds until expiry, or null if invalid
 */
export const getTokenExpiryTime = (token) => {
  const decoded = decodeAuthToken(token);
  
  if (!decoded) return null;
  
  const remaining = decoded.tokenExpiresAt - Date.now();
  return remaining > 0 ? remaining : 0;
};

// ========== FORMAT EXPIRY TIME ==========
/**
 * Format token expiry time in human-readable format
 * 
 * @param {string} token - Token to check
 * @returns {string} Formatted time string
 */
export const formatTokenExpiry = (token) => {
  const remaining = getTokenExpiryTime(token);
  
  if (remaining === null) return 'Invalid token';
  if (remaining === 0) return 'Expired';
  
  const minutes = Math.floor(remaining / 60000);
  
  if (minutes < 1) return 'Less than a minute';
  if (minutes === 1) return '1 minute remaining';
  if (minutes < 60) return `${minutes} minutes remaining`;
  
  const hours = Math.floor(minutes / 60);
  return `${hours} hour${hours > 1 ? 's' : ''} remaining`;
};

// ========== REFRESH TOKEN ==========
/**
 * Generate a fresh token from an existing valid token
 * 
 * @param {string} oldToken - Existing token
 * @returns {string|null} New token or null if old token invalid
 */
export const refreshAuthToken = (oldToken) => {
  const decoded = decodeAuthToken(oldToken);
  
  if (!decoded) {
    console.error('❌ Cannot refresh invalid token');
    return null;
  }
  
  // Generate new token with same user data
  return generateAuthToken({
    id: decoded.userId,
    fullName: decoded.fullName,
    email: decoded.email,
    wallet: decoded.wallet,
    country: decoded.country,
    registeredAt: decoded.registeredAt,
    tier: decoded.tier,
    isWhitelisted: decoded.isWhitelisted,
  });
};

// ========== REDIRECT TO DAPP WITH AUTH ==========
/**
 * Helper function to redirect to DApp with authentication
 * 
 * @param {boolean} newTab - Open in new tab (default: true)
 * @returns {Promise<boolean>} Success status
 * 
 * @example
 * // In a button click handler:
 * await redirectToDAppWithAuth();
 */
export const redirectToDAppWithAuth = async (newTab = true) => {
  try {
    const token = await generateTokenFromSession();
    
    if (!token) {
      console.warn('⚠️ No session - redirecting without auth');
      if (newTab) {
        window.open('https://dapp.ptdt.taxi', '_blank');
      } else {
        window.location.href = 'https://dapp.ptdt.taxi';
      }
      return false;
    }
    
    const url = `https://dapp.ptdt.taxi?auth=${token}`;
    
    if (newTab) {
      window.open(url, '_blank');
    } else {
      window.location.href = url;
    }
    
    return true;
    
  } catch (error) {
    console.error('❌ Error redirecting to DApp:', error);
    window.open('https://dapp.ptdt.taxi', '_blank');
    return false;
  }
};

// ========== EXPORT DEFAULT ==========
export default {
  generateAuthToken,
  generateTokenFromSession,
  decodeAuthToken,
  isTokenValid,
  getTokenExpiryTime,
  formatTokenExpiry,
  refreshAuthToken,
  redirectToDAppWithAuth,
};