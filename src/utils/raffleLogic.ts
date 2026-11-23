export interface ParticipantRecord {
  phone: string;
  fullName: string;
}

export interface ParticipantLookupResult {
  status: 'participating' | 'not_found' | 'invalid_query' | 'disabled';
  message: string;
  maskedName?: string;
}

export interface PrizeItem {
  id: string;
  title: string;
  category: 'car' | 'cash' | 'console' | 'basket';
  colorTag?: string;
  quantity: number;
}

/**
 * Exact official data from the raffle brief.
 * Do not modify digits or text.
 */
export const OFFICIAL_RAFFLE_DATA = {
  yapeNumberRaw: '913296033',
  yapeNumberFormatted: '913 296 033',
  companyName: 'Karolina Karley S.A.C.',
  ticketPriceText: 'Cada ticket a solo S/ 2.00 soles',
  telegramNumberRaw: '914587153',
  telegramNumberFormatted: '914 587 153',
  supportEmail: 'karolinakarleysorteos@gmail.com',
  totalCarsZeroKm: 10,
  carYear: 2027,
} as const;

export const OFFICIAL_PRIZES: PrizeItem[] = [
  { id: 'jeep-compass', title: '1 Jeep Compass plata', category: 'car', colorTag: 'Plata', quantity: 1 },
  { id: 'mazda-3', title: '1 Mazda 3 rojo', category: 'car', colorTag: 'Rojo', quantity: 1 },
  { id: 'nissan-versa', title: '3 Nissan Versa (blanco, rojo y negro)', category: 'car', colorTag: 'Blanco · Rojo · Negro', quantity: 3 },
  { id: 'hyundai-exter', title: '1 Hyundai Exter roja', category: 'car', colorTag: 'Roja', quantity: 1 },
  { id: 'suzuki-swift', title: '1 Suzuki Swift rojo', category: 'car', colorTag: 'Rojo', quantity: 1 },
  { id: 'suzuki-dzire', title: '1 Suzuki Dzire blanco', category: 'car', colorTag: 'Blanco', quantity: 1 },
  { id: 'suzuki-celerio', title: '1 Suzuki Celerio plata', category: 'car', colorTag: 'Plata', quantity: 1 },
  { id: 'suzuki-fronx', title: '1 Suzuki Fronx negro perlado', category: 'car', colorTag: 'Negro perlado', quantity: 1 },
  { id: 'efectivo-500', title: '100 premios de S/ 500 cada uno', category: 'cash', quantity: 100 },
  { id: 'efectivo-1500', title: '10 premios de S/ 1,500 cada uno', category: 'cash', quantity: 10 },
  { id: 'ps5-gta6', title: '5 PlayStation 5, cada una con su juego GTA 6', category: 'console', quantity: 5 },
  { id: 'canastas-400', title: '40 canastas navideñas valorizadas en S/ 400 cada una', category: 'basket', quantity: 40 },
];

/**
 * Strips spaces and validates an exact 9-digit Peruvian mobile number starting with 9.
 */
export function normalizePhoneInput(input: string): string {
  return input.replace(/\s+/g, '').trim();
}

export function isValidExactPeruvianPhone(phone: string): boolean {
  const normalized = normalizePhoneInput(phone);
  return /^9\d{8}$/.test(normalized);
}

/**
 * Partially masks a participant's full name for privacy (e.g., "María Gómez" -> "Ma*** G***")
 * Never exposes full names or phone numbers.
 */
export function maskParticipantName(fullName: string): string {
  const parts = fullName
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (parts.length === 0) return '***';

  return parts
    .map((word, index) => {
      if (index === 0) {
        const visible = word.slice(0, Math.min(2, word.length));
        return `${visible}***`;
      }
      const visible = word.slice(0, 1);
      return `${visible}***`;
    })
    .join(' ');
}

/**
 * Privacy-preserving exact match lookup structure ready for future activation.
 * Rules:
 * - Currently disabled by default (`isSearchEnabled = false`), returning NO data.
 * - Only accepts exact 9-digit cell phone number match (no partial search, no list browsing).
 * - Only returns "Sí estás participando" or "No encontramos tu número" with masked name.
 * - Never returns the full phone number or the full list of participants.
 */
export function searchParticipantByExactPhone(
  query: string,
  records: ReadonlyArray<ParticipantRecord>,
  isSearchEnabled = false
): ParticipantLookupResult {
  if (!isSearchEnabled) {
    return {
      status: 'disabled',
      message:
        'Cuando salga la lista oficial de participantes, aquí podrás comprobar si estás dentro. Te avisaremos en nuestras redes.',
    };
  }

  const normalizedQuery = normalizePhoneInput(query);
  if (!isValidExactPeruvianPhone(normalizedQuery)) {
    return {
      status: 'invalid_query',
      message: 'Ingresa un número de celular válido de 9 dígitos para realizar la búsqueda exacta.',
    };
  }

  const exactMatch = records.find(
    (record) => normalizePhoneInput(record.phone) === normalizedQuery
  );

  if (!exactMatch) {
    return {
      status: 'not_found',
      message: 'No encontramos tu número',
    };
  }

  return {
    status: 'participating',
    message: 'Sí estás participando',
    maskedName: maskParticipantName(exactMatch.fullName),
  };
}
