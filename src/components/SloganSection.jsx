import { useState, useEffect, useRef } from 'react';

export default function SloganSection() {
  const [isAnimating, setIsAnimating] = useState(false);
  const sloganRef = useRef(null);

  useEffect(() => {
    // Start animation after brief delay
    const timer = setTimeout(() => {
      setIsAnimating(true);
      startAnimation();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  const startAnimation = () => {
    if (!sloganRef.current) return;
    
    const trustChars = sloganRef.current.querySelectorAll('#trust .char');
    const codeChars = sloganRef.current.querySelectorAll('#code .char');
    const commaChars = sloganRef.current.querySelectorAll('#comma .char');
    const nottheChars = sloganRef.current.querySelectorAll('#notthe .char');
    const cultChars = sloganRef.current.querySelectorAll('#cult .char');
    const exclaimChars = sloganRef.current.querySelectorAll('#exclaim .char');
    const leftBracket = sloganRef.current.querySelector('#leftBracket .char');
    const rightBracket = sloganRef.current.querySelector('#rightBracket .char');
    const cult = sloganRef.current.querySelector('#cult');
    
    let delay = 0;
    const charSpeedSlow = 180;
    const charSpeedNormal = 120;
    const pauseShort = 250;
    const pauseMedium = 400;
    const pauseLong = 600;
    
    // Initial pause
    delay += 600;
    
    // Type "Trust the "
    trustChars.forEach((char) => {
      setTimeout(() => char.classList.add('visible'), delay);
      delay += charSpeedSlow;
    });
    delay += pauseShort;
    
    // Type "Code"
    codeChars.forEach((char) => {
      setTimeout(() => char.classList.add('visible'), delay);
      delay += charSpeedNormal;
    });
    delay += pauseShort;
    
    // Type ","
    commaChars.forEach((char) => {
      setTimeout(() => char.classList.add('visible'), delay);
      delay += charSpeedNormal;
    });
    delay += pauseMedium;
    
    // Type "// Not the "
    nottheChars.forEach((char) => {
      setTimeout(() => char.classList.add('visible'), delay);
      delay += charSpeedNormal;
    });
    delay += pauseShort;
    
    // Type "Cult"
    cultChars.forEach((char) => {
      setTimeout(() => char.classList.add('visible'), delay);
      delay += charSpeedNormal;
    });
    delay += pauseShort;
    
    // Type "!"
    exclaimChars.forEach((char) => {
      setTimeout(() => char.classList.add('visible'), delay);
      delay += charSpeedNormal;
    });
    delay += pauseLong;
    
    // Left bracket pops
    setTimeout(() => {
      if (leftBracket) leftBracket.classList.add('visible', 'pop');
    }, delay);
    delay += pauseMedium;
    
    // Right bracket pops
    setTimeout(() => {
      if (rightBracket) rightBracket.classList.add('visible', 'pop');
    }, delay);
    delay += pauseLong;
    
    // Strikethrough
    setTimeout(() => {
      if (cult) cult.classList.add('strike');
    }, delay);
    delay += pauseMedium;
    
    // Underline
    setTimeout(() => {
      if (cult) cult.classList.add('underline');
    }, delay);
  };

  return (
    <div className="relative w-full py-20 flex items-center justify-center overflow-hidden">
      
      {/* White/Light Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      
      {/* Slogan Container */}
      <div ref={sloganRef} className="relative z-10 px-4">
        <style>{`
          .char { 
            display: none; 
            position: relative; 
          }
          .char.visible { 
            display: inline; 
          }
          
          .light .char {
            font-family: 'Space Grotesk', sans-serif;
            font-weight: 300;
            color: #334155;
            letter-spacing: -0.05em;
          }
          
          .code .char {
            font-family: 'Fira Code', monospace;
            font-weight: 700;
            color: #E73589;
            letter-spacing: -0.01em;
          }
          
          .gray .char {
            font-weight: 300;
            color: #6B7280;
            letter-spacing: -0.065em;
          }
          
          .cult {
            font-weight: 700;
            color: #002FFF;
            position: relative;
            letter-spacing: -0.01em;
            display: inline;
          }
          
          .cult .char {
            color: #002FFF;
            font-weight: 700;
          }
          
          .cult::before {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            top: 50%;
            height: 0.06em;
            background: #FF2F00;
            border-radius: 2px;
            transform: scaleX(0);
            transform-origin: left;
          }
          
          .cult::after {
            content: '';
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0.05em;
            height: 0.12em;
            background: #FF2F00;
            border-radius: 2px;
            transform: scaleX(0);
            transform-origin: left;
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
          }
          
          .exclamation .char {
            font-weight: 700;
            color: #FF2F00;
          }
          
          @keyframes popIn {
            0% { transform: scale(0.5); }
            70% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }
          
          .char.pop {
            animation: popIn 0.35s forwards;
          }
        `}</style>
        
        <div className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-center">
          <div className="mb-2">
            <span className="light" id="trust">
              <span className="char">T</span><span className="char">r</span><span className="char">u</span><span className="char">s</span><span className="char">t</span><span className="char"> </span><span className="char">t</span><span className="char">h</span><span className="char">e</span><span className="char"> </span>
            </span>
            <span className="brackets" id="leftBracket"><span className="char">{`{`}</span></span>
            <span className="code" id="code">
              <span className="char">C</span><span className="char">o</span><span className="char">d</span><span className="char">e</span>
            </span>
            <span className="brackets" id="rightBracket"><span className="char">{`}`}</span></span>
            <span className="light" id="comma"><span className="char">,</span></span>
          </div>
          <div>
            <span className="gray" id="notthe">
              <span className="char">/</span><span className="char">/</span><span className="char"> </span><span className="char">N</span><span className="char">o</span><span className="char">t</span><span className="char"> </span><span className="char">t</span><span className="char">h</span><span className="char">e</span><span className="char"> </span>
            </span>
            <span className="cult" id="cult">
              <span className="char">C</span><span className="char">u</span><span className="char">l</span><span className="char">t</span>
            </span>
            <span className="exclamation" id="exclaim"><span className="char">!</span></span>
          </div>
        </div>
      </div>
    </div>
  );
}