import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function CountUp({
  end,
  duration = 2400,
  suffix = "",
  prefix = "",
  decimals = 0,
  delay = 0,
}: {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let raf = 0;
    let cancelled = false;

    const timeout = window.setTimeout(() => {
      if (cancelled) return;
      const startTime = performance.now();

      const tick = (now: number) => {
        if (cancelled) return;
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        const eased = 1 - Math.pow(1 - progress, 4);
        setValue(end * eased);
        if (progress < 1) raf = requestAnimationFrame(tick);
        else setValue(end);
      };

      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      cancelled = true;
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [inView, end, duration, delay]);

  const formatted = decimals > 0 ? value.toFixed(decimals) : Math.floor(value).toLocaleString();
  const progress = end === 0 ? 1 : Math.min(1, value / end);

  return (
    <motion.span
      ref={ref}
      className="inline-block tabular-nums font-serif text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight bg-gradient-to-b from-slate-900 to-[#a855f7] bg-clip-text text-transparent"
      style={{
        y: (1 - progress) * 18,
        filter: `blur(${(1 - progress) * 4}px)`,
      }}
    >
      {prefix}
      {formatted}
      {suffix}
    </motion.span>
  );
}
