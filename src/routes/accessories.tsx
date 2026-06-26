import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import {
  Smartphone,
  Shield,
  Zap,
  Cable,
  Laptop,
  Headphones,
  Car,
  Tv,
  Award,
  ShieldCheck,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Wrench,
  Store,
  Tag,
  Clock,
  CheckCircle2,
  Star,
  HeartHandshake,
  Package,
  HelpCircle,
  Calendar,
  PoundSterling,
  Apple,
  Watch,
  Tablet,
  Keyboard,
  Mouse,
  Monitor,
  Camera,
  Gamepad2,
  Battery,
  Bluetooth,
  Wifi,
  Volume2,
  Mic,
  PenTool,
  IdCard,
  HardDrive,
} from "lucide-react";

import { Layout, PageHero } from "@/components/layout/Layout";
import { GoogleMapsIcon } from "@/components/GoogleMapsIcon";

import { Reveal } from "@/components/Reveal";

import { Marquee } from "@/components/Marquee";
import { type CarouselApi, Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

import { Stagger, StaggerItem } from "@/components/about/Reveal";

import { brandLogoAssets } from "@/lib/brand-logos";
import AutoScroll from "embla-carousel-auto-scroll";

import { SectionBackdrop } from "@/components/SectionBackdrop";

import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";

import { themedCard, CARD_GRID } from "@/lib/theme-card";

import { cn } from "@/lib/utils";

import heroImage from "@/assets/herosection.png";

import workshopImage from "@/assets/workshop.jpg";

import accPhoneCases from "@/assets/acc-phone-cases.jpg";

import accScreenProtectors from "@/assets/acc-screen-protectors.jpg";

import accChargersPower from "@/assets/acc-chargers-power.jpg";

import accCables from "@/assets/acc-cables.jpg";

import accLaptopAccessories from "@/assets/acc-laptop-accessories.jpg";

import accAudioHeadphones from "@/assets/acc-audio-headphones.jpg";

import accCarAccessories from "@/assets/acc-car-accessories.jpg";

import accTvAccessories from "@/assets/acc-tv-accessories.jpg";
import accSmartWatch from "@/assets/accessories/smart-watch.jpg";
import accIpadCover from "@/assets/accessories/ipad-cover.jpg";
import accKeyboardMice from "@/assets/accessories/keyboard-mice.jpg";
import accCameraBag from "@/assets/accessories/camera-bag.jpg";
import accGameController from "@/assets/accessories/game-controller.png";
import accEarBuds from "@/assets/accessories/ear-buds.jpg";
import accFlashDrive from "@/assets/accessories/flash-drive.jpg";
import accPortablePower from "@/assets/accessories/portable-power.jpg";
import accMonitorStand from "@/assets/accessories/monitor-stand.jpg";
import accRingLight from "@/assets/accessories/ring-light.jpg";
import accStylus from "@/assets/accessories/stylus.jpg";
import accCableManagement from "@/assets/accessories/cable-management.png";
import catWatch from "@/assets/cat-watch.jpg";
import catTap from "@/assets/cat-tap.jpg";
import catTablet from "@/assets/cat-tablet.jpg";
import catLaptop from "@/assets/cat-laptop.jpg";
import svcCamera from "@/assets/svc-camera.jpg";
import svcBattery from "@/assets/svc-battery.jpg";

const API_BASE_URL = "http://localhost:8000/api";

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      { title: "Phone, Laptop & Tablet Accessories - Express Phone & Laptop Repair Nuneaton" },

      {
        name: "description",
        content:
          "Quality accessories for phones, laptops, tablets and more. Cases, chargers, cables, screen protectors & more in stock. Visit our Nuneaton store.",
      },
    ],
  }),

  component: AccessoriesPage,
});

interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  brand: string;
  model: string;
  condition: string;
  price: number;
  stock_quantity: number;
  image_url: string;
  is_for_sale: boolean;
}

const stats = [
  { icon: Store, label: "Availability", value: "In store" },

  { icon: ShieldCheck, label: "Guarantee", value: "30 days" },

  { icon: Award, label: "Quality", value: "Tested" },

  { icon: Clock, label: "Service", value: "Walk-in" },
];

