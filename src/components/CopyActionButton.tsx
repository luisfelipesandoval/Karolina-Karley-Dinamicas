import React, { useState, useCallback } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyActionButtonProps {
  valueToCopy: string;
  label?: string;
  copiedLabel?: string;
  ariaLabel: string;
  variant?: 'gold' | 'purple';
}

export const CopyActionButton: React.FC<CopyActionButtonProps> = ({
  valueToCopy,
  label = 'Copiar',
  copiedLabel = '¡Copiado!',
  ariaLabel,
  variant = 'gold',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(valueToCopy);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = valueToCopy;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, 2200);
    } catch {
      setCopied(true);
      window.setTimeout(() => {
        setCopied(false);
      }, 2200);
    }
  }, [valueToCopy]);

  const baseStyles =
    'inline-flex items-center justify-center gap-2.5 rounded-2xl px-6 py-3.5 text-base font-extrabold transition-all duration-150 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer select-none whitespace-nowrap shrink-0';

  const variantStyles =
    variant === 'gold'
      ? copied
        ? 'bg-emerald-400 text-[#1E0836] shadow-md focus-visible:outline-emerald-300'
        : 'bg-[#FACC15] hover:bg-[#FDE047] text-[#230B3F] shadow-md focus-visible:outline-[#FACC15]'
      : copied
        ? 'bg-emerald-600 text-white shadow-md focus-visible:outline-emerald-500'
        : 'bg-[#4C1D95] hover:bg-[#5B21B6] text-white shadow-md focus-visible:outline-[#4C1D95]';

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={ariaLabel}
      className={`${baseStyles} ${variantStyles}`}
    >
      {copied ? (
        <>
          <Check className="h-5 w-5 shrink-0 stroke-[2.75]" aria-hidden="true" />
          <span>{copiedLabel}</span>
        </>
      ) : (
        <>
          <Copy className="h-5 w-5 shrink-0 stroke-[2.25]" aria-hidden="true" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
