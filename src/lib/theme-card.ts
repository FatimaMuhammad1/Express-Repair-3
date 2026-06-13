import { cn } from "@/lib/utils";

/** Light blue card — primary site theme */

export const CARD_CREAM =
  "rounded-[1.75rem] border border-[#0095ff]/15 dark:border-slate-700 bg-gradient-to-br from-[#e0f2fe] via-[#dbeafe] to-[#ecf9ff] dark:from-slate-900/90 dark:via-slate-900/80 dark:to-slate-950/90 shadow-sm text-slate-950 dark:text-slate-100";

/** Softer blue card — brand accent alternate */

export const CARD_BLUE =
  "rounded-[1.75rem] border border-[#0095ff]/15 dark:border-slate-700 bg-gradient-to-br from-[#f0f9ff] via-[#e6f1ff] to-[#eef7ff] dark:from-slate-950/90 dark:via-slate-900/70 dark:to-slate-950/90 shadow-sm text-slate-950 dark:text-slate-100";

export const CARD_INTERACTIVE =
  "transition-all duration-300 hover:-translate-y-1 hover:border-[#0095ff]/35 hover:shadow-[0_30px_80px_-40px_rgba(0,149,255,0.18)]";

export const CARD_LAYOUT = "h-full flex flex-col";

export const CARD_GRID = "grid items-stretch gap-6";

export function themedCard(index: number, extra?: string) {
  return cn(index % 2 === 0 ? CARD_CREAM : CARD_BLUE, CARD_INTERACTIVE, CARD_LAYOUT, extra);
}

export function themedCardCream(extra?: string) {
  return cn(CARD_CREAM, CARD_INTERACTIVE, CARD_LAYOUT, extra);
}
