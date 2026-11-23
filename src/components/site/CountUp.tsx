import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Counts a value up from zero over the same 1400ms easing as the impact-stats
 * carousel slide. A number starts as soon as any part of it is visible and only
 * resets to zero once it is completely out of view. Without a `root`, the
 * viewport is the reference; with one, the number follows that scroll container.
 */
export function CountUp({
  value,
  root,
  instant,
}: {
  value: string;
  root?: RefObject<HTMLElement | null>;
  instant?: boolean;
}) {
  const m = value.match(/^(\D*)(\d+)(.*)$/);
  const target = m ? Number(m[2]) : 0;
  const ref = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(false);
  const [cur, setCur] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setActive(!!e?.isIntersecting), {
      root: root?.current ?? null,
      threshold: 0,
    });
    io.observe(el);
    return () => io.disconnect();
  }, [root]);

  useEffect(() => {
    if (!m) return;
    if (!active) {
      setCur(0);
      return;
    }
    if (instant || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCur(target);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / 1400);
      const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
      setCur(Math.round(target * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, target]);

  if (!m) return <>{value}</>;
  return (
    <span ref={ref}>
      {m[1]}
      {cur}
      {m[3]}
    </span>
  );
}
