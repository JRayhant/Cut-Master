import { useEffect, useState, useRef, useCallback } from 'react';

export function useAutoHide(delayMs: number = 3000) {
  const [isVisible, setIsVisible] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const show = useCallback(() => {
    setIsVisible(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, delayMs);
  }, [delayMs]);

  useEffect(() => {
    // Initial timer
    show();

    const events = ['mousemove', 'mousedown', 'touchstart', 'touchmove', 'scroll', 'keydown'];

    const handleActivity = () => {
      show();
    };

    events.forEach((ev) => {
      window.addEventListener(ev, handleActivity, { passive: true });
    });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      events.forEach((ev) => {
        window.removeEventListener(ev, handleActivity);
      });
    };
  }, [show]);

  return { isVisible, show };
}
