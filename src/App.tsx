/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Gift,
  Ticket,
  Smartphone,
  AlertTriangle,
  Send,
  Mail,
  MapPin,
  FileCheck2,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowDown,
  ExternalLink,
  Info,
} from 'lucide-react';
import {
  SnowfallOverlay,
  ChristmasLightsTop,
  SnowmanOrnament,
  ElfOrnament,
} from './components/ChristmasDecorations';
import { CopyActionButton } from './components/CopyActionButton';
import { PrizesSection } from './components/PrizesSection';
import { VerificationSection } from './components/VerificationSection';
import { ParticipantSearchSection } from './components/ParticipantSearchSection';
import { OfficialSocialLinksGrid } from './components/OfficialSocialLinks';
import {
  OFFICIAL_RAFFLE_DATA,
  OFFICIAL_IMAGES,
  UNOFFICIAL_PAGE_COPY,
} from './utils/raffleLogic';

const LegalImageIcon: React.FC<{
  src: string;
  alt: string;
  fallback: React.ReactNode;
}> = ({ src, alt, fallback }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FACC15] text-[#230B3F] shadow-sm">
        {fallback}
      </div>
    );
  }

  return (
    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#FACC15]/60 bg-white p-1 shadow-sm">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={() => setHasError(true)}
        className="h-full w-full rounded-xl object-contain"
      />
    </div>
  );
};

