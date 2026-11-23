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
  imageUrl: string;
  secondaryImages?: string[];
  altText: string;
  isReferential?: boolean;
}

export const OFFICIAL_IMAGES = {
  favicon: '/assets/aistudio/657246ce-5a7c-4e3c-9816-e2541542ca4d_67416a0f.png',
  snowman: '/assets/aistudio/Mu_eco_de_nieve_con_gorro_88da30cc_eb463a60.jpg',
  elf: '/assets/aistudio/Smiling_Christmas_elf_illustration_f15f8eeb_a51a964b.jpg',
  ticket: '/assets/aistudio/Boleto_dorado_flotando_con_estrella_935e390c_6a5cf73c.jpg',
  legalDocument: '/assets/aistudio/Document_with_pen_flat_icon_3fe0156a_c4b0bbb2.jpg',
  legalShield: '/assets/aistudio/Escudo_con_check_morado_dorado_1ec66196_dd0d1576.jpg',
  legalCalendar: '/assets/aistudio/Purple_calendar_flat_icon_aeb0db5d_16ca1728.jpg',
} as const;

export const UNOFFICIAL_PAGE_COPY = {
  pageTitle: 'Sorteo Navidad: información y búsqueda',
  topFixedBanner:
    'Página NO oficial, creada por un clipero para facilitar la información del sorteo. No vendemos tickets ni recibimos pagos. Los datos provienen del anuncio oficial. Verifica siempre en los canales oficiales.',
  heroSubtitle: 'Sorteo anunciado por Karolina Karley (según su anuncio oficial)',
  yapeCardTitle: 'Yape indicado en el anuncio oficial',
  yapeVerificationNote: 'Verifícalo en el canal oficial antes de depositar',
  legalPaymentDisclaimer:
    'Esta página no recibe ni gestiona pagos. Verifica siempre los datos en los canales oficiales antes de depositar.',
  footerCreatorDisclaimer: 'Página creada por un clipero. No es la página oficial del sorteo.',
  officialTiktokUrl: 'https://www.tiktok.com/@karolinakarley2',
  officialTiktokButtonText: 'TikTok oficial de Karolina Karley',
  creatorCardText: 'Página creada por un clipero. No es la página oficial del sorteo',
  creatorTiktokUrl: 'https://www.tiktok.com/@clipzasos18',
  creatorTiktokButtonText: 'Sígueme en TikTok: @clipzasos18',
  accordingToAnnouncementCards: [
    'Anunciado por Karolina Karley, según su anuncio oficial.',
    'Precio del ticket: S/ 2.00 soles cada uno.',
    'Con presencia de notario, según el anuncio.',
    'Participa todo el Perú.',
    'Participan únicamente mayores de 18 años.',
    'El cierre de la dinámica depende de ustedes.',
  ],
  howToVerifySteps: [
    'Entra al TikTok oficial de Karolina Karley y compara el Yape, el Telegram y el correo con los de esta página.',
    'Si algún dato no coincide, no deposites.',
    'Coloca siempre tus nombres completos y tu celular en la descripción del Yape, como indica el anuncio.',
    'Guarda la captura de tu pago.',
    'Mira el sorteo en vivo en sus canales oficiales.',
  ],
  verificationAlertBox:
    "Solo ella puede confirmar sus canales oficiales. Si te piden dinero por otro número, otra cuenta o para 'asegurar tu premio', no deposites.",
} as const;

export interface OfficialSocialLink {
  id: string;
  platform: 'instagram' | 'whatsapp' | 'youtube' | 'tiktok';
  label: string;
  sublabel: string;
  url: string;
}

