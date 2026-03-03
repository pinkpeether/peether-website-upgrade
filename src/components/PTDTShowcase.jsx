import React, { useEffect, useMemo, useRef, useState } from "react";

const PINK = "#FB0A8B";
const GREEN = "#00E16E";
const PINK_LIGHT = "#FF3DA1";
const GREEN_LIGHT = "#00FF80";

const I18N = {
  en: {
    welcome: "Welcome to Pink Taxi",
    tagline: "Safe Rides. Real Rewards.",
    register: "Create Account",
    login: "Sign In",
    
    homeTitle: "Where to?",
    currentLocation: "Current Location",
    destination: "Enter Destination",
    
    selectVehicle: "Choose Your Ride",
    standard: "Pink Standard",
    comfort: "Pink Comfort",
    xl: "Pink XL",
    earn: "Earn",
    
    payment: "Payment Method",
    payWithPTDT: "Pay with PTDT",
    confirmRide: "Confirm Ride",
    
    driverAssigned: "Driver Assigned",
    arriving: "Arriving in",
    
    tripProgress: "Trip in Progress",
    tripDestination: "Destination",    
    
    tripComplete: "Trip Complete!",
    fare: "Fare",
    earned: "You Earned",
    tipDriver: "Tip Driver",
    
    wallet: "PTDT Wallet",
    balance: "Balance",
    send: "Send",
    receive: "Receive",
    exchange: "Exchange",
    transactions: "Recent Transactions",
    
    profile: "My Account",
  },
};

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduced(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);
  return reduced;
}

/* Realistic Map Component */
function RealisticMap({ active, showRoute = false, durationMs = 8000 }) {
  const pathRef = useRef(null);
  const carRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!active || !showRoute) return;
    let raf;
    const start = performance.now();
    const loop = (now) => {
      const t = Math.min(1, (now - start) / durationMs);
      setProgress(t);
      if (t < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [active, showRoute, durationMs]);

  useEffect(() => {
    if (!showRoute) return;
    const path = pathRef.current;
    const car = carRef.current;
    if (!path || !car) return;
    const len = path.getTotalLength?.() ?? 0;
    const dist = len * progress;
    const pt = path.getPointAtLength?.(dist) ?? { x: 0, y: 0 };
    car.setAttribute("transform", `translate(${pt.x - 10}, ${pt.y - 10})`);
  }, [progress, showRoute]);

  return (
    <svg viewBox="0 0 360 640" width="100%" height="100%" style={{ background: '#f5f5f5' }}>
      <defs>
        <linearGradient id="mapBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8f4f0" />
          <stop offset="100%" stopColor="#f0f8f5" />
        </linearGradient>
        <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={PINK} />
          <stop offset="100%" stopColor={GREEN} />
        </linearGradient>
      </defs>

      {/* Map background */}
      <rect width="360" height="640" fill="url(#mapBg)" />

      {/* Streets */}
      {[
        "M20 120 L340 125",
        "M30 200 L320 205",
        "M25 280 L335 285",
        "M15 360 L345 365",
        "M20 440 L330 445",
        "M30 520 L340 525",
      ].map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="#d5d5d5"
          strokeWidth="4"
          fill="none"
          opacity="0.7"
        />
      ))}

      {/* Buildings */}
      {Array.from({ length: 40 }).map((_, i) => (
        <rect
          key={i}
          x={((i * 53) % 360) - 10}
          y={((i * 97) % 640) - 10}
          width={Math.random() * 30 + 30}
          height={Math.random() * 40 + 30}
          rx="3"
          fill="#fff"
          stroke="#ddd"
          strokeWidth="1"
          opacity="0.6"
        />
      ))}

      {/* Route path */}
      {showRoute && (
        <path
          ref={pathRef}
          d="M60 580 C80 520, 100 460, 130 400 S180 300, 220 240 S280 150, 300 80"
          stroke="url(#routeGrad)"
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          style={{ filter: "drop-shadow(0 0 6px rgba(0,225,110,.4))" }}
        />
      )}

      {/* Car marker */}
      {showRoute && (
        <g ref={carRef}>
          <circle cx="10" cy="10" r="12" fill={PINK} opacity="0.2" />
          <circle cx="10" cy="10" r="8" fill={PINK} stroke="#fff" strokeWidth="2" />
        </g>
      )}

      {/* Pickup marker */}
      <g transform="translate(50, 570)">
        <circle cx="0" cy="0" r="8" fill={GREEN} stroke="#fff" strokeWidth="2" />
        <text x="15" y="5" fontSize="11" fontWeight="600" fill="#333">Pickup</text>
      </g>

      {/* Destination marker */}
      {showRoute && (
        <g transform="translate(290, 70)">
          <circle cx="0" cy="0" r="8" fill={PINK} stroke="#fff" strokeWidth="2" />
          <text x="15" y="5" fontSize="11" fontWeight="600" fill="#333">Drop-off</text>
        </g>
      )}
    </svg>
  );
}

