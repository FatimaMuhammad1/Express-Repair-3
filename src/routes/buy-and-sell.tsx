import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Headphones,
  HelpCircle,
  Laptop,
  Phone,
  RefreshCw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Tag,
  Tablet,
  TrendingUp,
  CreditCard,
  Lock,
  BadgeDollarSign,
  PlayCircle,
  Star,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Reveal } from "@/components/Reveal";
import { SectionBackdrop } from "@/components/SectionBackdrop";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { themedCard, CARD_GRID } from "@/lib/theme-card";
import { cn } from "@/lib/utils";
import heroVisual from "@/assets/herosection-buy-sell.png";
import phoneImage from "@/assets/smart-phone.png";
import laptopImage from "@/assets/laptop.png";
import tabletImage from "@/assets/tablet.png";
import accessoriesImage from "@/assets/accessories.png";

export const Route = createFileRoute("/buy-and-sell")({
  head: () => ({
    meta: [
      { title: "Buy & Sell Devices - Express Phone & Laptop Repair Nuneaton" },
      {
        name: "description",
        content:
          "Buy refurbished phones, laptops and tablets or sell your device for fair value in Nuneaton. Instant quotes, certified data wipe, 12-month warranty on refurbished stock.",
      },
    ],
  }),
  component: BuyAndSellPage,
});

type TradeMode = "buy" | "sell" | "exchange";

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

const categories = [
  {
    title: "Smartphones",
    subtitle: "Top brands at great prices",
    img: phoneImage,
    icon: Smartphone,
    bg: "bg-orange-100",
    iconBg: "bg-orange-500",
    linkColor: "text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300",
    linkLabel: "Shop Smartphones",
  },
  {
    title: "Laptops",
    subtitle: "Powerful performance, better value",
    img: laptopImage,
    icon: Laptop,
    bg: "bg-green-100",
    iconBg: "bg-green-600",
    linkColor: "text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300",
    linkLabel: "Shop Laptops",
  },
  {
    title: "Tablets",
    subtitle: "Browse all tablet deals",
    img: tabletImage,
    icon: Tablet,
    bg: "bg-blue-100",
    iconBg: "bg-blue-600",
    linkColor: "text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300",
    linkLabel: "Shop Tablets",
  },
  {
    title: "Accessories",
    subtitle: "Enhance your tech experience",
    img: accessoriesImage,
    icon: Headphones,
    bg: "bg-purple-100",
    iconBg: "bg-purple-600",
    linkColor: "text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300",
    linkLabel: "Shop Accessories",
  },
];

const sellFeatures = [
  {
    label: "Free Evaluation",
    detail: "Get an instant valuation",
    icon: BadgeDollarSign,
  },
  {
    label: "Instant Payment",
    detail: "Receive payment quickly",
    icon: CreditCard,
  },
  {
    label: "Safe & Secure",
    detail: "Your data is always protected",
    icon: ShieldCheck,
  },
  {
    label: "No Hidden Charges",
    detail: "100% transparent process",
    icon: CheckCircle2,
  },
];

const trustItems = [
  { icon: ShieldCheck, label: "100% Original Products" },
  { icon: TrendingUp, label: "Best Market Price Guaranteed" },
  { icon: RefreshCw, label: "7 Days Return Policy" },
  { icon: ShieldCheck, label: "Safe & Secure Transactions" },
];

const steps = [
  { n: "01", t: "Tell us what you have", d: "Share your device model, condition and any damage for an instant valuation." },
  { n: "02", t: "Get your quote", d: "Receive a fair, transparent price with no hidden fees." },
  { n: "03", t: "Visit our store", d: "Pop in at 6 Harefield Road for a final check before payment." },
  { n: "04", t: "Walk out happy", d: "Same-day cash or bank transfer when selling — ready to use when buying." },
];

const hours = [
  { day: "Monday – Friday", time: "10 AM – 6 PM" },
  { day: "Saturday", time: "10 AM – 6 PM" },
  { day: "Sunday", time: "Closed" },
  { day: "Sell payment", time: "Same day" },
];

