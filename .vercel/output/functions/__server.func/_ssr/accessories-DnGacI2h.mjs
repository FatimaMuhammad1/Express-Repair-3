import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { L as Layout, P as PageHero, R as Reveal, C as Card, S as SectionBackdrop, c as cn, B as Button, G as GoogleMapsIcon } from "./router-Dwa750EE.mjs";
import { u as useEmblaCarousel } from "../_libs/embla-carousel-react.mjs";
import { S as Stagger, a as StaggerItem } from "./Reveal-B2mjcIhv.mjs";
import { A as AutoScroll } from "../_libs/embla-carousel-auto-scroll.mjs";
import { C as CARD_GRID, t as themedCard } from "./theme-card-ChYPy8sU.mjs";
import "../_libs/sonner.mjs";
import { ao as Store, b as ShieldCheck, A as Award, C as Clock, S as Smartphone, an as Shield, Z as Zap, ap as Cable, L as Laptop, R as Headphones, aq as Car, ar as Tv, as as Watch, T as Tablet, at as Keyboard, au as Camera, av as Gamepad2, aw as Bluetooth, B as Battery, ax as IdCard, n as Monitor, ay as PenTool, az as HardDrive, W as Wrench, w as CircleCheck, v as Package, j as MessageCircle, G as CircleQuestionMark, aA as HeartHandshake, O as Sparkles, aB as ArrowLeft, d as ArrowRight } from "../_libs/lucide-react.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-dropdown-menu.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-menu.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-roving-focus.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
import "../_libs/embla-carousel-reactive-utils.mjs";
import "../_libs/embla-carousel.mjs";
const CarouselContext = reactExports.createContext(null);
function useCarousel() {
  const context = reactExports.useContext(CarouselContext);
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel />");
  }
  return context;
}
const Carousel = reactExports.forwardRef(({ orientation = "horizontal", opts, setApi, plugins, className, children, ...props }, ref) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === "horizontal" ? "x" : "y"
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = reactExports.useState(false);
  const [canScrollNext, setCanScrollNext] = reactExports.useState(false);
  const onSelect = reactExports.useCallback((api2) => {
    if (!api2) {
      return;
    }
    setCanScrollPrev(api2.canScrollPrev());
    setCanScrollNext(api2.canScrollNext());
  }, []);
  const scrollPrev = reactExports.useCallback(() => {
    api?.scrollPrev();
  }, [api]);
  const scrollNext = reactExports.useCallback(() => {
    api?.scrollNext();
  }, [api]);
  const handleKeyDown = reactExports.useCallback(
    (event) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );
  reactExports.useEffect(() => {
    if (!api || !setApi) {
      return;
    }
    setApi(api);
  }, [api, setApi]);
  reactExports.useEffect(() => {
    if (!api) {
      return;
    }
    onSelect(api);
    api.on("reInit", onSelect);
    api.on("select", onSelect);
    return () => {
      api?.off("select", onSelect);
    };
  }, [api, onSelect]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    CarouselContext.Provider,
    {
      value: {
        carouselRef,
        api,
        opts,
        orientation: orientation || (opts?.axis === "y" ? "vertical" : "horizontal"),
        scrollPrev,
        scrollNext,
        canScrollPrev,
        canScrollNext
      },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          ref,
          onKeyDownCapture: handleKeyDown,
          className: cn("relative", className),
          role: "region",
          "aria-roledescription": "carousel",
          ...props,
          children
        }
      )
    }
  );
});
Carousel.displayName = "Carousel";
const CarouselContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    const { carouselRef, orientation } = useCarousel();
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref: carouselRef, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        className: cn(
          "flex",
          orientation === "horizontal" ? "-ml-4" : "-mt-4 flex-col",
          className
        ),
        ...props
      }
    ) });
  }
);
CarouselContent.displayName = "CarouselContent";
const CarouselItem = reactExports.forwardRef(
  ({ className, ...props }, ref) => {
    const { orientation } = useCarousel();
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        ref,
        role: "group",
        "aria-roledescription": "slide",
        className: cn(
          "min-w-0 shrink-0 grow-0",
          orientation === "horizontal" ? "basis-auto pl-4" : "basis-full pt-4",
          className
        ),
        ...props
      }
    );
  }
);
CarouselItem.displayName = "CarouselItem";
const CarouselPrevious = reactExports.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        ref,
        variant,
        size,
        className: cn(
          "absolute  h-8 w-8 rounded-full",
          orientation === "horizontal" ? "-left-12 top-1/2 -translate-y-1/2" : "-top-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollPrev,
        onClick: scrollPrev,
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Previous slide" })
        ]
      }
    );
  }
);
CarouselPrevious.displayName = "CarouselPrevious";
const CarouselNext = reactExports.forwardRef(
  ({ className, variant = "outline", size = "icon", ...props }, ref) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        ref,
        variant,
        size,
        className: cn(
          "absolute h-8 w-8 rounded-full",
          orientation === "horizontal" ? "-right-12 top-1/2 -translate-y-1/2" : "-bottom-12 left-1/2 -translate-x-1/2 rotate-90",
          className
        ),
        disabled: !canScrollNext,
        onClick: scrollNext,
        ...props,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Next slide" })
        ]
      }
    );
  }
);
CarouselNext.displayName = "CarouselNext";
const appleLogo = "/assets/Apple-Logo-STup1_Qo.png";
const samsungLogo = "data:image/png;base64,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";
const googleLogo = "/assets/Google-logo-png-large-size-hYTqdu9x.png";
const huaweiLogo = "/assets/Huawei-Symbol-BLuh0GWQ.png";
const onePlusLogo = "/assets/OnePlus-Logo.wine-DLaGcjUX.png";
const xiaomiLogo = "/assets/Xiaomi-Logo-CbxcVkUH.png";
const oppoLogo = "/assets/oppo-logo-0-BwMa7p_T.png";
const sonyLogo = "/assets/Sony-Logo-DxDgVUaP.jpg";
const dellLogo = "data:image/png;base64,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";
const hpLogo = "data:image/png;base64,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";
const lenovoLogo = "/assets/new-Lenovo-logo-PNG-large-size-C5Rl0h5N.png";
const asusLogo = "/assets/Asus-Logo-BaTjY72_.png";
const microsoftLogo = "/assets/Microsoft-Logo-Cu9ZW0Po.png";
const amazonLogo = "/assets/Amazon-logo-D-fGGsob.jpg";
const asurLogo = "data:image/png;base64,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";
const brandLogoAssets = {
  Apple: appleLogo,
  Samsung: samsungLogo,
  Google: googleLogo,
  Huawei: huaweiLogo,
  OnePlus: onePlusLogo,
  Xiaomi: xiaomiLogo,
  Oppo: oppoLogo,
  Sony: sonyLogo,
  Dell: dellLogo,
  HP: hpLogo,
  Lenovo: lenovoLogo,
  Asus: asusLogo,
  Microsoft: microsoftLogo,
  Amazon: amazonLogo,
  Asur: asurLogo
};
const heroImage = "/assets/herosection-DSY8NofQ.png";
const accPhoneCases = "/assets/acc-phone-cases-CzhBafYc.jpg";
const accScreenProtectors = "/assets/acc-screen-protectors-CQ6UV2Ij.jpg";
const accChargersPower = "/assets/acc-chargers-power-D4M5D6Xo.jpg";
const accCables = "/assets/acc-cables-BsoxAQvR.jpg";
const accLaptopAccessories = "/assets/acc-laptop-accessories-BwLI7gf2.jpg";
const accAudioHeadphones = "/assets/acc-audio-headphones-Cdm2Dw3x.jpg";
const accCarAccessories = "/assets/acc-car-accessories-0_G6BUrh.jpg";
const accTvAccessories = "/assets/acc-tv-accessories-BNTIEADF.jpg";
const accSmartWatch = "/assets/smart-watch-D5bkVe7Q.jpg";
const accIpadCover = "/assets/ipad-cover-OrGrkI6H.jpg";
const accKeyboardMice = "/assets/keyboard-mice-BuJtKLPJ.jpg";
const accCameraBag = "/assets/camera-bag-BPuqwUHr.jpg";
const accGameController = "/assets/game-controller-uMCznzI8.png";
const accEarBuds = "/assets/ear-buds-BRqk-mpp.jpg";
const accFlashDrive = "/assets/flash-drive-BiFGseox.jpg";
const accPortablePower = "/assets/portable-power-DMQVhYuT.jpg";
const accMonitorStand = "/assets/monitor-stand-DOrifQmd.jpg";
const accRingLight = "/assets/ring-light-CzyPymEl.jpg";
const accStylus = "/assets/stylus-Bj3Gkq-T.jpg";
const accCableManagement = "/assets/cable-management-BcRaQCoX.png";
const API_BASE_URL = "http://localhost:8000/api";
const stats = [{
  icon: Store,
  label: "Availability",
  value: "In store"
}, {
  icon: ShieldCheck,
  label: "Guarantee",
  value: "30 days"
}, {
  icon: Award,
  label: "Quality",
  value: "Tested"
}, {
  icon: Clock,
  label: "Service",
  value: "Walk-in"
}];
const accessoryCategories = [{
  icon: Smartphone,
  img: accPhoneCases,
  title: "Phone Cases",
  items: ["Silicone", "Clear", "Rugged", "Wallet", "Leather", "MagSafe"]
}, {
  icon: Shield,
  img: accScreenProtectors,
  title: "Screen Protectors",
  items: ["Tempered Glass", "Privacy", "Anti-Glare", "Camera Lens"]
}, {
  icon: Zap,
  img: accChargersPower,
  title: "Chargers & Power",
  items: ["Fast Chargers", "Power Banks", "Wireless Pads", "Travel Adapters"]
}, {
  icon: Cable,
  img: accCables,
  title: "Cables",
  items: ["USB-C", "Lightning", "Micro USB", "HDMI", "Laptop Charging"]
}, {
  icon: Laptop,
  img: accLaptopAccessories,
  title: "Laptop Accessories",
  items: ["Chargers", "Bags & Sleeves", "Wireless Mice", "Keyboards", "USB Hubs"]
}, {
  icon: Headphones,
  img: accAudioHeadphones,
  title: "Audio & Headphones",
  items: ["Wired Earphones", "Wireless Earbuds", "Headphones", "Bluetooth Speakers"]
}, {
  icon: Car,
  img: accCarAccessories,
  title: "Car Accessories",
  items: ["Phone Holders", "Car Chargers", "AUX Cables", "Bluetooth Adapters"]
}, {
  icon: Tv,
  img: accTvAccessories,
  title: "TV Accessories",
  items: ["HDMI Cables", "Wall Mounts", "Remotes", "Streaming Sticks"]
}, {
  icon: Watch,
  img: accSmartWatch,
  title: "Smartwatch Accessories",
  items: ["Watch Bands", "Chargers", "Screen Protectors", "Cases"]
}, {
  icon: Tablet,
  img: accIpadCover,
  title: "Tablet Accessories",
  items: ["Cases & Covers", "Stylus Pens", "Keyboards", "Stands"]
}, {
  icon: Keyboard,
  img: accKeyboardMice,
  title: "Keyboards & Mice",
  items: ["Mechanical Keyboards", "Wireless Mice", "Gaming Keyboards", "Ergonomic"]
}, {
  icon: Camera,
  img: accCameraBag,
  title: "Camera Accessories",
  items: ["Tripods", "Lens Kits", "Memory Cards", "Camera Bags"]
}, {
  icon: Gamepad2,
  img: accGameController,
  title: "Gaming Accessories",
  items: ["Controllers", "Gaming Headsets", "Charging Docks", "Cable Management"]
}, {
  icon: Bluetooth,
  img: accEarBuds,
  title: "Bluetooth Devices",
  items: ["Speakers", "Earbuds", "Adapters", "Transmitters"]
}, {
  icon: Battery,
  img: accPortablePower,
  title: "Battery Solutions",
  items: ["Portable Power", "Battery Cases", "Replacement Batteries", "Charging Kits"]
}, {
  icon: IdCard,
  img: accFlashDrive,
  title: "Storage & Memory",
  items: ["SD Cards", "USB Drives", "External SSDs", "Card Readers"]
}, {
  icon: Monitor,
  img: accMonitorStand,
  title: "Monitor Accessories",
  items: ["Monitor Stands", "Screen Filters", "Cable Management", "Webcams"]
}, {
  icon: PenTool,
  img: accStylus,
  title: "Stylus & Pens",
  items: ["Active Styluses", "Bluetooth Pens", "Replacement Tips", "Screen Gloves"]
}, {
  icon: Camera,
  img: accRingLight,
  title: "Webcam & Streaming",
  items: ["Webcams", "Ring Lights", "Tripods", "USB Mics"]
}, {
  icon: HardDrive,
  img: accCableManagement,
  title: "Workspace Accessories",
  items: ["Monitor Stands", "Cable Management", "Keyboard Trays", "Desk Lighting"]
}];
const compatibleBrands = ["Apple", "Samsung", "Google", "Huawei", "OnePlus", "Xiaomi", "Oppo", "Sony", "Motorola", "Dell", "HP", "Lenovo", "Asus", "Acer", "Microsoft", "Amazon"];
const BrandLogo = ({
  brand
}) => {
  const logoSrc = brandLogoAssets[brand];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: logoSrc ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logoSrc, alt: `${brand} logo`, className: "h-24 w-auto object-contain" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg font-semibold uppercase tracking-[0.18em] text-slate-900", children: brand }) });
};
const shopTips = [{
  icon: Package,
  title: "Try before you buy",
  desc: "Feel the quality and check compatibility in person with our team."
}, {
  icon: Wrench,
  title: "Fitted on the spot",
  desc: "Screen protectors and cases fitted while you wait after a repair."
}, {
  icon: CircleQuestionMark,
  title: "Can't find it?",
  desc: "Tell us what you need — we can often source items within a few days."
}, {
  icon: HeartHandshake,
  title: "30-day guarantee",
  desc: "Not happy? We'll help you find the right accessory or replace it."
}];
const trustItems = [{
  icon: Award,
  title: "Premium Quality",
  desc: "Carefully sourced and tested accessories."
}, {
  icon: Store,
  title: "In-Stock Selection",
  desc: "Browse and purchase in our Nuneaton shop."
}, {
  icon: ShieldCheck,
  title: "30-Day Guarantee",
  desc: "Full satisfaction guarantee on all accessories."
}, {
  icon: Wrench,
  title: "Expert Advice",
  desc: "We'll help you pick the right fit for your device."
}];
function BrandsCarousel() {
  const [carouselApi, setCarouselApi] = reactExports.useState(null);
  const [selectedIndex, setSelectedIndex] = reactExports.useState(0);
  const [slidesCount, setSlidesCount] = reactExports.useState(0);
  reactExports.useEffect(() => {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden rounded-[2rem]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 -z-10 bg-gradient-to-b from-[#f7fbff] via-white to-transparent dark:from-slate-950/20 dark:via-transparent dark:to-transparent", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Carousel, { opts: {
      loop: true,
      align: "center",
      dragFree: true,
      skipSnaps: false
    }, plugins: [AutoScroll({
      playOnInit: true,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      speed: 1.2
    })], setApi: setCarouselApi, className: "relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselPrevious, { className: "absolute left-4 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-3 rounded-full shadow-lg z-20 hover:scale-105 transition-transform hover:border-[#10b981] hover:bg-[#d1fae5] dark:hover:border-[#10b981]/50 dark:hover:bg-slate-800" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselContent, { className: "flex items-stretch gap-4 py-12 px-8", children: compatibleBrands.map((brand, i) => {
        const isActive = selectedIndex === i;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselItem, { className: "basis-auto flex-none w-[clamp(140px,calc((100%-4rem)/6),200px)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
          opacity: 0,
          y: 10
        }, whileInView: {
          opacity: 1,
          y: 0
        }, transition: {
          delay: i * 0.02
        }, className: cn("relative mx-auto flex h-full w-full flex-col items-center justify-center rounded-[20px] p-5 transition-all duration-500 ease-out will-change-transform cursor-pointer group", isActive ? "scale-[1.08] shadow-[0_20px_60px_rgba(16,185,129,0.18)] border-2 border-[#10b981]/30 bg-gradient-to-br from-[#ecfdf5] via-[#d1fae5] to-[#bbf7d0] dark:from-[#064e3b]/30 dark:via-[#064e3b]/20 dark:to-[#065f46]/20 dark:bg-slate-900 dark:border-[#10b981]/40" : "shadow-[0_8px_20px_rgba(8,20,40,0.08)] hover:shadow-[0_16px_40px_rgba(16,185,129,0.18)] border border-[#d1fae5] dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#10b981]/30"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex items-center justify-center rounded-full p-3 transition-all duration-500", isActive ? "h-24 w-24 bg-gradient-to-br from-[#d1fae5] to-[#a7f3d0] dark:from-[#064e3b]/50 dark:to-[#047857]/50 shadow-lg" : "h-20 w-20 bg-[#f0fdf4] group-hover:bg-[#d1fae5] dark:bg-slate-800 dark:group-hover:bg-slate-700"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrandLogo, { brand }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("font-semibold transition-all", isActive ? "text-base text-[#059669] dark:text-[#34d399]" : "text-sm text-slate-900 dark:text-slate-300"), children: brand }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("mt-1 transition-all", isActive ? "text-xs text-[#10b981]" : "text-xs text-slate-400"), children: "Accessories" })
          ] })
        ] }) }, brand);
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselNext, { className: "absolute right-2 top-1/2 -translate-y-1/2 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 p-3 rounded-full shadow-lg z-20 hover:scale-105 transition-transform hover:border-[#10b981] hover:bg-[#d1fae5] dark:hover:border-[#10b981]/50 dark:hover:bg-slate-800" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 mb-8 flex flex-wrap justify-center items-center gap-2", children: Array.from({
      length: Math.max(1, slidesCount)
    }).map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => carouselApi?.scrollTo(idx), "aria-label": `Go to slide ${idx + 1}`, className: `transition-all duration-300 ${selectedIndex === idx ? "h-2 w-8 bg-[#10b981] shadow-md rounded-full" : "h-2 w-2 bg-slate-300 rounded-full hover:bg-slate-400"}` }, idx)) })
  ] });
}
function AccessoriesPage() {
  const [products, setProducts] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    if (typeof window !== "undefined") {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative min-h-screen bg-[#F5F1ED] dark:bg-slate-950 section-frost dark:section-frost", style: {}, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-white/40 dark:bg-transparent", "aria-hidden": true }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHero, { image: heroImage, overlayClassName: "bg-[linear-gradient(110deg,rgba(8,15,31,0.84)_0%,rgba(13,35,76,0.58)_38%,rgba(8,15,31,0.18)_72%,rgba(8,15,31,0.08)_100%)]", title: /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block font-serif text-5xl md:text-7xl lg:text-8xl font-normal leading-[1.02] tracking-tight text-primary-glow" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative z-10 -mt-20 pb-14", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Stagger, { className: "grid grid-cols-2 overflow-hidden rounded-[2rem] border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900/90 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.2)] md:grid-cols-4", children: stats.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(StaggerItem, { className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `relative flex h-full min-h-32 flex-col justify-center border-slate-200 p-6 ${index === 0 ? "border-b border-r md:border-b-0" : ""} ${index === 1 ? "border-b md:border-b-0 md:border-r" : ""} ${index === 2 ? "border-r" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-x-8 top-0 h-1 bg-gradient-to-r from-transparent via-[#06b6d4] to-transparent opacity-80" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "mb-3 h-5 w-5 text-[#0095ff]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-2xl font-semibold text-slate-950 dark:text-white", children: item.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-slate-500", children: item.label })
      ] }) }, item.label)) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden py-20 md:py-24 bg-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute -left-24 -top-16 h-72 w-72 rounded-full bg-[#e0f2fe]/60 blur-3xl", "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-14 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-block", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.32em] text-[#0095ff]", children: "In-Store Selection" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mx-auto mt-2 block h-[2px] w-10 bg-[#06b6d4]", "aria-hidden": true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 text-4xl font-semibold text-slate-950 dark:text-white md:text-5xl", children: [
              "Accessories for every ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0095ff]", children: "device" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#06b6d4]", children: "." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-2xl text-slate-600 dark:text-slate-400", children: "Cases, chargers, cables and audio — quality picks you can browse and buy in our Nuneaton shop." })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${CARD_GRID} sm:grid-cols-2 lg:grid-cols-4`, children: accessoryCategories.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i % 4 * 0.06, className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: themedCard(i, "group relative overflow-hidden p-0"), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] overflow-hidden", children: [
              cat.wip ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center bg-[#e0f2fe] text-[#0095ff]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-4xl font-bold tracking-[0.2em] uppercase", children: "WIP" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: cat.img, alt: cat.title, loading: "lazy", className: "h-full w-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4 flex h-10 w-10 items-center justify-center rounded-xl border border-[#0095ff]/60 bg-[#e0f2fe] dark:bg-slate-900/80 dark:border-[#0095ff]/30 text-[#0095ff] shadow-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(cat.icon, { className: "h-5 w-5" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-5 right-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-semibold text-white drop-shadow", children: cat.title }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-1 flex-col p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-2", children: cat.items.map((it) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full border border-[#0095ff]/60 bg-[#e0f2fe]/50 dark:bg-slate-800/60 dark:border-[#0095ff]/30 px-3 py-1.5 text-xs font-medium text-[#0095ff] dark:text-sky-300", children: it }, it)) }) })
          ] }) }, cat.title)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden py-20 md:py-24 bg-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionBackdrop, { wash: "bg-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mx-auto max-w-7xl px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { className: "overflow-hidden rounded-[2.5rem] border border-[#0095ff]/15 bg-gradient-to-br from-[#f0f9ff] via-[#dbeafe] to-[#ecf9ff] p-8 md:p-12 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.12)]", initial: {
          opacity: 0,
          y: 20
        }, whileInView: {
          opacity: 1,
          y: 0
        }, viewport: {
          once: true
        }, transition: {
          duration: 0.5
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.32em] text-[#0095ff]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-3xl font-semibold text-[#0095ff] md:text-4xl", children: "Quality you can trust." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${CARD_GRID} sm:grid-cols-2 lg:grid-cols-4`, children: trustItems.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.08, className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: cn(themedCard(i, "p-6 text-center items-center")), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#e0f2fe] dark:bg-slate-800 text-[#0095ff] dark:text-sky-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "h-6 w-6" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-slate-950 dark:text-white", children: item.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-slate-600 dark:text-slate-400", children: item.desc })
          ] }) }, item.title)) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative py-20 md:py-24 overflow-hidden bg-[#eef6ff] dark:bg-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-[#eef6ff] dark:bg-slate-950/40", "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(210,236,255,0.25)_0%,rgba(236,246,255,0.22)_100%)] dark:bg-[linear-gradient(90deg,rgba(15,23,42,0.6)_0%,rgba(15,23,42,0.4)_100%)]", "aria-hidden": true }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 mx-auto max-w-7xl px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-10 text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.32em] text-slate-900/90 dark:text-sky-300" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-3xl font-semibold text-slate-900 dark:text-white md:text-4xl", children: "Accessories for the brands you use." })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "my-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(BrandsCarousel, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 grid grid-cols-1 md:grid-cols-4 gap-6 items-start text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "mb-3 h-7 w-7 text-[#0ea5ff]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-slate-900 dark:text-white", children: "100% Genuine Products" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-slate-500", children: "Original products only" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "mb-3 h-7 w-7 text-[#0ea5ff]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-slate-900 dark:text-white", children: "Warranty Backed" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-slate-500", children: "Official brand warranty" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "mb-3 h-7 w-7 text-[#0ea5ff]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-slate-900 dark:text-white", children: "Wide Compatibility" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-slate-500", children: "Works with your devices" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "mb-3 h-7 w-7 text-[#0ea5ff]" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-semibold text-slate-900 dark:text-white", children: "Expert Support" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-slate-500", children: "We're here to help" })
              ] })
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden py-20 md:py-24 bg-[#f3f4f6] dark:bg-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative mx-auto max-w-7xl px-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-12 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-[0.32em] text-[#0095ff]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-3xl font-semibold text-slate-950 dark:text-white md:text-4xl", children: "Why buy accessories from us." })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `${CARD_GRID} sm:grid-cols-2 lg:grid-cols-4`, children: shopTips.map((tip, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: i * 0.08, className: "h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: themedCard(i, "p-6"), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#e0f2fe] dark:bg-slate-800 text-[#0095ff] dark:text-sky-400", children: /* @__PURE__ */ jsxRuntimeExports.jsx(tip.icon, { className: "h-5 w-5" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-slate-950 dark:text-white", children: tip.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-slate-600 dark:text-slate-400", children: tip.desc })
        ] }) }, tip.title)) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "relative overflow-hidden py-20 md:py-24 bg-white dark:bg-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative mx-auto max-w-3xl px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2.5rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-12 md:p-16 shadow-[0_24px_60px_-24px_rgba(15,23,42,0.08)] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "mx-auto mb-4 h-6 w-6 text-[#0095ff] dark:text-sky-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-semibold text-slate-950 dark:text-white md:text-4xl", children: "Need something we don't have?" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-xl text-slate-600", children: "Got a specific accessory in mind? Let us know and we'll source it for you." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap justify-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "rounded-xl bg-[#0095ff] text-white hover:bg-[#0078d4]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: "Request an Item" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", className: "rounded-xl border-2 border-[#0095ff] text-[#0095ff] bg-white dark:bg-slate-900 dark:hover:bg-slate-800 hover:bg-[#e0f2fe]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: "https://wa.me/447415278767", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MessageCircle, { className: "mr-2 h-4 w-4" }),
            " WhatsApp us"
          ] }) })
        ] })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative overflow-hidden py-20 md:py-24 bg-transparent dark:bg-transparent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SectionBackdrop, { wash: "bg-transparent" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mx-auto max-w-4xl px-4 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-[2.5rem] border border-[#0095ff]/15 dark:border-slate-800 bg-gradient-to-br from-[#f0f9ff] via-[#dbeafe] to-[#ecf9ff] dark:from-slate-900/90 dark:via-slate-900/80 dark:to-slate-950/90 p-10 md:p-14 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.12)]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(GoogleMapsIcon, { className: "mx-auto mb-4 h-9 w-9 text-[#0095ff] dark:text-sky-400" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-4xl font-semibold text-[#0095ff] dark:text-sky-300 md:text-5xl", children: "Browse accessories in store." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400", children: "Walk in, browse our selection, and get expert advice on the right fit for your device." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex flex-wrap justify-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", className: "rounded-xl bg-gradient-purple-blue text-white hover:bg-gradient-purple-blue-hover font-semibold h-12 uppercase tracking-widest text-xs px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: "Visit the Shop" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, size: "lg", variant: "outline", className: "rounded-xl border-2 border-[#0095ff] text-[#0078d4] bg-white hover:bg-[#e0f2fe]/40 h-12 uppercase tracking-widest text-xs px-8 font-semibold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", children: "Back to Home" }) })
          ] })
        ] }) }) })
      ] })
    ] })
  ] }) });
}
export {
  AccessoriesPage as component
};
