import test from 'node:test';
import assert from 'node:assert/strict';
import {
  OFFICIAL_RAFFLE_DATA,
  OFFICIAL_PRIZES,
  OFFICIAL_SOCIAL_LINKS,
  OFFICIAL_IMAGES,
  UNOFFICIAL_PAGE_COPY,
  maskParticipantName,
  isValidExactPeruvianPhone,
  searchParticipantByExactPhone,
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

test('official social links match exact provided URLs', () => {
  assert.equal(OFFICIAL_SOCIAL_LINKS.length, 5);
  assert.equal(
    OFFICIAL_SOCIAL_LINKS[0].url,
    'https://www.instagram.com/channel/AbbqiyhkRSQoUB2c/'
  );
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
