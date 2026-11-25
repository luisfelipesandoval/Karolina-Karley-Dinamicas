import React, { useState } from 'react';
import {
  Search,
  Ticket,
  Clock,
  AlertCircle,
  Loader2,
  Info,
  Calendar,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';
import {
  ParticipantJsonRecord,
  TicketDetailEntry,
  PARTICIPANT_SEARCH_COPY,
  PARTICIPANT_DETAIL_COPY,
  normalizeParticipantSearchText,
  hasMinimumThreeLetters,
  getParticipantFileKey,
  filterAndSortParticipants,
  buildTicketDetailEntries,
  buildDayTicketSummaries,
  doesTicketTimeMatch,
} from '../utils/raffleLogic';
import { OfficialSocialLinksGrid } from './OfficialSocialLinks';

/**
 * In-memory cache of downloaded participant JSON files by key ('A'...'Z' | 'OTROS')
 * so each file is fetched at most once per session.
 */
const participantFileCache = new Map<string, ParticipantJsonRecord[]>();

/**
 * In-memory cache of downloaded detail JSON files by key ('A'...'Z' | 'OTROS')
 * so each /data/detalle/detalle_X.json file is fetched at most once per session.
 */
const detailFileCache = new Map<string, Record<string, number[]>>();

type SearchState =
  | { status: 'idle' }
  | { status: 'min_letters' }
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'results'; matches: ParticipantJsonRecord[]; normalizedQuery: string };

type DetailPanelState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'loaded'; entries: TicketDetailEntry[] };