const modeCopy: Record<TradeMode, { headline: string; body: string }> = {
  buy: {
    headline: "Browse tested refurbished devices",
    body: "Save up to 40% vs new — every device is multi-point tested with a 12-month warranty.",
  },
  sell: {
    headline: "Sell your device for the best local price",
    body: "Walk in with your phone, tablet or laptop and leave with cash the same day.",
  },
  exchange: {
    headline: "Trade in and upgrade in one visit",
    body: "Put your old device value towards refurbished stock — we handle valuation and setup in store.",
  },
};

function BuyAndSellPage() {
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

  const API_BASE_URL = "http://localhost:8000/api";

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/products?is_for_sale=true`);
      const data = await res.json();
      if (data.success) {
        setProducts(data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };
  const [mode, setMode] = useState<TradeMode>("buy");

  return (
    <Layout>
      <div className="relative min-h-screen bg-[#f4f8fc] dark:bg-slate-950 section-frost dark:section-frost">
        {/* ── Hero: reference layout (copy left, devices right) ── */}
        <section className="relative overflow-hidden border-b border-[#dbeafe]/80 bg-gradient-to-br from-[#f0f7ff] via-white to-[#e8f4ff] dark:from-slate-900/90 dark:via-slate-950 dark:to-slate-950 dark:border-slate-800">
          <div className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-[#b3d9ff]/30 blur-3xl" aria-hidden />
          <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 md:py-16 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <div>
                <h1 className="text-5xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
                  <span className="text-[#0056b3]">BUY</span>
                  <span className="mx-2 text-slate-900 dark:text-white">&</span>
                  <span className="text-[#10b981]">SELL</span>
                </h1>
                <p className="mt-3 text-lg font-medium text-slate-600 dark:text-slate-400 md:text-xl">
                  Best Deals on New &amp; Used Devices
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  {(["buy", "sell", "exchange"] as const).map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setMode(tab)}
                      className={cn(
                        "rounded-full px-7 py-2.5 text-sm font-bold uppercase tracking-wide transition-all",
                        mode === tab
                          ? tab === "buy"
                            ? "bg-[#0056b3] text-white shadow-md shadow-[#0056b3]/25"
                            : tab === "sell"
                            ? "bg-[#10b981] text-white shadow-md shadow-[#10b981]/25"
                            : "bg-[#64748b] text-white shadow-md shadow-[#64748b]/25"
                          : "border border-slate-300 bg-white text-slate-800 hover:border-[#0056b3]/40 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 dark:hover:bg-slate-800",
                      )}
                    >
                      {tab.toUpperCase()}
                    </button>
                  ))}
                </div>

                <motion.p
                  key={mode}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 max-w-lg text-slate-600 dark:text-slate-400 leading-relaxed"
                >
                  <span className="block font-semibold text-[#0f3b6f] dark:text-white">{modeCopy[mode].headline}</span>
                  {modeCopy[mode].body}
                </motion.p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild className="rounded-lg bg-[#0056b3] px-6 text-white hover:bg-[#004494]">
                    <Link to="/contact">{mode === "buy" ? "Browse Stock" : "Get a Quote"}</Link>
                  </Button>
                  <Button asChild variant="outline" className="rounded-lg border-slate-300 bg-white hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900/80 dark:hover:bg-slate-800 dark:text-white">
                    <a href="tel:+447415278767">Call 07415 278767</a>
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.12} className="relative">
              <div className="overflow-hidden rounded-[2rem] border border-[#b3d9ff]/50 bg-gradient-to-br from-[#e8f4ff] to-white p-4 shadow-[0_24px_60px_-30px_rgba(0,86,179,0.2)]">
                <img
                  src={heroVisual}
                  alt="Smartphones, laptop and accessories available to buy and sell"
                  className="h-full w-full max-h-[340px] object-contain object-center"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Categories + Sell sidebar (reference grid) ── */}
        <section className="relative bg-[#f8fafc] dark:bg-transparent py-16 md:py-24">
          <div className="mx-auto max-w-[1280px] px-4">
            <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_400px]">
              <div className="flex flex-col">
                <Reveal>
                  <div className="mb-10">
                    <h2 className="text-[2.2rem] font-extrabold tracking-tight text-[#0f1f47] dark:text-white md:text-[2.75rem]">
                      <span className="text-[#0056b3] dark:text-sky-400">Buy</span> <span className="text-slate-900 dark:text-white">&</span> <span className="text-[#10b981] dark:text-emerald-400">Sell</span> with Confidence
                    </h2>
                    <p className="mt-4 max-w-2xl text-[17px] text-slate-500 dark:text-slate-400">
                      Discover great deals on quality pre-owned devices, or sell your items quickly and securely.
                    </p>
                  </div>
                </Reveal>
                <div className="grid gap-6 sm:grid-cols-2">
                  {categories.map((cat, i) => (
                    <Reveal key={cat.title} delay={i * 0.06} className="h-full">
                      <Card className="group flex h-full flex-col overflow-hidden rounded-[2rem] border-0 bg-white dark:bg-slate-900/80 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                        <div className={`relative h-[160px] overflow-hidden ${cat.bg} dark:bg-slate-800`}>
                          <img
                            src={cat.img}
                            alt={cat.title}
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className={`absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-lg ${cat.iconBg} text-white shadow-sm`}>
                            <cat.icon className="h-4 w-4" />
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col p-5">
                          <h3 className="text-base font-bold text-slate-900 dark:text-white">{cat.title}</h3>
                          <p className="mt-1 flex-1 text-[13px] text-slate-500 dark:text-slate-400">{cat.subtitle}</p>
                          <Button asChild variant="link" className={`${cat.linkColor} mt-3 h-auto p-0 text-[13px] font-bold justify-start`}>
                            <a href="#">{cat.linkLabel} <ArrowRight className="ml-1.5 h-3 w-3" /></a>
                          </Button>
                        </div>
                      </Card>
                    </Reveal>
                  ))}
                </div>
              </div>

              <Reveal delay={0.15} className="h-full mt-16 lg:mt-0">
                <Card className="flex flex-col h-full overflow-hidden rounded-[2rem] border-0 bg-gradient-to-br from-[#111833] via-[#1f2660] to-[#3c4aa4] p-6 text-white shadow-[0_40px_120px_-45px_rgba(8,15,70,0.5)] md:p-8">
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-3xl bg-white/10 shadow-inner shadow-white/10">
                    <Tag className="h-7 w-7 text-white" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-[1.8rem] font-semibold leading-tight tracking-tight text-white">Sell Your Device</h2>
                    <p className="max-w-sm text-sm leading-relaxed text-slate-200/85">
                      Get the best price for your pre-owned device.
                    </p>
                  </div>

                  <div className="mt-6 space-y-2.5">
                    {sellFeatures.map((item) => (
                      <div key={item.label} className="flex items-center gap-3 rounded-[24px] bg-white/10 p-3.5 shadow-[0_20px_50px_-38px_rgba(255,255,255,0.35)]">
                        <div className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white shadow-sm shadow-white/10">
                          <item.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white">{item.label}</p>
                          <p className="mt-0.5 text-xs leading-5 text-slate-200/80">{item.detail}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <Button
                      asChild
                      className="w-full rounded-[1rem] bg-[#7c61ff] py-4 text-sm font-semibold text-white shadow-xl shadow-[#7c61ff]/25 transition hover:bg-[#6b4cff]"
                    >
                      <Link to="/contact">
                        Get a Quote <ArrowRight className="ml-2.5 h-5 w-5" />
                      </Link>
                    </Button>

                    <p className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-slate-200/75">
                      <Lock className="h-4 w-4 text-slate-200/80" /> Secure · Fast · Trusted
                    </p>
                  </div>
                </Card>
              </Reveal>
            </div>

            {/* Trust bar */}
            <Reveal delay={0.2}>
              <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-slate-200 dark:border-slate-800 pt-8 sm:flex-row sm:gap-4 lg:mt-24 lg:pt-10">
                <div className="flex flex-wrap items-center justify-center gap-6 text-[15px] font-semibold text-slate-600 dark:text-slate-400 lg:gap-10">
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck className="h-5 w-5 text-slate-400" />
                    <span>Trusted by Thousands</span>
                  </div>
                  <div className="hidden h-5 w-px bg-slate-300 md:block" />
                  <div className="flex items-center gap-2.5">
                    <Star className="h-5 w-5 text-slate-400" />
                    <span>4.8/5 Average Rating</span>
                  </div>
                  <div className="hidden h-5 w-px bg-slate-300 md:block" />
                  <div className="flex items-center gap-2.5">
                    <Headphones className="h-5 w-5 text-slate-400" />
                    <span>24/7 Customer Support</span>
                  </div>
                </div>
  
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── How it works ── */}
        <section className="relative overflow-hidden py-20 md:py-24 bg-[#f4f8fc] dark:bg-transparent">
          <SectionBackdrop wash="bg-[#f4f8fc]/80 dark:bg-slate-900/50" />
          <div className="relative z-10 mx-auto max-w-7xl px-4">
            <Reveal>
              <div className="mb-12 text-center">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0056b3]"></p>
                <h2 className="mt-3 text-3xl font-bold text-[#0f3b6f] dark:text-white md:text-4xl">How it works</h2>
                <p className="mx-auto mt-3 max-w-2xl text-slate-600 dark:text-slate-400">
                  Whether you&apos;re <span className="font-semibold text-[#047857] dark:text-emerald-400">buying, selling or exchanging</span> — the whole process takes just a few minutes in store.
                </p>
              </div>
            </Reveal>
            <div className={`${CARD_GRID} sm:grid-cols-2 lg:grid-cols-4`}>
              {steps.map((step, i) => (
                <Reveal key={step.n} delay={i * 0.08} className="h-full">
                  <Card className={themedCard(i, "rounded-2xl p-6")}>
                    <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#def7ec] dark:bg-slate-800 text-sm font-bold text-[#047857] dark:text-emerald-400">
                      {step.n}
                    </div>
                    <h3 className="font-semibold text-slate-900 dark:text-white">{step.t}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{step.d}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Opening hours ── */}
        <section className="relative bg-white dark:bg-transparent py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid gap-10 rounded-[2rem] border border-[#b3d9ff]/50 bg-gradient-to-br from-[#f0f7ff] to-white dark:from-slate-900/80 dark:to-slate-950/95 dark:border-slate-800 p-8 md:grid-cols-2 md:p-12">
              <Reveal>
                <Clock className="mb-4 h-9 w-9 text-[#047857] dark:text-emerald-400" />
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#047857] dark:text-emerald-400">Opening hours</p>
                <h2 className="mt-2 text-3xl font-bold text-[#0f3b6f] dark:text-white">Visit us today</h2>
                <p className="mt-4 text-slate-600 dark:text-slate-400 leading-relaxed">
                  6 Harefield Road, Nuneaton, CV11 4HD — walk in for an instant valuation or to browse refurbished stock.
                </p>
                <Button asChild className="mt-6 rounded-lg bg-[#0056b3] text-white hover:bg-[#004494]">
                  <Link to="/contact">Get Directions</Link>
                </Button>
              </Reveal>
              <div className="grid gap-3 sm:grid-cols-2">
                {hours.map((item, i) => (
                  <Reveal key={item.day} delay={i * 0.05}>
                    <div className="rounded-xl border border-[#b3d9ff]/60 bg-white dark:bg-slate-900/80 dark:border-slate-800 p-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{item.day}</div>
                      <div className="mt-1 text-lg font-semibold text-[#047857] dark:text-emerald-400">{item.time}</div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="relative overflow-hidden py-20 bg-[#f4f8fc] dark:bg-transparent">
          <div className="mx-auto max-w-4xl px-4">
            <Reveal>
              <Card className="relative overflow-hidden rounded-[2rem] border border-[#b3d9ff]/60 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-10 text-center shadow-lg md:p-14">
                <Sparkles className="mx-auto mb-4 h-6 w-6 text-[#10b981] dark:text-emerald-400" />
                <h2 className="text-3xl font-bold text-[#0f3b6f] dark:text-white md:text-4xl">Ready to buy or sell?</h2>
                <p className="mx-auto mt-4 max-w-xl text-slate-600 dark:text-slate-400">
                  Visit our Nuneaton shop or message us for an instant quote on your device.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-4">
                  <Button asChild size="lg" className="rounded-lg bg-[#10b981] text-white hover:bg-[#059669]">
                    <Link to="/contact">Get a Quote</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="rounded-lg border-2 border-[#0056b3] text-[#0056b3] hover:bg-[#f0f7ff] dark:border-sky-400 dark:text-sky-300 dark:hover:bg-slate-800">
                    <a href="tel:+447415278767">
                      <Phone className="mr-2 h-4 w-4" /> 07415 278767
                    </a>
                  </Button>
                </div>
              </Card>
            </Reveal>
          </div>
        </section>
      </div>
    </Layout>
  );
}
