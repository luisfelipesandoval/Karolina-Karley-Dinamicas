import React, { useState } from 'react';
import { Search, Lock, ShieldCheck } from 'lucide-react';
import {
  ParticipantRecord,
  ParticipantLookupResult,
  searchParticipantByExactPhone,
} from '../utils/raffleLogic';
import { OfficialSocialLinksGrid } from './OfficialSocialLinks';

/**
 * Structure prepared for future activation with strict privacy rules:
 * - Currently disabled (`IS_PARTICIPANT_SEARCH_ACTIVE = false`).
 * - No real or invented participant data is loaded (`OFFICIAL_PARTICIPANTS = []`).
 * - When enabled in the future, it only matches exact 9-digit cell number,
 *   displays only "Sí estás participando" or "No encontramos tu número" with masked name (e.g. "Ma*** G***"),
 *   and never renders or allows downloading the full participant list.
 */
const IS_PARTICIPANT_SEARCH_ACTIVE = false;
const OFFICIAL_PARTICIPANTS: ReadonlyArray<ParticipantRecord> = [];

export const ParticipantSearchSection: React.FC = () => {
  const [phoneQuery, setPhoneQuery] = useState('');
  const [lookupResult, setLookupResult] = useState<ParticipantLookupResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!IS_PARTICIPANT_SEARCH_ACTIVE) return;
    const result = searchParticipantByExactPhone(
      phoneQuery,
      OFFICIAL_PARTICIPANTS,
      IS_PARTICIPANT_SEARCH_ACTIVE
    );
    setLookupResult(result);
  };

  return (
    <section
      id="buscador"
      aria-labelledby="buscador-heading"
      className="px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl border-2 border-[#FACC15] bg-[#3B106C] p-6 shadow-2xl sm:p-10">
          {/* Large PRÓXIMAMENTE Banner Label */}
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <h2
              id="buscador-heading"
              className="font-display text-2xl font-black tracking-tight text-white sm:text-3xl"
            >
              ¿Estás participando?
            </h2>
            <div className="inline-flex items-center gap-2 rounded-2xl bg-[#FACC15] px-5 py-2 text-base font-black tracking-wider text-[#230B3F] uppercase shadow-md sm:text-lg">
              <Lock className="h-5 w-5 shrink-0 stroke-[2.5]" aria-hidden="true" />
              <span>PRÓXIMAMENTE</span>
            </div>
          </div>

          <p className="mb-6 text-base leading-relaxed font-medium text-[#F3E8FF] sm:text-lg">
            Cuando salga la lista oficial de participantes, aquí podrás comprobar si estás dentro. Se avisará en las redes oficiales.
          </p>

          {/* Search Form: fully designed, visible, and disabled while IS_PARTICIPANT_SEARCH_ACTIVE is false */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <label htmlFor="participant-phone-input" className="sr-only">
                  Número de celular
                </label>
                <input
                  id="participant-phone-input"
                  type="tel"
                  inputMode="numeric"
                  maxLength={9}
                  value={phoneQuery}
                  onChange={(e) => setPhoneQuery(e.target.value)}
                  disabled={!IS_PARTICIPANT_SEARCH_ACTIVE}
                  placeholder="Ingresa tu número de celular"
                  className="w-full rounded-2xl border-2 border-[#C084FC]/50 bg-[#230B3F]/80 px-5 py-4 text-lg font-bold text-white placeholder-[#E9D5FF]/60 disabled:cursor-not-allowed disabled:opacity-65"
                />
              </div>
              <button
                type="submit"
                disabled={!IS_PARTICIPANT_SEARCH_ACTIVE}
                className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-[#FACC15] px-8 py-4 text-lg font-black text-[#230B3F] shadow-md transition-opacity disabled:cursor-not-allowed disabled:opacity-60 whitespace-nowrap shrink-0"
              >
                <Search className="h-5 w-5 shrink-0 stroke-[2.5]" aria-hidden="true" />
                <span>Buscar</span>
              </button>
            </div>
          </form>

          {/* Future result container (only renders when search is enabled and executed) */}
          {IS_PARTICIPANT_SEARCH_ACTIVE && lookupResult && (
            <div
              role="status"
              aria-live="polite"
              className="mt-6 rounded-2xl border border-[#E9D5FF]/30 bg-[#230B3F] p-5 text-white"
            >
              {lookupResult.status === 'participating' && (
                <div className="flex flex-col gap-1">
                  <p className="font-display text-xl font-black text-[#FACC15]">
                    {lookupResult.message}
                  </p>
                  {lookupResult.maskedName && (
                    <p className="text-base font-bold text-[#F3E8FF]">
                      Participante: <span className="font-mono">{lookupResult.maskedName}</span>
                    </p>
                  )}
                </div>
              )}
              {lookupResult.status === 'not_found' && (
                <p className="font-display text-lg font-bold text-[#FDE047]">
                  {lookupResult.message}
                </p>
              )}
              {lookupResult.status === 'invalid_query' && (
                <p className="text-base font-semibold text-[#F3E8FF]">
                  {lookupResult.message}
                </p>
              )}
            </div>
          )}

          {/* Privacy Guarantee Note */}
          <div className="mt-5 flex items-center gap-2.5 text-xs font-medium text-[#E9D5FF]/85 sm:text-sm">
            <ShieldCheck className="h-4 w-4 shrink-0 text-[#FACC15]" aria-hidden="true" />
            <span>
              Búsqueda privada por coincidencia exacta de celular. Tus datos personales están protegidos.
            </span>
          </div>

          {/* Official Social Networks Quick Links */}
          <div className="mt-7 border-t border-[#E9D5FF]/20 pt-6">
            <p className="mb-3.5 text-center text-sm font-extrabold tracking-wide text-[#FACC15] uppercase">
              Redes y canales del anuncio oficial
            </p>
            <OfficialSocialLinksGrid compact />
          </div>
        </div>
      </div>
    </section>
  );
};