const accessoryCategories = [
  {
    icon: Smartphone,
    img: accPhoneCases,
    title: "Phone Cases",
    items: ["Silicone", "Clear", "Rugged", "Wallet", "Leather", "MagSafe"],
  },

  {
    icon: Shield,
    img: accScreenProtectors,
    title: "Screen Protectors",
    items: ["Tempered Glass", "Privacy", "Anti-Glare", "Camera Lens"],
  },

  {
    icon: Zap,
    img: accChargersPower,
    title: "Chargers & Power",
    items: ["Fast Chargers", "Power Banks", "Wireless Pads", "Travel Adapters"],
  },

  {
    icon: Cable,
    img: accCables,
    title: "Cables",
    items: ["USB-C", "Lightning", "Micro USB", "HDMI", "Laptop Charging"],
  },

  {
    icon: Laptop,
    img: accLaptopAccessories,
    title: "Laptop Accessories",
    items: ["Chargers", "Bags & Sleeves", "Wireless Mice", "Keyboards", "USB Hubs"],
  },

  {
    icon: Headphones,
    img: accAudioHeadphones,
    title: "Audio & Headphones",
    items: ["Wired Earphones", "Wireless Earbuds", "Headphones", "Bluetooth Speakers"],
  },

  {
    icon: Car,
    img: accCarAccessories,
    title: "Car Accessories",
    items: ["Phone Holders", "Car Chargers", "AUX Cables", "Bluetooth Adapters"],
  },

  {
    icon: Tv,
    img: accTvAccessories,
    title: "TV Accessories",
    items: ["HDMI Cables", "Wall Mounts", "Remotes", "Streaming Sticks"],
  },

  {
    icon: Watch,
    img: accSmartWatch,
    title: "Smartwatch Accessories",
    items: ["Watch Bands", "Chargers", "Screen Protectors", "Cases"],
  },

  {
    icon: Tablet,
    img: accIpadCover,
    title: "Tablet Accessories",
    items: ["Cases & Covers", "Stylus Pens", "Keyboards", "Stands"],
  },

  {
    icon: Keyboard,
    img: accKeyboardMice,
    title: "Keyboards & Mice",
    items: ["Mechanical Keyboards", "Wireless Mice", "Gaming Keyboards", "Ergonomic"],
  },

  {
    icon: Camera,
    img: accCameraBag,
    title: "Camera Accessories",
    items: ["Tripods", "Lens Kits", "Memory Cards", "Camera Bags"],
  },

  {
    icon: Gamepad2,
    img: accGameController,
    title: "Gaming Accessories",
    items: ["Controllers", "Gaming Headsets", "Charging Docks", "Cable Management"],
  },

  {
    icon: Bluetooth,
    img: accEarBuds,
    title: "Bluetooth Devices",
    items: ["Speakers", "Earbuds", "Adapters", "Transmitters"],
  },

  {
    icon: Battery,
    img: accPortablePower,
    title: "Battery Solutions",
    items: ["Portable Power", "Battery Cases", "Replacement Batteries", "Charging Kits"],
  },

  {
    icon: IdCard,
    img: accFlashDrive,
    title: "Storage & Memory",
    items: ["SD Cards", "USB Drives", "External SSDs", "Card Readers"],
  },

  {
    icon: Monitor,
    img: accMonitorStand,
    title: "Monitor Accessories",
    items: ["Monitor Stands", "Screen Filters", "Cable Management", "Webcams"],
  },

  {
    icon: PenTool,
    img: accStylus,
    title: "Stylus & Pens",
    items: ["Active Styluses", "Bluetooth Pens", "Replacement Tips", "Screen Gloves"],
  },

  {
    icon: Camera,
    img: accRingLight,
    title: "Webcam & Streaming",
    items: ["Webcams", "Ring Lights", "Tripods", "USB Mics"],
  },

  {
    icon: HardDrive,
    img: accCableManagement,
    title: "Workspace Accessories",
    items: ["Monitor Stands", "Cable Management", "Keyboard Trays", "Desk Lighting"],
  },
];

