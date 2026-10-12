import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

const MAX_ATTEMPTS = 5;
const EDGE_PAD = 48;

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function useNoButton(yesRef) {
  const noRef = useRef(null);
  const attemptRef = useRef(0);
  const coolingRef = useRef(false);
  const spotRef = useRef(null);
  const [attempt, setAttempt] = useState(0);
  const [spot, setSpot] = useState(null);

  const covered = attempt >= MAX_ATTEMPTS;
  const yesScale = 1 + attempt * 0.22;
  const noScale = covered ? 0.16 : Math.max(0.4, 1 - attempt * 0.13);

  const commitSpot = useCallback((nextSpot) => {
    spotRef.current = nextSpot;
    setSpot(nextSpot);
  }, []);

  const place = useCallback(
    (clientX, clientY, nextAttempt) => {
      const button = noRef.current;
      if (!button) return;

      const buttonRect = button.getBoundingClientRect();
      const centerX = buttonRect.left + buttonRect.width / 2;
      const centerY = buttonRect.top + buttonRect.height / 2;

      let awayX = centerX - clientX;
      let awayY = centerY - clientY;
      const length = Math.hypot(awayX, awayY) || 1;
      awayX /= length;
      awayY /= length;

      if (Math.abs(awayX) < 0.2 && Math.abs(awayY) < 0.2) {
        awayX = 0.9;
        awayY = -0.4;
      }

      const yes = yesRef.current;
      const yesRect = yes?.getBoundingClientRect();
      let nextX = centerX;
      let nextY = centerY;

      if (yesRect && nextAttempt >= MAX_ATTEMPTS) {
        nextX = yesRect.left + yesRect.width / 2;
        nextY = yesRect.top + yesRect.height / 2;
      } else {
        const distance = Math.min(220, 130 + nextAttempt * 24);
        const directions = [
          [awayX, awayY],
          [-awayY, awayX],
          [awayY, -awayX],
          [-awayX * 0.4, -awayY || -1],
        ];

        let bestDistance = -1;
        directions.forEach(([dirX, dirY]) => {
          const candidateX = clamp(centerX + dirX * distance, EDGE_PAD, window.innerWidth - EDGE_PAD);
          const candidateY = clamp(centerY + dirY * distance, EDGE_PAD, window.innerHeight - EDGE_PAD);
          const fromPointer = Math.hypot(candidateX - clientX, candidateY - clientY);
          if (fromPointer > bestDistance) {
            bestDistance = fromPointer;
            nextX = candidateX;
            nextY = candidateY;
          }
        });
      }

      commitSpot({
        x: nextX,
        y: nextY,
        instant: false,
      });
    },
    [commitSpot, yesRef],
  );

  const dodge = useCallback(
    (clientX, clientY) => {
      if (coolingRef.current || attemptRef.current >= MAX_ATTEMPTS) return;

      const button = noRef.current;
      if (!button) return;

      coolingRef.current = true;
      const next = attemptRef.current + 1;
      attemptRef.current = next;
      setAttempt(next);

      if (!spotRef.current) {
        const rect = button.getBoundingClientRect();
        commitSpot({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          instant: true,
        });
        window.requestAnimationFrame(() => {
          window.requestAnimationFrame(() => place(clientX, clientY, next));
        });
      } else {
        place(clientX, clientY, next);
      }

      window.setTimeout(() => {
        coolingRef.current = false;
      }, 460);
    },
    [commitSpot, place],
  );

  useLayoutEffect(() => {
    if (attempt < MAX_ATTEMPTS) return;
    const yes = yesRef.current;
    if (!yes) return;
    const rect = yes.getBoundingClientRect();
    commitSpot({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
      instant: false,
    });
  }, [attempt, commitSpot, yesRef]);

  useEffect(() => {
    const onPointerMove = (event) => {
      if (event.pointerType !== 'mouse') return;

      const button = noRef.current;
      if (!button || attemptRef.current >= MAX_ATTEMPTS) return;

      const rect = button.getBoundingClientRect();
      const distance = Math.hypot(
        event.clientX - (rect.left + rect.width / 2),
        event.clientY - (rect.top + rect.height / 2),
      );
      const reach = Math.max(rect.width, rect.height) * 0.72 + 42;

      if (distance < reach) dodge(event.clientX, event.clientY);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', onPointerMove);
  }, [dodge]);

  const onNoPointerDown = (event) => {
    if (attemptRef.current >= MAX_ATTEMPTS) return;
    event.preventDefault();
    dodge(event.clientX, event.clientY);
  };

  return {
    noRef,
    spot,
    covered,
    yesScale,
    noScale,
    onNoPointerDown,
  };
}
