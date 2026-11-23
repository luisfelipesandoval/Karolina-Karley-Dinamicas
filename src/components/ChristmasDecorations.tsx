import React, { useState } from 'react';
import { OFFICIAL_IMAGES } from '../utils/raffleLogic';

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

/**
 * Decorative Christmas lights at top made with page effects:
 * soft golden dots that twinkle gently ("puntos dorados suaves que parpadean").
 */
export const ChristmasLightsTop: React.FC = () => {
  const bulbs = Array.from({ length: 18 }, (_, i) => i);
  const goldShades = [
    'bg-[#FACC15] shadow-[0_0_14px_3px_rgba(250,204,21,0.85)]',
    'bg-[#FDE047] shadow-[0_0_12px_2px_rgba(253,224,71,0.8)]',
    'bg-[#F59E0B] shadow-[0_0_14px_3px_rgba(245,158,11,0.85)]',
    'bg-[#FEF08A] shadow-[0_0_10px_2px_rgba(254,240,138,0.75)]',
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none relative w-full overflow-hidden pt-2 pb-3 select-none"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4">
        {bulbs.map((b) => {
          const shadeClass = goldShades[b % goldShades.length];
          const delayStyle = { animationDelay: `${(b % 5) * 0.45}s` };
          return (
            <div key={b} className="flex flex-col items-center">
              <div
                style={delayStyle}
                className={`animate-twinkle h-3 w-3 rounded-full ${shadeClass}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export const SnowmanFallbackSvg: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
  >
    <circle cx="32" cy="46" r="14" fill="#FFFFFF" stroke="#E9D5FF" strokeWidth="2" />
    <circle cx="32" cy="25" r="10" fill="#FFFFFF" stroke="#E9D5FF" strokeWidth="2" />
    <rect x="20" y="13" width="24" height="3.5" rx="1.75" fill="#4C1D95" />
    <rect x="24" y="4" width="16" height="10" rx="2" fill="#4C1D95" />
    <rect x="24" y="10.5" width="16" height="2.5" fill="#FACC15" />
    <circle cx="28.5" cy="23" r="1.5" fill="#230B3F" />
    <circle cx="35.5" cy="23" r="1.5" fill="#230B3F" />
    <path d="M32 25L39 26.5L32 28V25Z" fill="#F59E0B" />
    <rect x="23" y="32" width="18" height="4.5" rx="2.25" fill="#7E22CE" />
    <rect x="34" y="34" width="4.5" height="10" rx="2" fill="#FACC15" />
  </svg>
);

export const ElfFallbackSvg: React.FC<{ className?: string }> = ({ className = 'w-12 h-12' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
  >
    <path d="M16 32L9 27L16 38Z" fill="#FDE68A" />
    <path d="M48 32L55 27L48 38Z" fill="#FDE68A" />
    <circle cx="32" cy="34" r="14" fill="#FEF3C7" stroke="#FDE68A" strokeWidth="1.5" />
    <path d="M17 27C19 13 31 6 46 11C42 17 42 22 47 27H17Z" fill="#6D28D9" />
    <rect x="16" y="25" width="32" height="5" rx="2.5" fill="#FACC15" />
    <circle cx="47" cy="11" r="4" fill="#FFFFFF" />
    <circle cx="27" cy="34" r="1.8" fill="#230B3F" />
    <circle cx="37" cy="34" r="1.8" fill="#230B3F" />
    <path d="M27.5 40C29 42.5 35 42.5 36.5 40" stroke="#230B3F" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/**
 * Corner ornaments using the user's attached snowman and elf illustrations.
 * Since they have a white studio background, they are framed in a soft circular
 * snow-globe medallion with a golden festive border and gentle float animation
 * so they integrate harmoniously against the purple gradient without covering text.
 */
export const SnowmanOrnament: React.FC<{ className?: string; loading?: 'eager' | 'lazy' }> = ({
  className = 'w-16 h-16 sm:w-20 sm:h-20',
  loading = 'eager',
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`animate-float-slow inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#FACC15] bg-white p-1 shadow-[0_0_20px_rgba(250,204,21,0.35)] ${className}`}
    >
      {!imgError ? (
        <img
          src={OFFICIAL_IMAGES.snowman}
          alt="Muñeco de nieve navideño con gorro y bufanda"
          loading={loading}
          onError={() => setImgError(true)}
          className="h-full w-full rounded-full object-contain"
        />
      ) : (
        <SnowmanFallbackSvg className="h-4/5 w-4/5" />
      )}
    </div>
  );
};

export const ElfOrnament: React.FC<{ className?: string; loading?: 'eager' | 'lazy' }> = ({
  className = 'w-16 h-16 sm:w-20 sm:h-20',
  loading = 'eager',
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`animate-float-slow inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-[#FACC15] bg-white p-1 shadow-[0_0_20px_rgba(250,204,21,0.35)] ${className}`}
    >
      {!imgError ? (
        <img
          src={OFFICIAL_IMAGES.elf}
          alt="Duende navideño sonriente saludando"
          loading={loading}
          onError={() => setImgError(true)}
          className="h-full w-full rounded-full object-contain"
        />
      ) : (
        <ElfFallbackSvg className="h-4/5 w-4/5" />
      )}
    </div>
  );
};