const popularPicks = [
  { icon: Shield, title: "Tempered Glass", desc: "Protect your screen after a repair." },

  { icon: Zap, title: "Fast Chargers", desc: "USB-C and Lightning in stock." },

  { icon: Smartphone, title: "Phone Cases", desc: "Rugged, clear and wallet styles." },

  { icon: Cable, title: "Quality Cables", desc: "Durable cables that last." },

  { icon: Headphones, title: "Wireless Earbuds", desc: "Affordable audio for daily use." },

  { icon: Laptop, title: "Laptop Chargers", desc: "Replacement chargers for major brands." },

  { icon: Car, title: "Car Holders", desc: "Secure mounts for safe driving." },

  { icon: Tv, title: "HDMI Cables", desc: "4K-ready cables in multiple lengths." },

  { icon: Watch, title: "Watch Bands", desc: "Replacement bands for all smartwatches." },

  { icon: Tablet, title: "Tablet Cases", desc: "Protective covers for tablets." },

  { icon: Keyboard, title: "Wireless Keyboards", desc: "Bluetooth and wireless options." },

  { icon: Camera, title: "Memory Cards", desc: "High-capacity storage for devices." },

  { icon: Gamepad2, title: "Gaming Controllers", desc: "Compatible with multiple platforms." },

  { icon: Bluetooth, title: "Bluetooth Speakers", desc: "Portable audio solutions." },

  { icon: Battery, title: "Power Banks", desc: "Charge on the go anywhere." },

  { icon: IdCard, title: "USB Drives", desc: "Fast data transfer storage." },

  { icon: Monitor, title: "Monitor Stands", desc: "Ergonomic desk solutions." },
];

const bundles = [
  {
    title: "Screen Protection Pack",
    items: ["Tempered glass", "Camera lens protector", "Fitting included"],
    price: "from £15",
  },

  {
    title: "Charge & Go",
    items: ["Fast charger", "USB-C or Lightning cable", "Car adapter optional"],
    price: "from £19",
  },

  {
    title: "Full Protection",
    items: ["Rugged case", "Tempered glass", "Screen cleaning kit"],
    price: "from £25",
  },

  {
    title: "Laptop Essentials",
    items: ["Sleeve or bag", "Wireless mouse", "USB hub"],
    price: "from £29",
  },
];

const compatibleBrands = [
  "Apple",
  "Samsung",
  "Google",
  "Huawei",
  "OnePlus",
  "Xiaomi",
  "Oppo",
  "Sony",

  "Motorola",
  "Dell",
  "HP",
  "Lenovo",
  "Asus",
  "Acer",
  "Microsoft",
  "Amazon",
];

const BrandLogo = ({ brand }: { brand: string }) => {
  const logoSrc = brandLogoAssets[brand];

  return (
    <>
      {logoSrc ? (
        <img src={logoSrc} alt={`${brand} logo`} className="h-24 w-auto object-contain" />
      ) : (
        <span className="text-lg font-semibold uppercase tracking-[0.18em] text-slate-900">
          {brand}
        </span>
      )}
    </>
  );
};

const testimonials = [
  {
    name: "Rachel P.",
    text: "Picked up a case and screen protector after my repair — fitted on the spot.",
  },

  {
    name: "Chris D.",
    text: "Great selection of chargers. Much better quality than the cheap ones online.",
  },

  { name: "Amanda F.", text: "They sourced a specific laptop charger for me within a few days." },

  { name: "Oliver G.", text: "Friendly advice on which case would actually protect my phone." },

  { name: "Priya S.", text: "Wireless earbuds at a fair price. Happy with the purchase." },

  { name: "Mark L.", text: "Always stop in for cables and accessories when I'm in Nuneaton." },
];

const relatedPages = [
  {
    to: "/services" as const,
    icon: Wrench,
    title: "Repair Services",
    desc: "Same-day phone, laptop and tablet repairs.",
  },

  {
    to: "/buy-and-sell" as const,
    icon: PoundSterling,
    title: "Buy & Sell",
    desc: "Trade in old devices or buy refurbished.",
  },

  {
    to: "/book" as const,
    icon: Calendar,
    title: "Book a Repair",
    desc: "Reserve a slot before you visit.",
  },
];

