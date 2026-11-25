import React, { useState } from 'react';
import { Search, Ticket, Clock, AlertCircle, Loader2, Info } from 'lucide-react';
import {
  ParticipantJsonRecord,
  PARTICIPANT_SEARCH_COPY,
  normalizeParticipantSearchText,
  hasMinimumThreeLetters,
  getParticipantFileKey,
  filterAndSortParticipants,
} from '../utils/raffleLogic';
import { OfficialSocialLinksGrid } from './OfficialSocialLinks';

/**
 * In-memory cache of downloaded participant JSON files by key ('A'...'Z' | 'OTROS')
 * so each file is fetched at most once per session.
 */
const participantFileCache = new Map<string, ParticipantJsonRecord[]>();

type SearchState =
  | { status: 'idle' }
  | { status: 'min_letters' }
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'results'; matches: ParticipantJsonRecord[]; normalizedQuery: string };

export const ParticipantSearchSection: React.FC = () => {
  const [nameQuery, setNameQuery] = useState('');
  const [searchState, setSearchState] = useState<SearchState>({ status: 'idle' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const normalized = normalizeParticipantSearchText(nameQuery);
    if (!hasMinimumThreeLetters(normalized)) {
      setSearchState({ status: 'min_letters' });
      return;
    }

    const fileKey = getParticipantFileKey(normalized);

    try {
      let records = participantFileCache.get(fileKey);

      if (!records) {
        setSearchState({ status: 'loading' });
        const response = await fetch(`/data/participantes_${fileKey}.json`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data: unknown = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Formato de lista inválido');
        }
        records = data as ParticipantJsonRecord[];
        participantFileCache.set(fileKey, records);
      }

      const matches = filterAndSortParticipants(records, normalized);
      setSearchState({
        status: 'results',
        matches,
        normalizedQuery: normalized,
      });
    } catch {
      setSearchState({ status: 'error' });
    }
  };

  return (
    <section
      id="buscador"
      aria-labelledby="buscador-heading"
      className="px-4 py-12 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <div className="relative overflow-hidden rounded-3xl border-2 border-[#FACC15] bg-[#3B106C] p-6 shadow-2xl sm:p-10">
          {/* Heading without "Próximamente" badge */}
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <h2
              id="buscador-heading"
              className="font-display text-2xl font-black tracking-tight text-white sm:text-3xl"
            >
              ¿Estás participando?
            </h2>
          </div>

          {/* Help Text */}
          <p className="mb-6 text-base leading-relaxed font-medium text-[#F3E8FF] sm:text-lg">
            {PARTICIPANT_SEARCH_COPY.helpText}
          </p>

          {/* Active Search Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex-1">
                <label htmlFor="participant-name-input" className="sr-only">
                  Tu primer nombre y las 3 primeras letras de tu apellido
                </label>
                <input
                  id="participant-name-input"
                  data-testid="participant-name-input"
                  type="text"
                  autoComplete="off"
                  value={nameQuery}
                  onChange={(e) => setNameQuery(e.target.value)}
                  placeholder="Ejemplo: Maria Per"
                  className="w-full rounded-2xl border-2 border-[#C084FC]/60 bg-[#230B3F]/90 px-5 py-4 text-lg font-bold text-white placeholder-[#E9D5FF]/55 transition-colors focus:border-[#FACC15] focus:outline-none"
                />
              </div>
              <button
                type="submit"
                data-testid="participant-search-button"
                disabled={searchState.status === 'loading'}
                className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-2xl bg-[#FACC15] px-8 py-4 text-lg font-black text-[#230B3F] shadow-md transition-all hover:bg-[#FDE047] active:scale-95 disabled:cursor-wait disabled:opacity-75 whitespace-nowrap shrink-0"
              >
                {searchState.status === 'loading' ? (
                  <Loader2 className="h-5 w-5 shrink-0 animate-spin stroke-[2.5]" aria-hidden="true" />
                ) : (
                  <Search className="h-5 w-5 shrink-0 stroke-[2.5]" aria-hidden="true" />
                )}
                <span>Buscar</span>
              </button>
            </div>
          </form>

          {/* Dynamic Search Status & Results Container */}
          {searchState.status !== 'idle' && (
            <div
              role="status"
              aria-live="polite"
              data-testid="participant-search-results"
              className="mt-6"
            >
              {searchState.status === 'min_letters' && (
                <div className="flex items-center gap-3 rounded-2xl border border-[#FACC15]/50 bg-[#230B3F] p-4 text-[#FEF08A]">
                  <AlertCircle className="h-5 w-5 shrink-0 text-[#FACC15]" aria-hidden="true" />
                  <p className="text-sm font-bold sm:text-base">
                    {PARTICIPANT_SEARCH_COPY.minLettersError}
                  </p>
                </div>
              )}

              {searchState.status === 'loading' && (
                <div className="flex items-center justify-center gap-3 rounded-2xl border border-[#E9D5FF]/30 bg-[#230B3F] p-6 text-white">
                  <Loader2 className="h-6 w-6 shrink-0 animate-spin text-[#FACC15]" aria-hidden="true" />
                  <p className="text-base font-bold text-[#F3E8FF]">
                    Buscando coincidencias...
                  </p>
                </div>
              )}

              {searchState.status === 'error' && (
                <div className="flex items-center gap-3 rounded-2xl border-2 border-[#FACC15] bg-[#230B3F] p-5 text-[#FEF08A]">
                  <AlertCircle className="h-6 w-6 shrink-0 text-[#FACC15]" aria-hidden="true" />
                  <p className="text-base font-extrabold">
                    {PARTICIPANT_SEARCH_COPY.loadError}
                  </p>
                </div>
              )}

              {searchState.status === 'results' && searchState.matches.length === 0 && (
                <div className="rounded-2xl border border-[#FACC15]/50 bg-[#230B3F] p-5 text-white">
                  <p className="text-base leading-relaxed font-extrabold text-[#FEF08A] sm:text-lg">
                    {PARTICIPANT_SEARCH_COPY.noMatches}
                  </p>
                </div>
              )}

              {searchState.status === 'results' && searchState.matches.length > 0 && (
                <div className="space-y-3">
                  {searchState.matches.map((item, idx) => (
                    <div
                      key={`${item.nombre}-${idx}`}
                      data-testid="participant-result-item"
                      className="flex flex-col justify-between gap-3 rounded-2xl border border-[#E9D5FF]/30 bg-[#230B3F]/95 p-4 text-white shadow-md sm:flex-row sm:items-center sm:px-5"
                    >
                      <div className="min-w-0">
                        <p
                          data-testid="participant-result-name"
                          className="font-display text-lg font-black tracking-wide text-white sm:text-xl"
                        >
                          {item.nombre}
                        </p>
                        <div className="mt-1 flex items-center gap-1.5 text-xs font-bold text-[#E9D5FF] sm:text-sm">
                          <Clock className="h-4 w-4 shrink-0 text-[#FACC15]" aria-hidden="true" />
                          <span>
                            Último ticket:{' '}
                            <strong
                              data-testid="participant-result-date"
                              className="font-extrabold text-white tabular-nums"
                            >
                              {item.ultima_fecha}
                            </strong>
                          </span>
                        </div>
                      </div>

                      <div className="inline-flex items-center gap-2 self-start rounded-xl bg-[#FACC15] px-4 py-2 text-[#230B3F] shadow-sm sm:self-center whitespace-nowrap shrink-0">
                        <Ticket className="h-5 w-5 shrink-0 stroke-[2.5]" aria-hidden="true" />
                        <span
                          data-testid="participant-result-tickets"
                          className="font-display text-base font-black tabular-nums sm:text-lg"
                        >
                          {item.tickets} {item.tickets === 1 ? 'ticket' : 'tickets'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Fixed Bottom Disclaimer Message */}
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#E9D5FF]/25 bg-[#230B3F]/80 p-4 text-xs leading-relaxed font-semibold text-[#F3E8FF] sm:text-sm">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#FACC15]" aria-hidden="true" />
            <p data-testid="participant-fixed-disclaimer">
              {PARTICIPANT_SEARCH_COPY.fixedFooterDisclaimer}
            </p>
          </div>

          {/* Official Social Networks Quick Links */}
          <div className="mt-7 border-t border-[#E9D5FF]/20 pt-6">
            <p className="mb-3.5 text-center text-sm font-extrabold tracking-wide text-[#FACC15] uppercase">
              Redes y canales del anuncio oficial de la organizadora
            </p>
            <OfficialSocialLinksGrid compact />
          </div>
        </div>
      </div>
    </section>
  );
};

