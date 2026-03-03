import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroScreen = ({ onComplete }) => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const [started, setStarted] = useState(false);
  const animationStartedRef = useRef(false);
  const audioRef = useRef(null);

  // Preload audio on mount so it's ready instantly when user clicks
  useEffect(() => {
    const audio = new Audio('/music.mp3');
    audio.preload = 'auto';
    audio.loop = false;
    audio.volume = 0.5;
    audioRef.current = audio;

    const markReady = () => setAudioReady(true);

    if (audio.readyState >= 4) {
      markReady();
    } else {
      audio.addEventListener('canplaythrough', markReady, { once: true });
    }

    return () => {
      audio.removeEventListener('canplaythrough', markReady);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // When user clicks "start", fire animation + music on the same tick
  const handleStart = () => {
    if (started) return;
    setStarted(true);
    animationStartedRef.current = false;
    window.animationStarted = false;

    // Small delay so the click prompt fades, then sync both
    setTimeout(() => {
      startAnimation();
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    }, 400);
  };

  const startAnimation = () => {
    if (window.animationStarted) return;
    window.animationStarted = true;

    const cursorLine1 = document.getElementById('cursorLine1');
    const cursorLine2 = document.getElementById('cursorLine2');
    const cult = document.getElementById('cult');
    const code = document.getElementById('code');
    const leftBracket = document.querySelector('#leftBracket .char');
    const rightBracket = document.querySelector('#rightBracket .char');

    const trustChars = Array.from(document.querySelectorAll('#trust .char'));
    const codeChars = Array.from(document.querySelectorAll('#code .char'));
    const commaChars = Array.from(document.querySelectorAll('#comma .char'));
    const nottheChars = Array.from(document.querySelectorAll('#notthe .char'));
    const cultChars = Array.from(document.querySelectorAll('#cult .char'));
    const exclaimChars = Array.from(document.querySelectorAll('#exclaim .char'));

    let delay = 0;
    const timingMultiplier = 1.0;
    const charSpeedSlow = 180 * timingMultiplier;
    const charSpeedNormal = 120 * timingMultiplier;
    const pauseShort = 250 * timingMultiplier;
    const pauseMedium = 400 * timingMultiplier;
    const pauseLong = 600 * timingMultiplier;
    const pauseBeforeCursorMove = 800 * timingMultiplier;

    // Step 1: Initial pause
    delay += 600 * timingMultiplier;
    setTimeout(() => cursorLine1?.classList.remove('hidden'), delay);
    delay += 300 * timingMultiplier;

    // Step 2: Type "Trust the "
    trustChars.forEach((char) => {
      setTimeout(() => {
        char.classList.add('visible');
      }, delay);
      delay += charSpeedSlow;
    });
    delay += pauseShort;

    // Step 3: Type "Code"
    codeChars.forEach((char) => {
      setTimeout(() => {
        char.classList.add('visible');
      }, delay);
      delay += charSpeedNormal;
    });
    delay += pauseShort;

    // Step 4: Type ","
    commaChars.forEach((char) => {
      setTimeout(() => {
        char.classList.add('visible');
      }, delay);
      delay += charSpeedNormal;
    });
    delay += pauseMedium;

    // Step 5: Cursor to line 2
    setTimeout(() => {
      cursorLine1?.classList.add('hidden');
      cursorLine2?.classList.remove('hidden');
    }, delay);
    delay += pauseShort;

    // Step 6: Type "// Not the "
    nottheChars.forEach((char) => {
      setTimeout(() => {
        char.classList.add('visible');
      }, delay);
      delay += charSpeedNormal;
    });
    delay += pauseShort;

    // Step 7: Type "Cult"
    cultChars.forEach((char) => {
      setTimeout(() => {
        char.classList.add('visible');
      }, delay);
      delay += charSpeedNormal;
    });
    delay += pauseShort;

    // Step 8: Type "!"
    exclaimChars.forEach((char) => {
      setTimeout(() => {
        char.classList.add('visible');
      }, delay);
      delay += charSpeedNormal;
    });
    delay += pauseLong;

    // Step 9: Bracket pop with particles
    setTimeout(() => {
      leftBracket?.classList.add('visible', 'pop');
      const rect = leftBracket?.getBoundingClientRect();
      if (rect) createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
    }, delay);
    delay += pauseMedium;

    setTimeout(() => {
      rightBracket?.classList.add('visible', 'pop');
      const rect = rightBracket?.getBoundingClientRect();
      if (rect) createParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);
      code?.classList.add('glow');
    }, delay);
    delay += pauseLong;

    // Step 10: Strikethrough with glitch
    setTimeout(() => {
      cult?.classList.add('strike', 'glitch');
    }, delay);
    delay += pauseMedium;

    // Step 11: Underline
    setTimeout(() => {
      cult?.classList.add('underline');
    }, delay);
    delay += pauseBeforeCursorMove;

    // Step 12: Cursor back to line 1
    setTimeout(() => {
      cursorLine2?.classList.add('hidden');
      cursorLine1?.classList.remove('hidden');
    }, delay);

    // Show button after animation completes
    setTimeout(() => {
      setAnimationComplete(true);
      setTimeout(() => setShowButton(true), 300);
    }, delay + 1000);
  };

  const createParticles = (x, y) => {
    const container = document.getElementById('particles');
    const particleCount = 12;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';

      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 50 + Math.random() * 50;
      const tx = Math.cos(angle) * velocity;
      const ty = Math.sin(angle) * velocity;

      particle.style.left = x + 'px';
      particle.style.top = y + 'px';
      particle.style.setProperty('--tx', tx + 'px');
      particle.style.setProperty('--ty', ty + 'px');
      particle.style.animation = `particleBurst 0.6s ease-out forwards`;

      container?.appendChild(particle);
      setTimeout(() => particle.remove(), 600);
    }
  };

  return (
    <>
      <style>{`
        .intro-screen-container {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: #0a0a0f;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        /* Animated grid background */
        .grid-bg {
          position: absolute;
          width: 200%;
          height: 200%;
          background-image: 
            linear-gradient(rgba(57, 191, 57, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(57, 191, 57, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
          pointer-events: none;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        /* Ambient glow */
        .ambient-glow {
          position: absolute;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(231, 53, 137, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          animation: pulse 4s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.1); opacity: 0.8; }
        }

        .slogan {
          font-size: clamp(24px, 6vw, 56px);
          font-family: 'Space Grotesk', sans-serif;
          line-height: 1.2;
          position: relative;
          z-index: 10;
          text-shadow: 0 0 20px rgba(0,0,0,0.5);
        }

        .line1, .line2 {
          display: block;
          white-space: nowrap;
        }

        .line2 {
          padding-left: 1.05em;
        }

        .char {
          display: none;
          position: relative;
        }

        .char.visible {
          display: inline;
        }

        .light .char {
          font-weight: 300;
          color: #e2e8f0;
          letter-spacing: -.05em;
        }

        .code {
          position: relative;
        }

        .code .char {
          font-family: 'Fira Code', monospace;
          font-weight: 700;
          color: #E73589;
          letter-spacing: -.01em;
          text-shadow: 0 0 10px rgba(231, 53, 137, 0.5);
        }

        .code.glow .char {
          animation: codeGlow 2s ease-in-out infinite alternate;
        }

        @keyframes codeGlow {
          from { text-shadow: 0 0 10px rgba(231, 53, 137, 0.5); }
          to { text-shadow: 0 0 20px rgba(231, 53, 137, 0.8), 0 0 40px rgba(231, 53, 137, 0.4); }
        }

        .gray .char {
          font-weight: 300;
          color: #64748b;
          letter-spacing: -.065em;
        }

        .cult {
          font-weight: 700;
          color: #002FFF;
          position: relative;
          letter-spacing: -.01em;
          display: inline;
        }

        .cult .char {
          color: #002FFF;
          font-weight: 700;
          transition: all 0.3s;
        }

        .cult.glitch .char {
          animation: glitch 0.3s ease forwards;
        }

        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        .cult::before {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          top: 50%;
          height: .08em;
          background: #FF2F00;
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          box-shadow: 0 0 10px rgba(255, 47, 0, 0.8);
        }

        .cult::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: .05em;
          height: .14em;
          background: #FF2F00;
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
          box-shadow: 0 0 10px rgba(255, 47, 0, 0.8);
        }

        .cult.strike::before {
          animation: drawLine 0.35s ease-out forwards;
        }

        .cult.underline::after {
          animation: drawLine 0.35s ease-out forwards;
        }

        @keyframes drawLine {
          to { transform: scaleX(1); }
        }

        .brackets .char {
          font-family: 'Fira Code', monospace;
          color: #57BF39;
          font-weight: 700;
          text-shadow: 0 0 15px rgba(87, 191, 57, 0.6);
        }

        .exclamation .char {
          font-weight: 700;
          color: #FF2F00;
          text-shadow: 0 0 10px rgba(255, 47, 0, 0.6);
        }

        @keyframes popIn {
          0% { transform: scale(0.5); opacity: 0; }
          70% { transform: scale(1.2); }
          100% { transform: scale(1); opacity: 1; }
        }

        .char.pop {
          animation: popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        .cursor {
          display: inline-block;
          width: 3px;
          height: 1.1em;
          background: #57BF39;
          vertical-align: text-bottom;
          margin-left: 2px;
          box-shadow: 0 0 10px rgba(87, 191, 57, 0.8);
        }

        .cursor.blink {
          animation: blink 0.6s infinite;
        }

        .cursor.hidden {
          display: none;
        }

        @keyframes blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }

        /* Particle effects container */
        .particles {
          position: absolute;
          pointer-events: none;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 5;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #57BF39;
          border-radius: 50%;
          pointer-events: none;
          opacity: 0;
        }

        @keyframes particleBurst {
          0% {
            transform: translate(0, 0) scale(1);
            opacity: 1;
          }
          100% {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
          }
        }

        /* Click-to-start overlay */
        .start-overlay {
          position: absolute;
          inset: 0;
          z-index: 100;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          background: transparent;
        }

        .start-prompt {
          font-family: 'Fira Code', monospace;
          font-size: clamp(14px, 2.5vw, 20px);
          color: #57BF39;
          letter-spacing: 0.1em;
          text-shadow: 0 0 15px rgba(87, 191, 57, 0.6);
          animation: promptPulse 2s ease-in-out infinite;
        }

        .start-prompt.loading {
          color: #64748b;
          text-shadow: none;
          animation: none;
        }

        @keyframes promptPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>

      <motion.div
        className="intro-screen-container"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid-bg"></div>
        <div className="ambient-glow"></div>
        <div className="particles" id="particles"></div>

        {/* Click-to-start gate — needed for browser audio autoplay policy */}
        <AnimatePresence>
          {!started && (
            <motion.div
              className="start-overlay"
              onClick={audioReady ? handleStart : undefined}
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <span className={`start-prompt ${audioReady ? '' : 'loading'}`}>
                {audioReady ? '[ click anywhere to begin ]' : '[ loading... ]'}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="slogan" id="slogan">
          <span className="line1" id="line1">
            <span className="light" id="trust">
              <span className="char">T</span>
              <span className="char">r</span>
              <span className="char">u</span>
              <span className="char">s</span>
              <span className="char">t</span>
              <span className="char"> </span>
              <span className="char">t</span>
              <span className="char">h</span>
              <span className="char">e</span>
              <span className="char"> </span>
            </span>
            <span className="brackets" id="leftBracket">
              <span className="char">{'{'}</span>
            </span>
            <span className="code" id="code">
              <span className="char">C</span>
              <span className="char">o</span>
              <span className="char">d</span>
              <span className="char">e</span>
            </span>
            <span className="brackets" id="rightBracket">
              <span className="char">{'}'}</span>
            </span>
            <span className="light" id="comma">
              <span className="char">,</span>
            </span>
            <span className="cursor hidden blink" id="cursorLine1"></span>
          </span>
          <span className="line2" id="line2">
            <span className="gray" id="notthe">
              <span className="char">/</span>
              <span className="char">/</span>
              <span className="char"> </span>
              <span className="char">N</span>
              <span className="char">o</span>
              <span className="char">t</span>
              <span className="char"> </span>
              <span className="char">t</span>
              <span className="char">h</span>
              <span className="char">e</span>
              <span className="char"> </span>
            </span>
            <span className="cult" id="cult">
              <span className="char">C</span>
              <span className="char">u</span>
              <span className="char">l</span>
              <span className="char">t</span>
            </span>
            <span className="exclamation" id="exclaim">
              <span className="char">!</span>
            </span>
            <span className="cursor hidden blink" id="cursorLine2"></span>
          </span>
        </div>

        {/* Button appears after animation */}
        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5, type: 'spring' }}
              onClick={onComplete}
              className="absolute bottom-20 px-8 py-4 bg-gradient-to-r from-pink-500 via-purple-600 to-emerald-500 text-white font-bold text-lg rounded-full shadow-2xl hover:scale-110 hover:shadow-[0_0_40px_rgba(236,72,153,0.8)] transition-all duration-300 font-montserrat z-20"
              style={{
                boxShadow: '0 0 30px rgba(236,72,153,0.6), 0 0 60px rgba(87,191,57,0.3)',
              }}
            >
              🚀 BUILDER MODE ACTIVATED
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default IntroScreen;