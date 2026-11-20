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
    // Only the scrollbar and the auto-scroll may move the list: block wheel,
    // touch drag and keyboard scrolling (scrollbar drag is native UI, unaffected).
    const block = (e: Event) => e.preventDefault();
    el.addEventListener("wheel", block, { passive: false });
    el.addEventListener("touchmove", block, { passive: false });
    // Scroll keys scroll the element under the cursor even without focus, so
    // block them at document level only while the pointer is over the list.
    const keys = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);
    const blockKeys = (e: KeyboardEvent) => {
      if (hover.current && keys.has(e.key)) e.preventDefault();
    };
    document.addEventListener("keydown", blockKeys);
    return () => {
      clearInterval(id);
      cancelAnimationFrame(raf);
      el.removeEventListener("wheel", block);
      el.removeEventListener("touchmove", block);
      document.removeEventListener("keydown", blockKeys);
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
