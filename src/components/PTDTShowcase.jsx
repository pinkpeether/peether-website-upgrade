import React, { useEffect, useMemo, useRef, useState } from "react";

var PINK = "#FB0A8B";
var GREEN = "#00E16E";
var PINK_LIGHT = "#FF3DA1";
var GREEN_LIGHT = "#00FF80";
var DARK_BG = "#0A0A0F";
var TOKEN_CONTRACT = "0x66c6Fc5E7F99272134a52DF9E88D94eD83E89278";
var STAKING_CONTRACT = "0xfa6A09A581447255BD916ad98cf852fEFbC72494";

var I18N = {
  en: {
    welcome: "Welcome to Pink Taxi", tagline: "Safe Rides. Real Rewards.",
    register: "Create Account", login: "Sign In",
    homeTitle: "Where to?", currentLocation: "Current Location", destination: "Enter Destination",
    selectVehicle: "Choose Your Ride", payment: "Payment Method", payWithPTDT: "Pay with PTDT",
    confirmRide: "Confirm Ride", arriving: "Arriving in",
    tripProgress: "Trip in Progress", tripComplete: "Trip Complete!",
    fare: "Fare", earned: "You Earned", tipDriver: "Tip Driver",
    send: "Send", receive: "Receive", exchange: "Exchange",
    transactions: "Recent Transactions",
  },
};

function useReducedMotion() {
  var ref = useState(false), reduced = ref[0], setReduced = ref[1];
  useEffect(function() {
    var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    var on = function() { setReduced(mq.matches); };
    on();
    if (mq.addEventListener) mq.addEventListener("change", on);
    return function() { if (mq.removeEventListener) mq.removeEventListener("change", on); };
  }, []);
  return reduced;
}

function useLiveTime() {
  var ref = useState(new Date()), time = ref[0], setTime = ref[1];
  useEffect(function() {
    var id = setInterval(function() { setTime(new Date()); }, 30000);
    return function() { clearInterval(id); };
  }, []);
  return time;
}

/* ========== SHARED COMPONENTS ========== */

/* Every screen MUST use this wrapper for proper containment */
function ScreenShell({ bg, children }) {
  return (
    <div style={{
      background: bg || "linear-gradient(180deg, #1a1a1a 0%, " + DARK_BG + " 100%)",
      width: "100%", height: "100%", position: "relative", overflow: "hidden"
    }}>
      {children}
    </div>
  );
}

/* Scrollable content area that stays within phone bounds */
function ScrollArea({ top, bottom, children, style }) {
  var t = top || 54;
  var b = bottom || 90;
  return (
    <div style={Object.assign({
      position: "absolute", top: t, left: 0, right: 0, bottom: b,
      overflowY: "auto", overflowX: "hidden", padding: "12px 16px",
      WebkitOverflowScrolling: "touch"
    }, style || {})}>
      {children}
    </div>
  );
}

function StatusBar(props) {
  var dark = props.dark !== false;
  var now = useLiveTime();
  var h = now.getHours(), m = now.getMinutes();
  var timeStr = (h > 12 ? h - 12 : h || 12) + ":" + (m < 10 ? "0" + m : m);
  var col = dark ? "#fff" : "#000";
  return (
    <div style={{
      position: "absolute", top: 0, left: 0, right: 0, height: 54,
      padding: "8px 20px 0", display: "flex", alignItems: "center",
      justifyContent: "space-between", zIndex: 99, color: col, fontSize: 15, fontWeight: 600
    }}>
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}><span>{timeStr}</span></div>
      <div style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13 }}>
        <span>📶</span><span>📡</span><span>🔋</span>
      </div>
    </div>
  );
}

