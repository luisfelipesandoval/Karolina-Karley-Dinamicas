import test from 'node:test';
import assert from 'node:assert/strict';
import {
  OFFICIAL_RAFFLE_DATA,
  OFFICIAL_PRIZES,
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
