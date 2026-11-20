import { useEffect, useRef } from "react";

// Shows 3 rows at a time; every 3.5s slides the next row up from the bottom
// (1400ms ease-in-out, same rhythm as the impact stats carousel).
export function AmbitionStats({ items }: { items: readonly (readonly string[])[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const hover = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
    const slide = (to: number) => {
      const from = el.scrollTop;
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        el.scrollTop = from + (to - from) * ease(t);
        if (t < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const id = setInterval(() => {
      if (hover.current) return;
      const row = (el.firstElementChild as HTMLElement | null)?.offsetHeight ?? 0;
      const max = el.scrollHeight - el.clientHeight;
      const next = el.scrollTop + row > max + 2 ? 0 : Math.round(el.scrollTop / row) * row + row;
      slide(Math.min(next, max));
    }, 3500);
    // The list itself is moved only by the scrollbar drag and the auto-scroll.
    // Wheel and touch gestures over the list are redirected to the page so the
    // section never traps scrolling; keyboard scrolling never targets the list
    // because it cannot take focus, so keys scroll the page as usual.
    const wheel = (e: WheelEvent) => {
      e.preventDefault();
      window.scrollBy(0, e.deltaY);
    };
    let touchY = 0;
    const touchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? 0;
    };
    const touchMove = (e: TouchEvent) => {
      e.preventDefault();
      const y = e.touches[0]?.clientY ?? touchY;
      window.scrollBy(0, touchY - y);
      touchY = y;
    };
    el.addEventListener("wheel", wheel, { passive: false });
    el.addEventListener("touchstart", touchStart, { passive: true });
    el.addEventListener("touchmove", touchMove, { passive: false });
    return () => {
      clearInterval(id);
      cancelAnimationFrame(raf);
      el.removeEventListener("wheel", wheel);
      el.removeEventListener("touchstart", touchStart);
      el.removeEventListener("touchmove", touchMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      onMouseEnter={() => (hover.current = true)}
      onMouseLeave={() => (hover.current = false)}
      className="ambition-scroll h-[calc(3*7rem)] overflow-y-auto border-t border-forest-foreground/15 pr-4 md:h-[calc(3*8.5rem)]"
    >
      {items.map(([n, l]) => (
        <div key={l} className="grid h-28 grid-cols-[1fr_1fr] items-center gap-6 border-b border-forest-foreground/15 md:h-[8.5rem] md:grid-cols-[3fr_2fr]">
          <p className="text-6xl font-medium leading-none tracking-tight text-forest-foreground/40 md:text-8xl">{n}</p>
          <p className="text-xs font-semibold uppercase leading-snug tracking-wide md:text-sm">{l}</p>
        </div>
      ))}
    </div>
  );
}
