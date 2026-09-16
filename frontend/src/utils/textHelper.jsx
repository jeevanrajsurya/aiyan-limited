import React from 'react';

/**
 * Standard brand gradient for heading accents across S&B Retail
 * Petrol Teal to Diesel Amber Gold
 */
export const BRAND_GRADIENT_CLASS =
  'bg-gradient-to-r from-[#005f73] via-[#0a9396] to-[#d97706] bg-clip-text text-transparent';

export const DARK_HERO_GRADIENT_CLASS =
  'bg-gradient-to-r from-[#fcd34d] via-[#fbbf24] to-[#f59e0b] bg-clip-text text-transparent';

/**
 * Renders a heading string with the ending or highlighted part wrapped in the site's brand gradient.
 *
 * @param {string} text - The full heading text (supports <br />, markdown **bold**, or plain text)
 * @param {string|RegExp} [highlight] - Optional phrase or regex to specifically highlight.
 * @param {string} [gradientClass] - Optional custom gradient class.
 * @returns {React.ReactNode}
 */
export function renderGradientHeading(text, highlight, gradientClass = BRAND_GRADIENT_CLASS) {
  if (!text || typeof text !== 'string') return text || null;

  const trimmed = text.trim();

  // 1. Support markdown **highlight**
  if (/\*\*(.*?)\*\*/.test(trimmed)) {
    const parts = trimmed.split(/(\*\*.*?\*\*)/g);
    return (
      <>
        {parts.map((part, i) => {
          if (part.startsWith('**') && part.endsWith('**')) {
            const inner = part.slice(2, -2);
            return (
              <span key={i} className={gradientClass}>
                {inner}
              </span>
            );
          }
          return renderTextWithBreaks(part, `norm-${i}`);
        })}
      </>
    );
  }

  // 2. If an explicit string or regex highlight is provided
  if (highlight && typeof highlight === 'string') {
    const escaped = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escaped})`, 'i');
    if (regex.test(trimmed)) {
      const parts = trimmed.split(regex);
      return (
        <>
          {renderTextWithBreaks(parts[0], 'start')}
          <span className={gradientClass}>{parts[1]}</span>
          {parts.length > 2 && renderTextWithBreaks(parts.slice(2).join(''), 'end')}
        </>
      );
    }
  }

  // 3. If text contains <br /> or <br>, highlight the last line/segment
  if (/<br\s*\/?>/i.test(trimmed)) {
    const lines = trimmed.split(/<br\s*\/?>/i);
    const beforeLast = lines.slice(0, -1);
    const lastLine = lines[lines.length - 1];

    return (
      <>
        {beforeLast.map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            <br />
          </React.Fragment>
        ))}
        <span className={gradientClass}>{lastLine.trim()}</span>
      </>
    );
  }

  // 4. If text contains ' & ' or ' and ', highlight the part after '&' or 'and'
  if (/\s+(&|and)\s+/i.test(trimmed)) {
    const match = trimmed.match(/^(.*?\s+(&|and)\s+)(.+)$/i);
    if (match) {
      const prefix = match[1];
      const suffix = match[3];
      return (
        <>
          {prefix}
          <span className={gradientClass}>{suffix}</span>
        </>
      );
    }
  }

  // 5. Automatic fallback: Highlight the ending words (last 2-3 words)
  const words = trimmed.split(/\s+/);
  if (words.length > 2) {
    const numToHighlight = words.length <= 4 ? 1 : words.length <= 7 ? 2 : 3;
    const firstPart = words.slice(0, words.length - numToHighlight).join(' ');
    const lastPart = words.slice(words.length - numToHighlight).join(' ');

    return (
      <>
        {firstPart}{' '}
        <span className={gradientClass}>{lastPart}</span>
      </>
    );
  }

  // If 2 words or fewer, highlight the whole heading in gradient
  return <span className={gradientClass}>{trimmed}</span>;
}

function renderTextWithBreaks(str, keyPrefix) {
  if (!/<br\s*\/?>/i.test(str)) return str;
  const segments = str.split(/<br\s*\/?>/i);
  return segments.map((seg, idx) => (
    <React.Fragment key={`${keyPrefix}-${idx}`}>
      {seg}
      {idx < segments.length - 1 && <br />}
    </React.Fragment>
  ));
}
