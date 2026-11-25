import test from 'node:test';
import assert from 'node:assert/strict';
import {
  OFFICIAL_RAFFLE_DATA,
  OFFICIAL_PRIZES,
  OFFICIAL_SOCIAL_LINKS,
  OFFICIAL_IMAGES,
  UNOFFICIAL_PAGE_COPY,
  PARTICIPANT_SEARCH_COPY,
  ParticipantJsonRecord,
  maskParticipantName,
  isValidExactPeruvianPhone,
  searchParticipantByExactPhone,
  normalizeParticipantSearchText,
  hasMinimumThreeLetters,
  getParticipantFileKey,
  filterAndSortParticipants,
} from './raffleLogic';

test('official raffle phone numbers and email match exact specification', () => {
  assert.equal(OFFICIAL_RAFFLE_DATA.yapeNumberRaw, '913296033');
  assert.equal(OFFICIAL_RAFFLE_DATA.yapeNumberFormatted, '913 296 033');
  assert.equal(OFFICIAL_RAFFLE_DATA.telegramNumberRaw, '914587153');
  assert.equal(OFFICIAL_RAFFLE_DATA.telegramNumberFormatted, '914 587 153');
  assert.equal(OFFICIAL_RAFFLE_DATA.supportEmail, 'karolinakarleysorteos@gmail.com');
  assert.equal(OFFICIAL_RAFFLE_DATA.companyName, 'Karolina Karley S.A.C.');
  assert.equal(OFFICIAL_RAFFLE_DATA.totalCarsZeroKm, 10);
});

test('unofficial page copy and verification section follow exact wording without banned terms', () => {
  assert.equal(UNOFFICIAL_PAGE_COPY.pageTitle, 'Sorteo Navidad: información y búsqueda');
  assert.equal(
    UNOFFICIAL_PAGE_COPY.heroSubtitle,
    'Sorteo anunciado por Karolina Karley (según su anuncio oficial)'
  );
  assert.equal(UNOFFICIAL_PAGE_COPY.yapeCardTitle, 'Yape indicado en el anuncio oficial');
  assert.equal(
    UNOFFICIAL_PAGE_COPY.yapeVerificationNote,
    'Verifícalo en el canal oficial antes de depositar'
  );
  assert.equal(UNOFFICIAL_PAGE_COPY.accordingToAnnouncementCards.length, 6);
  assert.equal(UNOFFICIAL_PAGE_COPY.howToVerifySteps.length, 5);
  assert.equal(UNOFFICIAL_PAGE_COPY.officialTiktokUrl, 'https://www.tiktok.com/@karolinakarley2');
  assert.equal(UNOFFICIAL_PAGE_COPY.creatorTiktokUrl, 'https://www.tiktok.com/@clipzasos18');

  const combinedText = JSON.stringify(UNOFFICIAL_PAGE_COPY).toLowerCase();
  assert.equal(combinedText.includes('garantizado'), false);
  assert.equal(combinedText.includes('100% confiable'), false);
});

test('every prize has an assigned image and all car prizes are marked as referential', () => {
  for (const prize of OFFICIAL_PRIZES) {
    assert.ok(prize.imageUrl.startsWith('/assets/aistudio/'));
    assert.ok(prize.altText.length > 10);
    if (prize.category === 'car') {
      assert.equal(prize.isReferential, true);
    }
  }
  assert.ok(OFFICIAL_IMAGES.ticket.startsWith('/assets/aistudio/'));
  assert.ok(OFFICIAL_IMAGES.snowman.startsWith('/assets/aistudio/'));
  assert.ok(OFFICIAL_IMAGES.elf.startsWith('/assets/aistudio/'));
  assert.ok(OFFICIAL_IMAGES.legalShield.startsWith('/assets/aistudio/'));
  assert.ok(OFFICIAL_IMAGES.legalDocument.startsWith('/assets/aistudio/'));
  assert.ok(OFFICIAL_IMAGES.legalCalendar.startsWith('/assets/aistudio/'));
});

test('official social links match exact provided URLs and clarify announcement attribution', () => {
  assert.equal(OFFICIAL_SOCIAL_LINKS.length, 5);
  assert.equal(
    OFFICIAL_SOCIAL_LINKS[0].url,
    'https://www.instagram.com/channel/AbbqiyhkRSQoUB2c/'
  );
  assert.equal(OFFICIAL_SOCIAL_LINKS[0].sublabel, 'Canal del anuncio de la organizadora');
  assert.equal(
    OFFICIAL_SOCIAL_LINKS[1].url,
    'https://whatsapp.com/channel/0029VbBum7o6RGJQNfeN9o32'
  );
  assert.equal(
    OFFICIAL_SOCIAL_LINKS[2].url,
    'https://whatsapp.com/channel/0029VbDW25l0LKZ6WPZkLa46'
  );
  assert.equal(
    OFFICIAL_SOCIAL_LINKS[3].url,
    'https://youtube.com/@karolinakarley12?si=Q-NKWYkkKJc1TJ_W'
  );
  assert.equal(
    OFFICIAL_SOCIAL_LINKS[4].url,
    'https://www.tiktok.com/@karolinakarley2?_r=1&_t=ZS-9BdxTijyu3t'
  );
});

test('car prizes sum up to 10 zero-km cars across 12 total prize cards', () => {
  assert.equal(OFFICIAL_PRIZES.length, 12);
  const totalCars = OFFICIAL_PRIZES
    .filter((p) => p.category === 'car')
    .reduce((acc, item) => acc + item.quantity, 0);
  assert.equal(totalCars, 10);
});

