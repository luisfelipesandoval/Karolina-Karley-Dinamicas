import React, { useEffect, useRef, useState } from 'react';
import { OFFICIAL_PRIZES, OFFICIAL_RAFFLE_DATA, PrizeItem } from '../utils/raffleLogic';
import { ElfOrnament, SnowmanOrnament } from './ChristmasDecorations';

/**
 * Simple, brand-free custom illustrations for each prize category.
 * Strictly avoids protected car or PlayStation brand logos.
 */
const PrizeIllustration: React.FC<{ category: PrizeItem['category'] }> = ({ category }) => {
  switch (category) {
    case 'car':
      return (
        <svg
          viewBox="0 0 64 44"
          className="h-12 w-16 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Festive Star above car */}
          <path
            d="M32 2L33.5 5.5L37 7L33.5 8.5L32 12L30.5 8.5L27 7L30.5 5.5L32 2Z"
            fill="#FACC15"
          />
          {/* Simple Generic Car Body (no brand logos) */}
          <path
            d="M10 26L17 15H45L53 26H57C59.2 26 61 27.8 61 30V35C61 36.1 60.1 37 59 37H54M10 26H6C3.8 26 2 27.8 2 30V35C2 36.1 2.9 37 4 37H10"
            stroke="#4C1D95"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6 26L16 15H46L56 26H60V35H4V26H6Z"
            fill="#7E22CE"
          />
          {/* Windows */}
          <path d="M18.5 17.5H30V25H13.5L18.5 17.5Z" fill="#F3E8FF" />
          <path d="M33 17.5H44.5L50 25H33V17.5Z" fill="#F3E8FF" />
          {/* Headlights */}
          <rect x="56" y="28" width="4" height="3.5" rx="1" fill="#FACC15" />
          <rect x="4" y="28" width="3.5" height="3.5" rx="1" fill="#F59E0B" />
          {/* Wheels */}
          <circle cx="16" cy="36" r="6" fill="#230B3F" />
          <circle cx="16" cy="36" r="2.5" fill="#FACC15" />
          <circle cx="48" cy="36" r="6" fill="#230B3F" />
          <circle cx="48" cy="36" r="2.5" fill="#FACC15" />
        </svg>
      );
    case 'cash':
      return (
        <svg
          viewBox="0 0 64 44"
          className="h-12 w-16 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Stacked Banknotes Illustration */}
          <rect x="10" y="14" width="46" height="24" rx="4" fill="#5B21B6" />
          <rect
            x="6"
            y="8"
            width="46"
            height="24"
            rx="4"
            fill="#FACC15"
            stroke="#4C1D95"
            strokeWidth="2.5"
          />
          <circle cx="29" cy="20" r="6.5" fill="#FEF08A" stroke="#4C1D95" strokeWidth="2" />
          <text
            x="29"
            y="23.5"
            textAnchor="middle"
            fill="#230B3F"
            fontSize="9"
            fontWeight="900"
          >
            S/
          </text>
        </svg>
      );
    case 'console':
      return (
        <svg
          viewBox="0 0 64 44"
          className="h-12 w-16 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Generic Gamepad Illustration (no PlayStation trademark logo) */}
          <path
            d="M17 12H47C52.5 12 56.5 17 55.5 23L53.5 34C52.8 37.5 49 39.5 45.8 37.5L39 32H25L18.2 37.5C15 39.5 11.2 37.5 10.5 34L8.5 23C7.5 17 11.5 12 17 12Z"
            fill="#6D28D9"
            stroke="#230B3F"
            strokeWidth="2.5"
          />
          {/* D-pad */}
          <path d="M19 20V26M16 23H22" stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" />
          {/* Action dots */}
          <circle cx="45" cy="20" r="2" fill="#FACC15" />
          <circle cx="49" cy="23" r="2" fill="#F3E8FF" />
          <circle cx="41" cy="23" r="2" fill="#F3E8FF" />
          <circle cx="45" cy="26" r="2" fill="#FACC15" />
        </svg>
      );
    case 'basket':
      return (
        <svg
          viewBox="0 0 64 44"
          className="h-12 w-16 shrink-0"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Festive Gift & Basket Treats */}
          <rect x="16" y="10" width="13" height="14" rx="2" fill="#FACC15" stroke="#4C1D95" strokeWidth="2" />
          <rect x="29" y="7" width="14" height="17" rx="2" fill="#7E22CE" stroke="#230B3F" strokeWidth="2" />
          <circle cx="45" cy="17" r="5" fill="#F59E0B" />
          {/* Woven Basket Base */}
          <path
            d="M10 22H54L49 38C48.4 39.8 46.8 41 45 41H19C17.2 41 15.6 39.8 15 38L10 22Z"
            fill="#FACC15"
            stroke="#4C1D95"
            strokeWidth="2.5"
          />
          <path d="M16 28H48M18 34H46" stroke="#4C1D95" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
  }
};

export const PrizesSection: React.FC = () => {
  const [carCount, setCarCount] = useState<number>(0);
  const counterRef = useRef<HTMLDivElement | null>(null);
  const hasAnimatedRef = useRef<boolean>(false);

  useEffect(() => {
    const target = OFFICIAL_RAFFLE_DATA.totalCarsZeroKm;
    const element = counterRef.current;

    const runCountAnimation = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;
      const durationMs = 1100;
      const startTime = performance.now();

      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentVal = Math.round(eased * target);
        setCarCount(currentVal);
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          setCarCount(target);
        }
      };

      requestAnimationFrame(tick);
    };

    if (!element || typeof IntersectionObserver === 'undefined') {
      setCarCount(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            runCountAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="premios"
      aria-labelledby="premios-heading"
      className="scroll-mt-8 px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-5xl">
        {/* Section Header + Animated Visual Counter */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-3 flex items-center gap-3">
            <SnowmanOrnament className="h-12 w-12" />
            <h2
              id="premios-heading"
              className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl"
            >
              Premios
            </h2>
            <ElfOrnament className="h-12 w-12" />
          </div>

          {/* Visual animated counter "10 carros 0 km" */}
          <div
            ref={counterRef}
            data-testid="cars-counter"
            className="mt-2 inline-flex flex-col items-center rounded-3xl border-2 border-[#FACC15] bg-[#3B106C] px-8 py-5 shadow-xl sm:flex-row sm:gap-4"
          >
            <span className="font-display text-5xl font-black text-[#FACC15] tabular-nums sm:text-6xl">
              {carCount}
            </span>
            <span className="font-display text-2xl font-extrabold tracking-tight text-white uppercase sm:text-3xl">
              carros 0 km
            </span>
          </div>
        </div>

        {/* Grid of 12 Prize Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {OFFICIAL_PRIZES.map((prize) => (
            <article
              key={prize.id}
              className="flex items-center gap-4 rounded-3xl border border-[#E9D5FF] bg-white p-5 text-[#230B3F] shadow-lg transition-transform duration-150 hover:-translate-y-0.5"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#F3E8FF]">
                <PrizeIllustration category={prize.category} />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display text-lg leading-snug font-extrabold text-[#230B3F] sm:text-xl">
                  {prize.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
