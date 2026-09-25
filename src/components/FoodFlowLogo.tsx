import React from 'react';

interface FoodFlowLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'white' | 'gradient';
  showText?: boolean;
}

const sizeMap = {
  sm: { box: 28, icon: 16, text: 'text-base' },
  md: { box: 40, icon: 22, text: 'text-xl' },
  lg: { box: 48, icon: 26, text: 'text-2xl' },
  xl: { box: 56, icon: 32, text: 'text-3xl' },
};

export const FoodFlowLogo: React.FC<FoodFlowLogoProps> = ({
  size = 'md',
  variant = 'default',
  showText = true,
}) => {
  const s = sizeMap[size];

  const bgStyle = variant === 'white'
    ? { background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)' }
    : variant === 'gradient'
    ? { background: 'linear-gradient(135deg, #1E6B54 0%, #2F9E7D 100%)' }
    : { background: 'linear-gradient(135deg, #1E6B54 0%, #2F9E7D 100%)' };

  const iconColor = variant === 'white' ? 'white' : 'white';
  const textColor = variant === 'white' ? 'white' : '#1E6B54';

  return (
    <div className="flex items-center gap-2">
      <div
        className="flex items-center justify-center shadow-md"
        style={{
          width: s.box,
          height: s.box,
          borderRadius: s.box * 0.28,
          ...bgStyle,
        }}
      >
        <svg
          width={s.icon}
          height={s.icon}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Leaf / Food icon */}
          <path
            d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.17 20C12.18 20 15.58 17.31 17.69 14.92C19.63 12.72 21 10.08 21 7C21 5.5 20.5 4.5 20 4C19.5 3.5 18.5 3 17 3C14 3 11 4 9 6C11 7 13 8 17 8Z"
            fill={iconColor}
          />
          <path
            d="M3.82 21.34C5.9 16.17 8 10 17 8"
            stroke={iconColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.5"
          />
          {/* Small bowl/plate at bottom */}
          <path
            d="M4 18C4 18 6 22 12 22C18 22 20 18 20 18"
            stroke={iconColor}
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      </div>
      {showText && (
        <span
          className={`font-bold ${s.text}`}
          style={{ color: textColor, letterSpacing: '-0.02em' }}
        >
          FoodFlow
        </span>
      )}
    </div>
  );
};
