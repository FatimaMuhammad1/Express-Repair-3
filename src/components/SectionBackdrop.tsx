export function SectionBackdrop({ wash = "bg-white/30 dark:bg-slate-900/30" }: { wash?: string }) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.48]"
        style={{
          backgroundColor: "var(--background)",
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-white/40 dark:bg-slate-950/40" aria-hidden />
      <div className={`pointer-events-none absolute inset-0 ${wash}`} aria-hidden />
    </>
  );
}
