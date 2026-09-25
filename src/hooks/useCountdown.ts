import { useState, useEffect, useCallback } from 'react';
import { ExpiryService } from '../services';

export function useCountdown(expiresAt: Date) {
  const [remaining, setRemaining] = useState(() => ExpiryService.getRemainingTime(expiresAt));
  const [urgency, setUrgency] = useState(() => ExpiryService.classifyUrgency(expiresAt));
  const [formatted, setFormatted] = useState(() => ExpiryService.formatCountdown(remaining));

  const tick = useCallback(() => {
    const rem = ExpiryService.getRemainingTime(expiresAt);
    setRemaining(rem);
    setUrgency(ExpiryService.classifyUrgency(expiresAt));
    setFormatted(ExpiryService.formatCountdown(rem));
  }, [expiresAt]);

  useEffect(() => {
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [tick]);

  return { remaining, urgency, formatted, isExpired: remaining <= 0 };
}
