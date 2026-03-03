import { useEffect, useRef, useState } from "react";

/**
 * SloganAnimation — "Trust the {Code}, // Not the Cult!"
 * Ported from slogan_white-background.html as a React component.
 * Speed boosted ~25%. Colors matched to PTDT brand.
 * 
 * Brand colors:
 *   Pink (Code):    #FB0A8B
 *   Green (brackets): #10B981
 *   Blue (Cult):    #002FFF
 *   Red (strike/underline/!): #FF2F00
 *   Light text:     #94a3b8 (slate-400 for dark bg)
 *   Gray (//):      #6B7280
 */

const BRAND_PINK = "#FB0A8B";
const BRAND_GREEN = "#10B981";
const CULT_BLUE = "#002FFF";
const STRIKE_RED = "#FF2F00";
const LIGHT_TEXT = "#6B7280";
const GRAY_TEXT = "#94a3b8";

export default function SloganAnimation() {
  const containerRef = useRef(null);
  const startedRef = useRef(false);
  const [inView, setInView] = useState(false);

  // Trigger when scrolled into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView || startedRef.current) return;
    startedRef.current = true;

    const container = containerRef.current;
    if (!container) return;

    const cursorLine1 = container.querySelector("#cursorLine1");
    const cursorLine2 = container.querySelector("#cursorLine2");
    const cult = container.querySelector("#cult");
    const leftBracket = container.querySelector("#leftBracket .char");
    const rightBracket = container.querySelector("#rightBracket .char");

    const trustChars = Array.from(container.querySelectorAll("#trust .char"));
    const codeChars = Array.from(container.querySelectorAll("#code .char"));
    const commaChars = Array.from(container.querySelectorAll("#comma .char"));
    const nottheChars = Array.from(container.querySelectorAll("#notthe .char"));
    const cultChars = Array.from(container.querySelectorAll("#cult .char"));
    const exclaimChars = Array.from(container.querySelectorAll("#exclaim .char"));

    let delay = 0;

    // ~25% faster than original
    const M = 0.75;
    const charSpeedSlow = 200 * M;
    const charSpeedNormal = 150 * M;
    const pauseShort = 300 * M;
    const pauseMedium = 500 * M;
    const pauseLong = 700 * M;
    const pauseBeforeCursorMove = 1000 * M;

    // Step 1: cursor appears
    delay += 400 * M;
    setTimeout(() => { cursorLine1.classList.remove("hidden"); }, delay);
    delay += 300 * M;

    // Step 2: Type "Trust the "
    trustChars.forEach((char) => {
      setTimeout(() => { char.classList.add("visible"); }, delay);
      delay += charSpeedSlow;
    });
    delay += pauseShort;

    // Step 3: Type "Code"
    codeChars.forEach((char) => {
      setTimeout(() => { char.classList.add("visible"); }, delay);
      delay += charSpeedNormal;
    });
    delay += pauseShort;

    // Step 4: Type ","
    commaChars.forEach((char) => {
      setTimeout(() => { char.classList.add("visible"); }, delay);
      delay += charSpeedNormal;
    });
    delay += pauseMedium;

    // Step 5: Cursor to line 2
    setTimeout(() => {
      cursorLine1.classList.add("hidden");
      cursorLine2.classList.remove("hidden");
    }, delay);
    delay += pauseShort;

    // Step 6: Type "// Not the "
    nottheChars.forEach((char) => {
      setTimeout(() => { char.classList.add("visible"); }, delay);
      delay += charSpeedNormal;
    });
    delay += pauseShort;

    // Step 7: Type "Cult"
    cultChars.forEach((char) => {
      setTimeout(() => { char.classList.add("visible"); }, delay);
      delay += charSpeedNormal;
    });
    delay += pauseShort;

    // Step 8: Type "!"
    exclaimChars.forEach((char) => {
      setTimeout(() => { char.classList.add("visible"); }, delay);
      delay += charSpeedNormal;
    });
    delay += pauseLong;

    // Step 9: Left bracket pops
    setTimeout(() => { leftBracket.classList.add("visible", "pop"); }, delay);
    delay += pauseMedium;

    // Step 10: Right bracket pops
    setTimeout(() => { rightBracket.classList.add("visible", "pop"); }, delay);
    delay += pauseLong;

    // Step 11: Strikethrough
    setTimeout(() => { cult.classList.add("strike"); }, delay);
    delay += pauseMedium;

    // Step 12: Underline
    setTimeout(() => { cult.classList.add("underline"); }, delay);
    delay += pauseBeforeCursorMove;

    // Step 13: Cursor back to line 1
    setTimeout(() => {
      cursorLine2.classList.add("hidden");
      cursorLine1.classList.remove("hidden");
    }, delay);
  }, [inView]);

  return (
    <>
      <style>{`
        .slogan-anim {
          font-size: clamp(24px, 5vw, 52px);
          font-family: 'Space Grotesk', sans-serif;
          line-height: 1.15;
          text-align: center;
        }
        .slogan-anim .line1,
        .slogan-anim .line2 {
          display: block;
          white-space: nowrap;
        }
        .slogan-anim .line2 {
          padding-left: 1.05em;
        }
        .slogan-anim .char {
          display: none;
        }
        .slogan-anim .char.visible {
          display: inline;
        }
        .slogan-anim .light .char {
          font-weight: 300;
          color: ${LIGHT_TEXT};
          letter-spacing: -.05em;
        }
        .slogan-anim .code .char {
          font-family: 'Fira Code', monospace;
          font-weight: 700;
          color: ${BRAND_PINK};
          letter-spacing: -.01em;
        }
        .slogan-anim .gray .char {
          font-weight: 300;
          color: ${GRAY_TEXT};
          letter-spacing: -.065em;
        }
        .slogan-anim .cult {
          font-weight: 700;
          color: ${CULT_BLUE};
          position: relative;
          letter-spacing: -.01em;
          display: inline;
        }
        .slogan-anim .cult .char {
          color: ${CULT_BLUE};
          font-weight: 700;
        }
        .slogan-anim .cult::before {
          content: '';
          position: absolute;
          left: 0; right: 0; top: 50%;
          height: .06em;
          background: ${STRIKE_RED};
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
        }
        .slogan-anim .cult::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: .05em;
          height: .12em;
          background: ${STRIKE_RED};
          border-radius: 2px;
          transform: scaleX(0);
          transform-origin: left;
        }
        .slogan-anim .cult.strike::before {
          animation: sloganDrawLine 0.35s ease-out forwards;
        }
        .slogan-anim .cult.underline::after {
          animation: sloganDrawLine 0.35s ease-out forwards;
        }
        @keyframes sloganDrawLine {
          to { transform: scaleX(1); }
        }
        .slogan-anim .brackets .char {
          font-family: 'Fira Code', monospace;
          color: ${BRAND_GREEN};
          font-weight: 700;
        }
        .slogan-anim .exclamation .char {
          font-weight: 700;
          color: ${STRIKE_RED};
        }
        @keyframes sloganPopIn {
          0% { transform: scale(0.5); }
          70% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        .slogan-anim .char.pop {
          animation: sloganPopIn 0.35s forwards;
        }
        .slogan-anim .cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: ${LIGHT_TEXT};
          vertical-align: text-bottom;
          margin-left: 1px;
        }
        .slogan-anim .cursor.blink {
          animation: sloganBlink 0.6s infinite;
        }
        .slogan-anim .cursor.hidden {
          display: none;
        }
        @keyframes sloganBlink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
      `}</style>

      <link
        href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;700&family=Fira+Code:wght@700&display=swap"
        rel="stylesheet"
      />

      <div className="slogan-anim" ref={containerRef}>
        <span className="line1" id="line1">
          <span className="light" id="trust">
            {"Trust the ".split("").map((ch, i) => (
              <span key={i} className="char">{ch === " " ? "\u00A0" : ch}</span>
            ))}
          </span>
          <span className="brackets" id="leftBracket">
            <span className="char">{"{"}</span>
          </span>
          <span className="code" id="code">
            {"Code".split("").map((ch, i) => (
              <span key={i} className="char">{ch}</span>
            ))}
          </span>
          <span className="brackets" id="rightBracket">
            <span className="char">{"}"}</span>
          </span>
          <span className="light" id="comma">
            <span className="char">,</span>
          </span>
          <span className="cursor hidden blink" id="cursorLine1"></span>
        </span>

        <span className="line2" id="line2">
          <span className="gray" id="notthe">
            {"// Not the ".split("").map((ch, i) => (
              <span key={i} className="char">{ch === " " ? "\u00A0" : ch}</span>
            ))}
          </span>
          <span className="cult" id="cult">
            {"Cult".split("").map((ch, i) => (
              <span key={i} className="char">{ch}</span>
            ))}
          </span>
          <span className="exclamation" id="exclaim">
            <span className="char">!</span>
          </span>
          <span className="cursor hidden blink" id="cursorLine2"></span>
        </span>
      </div>
    </>
  );
}
