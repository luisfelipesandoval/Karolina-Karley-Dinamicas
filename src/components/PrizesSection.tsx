import React, { useEffect, useRef, useState } from 'react';
import { OFFICIAL_PRIZES, OFFICIAL_RAFFLE_DATA, PrizeItem } from '../utils/raffleLogic';
import { ElfOrnament, SnowmanOrnament } from './ChristmasDecorations';

/**
 * Simple fallback SVG illustration if an image fails to load.
 */
const PrizeFallbackIcon: React.FC<{ category: PrizeItem['category'] }> = ({ category }) => {
  switch (category) {
    case 'car':
      return (
        <svg
          viewBox="0 0 64 44"
          className="h-16 w-24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M6 26L16 15H46L56 26H60V35H4V26H6Z" fill="#7E22CE" />
          <path d="M18.5 17.5H30V25H13.5L18.5 17.5Z" fill="#F3E8FF" />
          <path d="M33 17.5H44.5L50 25H33V17.5Z" fill="#F3E8FF" />
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
          className="h-16 w-24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect x="10" y="14" width="46" height="24" rx="4" fill="#5B21B6" />
          <rect x="6" y="8" width="46" height="24" rx="4" fill="#FACC15" stroke="#4C1D95" strokeWidth="2.5" />
          <circle cx="29" cy="20" r="6.5" fill="#FEF08A" stroke="#4C1D95" strokeWidth="2" />
          <text x="29" y="23.5" textAnchor="middle" fill="#230B3F" fontSize="9" fontWeight="900">
            S/
          </text>
        </svg>
      );
    case 'console':
      return (
        <svg
          viewBox="0 0 64 44"
          className="h-16 w-24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            d="M17 12H47C52.5 12 56.5 17 55.5 23L53.5 34C52.8 37.5 49 39.5 45.8 37.5L39 32H25L18.2 37.5C15 39.5 11.2 37.5 10.5 34L8.5 23C7.5 17 11.5 12 17 12Z"
            fill="#6D28D9"
            stroke="#230B3F"
            strokeWidth="2.5"
          />
          <path d="M19 20V26M16 23H22" stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" />
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
          className="h-16 w-24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect x="16" y="10" width="13" height="14" rx="2" fill="#FACC15" stroke="#4C1D95" strokeWidth="2" />
          <rect x="29" y="7" width="14" height="17" rx="2" fill="#7E22CE" stroke="#230B3F" strokeWidth="2" />
          <path
            d="M10 22H54L49 38C48.4 39.8 46.8 41 45 41H19C17.2 41 15.6 39.8 15 38L10 22Z"
            fill="#FACC15"
            stroke="#4C1D95"
            strokeWidth="2.5"
          />
        </svg>
      );
  }
};

const PrizeCard: React.FC<{ prize: PrizeItem }> = ({ prize }) => {
  const [imageError, setImageError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const isCar = prize.category === 'car';

  if (isCar) {
    return (
      <article className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#E9D5FF]/80 bg-gradient-to-b from-white via-[#FAF5FF] to-[#F3E8FF] px-5 pt-4 pb-6 text-[#230B3F] shadow-xl transition-all duration-200 ease-out hover:-translate-y-1.5 hover:shadow-2xl">
        {/* Frameless Floating Car Image with mix-blend-multiply & Soft Oval Floor Shadow */}
        <div className="relative flex aspect-[4/3] w-full flex-col items-center justify-center">
          {!imageError ? (
            <>
              <img
                src={prize.imageUrl}
                alt={prize.altText}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                onError={() => setImageError(true)}
                style={{
                  maskImage:
                    'radial-gradient(ellipse 84% 78% at 50% 52%, black 62%, transparent 98%)',
                  WebkitMaskImage:
                    'radial-gradient(ellipse 84% 78% at 50% 52%, black 62%, transparent 98%)',
                }}
                className={`relative z-10 h-full w-full object-contain mix-blend-multiply brightness-[1.12] contrast-[1.08] transition-all duration-300 ease-out group-hover:scale-[1.04] ${
                  isLoaded ? 'opacity-100' : 'opacity-90'
                }`}
              />
              {/* Soft oval floor shadow underneath the car */}
              <div
                aria-hidden="true"
                className="pointer-events-none -mt-5 h-5 w-4/5 shrink-0 rounded-[100%] bg-[#230B3F]/25 blur-md transition-transform duration-300 group-hover:scale-105"
              />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <PrizeFallbackIcon category={prize.category} />
            </div>
          )}
        </div>

        {/* Small "Imagen referencial" text directly below the image, not overlapping it */}
        {prize.isReferential && (
          <p className="mt-1.5 text-center text-xs font-semibold tracking-wide text-[#6D28D9]/80">
            Imagen referencial
          </p>
        )}

        {/* Prize Title */}
        <div className="mt-2 flex flex-1 items-center justify-center px-1 text-center">
          <h3 className="font-display text-xl leading-snug font-black text-[#230B3F]">
            {prize.title}
          </h3>
        </div>
      </article>
    );
  }

  // Lilac-background prizes (efectivo, consolas, canasta):
  // Card shares the exact soft lilac background with a radial glow and seamless edge blending so there is no inner frame box.
  return (
    <article
      style={{
        background:
          'radial-gradient(circle at 50% 38%, #E9D5FF 0%, #DEC7F8 55%, #D5B8F5 100%)',
      }}
      className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-[#F3E8FF]/70 text-[#230B3F] shadow-xl transition-all duration-200 ease-out hover:-translate-y-1.5 hover:shadow-2xl"
    >
      {/* Full-width top area with matching top rounded corners and soft bottom fade into the lilac card */}
      <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-t-3xl">
        {!imageError ? (
          <>
            <img
              src={prize.imageUrl}
              alt={prize.altText}
              loading="lazy"
              onLoad={() => setIsLoaded(true)}
              onError={() => setImageError(true)}
              className={`h-full w-full rounded-t-3xl object-cover transition-all duration-300 ease-out group-hover:scale-[1.04] ${
                isLoaded ? 'opacity-100' : 'opacity-90'
              }`}
            />
            {/* Seamless bottom gradient blend into the card's lilac surface */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#D5B8F5] to-transparent"
            />
          </>
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <PrizeFallbackIcon category={prize.category} />
          </div>
        )}
      </div>

      {/* Prize Title */}
      <div className="flex flex-1 flex-col items-center justify-center px-5 pt-3 pb-6 text-center">
        {prize.isReferential && (
          <p className="mb-1 text-center text-xs font-semibold tracking-wide text-[#4C1D95]/85">
            Imagen referencial
          </p>
        )}
        <h3 className="font-display text-xl leading-snug font-black text-[#230B3F]">
          {prize.title}
        </h3>
      </div>
    </article>
  );
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
            <SnowmanOrnament className="h-12 w-12" loading="lazy" />
            <h2
              id="premios-heading"
              className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl"
            >
              Premios
            </h2>
            <ElfOrnament className="h-12 w-12" loading="lazy" />
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
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {OFFICIAL_PRIZES.map((prize) => (
            <PrizeCard key={prize.id} prize={prize} />
          ))}
        </div>
      </div>
    </section>
  );
};
