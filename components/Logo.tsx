
import React from 'react';

const Logo: React.FC<{ size?: number; className?: string }> = ({ size = 40, className = "" }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg 
        width={size} 
        height={size} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <path 
          d="M20 80V20L50 50L80 20V80" 
          stroke="url(#paint0_linear)" 
          strokeWidth="12" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <path 
          d="M10 60C15 45 35 35 50 60C65 85 85 75 90 60" 
          stroke="url(#paint1_linear)" 
          strokeWidth="8" 
          strokeLinecap="round" 
          className="animate-pulse"
        />
        <defs>
          <linearGradient id="paint0_linear" x1="20" y1="20" x2="80" y2="80" gradientUnits="userSpaceOnUse">
            <stop stopColor="#0ea5e9" />
            <stop offset="1" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="paint1_linear" x1="10" y1="60" x2="90" y2="60" gradientUnits="userSpaceOnUse">
            <stop stopColor="#38bdf8" />
            <stop offset="1" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
      </svg>
      <span className="text-2xl font-bold tracking-tight text-white">
        Media<span className="text-sky-500">ve</span>
      </span>
    </div>
  );
};

export default Logo;
