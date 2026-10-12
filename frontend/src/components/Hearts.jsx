const HEARTS = [
  { left: '8%', delay: '0s', duration: '11s', size: '18px' },
  { left: '18%', delay: '2s', duration: '13s', size: '12px' },
  { left: '72%', delay: '1s', duration: '12s', size: '16px' },
  { left: '86%', delay: '3.5s', duration: '14s', size: '11px' },
  { left: '48%', delay: '5s', duration: '15s', size: '14px' },
  { left: '32%', delay: '4s', duration: '12s', size: '10px' },
];

export function Hearts() {
  return (
    <div className="hearts" aria-hidden="true">
      {HEARTS.map((heart) => (
        <span
          key={`${heart.left}-${heart.delay}`}
          className="heart"
          style={{
            left: heart.left,
            animationDelay: heart.delay,
            animationDuration: heart.duration,
            fontSize: heart.size,
          }}
        >
          ♥
        </span>
      ))}
    </div>
  );
}