const shopTips = [
  {
    icon: Package,
    title: "Try before you buy",
    desc: "Feel the quality and check compatibility in person with our team.",
  },

  {
    icon: Wrench,
    title: "Fitted on the spot",
    desc: "Screen protectors and cases fitted while you wait after a repair.",
  },

  {
    icon: HelpCircle,
    title: "Can't find it?",
    desc: "Tell us what you need — we can often source items within a few days.",
  },

  {
    icon: HeartHandshake,
    title: "30-day guarantee",
    desc: "Not happy? We'll help you find the right accessory or replace it.",
  },
];

const trustItems = [
  { icon: Award, title: "Premium Quality", desc: "Carefully sourced and tested accessories." },

  { icon: Store, title: "In-Stock Selection", desc: "Browse and purchase in our Nuneaton shop." },

  {
    icon: ShieldCheck,
    title: "30-Day Guarantee",
    desc: "Full satisfaction guarantee on all accessories.",
  },

  {
    icon: Wrench,
    title: "Expert Advice",
    desc: "We'll help you pick the right fit for your device.",
  },
];

function BrandsCarousel() {
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [slidesCount, setSlidesCount] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;
    const total = compatibleBrands.length;
    setSlidesCount(total);

    const onSelect = () => {
      setSelectedIndex(carouselApi.selectedScrollSnap());
    };

    onSelect();
    carouselApi.on("select", onSelect);
    carouselApi.on("reInit", onSelect);
    return () => {
      carouselApi.off("select", onSelect);
      carouselApi.off("reInit", onSelect);
    };
  }, [carouselApi]);

  return (
    <div className="relative overflow-hidden rounded-[2rem]">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#f7fbff] via-white to-transparent dark:from-slate-950/20 dark:via-transparent dark:to-transparent" aria-hidden />

      <Carousel 
        opts={{ loop: true, align: "center", dragFree: true, skipSnaps: false }} 
        plugins={[
          AutoScroll({
            playOnInit: true,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            speed: 1.2,
          })
        ]}
        setApi={setCarouselApi} 
        className="relative overflow-hidden"
      >
        <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-3 rounded-full shadow-lg z-20 hover:scale-105 transition-transform hover:border-[#10b981] hover:bg-[#d1fae5] dark:hover:border-[#10b981]/50 dark:hover:bg-slate-800" />

        <CarouselContent className="flex items-stretch gap-4 py-12 px-8">
          {compatibleBrands.map((brand, i) => {
            const isActive = selectedIndex === i;
            return (
            <CarouselItem key={brand} className="basis-auto flex-none w-[clamp(140px,calc((100%-4rem)/6),200px)]">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.02 }}
                className={cn(
                  "relative mx-auto flex h-full w-full flex-col items-center justify-center rounded-[20px] p-5 transition-all duration-500 ease-out will-change-transform cursor-pointer group",
                  isActive
                    ? "scale-[1.08] shadow-[0_20px_60px_rgba(16,185,129,0.18)] border-2 border-[#10b981]/30 bg-gradient-to-br from-[#ecfdf5] via-[#d1fae5] to-[#bbf7d0] dark:from-[#064e3b]/30 dark:via-[#064e3b]/20 dark:to-[#065f46]/20 dark:bg-slate-900 dark:border-[#10b981]/40"
                    : "shadow-[0_8px_20px_rgba(8,20,40,0.08)] hover:shadow-[0_16px_40px_rgba(16,185,129,0.18)] border border-[#d1fae5] dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#10b981]/30",
                )}
              >
                <div className={cn(
                  "flex items-center justify-center rounded-full p-3 transition-all duration-500",
                  isActive ? "h-24 w-24 bg-gradient-to-br from-[#d1fae5] to-[#a7f3d0] dark:from-[#064e3b]/50 dark:to-[#047857]/50 shadow-lg" : "h-20 w-20 bg-[#f0fdf4] group-hover:bg-[#d1fae5] dark:bg-slate-800 dark:group-hover:bg-slate-700"
                )}>
                  <BrandLogo brand={brand} />
                </div>

                <div className="mt-3 text-center">
                  <div className={cn(
                    "font-semibold transition-all",
                    isActive ? "text-base text-[#059669] dark:text-[#34d399]" : "text-sm text-slate-900 dark:text-slate-300"
                  )}>{brand}</div>
                  <div className={cn(
                    "mt-1 transition-all",
                    isActive ? "text-xs text-[#10b981]" : "text-xs text-slate-400"
                  )}>Accessories</div>
                </div>
              </motion.div>
            </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-3 rounded-full shadow-lg z-20 hover:scale-105 transition-transform hover:border-[#10b981] hover:bg-[#d1fae5] dark:hover:border-[#10b981]/50 dark:hover:bg-slate-800" />
      </Carousel>

      <div className="mt-2 mb-8 flex flex-wrap justify-center items-center gap-2">
        {Array.from({ length: Math.max(1, slidesCount) }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => carouselApi?.scrollTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 ${selectedIndex === idx ? "h-2 w-8 bg-[#10b981] shadow-md rounded-full" : "h-2 w-2 bg-slate-300 rounded-full hover:bg-slate-400"}`}
          />
        ))}
      </div>
    </div>
  );
}

function AccessoriesPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch on client side
    if (typeof window !== 'undefined') {
      fetchProducts();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products?category=accessories&is_for_sale=true`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch accessories:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div 
        className="relative min-h-screen bg-[#F5F1ED] dark:bg-slate-950 section-frost dark:section-frost"
        style={{}}
      >
        <div className="pointer-events-none absolute inset-0 bg-white/40 dark:bg-transparent" aria-hidden />
        <div className="relative z-10">
          <PageHero
            image={heroImage}
            overlayClassName="bg-[linear-gradient(110deg,rgba(8,15,31,0.84)_0%,rgba(13,35,76,0.58)_38%,rgba(8,15,31,0.18)_72%,rgba(8,15,31,0.08)_100%)]"
            title={
              <>
                <span className="block font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.02] tracking-tight text-primary-glow">
                </span>
              </>
            }
          />

          <section className="relative z-10 -mt-20 pb-14">
            <div className="mx-auto max-w-7xl px-4">
              <Stagger className="grid grid-cols-2 overflow-hidden rounded-[2rem] border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.2)] md:grid-cols-4">
                {stats.map((item, index) => (
                  <StaggerItem key={item.label} className="h-full">
                    <div
                      className={`relative flex h-full min-h-32 flex-col justify-center border-slate-200 p-6 ${
                        index === 0 ? "border-b border-r md:border-b-0" : ""
                      } ${index === 1 ? "border-b md:border-b-0 md:border-r" : ""} ${
                        index === 2 ? "border-r" : ""
                      }`}
                    >
                      <div className="absolute inset-x-8 top-0 h-1 bg-gradient-to-r from-transparent via-[#06b6d4] to-transparent opacity-80" />

                      <item.icon className="mb-3 h-5 w-5 text-[#0095ff]" />

                      <div className="text-2xl font-semibold text-slate-950 dark:text-white">{item.value}</div>

                      <div className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                        {item.label}
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </section>

          <section className="relative overflow-hidden py-20 md:py-24 bg-transparent">
            <div
              className="pointer-events-none absolute -left-24 -top-16 h-72 w-72 rounded-full bg-[#e0f2fe]/60 blur-3xl"
              aria-hidden
            />

            <div className="relative mx-auto max-w-7xl px-4">
              <Reveal>
                <div className="mb-14 text-center">
                  <div className="inline-block">
                    <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#0095ff]">
                      In-Store Selection
                    </p>

                    <span className="mx-auto mt-2 block h-[2px] w-10 bg-[#06b6d4]" aria-hidden />
                  </div>

                  <h2 className="mt-4 text-4xl font-semibold text-slate-950 dark:text-white md:text-5xl">
                    Accessories for every <span className="text-[#0095ff]">device</span>
                    <span className="text-[#06b6d4]">.</span>
                  </h2>

                  <p className="mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400">
                    Cases, chargers, cables and audio — quality picks you can browse and buy in our
                    Nuneaton shop.
                  </p>
                </div>
              </Reveal>

              <div className={`${CARD_GRID} sm:grid-cols-2 lg:grid-cols-4`}>
                {accessoryCategories.map((cat, i) => (
                  <Reveal key={cat.title} delay={(i % 4) * 0.06} className="h-full">
                    <Card className={themedCard(i, "group relative overflow-hidden p-0")}>
                      <div className="relative aspect-[4/3] overflow-hidden">
                        {(cat as any).wip ? (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#e0f2fe] text-[#0095ff]">
                            <span className="text-4xl font-bold tracking-[0.2em] uppercase">WIP</span>
                          </div>
                        ) : (
                          <>
                            <img
                              src={cat.img}
                              alt={cat.title}
                              loading="lazy"
                              className="h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                          </>
                        )}

                        <div className="absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[#0095ff]/60 bg-[#e0f2fe] dark:bg-slate-900/80 dark:border-[#0095ff]/30 text-[#0095ff] shadow-lg">
                          <cat.icon className="h-5 w-5" />
                        </div>

                        <div className="absolute bottom-4 left-5 right-5">
                          <h3 className="text-xl font-semibold text-white drop-shadow">
                            {cat.title}
                          </h3>
                        </div>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex flex-wrap gap-2">
                          {cat.items.map((it) => (
                            <span
                              key={it}
                              className="rounded-full border border-[#0095ff]/60 bg-[#e0f2fe]/50 dark:bg-slate-800/60 dark:border-[#0095ff]/30 px-3 py-1.5 text-xs font-medium text-[#0095ff] dark:text-sky-300"
                            >
                              {it}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden py-20 md:py-24 bg-transparent">
            <SectionBackdrop wash="bg-transparent" />

            <div className="relative z-10 mx-auto max-w-7xl px-4">
              <motion.div
                className="overflow-hidden rounded-[2.5rem] border border-[#0095ff]/15 bg-gradient-to-br from-[#f0f9ff] via-[#dbeafe] to-[#ecf9ff] p-8 md:p-12 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.12)]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-10 text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#0095ff]">
                  </p>

                  <h3 className="mt-3 text-3xl font-semibold text-[#0095ff] md:text-4xl">
                    Quality you can trust.
                  </h3>
                </div>

                <div className={`${CARD_GRID} sm:grid-cols-2 lg:grid-cols-4`}>
                  {trustItems.map((item, i) => (
                    <Reveal key={item.title} delay={i * 0.08} className="h-full">
                      <Card className={cn(themedCard(i, "p-6 text-center items-center"))}>
                        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e0f2fe] dark:bg-slate-800 text-[#0095ff] dark:text-sky-400">
                          <item.icon className="h-6 w-6" />
                        </div>

                        <h4 className="font-semibold text-slate-950 dark:text-white">{item.title}</h4>

                        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.desc}</p>
                      </Card>
                    </Reveal>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          <section className="relative py-20 md:py-24 overflow-hidden bg-[#eef6ff] dark:bg-transparent">
            <div
              className="pointer-events-none absolute inset-0 bg-[#eef6ff] dark:bg-slate-950/40"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(210,236,255,0.25)_0%,rgba(236,246,255,0.22)_100%)] dark:bg-[linear-gradient(90deg,rgba(15,23,42,0.6)_0%,rgba(15,23,42,0.4)_100%)]"
              aria-hidden
            />
            
            <div className="relative z-10 mx-auto max-w-7xl px-4">
              <Reveal>
                <div className="mb-10 text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-slate-900/90 dark:text-sky-300">
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white md:text-4xl">
                    Accessories for the brands you use.
                  </h2>
                </div>
              </Reveal>

              <div className="my-20">
                <div className="mx-auto max-w-7xl px-4">
                  <BrandsCarousel />

                  <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6 items-start text-center">
                    <div className="flex flex-col items-center">
                      <CheckCircle2 className="mb-3 h-7 w-7 text-[#0ea5ff]" />
                      <div className="font-semibold text-slate-900 dark:text-white">100% Genuine Products</div>
                      <div className="text-sm text-slate-500">Original products only</div>
                    </div>

                    <div className="flex flex-col items-center">
                      <Award className="mb-3 h-7 w-7 text-[#0ea5ff]" />
                      <div className="font-semibold text-slate-900 dark:text-white">Warranty Backed</div>
                      <div className="text-sm text-slate-500">Official brand warranty</div>
                    </div>

                    <div className="flex flex-col items-center">
                      <Package className="mb-3 h-7 w-7 text-[#0ea5ff]" />
                      <div className="font-semibold text-slate-900 dark:text-white">Wide Compatibility</div>
                      <div className="text-sm text-slate-500">Works with your devices</div>
                    </div>

                    <div className="flex flex-col items-center">
                      <MessageCircle className="mb-3 h-7 w-7 text-[#0ea5ff]" />
                      <div className="font-semibold text-slate-900 dark:text-white">Expert Support</div>
                      <div className="text-sm text-slate-500">We're here to help</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden py-20 md:py-24 bg-[#f3f4f6] dark:bg-transparent">
            <div className="relative mx-auto max-w-7xl px-4">
              <Reveal>
                <div className="mb-12 text-center">
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[#0095ff]">
                  </p>

                  <h2 className="mt-4 text-3xl font-semibold text-slate-950 dark:text-white md:text-4xl">
                    Why buy accessories from us.
                  </h2>
                </div>
              </Reveal>

              <div className={`${CARD_GRID} sm:grid-cols-2 lg:grid-cols-4`}>
                {shopTips.map((tip, i) => (
                  <Reveal key={tip.title} delay={i * 0.08} className="h-full">
                    <Card className={themedCard(i, "p-6")}>
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#e0f2fe] dark:bg-slate-800 text-[#0095ff] dark:text-sky-400">
                        <tip.icon className="h-5 w-5" />
                      </div>

                      <h3 className="font-semibold text-slate-950 dark:text-white">{tip.title}</h3>

                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{tip.desc}</p>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>

        

          

          <section className="relative overflow-hidden py-20 md:py-24 bg-white dark:bg-transparent">
            <div className="relative mx-auto max-w-3xl px-4">
              <Reveal>
                <div className="rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-12 md:p-16 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.08)] text-center">
                  <Sparkles className="mx-auto mb-4 h-6 w-6 text-[#0095ff] dark:text-sky-400" />

                  <h2 className="text-3xl font-semibold text-slate-950 dark:text-white md:text-4xl">
                    Need something we don't have?
                  </h2>

                  <p className="mx-auto mt-4 max-w-xl text-slate-600">
                    Got a specific accessory in mind? Let us know and we'll source it for you.
                  </p>

                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="rounded-xl bg-[#0095ff] text-white hover:bg-[#0078d4]"
                    >
                      <Link to="/contact">Request an Item</Link>
                    </Button>

                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="rounded-xl border-2 border-[#0095ff] text-[#0095ff] bg-white dark:bg-slate-900 dark:hover:bg-slate-800 hover:bg-[#e0f2fe]"
                    >
                      <a href="https://wa.me/447415278767">
                        <MessageCircle className="mr-2 h-4 w-4" /> WhatsApp us
                      </a>
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          <section className="relative overflow-hidden py-20 md:py-24 bg-transparent dark:bg-transparent">
            <SectionBackdrop wash="bg-transparent" />

            <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
              <Reveal>
                <div className="rounded-[2.5rem] border border-[#0095ff]/15 dark:border-slate-800 bg-gradient-to-br from-[#f0f9ff] via-[#dbeafe] to-[#ecf9ff] dark:from-slate-900/90 dark:via-slate-900/80 dark:to-slate-950/90 p-10 md:p-14 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.12)]">
                  <GoogleMapsIcon className="mx-auto mb-4 h-9 w-9 text-[#0095ff] dark:text-sky-400" />

                  <h2 className="text-4xl font-semibold text-[#0095ff] dark:text-sky-300 md:text-5xl">
                    Browse accessories in store.
                  </h2>

                  <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
                    Walk in, browse our selection, and get expert advice on the right fit for your
                    device.
                  </p>

                  <div className="mt-8 flex flex-wrap justify-center gap-4">
                    <Button
                      asChild
                      size="lg"
                      className="rounded-xl bg-gradient-purple-blue text-white hover:bg-gradient-purple-blue-hover font-semibold h-12 uppercase tracking-widest text-xs px-8"
                    >
                      <Link to="/contact">Visit the Shop</Link>
                    </Button>

                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="rounded-xl border-2 border-[#0095ff] text-[#0078d4] bg-white hover:bg-[#e0f2fe]/40 h-12 uppercase tracking-widest text-xs px-8 font-semibold"
                    >
                      <Link to="/">Back to Home</Link>
                    </Button>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