function BalanceBar() {
  return (
    <div style={{
      position: "absolute", top: 54, left: 0, right: 0, padding: "10px 16px",
      background: "linear-gradient(135deg, rgba(251,10,139,0.1), rgba(0,225,110,0.1))",
      backdropFilter: "blur(10px)", borderBottom: "1px solid rgba(255,255,255,0.1)", zIndex: 98,
      display: "flex", alignItems: "center", justifyContent: "space-between"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#fff", fontSize: 13, fontWeight: 600 }}>
        <span style={{ fontSize: 18 }}>💎</span>
        <span style={{ color: GREEN, fontSize: 15, fontWeight: 700 }}>1,247.50</span>
        <span>PTDT</span>
      </div>
    </div>
  );
}

function BottomNav(props) {
  var active = props.active || "home";
  var items = [
    { key: "home", icon: "🏠", label: "Home" },
    { key: "rides", icon: "🚗", label: "Rides" },
    { key: "wallet", icon: "💎", label: "Wallet" },
    { key: "staking", icon: "📊", label: "Staking" },
    { key: "profile", icon: "👤", label: "Profile" },
  ];
  return (
    <div style={{
      position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
      background: "rgba(0,0,0,0.85)", backdropFilter: "blur(20px)",
      borderTop: "1px solid rgba(255,255,255,0.1)",
      display: "flex", alignItems: "center", justifyContent: "space-around",
      padding: "0 8px 16px", zIndex: 98
    }}>
      {items.map(function(item) {
        var isActive = active === item.key;
        return (
          <div key={item.key} style={{
            display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
            color: isActive ? GREEN : "#666", fontSize: 9, fontWeight: 500, cursor: "pointer"
          }}>
            <span style={{ fontSize: 18 }}>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function CopyButton(props) {
  var text = props.text;
  var label = props.label || "Copy";
  var ref = useState(false), copied = ref[0], setCopied = ref[1];
  var handleCopy = function() {
    try {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(function() { setCopied(false); }, 1500);
    } catch(e) { /* fallback */ }
  };
  return (
    <button onClick={handleCopy} style={{
      padding: "4px 10px", borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)",
      background: copied ? "rgba(0,225,110,0.2)" : "rgba(255,255,255,0.05)",
      color: copied ? GREEN : "#999", fontSize: 10, cursor: "pointer", fontWeight: 500,
      transition: "all 0.3s"
    }}>
      {copied ? "✓ Copied" : label}
    </button>
  );
}

/* Map */
function RealisticMap(props) {
  var showRoute = props.showRoute;
  var active = props.active;
  var durationMs = props.durationMs || 8000;
  var pathRef = useRef(null);
  var carRef = useRef(null);
  var ref = useState(0), progress = ref[0], setProgress = ref[1];

  useEffect(function() {
    if (!active || !showRoute) return;
    var raf;
    var start = performance.now();
    var loop = function(now) {
      var t = Math.min(1, (now - start) / durationMs);
      setProgress(t);
      if (t < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return function() { cancelAnimationFrame(raf); };
  }, [active, showRoute, durationMs]);

  useEffect(function() {
    if (!showRoute) return;
    var path = pathRef.current, car = carRef.current;
    if (!path || !car) return;
    var len = path.getTotalLength ? path.getTotalLength() : 0;
    var pt = path.getPointAtLength ? path.getPointAtLength(len * progress) : { x: 0, y: 0 };
    car.setAttribute("transform", "translate(" + (pt.x - 10) + "," + (pt.y - 10) + ")");
  }, [progress, showRoute]);

  return (
    <svg viewBox="0 0 360 640" width="100%" height="100%" style={{ background: "#f5f5f5" }}>
      <defs>
        <linearGradient id="routeG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={PINK} /><stop offset="100%" stopColor={GREEN} />
        </linearGradient>
      </defs>
      <rect width="360" height="640" fill="#e8f4f0" />
      {["M20 120 L340 125","M30 200 L320 205","M25 280 L335 285","M15 360 L345 365","M20 440 L330 445"].map(function(d,i) {
        return <path key={i} d={d} stroke="#d5d5d5" strokeWidth="4" fill="none" opacity=".7" />;
      })}
      {showRoute && <path ref={pathRef} d="M60 580 C80 520,100 460,130 400 S180 300,220 240 S280 150,300 80" stroke="url(#routeG)" strokeWidth="6" strokeLinecap="round" fill="none" />}
      {showRoute && <g ref={carRef}><circle cx="10" cy="10" r="10" fill={PINK} opacity=".3" /><circle cx="10" cy="10" r="6" fill={PINK} stroke="#fff" strokeWidth="2" /></g>}
      <g transform="translate(50,570)"><circle r="7" fill={GREEN} stroke="#fff" strokeWidth="2" /><text x="14" y="4" fontSize="10" fill="#333">Pickup</text></g>
      {showRoute && <g transform="translate(290,70)"><circle r="7" fill={PINK} stroke="#fff" strokeWidth="2" /><text x="14" y="4" fontSize="10" fill="#333">Drop-off</text></g>}
    </svg>
  );
}


/* ========================================================================
   MAIN COMPONENT
   ======================================================================== */
export default function PTDTShowcase(props) {
  var logoSrc = props.logoSrc;
  var autoplay = props.autoplay !== undefined ? props.autoplay : true;
  var loop = props.loop !== undefined ? props.loop : true;
  var lang = props.lang || "en";
  var phoneWidth = props.phoneWidth || 390;
  var t = I18N[lang] || I18N.en;
  var reduced = useReducedMotion();

  var SCREENS = useMemo(function() {
    return [
      { key: "home_screen", ms: 3500 },          // old — iPhone home
      { key: "splash", ms: 3000 },                // old — splash
      { key: "protocol_dashboard", ms: 5000 },    // NEW — protocol stats
      { key: "main_home", ms: 4500 },             // old — where to?
      { key: "staking_interface", ms: 5000 },      // NEW — staking tiers
      { key: "set_destination", ms: 4000 },        // old — destination
      { key: "fee_distribution", ms: 5500 },       // NEW — burn visualization
      { key: "vehicle_select", ms: 4200 },         // old — choose ride
      { key: "staking_simulator", ms: 6000 },      // NEW — interactive sim
      { key: "payment_method", ms: 3800 },         // old — pay with PTDT
      { key: "compliance_trust", ms: 4500 },       // NEW — audit/compliance
      { key: "confirm_ride", ms: 3500 },           // old — ride summary
      { key: "developer_hub", ms: 5000 },          // NEW — API + code
      { key: "driver_assigned", ms: 4500 },        // old — driver card
      { key: "wallet_enhanced", ms: 5000 },        // NEW — wallet + staking tab
      { key: "trip_progress", ms: 7000 },          // old — map animation
      { key: "profile_enhanced", ms: 4000 },       // NEW — profile + history
      { key: "trip_complete", ms: 4200 },          // old — trip done + settlement
    ];
  }, []);

  var ref1 = useState(0), index = ref1[0], setIndex = ref1[1];
  var ref2 = useState(autoplay && !reduced), playing = ref2[0], setPlaying = ref2[1];
  var timer = useRef(null);

  useEffect(function() {
    clearTimeout(timer.current);
    if (!playing) return;
    timer.current = setTimeout(function() {
      setIndex(function(i) {
        if (i >= SCREENS.length - 1) return loop ? 0 : SCREENS.length - 1;
        return i + 1;
      });
    }, SCREENS[index].ms);
    return function() { clearTimeout(timer.current); };
  }, [index, playing, loop, SCREENS]);

  var screen = SCREENS[index].key;
  var goNext = function() { setPlaying(false); setIndex(function(i) { return Math.min(i + 1, SCREENS.length - 1); }); };
  var goPrev = function() { setPlaying(false); setIndex(function(i) { return Math.max(i - 1, 0); }); };
  var togglePlay = function() { setPlaying(function(p) { return !p; }); };

  var css = "\n@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');\n.ptdt-showcase-wrap{--pink:" + PINK + ";--green:" + GREEN + ";font-family:'Poppins',-apple-system,sans-serif;color:#4a4a4a;position:relative}\n.ptdt-iphone-wrapper{position:relative;width:100%;max-width:" + phoneWidth + "px;aspect-ratio:390/844;margin:0 auto;filter:drop-shadow(0 10px 30px rgba(255,255,255,1)) drop-shadow(0 20px 50px rgba(253,253,253,1))}\n.ptdt-screen-container{position:absolute;top:3%;left:3%;right:3%;bottom:3%;background:#fff;border-radius:44px;overflow:hidden;z-index:1}\n.ptdt-iphone-border{position:absolute;inset:0;background-image:url(https://ptdt.taxi/iphone_border.png);background-size:100% 100%;background-repeat:no-repeat;pointer-events:none;z-index:10}\n.dynamic-island{position:absolute;top:0;left:50%;transform:translateX(-50%);width:126px;height:37px;background:#000;border-radius:0 0 20px 20px;z-index:100;display:flex;align-items:center;justify-content:center;gap:12px}\n.dynamic-island .camera{width:10px;height:10px;background:radial-gradient(circle,#1a3a4a,#000);border-radius:50%}\n.dynamic-island .speaker{width:60px;height:5px;background:#0a0a0a;border-radius:3px}\n.home-indicator{position:absolute;bottom:8px;left:50%;transform:translateX(-50%);width:130px;height:5px;background:rgba(255,255,255,.3);border-radius:10px;z-index:101}\n.nav-arrows{position:absolute;top:50%;transform:translateY(-50%);width:100%;left:0;display:flex;justify-content:space-between;padding:0 10px;pointer-events:none;z-index:200}\n@media(min-width:768px){.nav-arrows{width:calc(100% + 160px);left:-80px;padding:0}}\n.nav-arrow{width:50px;height:50px;background:rgba(251,10,139,.15);backdrop-filter:blur(10px);border:2px solid rgba(251,10,139,.3);border-radius:50%;display:flex;align-items:center;justify-content:center;color:" + PINK + ";font-size:24px;font-weight:700;cursor:pointer;pointer-events:all;transition:all .3s;opacity:.6}\n@media(min-width:768px){.nav-arrow{width:60px;height:60px;font-size:28px}}\n.nav-arrow:hover{opacity:1;background:rgba(251,10,139,.25);transform:scale(1.1)}\n.nav-arrow.disabled{opacity:.2;cursor:not-allowed;pointer-events:none}\n.showcase-controls{display:flex;align-items:center;justify-content:center;gap:16px;margin-top:16px;font-family:'Poppins',sans-serif}\n.play-btn{width:36px;height:36px;border-radius:50%;background:rgba(251,10,139,.15);border:1px solid rgba(251,10,139,.3);color:" + PINK + ";font-size:14px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .3s}\n.play-btn:hover{background:rgba(251,10,139,.25)}\n.screen-counter{font-size:13px;color:#999;font-weight:400;letter-spacing:.5px}\n@keyframes fadeIn{from{opacity:0;transform:translateY(15px)}to{opacity:1;transform:translateY(0)}}\n.fade-in{animation:fadeIn .4s ease-out}\n@keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(251,10,139,.4)}50%{box-shadow:0 0 0 20px rgba(251,10,139,0)}}\n@keyframes burnGrow{from{width:0}}\n.burn-anim{animation:burnGrow 1s ease-out forwards}\n.staker-anim{animation:burnGrow 1s .2s ease-out forwards}\n@keyframes flame{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.3) translateY(-2px)}}\n.flame{display:inline-block;animation:flame .5s ease-in-out infinite}\n";

  return (
    <div className="ptdt-showcase-wrap" style={{ position: "relative", maxWidth: "100%", overflow: "hidden" }}>
      <style>{css}</style>
      <div className="nav-arrows">
        <button className={"nav-arrow" + (index === 0 ? " disabled" : "")} onClick={goPrev}>‹</button>
        <button className={"nav-arrow" + (index === SCREENS.length - 1 ? " disabled" : "")} onClick={goNext}>›</button>
      </div>
      <div className="ptdt-iphone-wrapper">
        <div className="ptdt-screen-container">
          <div className="dynamic-island"><div className="camera"></div><div className="speaker"></div></div>
          {screen === "home_screen" && <ScreenHomePhone />}
          {screen === "splash" && <ScreenSplash t={t} />}
          {screen === "main_home" && <ScreenMainHome t={t} />}
          {screen === "set_destination" && <ScreenSetDest />}
          {screen === "vehicle_select" && <ScreenVehicle t={t} />}
          {screen === "payment_method" && <ScreenPayment t={t} />}
          {screen === "fee_distribution" && <ScreenFeeDistribution />}
          {screen === "confirm_ride" && <ScreenConfirmRide />}
          {screen === "driver_assigned" && <ScreenDriverAssigned t={t} />}
          {screen === "trip_progress" && <ScreenTripProgress t={t} active={playing} />}
          {screen === "trip_complete" && <ScreenTripComplete t={t} />}
          {screen === "protocol_dashboard" && <ScreenProtocolDashboard />}
          {screen === "staking_interface" && <ScreenStakingInterface />}
          {screen === "staking_simulator" && <ScreenStakingSimulator />}
          {screen === "wallet_enhanced" && <ScreenWalletEnhanced t={t} />}
          {screen === "profile_enhanced" && <ScreenProfileEnhanced />}
          {screen === "developer_hub" && <ScreenDeveloperHub />}
          {screen === "compliance_trust" && <ScreenComplianceTrust />}
          <div className="home-indicator"></div>
        </div>
        <div className="ptdt-iphone-border"></div>
      </div>
      <div className="showcase-controls">
        <button className="play-btn" onClick={togglePlay}>{playing ? "⏸" : "▶"}</button>
        <span className="screen-counter">{(index + 1) + " / " + SCREENS.length}</span>
      </div>
    </div>
  );
}


/* ========================================================================
   SCREEN COMPONENTS — ALL use ScreenShell for proper containment
   ======================================================================== */

/* 1: iPhone Home */
function ScreenHomePhone() {
  return (
    <ScreenShell bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
      <StatusBar dark={true} />
      <div style={{ position: "absolute", top: 90, left: 16, right: 16, display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
        {[
          { n: "Messages", i: "💬", c: "#25D366" }, { n: "Camera", i: "📷", c: "#8E8E93" },
          { n: "Photos", i: "🖼️", c: "#FFB800" }, { n: "Maps", i: "🗺️", c: "#5AC8FA" },
          { n: "Music", i: "🎵", c: "#FA2D48" }, { n: "Settings", i: "⚙️", c: "#8E8E93" },
          { n: "Wallet", i: "💳", c: "#000" }, { n: "Peether", i: "img", c: PINK, s: true },
        ].map(function(a, idx) {
          return (
            <div key={idx} style={{ textAlign: "center" }}>
              <div style={{
                width: 54, height: 54, background: a.s ? "#000" : a.c, borderRadius: 13,
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: a.i === "img" ? 0 : 26,
                margin: "0 auto 6px", boxShadow: a.s ? "0 6px 20px rgba(251,10,139,.4)" : "0 3px 10px rgba(0,0,0,.15)",
                animation: a.s ? "pulse 2s ease-in-out infinite" : "none", overflow: "hidden"
              }}>
                {a.i === "img" ? <img src="https://ptdt.taxi/pinkptdtlogo.png" alt="P" onError={function(e){e.currentTarget.src="/ptdtlogo.png";}} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : a.i}
              </div>
              <div style={{ fontSize: 10, color: "#fff", fontWeight: a.s ? 600 : 400, textShadow: "0 1px 2px rgba(0,0,0,.3)" }}>{a.n}</div>
            </div>
          );
        })}
      </div>
      <div style={{ position: "absolute", bottom: 90, left: 16, right: 16, background: "rgba(255,255,255,.15)", backdropFilter: "blur(20px)", borderRadius: 22, padding: 10, display: "flex", justifyContent: "space-around" }}>
        {["📞","✉️","🌐","📱"].map(function(ic,i){ return <div key={i} style={{ width: 54, height: 54, background: "rgba(255,255,255,.2)", borderRadius: 13, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24 }}>{ic}</div>; })}
      </div>
    </ScreenShell>
  );
}

/* 2: Splash */
function ScreenSplash(props) {
  var t = props.t;
  return (
    <ScreenShell bg="linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 100%)">
      <StatusBar dark={true} />
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "30px 24px", textAlign: "center" }}>
        <img src="https://ptdt.taxi/pinkptdtlogo.png" alt="PTDT" onError={function(e){e.currentTarget.src="/ptdtlogo.png";}}
          style={{ width: 140, height: "auto", marginBottom: 20, filter: "drop-shadow(0 0 25px rgba(251,10,139,.5))" }} />
        <div style={{ fontSize: 18, fontWeight: 300, color: "#666", marginBottom: 2 }}>Welcome to</div>
        <div style={{ fontSize: 32, fontWeight: 600, color: PINK, marginBottom: 2 }}>PEETHER</div>
        <div style={{ fontSize: 15, fontWeight: 300, color: "#fff", marginBottom: 2 }}>PTDT Protocol</div>
        <div style={{ fontSize: 11, color: GREEN, marginBottom: 28, letterSpacing: 1 }}>Decentralized Settlement for Ride-Hailing</div>
        <div style={{ width: "100%", maxWidth: 260 }}>
          <button style={{ width: "100%", padding: 14, background: "linear-gradient(135deg," + PINK + "," + PINK_LIGHT + ")", color: "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 10 }}>{t.register}</button>
          <button style={{ width: "100%", padding: 14, background: "transparent", color: PINK, border: "2px solid " + PINK, borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 12 }}>{t.login}</button>
          <div style={{ fontSize: 10, color: "#555" }}>60% Burned • 40% to Stakers • Audited 9.2/10</div>
        </div>
      </div>
    </ScreenShell>
  );
}

/* 3: Main Home */
function ScreenMainHome(props) {
  var t = props.t;
  return (
    <ScreenShell bg="linear-gradient(180deg, #fff 0%, #f9f9f9 100%)">
      <StatusBar dark={false} />
      <BalanceBar />
      <ScrollArea top={96} bottom={80}>
        <div style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0 2px 10px rgba(0,0,0,.06)", marginBottom: 12 }}>
          <h2 style={{ fontSize: 22, fontWeight: 300, color: "#4a4a4a", marginBottom: 16 }}>{t.homeTitle}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#f5f5f5", border: "2px solid #e5e5e5", borderRadius: 14, padding: 14, marginBottom: 10, fontSize: 14 }}>
            <span>📍</span><span style={{ color: "#999" }}>{t.currentLocation}</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#f5f5f5", border: "2px solid #e5e5e5", borderRadius: 14, padding: 14, fontSize: 14 }}>
            <span>🎯</span><span style={{ color: "#333" }}>{t.destination}</span>
          </div>
        </div>
        <div style={{ background: "#fff", borderRadius: 16, padding: 16, boxShadow: "0 2px 10px rgba(0,0,0,.06)" }}>
          <h3 style={{ fontSize: 14, fontWeight: 300, color: "#666", marginBottom: 10 }}>Recent</h3>
          {[{n:"Downtown Mall",i:"🏬"},{n:"Central Station",i:"🚉"},{n:"City Hospital",i:"🏥"}].map(function(d,i){
            return <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, background: "#f5f5f5", borderRadius: 10, marginBottom: 6, fontSize: 13 }}><span style={{fontSize:20}}>{d.i}</span><span style={{flex:1,color:"#333"}}>{d.n}</span><span style={{color:"#ccc"}}>→</span></div>;
          })}
        </div>
      </ScrollArea>
      <BottomNav active="home" />
    </ScreenShell>
  );
}

/* 4: Set Destination */
function ScreenSetDest() {
  return (
    <ScreenShell bg="#fff">
      <StatusBar dark={false} />
      <div style={{ position: "absolute", top: 54, left: 0, right: 0, height: "55%" }}><RealisticMap active={false} showRoute={false} /></div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#fff", borderRadius: "22px 22px 0 0", padding: "20px 16px", boxShadow: "0 -4px 20px rgba(0,0,0,.1)" }}>
        <div style={{ width: 36, height: 4, background: "#e0e0e0", borderRadius: 4, margin: "0 auto 14px" }}></div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#f5f5f5", borderRadius: 12, padding: 12, marginBottom: 10, fontSize: 13 }}>
          <span style={{color:GREEN}}>📍</span><span style={{color:"#333"}}>123 Current Street</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#f5f5f5", borderRadius: 12, padding: 12, marginBottom: 16, fontSize: 13 }}>
          <span style={{color:PINK}}>🎯</span><span style={{color:"#999"}}>Enter destination</span>
        </div>
        <button style={{ width: "100%", padding: 14, background: "linear-gradient(135deg," + PINK + "," + PINK_LIGHT + ")", color: "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Confirm Location</button>
      </div>
    </ScreenShell>
  );
}

/* 5: Vehicle Select */
function ScreenVehicle(props) {
  var t = props.t;
  return (
    <ScreenShell>
      <StatusBar dark={true} />
      <BalanceBar />
      <ScrollArea top={96} bottom={80}>
        <h2 style={{ fontSize: 20, fontWeight: 300, color: "#fff", marginBottom: 14 }}>{t.selectVehicle}</h2>
        {[
          { n: "Pink Standard", ic: "🚗", p: "$12.50", tm: "5 min", earn: "+5 PTDT" },
          { n: "Pink Comfort", ic: "🚙", p: "$18.00", tm: "4 min", earn: "+7 PTDT", sel: true },
          { n: "Pink XL", ic: "🚐", p: "$24.50", tm: "6 min", earn: "+10 PTDT" }
        ].map(function(r, i) {
          return (
            <div key={i} style={{
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: r.sel ? "rgba(251,10,139,.1)" : "rgba(255,255,255,.04)",
              border: r.sel ? "2px solid " + PINK : "1px solid rgba(255,255,255,.08)",
              borderRadius: 14, padding: 14, marginBottom: 10
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 42, height: 42, background: "linear-gradient(135deg," + PINK + "," + PINK_LIGHT + ")", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: "#fff" }}>{r.ic}</div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 3 }}>{r.n}</div>
                  <div style={{ fontSize: 11, color: GREEN, background: "rgba(0,225,110,.12)", padding: "2px 8px", borderRadius: 6, display: "inline-block" }}>💎 {r.earn}</div>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>{r.p}</div>
                <div style={{ fontSize: 11, color: "#888" }}>{r.tm}</div>
              </div>
            </div>
          );
        })}
        <button style={{ width: "100%", padding: 14, marginTop: 10, background: "linear-gradient(135deg," + PINK + "," + PINK_LIGHT + ")", color: "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Continue</button>
      </ScrollArea>
      <BottomNav active="rides" />
    </ScreenShell>
  );
}

/* 6: Payment Method */
function ScreenPayment(props) {
  var t = props.t;
  return (
    <ScreenShell>
      <StatusBar dark={true} />
      <BalanceBar />
      <ScrollArea top={96} bottom={80}>
        <h2 style={{ fontSize: 20, fontWeight: 300, color: "#fff", marginBottom: 14 }}>{t.payment}</h2>
        <div style={{ background: "rgba(255,255,255,.05)", borderRadius: 14, padding: 14, border: "1px solid rgba(255,255,255,.08)", marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{t.payWithPTDT}</div>
              <div style={{ fontSize: 11, color: PINK }}>Save 10% on this ride</div>
            </div>
            <div style={{ width: 44, height: 24, background: PINK, borderRadius: 12, position: "relative" }}>
              <div style={{ position: "absolute", top: 3, right: 3, width: 18, height: 18, background: "#fff", borderRadius: "50%" }}></div>
            </div>
          </div>
          <div style={{ padding: 12, background: "linear-gradient(135deg,rgba(251,10,139,.12),rgba(0,225,110,.06))", borderRadius: 10, border: "1px solid rgba(251,10,139,.2)" }}>
            <div style={{ fontSize: 12, color: "#999", marginBottom: 4 }}>Ride Cost</div>
            <div style={{ fontSize: 24, fontWeight: 300, color: PINK }}>155.25 PTDT</div>
            <div style={{ fontSize: 11, color: GREEN, marginTop: 2 }}>Settlement: 60% burned, 40% stakers</div>
          </div>
        </div>
        <div style={{ background: "rgba(255,255,255,.05)", borderRadius: 14, padding: 14, border: "1px solid rgba(255,255,255,.08)" }}>
          <div style={{ fontSize: 12, color: "#888", marginBottom: 10 }}>Other Methods</div>
          {[{i:"💳",n:"Credit Card",d:"•••• 4592"},{i:"💵",n:"Cash",d:"Pay driver"},{i:"🏦",n:"Bank",d:"Direct debit"}].map(function(m,i){
            return <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, background: "rgba(255,255,255,.03)", borderRadius: 10, marginBottom: 6, opacity: .5, border: "1px solid rgba(255,255,255,.06)" }}>
              <span style={{fontSize:20}}>{m.i}</span><div style={{flex:1}}><div style={{fontSize:13,color:"#fff"}}>{m.n}</div><div style={{fontSize:11,color:"#888"}}>{m.d}</div></div>
            </div>;
          })}
        </div>
      </ScrollArea>
      <BottomNav active="rides" />
    </ScreenShell>
  );
}

/* 7: Fee Distribution — animated burn visualization */
function ScreenFeeDistribution() {
  var fare = 155.25;
  var burned = (fare * 0.6).toFixed(2);
  var stakers = (fare * 0.4).toFixed(2);
  return (
    <ScreenShell>
      <StatusBar dark={true} />
      <ScrollArea top={54} bottom={80}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>Protocol Settlement</div>
          <h2 style={{ fontSize: 20, fontWeight: 300, color: "#fff", marginBottom: 2 }}>Fee Distribution</h2>
          <p style={{ fontSize: 11, color: "#555" }}>Every ride settles on-chain</p>
        </div>
        <div style={{ textAlign: "center", padding: 16, background: "rgba(255,255,255,.03)", borderRadius: 14, border: "1px solid rgba(255,255,255,.06)", marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: "#888" }}>Ride Fare</div>
          <div style={{ fontSize: 30, fontWeight: 300, color: "#fff" }}>{fare} <span style={{ fontSize: 14, color: "#888" }}>PTDT</span></div>
          <div style={{ fontSize: 10, color: "#666" }}>≈ $15.53 USD</div>
        </div>
        <div style={{ display: "flex", borderRadius: 10, overflow: "hidden", height: 34, background: "rgba(255,255,255,.04)", marginBottom: 14 }}>
          <div className="burn-anim" style={{ width: "60%", background: "linear-gradient(90deg," + PINK + "," + PINK_LIGHT + ")", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#fff" }}>
            <span className="flame" style={{ marginRight: 3 }}>🔥</span> 60% Burn
          </div>
          <div className="staker-anim" style={{ width: "40%", background: "linear-gradient(90deg," + GREEN + "," + GREEN_LIGHT + ")", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 600, color: "#000" }}>
            💎 40% Stakers
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          <div style={{ padding: 14, borderRadius: 12, background: "rgba(251,10,139,.06)", border: "1px solid rgba(251,10,139,.15)", textAlign: "center" }}>
            <div className="flame" style={{ fontSize: 24, marginBottom: 6 }}>🔥</div>
            <div style={{ fontSize: 18, fontWeight: 300, color: PINK }}>{burned}</div>
            <div style={{ fontSize: 10, color: "#999" }}>Burned Forever</div>
          </div>
          <div style={{ padding: 14, borderRadius: 12, background: "rgba(0,225,110,.06)", border: "1px solid rgba(0,225,110,.15)", textAlign: "center" }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>💎</div>
            <div style={{ fontSize: 18, fontWeight: 300, color: GREEN }}>{stakers}</div>
            <div style={{ fontSize: 10, color: "#999" }}>To Stakers</div>
          </div>
        </div>
        <div style={{ padding: 12, borderRadius: 12, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.05)", textAlign: "center" }}>
          <p style={{ fontSize: 11, color: "#888", lineHeight: 1.6, margin: 0 }}>Supply only goes down. Real yield from real usage. Not minted, not printed.</p>
          <div style={{ marginTop: 8, fontSize: 10, color: PINK, fontWeight: 500 }}>Trust the {"{"} Code {"}"}, // Not the Cult!</div>
        </div>
      </ScrollArea>
      <BottomNav active="rides" />
    </ScreenShell>
  );
}

/* 8: Confirm Ride */
function ScreenConfirmRide() {
  return (
    <ScreenShell bg="#fff">
      <StatusBar dark={false} />
      <div style={{ position: "absolute", top: 54, left: 0, right: 0, height: "45%" }}><RealisticMap showRoute={true} /></div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#fff", borderRadius: "22px 22px 0 0", padding: "16px 16px 20px", boxShadow: "0 -4px 20px rgba(0,0,0,.1)" }}>
        <div style={{ width: 36, height: 4, background: "#e0e0e0", borderRadius: 4, margin: "0 auto 12px" }}></div>
        <h3 style={{ fontSize: 17, fontWeight: 300, color: "#4a4a4a", marginBottom: 10 }}>Ride Summary</h3>
        {[{l:"Vehicle",v:"Pink Comfort 🚙"},{l:"Distance",v:"5.2 km"},{l:"Duration",v:"12 min"},{l:"Payment",v:"PTDT 💎"},{l:"Settlement",v:"On-chain ⛓️"}].map(function(r,i){
          return <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #f0f0f0", fontSize: 13 }}><span style={{color:"#666"}}>{r.l}</span><span style={{color:"#333",fontWeight:300}}>{r.v}</span></div>;
        })}
        <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", marginTop: 6 }}>
          <span style={{ fontSize: 15, color: "#4a4a4a" }}>Total</span>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 18, fontWeight: 300, color: PINK }}>155.25 PTDT</div>
            <div style={{ fontSize: 10, color: GREEN }}>60% burned • 40% stakers</div>
          </div>
        </div>
        <button style={{ width: "100%", padding: 14, marginTop: 8, background: "linear-gradient(135deg," + PINK + "," + PINK_LIGHT + ")", color: "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>Request Pink Ride</button>
      </div>
    </ScreenShell>
  );
}

/* 9: Driver Assigned */
function ScreenDriverAssigned(props) {
  return (
    <ScreenShell bg="#fff">
      <StatusBar dark={false} />
      <div style={{ position: "absolute", top: 54, left: 0, right: 0, height: "50%" }}><RealisticMap active={true} showRoute={true} durationMs={4000} /></div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#fff", borderRadius: "22px 22px 0 0", padding: "16px 16px 20px", boxShadow: "0 -4px 20px rgba(0,0,0,.1)" }}>
        <div style={{ width: 36, height: 4, background: "#e0e0e0", borderRadius: 4, margin: "0 auto 12px" }}></div>
        <div style={{ textAlign: "center", padding: 12, background: "rgba(0,225,110,.06)", borderRadius: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: "#666" }}>{props.t.arriving}</div>
          <div style={{ fontSize: 28, fontWeight: 300, color: GREEN }}>3 min</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, background: "#f9f9f9", borderRadius: 14 }}>
          <div style={{ width: 50, height: 50, borderRadius: "50%", overflow: "hidden", background: "linear-gradient(135deg," + PINK + "," + GREEN + ")" }}>
            <img src="https://ptdt.taxi/sarah_aafee.png" alt="SA" onError={function(e){e.currentTarget.style.display="none";}} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#4a4a4a" }}>Sarah Aafee</div>
            <div style={{ fontSize: 12, color: "#888" }}>⭐ 4.9 • Toyota Prius</div>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 10 }}>
          <button style={{ padding: 12, background: "#f5f5f5", border: "none", borderRadius: 12, fontSize: 14, color: "#333", cursor: "pointer" }}>📞 Call</button>
          <button style={{ padding: 12, background: "#f5f5f5", border: "none", borderRadius: 12, fontSize: 14, color: "#333", cursor: "pointer" }}>💬 Message</button>
        </div>
      </div>
    </ScreenShell>
  );
}

/* 10: Trip Progress */
function ScreenTripProgress(props) {
  return (
    <ScreenShell bg="#fff">
      <StatusBar dark={false} />
      <div style={{ position: "absolute", top: 54, left: 0, right: 0, bottom: 160 }}>
        <RealisticMap active={props.active} showRoute={true} durationMs={6000} />
      </div>
      <div style={{ position: "absolute", top: 110, left: 14, right: 14, background: "#fff", borderRadius: 14, padding: 12, boxShadow: "0 3px 12px rgba(0,0,0,.1)", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", overflow: "hidden", background: "linear-gradient(135deg," + PINK + "," + GREEN + ")" }}>
          <img src="https://ptdt.taxi/sarah_aafee.png" alt="SA" onError={function(e){e.currentTarget.style.display="none";}} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <div style={{ flex: 1 }}><div style={{ fontSize: 13, color: "#4a4a4a" }}>Sarah Aafee</div><div style={{ fontSize: 11, color: "#888" }}>Toyota Prius</div></div>
        <div style={{ fontSize: 20, fontWeight: 300, color: PINK }}>8 min</div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#fff", borderRadius: "22px 22px 0 0", padding: "16px 16px 20px", boxShadow: "0 -4px 20px rgba(0,0,0,.1)" }}>
        <div style={{ width: 36, height: 4, background: "#e0e0e0", borderRadius: 4, margin: "0 auto 12px" }}></div>
        <h3 style={{ fontSize: 16, fontWeight: 300, color: "#4a4a4a", marginBottom: 10 }}>{props.t.tripProgress}</h3>
        <div style={{ padding: 12, background: "#f9f9f9", borderRadius: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: 12 }}><span style={{color:"#666"}}>Remaining</span><span style={{color:"#333"}}>3.2 km</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}><span style={{color:"#666"}}>Est. arrival</span><span style={{color:PINK}}>10:15 AM</span></div>
        </div>
      </div>
    </ScreenShell>
  );
}

/* 11: Trip Complete */
function ScreenTripComplete(props) {
  var t = props.t;
  return (
    <ScreenShell bg="linear-gradient(180deg, #fff 0%, #f9f9f9 100%)">
      <StatusBar dark={false} />
      <ScrollArea top={54} bottom={0}>
        <div style={{ textAlign: "center", paddingTop: 30, marginBottom: 16 }}>
          <div style={{ width: 70, height: 70, background: "linear-gradient(135deg," + PINK + "," + PINK_LIGHT + ")", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 34, margin: "0 auto 14px", color: "#fff", boxShadow: "0 6px 20px rgba(251,10,139,.4)" }}>✓</div>
          <h2 style={{ fontSize: 22, fontWeight: 300, color: "#4a4a4a", marginBottom: 4 }}>{t.tripComplete}</h2>
          <p style={{ fontSize: 12, color: "#888" }}>Settled on-chain via PTDT Protocol</p>
        </div>
        <div style={{ background: "#fff", borderRadius: 14, padding: 14, boxShadow: "0 2px 10px rgba(0,0,0,.06)", marginBottom: 12 }}>
          {[{l:t.fare,v:"$18.00"},{l:"Distance",v:"5.2 km"},{l:"Duration",v:"12 min"}].map(function(r,i){
            return <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: "1px solid #f0f0f0", fontSize: 13 }}><span style={{color:"#666"}}>{r.l}</span><span style={{color:"#333"}}>{r.v}</span></div>;
          })}
          <div style={{ marginTop: 12, padding: 12, background: "linear-gradient(135deg,rgba(251,10,139,.06),rgba(0,225,110,.04))", borderRadius: 12, border: "1px solid rgba(251,10,139,.15)" }}>
            <div style={{ fontSize: 10, color: "#999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Protocol Settlement</div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: 16, color: PINK }}>🔥 93.15</div><div style={{ fontSize: 9, color: "#999" }}>Burned</div></div>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: 16, color: GREEN }}>💎 62.10</div><div style={{ fontSize: 9, color: "#999" }}>Stakers</div></div>
            </div>
          </div>
        </div>
        <button style={{ width: "100%", padding: 14, background: "linear-gradient(135deg," + PINK + "," + PINK_LIGHT + ")", color: "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", marginBottom: 8 }}>Rate Driver ⭐</button>
        <button style={{ width: "100%", padding: 14, background: "transparent", color: PINK, border: "2px solid " + PINK, borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>{t.tipDriver} 💎</button>
      </ScrollArea>
    </ScreenShell>
  );
}


/* ========================================================================
   PHASE 2 SCREENS
   ======================================================================== */

/* 12: Protocol Dashboard */
function ScreenProtocolDashboard() {
  return (
    <ScreenShell>
      <StatusBar dark={true} />
      <ScrollArea top={54} bottom={80}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: 2 }}>PTDT Protocol</div>
          <h2 style={{ fontSize: 20, fontWeight: 300, color: "#fff" }}>Live Dashboard</h2>
        </div>
        {/* Stats grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          {[
            { label: "Total Staked", value: "24,850", unit: "PTDT", color: GREEN },
            { label: "Total Burned", value: "6", unit: "PTDT", color: PINK },
            { label: "Holders", value: "445+", unit: "", color: "#fff" },
            { label: "Rewards Paid", value: "1,247", unit: "PTDT", color: GREEN },
          ].map(function(s, i) {
            return (
              <div key={i} style={{
                padding: 14, borderRadius: 12,
                background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
                textAlign: "center"
              }}>
                <div style={{ fontSize: 20, fontWeight: 300, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: 10, color: "#888", marginTop: 2 }}>{s.unit ? s.label + " (" + s.unit + ")" : s.label}</div>
              </div>
            );
          })}
        </div>
        {/* Burn bar */}
        <div style={{ padding: 14, borderRadius: 12, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: "#999", marginBottom: 8 }}>Fee Distribution Model</div>
          <div style={{ display: "flex", borderRadius: 8, overflow: "hidden", height: 28, marginBottom: 6 }}>
            <div style={{ width: "60%", background: "linear-gradient(90deg," + PINK + "," + PINK_LIGHT + ")", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", fontWeight: 600 }}>🔥 60% Burn</div>
            <div style={{ width: "40%", background: "linear-gradient(90deg," + GREEN + "," + GREEN_LIGHT + ")", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#000", fontWeight: 600 }}>💎 40% Stakers</div>
          </div>
          <div style={{ fontSize: 10, color: "#666", textAlign: "center" }}>Supply: 100K PTDT (deflationary)</div>
        </div>
        {/* Contracts */}
        <div style={{ padding: 14, borderRadius: 12, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", marginBottom: 14 }}>
          <div style={{ fontSize: 12, color: "#999", marginBottom: 10 }}>Contracts</div>
          <div style={{ marginBottom: 8 }}>
            <div style={{ fontSize: 10, color: "#666", marginBottom: 3 }}>Token</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 10, color: "#aaa", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{TOKEN_CONTRACT}</span>
              <CopyButton text={TOKEN_CONTRACT} />
            </div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: "#666", marginBottom: 3 }}>Staking</div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ fontSize: 10, color: "#aaa", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{STAKING_CONTRACT}</span>
              <CopyButton text={STAKING_CONTRACT} />
            </div>
          </div>
        </div>
        {/* Chain info */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          {["BNB Chain","Audited 9.2/10","LP Locked","OFAC Cleared"].map(function(b,i){
            return <div key={i} style={{ padding: "4px 10px", borderRadius: 10, background: "rgba(0,225,110,.08)", border: "1px solid rgba(0,225,110,.15)", fontSize: 9, color: GREEN, fontWeight: 500 }}>{b}</div>;
          })}
        </div>
      </ScrollArea>
      <BottomNav active="staking" />
    </ScreenShell>
  );
}

/* 13: Staking Interface */
function ScreenStakingInterface() {
  var tiers = [
    { name: "Bronze", min: 10, days: 30, apy: 12, color: "#CD7F32" },
    { name: "Silver", min: 100, days: 60, apy: 15, color: "#94A3B8" },
    { name: "Gold", min: 500, days: 90, apy: 18, color: "#EAB308" },
  ];
  return (
    <ScreenShell>
      <StatusBar dark={true} />
      <ScrollArea top={54} bottom={80}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: 2 }}>Earn Real Yield</div>
          <h2 style={{ fontSize: 20, fontWeight: 300, color: "#fff" }}>PTDT Staking</h2>
          <p style={{ fontSize: 11, color: "#666" }}>Rewards from fees, not inflation</p>
        </div>
        {tiers.map(function(tier, i) {
          return (
            <div key={i} style={{
              padding: 14, borderRadius: 14, marginBottom: 10,
              background: "rgba(255,255,255,.03)",
              border: "1px solid " + tier.color + "40"
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: tier.color + "20", border: "1px solid " + tier.color + "40", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                    {tier.name === "Bronze" ? "🥉" : tier.name === "Silver" ? "🥈" : "🥇"}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 600, color: "#fff" }}>{tier.name}</div>
                    <div style={{ fontSize: 10, color: "#888" }}>{tier.days} day lock</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 22, fontWeight: 300, color: GREEN }}>{tier.apy}%</div>
                  <div style={{ fontSize: 9, color: "#888" }}>APY</div>
                </div>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#888", padding: "6px 0", borderTop: "1px solid rgba(255,255,255,.06)" }}>
                <span>Min: {tier.min} PTDT</span>
                <span>Real yield from fees</span>
              </div>
            </div>
          );
        })}
        <button style={{ width: "100%", padding: 14, background: "linear-gradient(135deg," + PINK + "," + PINK_LIGHT + ")", color: "#fff", border: "none", borderRadius: 14, fontSize: 15, fontWeight: 700, cursor: "pointer", marginTop: 6 }}>Stake Now</button>
        <div style={{ textAlign: "center", fontSize: 10, color: "#666", marginTop: 10 }}>
          Staking contract: <span style={{ color: "#999" }}>{STAKING_CONTRACT.slice(0, 10)}...{STAKING_CONTRACT.slice(-6)}</span>
        </div>
      </ScrollArea>
      <BottomNav active="staking" />
    </ScreenShell>
  );
}

/* 14: Staking Simulator */
function ScreenStakingSimulator() {
  var ref1 = useState(100), amount = ref1[0], setAmount = ref1[1];
  var ref2 = useState(1), tierIdx = ref2[0], setTierIdx = ref2[1];
  var tiers = [
    { name: "Bronze", apy: 12, days: 30 },
    { name: "Silver", apy: 15, days: 60 },
    { name: "Gold", apy: 18, days: 90 },
  ];
  var tier = tiers[tierIdx];
  var yearly = (amount * tier.apy / 100);
  var monthly = yearly / 12;
  var periodReward = (amount * tier.apy / 100 * tier.days / 365);
  var usdRate = 0.10;

  return (
    <ScreenShell>
      <StatusBar dark={true} />
      <ScrollArea top={54} bottom={80}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: 2 }}>Interactive</div>
          <h2 style={{ fontSize: 20, fontWeight: 300, color: "#fff" }}>Staking Simulator</h2>
        </div>
        {/* Amount control */}
        <div style={{ padding: 14, borderRadius: 14, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: "#888", marginBottom: 8 }}>Stake Amount (PTDT)</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <button onClick={function(){setAmount(function(a){return Math.max(10,a-50);});}} style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(251,10,139,.15)", border: "1px solid rgba(251,10,139,.3)", color: PINK, fontSize: 18, cursor: "pointer" }}>−</button>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 300, color: "#fff" }}>{amount}</div>
              <div style={{ fontSize: 10, color: "#888" }}>≈ ${(amount * usdRate).toFixed(2)} USD</div>
            </div>
            <button onClick={function(){setAmount(function(a){return Math.min(5000,a+50);});}} style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(0,225,110,.15)", border: "1px solid rgba(0,225,110,.3)", color: GREEN, fontSize: 18, cursor: "pointer" }}>+</button>
          </div>
          {/* Quick amounts */}
          <div style={{ display: "flex", gap: 6, marginTop: 10, justifyContent: "center" }}>
            {[10,100,500,1000].map(function(v){
              var isActive = amount === v;
              return <button key={v} onClick={function(){setAmount(v);}} style={{
                padding: "4px 10px", borderRadius: 8, fontSize: 10, cursor: "pointer",
                background: isActive ? "rgba(251,10,139,.2)" : "rgba(255,255,255,.05)",
                border: isActive ? "1px solid " + PINK : "1px solid rgba(255,255,255,.08)",
                color: isActive ? PINK : "#999"
              }}>{v}</button>;
            })}
          </div>
        </div>
        {/* Tier selector */}
        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          {tiers.map(function(ti, i) {
            var isActive = tierIdx === i;
            return (
              <button key={i} onClick={function(){setTierIdx(i);}} style={{
                flex: 1, padding: "10px 6px", borderRadius: 12, cursor: "pointer", textAlign: "center",
                background: isActive ? "rgba(251,10,139,.12)" : "rgba(255,255,255,.03)",
                border: isActive ? "1px solid " + PINK : "1px solid rgba(255,255,255,.06)",
                color: isActive ? "#fff" : "#888"
              }}>
                <div style={{ fontSize: 16, fontWeight: 600, color: isActive ? GREEN : "#666" }}>{ti.apy}%</div>
                <div style={{ fontSize: 10 }}>{ti.name}</div>
                <div style={{ fontSize: 9, color: "#666" }}>{ti.days}d lock</div>
              </button>
            );
          })}
        </div>
        {/* Results */}
        <div style={{ padding: 14, borderRadius: 14, background: "linear-gradient(135deg,rgba(251,10,139,.06),rgba(0,225,110,.04))", border: "1px solid rgba(255,255,255,.08)" }}>
          <div style={{ fontSize: 11, color: "#999", marginBottom: 10, textTransform: "uppercase", letterSpacing: 1 }}>Estimated Rewards</div>
          {[
            { label: tier.days + "-day reward", value: periodReward.toFixed(2), usd: (periodReward * usdRate).toFixed(2) },
            { label: "Monthly", value: monthly.toFixed(2), usd: (monthly * usdRate).toFixed(2) },
            { label: "Yearly", value: yearly.toFixed(2), usd: (yearly * usdRate).toFixed(2) },
          ].map(function(r, i) {
            return (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,.06)" : "none" }}>
                <span style={{ fontSize: 12, color: "#888" }}>{r.label}</span>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 14, fontWeight: 300, color: GREEN }}>+{r.value} PTDT</div>
                  <div style={{ fontSize: 9, color: "#666" }}>≈ ${r.usd}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ textAlign: "center", fontSize: 10, color: "#555", marginTop: 10 }}>Real yield from protocol fees. Not financial advice.</div>
      </ScrollArea>
      <BottomNav active="staking" />
    </ScreenShell>
  );
}

/* 15: Enhanced Wallet */
function ScreenWalletEnhanced(props) {
  var t = props.t;
  var ref = useState(0), tab = ref[0], setTab = ref[1];
  return (
    <ScreenShell>
      <StatusBar dark={true} />
      <ScrollArea top={54} bottom={80}>
        {/* Balance */}
        <div style={{ textAlign: "center", padding: "20px 0 16px", background: "linear-gradient(135deg,rgba(251,10,139,.08),rgba(0,225,110,.06))", borderRadius: 16, marginBottom: 14 }}>
          <div style={{ fontSize: 11, color: "#999" }}>Total Balance</div>
          <div style={{ fontSize: 32, fontWeight: 300, color: "#fff" }}>1,247.50</div>
          <div style={{ fontSize: 12, color: GREEN }}>PTDT</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 14 }}>
            {[{i:"📤",l:t.send},{i:"📥",l:t.receive},{i:"🔄",l:t.exchange}].map(function(a,i){
              return <button key={i} style={{ padding: "8px 14px", background: "rgba(255,255,255,.1)", border: "none", borderRadius: 10, color: "#fff", fontSize: 11, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}><span style={{fontSize:16}}>{a.i}</span>{a.l}</button>;
            })}
          </div>
        </div>
        {/* Tabs */}
        <div style={{ display: "flex", marginBottom: 12, background: "rgba(255,255,255,.04)", borderRadius: 10, padding: 3 }}>
          {["Transactions","Staking"].map(function(label, i) {
            var isActive = tab === i;
            return <button key={i} onClick={function(){setTab(i);}} style={{
              flex: 1, padding: "8px 0", borderRadius: 8, border: "none", cursor: "pointer",
              background: isActive ? "rgba(251,10,139,.15)" : "transparent",
              color: isActive ? "#fff" : "#888", fontSize: 12, fontWeight: isActive ? 600 : 400
            }}>{label}</button>;
          })}
        </div>
        {tab === 0 && (
          <div>
            {[
              { i: "🚗", n: "Ride to Downtown", a: "-155.25", d: "Today", type: "neg" },
              { i: "⭐", n: "Weekly Bonus", a: "+50.00", d: "Yesterday", type: "pos" },
              { i: "🎁", n: "Referral Reward", a: "+25.00", d: "Dec 15", type: "pos" },
              { i: "🚗", n: "Ride to Airport", a: "-125.00", d: "Dec 14", type: "neg" }
            ].map(function(tx, i) {
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: 10, background: "rgba(255,255,255,.03)", borderRadius: 10, marginBottom: 6, border: "1px solid rgba(255,255,255,.05)" }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,.06)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>{tx.i}</div>
                  <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 500, color: "#fff" }}>{tx.n}</div><div style={{ fontSize: 10, color: "#888" }}>{tx.d}</div></div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: tx.type === "pos" ? GREEN : PINK }}>{tx.a} PTDT</div>
                </div>
              );
            })}
          </div>
        )}
        {tab === 1 && (
          <div>
            <div style={{ padding: 14, borderRadius: 14, background: "rgba(234,179,8,.06)", border: "1px solid rgba(234,179,8,.2)", marginBottom: 12 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <div><div style={{ fontSize: 14, fontWeight: 600, color: "#fff" }}>Gold Tier Active</div><div style={{ fontSize: 11, color: "#888" }}>18% APY • 90 day lock</div></div>
                <div style={{ fontSize: 20, fontWeight: 600, color: "#EAB308" }}>🥇</div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 8 }}>
                <div style={{ padding: 10, background: "rgba(255,255,255,.04)", borderRadius: 10, textAlign: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 300, color: GREEN }}>500</div>
                  <div style={{ fontSize: 9, color: "#888" }}>Staked PTDT</div>
                </div>
                <div style={{ padding: 10, background: "rgba(255,255,255,.04)", borderRadius: 10, textAlign: "center" }}>
                  <div style={{ fontSize: 16, fontWeight: 300, color: GREEN }}>12.45</div>
                  <div style={{ fontSize: 9, color: "#888" }}>Pending Rewards</div>
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              <button style={{ padding: 12, background: "linear-gradient(135deg," + GREEN + "20," + GREEN + "10)", border: "1px solid " + GREEN + "30", borderRadius: 12, color: GREEN, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Claim</button>
              <button style={{ padding: 12, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 12, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Upgrade</button>
            </div>
            <div style={{ textAlign: "center", fontSize: 10, color: "#666", marginTop: 12 }}>Lifetime rewards: 87.30 PTDT (≈ $8.73)</div>
          </div>
        )}
      </ScrollArea>
      <BottomNav active="wallet" />
    </ScreenShell>
  );
}


/* ========================================================================
   PHASE 3 SCREENS
   ======================================================================== */

/* 16: Profile Enhanced */
function ScreenProfileEnhanced() {
  return (
    <ScreenShell>
      <StatusBar dark={true} />
      <ScrollArea top={54} bottom={80}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{
            width: 72, height: 72, borderRadius: "50%", margin: "0 auto 10px",
            background: "linear-gradient(135deg," + PINK + "," + GREEN + ")",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 6px 20px rgba(251,10,139,.3)", overflow: "hidden"
          }}>
            <img src="https://ptdt.taxi/jane_pryor.png" alt="JP"
              onError={function(e){ e.currentTarget.style.display="none"; e.currentTarget.parentElement.innerHTML='<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:#fff;font-size:28px;font-weight:700">JP</div>'; }}
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{ fontSize: 18, fontWeight: 300, color: "#fff", marginBottom: 2 }}>Jane Pryor</div>
          <div style={{ fontSize: 11, color: "#888" }}>jane.pryor@email.com</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 14 }}>
          {[
            { v: "42", l: "Rides", c: PINK },
            { v: "4.9\u2B50", l: "Rating", c: "#fff" },
            { v: "$127", l: "Saved", c: GREEN }
          ].map(function(s, i) {
            return (
              <div key={i} style={{ padding: 10, background: "rgba(255,255,255,.04)", borderRadius: 10, border: "1px solid rgba(255,255,255,.06)", textAlign: "center" }}>
                <div style={{ fontSize: 17, fontWeight: 300, color: s.c }}>{s.v}</div>
                <div style={{ fontSize: 9, color: "#888" }}>{s.l}</div>
              </div>
            );
          })}
        </div>
        <div style={{ padding: 14, borderRadius: 14, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", marginBottom: 12 }}>
          <div style={{ fontSize: 12, color: "#999", marginBottom: 10 }}>Staking History</div>
          {[
            { tier: "Gold", amount: 500, days: "90d", apy: "18%", status: "Active", color: "#EAB308" },
            { tier: "Silver", amount: 100, days: "60d", apy: "15%", status: "Done", color: "#94A3B8" },
            { tier: "Bronze", amount: 50, days: "30d", apy: "12%", status: "Done", color: "#CD7F32" },
          ].map(function(h, i) {
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,.05)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: h.color + "18", border: "1px solid " + h.color + "30", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>
                    {h.tier === "Gold" ? "\uD83E\uDD47" : h.tier === "Silver" ? "\uD83E\uDD48" : "\uD83E\uDD49"}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, color: "#fff" }}>{h.tier} \u2022 {h.amount} PTDT</div>
                    <div style={{ fontSize: 9, color: "#888" }}>{h.days} @ {h.apy}</div>
                  </div>
                </div>
                <div style={{ fontSize: 10, color: h.status === "Active" ? GREEN : "#666", fontWeight: 500 }}>{h.status}</div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
          <div style={{ padding: 12, borderRadius: 12, background: "rgba(0,225,110,.06)", border: "1px solid rgba(0,225,110,.12)", textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 300, color: GREEN }}>87.30</div>
            <div style={{ fontSize: 9, color: "#888" }}>Total Rewards (PTDT)</div>
          </div>
          <div style={{ padding: 12, borderRadius: 12, background: "rgba(251,10,139,.06)", border: "1px solid rgba(251,10,139,.12)", textAlign: "center" }}>
            <div style={{ fontSize: 16, fontWeight: 300, color: PINK }}>{"\uD83D\uDD25"} 12,345</div>
            <div style={{ fontSize: 9, color: "#888" }}>Burn Contribution</div>
          </div>
        </div>
        <div style={{ padding: 14, borderRadius: 14, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)" }}>
          {["\uD83D\uDC64 Edit Profile","\uD83D\uDD14 Notifications","\uD83C\uDF81 Referral Program","\uD83D\uDEE1\uFE0F Privacy & Safety","\u2699\uFE0F Settings"].map(function(item, idx) {
            return (
              <div key={idx} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: idx < 4 ? "1px solid rgba(255,255,255,.05)" : "none" }}>
                <span style={{ flex: 1, fontSize: 13, color: "#fff", fontWeight: 300 }}>{item}</span>
                <span style={{ fontSize: 14, color: "#555" }}>{"\u203A"}</span>
              </div>
            );
          })}
        </div>
      </ScrollArea>
      <BottomNav active="profile" />
    </ScreenShell>
  );
}

/* 17: Developer Hub */
function ScreenDeveloperHub() {
  return (
    <ScreenShell>
      <StatusBar dark={true} />
      <ScrollArea top={54} bottom={80}>
        <div style={{ textAlign: "center", marginBottom: 14 }}>
          <div style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: 2 }}>For Developers</div>
          <h2 style={{ fontSize: 20, fontWeight: 300, color: "#fff" }}>PTDT API</h2>
          <p style={{ fontSize: 11, color: "#666" }}>Integrate settlement into any platform</p>
        </div>
        <div style={{ padding: 14, borderRadius: 14, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: "#999", marginBottom: 10 }}>Core Endpoints</div>
          {[
            { method: "POST", path: "/v1/settlement", desc: "Submit ride fare for settlement" },
            { method: "GET", path: "/v1/staking/pools", desc: "Live staking pool stats" },
            { method: "GET", path: "/v1/token/supply", desc: "Supply & burn metrics" },
          ].map(function(ep, i) {
            return (
              <div key={i} style={{ padding: "8px 0", borderBottom: i < 2 ? "1px solid rgba(255,255,255,.05)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                  <span style={{ padding: "2px 6px", borderRadius: 4, fontSize: 9, fontWeight: 700, background: ep.method === "POST" ? "rgba(251,10,139,.15)" : "rgba(0,225,110,.15)", color: ep.method === "POST" ? PINK : GREEN }}>{ep.method}</span>
                  <span style={{ fontSize: 11, color: "#fff", fontFamily: "monospace" }}>{ep.path}</span>
                </div>
                <div style={{ fontSize: 10, color: "#888" }}>{ep.desc}</div>
              </div>
            );
          })}
        </div>
        <div style={{ padding: 14, borderRadius: 14, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: "#999", marginBottom: 8 }}>Quick Start</div>
          <div style={{ padding: 12, borderRadius: 10, background: "#0d0d12", border: "1px solid rgba(255,255,255,.08)", fontFamily: "'Courier New',monospace", fontSize: 10, lineHeight: 1.6, color: "#ccc", overflowX: "auto", whiteSpace: "pre" }}>{"// Settle a ride fare\nfetch('https://api.ptdt.taxi\n  /v1/settlement', {\n  method: 'POST',\n  headers: {\n    'Content-Type':\n    'application/json'\n  },\n  body: JSON.stringify({\n    fare: 18.00,\n    currency: 'USD'\n  })\n})"}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
          {[{i:"\uD83D\uDCD6",t:"Full API Docs",s:"ptdt.taxi/ptdt-docs"},{i:"\uD83D\uDD17",t:"GitHub",s:"Open Source"}].map(function(c,i){
            return <div key={i} style={{ padding: 12, borderRadius: 12, background: i===0?"rgba(251,10,139,.06)":"rgba(0,225,110,.06)", border: "1px solid " + (i===0?"rgba(251,10,139,.12)":"rgba(0,225,110,.12)"), textAlign: "center" }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>{c.i}</div>
              <div style={{ fontSize: 11, color: "#fff" }}>{c.t}</div>
              <div style={{ fontSize: 9, color: "#888" }}>{c.s}</div>
            </div>;
          })}
        </div>
        <div style={{ padding: 12, borderRadius: 12, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)" }}>
          <div style={{ fontSize: 10, color: "#888", marginBottom: 6 }}>Token Contract</div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 9, color: "#aaa", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "monospace" }}>{TOKEN_CONTRACT}</span>
            <CopyButton text={TOKEN_CONTRACT} />
          </div>
        </div>
      </ScrollArea>
      <BottomNav active="profile" />
    </ScreenShell>
  );
}

/* 18: Compliance & Trust */
function ScreenComplianceTrust() {
  return (
    <ScreenShell>
      <StatusBar dark={true} />
      <ScrollArea top={54} bottom={80}>
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 10, color: "#888", textTransform: "uppercase", letterSpacing: 2 }}>Verified Globally</div>
          <h2 style={{ fontSize: 20, fontWeight: 300, color: "#fff" }}>Trust & Compliance</h2>
          <p style={{ fontSize: 11, color: "#666" }}>Solo-built. Verified globally. Staking live.</p>
        </div>
        {[
          { icon: "\uD83D\uDEE1\uFE0F", title: "Smart Contract Audit", value: "9.2 / 10", desc: "de.fi scanner. No proxy. Immutable.", color: GREEN },
          { icon: "\uD83C\uDDFA\uD83C\uDDF8", title: "OFAC Cleared", value: "U.S. Treasury", desc: "SDN sanctions list \u2014 CLEARED", color: "#60A5FA" },
          { icon: "\uD83C\uDDEC\uD83C\uDDE7", title: "OFSI Cleared", value: "UK Treasury", desc: "UK sanctions list \u2014 CLEARED", color: "#F472B6" },
          { icon: "\uD83D\uDD0D", title: "Blockchair AML", value: "Clean", desc: "AML compliance \u2014 CLEAN", color: GREEN },
          { icon: "\uD83C\uDFE2", title: "UK Registered", value: "Companies House", desc: "Pink Taxi Group Ltd.", color: "#fff" },
          { icon: "\uD83D\uDD12", title: "LP Locked", value: "Verified", desc: "LPTimeLock contract on-chain", color: GREEN },
        ].map(function(b, i) {
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: 12, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 12, marginBottom: 8 }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{b.icon}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{b.title}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: b.color }}>{b.value}</div>
                </div>
                <div style={{ fontSize: 9, color: "#888" }}>{b.desc}</div>
              </div>
            </div>
          );
        })}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginTop: 6, marginBottom: 12 }}>
          <div style={{ padding: 10, borderRadius: 10, background: "rgba(251,10,139,.06)", border: "1px solid rgba(251,10,139,.12)", textAlign: "center" }}>
            <div style={{ fontSize: 14, marginBottom: 2 }}>{"\uD83D\uDC0B"}</div>
            <div style={{ fontSize: 10, color: "#fff" }}>Anti-Whale</div>
            <div style={{ fontSize: 8, color: "#888" }}>Max tx limits</div>
          </div>
          <div style={{ padding: 10, borderRadius: 10, background: "rgba(0,225,110,.06)", border: "1px solid rgba(0,225,110,.12)", textAlign: "center" }}>
            <div style={{ fontSize: 14, marginBottom: 2 }}>{"\uD83D\uDD25"}</div>
            <div style={{ fontSize: 10, color: "#fff" }}>Deflationary</div>
            <div style={{ fontSize: 8, color: "#888" }}>Supply only goes down</div>
          </div>
        </div>
        <div style={{ textAlign: "center", padding: 12, borderRadius: 12, background: "linear-gradient(135deg,rgba(251,10,139,.06),rgba(0,225,110,.04))", border: "1px solid rgba(255,255,255,.06)" }}>
          <div style={{ fontSize: 12, color: PINK, fontWeight: 500 }}>Trust the { } Code { }, // Not the Cult!</div>
          <div style={{ fontSize: 9, color: "#888", marginTop: 4 }}>Contract: {TOKEN_CONTRACT.slice(0,10)}...{TOKEN_CONTRACT.slice(-6)}</div>
        </div>
      </ScrollArea>
      <BottomNav active="profile" />
    </ScreenShell>
  );
}
