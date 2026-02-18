export function trackEvent(event: string, params: Record<string, string | number | boolean | null> = {}) {
  if (typeof window === 'undefined') return;
  const gtag = (window as any).gtag;
  if (typeof gtag !== 'function') return;
  gtag('event', event, params);
}

