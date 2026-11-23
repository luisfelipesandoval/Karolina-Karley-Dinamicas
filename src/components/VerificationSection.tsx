import React from 'react';
import {
  Megaphone,
  Ticket,
  FileCheck2,
  MapPin,
  UserCheck,
  Users,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { UNOFFICIAL_PAGE_COPY } from '../utils/raffleLogic';

const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'h-6 w-6' }) => (
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

export const VerificationSection: React.FC = () => {
  const announcementItems = [
    {
      text: UNOFFICIAL_PAGE_COPY.accordingToAnnouncementCards[0],
      icon: <Megaphone className="h-6 w-6 stroke-[2.25]" aria-hidden="true" />,
    },
    {
      text: UNOFFICIAL_PAGE_COPY.accordingToAnnouncementCards[1],
      icon: <Ticket className="h-6 w-6 stroke-[2.25]" aria-hidden="true" />,
    },
    {
      text: UNOFFICIAL_PAGE_COPY.accordingToAnnouncementCards[2],
      icon: <FileCheck2 className="h-6 w-6 stroke-[2.25]" aria-hidden="true" />,
    },
    {
      text: UNOFFICIAL_PAGE_COPY.accordingToAnnouncementCards[3],
      icon: <MapPin className="h-6 w-6 stroke-[2.25]" aria-hidden="true" />,
    },
    {
      text: UNOFFICIAL_PAGE_COPY.accordingToAnnouncementCards[4],
      icon: <UserCheck className="h-6 w-6 stroke-[2.25]" aria-hidden="true" />,
    },
    {
      text: UNOFFICIAL_PAGE_COPY.accordingToAnnouncementCards[5],
      icon: <Users className="h-6 w-6 stroke-[2.25]" aria-hidden="true" />,
    },
  ];

  return (
    <section
      id="verificacion-anuncio"
      aria-labelledby="verificacion-heading"
      className="scroll-mt-12 px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Section Title */}
        <div className="text-center">
          <h2
            id="verificacion-heading"
            className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl"
          >
            Qué dice el anuncio oficial y cómo verificarlo
          </h2>
        </div>

        {/* 1. Tarjetas "Según el anuncio oficial" */}
        <div className="rounded-3xl border-2 border-[#E9D5FF]/30 bg-[#3B106C]/90 p-6 shadow-xl sm:p-8">
          <h3 className="font-display mb-5 text-xl font-black text-[#FACC15] sm:text-2xl">
            Según el anuncio oficial
          </h3>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {announcementItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 rounded-2xl border border-[#E9D5FF]/25 bg-[#230B3F]/85 p-4 shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FACC15] text-[#230B3F]">
                  {item.icon}
                </div>
                <p className="font-display text-base leading-snug font-extrabold text-white sm:text-lg">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Bloque "Cómo verificar tú mismo" */}
        <div className="rounded-3xl border-2 border-[#FACC15] bg-[#28094B]/95 p-6 shadow-2xl sm:p-8">
          <h3 className="font-display mb-5 text-xl font-black text-[#FACC15] sm:text-2xl">
            Cómo verificar tú mismo
          </h3>

          <ol className="space-y-3.5">
            {UNOFFICIAL_PAGE_COPY.howToVerifySteps.map((step, index) => (
              <li
                key={index}
                className="flex items-start gap-4 rounded-2xl border border-[#E9D5FF]/20 bg-[#230B3F]/90 p-4"
              >
                <span className="font-display flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FACC15] text-base font-black text-[#230B3F] tabular-nums">
                  {index + 1}
                </span>
                <p className="pt-0.5 text-base leading-relaxed font-bold text-white sm:text-lg">
                  {step}
                </p>
              </li>
            ))}
          </ol>

          {/* 3. Caja de alerta */}
          <div className="mt-6 flex flex-col gap-3 rounded-2xl border-2 border-[#FACC15] bg-[#1B0733] p-5 sm:flex-row sm:items-center sm:gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FACC15] text-[#230B3F]">
              <AlertTriangle className="h-7 w-7 stroke-[2.5]" aria-hidden="true" />
            </div>
            <p className="text-base leading-relaxed font-extrabold text-[#FEF08A] sm:text-lg">
              {UNOFFICIAL_PAGE_COPY.verificationAlertBox}
            </p>
          </div>
        </div>

        {/* 4. CANALES OFICIALES: Botón grande "TikTok oficial de Karolina Karley" */}
        <div className="flex justify-center pt-2">
          <a
            href={UNOFFICIAL_PAGE_COPY.officialTiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full max-w-xl items-center justify-center gap-3 rounded-full border-2 border-white bg-[#FACC15] px-8 py-4 text-center text-lg font-black text-[#230B3F] shadow-2xl transition-transform duration-150 hover:bg-[#FDE047] active:scale-95 sm:py-5 sm:text-xl"
          >
            <TikTokIcon className="h-6 w-6 shrink-0" />
            <span>{UNOFFICIAL_PAGE_COPY.officialTiktokButtonText}</span>
            <ExternalLink className="h-5 w-5 shrink-0" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};
