import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ImagePlaceholderProps = {
  label: string;
  hint?: string;
  aspect?: "video" | "square" | "portrait" | "wide";
  className?: string;
  /** Path under public/, e.g. `/about/about-story-workshop.jpg` */
  src?: string;
  alt?: string;
};

const aspectClass = {
  video: "aspect-video",
  square: "aspect-square",
  portrait: "aspect-[3/4]",
  wide: "aspect-[21/9]",
} as const;

export function ImagePlaceholder({
  label,
  hint = "Add file to public/about/ (see about-images.ts)",
  aspect = "video",
  className,
  src,
  alt,
}: ImagePlaceholderProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src) && !failed;

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl",
        !showImage &&
          "border-2 border-dashed border-primary/25 bg-gradient-to-br from-accent/60 via-background to-accent/30",
        aspectClass[aspect],
        className,
      )}
      aria-label={showImage ? (alt ?? label) : `Image placeholder: ${label}`}
    >
      {showImage ? (
        <img
          src={src}
          alt={alt ?? label}
          className="h-full w-full object-cover"
          loading="lazy"
          onError={() => setFailed(true)}
        />
      ) : (
        <>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.72_0.18_230/0.12),transparent_55%)]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <div className="w-14 h-14 rounded-2xl bg-gradient-brand grid place-items-center shadow-glow transition-transform duration-500 group-hover:scale-110">
              <ImageIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{label}</p>
              <p className="text-xs text-muted-foreground mt-1">{hint}</p>
              {src && failed && (
                <p className="text-[10px] text-destructive mt-2 font-mono break-all">{src}</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
