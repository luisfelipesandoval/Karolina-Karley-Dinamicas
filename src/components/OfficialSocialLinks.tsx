import React from 'react';
import { ExternalLink } from 'lucide-react';
import { OFFICIAL_SOCIAL_LINKS, OfficialSocialLink } from '../utils/raffleLogic';

const SocialPlatformIcon: React.FC<{
  platform: OfficialSocialLink['platform'];
  className?: string;
}> = ({ platform, className = 'h-6 w-6' }) => {
  switch (platform) {
    case 'instagram':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
          <path d="m10 15 5-3-5-3z" fill="currentColor" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
          <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
        </svg>
      );
  }
};

export const OfficialSocialLinksGrid: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        {OFFICIAL_SOCIAL_LINKS.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-2xl border border-[#FACC15]/60 bg-[#230B3F] px-4 py-2.5 text-sm font-extrabold text-white shadow-sm transition-all duration-150 hover:border-[#FACC15] hover:bg-[#4C1D95] active:scale-95 whitespace-nowrap shrink-0"
          >
            <span className="text-[#FACC15]">
              <SocialPlatformIcon platform={item.platform} className="h-4 w-4" />
            </span>
            <span>{item.label}</span>
            <ExternalLink className="h-3.5 w-3.5 text-[#E9D5FF]/70" aria-hidden="true" />
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {OFFICIAL_SOCIAL_LINKS.map((item) => (
        <a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-between gap-3 rounded-2xl border-2 border-[#E9D5FF]/30 bg-[#230B3F]/85 px-5 py-4 text-left text-white shadow-md transition-all duration-150 hover:-translate-y-0.5 hover:border-[#FACC15] hover:bg-[#3B106C] active:scale-98"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FACC15] text-[#230B3F] shadow-sm transition-transform group-hover:scale-105">
              <SocialPlatformIcon platform={item.platform} className="h-6 w-6" />
            </div>
            <div className="min-w-0">
              <p className="font-display truncate text-base font-black text-white">
                {item.label}
              </p>
              <p className="truncate text-xs font-bold text-[#E9D5FF]">
                {item.sublabel}
              </p>
            </div>
          </div>
          <ExternalLink
            className="h-5 w-5 shrink-0 text-[#FACC15] transition-transform group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      ))}
    </div>
  );
};