export default function PTDTShowcase({
  logoSrc,
  backgroundSrc,
  autoplay = true,
  loop = true,
  lang = "en",
  phoneWidth = 390,
}) {
  const t = I18N[lang] || I18N.en;
  const reduced = useReducedMotion();

  const SCREENS = useMemo(
    () => [
      { key: "home_screen", ms: 3500 },
      { key: "splash", ms: 3000 },
      { key: "main_home", ms: 4500 },
      { key: "set_destination", ms: 4000 },
      { key: "vehicle_select", ms: 4200 },
      { key: "payment_method", ms: 3800 },
      { key: "confirm_ride", ms: 3500 },
      { key: "driver_assigned", ms: 4500 },
      { key: "trip_progress", ms: 7000 },
      { key: "trip_complete", ms: 4200 },
      { key: "wallet", ms: 5000 },
      { key: "profile", ms: 4000 },
    ],
    []
  );

  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(autoplay && !reduced);
  const timer = useRef(null);

  useEffect(() => {
    clearTimeout(timer.current);
    if (!playing) return;
    timer.current = setTimeout(() => {
      setIndex((i) => {
        const last = SCREENS.length - 1;
        if (i >= last) return loop ? 0 : last;
        return i + 1;
      });
    }, SCREENS[index].ms);
    return () => clearTimeout(timer.current);
  }, [index, playing, loop, SCREENS]);

  const screen = SCREENS[index].key;

  const goNext = () => {
    setPlaying(false);
    setIndex((i) => Math.min(i + 1, SCREENS.length - 1));
  };

  const goPrev = () => {
    setPlaying(false);
    setIndex((i) => Math.max(i - 1, 0));
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

    .ptdt-showcase-wrap {
      --pink: ${PINK};
      --green: ${GREEN};
      --pink-light: ${PINK_LIGHT};
      --green-light: ${GREEN_LIGHT};
      font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      color: #4a4a4a;
      position: relative;
    }

    /* iPhone 14/15 Pro Design - Using Real iPhone PNG Border */
    /* iPhone Container with Border Overlay */
    .ptdt-iphone-wrapper {
     position: relative;
     width: 100%;
     max-width: ${phoneWidth}px;
     aspect-ratio: 390 / 844;
     margin: 0 auto;
     filter: drop-shadow(0 10px 30px rgba(255, 255, 255, 1)) drop-shadow(0 20px 50px rgba(253, 253, 253, 1));
   }

    /* Screen Container - Goes INSIDE the transparent area */
    .ptdt-screen-container {
     position: absolute;
     top: 3%;
     left: 3%;
     right: 3%;
     bottom: 3%;
     background: #ffffff;
     border-radius: 44px;
     overflow: hidden;
     z-index: 1;
   }

    /* Border PNG Overlay - Goes ON TOP */
    .ptdt-iphone-border {
      position: absolute;
      inset: 0;
      background-image: url(https://ptdt.taxi/iphone_border.png);
      background-size: 100% 100%;
      background-repeat: no-repeat;
      background-position: center;
      pointer-events: none;
      z-index: 10;
    }

    /* Side Buttons - REMOVED (not needed with PNG border) */

    /* Dynamic Island */
    .dynamic-island {
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 126px;
      height: 37px;
      background: #000;
      border-radius: 0 0 20px 20px;
      z-index: 100;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
    }
    
    .dynamic-island .camera {
      width: 10px;
      height: 10px;
      background: radial-gradient(circle, #1a3a4a, #000);
      border-radius: 50%;
      box-shadow: inset 0 0 3px rgba(100,150,200,0.5);
    }
    
    .dynamic-island .speaker {
      width: 60px;
      height: 5px;
      background: #0a0a0a;
      border-radius: 3px;
    }

    /* Status Bar */
    .status-bar {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 54px;
      padding: 8px 20px 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      z-index: 99;
      color: #fff;
      font-size: 15px;
      font-weight: 600;
    }
    
    .status-left {
      display: flex;
      gap: 4px;
      align-items: center;
    }
    
    .status-right {
      display: flex;
      gap: 6px;
      align-items: center;
      font-size: 13px;
    }

    /* PTDT Balance Header */
    .ptdt-balance-header {
      position: absolute;
      top: 54px;
      left: 0;
      right: 0;
      padding: 12px 20px;
      background: linear-gradient(135deg, rgba(251,10,139,0.1), rgba(0,225,110,0.1));
      backdrop-filter: blur(10px);
      border-bottom: 1px solid rgba(255,255,255,0.1);
      z-index: 98;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    
    .ptdt-balance {
      display: flex;
      align-items: center;
      gap: 8px;
      color: #fff;
      font-size: 14px;
      font-weight: 600;
    }
    
    .ptdt-balance .amount {
      color: ${GREEN};
      font-size: 16px;
      font-weight: 700;
    }

    /* Screen Content Area */
    .screen-content {
      position: absolute;
      top: 100px;
      left: 0;
      right: 0;
      bottom: 100px;
      overflow-y: auto;
      overflow-x: hidden;
      padding: 0 20px;
      cursor: grab;
    }
    
    .screen-content:active {
      cursor: grabbing;
    }

    /* Bottom Navigation */
    .bottom-nav {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 90px;
      background: rgba(0,0,0,0.8);
      backdrop-filter: blur(20px);
      border-top: 1px solid rgba(255,255,255,0.1);
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0 20px 20px;
      z-index: 98;
    }
    
    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 4px;
      color: #999;
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .nav-item.active {
      color: ${GREEN};
    }
    
    .nav-icon {
      width: 24px;
      height: 24px;
    }

    /* Home Indicator */
    .home-indicator {
      position: absolute;
      bottom: 8px;
      left: 50%;
      transform: translateX(-50%);
      width: 130px;
      height: 5px;
      background: rgba(255,255,255,0.3);
      border-radius: 10px;
      z-index: 101;
    }

    /* Card Styles */
    .card {
      background: #fff;
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
      margin-bottom: 16px;
    }
    
    .card-title {
      font-size: 18px;
      font-weight: 700;
      color: #4a4a4a;
      margin-bottom: 12px;
    }

    /* Input Field */
    .input-field {
      display: flex;
      align-items: center;
      gap: 12px;
      background: #f5f5f5;
      border: 2px solid #e5e5e5;
      border-radius: 16px;
      padding: 16px;
      font-size: 15px;
      color: #333;
      transition: all 0.3s;
    }
    
    .input-field:focus-within {
      border-color: ${PINK};
      box-shadow: 0 0 0 4px rgba(251,10,139,0.1);
    }

    /* Button Styles */
    .btn-primary {
      width: 100%;
      padding: 18px;
      background: linear-gradient(135deg, ${PINK}, ${PINK_LIGHT});
      color: #fff;
      border: none;
      border-radius: 16px;
      font-size: 17px;
      font-weight: 700;
      box-shadow: 
        0 6px 20px rgba(251,10,139,0.3),
        inset 0 2px 4px rgba(255,255,255,0.3),
        inset 0 -2px 4px rgba(0,0,0,0.2);
      cursor: pointer;
      transition: all 0.3s;
      text-shadow: 0 1px 2px rgba(0,0,0,0.2);
    }
    
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 
        0 8px 25px rgba(251,10,139,0.4),
        inset 0 2px 4px rgba(255,255,255,0.3),
        inset 0 -2px 4px rgba(0,0,0,0.2);
    }
    
    .btn-secondary {
      width: 100%;
      padding: 18px;
      background: #fff;
      color: ${PINK};
      border: 2px solid ${PINK};
      border-radius: 16px;
      font-size: 17px;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.3s;
      box-shadow: 
        0 4px 12px rgba(0,0,0,0.08),
        inset 0 1px 2px rgba(255,255,255,0.8),
        inset 0 -1px 2px rgba(0,0,0,0.05);
      text-shadow: 0 1px 1px rgba(255,255,255,0.3);
    }

    /* Ride Option Card */
    .ride-option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #fff;
      border: 2px solid #e5e5e5;
      border-radius: 18px;
      padding: 18px;
      margin-bottom: 12px;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .ride-option:hover {
      border-color: ${PINK};
      box-shadow: 0 4px 16px rgba(251,10,139,0.15);
    }
    
    .ride-option.selected {
      border-color: ${PINK};
      background: linear-gradient(135deg, rgba(251,10,139,0.05), rgba(0,225,110,0.05));
    }
    
    .ride-info {
      display: flex;
      align-items: center;
      gap: 14px;
    }
    
    .ride-icon {
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, ${PINK}, ${PINK_LIGHT});
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 24px;
    }
    
    .ride-details h4 {
      font-size: 16px;
      font-weight: 700;
      color: #4a4a4a;
      margin: 0 0 4px 0;
    }
    
    .ride-details .earn-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: linear-gradient(135deg, rgba(0,225,110,0.1), rgba(0,225,110,0.2));
      padding: 4px 10px;
      border-radius: 8px;
      font-size: 12px;
      font-weight: 600;
      color: ${GREEN};
    }
    
    .ride-price {
      text-align: right;
    }
    
    .ride-price .amount {
      font-size: 24px;
      font-weight: 800;
      color: #4a4a4a;
    }
    
    .ride-price .time {
      font-size: 12px;
      color: #999;
      margin-top: 2px;
    }

    /* Toggle Switch */
    .toggle-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 0;
    }
    
    .toggle-label {
      font-size: 15px;
      font-weight: 600;
      color: #333;
    }
    
    .toggle-switch {
      position: relative;
      width: 56px;
      height: 32px;
      background: #e5e5e5;
      border-radius: 16px;
      cursor: pointer;
      transition: all 0.3s;
    }
    
    .toggle-switch.active {
      background: ${PINK};
    }
    
    .toggle-switch::after {
      content: '';
      position: absolute;
      top: 4px;
      left: 4px;
      width: 24px;
      height: 24px;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
      transition: all 0.3s;
    }
    
    .toggle-switch.active::after {
      left: 28px;
    }

    /* Driver Card */
    .driver-card {
      display: flex;
      align-items: center;
      gap: 16px;
      background: #fff;
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    }
    
    .driver-avatar {
      width: 64px;
      height: 64px;
      background: linear-gradient(135deg, ${PINK}, ${GREEN});
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      font-size: 24px;
      font-weight: 700;
    }
    
    .driver-info h4 {
      font-size: 18px;
      font-weight: 700;
      color: #4a4a4a;
      margin: 0 0 4px 0;
    }
    
    .driver-info .rating {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      color: #666;
    }
    
    .driver-info .car-info {
      font-size: 13px;
      color: #999;
      margin-top: 4px;
    }

    /* Transaction Row */
    .transaction-row {
      display: flex;
      align-items: center;
      gap: 14px;
      background: #f9f9f9;
      border-radius: 14px;
      padding: 14px;
      margin-bottom: 10px;
    }
    
    .transaction-icon {
      width: 42px;
      height: 42px;
      background: linear-gradient(135deg, rgba(251,10,139,0.1), rgba(0,225,110,0.1));
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
    }
    
    .transaction-details {
      flex: 1;
    }
    
    .transaction-details h5 {
      font-size: 14px;
      font-weight: 600;
      color: #4a4a4a;
      margin: 0 0 4px 0;
    }
    
    .transaction-details .date {
      font-size: 12px;
      color: #999;
    }
    
    .transaction-amount {
      font-size: 16px;
      font-weight: 700;
    }
    
    .transaction-amount.positive {
      color: ${GREEN};
    }
    
    .transaction-amount.negative {
      color: ${PINK};
    }

    /* Navigation Arrows */
    .nav-arrows {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      width: 100%;
      left: 0;
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      pointer-events: none;
      z-index: 200;
    }
    
    @media (min-width: 768px) {
      .nav-arrows {
        width: calc(100% + 160px);
        left: -80px;
        padding: 0;
      }
    }
    
    .nav-arrow {
      width: 50px;
      height: 50px;
      background: rgba(251,10,139,0.15);
      backdrop-filter: blur(10px);
      border: 2px solid rgba(251,10,139,0.3);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${PINK};
      font-size: 24px;
      font-weight: 700;
      cursor: pointer;
      pointer-events: all;
      transition: all 0.3s;
      opacity: 0.6;
      animation: pulse 2s ease-in-out infinite;
    }
    
    @media (min-width: 768px) {
      .nav-arrow {
        width: 60px;
        height: 60px;
        font-size: 28px;
      }
    }
    
    .nav-arrow:hover {
      opacity: 1;
      background: rgba(251,10,139,0.25);
      border-color: rgba(251,10,139,0.5);
      transform: scale(1.1);
    }
    
    .nav-arrow:active {
      transform: scale(0.95);
    }
    
    .nav-arrow.disabled {
      opacity: 0.2;
      cursor: not-allowed;
      pointer-events: none;
    }
    
    @keyframes pulse {
      0%, 100% {
        box-shadow: 0 0 0 0 rgba(251,10,139,0.4);
      }
      50% {
        box-shadow: 0 0 0 20px rgba(251,10,139,0);
      }
    }

    /* Animations */
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .fade-in {
      animation: fadeIn 0.5s ease-out;
    }
  `;

  return (
    <div className="ptdt-showcase-wrap" style={{ position: 'relative', maxWidth: '100%', overflow: 'hidden' }}>
      <style>{styles}</style>

      {/* Navigation Arrows */}
      <div className="nav-arrows">
        <button 
          className={`nav-arrow ${index === 0 ? 'disabled' : ''}`}
          onClick={goPrev}
          aria-label="Previous screen"
        >
          ‹
        </button>
        <button 
          className={`nav-arrow ${index === SCREENS.length - 1 ? 'disabled' : ''}`}
          onClick={goNext}
          aria-label="Next screen"
        >
          ›
        </button>
      </div>

      <div className="ptdt-iphone-wrapper">
        {/* Screen Container - Goes INSIDE transparent area */}
        <div className="ptdt-screen-container">
          {/* Dynamic Island */}
          <div className="dynamic-island">
            <div className="camera"></div>
            <div className="speaker"></div>
          </div>

          {/* Render Current Screen */}
          {screen === "home_screen" && <HomeScreen t={t} />}
          {screen === "splash" && <SplashScreen t={t} />}
          {screen === "main_home" && <MainHome t={t} />}
          {screen === "set_destination" && <SetDestination t={t} />}
          {screen === "vehicle_select" && <VehicleSelect t={t} />}
          {screen === "payment_method" && <PaymentMethod t={t} />}
          {screen === "confirm_ride" && <ConfirmRide t={t} />}
          {screen === "driver_assigned" && <DriverAssigned t={t} />}
          {screen === "trip_progress" && <TripProgress t={t} active={playing} />}
          {screen === "trip_complete" && <TripComplete t={t} />}
          {screen === "wallet" && <WalletScreen t={t} />}
          {screen === "profile" && <ProfileScreen t={t} />}

          {/* Home Indicator */}
          <div className="home-indicator"></div>
        </div>

        {/* Border PNG Overlay - Goes ON TOP */}
        <div className="ptdt-iphone-border"></div>
      </div>
    </div>
  );
}

/* ==================== SCREEN COMPONENTS ==================== */

// Screen 1: iPhone Home Screen with Apps
function HomeScreen({ t }) {
  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      width: '100%',
      height: '100%',
      position: 'relative'
    }}>
      <div className="status-bar">
        <div className="status-left">
          <span>9:41</span>
        </div>
        <div className="status-right">
          <span>📶</span>
          <span>📡</span>
          <span>🔋</span>
        </div>
      </div>

      {/* App Icons Grid */}
      <div style={{
        position: 'absolute',
        top: '100px',
        left: '20px',
        right: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '24px',
        padding: '20px 0'
      }}>
        {[
          { name: 'Messages', icon: '💬', color: '#25D366' },
          { name: 'Camera', icon: '📷', color: '#8E8E93' },
          { name: 'Photos', icon: '🖼️', color: '#FFB800' },
          { name: 'Maps', icon: '🗺️', color: '#5AC8FA' },
          { name: 'Music', icon: '🎵', color: '#FA2D48' },
          { name: 'Settings', icon: '⚙️', color: '#8E8E93' },
          { name: 'Wallet', icon: '💳', color: '#000' },
          { name: 'Pink Taxi', iconType: 'image', color: PINK, special: true },
        ].map((app, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              background: app.special 
                ? '#000'
                : app.color,
              borderRadius: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: app.iconType === 'image' ? '0' : '30px',
              margin: '0 auto 8px',
              boxShadow: app.special
                ? `0 8px 24px rgba(251,10,139,0.4)`
                : '0 4px 12px rgba(0,0,0,0.15)',
              animation: app.special ? 'pulse 2s ease-in-out infinite' : 'none',
              overflow: 'hidden'
            }}>
              {app.iconType === 'image' ? (
                <img 
                  src="https://ptdt.taxi/pinkptdtlogo.png"
                  alt="Pink Taxi"
                  onError={(e) => {
                    e.currentTarget.src = "/ptdtlogo.png";
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '14px'
                  }}
                />
              ) : app.icon}
            </div>
            <div style={{
              fontSize: '11px',
              color: '#fff',
              fontWeight: app.special ? '600' : '400',
              textShadow: '0 1px 3px rgba(0,0,0,0.3)'
            }}>
              {app.name}
            </div>
          </div>
        ))}
      </div>

      {/* Dock */}
      <div style={{
        position: 'absolute',
        bottom: '100px',
        left: '20px',
        right: '20px',
        background: 'rgba(255,255,255,0.15)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '12px',
        display: 'flex',
        justifyContent: 'space-around'
      }}>
        {['📞', '✉️', '🌐', '📱'].map((icon, i) => (
          <div key={i} style={{
            width: '60px',
            height: '60px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '28px'
          }}>
            {icon}
          </div>
        ))}
      </div>
    </div>
  );
}

// Screen 2: Splash Screen
function SplashScreen({ t }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px',
      position: 'relative'
    }} className="fade-in">
      <div className="status-bar">
        <div className="status-left">
          <span style={{ marginRight: '8px' }}>9:41</span>
        </div>
        <div className="status-right">
          <svg width="18" height="14" viewBox="0 0 18 14" fill="white" style={{ marginRight: '4px' }}>
            <path d="M9 11C10.1 11 11 11.9 11 13C11 14.1 10.1 15 9 15C7.9 15 7 14.1 7 13C7 11.9 7.9 11 9 11ZM9 7C11.21 7 13.21 7.9 14.77 9.36L13.23 10.9C12.14 9.81 10.64 9.17 9 9.17C7.36 9.17 5.86 9.81 4.77 10.9L3.23 9.36C4.79 7.9 6.79 7 9 7ZM9 3C12.07 3 14.88 4.21 17 6.18L15.46 7.72C13.78 6.23 11.51 5.33 9 5.33C6.49 5.33 4.22 6.23 2.54 7.72L1 6.18C3.12 4.21 5.93 3 9 3Z" transform="scale(0.7)"/>
          </svg>
          <span>📡</span>
          <span>🔋</span>
        </div>
      </div>

      <img
        src="https://ptdt.taxi/pinkptdtlogo.png"
        alt="Pink Taxi"
        onError={(e) => {
          e.currentTarget.src = "/ptdtlogo.png";
        }}
        style={{
          width: '180px',
          height: 'auto',
          marginBottom: '24px',
          filter: 'drop-shadow(0 0 30px rgba(251,10,139,0.5))',
          animation: 'pulse 2s ease-in-out infinite'
        }}
      />

      <h1 style={{
        fontSize: '22px',
        fontWeight: '300',
        color: '#999',
        marginBottom: '4px',
        textAlign: 'center',
        letterSpacing: '0.5px'
      }}>
        Welcome to
      </h1>

      <h2 style={{
        fontSize: '42px',
        fontWeight: '500',
        color: PINK,
        marginBottom: '8px',
        textAlign: 'center',
        lineHeight: '1.2',
        letterSpacing: '1px'
      }}>
        PINK TAXI
      </h2>

      <p style={{
        fontSize: '20px',
        fontWeight: '300',
        color: '#fff',
        textAlign: 'center',
        marginBottom: '16px',
        letterSpacing: '0.5px'
      }}>
        Peether PTDT
      </p>

      <p style={{
        fontSize: '16px',
        color: '#999',
        textAlign: 'center',
        marginBottom: '50px',
        fontWeight: '300'
      }}>
        {t.tagline}
      </p>

      <div style={{ width: '100%', maxWidth: '300px' }}>
        <button className="btn-primary" style={{ marginBottom: '12px' }}>
          {t.register}
        </button>
        <button className="btn-secondary" style={{ marginBottom: '16px' }}>
          {t.login}
        </button>
        <div style={{
          textAlign: 'center',
          fontSize: '13px',
          color: '#666',
          fontWeight: '300',
          letterSpacing: '0.5px'
        }}>
          Global Version
        </div>
      </div>
    </div>
  );
}

// Screen 3: Main Home Screen
function MainHome({ t }) {
  return (
    <>
      <div style={{
        background: 'linear-gradient(180deg, #fff 0%, #f9f9f9 100%)',
        width: '100%',
        height: '100%',
        position: 'relative'
      }}>
        <div className="status-bar">
          <div className="status-left">
            <span style={{ color: '#000' }}>9:41</span>
          </div>
          <div className="status-right" style={{ color: '#000' }}>
            <span>📶</span>
            <span>📡</span>
            <span>🔋</span>
          </div>
        </div>

        <div className="ptdt-balance-header">
          <div className="ptdt-balance">
            <span style={{ fontSize: '20px' }}>💎</span>
            <span className="amount">1,247.50</span>
            <span>PTDT</span>
          </div>
          <button style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none',
            borderRadius: '20px',
            padding: '6px 14px',
            color: '#fff',
            fontSize: '13px',
            fontWeight: '300',
            cursor: 'pointer'
          }}>
            + Add
          </button>
        </div>

        <div className="screen-content" style={{ paddingTop: '20px' }}>
          <div className="card fade-in">
            <h2 style={{
              fontSize: '28px',
              fontWeight: '300',
              color: '#4a4a4a',
              marginBottom: '24px'
            }}>
              {t.homeTitle}
            </h2>

            <div className="input-field" style={{ marginBottom: '12px' }}>
              <span style={{ fontSize: '20px' }}>📍</span>
              <span style={{ flex: 1, color: '#999' }}>{t.currentLocation}</span>
            </div>

            <div className="input-field">
              <span style={{ fontSize: '20px' }}>🎯</span>
              <span style={{ flex: 1, color: '#333', fontWeight: '300' }}>{t.destination}</span>
            </div>
          </div>

          <div className="card fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '300', color: '#666', marginBottom: '12px' }}>
              Recent Destinations
            </h3>
            {[
              { name: 'Downtown Mall', icon: '🏬' },
              { name: 'Central Station', icon: '🚉' },
              { name: 'City Hospital', icon: '🏥' }
            ].map((dest, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px',
                background: '#f5f5f5',
                borderRadius: '12px',
                marginBottom: '8px',
                cursor: 'pointer'
              }}>
                <span style={{ fontSize: '24px' }}>{dest.icon}</span>
                <span style={{ flex: 1, fontSize: '14px', fontWeight: '300', color: '#333' }}>
                  {dest.name}
                </span>
                <span style={{ color: '#999' }}>→</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bottom-nav">
          <div className="nav-item active">
            <div className="nav-icon">🏠</div>
            <span>Home</span>
          </div>
          <div className="nav-item">
            <div className="nav-icon">🚗</div>
            <span>Rides</span>
          </div>
          <div className="nav-item">
            <div className="nav-icon">💎</div>
            <span>Wallet</span>
          </div>
          <div className="nav-item">
            <div className="nav-icon">👤</div>
            <span>Profile</span>
          </div>
        </div>
      </div>
    </>
  );
}

// Screen 4: Set Destination with Map
function SetDestination({ t }) {
  return (
    <div style={{
      background: '#fff',
      width: '100%',
      height: '100%',
      position: 'relative'
    }}>
      <div className="status-bar">
        <div className="status-left">
          <span style={{ color: '#000' }}>9:41</span>
        </div>
        <div className="status-right" style={{ color: '#000' }}>
          <span>📶</span>
          <span>📡</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Map */}
      <div style={{ position: 'absolute', top: '54px', left: 0, right: 0, height: '400px' }}>
        <RealisticMap active={false} showRoute={false} />
      </div>

      {/* Bottom Card */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        background: '#fff',
        borderRadius: '24px 24px 0 0',
        padding: '24px',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.1)'
      }} className="fade-in">
        <div style={{
          width: '40px',
          height: '5px',
          background: '#e5e5e5',
          borderRadius: '10px',
          margin: '0 auto 20px'
        }}></div>

        <div className="input-field" style={{ marginBottom: '12px' }}>
          <span style={{ fontSize: '20px', color: GREEN }}>📍</span>
          <span style={{ flex: 1, fontSize: '14px', fontWeight: '300', color: '#333' }}>
            123 Current Street, Downtown
          </span>
        </div>

        <div className="input-field" style={{ marginBottom: '20px' }}>
          <span style={{ fontSize: '20px', color: PINK }}>🎯</span>
          <input 
            type="text" 
            placeholder="Enter destination"
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              background: 'transparent',
              fontSize: '14px',
              fontWeight: '300',
              color: '#333'
            }}
          />
        </div>

        <button className="btn-primary">
          Confirm Location
        </button>
      </div>
    </div>
  );
}

// Screen 5: Vehicle Selection
function VehicleSelect({ t }) {
  return (
    <div style={{
      background: 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)',
      width: '100%',
      height: '100%',
      position: 'relative'
    }}>
      <div className="status-bar">
        <div className="status-left">
          <span>9:41</span>
        </div>
        <div className="status-right">
          <span>📶</span>
          <span>📡</span>
          <span>🔋</span>
        </div>
      </div>

      <div className="ptdt-balance-header">
        <div className="ptdt-balance">
          <span style={{ fontSize: '20px' }}>💎</span>
          <span className="amount">1,247.50</span>
          <span>PTDT</span>
        </div>
      </div>

      <div className="screen-content" style={{ paddingTop: '20px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '300',
          color: '#fff',
          marginBottom: '20px'
        }} className="fade-in">
          {t.selectVehicle}
        </h2>

        {[
          { name: 'Pink Standard', icon: '🚗', price: '$12.50', time: '5 min', earn: '+5 PTDT' },
          { name: 'Pink Comfort', icon: '🚙', price: '$18.00', time: '4 min', earn: '+7 PTDT', selected: true },
          { name: 'Pink XL', icon: '🚐', price: '$24.50', time: '6 min', earn: '+10 PTDT' }
        ].map((ride, i) => (
          <div 
            key={i} 
            className={`ride-option fade-in ${ride.selected ? 'selected' : ''}`}
            style={{ 
              animationDelay: `${i * 0.1}s`,
              background: ride.selected ? 'rgba(251,10,139,0.1)' : 'rgba(255,255,255,0.05)',
              border: ride.selected ? `2px solid ${PINK}` : '2px solid rgba(255,255,255,0.1)'
            }}
          >
            <div className="ride-info">
              <div className="ride-icon">{ride.icon}</div>
              <div className="ride-details">
                <h4 style={{ color: '#fff' }}>{ride.name}</h4>
                <span className="earn-badge">
                  💎 {ride.earn}
                </span>
              </div>
            </div>
            <div className="ride-price">
              <div className="amount" style={{ color: '#fff' }}>{ride.price}</div>
              <div className="time" style={{ color: '#999' }}>{ride.time} away</div>
            </div>
          </div>
        ))}

        <button className="btn-primary" style={{ marginTop: '24px' }}>
          Continue
        </button>
      </div>
    </div>
  );
}

// Screen 6: Payment Method
function PaymentMethod({ t }) {
  const [usePTDT, setUsePTDT] = useState(true);

  return (
    <div style={{
      background: 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)',
      width: '100%',
      height: '100%',
      position: 'relative'
    }}>
      <div className="status-bar">
        <div className="status-left">
          <span>9:41</span>
        </div>
        <div className="status-right">
          <span>📶</span>
          <span>📡</span>
          <span>🔋</span>
        </div>
      </div>

      <div className="ptdt-balance-header">
        <div className="ptdt-balance">
          <span style={{ fontSize: '20px' }}>💎</span>
          <span className="amount">1,247.50</span>
          <span>PTDT</span>
        </div>
      </div>

      <div className="screen-content" style={{ paddingTop: '20px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '300',
          color: '#fff',
          marginBottom: '20px'
        }} className="fade-in">
          {t.payment}
        </h2>

        <div className="card fade-in" style={{ 
          animationDelay: '0.1s',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div className="toggle-container">
            <div>
              <div className="toggle-label" style={{ marginBottom: '4px', color: '#fff' }}>
                {t.payWithPTDT}
              </div>
              <div style={{ fontSize: '13px', color: PINK }}>
                Save 10% on this ride
              </div>
            </div>
            <div 
              className={`toggle-switch ${usePTDT ? 'active' : ''}`}
              onClick={() => setUsePTDT(!usePTDT)}
              style={{
                background: usePTDT ? PINK : '#444'
              }}
            ></div>
          </div>

          {usePTDT && (
            <div style={{
              marginTop: '16px',
              padding: '16px',
              background: 'linear-gradient(135deg, rgba(251,10,139,0.15), rgba(0,225,110,0.08))',
              borderRadius: '12px',
              border: `2px solid ${PINK}60`
            }}>
              <div style={{ fontSize: '14px', color: '#999', marginBottom: '8px' }}>
                Ride Cost in PTDT
              </div>
              <div style={{ fontSize: '28px', fontWeight: '300', color: PINK }}>
                155.25 PTDT
              </div>
              <div style={{ fontSize: '12px', color: GREEN, marginTop: '4px' }}>
                + earn 7 PTDT back
              </div>
            </div>
          )}
        </div>

        <div className="card fade-in" style={{ 
          animationDelay: '0.2s',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <div style={{ fontSize: '14px', fontWeight: '300', color: '#999', marginBottom: '12px' }}>
            Other Payment Methods
          </div>
          
          {[
            { icon: '💳', name: 'Credit Card', details: '•••• 4592' },
            { icon: '💵', name: 'Cash', details: 'Pay driver directly' },
            { icon: '🏦', name: 'Bank Transfer', details: 'Direct debit' }
          ].map((method, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '14px',
              background: 'rgba(255,255,255,0.03)',
              borderRadius: '12px',
              marginBottom: '8px',
              cursor: 'pointer',
              opacity: usePTDT ? 0.5 : 1,
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <span style={{ fontSize: '24px' }}>{method.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '14px', fontWeight: '300', color: '#fff' }}>
                  {method.name}
                </div>
                <div style={{ fontSize: '12px', color: '#999' }}>
                  {method.details}
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-primary" style={{ marginTop: '20px' }}>
          {t.confirmRide}
        </button>
      </div>
    </div>
  );
}

// Screen 7: Confirm Ride
function ConfirmRide({ t }) {
  return (
    <div style={{
      background: '#fff',
      width: '100%',
      height: '100%',
      position: 'relative'
    }}>
      <div className="status-bar">
        <div className="status-left">
          <span style={{ color: '#000' }}>9:41</span>
        </div>
        <div className="status-right" style={{ color: '#000' }}>
          <span>📶</span>
          <span>📡</span>
          <span>🔋</span>
        </div>
      </div>

      <div style={{ position: 'absolute', top: '54px', left: 0, right: 0, height: '350px' }}>
        <RealisticMap active={false} showRoute={true} />
      </div>

      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        background: '#fff',
        borderRadius: '24px 24px 0 0',
        padding: '24px',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.1)'
      }} className="fade-in">
        <div style={{
          width: '40px',
          height: '5px',
          background: '#e5e5e5',
          borderRadius: '10px',
          margin: '0 auto 20px'
        }}></div>

        <h3 style={{ fontSize: '20px', fontWeight: '300', color: '#4a4a4a', marginBottom: '16px' }}>
          Ride Summary
        </h3>

        <div style={{ marginBottom: '20px' }}>
          {[
            { label: 'Vehicle', value: 'Pink Comfort 🚙' },
            { label: 'Distance', value: '5.2 km' },
            { label: 'Duration', value: '12 min' },
            { label: 'Payment', value: 'PTDT Wallet 💎' }
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <span style={{ fontSize: '14px', color: '#666' }}>{item.label}</span>
              <span style={{ fontSize: '14px', fontWeight: '300', color: '#333' }}>{item.value}</span>
            </div>
          ))}
          
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '14px 0',
            marginTop: '8px'
          }}>
            <span style={{ fontSize: '16px', fontWeight: '300', color: '#4a4a4a' }}>Total</span>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '20px', fontWeight: '300', color: PINK }}>
                155.25 PTDT
              </div>
              <div style={{ fontSize: '12px', color: GREEN, fontWeight: '300' }}>
                + earn 7 PTDT back
              </div>
            </div>
          </div>
        </div>

        <button className="btn-primary">
          Request Pink Ride
        </button>
      </div>
    </div>
  );
}

// Screen 8: Driver Assigned
function DriverAssigned({ t }) {
  return (
    <div style={{
      background: '#fff',
      width: '100%',
      height: '100%',
      position: 'relative'
    }}>
      <div className="status-bar">
        <div className="status-left">
          <span style={{ color: '#000' }}>9:41</span>
        </div>
        <div className="status-right" style={{ color: '#000' }}>
          <span>📶</span>
          <span>📡</span>
          <span>🔋</span>
        </div>
      </div>

      <div style={{ position: 'absolute', top: '54px', left: 0, right: 0, height: '380px' }}>
        <RealisticMap active={true} showRoute={true} durationMs={4000} />
      </div>

      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        background: '#fff',
        borderRadius: '24px 24px 0 0',
        padding: '24px',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.1)'
      }} className="fade-in">
        <div style={{
          width: '40px',
          height: '5px',
          background: '#e5e5e5',
          borderRadius: '10px',
          margin: '0 auto 20px'
        }}></div>

        <div style={{
          textAlign: 'center',
          padding: '16px',
          background: `linear-gradient(135deg, ${GREEN}15, ${GREEN}05)`,
          borderRadius: '16px',
          marginBottom: '20px'
        }}>
          <div style={{ fontSize: '14px', color: '#666', marginBottom: '4px' }}>
            {t.arriving}
          </div>
          <div style={{ fontSize: '32px', fontWeight: '300', color: GREEN }}>
            3 min
          </div>
        </div>

        <div className="driver-card">
          <div className="driver-avatar" style={{
            position: 'relative',
            overflow: 'hidden',
            padding: 0,
            background: 'transparent'
          }}>
            <img 
              src="https://ptdt.taxi/sarah_aafee.png"
              alt="Sarah Aafee"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, #FB0A8B, #00E16E);color:#fff;font-size:24px;font-weight:700;">SA</div>';
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%'
              }}
            />
          </div>
          <div className="driver-info" style={{ flex: 1 }}>
            <h4>Sarah Aafee</h4>
            <div className="rating">
              <span>⭐ 4.9</span>
              <span style={{ color: '#ccc' }}>•</span>
              <span>248 rides</span>
            </div>
            <div className="car-info">Toyota Prius • Pink • ABC-1234</div>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginTop: '16px'
        }}>
          <button style={{
            padding: '14px',
            background: '#f5f5f5',
            border: 'none',
            borderRadius: '14px',
            fontSize: '15px',
            fontWeight: '300',
            color: '#333',
            cursor: 'pointer',
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -1px 2px rgba(0,0,0,0.05)'
          }}>
            📞 Call
          </button>
          <button style={{
            padding: '14px',
            background: '#f5f5f5',
            border: 'none',
            borderRadius: '14px',
            fontSize: '15px',
            fontWeight: '300',
            color: '#333',
            cursor: 'pointer',
            boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -1px 2px rgba(0,0,0,0.05)'
          }}>
            💬 Message
          </button>
        </div>
      </div>
    </div>
  );
}

// Screen 9: Trip in Progress
function TripProgress({ t, active }) {
  return (
    <div style={{
      background: '#fff',
      width: '100%',
      height: '100%',
      position: 'relative'
    }}>
      <div className="status-bar">
        <div className="status-left">
          <span style={{ color: '#000' }}>9:41</span>
        </div>
        <div className="status-right" style={{ color: '#000' }}>
          <span>📶</span>
          <span>📡</span>
          <span>🔋</span>
        </div>
      </div>

      <div style={{ position: 'absolute', top: '54px', left: 0, right: 0, bottom: '200px', overflow: 'hidden' }}>
        <img 
          src="https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-l-car+FB0A8B(-122.4194,37.7749),pin-l-home+00E16E(-122.4094,37.7849),path-5+FB0A8B-0.5(-122.4194,37.7749,-122.4094,37.7849)/-122.4144,37.7799,12,0/400x600@2x?access_token=pk.eyJ1IjoicGVldGhlciIsImEiOiJjbWlkYmFqc2UwNGFxMmxzYnZjNW55aXVyIn0.4qjsWE-HGrEkaNyQ-JAtfA"
          alt="Route Map"
          onError={(e) => {
            // Fallback to embedded SVG map if Mapbox fails
            e.currentTarget.outerHTML = '<div style="width:100%;height:100%;background:#f5f5f5;display:flex;align-items:center;justify-content:center;"><svg viewBox="0 0 360 640" width="100%" height="100%"><rect width="360" height="640" fill="#e8f4f0"/><path d="M60 580 C80 520, 100 460, 130 400 S180 300, 220 240 S280 150, 300 80" stroke="#FB0A8B" stroke-width="6" fill="none"/><circle cx="60" cy="580" r="8" fill="#00E16E" stroke="#fff" stroke-width="2"/><circle cx="300" cy="80" r="8" fill="#FB0A8B" stroke="#fff" stroke-width="2"/></svg></div>';
          }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      </div>

      <div style={{
        position: 'absolute',
        top: '120px',
        left: '20px',
        right: '20px',
        background: '#fff',
        borderRadius: '16px',
        padding: '16px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div className="driver-avatar" style={{ 
            width: '48px', 
            height: '48px', 
            fontSize: '18px',
            position: 'relative',
            overflow: 'hidden',
            padding: 0,
            background: 'transparent'
          }}>
            <img 
              src="https://ptdt.taxi/sarah_aafee.png"
              alt="Sarah Aafee"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, #FB0A8B, #00E16E);color:#fff;font-size:18px;font-weight:700;">SA</div>';
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '50%'
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '15px', fontWeight: '300', color: '#4a4a4a' }}>
              Sarah Aafee
            </div>
            <div style={{ fontSize: '13px', color: '#666' }}>
              Toyota Prius • Pink
            </div>
          </div>
          <div style={{
            fontSize: '24px',
            fontWeight: '300',
            color: PINK
          }}>
            8 min
          </div>
        </div>
      </div>

      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        right: '0',
        background: '#fff',
        borderRadius: '24px 24px 0 0',
        padding: '24px',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          width: '40px',
          height: '5px',
          background: '#e5e5e5',
          borderRadius: '10px',
          margin: '0 auto 16px'
        }}></div>

        <h3 style={{ fontSize: '18px', fontWeight: '300', color: '#4a4a4a', marginBottom: '12px' }}>
          {t.tripProgress}
        </h3>

        <div style={{
          padding: '16px',
          background: '#f9f9f9',
          borderRadius: '14px',
          marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', color: '#666' }}>Distance remaining</span>
            <span style={{ fontSize: '14px', fontWeight: '300', color: '#333' }}>3.2 km</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', color: '#666' }}>Est. arrival</span>
            <span style={{ fontSize: '14px', fontWeight: '300', color: PINK }}>10:15 AM</span>
          </div>
        </div>

        <button style={{
          width: '100%',
          padding: '14px',
          background: '#fff',
          border: `2px solid ${PINK}`,
          borderRadius: '14px',
          fontSize: '15px',
          fontWeight: '300',
          color: PINK,
          cursor: 'pointer',
          boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.8), inset 0 -1px 2px rgba(0,0,0,0.05)'
        }}>
          📍 Share Location
        </button>
      </div>
    </div>
  );
}

// Screen 10: Trip Complete
function TripComplete({ t }) {
  return (
    <div style={{
      background: 'linear-gradient(180deg, #fff 0%, #f9f9f9 100%)',
      width: '100%',
      height: '100%',
      position: 'relative'
    }}>
      <div className="status-bar">
        <div className="status-left">
          <span style={{ color: '#000' }}>9:41</span>
        </div>
        <div className="status-right" style={{ color: '#000' }}>
          <span>📶</span>
          <span>📡</span>
          <span>🔋</span>
        </div>
      </div>

      <div className="screen-content" style={{ 
        paddingTop: '60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <div style={{
          width: '100px',
          height: '100px',
          background: `linear-gradient(135deg, ${PINK}, ${PINK_LIGHT})`,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px',
          marginBottom: '24px',
          boxShadow: `0 8px 24px ${PINK}60`,
          color: '#fff'
        }} className="fade-in">
          ✓
        </div>

        <h2 style={{
          fontSize: '28px',
          fontWeight: '300',
          color: '#4a4a4a',
          marginBottom: '12px'
        }} className="fade-in">
          {t.tripComplete}
        </h2>

        <p style={{
          fontSize: '15px',
          color: '#666',
          marginBottom: '32px'
        }} className="fade-in">
          Hope you had a safe journey!
        </p>

        <div className="card" style={{ width: '100%', animationDelay: '0.2s' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '300', color: '#666', marginBottom: '16px' }}>
            Trip Summary
          </h3>
          
          {[
            { label: t.fare, value: '$18.00' },
            { label: 'Distance', value: '5.2 km' },
            { label: 'Duration', value: '12 min' },
            { label: 'Payment', value: 'PTDT Wallet' }
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '10px 0',
              borderBottom: i < 3 ? '1px solid #f0f0f0' : 'none'
            }}>
              <span style={{ fontSize: '14px', color: '#666' }}>{item.label}</span>
              <span style={{ fontSize: '14px', fontWeight: '300', color: '#333' }}>{item.value}</span>
            </div>
          ))}

          <div style={{
            marginTop: '20px',
            padding: '20px',
            background: `linear-gradient(135deg, ${PINK}15, ${GREEN}08)`,
            borderRadius: '16px',
            border: `2px solid ${PINK}50`
          }}>
            <div style={{ fontSize: '14px', color: '#666', marginBottom: '8px' }}>
              {t.earned}
            </div>
            <div style={{ fontSize: '32px', fontWeight: '300', color: PINK }}>
              +7 PTDT
            </div>
            <div style={{ fontSize: '12px', color: GREEN, marginTop: '4px' }}>
              Added to your wallet
            </div>
          </div>
        </div>

        <div style={{ width: '100%', marginTop: '20px' }}>
          <button className="btn-primary" style={{ marginBottom: '12px' }}>
            Rate Your Driver ⭐
          </button>
          <button className="btn-secondary">
            {t.tipDriver} 💎
          </button>
        </div>
      </div>
    </div>
  );
}

// Screen 11: Wallet Screen
function WalletScreen({ t }) {
  return (
    <div style={{
      background: 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)',
      width: '100%',
      height: '100%',
      position: 'relative'
    }}>
      <div className="status-bar">
        <div className="status-left">
          <span>9:41</span>
        </div>
        <div className="status-right">
          <span>📶</span>
          <span>📡</span>
          <span>🔋</span>
        </div>
      </div>

      <div className="screen-content" style={{ paddingTop: '20px' }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '300',
          color: '#fff',
          marginBottom: '24px'
        }} className="fade-in">
          {t.wallet}
        </h2>

        <div style={{
          background: `linear-gradient(135deg, ${PINK}, ${GREEN})`,
          borderRadius: '24px',
          padding: '32px 24px',
          marginBottom: '24px',
          boxShadow: '0 8px 24px rgba(251,10,139,0.3)'
        }} className="fade-in">
          <div style={{ fontSize: '14px', color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>
            {t.balance}
          </div>
          <div style={{ fontSize: '48px', fontWeight: '300', color: '#fff', marginBottom: '4px' }}>
            1,254.50
          </div>
          <div style={{ fontSize: '16px', color: 'rgba(255,255,255,0.9)', fontWeight: '300' }}>
            PTDT
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            marginTop: '24px'
          }}>
            {[
              { icon: '📤', label: t.send },
              { icon: '📥', label: t.receive },
              { icon: '🔄', label: t.exchange }
            ].map((action, i) => (
              <button key={i} style={{
                padding: '12px',
                background: 'rgba(255,255,255,0.2)',
                backdropFilter: 'blur(10px)',
                border: 'none',
                borderRadius: '14px',
                color: '#fff',
                fontSize: '13px',
                fontWeight: '300',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px'
              }}>
                <span style={{ fontSize: '20px' }}>{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '20px',
          padding: '20px',
          border: '1px solid rgba(255,255,255,0.1)',
         animationDelay: '0.2s'
          }} className="fade-in">
          <h3 style={{ fontSize: '16px', fontWeight: '300', color: '#fff', marginBottom: '16px' }}>
            {t.transactions}
          </h3>

          {[
            { icon: '🚗', title: 'Ride to Downtown', amount: '-155.25', date: 'Today, 10:15 AM', type: 'negative' },
            { icon: '⭐', title: 'Weekly Bonus', amount: '+50.00', date: 'Yesterday', type: 'positive' },
            { icon: '🎁', title: 'Referral Reward', amount: '+25.00', date: 'Dec 15', type: 'positive' },
            { icon: '🚗', title: 'Ride to Airport', amount: '-125.00', date: 'Dec 14', type: 'negative' }
          ].map((txn, i) => (
            <div key={i} className="transaction-row" style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)'
            }}>
              <div className="transaction-icon" style={{
                background: 'rgba(255,255,255,0.1)'
              }}>
                {txn.icon}
              </div>
              <div className="transaction-details">
                <h5 style={{ color: '#fff' }}>{txn.title}</h5>
                <div className="date" style={{ color: '#999' }}>{txn.date}</div>
              </div>
              <div className={`transaction-amount ${txn.type}`}>
                {txn.amount} PTDT
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bottom-nav">
        <div className="nav-item">
          <div className="nav-icon">🏠</div>
          <span>Home</span>
        </div>
        <div className="nav-item">
          <div className="nav-icon">🚗</div>
          <span>Rides</span>
        </div>
        <div className="nav-item active">
          <div className="nav-icon">💎</div>
          <span>Wallet</span>
        </div>
        <div className="nav-item">
          <div className="nav-icon">👤</div>
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
}

// Screen 12: Profile Screen
function ProfileScreen({ t }) {
  return (
    <div style={{
      background: 'linear-gradient(180deg, #1a1a1a 0%, #2d2d2d 100%)',
      width: '100%',
      height: '100%',
      position: 'relative'
    }}>
      <div className="status-bar">
        <div className="status-left">
          <span>9:41</span>
        </div>
        <div className="status-right">
          <span>📶</span>
          <span>📡</span>
          <span>🔋</span>
        </div>
      </div>

      <div className="screen-content" style={{ paddingTop: '20px' }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }} className="fade-in">
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: `0 8px 24px ${PINK}40`,
            overflow: 'hidden',
            position: 'relative',
            background: `linear-gradient(135deg, ${PINK}, ${GREEN})`
          }}>
            <img 
              src="https://ptdt.taxi/jane_pryor.png"
              alt="Jane Pryor"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:42px;font-weight:800;"><div style="position:absolute;inset:0;background:radial-gradient(circle at 30% 30%, rgba(255,255,255,0.3), transparent 70%);"></div>JP</div>';
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover'
              }}
            />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '300', color: '#fff', marginBottom: '4px' }}>
            Jane Pryor
          </h2>
          <p style={{ fontSize: '14px', color: '#999' }}>
            jane.pryor@email.com
          </p>
        </div>

        <div className="card fade-in" style={{ 
          animationDelay: '0.1s',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <h3 style={{ fontSize: '16px', fontWeight: '300', color: '#999', marginBottom: '12px' }}>
            Account Stats
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '12px',
            textAlign: 'center'
          }}>
            {[
              { label: 'Rides', value: '42' },
              { label: 'Rating', value: '4.9⭐' },
              { label: 'Saved', value: '$127' }
            ].map((stat, i) => (
              <div key={i} style={{
                padding: '12px',
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.08)'
              }}>
                <div style={{ fontSize: '20px', fontWeight: '300', color: PINK, marginBottom: '4px' }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '12px', color: '#999' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card fade-in" style={{ 
          animationDelay: '0.2s',
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          {[
            { icon: '👤', label: 'Edit Profile', color: '#fff' },
            { icon: '🔔', label: 'Notifications', color: '#fff' },
            { icon: '🎁', label: 'Referral Program', color: GREEN },
            { icon: '💳', label: 'Payment Methods', color: '#fff' },
            { icon: '🛡️', label: 'Privacy & Safety', color: '#fff' },
            { icon: '❓', label: 'Help & Support', color: '#fff' },
            { icon: '⚙️', label: 'Settings', color: '#fff' }
          ].map((item, i) => (
            <div key={i} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '14px 0',
              borderBottom: i < 6 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              cursor: 'pointer'
            }}>
              <span style={{ fontSize: '22px' }}>{item.icon}</span>
              <span style={{ flex: 1, fontSize: '15px', fontWeight: '300', color: item.color }}>
                {item.label}
              </span>
              <span style={{ fontSize: '18px', color: '#666' }}>›</span>
            </div>
          ))}
        </div>

        <button style={{
          width: '100%',
          padding: '16px',
          background: 'transparent',
          border: `2px solid ${PINK}40`,
          borderRadius: '14px',
          color: PINK,
          fontSize: '15px',
          fontWeight: '300',
          cursor: 'pointer',
          marginTop: '16px'
        }}>
          Sign Out
        </button>
      </div>

      <div className="bottom-nav">
        <div className="nav-item">
          <div className="nav-icon">🏠</div>
          <span>Home</span>
        </div>
        <div className="nav-item">
          <div className="nav-icon">🚗</div>
          <span>Rides</span>
        </div>
        <div className="nav-item">
          <div className="nav-icon">💎</div>
          <span>Wallet</span>
        </div>
        <div className="nav-item active">
          <div className="nav-icon">👤</div>
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
}
