import { cn } from "@/lib/utils";

type GradientVariant = "hero" | "brand" | "card" | "soft" | "footer";

const baseClass: Record<GradientVariant, string> = {
  hero: "bg-gradient-hero",
  brand: "bg-gradient-brand",
  card: "bg-gradient-card-blue",
  soft: "bg-gradient-soft",
  footer: "bg-gradient-footer-blue",
};

/** Layered gradients + soft glow orbs — avoids flat solid blue blocks */
export function GradientBackdrop({
  variant = "hero",
  className,
}: {
  variant?: GradientVariant;
  className?: string;
}) {
  const showOrbs = variant === "hero" || variant === "card" || variant === "brand";

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}
      aria-hidden
    >
      <div className={cn("absolute inset-0", baseClass[variant])} />
      {variant === "hero" && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(255,255,255,0.22),transparent_55%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_90%_80%,rgba(94,224,255,0.35),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_100%,rgba(67,56,202,0.25),transparent_45%)]" />
        </>
      )}
      {variant === "card" && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.15),transparent_45%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_100%,rgba(34,211,238,0.2),transparent_50%)]" />
        </>
      )}
      {variant === "footer" && (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_60%)]" />
        </>
      )}
      {variant === "brand" && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-20%,rgba(255,255,255,0.2),transparent_50%)]" />
      )}
      {showOrbs && (
        <>
          <div className="absolute -top-20 -right-20 w-72 h-72 rounded-full bg-primary-glow/25 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/10 blur-3xl" />
        </>
      )}
    </div>
  );
}