const ParticipantTicketDetailPanel: React.FC<{
  participantName: string;
  entries: TicketDetailEntry[];
}> = ({ participantName, entries }) => {
  const [selectedDay, setSelectedDay] = useState<string>('ALL');
  const [timeQuery, setTimeQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const daySummaries = buildDayTicketSummaries(entries);

  const filteredByDay =
    selectedDay === 'ALL'
      ? entries
      : entries.filter((entry) => entry.fecha === selectedDay);

  const pageSize = PARTICIPANT_DETAIL_COPY.pageSize;
  const totalPages = Math.max(1, Math.ceil(filteredByDay.length / pageSize));
  const safePage = Math.min(Math.max(1, currentPage), totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const currentRows = filteredByDay.slice(startIndex, startIndex + pageSize);

  const cleanedTimeQuery = timeQuery.trim();
  const matchingTimeEntries = cleanedTimeQuery
    ? filteredByDay.filter((entry) => doesTicketTimeMatch(entry.hora, cleanedTimeQuery))
    : [];

  const handleDayChange = (newDay: string) => {
    setSelectedDay(newDay);
    const nextList =
      newDay === 'ALL' ? entries : entries.filter((entry) => entry.fecha === newDay);
    if (cleanedTimeQuery) {
      const firstMatchIdx = nextList.findIndex((entry) =>
        doesTicketTimeMatch(entry.hora, cleanedTimeQuery)
      );
      if (firstMatchIdx >= 0) {
        setCurrentPage(Math.floor(firstMatchIdx / pageSize) + 1);
        return;
      }
    }
    setCurrentPage(1);
  };

  const handleTimeQueryChange = (newTime: string) => {
    setTimeQuery(newTime);
    const trimmed = newTime.trim();
    if (!trimmed) return;
    const firstMatchIdx = filteredByDay.findIndex((entry) =>
      doesTicketTimeMatch(entry.hora, trimmed)
    );
    if (firstMatchIdx >= 0) {
      setCurrentPage(Math.floor(firstMatchIdx / pageSize) + 1);
    }
  };

  return (
    <div
      data-testid="participant-detail-panel"
      aria-label={`Detalle de tickets de ${participantName}`}
      className="mt-4 space-y-5 rounded-2xl border-2 border-[#FACC15]/70 bg-[#1B0733]/95 p-4 text-white shadow-inner sm:p-6"
    >
      {/* Fixed warning text above the list */}
      <div className="flex items-start gap-3 rounded-2xl border border-[#FACC15]/50 bg-[#2E1052] p-3.5 text-xs leading-relaxed font-bold text-[#FEF08A] sm:text-sm">
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-[#FACC15]" aria-hidden="true" />
        <p data-testid="detail-fixed-notice">{PARTICIPANT_DETAIL_COPY.fixedNotice}</p>
      </div>

      {/* 1. Resumen por día */}
      <div>
        <h3 className="font-display mb-3 flex items-center gap-2 text-base font-black text-[#FACC15] sm:text-lg">
          <Calendar className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>Resumen por día ({daySummaries.length} {daySummaries.length === 1 ? 'día' : 'días'})</span>
        </h3>

        <div
          data-testid="detail-day-summaries"
          className="grid grid-cols-1 gap-2.5 sm:grid-cols-2"
        >
          {daySummaries.map((day) => {
            const isSelected = selectedDay === day.fecha;
            return (
              <div
                key={day.fecha}
                data-testid="detail-day-summary-card"
                className={`rounded-xl border p-3.5 transition-colors ${
                  isSelected
                    ? 'border-[#FACC15] bg-[#3B106C]'
                    : 'border-[#E9D5FF]/25 bg-[#230B3F]/90'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <span
                    data-testid="day-summary-date"
                    className="font-display text-base font-black text-white tabular-nums"
                  >
                    {day.fecha}
                  </span>
                  <span
                    data-testid="day-summary-count"
                    className="rounded-lg bg-[#FACC15] px-2.5 py-0.5 text-xs font-black text-[#230B3F] tabular-nums"
                  >
                    {day.count} {day.count === 1 ? 'ticket' : 'tickets'}
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs font-bold text-[#E9D5FF]">
                  <div>
                    <span className="text-[#E9D5FF]/75">Primero: </span>
                    <strong
                      data-testid="day-summary-first-time"
                      className="font-extrabold text-white tabular-nums"
                    >
                      {day.firstTime}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#E9D5FF]/75">Último: </span>
                    <strong
                      data-testid="day-summary-last-time"
                      className="font-extrabold text-white tabular-nums"
                    >
                      {day.lastTime}
                    </strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Filtros: Selector por día + Buscador de hora exacta */}
      <div className="grid grid-cols-1 gap-3 rounded-2xl border border-[#E9D5FF]/20 bg-[#230B3F] p-4 sm:grid-cols-2">
        {/* Selector para filtrar por día */}
        <div>
          <label
            htmlFor={`day-filter-${participantName}`}
            className="mb-1.5 block text-xs font-extrabold tracking-wide text-[#FACC15] uppercase"
          >
            Filtrar por día
          </label>
          <select
            id={`day-filter-${participantName}`}
            data-testid="detail-day-select"
            value={selectedDay}
            onChange={(e) => handleDayChange(e.target.value)}
            className="w-full rounded-xl border-2 border-[#C084FC]/50 bg-[#16052A] px-3.5 py-2.5 text-sm font-bold text-white focus:border-[#FACC15] focus:outline-none"
          >
            <option value="ALL">
              Todos los días ({entries.length} {entries.length === 1 ? 'ticket' : 'tickets'})
            </option>
            {daySummaries.map((day) => (
              <option key={day.fecha} value={day.fecha}>
                {day.fecha} ({day.count} {day.count === 1 ? 'ticket' : 'tickets'})
              </option>
            ))}
          </select>
        </div>

        {/* Campo para buscar una hora exacta */}
        <div>
          <label
            htmlFor={`time-search-${participantName}`}
            className="mb-1.5 block text-xs font-extrabold tracking-wide text-[#FACC15] uppercase"
          >
            Buscar hora exacta (comprobante Yape)
          </label>
          <div className="relative">
            <input
              id={`time-search-${participantName}`}
              data-testid="detail-time-input"
              type="text"
              inputMode="text"
              autoComplete="off"
              value={timeQuery}
              onChange={(e) => handleTimeQueryChange(e.target.value)}
              placeholder="Ejemplo: 00:03:04"
              className="w-full rounded-xl border-2 border-[#C084FC]/50 bg-[#16052A] px-3.5 py-2.5 text-sm font-bold text-white tabular-nums placeholder-[#E9D5FF]/50 focus:border-[#FACC15] focus:outline-none"
            />
          </div>
        </div>

        {cleanedTimeQuery && (
          <div className="sm:col-span-2">
            {matchingTimeEntries.length > 0 ? (
              <p
                data-testid="detail-time-match-status"
                className="flex items-center gap-2 rounded-xl bg-[#FACC15]/20 px-3 py-2 text-xs font-extrabold text-[#FEF08A] sm:text-sm"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-[#FACC15]" aria-hidden="true" />
                <span>
                  Se {matchingTimeEntries.length === 1 ? 'resaltó 1 ticket' : `resaltaron ${matchingTimeEntries.length} tickets`} con la hora «{cleanedTimeQuery}» (N°{' '}
                  {matchingTimeEntries.map((m) => m.numero).join(', ')}).
                </span>
              </p>
            ) : (
              <p
                data-testid="detail-time-match-status"
                className="rounded-xl bg-[#3B106C] px-3 py-2 text-xs font-bold text-[#E9D5FF] sm:text-sm"
              >
                No se encontraron tickets con la hora «{cleanedTimeQuery}» en el filtro seleccionado.
              </p>
            )}
          </div>
        )}
      </div>

      {/* 3. Tabla de tickets (N°, Fecha, Hora) ordenada de más antiguo a más reciente, paginada de 50 en 50 */}
      <div>
        <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-[#E9D5FF] sm:text-sm">
          <span data-testid="detail-total-count">
            Total en tabla: <strong className="font-black text-[#FACC15] tabular-nums">{filteredByDay.length}</strong>{' '}
            {filteredByDay.length === 1 ? 'ticket' : 'tickets'}
          </span>
          {filteredByDay.length > 0 && (
            <span data-testid="detail-page-indicator" className="tabular-nums">
              Mostrando {startIndex + 1}–{Math.min(startIndex + pageSize, filteredByDay.length)} de{' '}
              {filteredByDay.length} (Página {safePage} de {totalPages})
            </span>
          )}
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#E9D5FF]/30 bg-[#16052A]">
          <div className="overflow-x-auto">
            <table
              data-testid="detail-tickets-table"
              className="w-full border-collapse text-left text-sm"
            >
              <thead>
                <tr className="border-b border-[#E9D5FF]/25 bg-[#2E1052] text-xs font-black tracking-wider text-[#FACC15] uppercase sm:text-sm">
                  <th scope="col" className="px-4 py-3">
                    N°
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Fecha
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Hora
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E9D5FF]/15">
                {currentRows.map((row) => {
                  const isHighlighted = doesTicketTimeMatch(row.hora, cleanedTimeQuery);
                  return (
                    <tr
                      key={row.numero}
                      data-testid="detail-ticket-row"
                      data-highlighted={isHighlighted ? 'true' : 'false'}
                      className={
                        isHighlighted
                          ? 'bg-[#FACC15] font-black text-[#230B3F]'
                          : 'odd:bg-[#1B0733] even:bg-[#230B3F]/80 text-white hover:bg-[#3B106C]/70'
                      }
                    >
                      <td className="px-4 py-2.5 font-mono text-xs font-extrabold tabular-nums sm:text-sm">
                        {row.numero}
                      </td>
                      <td className="px-4 py-2.5 font-bold tabular-nums">{row.fecha}</td>
                      <td className="px-4 py-2.5 font-mono font-extrabold tabular-nums">
                        <span className="inline-flex items-center gap-2">
                          <span>{row.hora}</span>
                          {isHighlighted && (
                            <span className="rounded-md bg-[#230B3F] px-2 py-0.5 font-sans text-[11px] font-black text-[#FACC15]">
                              Coincide
                            </span>
                          )}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Controles de paginación: Anterior y Siguiente (50 en 50) */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              data-testid="detail-prev-page"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safePage <= 1}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-[#FACC15] bg-[#230B3F] px-4 py-2.5 text-sm font-black text-[#FACC15] shadow-sm transition-colors hover:bg-[#3B106C] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4 shrink-0 stroke-[2.5]" aria-hidden="true" />
              <span>Anterior</span>
            </button>

            <span className="text-xs font-extrabold text-[#F3E8FF] tabular-nums sm:text-sm">
              Página {safePage} de {totalPages}
            </span>

            <button
              type="button"
              data-testid="detail-next-page"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={safePage >= totalPages}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border border-[#FACC15] bg-[#FACC15] px-4 py-2.5 text-sm font-black text-[#230B3F] shadow-sm transition-colors hover:bg-[#FDE047] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <span>Siguiente</span>
              <ChevronRight className="h-4 w-4 shrink-0 stroke-[2.5]" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const ParticipantSearchSection: React.FC = () => {
  const [nameQuery, setNameQuery] = useState('');
  const [searchState, setSearchState] = useState<SearchState>({ status: 'idle' });
  const [openDetailsMap, setOpenDetailsMap] = useState<Record<string, DetailPanelState>>({});
  const [expandedNames, setExpandedNames] = useState<Record<string, boolean>>({});

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
      setExpandedNames({});
      setSearchState({
        status: 'results',
        matches,
        normalizedQuery: normalized,
      });
    } catch {
      setSearchState({ status: 'error' });
    }
  };

  const handleToggleTicketDetails = async (exactNombre: string) => {
    const currentlyExpanded = Boolean(expandedNames[exactNombre]);
    if (currentlyExpanded && openDetailsMap[exactNombre]?.status === 'loaded') {
      setExpandedNames((prev) => ({ ...prev, [exactNombre]: false }));
      return;
    }

    setExpandedNames((prev) => ({ ...prev, [exactNombre]: true }));

    // If already loaded in state for this participant, no need to re-process
    if (openDetailsMap[exactNombre]?.status === 'loaded') {
      return;
    }

    const fileKey = getParticipantFileKey(exactNombre);

    try {
      let detailObject = detailFileCache.get(fileKey);

      if (!detailObject) {
        setOpenDetailsMap((prev) => ({
          ...prev,
          [exactNombre]: { status: 'loading' },
        }));

        const response = await fetch(`/data/detalle/detalle_${fileKey}.json`);
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        const data: unknown = await response.json();
        if (!data || typeof data !== 'object' || Array.isArray(data)) {
          throw new Error('Formato de detalle inválido');
        }
        detailObject = data as Record<string, number[]>;
        detailFileCache.set(fileKey, detailObject);
      }

      const rawSeconds = detailObject[exactNombre];
      if (!Array.isArray(rawSeconds)) {
        throw new Error('No se encontró el detalle del participante');
      }

      const entries = buildTicketDetailEntries(rawSeconds);
      setOpenDetailsMap((prev) => ({
        ...prev,
        [exactNombre]: { status: 'loaded', entries },
      }));
    } catch {
      setOpenDetailsMap((prev) => ({
        ...prev,
        [exactNombre]: { status: 'error' },
      }));
    }
  };

  return (
    <section
      id="buscador"
      aria-labelledby="buscador-heading"
      className="scroll-mt-16 px-4 py-10 sm:px-6 lg:px-8"
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
                <div className="space-y-3.5">
                  {searchState.matches.map((item, idx) => {
                    const isExpanded = Boolean(expandedNames[item.nombre]);
                    const detailState = openDetailsMap[item.nombre];

                    return (
                      <div
                        key={`${item.nombre}-${idx}`}
                        data-testid="participant-result-item"
                        className="rounded-2xl border border-[#E9D5FF]/30 bg-[#230B3F]/95 p-4 text-white shadow-md sm:px-5"
                      >
                        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
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

                          <div className="flex flex-wrap items-center gap-2.5">
                            <div className="inline-flex items-center gap-2 rounded-xl bg-[#FACC15] px-4 py-2 text-[#230B3F] shadow-sm whitespace-nowrap shrink-0">
                              <Ticket className="h-5 w-5 shrink-0 stroke-[2.5]" aria-hidden="true" />
                              <span
                                data-testid="participant-result-tickets"
                                className="font-display text-base font-black tabular-nums sm:text-lg"
                              >
                                {item.tickets} {item.tickets === 1 ? 'ticket' : 'tickets'}
                              </span>
                            </div>

                            <button
                              type="button"
                              data-testid="view-all-tickets-button"
                              onClick={() => handleToggleTicketDetails(item.nombre)}
                              className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl border-2 border-[#FACC15] bg-[#3B106C] px-4 py-2 text-sm font-black text-[#FACC15] shadow-sm transition-colors hover:bg-[#4C1D95] active:scale-95 whitespace-nowrap shrink-0"
                            >
                              <span>
                                {isExpanded && detailState?.status === 'loaded'
                                  ? PARTICIPANT_DETAIL_COPY.buttonHideTickets
                                  : PARTICIPANT_DETAIL_COPY.buttonViewTickets}
                              </span>
                              {isExpanded && detailState?.status === 'loaded' ? (
                                <ChevronUp className="h-4 w-4 shrink-0 stroke-[2.5]" aria-hidden="true" />
                              ) : (
                                <ChevronDown className="h-4 w-4 shrink-0 stroke-[2.5]" aria-hidden="true" />
                              )}
                            </button>
                          </div>
                        </div>

                        {/* Expanded Ticket Details View */}
                        {isExpanded && detailState && (
                          <div className="mt-3">
                            {detailState.status === 'loading' && (
                              <div
                                data-testid="detail-loading-indicator"
                                className="flex items-center justify-center gap-3 rounded-2xl border border-[#E9D5FF]/25 bg-[#1B0733] p-5 text-white"
                              >
                                <Loader2
                                  className="h-5 w-5 shrink-0 animate-spin text-[#FACC15]"
                                  aria-hidden="true"
                                />
                                <span className="text-sm font-bold text-[#F3E8FF]">
                                  Cargando todos los tickets...
                                </span>
                              </div>
                            )}

                            {detailState.status === 'error' && (
                              <div
                                data-testid="detail-error-message"
                                className="flex items-center gap-3 rounded-2xl border-2 border-[#FACC15] bg-[#1B0733] p-4 text-[#FEF08A]"
                              >
                                <AlertCircle
                                  className="h-5 w-5 shrink-0 text-[#FACC15]"
                                  aria-hidden="true"
                                />
                                <p className="text-sm font-extrabold sm:text-base">
                                  {PARTICIPANT_DETAIL_COPY.loadError}
                                </p>
                              </div>
                            )}

                            {detailState.status === 'loaded' && (
                              <ParticipantTicketDetailPanel
                                participantName={item.nombre}
                                entries={detailState.entries}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
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