export default function App() {
  const [ticketImgError, setTicketImgError] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#230B3F] via-[#4C1D95] to-[#2E1052] text-white">
      {/* 2. AVISO DE PÁGINA NO OFICIAL - Franja destacada y fija arriba de todo */}
      <div
        role="region"
        aria-label="Aviso de página no oficial"
        className="sticky top-0 z-40 w-full border-b-2 border-[#230B3F] bg-[#FACC15] px-3 py-2 text-[#230B3F] shadow-md sm:px-6 sm:py-2.5"
      >
        <div className="mx-auto flex max-w-5xl items-center justify-center gap-2 text-center">
          <Info className="hidden h-4 w-4 shrink-0 stroke-[2.5] sm:inline-block" aria-hidden="true" />
          <p className="text-xs leading-snug font-extrabold sm:text-sm">
            {UNOFFICIAL_PAGE_COPY.topFixedBanner}
          </p>
        </div>
      </div>

      {/* Gentle Christmas Snowfall */}
      <SnowfallOverlay />

      {/* Decorative Christmas Lights at Top (soft golden dots that twinkle) */}
      <ChristmasLightsTop />

      {/* Top Navigation Bar following 3-Zone Contract */}
      <header className="relative z-20 mx-auto flex max-w-5xl items-center justify-between gap-8 border-b border-[#E9D5FF]/15 px-4 py-3.5 sm:px-6">
        <a
          href="#inicio"
          className="font-display text-lg font-black tracking-tight text-white whitespace-nowrap shrink-0 sm:text-xl"
        >
          Sorteo Navidad
        </a>

        <nav
          aria-label="Navegación principal"
          className="hidden items-center gap-6 text-sm font-bold text-[#F3E8FF] md:flex"
        >
          <a
            href="#como-participar"
            className="transition-colors hover:text-[#FACC15] hover:underline whitespace-nowrap shrink-0"
          >
            Participar
          </a>
          <a
            href="#premios"
            className="transition-colors hover:text-[#FACC15] hover:underline whitespace-nowrap shrink-0"
          >
            Premios
          </a>
          <a
            href="#verificacion-anuncio"
            className="transition-colors hover:text-[#FACC15] hover:underline whitespace-nowrap shrink-0"
          >
            Verificar
          </a>
          <a
            href="#buscador"
            className="transition-colors hover:text-[#FACC15] hover:underline whitespace-nowrap shrink-0"
          >
            Buscador
          </a>
          <a
            href="#legal"
            className="transition-colors hover:text-[#FACC15] hover:underline whitespace-nowrap shrink-0"
          >
            Legal
          </a>
        </nav>

        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={() => scrollToSection('premios')}
            className="cursor-pointer rounded-xl bg-[#FACC15] px-4 py-2 text-xs font-black text-[#230B3F] shadow-sm transition-colors hover:bg-[#FDE047] whitespace-nowrap shrink-0 sm:text-sm"
          >
            Ver premios
          </button>
        </div>
      </header>

      <main className="relative z-20 pb-20">
        {/* 1. CABECERA (HERO) */}
        <section
          id="inicio"
          className="relative px-4 pt-6 pb-12 text-center sm:px-6 sm:pt-12 sm:pb-16 lg:px-8"
        >
          <div className="relative mx-auto max-w-4xl">
            {/* Corner ornaments (muñeco de nieve & duende) placed in the header corners without covering text */}
            <div className="mb-5 flex items-center justify-between px-2 sm:px-6">
              <SnowmanOrnament className="h-16 w-16 sm:h-20 sm:w-20" loading="eager" />
              <div className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-[#F3E8FF] sm:text-base">
                <Sparkles className="h-5 w-5 shrink-0 text-[#FACC15]" aria-hidden="true" />
                <span>Especial Navideño en todo el Perú</span>
              </div>
              <ElfOrnament className="h-16 w-16 sm:h-20 sm:w-20" loading="eager" />
            </div>

            {/* Big Hero Headline */}
            <h1
              style={{ textWrap: 'balance' }}
              className="font-display mx-auto max-w-3xl text-4xl leading-[1.08] font-black tracking-tight text-white drop-shadow-md sm:text-6xl lg:text-7xl"
            >
              ¡ESTRENA CARRO ESTA NAVIDAD!
            </h1>

            {/* Updated Non-Official Subtitle */}
            <p className="font-display mt-4 text-xl font-extrabold text-[#F3E8FF] sm:text-3xl">
              {UNOFFICIAL_PAGE_COPY.heroSubtitle}
            </p>

            {/* Golden Banner Strip */}
            <div className="mt-7 flex justify-center">
              <div className="w-full max-w-2xl rounded-2xl border-2 border-[#FEF08A] bg-gradient-to-r from-[#F59E0B] via-[#FACC15] to-[#F59E0B] px-5 py-4 text-[#230B3F] shadow-xl">
                <p className="font-display text-lg font-black tracking-wide uppercase sm:text-2xl">
                  10 CARROS CERO KILÓMETROS · AÑO 2027
                </p>
              </div>
            </div>

            {/* Primary Button "Ver premios" */}
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => scrollToSection('premios')}
                className="inline-flex cursor-pointer items-center justify-center gap-3 rounded-full bg-white px-9 py-4 text-lg font-black text-[#230B3F] shadow-xl transition-transform duration-150 hover:bg-[#F3E8FF] active:scale-95 whitespace-nowrap shrink-0 sm:px-10 sm:py-5 sm:text-xl"
              >
                <Gift className="h-6 w-6 text-[#7E22CE]" aria-hidden="true" />
                <span>Ver premios</span>
                <ArrowDown className="h-5 w-5 text-[#7E22CE]" aria-hidden="true" />
              </button>
            </div>
          </div>
        </section>

        {/* 2. CÓMO PARTICIPAR */}
        <section
          id="como-participar"
          aria-labelledby="como-participar-heading"
          className="scroll-mt-16 px-4 py-10 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-3xl">
            <div className="mb-6 text-center">
              <h2
                id="como-participar-heading"
                className="font-display text-3xl font-black tracking-tight text-white sm:text-4xl"
              >
                Cómo participar
              </h2>
            </div>

            <div className="space-y-5">
              {/* Card 1: Ticket price + frameless floating golden ticket on matching soft lilac radial gradient */}
              <div
                style={{
                  background:
                    'radial-gradient(circle at 22% 50%, #E9D5FF 0%, #D8B4FE 55%, #E9D5FF 100%)',
                }}
                className="group flex flex-col items-center justify-between gap-5 overflow-hidden rounded-3xl border-2 border-[#FACC15] p-5 text-center text-[#230B3F] shadow-xl transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-2xl sm:flex-row sm:px-8 sm:py-5 sm:text-left"
              >
                <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
                  {!ticketImgError ? (
                    <div className="relative flex h-28 w-32 shrink-0 items-center justify-center">
                      <img
                        src={OFFICIAL_IMAGES.ticket}
                        alt="Ticket dorado navideño con estrella"
                        loading="eager"
                        onError={() => setTicketImgError(true)}
                        style={{
                          maskImage:
                            'radial-gradient(closest-side, black 55%, transparent 98%)',
                          WebkitMaskImage:
                            'radial-gradient(closest-side, black 55%, transparent 98%)',
                        }}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-[#4C1D95] text-[#FACC15] shadow-md">
                      <Ticket className="h-10 w-10" aria-hidden="true" />
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-extrabold tracking-wider text-[#5B21B6] uppercase">
                      Valor del ticket
                    </p>
                    <p className="font-display text-2xl font-black text-[#230B3F] sm:text-3xl">
                      {OFFICIAL_RAFFLE_DATA.ticketPriceText}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Yape indicado en el anuncio oficial (with Copy button + verification note) */}
              <div className="rounded-3xl border-2 border-[#E9D5FF] bg-white p-6 text-[#230B3F] shadow-2xl sm:p-8">
                <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                  <div className="text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 text-sm font-black tracking-wider text-[#7E22CE] uppercase">
                      <Smartphone className="h-5 w-5" aria-hidden="true" />
                      <span>{UNOFFICIAL_PAGE_COPY.yapeCardTitle}</span>
                    </div>

                    <p
                      data-testid="yape-number-display"
                      className="font-display mt-2 text-4xl font-black tracking-wider text-[#230B3F] tabular-nums sm:text-5xl"
                    >
                      {OFFICIAL_RAFFLE_DATA.yapeNumberFormatted}
                    </p>

                    <p className="mt-2 text-lg font-extrabold text-[#4C1D95] sm:text-xl">
                      {OFFICIAL_RAFFLE_DATA.companyName}
                    </p>
                  </div>

                  <div className="flex w-full justify-center sm:w-auto">
                    <CopyActionButton
                      valueToCopy={OFFICIAL_RAFFLE_DATA.yapeNumberRaw}
                      label="Copiar número"
                      copiedLabel="¡Copiado!"
                      ariaLabel="Copiar número de Yape indicado en el anuncio oficial 913296033"
                      variant="purple"
                    />
                  </div>
                </div>

                <div className="mt-5 w-full rounded-2xl border border-[#7E22CE]/25 bg-[#F3E8FF] px-4 py-3 text-center text-sm font-extrabold text-[#3B106C] sm:text-left sm:text-base">
                  {UNOFFICIAL_PAGE_COPY.yapeVerificationNote}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 3. AVISO IMPORTANTE: ¡OJO, PIOJO! (Telegram y correo solo como texto, sin botones de copiar) */}
        <section
          id="aviso-importante"
          aria-labelledby="ojo-piojo-heading"
          className="px-4 py-8 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-3xl">
            <div className="rounded-3xl border-2 border-[#FACC15] bg-gradient-to-br from-[#3B106C] to-[#28094B] p-6 shadow-2xl sm:p-9">
              {/* Highlighted Header */}
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FACC15] text-[#230B3F] shadow-md">
                  <AlertTriangle className="h-7 w-7 stroke-[2.5]" aria-hidden="true" />
                </div>
                <h2
                  id="ojo-piojo-heading"
                  className="font-display text-3xl font-black text-[#FACC15] sm:text-4xl"
                >
                  ¡Ojo, piojo!
                </h2>
              </div>

              {/* Primary Alert Instruction */}
              <div className="rounded-2xl border border-[#FACC15]/40 bg-[#230B3F]/90 p-5">
                <p className="text-lg leading-relaxed font-extrabold text-white sm:text-xl">
                  Antes de enviar tu moradito, coloca en la descripción tus nombres completos y número de celular.
                </p>
              </div>

              {/* Secondary Instruction for Forgotten Details */}
              <div className="mt-6 space-y-5">
                <p className="text-base leading-relaxed font-medium text-[#F3E8FF] sm:text-lg">
                  Si olvidaste colocar tus datos, envía la captura de tu pago + nombres completos + número de celular a nuestro Telegram:{' '}
                  <strong className="inline-block font-black text-[#FACC15] tabular-nums whitespace-nowrap">
                    {OFFICIAL_RAFFLE_DATA.telegramNumberFormatted}
                  </strong>
                  . Si no tienes Telegram, envíalos al correo:{' '}
                  <strong className="inline-block font-black text-[#FACC15] whitespace-nowrap">
                    {OFFICIAL_RAFFLE_DATA.supportEmail}
                  </strong>
                </p>

                {/* Text-only boxes for Telegram & Email (no copy buttons) */}
                <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                  {/* Telegram Box */}
                  <div className="flex items-center gap-3 rounded-2xl border border-[#E9D5FF]/25 bg-[#230B3F]/75 p-4">
                    <Send className="h-6 w-6 shrink-0 text-[#FACC15]" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#E9D5FF] uppercase">
                        Telegram indicado
                      </p>
                      <p
                        data-testid="telegram-number-display"
                        className="font-display text-xl font-black text-white tabular-nums"
                      >
                        {OFFICIAL_RAFFLE_DATA.telegramNumberFormatted}
                      </p>
                    </div>
                  </div>

                  {/* Email Box */}
                  <div className="flex items-center gap-3 rounded-2xl border border-[#E9D5FF]/25 bg-[#230B3F]/75 p-4">
                    <Mail className="h-6 w-6 shrink-0 text-[#FACC15]" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-[#E9D5FF] uppercase">
                        Correo indicado
                      </p>
                      <p
                        data-testid="email-display"
                        className="break-all text-sm font-extrabold text-white sm:text-base"
                      >
                        {OFFICIAL_RAFFLE_DATA.supportEmail}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. PREMIOS */}
        <PrizesSection />

        {/* NUEVA SECCIÓN: "Qué dice el anuncio oficial y cómo verificarlo" + Botón "TikTok oficial de Karolina Karley" */}
        <VerificationSection />

        {/* 5. ¿ESTÁS PARTICIPANDO? (BUSCADOR) */}
        <ParticipantSearchSection />

        {/* 6. INFORMACIÓN LEGAL */}
        <section
          id="legal"
          aria-labelledby="legal-heading"
          className="px-4 py-12 sm:px-6 lg:px-8"
        >
          <div className="mx-auto max-w-4xl">
            <h2
              id="legal-heading"
              className="font-display mb-8 text-center text-2xl font-black tracking-tight text-white sm:text-3xl"
            >
              Información legal
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {/* 1. Participa todo el Perú: simple location/map pin icon, no flag */}
              <div className="flex items-center gap-4 rounded-2xl border border-[#E9D5FF]/25 bg-[#3B106C]/85 p-5 shadow-md">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#FACC15] text-[#230B3F] shadow-sm">
                  <MapPin className="h-7 w-7 stroke-[2.25]" aria-hidden="true" />
                </div>
                <p className="font-display text-lg font-extrabold text-white">
                  Participa todo el Perú
                </p>
              </div>

              {/* 2. Con presencia de notario: Document with pen icon image */}
              <div className="flex items-center gap-4 rounded-2xl border border-[#E9D5FF]/25 bg-[#3B106C]/85 p-5 shadow-md">
                <LegalImageIcon
                  src={OFFICIAL_IMAGES.legalDocument}
                  alt="Documento legal firmado con pluma"
                  fallback={<FileCheck2 className="h-7 w-7 stroke-[2.25]" aria-hidden="true" />}
                />
                <p className="font-display text-lg font-extrabold text-white">
                  Con presencia de notario
                </p>
              </div>

              {/* 3. Participan únicamente personas mayores de 18 años: Shield with check icon image */}
              <div className="flex items-center gap-4 rounded-2xl border border-[#E9D5FF]/25 bg-[#3B106C]/85 p-5 shadow-md">
                <LegalImageIcon
                  src={OFFICIAL_IMAGES.legalShield}
                  alt="Escudo de verificación y mayores de 18 años"
                  fallback={<ShieldCheck className="h-7 w-7 stroke-[2.25]" aria-hidden="true" />}
                />
                <p className="font-display text-lg font-extrabold text-white">
                  Participan únicamente personas mayores de 18 años
                </p>
              </div>

              {/* 4. El cierre de la dinámica depende de ustedes: Purple calendar icon image */}
              <div className="flex items-center gap-4 rounded-2xl border border-[#E9D5FF]/25 bg-[#3B106C]/85 p-5 shadow-md">
                <LegalImageIcon
                  src={OFFICIAL_IMAGES.legalCalendar}
                  alt="Calendario del sorteo"
                  fallback={<Calendar className="h-7 w-7 stroke-[2.25]" aria-hidden="true" />}
                />
                <p className="font-display text-lg font-extrabold text-white">
                  El cierre de la dinámica depende de ustedes
                </p>
              </div>
            </div>

            {/* Updated Legal Payment Disclaimer */}
            <p className="mt-6 text-center text-sm font-bold text-[#FDE047] sm:text-base">
              {UNOFFICIAL_PAGE_COPY.legalPaymentDisclaimer}
            </p>

            {/* Canales y Redes del Anuncio Oficial */}
            <div className="mt-10 rounded-3xl border border-[#E9D5FF]/25 bg-[#28094B]/90 p-6 shadow-xl sm:p-8">
              <h3 className="font-display mb-2 text-center text-xl font-black text-[#FACC15] sm:text-2xl">
                Canales oficiales según el anuncio de la organizadora
              </h3>
              <p className="mb-6 text-center text-sm font-medium text-[#E9D5FF]">
                {UNOFFICIAL_PAGE_COPY.legalPaymentDisclaimer}
              </p>
              <OfficialSocialLinksGrid />
            </div>

            {/* 6. CREADA POR: Tarjeta pequeña con el texto y botón Sígueme en TikTok: @clipzasos18 */}
            <div className="mx-auto mt-10 max-w-md rounded-3xl border border-[#FACC15]/60 bg-[#230B3F]/90 p-6 text-center shadow-xl">
              <p className="text-base font-extrabold text-white">
                {UNOFFICIAL_PAGE_COPY.creatorCardText}
              </p>
              <div className="mt-4 flex justify-center">
                <a
                  href={UNOFFICIAL_PAGE_COPY.creatorTiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#FACC15] px-6 py-3 text-sm font-black text-[#230B3F] shadow-md transition-transform duration-150 hover:bg-[#FDE047] active:scale-95 sm:text-base"
                >
                  <span>{UNOFFICIAL_PAGE_COPY.creatorTiktokButtonText}</span>
                  <ExternalLink className="h-4 w-4 shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. PIE DE PÁGINA */}
      <footer className="relative z-20 border-t border-[#E9D5FF]/20 bg-[#16052A] px-4 pt-10 pb-28 text-center sm:px-6 sm:pb-14">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <SnowmanOrnament className="h-11 w-11" loading="lazy" />
            <p className="font-display text-lg font-black text-[#FACC15] sm:text-2xl">
              {UNOFFICIAL_PAGE_COPY.footerCreatorDisclaimer}
            </p>
            <ElfOrnament className="h-11 w-11" loading="lazy" />
          </div>
          <p className="text-base font-bold text-[#F3E8FF] sm:text-lg">
            ¡Te deseamos una Feliz Navidad y mucha suerte en este gran sorteo navideño!
          </p>
        </div>
      </footer>

      {/* FLOATING CORNER BUTTON TO "CÓMO PARTICIPAR" */}
      <div className="fixed right-3 bottom-3 z-30 sm:right-6 sm:bottom-6">
        <button
          type="button"
          onClick={() => scrollToSection('como-participar')}
          aria-label="Ir rápido a Cómo participar"
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-white bg-[#FACC15] px-4 py-2.5 text-sm font-black text-[#230B3F] shadow-2xl transition-transform duration-150 hover:bg-[#FDE047] active:scale-95 whitespace-nowrap shrink-0 sm:gap-2.5 sm:px-6 sm:py-3.5 sm:text-base"
        >
          <Ticket className="h-4 w-4 shrink-0 stroke-[2.5] sm:h-5 sm:w-5" aria-hidden="true" />
          <span>Cómo participar</span>
        </button>
      </div>
    </div>
  );
}
