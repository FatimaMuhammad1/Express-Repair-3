import type { ImgHTMLAttributes } from "react";
import googleMapsPin from "@/assets/google-maps-pin.jpg";

export function GoogleMapsIcon({ className, ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src={googleMapsPin}
      alt="Google Maps pin"
      className={`inline-block align-middle object-contain ${className ?? ""}`.trim()}
      {...props}
    />
  );
}