export const OFFICIAL_SOCIAL_LINKS: OfficialSocialLink[] = [
  {
    id: 'instagram-channel',
    platform: 'instagram',
    label: 'Instagram',
    sublabel: 'Canal oficial',
    url: 'https://www.instagram.com/channel/AbbqiyhkRSQoUB2c/',
  },
  {
    id: 'whatsapp-channel-1',
    platform: 'whatsapp',
    label: 'WhatsApp · Canal 1',
    sublabel: 'Canal de difusión',
    url: 'https://whatsapp.com/channel/0029VbBum7o6RGJQNfeN9o32',
  },
  {
    id: 'whatsapp-channel-2',
    platform: 'whatsapp',
    label: 'WhatsApp · Canal 2',
    sublabel: 'Canal de difusión',
    url: 'https://whatsapp.com/channel/0029VbDW25l0LKZ6WPZkLa46',
  },
  {
    id: 'youtube-official',
    platform: 'youtube',
    label: 'YouTube',
    sublabel: '@karolinakarley12',
    url: 'https://youtube.com/@karolinakarley12?si=Q-NKWYkkKJc1TJ_W',
  },
  {
    id: 'tiktok-official',
    platform: 'tiktok',
    label: 'TikTok',
    sublabel: '@karolinakarley2',
    url: 'https://www.tiktok.com/@karolinakarley2?_r=1&_t=ZS-9BdxTijyu3t',
  },
];

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
  {
    id: 'jeep-compass',
    title: '1 Jeep Compass plata',
    category: 'car',
    colorTag: 'Plata',
    quantity: 1,
    imageUrl: '/assets/aistudio/Silver_SUV_with_red_bow_267770f3_14cb4e20.jpg',
    altText: 'Camioneta SUV color plata con lazo rojo navideño - 1 Jeep Compass plata (Imagen referencial)',
    isReferential: true,
  },
  {
    id: 'mazda-3',
    title: '1 Mazda 3 rojo',
    category: 'car',
    colorTag: 'Rojo',
    quantity: 1,
    imageUrl: '/assets/aistudio/Red_sports_sedan_with_bow_d183b311_9887a7a1.jpg',
    altText: 'Auto sedán deportivo color rojo con lazo navideño - 1 Mazda 3 rojo (Imagen referencial)',
    isReferential: true,
  },
  {
    id: 'nissan-versa',
    title: '3 Nissan Versa (blanco, rojo y negro)',
    category: 'car',
    colorTag: 'Blanco · Rojo · Negro',
    quantity: 3,
    imageUrl: '/assets/aistudio/Red_sedan_with_bow_fffe9ae3_265fa951.jpg',
    secondaryImages: [
      '/assets/aistudio/White_sedan_with_red_bow_0148f554_0d003fe1.jpg',
      '/assets/aistudio/Black_sedan_with_red_bow_59819750_70765069.jpg',
    ],
    altText: 'Auto sedán con lazo rojo navideño - 3 Nissan Versa blanco, rojo y negro (Imagen referencial)',
    isReferential: true,
  },
  {
    id: 'hyundai-exter',
    title: '1 Hyundai Exter roja',
    category: 'car',
    colorTag: 'Roja',
    quantity: 1,
    imageUrl: '/assets/aistudio/Red_SUV_with_bow_1f91caba_0019ebbd.jpg',
    altText: 'Camioneta SUV compacta color roja con lazo navideño - 1 Hyundai Exter roja (Imagen referencial)',
    isReferential: true,
  },
  {
    id: 'suzuki-swift',
    title: '1 Suzuki Swift rojo',
    category: 'car',
    colorTag: 'Rojo',
    quantity: 1,
    imageUrl: '/assets/aistudio/Red_hatchback_with_red_bow_dc14b18a_e5b75bad.jpg',
    altText: 'Auto hatchback color rojo con lazo navideño - 1 Suzuki Swift rojo (Imagen referencial)',
    isReferential: true,
  },
  {
    id: 'suzuki-dzire',
    title: '1 Suzuki Dzire blanco',
    category: 'car',
    colorTag: 'Blanco',
    quantity: 1,
    imageUrl: '/assets/aistudio/White_sedan_with_red_bow_0148f554_0d003fe1.jpg',
    altText: 'Auto sedán color blanco con lazo rojo navideño - 1 Suzuki Dzire blanco (Imagen referencial)',
    isReferential: true,
  },
  {
    id: 'suzuki-celerio',
    title: '1 Suzuki Celerio plata',
    category: 'car',
    colorTag: 'Plata',
    quantity: 1,
    imageUrl: '/assets/aistudio/Silver_sedan_with_red_bow_bd9aea36_1e969ada.jpg',
    altText: 'Auto color plata con lazo rojo navideño - 1 Suzuki Celerio plata (Imagen referencial)',
    isReferential: true,
  },
  {
    id: 'suzuki-fronx',
    title: '1 Suzuki Fronx negro perlado',
    category: 'car',
    colorTag: 'Negro perlado',
    quantity: 1,
    imageUrl: '/assets/aistudio/Black_SUV_with_red_bow_6d95237e_466931ab.jpg',
    altText: 'Camioneta SUV color negro perlado con lazo rojo navideño - 1 Suzuki Fronx negro perlado (Imagen referencial)',
    isReferential: true,
  },
  {
    id: 'efectivo-500',
    title: '100 premios de S/ 500 cada uno',
    category: 'cash',
    quantity: 100,
    imageUrl: '/assets/aistudio/Pilares_de_billetes_con_lazo_32f73f7f_ee04f00b.jpg',
    altText: 'Fajos de billetes con lazo morado y confeti dorado - 100 premios de S/ 500 cada uno',
    isReferential: false,
  },
  {
    id: 'efectivo-1500',
    title: '10 premios de S/ 1,500 cada uno',
    category: 'cash',
    quantity: 10,
    imageUrl: '/assets/aistudio/Pilares_de_billetes_con_lazo_32f73f7f_ee04f00b.jpg',
    altText: 'Fajos de billetes con lazo morado y confeti dorado - 10 premios de S/ 1,500 cada uno',
    isReferential: false,
  },
  {
    id: 'ps5-gta6',
    title: '5 PlayStation 5, cada una con su juego GTA 6',
    category: 'console',
    quantity: 5,
    imageUrl: '/assets/aistudio/Cinco_consolas_de_videojuegos_bl__72a08674_380b4af1.jpg',
    altText: 'Cinco consolas de videojuegos blancas con mando y juego - 5 PlayStation 5, cada una con su juego GTA 6',
    isReferential: false,
  },
  {
    id: 'canastas-400',
    title: '40 canastas navideñas valorizadas en S/ 400 cada una',
    category: 'basket',
    quantity: 40,
    imageUrl: '/assets/aistudio/Christmas_wicker_basket_with_pro__8a078851_b718271d.jpg',
    altText: 'Canasta navideña de mimbre con panetón, botellas y lazo rojo - 40 canastas navideñas valorizadas en S/ 400 cada una',
    isReferential: false,
  },
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