test('maskParticipantName partially hides names like Ma*** G***', () => {
  assert.equal(maskParticipantName('María Gómez'), 'Ma*** G***');
  assert.equal(maskParticipantName('Juan Carlos Pérez'), 'Ju*** C*** P***');
});

test('searchParticipantByExactPhone enforces disabled state and exact-match privacy rules', () => {
  const sampleRecords = [{ phone: '999888777', fullName: 'María Gómez' }];

  // While disabled (default), never leaks match
  const disabledResult = searchParticipantByExactPhone('999888777', sampleRecords, false);
  assert.equal(disabledResult.status, 'disabled');
  assert.equal(disabledResult.maskedName, undefined);

  // Partial number is rejected when enabled
  const partialResult = searchParticipantByExactPhone('99988', sampleRecords, true);
  assert.equal(partialResult.status, 'invalid_query');

  // Exact match returns masked name only
  const exactResult = searchParticipantByExactPhone('999 888 777', sampleRecords, true);
  assert.equal(exactResult.status, 'participating');
  assert.equal(exactResult.message, 'Sí estás participando');
  assert.equal(exactResult.maskedName, 'Ma*** G***');

  // Non-matching exact number returns not_found
  const missingResult = searchParticipantByExactPhone('911222333', sampleRecords, true);
  assert.equal(missingResult.status, 'not_found');
  assert.equal(missingResult.message, 'No encontramos tu número');
});

test('isValidExactPeruvianPhone requires 9 digits starting with 9', () => {
  assert.equal(isValidExactPeruvianPhone('913296033'), true);
  assert.equal(isValidExactPeruvianPhone('913 296 033'), true);
  assert.equal(isValidExactPeruvianPhone('123456789'), false);
  assert.equal(isValidExactPeruvianPhone('91329603'), false);
});

test('normalizeParticipantSearchText uppercases, strips tildes and asterisks, and collapses spaces', () => {
  assert.equal(normalizeParticipantSearchText('  María   Pér*  '), 'MARIA PER');
  assert.equal(normalizeParticipantSearchText('José   Ángel*'), 'JOSE ANGEL');
  assert.equal(normalizeParticipantSearchText('Noemí   Muñ*'), 'NOEMI MUÑ');
  assert.equal(normalizeParticipantSearchText('- manuel   agustín '), '- MANUEL AGUSTIN');
});

test('hasMinimumThreeLetters enforces at least 3 alphabetical characters', () => {
  assert.equal(hasMinimumThreeLetters('Ma'), false);
  assert.equal(hasMinimumThreeLetters('A* '), false);
  assert.equal(hasMinimumThreeLetters('-- '), false);
  assert.equal(hasMinimumThreeLetters('Mar'), true);
  assert.equal(hasMinimumThreeLetters('Maria Per'), true);
  assert.equal(hasMinimumThreeLetters('- Man'), true);
});

test('getParticipantFileKey resolves A-Z to letter and non-A-Z to OTROS', () => {
  assert.equal(getParticipantFileKey('Maria Per'), 'M');
  assert.equal(getParticipantFileKey('  árbol '), 'A');
  assert.equal(getParticipantFileKey('zulema'), 'Z');
  assert.equal(getParticipantFileKey('- MANUEL'), 'OTROS');
  assert.equal(getParticipantFileKey('& D DECOR'), 'OTROS');
});

test('filterAndSortParticipants matches prefix, sorts descending by tickets, and limits to 10 results', () => {
  const records: ParticipantJsonRecord[] = Array.from({ length: 15 }, (_, i) => ({
    nombre: `MARIA PER${i}*`,
    tickets: (i + 1) * 5,
    ultima_fecha: '23/11/2026 20:00:00',
    primera_fecha: '19/11/2026 10:00:00',
  }));
  records.push({
    nombre: 'MARIO PER*',
    tickets: 999,
    ultima_fecha: '23/11/2026 23:00:00',
    primera_fecha: '19/11/2026 10:00:00',
  });

  const results = filterAndSortParticipants(records, '  maría   pér* ');
  assert.equal(results.length, 10);
  assert.equal(results[0].nombre, 'MARIA PER14*');
  assert.equal(results[0].tickets, 75);
  assert.equal(results[9].nombre, 'MARIA PER5*');
  assert.equal(results[9].tickets, 30);

  // Verify copy strings match exact specification
  assert.equal(
    PARTICIPANT_SEARCH_COPY.helpText,
    'Escríbelo tal como te sale en tu comprobante de Yape: tu primer nombre y las 3 primeras letras de tu apellido. Ejemplo: Maria Per'
  );
  assert.equal(PARTICIPANT_SEARCH_COPY.loadError, 'No pudimos cargar la lista, intenta de nuevo');
  assert.equal(
    PARTICIPANT_SEARCH_COPY.noMatches,
    'No encontramos ese nombre. Revisa cómo te aparece en tu comprobante de Yape o conserva tu captura de pago.'
  );
  assert.equal(
    PARTICIPANT_SEARCH_COPY.fixedFooterDisclaimer,
    'Los nombres aparecen recortados, por lo que puede haber más de una persona con coincidencia. Esta lista no es oficial: proviene del archivo publicado por la organizadora y está actualizada al 23/11/2026. Tu captura de pago es tu comprobante.'
  );
});

