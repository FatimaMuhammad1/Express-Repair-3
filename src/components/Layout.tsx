import type { ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { GradientBackdrop } from "./GradientBackdrop";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background overflow-hidden">
      <Header />
      <main className="relative flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = "Hero background",
  actions,
  aside,
  className,
  overlayClassName,
  eyebrowClassName,
  hideBottomFade,
  imageClassName,
  imageScaleStart = 1.05,
  imageScaleEnd = 1.15,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  image?: string;
  imageAlt?: string;
  actions?: ReactNode;
  aside?: ReactNode;
  className?: string;
  overlayClassName?: string;
  eyebrowClassName?: string;
  hideBottomFade?: boolean;
  imageClassName?: string;
  imageScaleStart?: number;
  imageScaleEnd?: number;
}) {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroScale = useTransform(scrollY, [0, 600], [imageScaleStart, imageScaleEnd]);

  return (
    <section className={cn("relative text-white overflow-hidden min-h-[65vh] flex items-center", className)}>
      {image && (
        <motion.img
          src={image}
          alt={imageAlt}
          className={cn("absolute inset-0 w-full h-full object-cover", imageClassName)}
          style={{ y: heroY, scale: heroScale }}
        />
      )}
      <div className={cn("absolute inset-0 bg-[linear-gradient(115deg,rgba(0,0,0,0.55)_0%,rgba(0,0,0,0.35)_40%,transparent_75%)]", overlayClassName)} />
      {!hideBottomFade && (
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      )}
      <div className="relative max-w-7xl mx-auto px-4 pt-16 pb-24 w-full">
        <div className={cn("grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] items-center", !aside && "lg:grid-cols-1")}> 
          <div className="max-w-2xl">
            {eyebrow && (
              <span
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 bg-white/10 backdrop-blur-sm text-[11px] uppercase tracking-[0.24em] text-primary-glow font-semibold mb-8",
                  eyebrowClassName,
                )}
              >
                {eyebrow}
              </span>
            )}
            <motion.h1
              initial={{ opacity: 0, x: -72, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-6xl md:text-[5.5rem] lg:text-[6.5rem] font-normal leading-[0.98] tracking-tight mb-6 drop-shadow-[0_25px_45px_rgba(0,0,0,0.18)]"
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="text-base md:text-lg text-white/90 max-w-2xl leading-relaxed mb-8"
              >
                {subtitle}
              </motion.p>
            )}
            {actions && (
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 32, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                {actions}
              </motion.div>
            )}
          </div>
          {aside && <div className="hidden lg:block">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
