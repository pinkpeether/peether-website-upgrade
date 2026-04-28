export const SignUpCircle = ({ size = 64, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 135 135" 
    width={size} 
    height={size}
    className={className}
  >
    <defs>
      {/* Subtle outer glow */}
      <filter id="signup-glow">
        <feGaussianBlur stdDeviation="2" result="blur"/>
        <feMerge>
          <feMergeNode in="blur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>

      {/* Subtle glass shine - TOP ONLY */}
      <linearGradient id="signup-glass" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
        <stop offset="50%" stopColor="rgba(255,255,255,0)" />
      </linearGradient>
    </defs>
    
    {/* Soft outer glow */}
    <circle 
      cx="67.5" 
      cy="67.5" 
      r="58" 
      fill="#ff39aa" 
      opacity="0.2"
    />
    
    {/* Main PINK circle */}
    <circle 
      cx="67.5" 
      cy="67.5" 
      r="57.5" 
      fill="#ff39aa"
      filter="url(#signup-glow)"
    />

    {/* Subtle glass border */}
    <circle 
      cx="67.5" 
      cy="67.5" 
      r="57.5" 
      fill="none"
      stroke="rgba(255,255,255,0.3)"
      strokeWidth="1.5"
    />

    {/* Very subtle top shine */}
    <ellipse
      cx="67.5"
      cy="40"
      rx="35"
      ry="18"
      fill="url(#signup-glass)"
      opacity="0.5"
    />
    
    {/* WHITE inner circle - SOLID for text */}
    <circle 
      cx="67.5" 
      cy="67.5" 
      r="50.19" 
      fill="#ffffff"
    />

    {/* Inner circle subtle border */}
    <circle 
      cx="67.5" 
      cy="67.5" 
      r="50.19" 
      fill="none"
      stroke="rgba(255,57,170,0.15)"
      strokeWidth="1"
    />
  </svg>
);