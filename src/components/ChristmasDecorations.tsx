import React from 'react';

const SNOWFLAKES = [
  { id: 1, left: '4%', size: 6, duration: '14s', delay: '0s', opacity: 0.35 },
  { id: 2, left: '12%', size: 8, duration: '18s', delay: '2s', opacity: 0.45 },
  { id: 3, left: '21%', size: 5, duration: '15s', delay: '4s', opacity: 0.3 },
  { id: 4, left: '29%', size: 7, duration: '20s', delay: '1s', opacity: 0.4 },
  { id: 5, left: '38%', size: 6, duration: '16s', delay: '6s', opacity: 0.35 },
  { id: 6, left: '47%', size: 9, duration: '22s', delay: '3s', opacity: 0.45 },
  { id: 7, left: '56%', size: 5, duration: '17s', delay: '5s', opacity: 0.3 },
  { id: 8, left: '65%', size: 8, duration: '19s', delay: '1.5s', opacity: 0.4 },
  { id: 9, left: '74%', size: 6, duration: '15s', delay: '7s', opacity: 0.35 },
  { id: 10, left: '83%', size: 7, duration: '21s', delay: '2.5s', opacity: 0.4 },
  { id: 11, left: '91%', size: 8, duration: '16s', delay: '4.5s', opacity: 0.45 },
  { id: 12, left: '96%', size: 5, duration: '18s', delay: '0.5s', opacity: 0.3 },
];

export const SnowfallOverlay: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
    >
      {SNOWFLAKES.map((flake) => (
        <span
          key={flake.id}
          className="animate-snow absolute -top-4 rounded-full bg-white"
          style={{
            left: flake.left,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animationDuration: flake.duration,
            animationDelay: flake.delay,
          }}
        />
      ))}
    </div>
  );
};

export const ChristmasLightsTop: React.FC = () => {
  const bulbs = Array.from({ length: 16 }, (_, i) => i);
  const colors = [
    'bg-[#FACC15] shadow-[0_0_12px_#FACC15]', // Gold/Yellow
    'bg-[#F3E8FF] shadow-[0_0_12px_#F3E8FF]', // Light Lilac
    'bg-[#F59E0B] shadow-[0_0_12px_#F59E0B]', // Warm Amber Gold
    'bg-[#FFFFFF] shadow-[0_0_12px_#FFFFFF]', // Pure White
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative w-full overflow-hidden pt-1 pb-3 select-none"
    >
      {/* Top wire cord */}
      <div className="mx-auto flex max-w-5xl items-start justify-between px-3">
        {bulbs.map((b) => {
          const colorClass = colors[b % colors.length];
          const delayStyle = { animationDelay: `${(b % 4) * 0.55}s` };
          return (
            <div key={b} className="flex flex-col items-center">
              <div className="h-2 w-1.5 rounded-t-xs bg-[#4C1D95]" />
              <div
                style={delayStyle}
                className={`animate-twinkle h-3.5 w-2.5 rounded-full ${colorClass}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SnowmanOrnament: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={`animate-float-slow ${className}`}
  >
    {/* Bottom snowball */}
    <circle cx="32" cy="46" r="14" fill="#FFFFFF" stroke="#E9D5FF" strokeWidth="2" />
    {/* Top snowball */}
    <circle cx="32" cy="25" r="10" fill="#FFFFFF" stroke="#E9D5FF" strokeWidth="2" />
    {/* Purple & Gold Top Hat */}
    <rect x="20" y="13" width="24" height="3.5" rx="1.75" fill="#4C1D95" />
    <rect x="24" y="4" width="16" height="10" rx="2" fill="#4C1D95" />
    <rect x="24" y="10.5" width="16" height="2.5" fill="#FACC15" />
    {/* Eyes */}
    <circle cx="28.5" cy="23" r="1.5" fill="#230B3F" />
    <circle cx="35.5" cy="23" r="1.5" fill="#230B3F" />
    {/* Carrot nose */}
    <path d="M32 25L39 26.5L32 28V25Z" fill="#F59E0B" />
    {/* Lilac & Gold Scarf */}
    <rect x="23" y="32" width="18" height="4.5" rx="2.25" fill="#7E22CE" />
    <rect x="34" y="34" width="4.5" height="10" rx="2" fill="#FACC15" />
    {/* Buttons */}
    <circle cx="32" cy="42" r="1.6" fill="#7E22CE" />
    <circle cx="32" cy="48" r="1.6" fill="#7E22CE" />
  </svg>
);

export const ElfOrnament: React.FC<{ className?: string }> = ({ className = 'w-14 h-14' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={`animate-float-slow ${className}`}
  >
    {/* Pointy Elf Ears */}
    <path d="M16 32L9 27L16 38Z" fill="#FDE68A" />
    <path d="M48 32L55 27L48 38Z" fill="#FDE68A" />
    {/* Head */}
    <circle cx="32" cy="34" r="14" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="1.5" />
    {/* Festive Purple & Gold Elf Hat */}
    <path d="M17 27C19 13 31 6 46 11C42 17 42 22 47 27H17Z" fill="#6D28D9" />
    {/* Hat Brim */}
    <rect x="16" y="25" width="32" height="5" rx="2.5" fill="#FACC15" />
    {/* Pom-pom */}
    <circle cx="47" cy="11" r="4" fill="#FFFFFF" />
    {/* Cheerful Eyes */}
    <circle cx="27" cy="34" r="1.8" fill="#230B3F" />
    <circle cx="37" cy="34" r="1.8" fill="#230B3F" />
    {/* Rosy Cheeks */}
    <circle cx="23.5" cy="37.5" r="2.2" fill="#F472B6" fillOpacity="0.55" />
    <circle cx="40.5" cy="37.5" r="2.2" fill="#F472B6" fillOpacity="0.55" />
    {/* Smile */}
    <path
      d="M27.5 40C29 42.5 35 42.5 36.5 40"
      stroke="#230B3F"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Elf Collar */}
    <path d="M20 46L26 53L32 48L38 53L44 46H20Z" fill="#FACC15" />
  </svg>
);
