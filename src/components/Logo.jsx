import React from 'react';

const Logo = ({ className = '', size = 40, style = {} }) => {
  return (
    <svg 
      width={size} 
      height={size * 1.25} 
      viewBox="0 0 100 125" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ overflow: 'visible', ...style }}
    >
      {/* White background for the face inside the loop */}
      <circle cx="55" cy="55" r="22" fill="#ffffff" />

      {/* Black stem of the 'b' */}
      <path 
        d="M 32,15 
           L 32,75 
           C 32,88 38,95 48,95" 
        stroke="#222222"
        strokeWidth="16"
        strokeLinecap="round"
        fill="none"
      />

      {/* Green loop of the 'b' */}
      <path 
        d="M 45,25 
           C 75,25 90,40 85,70 
           C 80,95 65,100 50,88" 
        stroke="#8CCB2E" 
        strokeWidth="16" 
        strokeLinecap="round"
        fill="none"
      />

      {/* Interlocking fingers - Green (pointing down-left) */}
      <path d="M 38,88 L 30,96" stroke="#8CCB2E" strokeWidth="8" strokeLinecap="round" />
      <path d="M 45,94 L 37,102" stroke="#8CCB2E" strokeWidth="8" strokeLinecap="round" />
      <path d="M 52,100 L 44,108" stroke="#8CCB2E" strokeWidth="8" strokeLinecap="round" />
      <path d="M 59,106 L 51,114" stroke="#8CCB2E" strokeWidth="8" strokeLinecap="round" />

      {/* Interlocking fingers - Black (pointing down-right) */}
      <path d="M 42,95 L 49,102" stroke="#222222" strokeWidth="8" strokeLinecap="round" />
      <path d="M 49,101 L 56,108" stroke="#222222" strokeWidth="8" strokeLinecap="round" />
      <path d="M 56,107 L 63,114" stroke="#222222" strokeWidth="8" strokeLinecap="round" />

      {/* Smiley Face */}
      <g transform="translate(6, -2)">
        {/* Left Eye */}
        <circle cx="42" cy="52" r="3.5" fill="#222222" />
        {/* Right Eye */}
        <circle cx="56" cy="52" r="3.5" fill="#222222" />
        {/* Smile */}
        <path 
          d="M 40,62 Q 49,72 58,62" 
          stroke="#222222" 
          strokeWidth="4.5" 
          strokeLinecap="round" 
          fill="none" 
        />
      </g>
    </svg>
  );
};

export default Logo;
