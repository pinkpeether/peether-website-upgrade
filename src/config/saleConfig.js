// src/config/saleConfig.js
// Main Site Sale Configuration
// Note: Must match dApp's constants.ts for countdown sync!

export const SALE_CONFIG = {
  // 🔥 THESE MUST BE IDENTICAL TO dApp's constants.ts
  START_DATE: new Date('2025-12-30T00:00:00.000Z'),
  END_DATE: new Date('2026-01-01T11:59:59.000Z'),
  
  // Sale Details
  TOTAL_SUPPLY: 100_000,
  PRIVATE_SALE_ALLOCATION: 5_000, // 5k PTDT (5%)
  MIN_PURCHASE: 5,
  MAX_PURCHASE: 100,
  BASE_PRICE: 1.00,
  
  // Note: TOKEN_DECIMALS & USDT_DECIMALS not needed on Main Site
  // (Main Site doesn't interact with blockchain directly)
};

export default SALE_CONFIG;