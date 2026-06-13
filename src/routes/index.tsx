import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Zap,
  Award,
  ShieldCheck,
  Star,
  ArrowRight,
  CheckCircle2,
  Wrench,
  PackageCheck,
  Search,
  Bell,
  Calendar,
  ChevronRight,
  Smartphone,
  Smile,
  Clock,
  Package,
  Tag,
  MessageCircle,
  Phone,
  MapPin,
} from "lucide-react";
import { Layout, PageHero } from "@/components/Layout";
import { HoverLift, Reveal } from "@/components/Reveal";
import { SectionBackdrop } from "@/components/SectionBackdrop";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-repair-shop.jpg";
import workshopImage from "@/assets/background.png";
import explodedImage from "@/assets/repair-exploded.jpg";
import svcScreen from "@/assets/svc-screen.jpg";
import headphoneImage from "@/assets/headphone-grid1.png";
import laptopImage from "@/assets/mac-book-grid2.png";
import phoneImage from "@/assets/phone-grid3.png";
import catLaptop from "@/assets/cat-laptop.jpg";
import catTablet from "@/assets/cat-tablet.jpg";
import catWatch from "@/assets/cat-watch.jpg";
import catTap from "@/assets/cat-tap.jpg";
import phoneLightning from "@/assets/phone-lightning.png";
import globalRoutes from "@/assets/global-routes.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Express Phone & Laptop Repair — Nuneaton | Repairs, Trade-In & Accessories" },
      {
        name: "description",
        content:
          "Same-day phone, laptop & tablet repairs in Nuneaton. Sell or buy refurbished devices, browse accessories. Free diagnostics, 90-day warranty. Call 07415 278767.",
      },
    ],
  }),
  component: HomePage,
});

const countUpStats = [
  { value: "10,000+", label: "Devices Repaired" },
  { value: "4.9★", label: "Average Rating" },
  { value: "30 min", label: "Avg Repair Time" },
  { value: "90 days", label: "Warranty Included" },
];

const stats = [
  { value: "10,000+", label: "Devices Repaired" },
  { value: "4.9★", label: "Average Rating" },
  { value: "30–60 Min", label: "Typical Repair Time" },
  { value: "90 Days", label: "Warranty on Repairs" },
];

const testimonials = [
  { name: "James W.", text: "Fast screen replacement and excellent service. Highly recommend." },
  {
    name: "Sophie L.",
    text: "Very professional staff and affordable pricing — couldn't be happier.",
  },
  { name: "David R.", text: "My laptop was repaired the same day. Brilliant local service." },
  { name: "Emma T.", text: "Highly recommended local repair shop. Friendly and reliable." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

// Using shared SectionBackdrop from components to keep backgrounds consistent

function HomePage() {
  const aboutImages = [headphoneImage, laptopImage, phoneImage];
  const [activeAboutImageIndex, setActiveAboutImageIndex] = useState(0);

  useEffect(() => {
    if (aboutImages.length < 2) return;
    const interval = window.setInterval(() => {
      setActiveAboutImageIndex((current) => (current + 1) % aboutImages.length);
    }, 4200);
    return () => window.clearInterval(interval);
  }, [aboutImages.length]);

  return (
    <Layout>
      <div className="relative min-h-screen bg-[#F5F1ED] dark:bg-slate-950 section-frost dark:section-frost">
        <div className="relative z-10">
          <section className="relative flex min-h-[85vh] lg:min-h-[720px] w-full items-center overflow-hidden bg-gradient-soft dark:bg-[#070e1a] transition-colors duration-500">
            {/* Background Layers */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
              {/* Subtle geometric background block behind the text */}
              <div className="absolute left-[-10%] top-0 h-full w-[45%] origin-bottom-left -skew-x-[12deg] bg-slate-200/60 dark:bg-[#0e1628] transition-colors duration-500" />
              
              {/* Solid Blue Stripe (The Cut) */}
              <div className="absolute -right-[20%] lg:right-0 top-0 h-full w-[110%] lg:w-[46%] origin-bottom-left -skew-x-[12deg] bg-[#0095ff]" />
              
              {/* Image Container */}
              <div className="absolute -right-[20%] lg:right-0 top-0 h-full w-[110%] lg:w-[46%] origin-bottom-left -skew-x-[12deg] overflow-hidden translate-x-[12px] lg:translate-x-[20px]">
                {/* Unskew the image */}
                <div className="absolute inset-[-20%] w-[140%] h-[140%] origin-bottom-left skew-x-[12deg] flex items-center justify-center">
                  <img
                    src={heroImage}
                    alt="Technician repairing a device"
                    className="h-full w-full object-cover filter brightness-[0.55] contrast-[1.1] saturate-100 -translate-x-[10%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#000000]/80 via-transparent to-transparent" />
                </div>

                {/* Clean Transparent Parallel Overlay on the bottom left of the image */}
                <div className="absolute left-0 bottom-0 h-[80%] w-[40%] bg-gradient-to-t from-[#0095ff]/60 to-transparent mix-blend-multiply" />
              </div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-8 py-24 lg:py-0">
              <div className="max-w-full lg:max-w-[56%] flex flex-col items-start pt-12 md:pt-0">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/30 bg-green-50 dark:bg-green-500/10 mb-8 shadow-sm"
                >
                  <ShieldCheck className="w-4 h-4 text-green-600 dark:text-green-500" />
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">Trusted by Hundreds of Customers</span>
                </motion.div>

                {/* Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                  className="font-sans text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-black uppercase leading-[1.05] tracking-tight text-[#0a1830] dark:text-white mb-6"
                >
                  TRUSTED REPAIRS.
                  <br />
                  PROFESSIONAL <span className="text-[#0095ff]">RESULTS.</span>
                </motion.h1>

                {/* Blue Underline */}
                <motion.div 
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="h-1.5 w-20 bg-[#0095ff] mb-8 origin-left rounded-full"
                />

                {/* Subtext */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                  className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-[32rem] leading-relaxed mb-10 font-medium"
                >
                  Expert repairs for phones, tablets, laptops and consoles.
                  <br className="hidden md:block" />
                  Quality parts, transparent pricing and warranty on every repair.
                </motion.p>

                {/* Feature Grid */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 w-full max-w-[38rem]"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      <Zap className="w-5 h-5 text-[#0095ff]" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Fast Turnaround</h3>
                      <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-tight">Same-day service<br/>available</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:border-l border-slate-200 dark:border-slate-800 sm:pl-6">
                    <div className="mt-0.5">
                      <ShieldCheck className="w-5 h-5 text-green-500" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Warranty Included</h3>
                      <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-tight">Up to 12 months<br/>warranty</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 sm:border-l border-slate-200 dark:border-slate-800 sm:pl-6">
                    <div className="mt-0.5">
                      <Tag className="w-5 h-5 text-[#0095ff]" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Transparent Pricing</h3>
                      <p className="text-[13px] text-slate-500 dark:text-slate-400 font-medium leading-tight">No hidden fees.<br/>Ever.</p>
                    </div>
                  </div>
                </motion.div>

                {/* Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                  className="flex flex-wrap items-center gap-4 mb-10"
                >
                  <Button
                    asChild
                    className="rounded-full bg-[#0095ff] text-white hover:bg-[#0078d4] px-8 py-6 text-sm font-bold shadow-[0_4px_20px_rgba(0,149,255,0.3)] transition-all hover:shadow-[0_8px_30px_rgba(0,149,255,0.5)] border-0"
                  >
                    <Link to="/services" className="flex items-center gap-2">
                      Get a Repair Quote <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full bg-transparent border-2 border-[#0095ff]/20 text-slate-900 dark:text-white hover:bg-[#0095ff]/5 dark:hover:bg-[#0095ff]/10 px-8 py-6 text-sm font-bold transition-all"
                  >
                    <a href="tel:+447415278767" className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-[#0095ff]" /> Call Us Now
                    </a>
                  </Button>
                </motion.div>

                {/* Footer Reviews */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
                  className="flex flex-wrap items-center gap-4 md:gap-5 text-sm font-medium text-slate-600 dark:text-slate-400"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-green-500 text-green-500" />
                      ))}
                    </div>
                    <span className="text-slate-900 dark:text-slate-200 font-bold ml-1">4.9/5</span>
                    <span>from 500+ reviews</span>
                  </div>
                  
                  <div className="hidden md:block w-px h-5 bg-slate-300 dark:bg-slate-700" />
                  
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#0095ff]" />
                    <span>Nuneaton, CV11 4HD</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

      {/* ── UNIFIED BACKGROUND WRAPPER (About Us -> Express Service) ── */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-950 section-frost">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.48] bg-[#F5F1ED] dark:bg-slate-950"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-white/30 dark:bg-slate-900/40" aria-hidden />
        <div className="relative z-10">
          {/* ── ABOUT US (mini) — smooth post-hero transition ── */}
          <section className="py-20 section-ice dark:section-ice">
            <div className="max-w-7xl mx-auto px-4">
              <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
                <Reveal>
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#0095ff] mb-4 block pb-2 border-b-2 border-[#0095ff] inline-block">
                      About Us
                    </span>
                    <h2 className="text-5xl md:text-6xl font-bold text-slate-950 dark:text-white leading-[1.08] tracking-tight mb-6">
                      Local experts.
                      <br /> Real repairs.
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
                      We're a small, independent repair shop based in Nuneaton. Our focus is simple: quality repairs, honest advice, and great customer service.
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
                      From cracked screens to complex board repairs, we treat every device with care as if it were our own.
                    </p>

                    {/* 4 Feature Icons */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
                      {[
                        { icon: ShieldCheck, label: "Quality Repairs", desc: "We use quality parts and proven techniques." },
                        { icon: MessageCircle, label: "Honest Advice", desc: "No pushy upsells. Just clear advice you can trust." },
                        { icon: Clock, label: "Quick Turnaround", desc: "Most repairs completed the same day." },
                        { icon: Award, label: "90-Day Warranty", desc: "All repairs come with a 90-day warranty." },
                      ].map((item, i) => {
                        const Icon = item.icon;
                        return (
                          <div key={i} className="flex flex-col items-start text-left px-4">
                            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#eff6ff] dark:bg-slate-800 shadow-sm shadow-slate-900/5 dark:shadow-none mb-4">
                              <Icon className="w-8 h-8 text-[#0B57A1] dark:text-sky-300" />
                            </div>
                            <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-2 leading-tight">{item.label}</h4>
                            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-[12rem]">{item.desc}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <motion.div
                    className="relative overflow-hidden bg-white dark:bg-slate-950/95 dark:border dark:border-slate-800 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.24)] rounded-2xl min-h-[460px] md:min-h-[560px] lg:min-h-[640px]"
                    whileHover={{ scale: 1.03, rotate: 1 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <AnimatePresence>
                      <motion.img
                        key={activeAboutImageIndex}
                        src={aboutImages[activeAboutImageIndex]}
                        alt="Repair workshop interior"
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                        initial={{ opacity: 0, scale: 1.06 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </AnimatePresence>

                    <div className="absolute left-0 right-0 bottom-4 flex justify-center gap-3">
                      {aboutImages.map((_, index) => (
                        <button
                          key={index}
                          type="button"
                          aria-label={`Show image ${index + 1}`}
                          onClick={() => setActiveAboutImageIndex(index)}
                          className={`h-3 w-3 rounded-full transition-all duration-300 ${
                            activeAboutImageIndex === index ? "bg-slate-900 scale-110" : "bg-slate-300"
                          }`}
                        />
                      ))}
                    </div>
                  </motion.div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ── WHAT WE REPAIR — PREMIUM SHOWCASE (FrostHalal Style) ── */}
          <section className="py-20 md:py-28 section-frost dark:section-frost">
            <div className="max-w-7xl mx-auto px-4">
              {/* Header */}
              <Reveal>
                <div className="text-center mb-16">
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#0095ff] mb-3 block bg-[#e0e7ff] dark:bg-slate-800 dark:text-slate-200 inline-block px-3 py-1 rounded">
                    OUR SELECTION
                  </p>
                  <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-tight text-slate-900 dark:text-white mb-4">
                    Premium Repair Services
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-3xl mx-auto leading-relaxed">
                    Every device is hand-selected, professionally diagnosed, and expertly repaired to preserve peak performance and longevity.
                  </p>
                </div>
              </Reveal>

              {/* Premium Grid Showcase - 4 Column with Image + Text Below */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-12">
                {[
                  {
                    img: catLaptop,
                    t: "Laptop Repair",
                    d: "Slow, broken or not booting? We bring laptops back to life with expert diagnostics and quality repairs.",
                  },
                  {
                    img: catTablet,
                    t: "Tablet Repair",
                    d: "Cracked screens, charging issues and battery swaps — all handled with precision and care.",
                  },
                  {
                    img: catWatch,
                    t: "Phone Unlocking",
                    d: "Network unlocking for most makes and models with fast turnaround and guaranteed results.",
                  },
                  {
                    img: catTap,
                    t: "Accessories",
                    d: "Quality cases, chargers, cables and audio — carefully selected for durability and performance.",
                  },
                ].map((item, i) => (
                  <HoverLift key={item.t} delay={i * 0.1}>
                    <div className="group">
                      {/* Image Card */}
                    <div className="relative overflow-hidden mb-4 cursor-pointer h-72 shadow-xl shadow-black/20">
                        <img
                          src={item.img}
                          alt={item.t}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>

                      {/* Text Content Below Image */}
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                          {item.t}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                          {item.d}
                        </p>
                      </div>
                    </div>
                  </HoverLift>
                ))}
              </div>

              {/* CTA Section - Light beige background like FrostHalal */}
              <Reveal>
                <div className="rounded-xl bg-[#f5f1ed] dark:bg-slate-900/85 dark:border dark:border-slate-800 p-10 md:p-16 text-center border border-slate-200/50">
                  <h3 className="text-3xl md:text-4xl font-serif font-bold text-slate-900 dark:text-white mb-3">
                    Need Professional Repair Service?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
                    We handle all your device repair needs with expert care and genuine components. Contact us for a consultation today.
                  </p>
                  <Link
                    to="/book"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-[#10274b] hover:bg-[#0a1a35] text-white font-semibold rounded transition-colors duration-300"
                  >
                    BOOK A REPAIR
                  </Link>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── WHY CHOOSE US + TRACK YOUR REPAIR ── */}
          <section className="relative py-24 bg-gradient-to-b from-[#eef7ff] via-[#f8fbff] to-[#ffffff] dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 dark:bg-slate-950">
            <div className="relative max-w-7xl mx-auto px-4">
              {/* Two-column grid — no outer card, content floats on the background */}
              <div className="grid gap-16 lg:grid-cols-[0.95fr_1.35fr] items-start">
                {/* LEFT: Why Choose Us — floating directly on background */}
                <Reveal>
                  <div className="flex flex-col h-full">
                    <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#0095ff] mb-4 block pb-2 border-b-2 border-[#0095ff] inline-block">
                      Why Choose Us
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-[#0f3b6f] dark:text-white leading-[1.15] mb-4 tracking-tight">
                      Repairs you
                      <br />
                      can trust.
                    </h2>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 max-w-[36ch] text-base">
                      Fast, honest repairs backed by quality parts and expert technicians. We make
                      the process simple, clear and worry-free.
                    </p>
                    <div className="flex-1 space-y-3">
                      {[
                        {
                          icon: Zap,
                          title: "Same Day Repairs",
                          desc: "Most repairs completed the same day.",
                        },
                        {
                          icon: Search,
                          title: "Free Diagnostics",
                          desc: "We find the issue first, so you know.",
                        },
                        {
                          icon: ShieldCheck,
                          title: "Genuine Quality Parts",
                          desc: "Reliable parts for lasting performance.",
                        },
                        {
                          icon: Award,
                          title: "Expert Technicians",
                          desc: "Skilled professionals you can rely on.",
                        },
                      ].map((f, fi) => (
                        <motion.div
                          key={f.title}
                          className="flex items-start gap-4 py-4 rounded-lg px-4 -mx-4 hover:bg-blue-50/60 dark:hover:bg-slate-800/70 transition-colors duration-300"
                          initial={{ opacity: 0, x: -32 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ delay: fi * 0.1, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                          whileHover={{ x: 6 }}
                        >
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e8f4ff] dark:bg-slate-800 shadow-sm text-[#0095ff] dark:text-sky-300 border border-[#b3d9ff]/30 dark:border-slate-700">
                            <f.icon className="h-5 w-5" strokeWidth={2.2} />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-bold text-[#0f3b6f] dark:text-white">{f.title}</div>
                            <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">{f.desc}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Reveal>

                {/* RIGHT: Track Your Repair — premium frosted glass card */}
                <Reveal delay={0.12}>
                  <div className="rounded-2xl border border-[#b3d9ff] dark:border-slate-700 bg-gradient-to-br from-[#f0f7ff] via-[#e8f4ff] to-[#f0f7ff] dark:from-slate-950/95 dark:via-slate-900/90 dark:to-slate-950/95 backdrop-blur-xl p-10 md:p-12 flex flex-col gap-8 shadow-[0_16px_48px_-12px_rgba(0,149,255,0.15)] h-full relative overflow-hidden">
                    {/* Decorative blobs */}
                    <div className="absolute -top-20 -right-20 h-40 w-40 rounded-full bg-[#0095ff]/8 dark:bg-[#0095ff]/15 blur-3xl" aria-hidden />
                    <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-[#5bbcff]/12 dark:bg-[#5bbcff]/10 blur-3xl" aria-hidden />
                    
                    <div className="relative z-10">
                      <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-[#0095ff] dark:text-sky-300">
                        Track Your Repair
                      </span>
                      <h3 className="text-3xl md:text-4xl font-bold text-[#0f3b6f] dark:text-white mt-2 mb-3">Track your repair</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        Stay updated on your repair status in real time. We'll show you exactly
                        where your device is in our workflow.
                      </p>
                    </div>

                    <div className="relative z-10 flex gap-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 dark:text-slate-300" />
                        <input
                          type="text"
                          placeholder="Enter your tracking ID (e.g. FIX-89045)"
                          className="w-full rounded-lg border border-[#b3d9ff] dark:border-slate-700 bg-white/90 dark:bg-slate-900/80 backdrop-blur-sm pl-12 pr-4 py-3.5 text-sm text-slate-700 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-400 font-medium outline-none focus:border-[#0095ff] focus:ring-2 focus:ring-[#0095ff]/25 transition-all shadow-sm"
                        />
                      </div>
                      <button className="rounded-lg bg-[#0095ff] hover:bg-[#0080dd] text-white px-7 py-3.5 text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 uppercase tracking-wide shrink-0">
                        Track Now
                      </button>
                    </div>

                    {/* Progress stepper */}
                    <div className="relative z-10">
                      <div className="relative flex items-start justify-between mb-8">
                        <div className="absolute top-5 left-0 right-0 flex items-center px-6 pointer-events-none">
                          <div className="flex-1 h-[2px] bg-gradient-to-r from-[#0095ff] to-slate-300" />
                          <div className="flex-[3] h-[1px] bg-slate-200 dark:bg-slate-700" />
                        </div>
                        {[
                          {
                            icon: PackageCheck,
                            label: "Received",
                            desc: "Device logged in.",
                            active: true,
                          },
                          {
                            icon: Search,
                            label: "Diagnosis",
                            desc: "Checking the issue.",
                            active: false,
                          },
                          {
                            icon: Wrench,
                            label: "Repairing",
                            desc: "Experts are fixing.",
                            active: false,
                          },
                          {
                            icon: ShieldCheck,
                            label: "Testing",
                            desc: "Quality checks.",
                            active: false,
                          },
                          {
                            icon: CheckCircle2,
                            label: "Ready",
                            desc: "Ready for pickup.",
                            active: false,
                          },
                        ].map((step) => (
                          <div
                            key={step.label}
                            className="relative flex flex-col items-center text-center w-[18%]"
                          >
                            <div
                              className={`flex h-12 w-12 items-center justify-center rounded-full border-2 z-10 shadow-md transition-all ${
                                step.active
                                  ? "border-[#0095ff] bg-white text-[#0095ff] shadow-[0_4px_16px_rgba(0,149,255,0.25)] dark:bg-slate-950/95 dark:text-[#7cc3ff] dark:border-slate-600"
                                  : "border-slate-300 bg-white text-slate-400 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-700"
                              }`}
                            >
                              <step.icon className="h-5 w-5" strokeWidth={1.75} />
                            </div>
                            <div
                              className={`mt-4 text-xs font-bold uppercase tracking-wide ${
                                step.active ? "text-[#0095ff] dark:text-sky-300" : "text-slate-600 dark:text-slate-400"
                              }`}
                            >
                              {step.label}
                            </div>
                            <div className="mt-1.5 text-[10px] text-slate-500 dark:text-slate-400 leading-tight hidden sm:block px-1 font-medium">
                              {step.desc}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Information boxes */}
                    <div className="relative z-10 grid sm:grid-cols-2 gap-4">
                      {/* Notification banner */}
                      <div className="flex items-start gap-3 rounded-lg border border-[#b3d9ff] dark:border-slate-700 bg-white/50 dark:bg-slate-900/70 backdrop-blur-sm px-4 py-4 transition hover:bg-white/70 dark:hover:bg-slate-900/80 shadow-sm">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f4ff] dark:bg-slate-800 border border-[#b3d9ff] dark:border-slate-700 text-[#0095ff] dark:text-sky-300">
                          <Bell className="h-4 w-4" strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-[#0f3b6f] dark:text-white">
                            Get Status Alerts
                          </div>
                          <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            Receive SMS or email updates instantly.
                          </div>
                          <button className="text-xs font-bold text-[#0095ff] dark:text-sky-300 hover:text-[#0080dd] dark:hover:text-sky-400 mt-2 transition">
                            Enable Alerts &rarr;
                          </button>
                        </div>
                      </div>

                      {/* Help banner */}
                      <div className="flex items-start gap-3 rounded-lg border border-[#b3d9ff] dark:border-slate-700 bg-white/50 dark:bg-slate-900/70 backdrop-blur-sm px-4 py-4 transition hover:bg-white/70 dark:hover:bg-slate-900/80 shadow-sm">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f4ff] dark:bg-slate-800 border border-[#b3d9ff] dark:border-slate-700 text-[#0095ff] dark:text-sky-300">
                          <Search className="h-4 w-4" strokeWidth={2} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-bold text-[#0f3b6f] dark:text-white">Lost Your ID?</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            Check your email receipt or contact us.
                          </div>
                          <Link
                            to="/contact"
                            className="text-xs font-bold text-[#0095ff] dark:text-sky-300 hover:text-[#0080dd] dark:hover:text-sky-400 mt-2 transition"
                          >
                            Get Support &rarr;
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ── BY THE NUMBERS ── */}
          <section className="relative overflow-hidden py-24 dark:bg-slate-950">
            <SectionBackdrop wash="bg-white/25 dark:bg-slate-950/70" />
            <div
              className="pointer-events-none absolute inset-0 section-gold opacity-80"
              aria-hidden
            />
            <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-[#0095ff]/14 blur-3xl orb-float" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#e0f2fe]/35 blur-3xl orb-float-reverse" />
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#5bbcff]/15 blur-3xl animate-pulse-glow" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
              <Reveal>
                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#0095ff] mb-4">
                </p>
                <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-tight text-slate-950 dark:text-white leading-[1.05] max-w-3xl mx-auto">
                  Trusted by thousands, <span className="italic text-[#0078d4] dark:text-sky-300">proven daily.</span>
                </h2>
                <div className="mt-16 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
                  <div className="flex w-max stats-ticker-marquee hover:[animation-play-state:paused]">
                    {[...countUpStats, ...countUpStats].map((stat, i) => (
                      <div
                        key={`${stat.label}-${i}`}
                        className="flex items-center gap-5 px-12 md:px-16"
                      >
                        <span className="font-serif text-4xl md:text-5xl lg:text-6xl font-normal tracking-tight bg-gradient-to-b from-slate-900 via-[#0095ff] to-[#0095ff] bg-clip-text text-transparent whitespace-nowrap">
                          {stat.value}
                        </span>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400 whitespace-nowrap">
                          {stat.label}
                        </span>
                        <span className="text-[#0095ff]/35 text-2xl leading-none" aria-hidden>
                          •
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── EXPRESS SERVICE ── */}
          <section className="py-24 bg-gradient-to-br from-[#f6faff] via-[#eff6ff] to-[#ffffff] dark:from-slate-950 dark:via-slate-950/95 dark:to-slate-950 dark:bg-slate-950 relative">
            <div className="max-w-7xl mx-auto px-4">
              <Reveal>
                <div className="grid lg:grid-cols-[0.95fr_1.05fr] gap-12 lg:gap-16 items-center">
                  {/* LEFT SIDE: Content */}
                  <div>
                    <span className="inline-flex items-center rounded-full border border-[#dbeafe] bg-[#eff6ff] dark:border-slate-700 dark:bg-slate-900/80 dark:text-slate-100 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.35em] text-[#0f3b6f] dark:text-slate-100 mb-4">
                      Express Service
                    </span>
                    <h2 className="text-5xl md:text-[3.5rem] font-bold text-slate-900 dark:text-white leading-[1.05] tracking-tight mb-4">
                      Fast Repairs.
                      <br />
                      Fair Prices.
                    </h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400 mb-10 max-w-xl">
                      Same-day repairs available for most devices.
                    </p>

                    {/* 2x2 Feature Grid */}
                    <div className="grid grid-cols-2 gap-6 mb-10">
                      {[
                        {
                          icon: Zap,
                          title: "Same-Day Repairs",
                          desc: "Get your device back today.",
                        },
                        {
                          icon: ShieldCheck,
                          title: "Quality Parts",
                          desc: "We use trusted, genuine parts.",
                        },
                        {
                          icon: Award,
                          title: "Expert Technicians",
                          desc: "Skilled professionals you can trust.",
                        },
                        {
                          icon: Tag,
                          title: "Fair Pricing",
                          desc: "Honest prices. No hidden fees.",
                        },
                      ].map((feature) => (
                        <div
                          key={feature.title}
                          className="rounded-3xl border border-slate-200/80 bg-white dark:bg-slate-950/95 dark:border-slate-800 p-5 shadow-sm"
                        >
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e0e7ff] dark:bg-slate-800 text-[#0078d4] dark:text-sky-300 shadow-sm mb-4">
                            <feature.icon className="h-5 w-5" strokeWidth={2} />
                          </div>
                          <div className="text-sm font-semibold text-slate-900 dark:text-white mb-1">
                            {feature.title}
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                            {feature.desc}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-6">
                      <Link to="/book">
                        <button className="inline-flex items-center gap-2 rounded-xl bg-gradient-purple-blue px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-gradient-purple-blue-hover transition-colors">
                          <Calendar className="h-4 w-4" /> Book a Repair
                        </button>
                      </Link>
                      <a
                        href="#services"
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[#0095ff] hover:underline"
                      >
                        See our services <ChevronRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>

                  {/* RIGHT SIDE: Phone Card Image */}
                  <motion.div
                    className="relative w-full aspect-[4/3] lg:aspect-square rounded-[2rem] overflow-hidden bg-gradient-to-br from-[#eef7ff] via-white to-[#e0f2fe] dark:from-slate-950/90 dark:via-slate-900/80 dark:to-slate-950/95 dark:bg-slate-950/95 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7),0_30px_90px_-50px_rgba(15,23,42,0.14)] border border-white/80 dark:border-slate-700"
                    initial={{ opacity: 0, x: 48, rotateY: -12 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.02, rotateY: 4 }}
                    style={{ perspective: 1200 }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,_rgba(255,255,255,0.55)_0%,transparent_52%)]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(210,198,178,0.22)_0%,transparent_48%)]" />
                    {/* 3D Phone Image */}
                    <motion.img
                      src={phoneLightning}
                      alt="Express Repair Phone"
                      className="relative h-[105%] max-h-full w-auto object-contain drop-shadow-[0_30px_80px_-40px_rgba(15,23,42,0.35)] animate-float-y"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.4 }}
                    />
                  </motion.div>
                </div>

                {/* BOTTOM STATS */}
                <div className="mt-16 rounded-[2rem] border border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-950/90 p-8 lg:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x md:divide-slate-100 dark:divide-slate-800">
                    {/* Stat 1 */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:px-6 first:pl-0 last:pr-0">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f0f9ff] dark:bg-slate-800 text-[#0095ff]">
                        <Smartphone className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#0095ff]">10,000+</div>
                        <div className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                          Devices Repaired
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          Trusted by thousands of happy customers.
                        </div>
                      </div>
                    </div>

                    {/* Stat 2 */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:px-6 first:pl-0 last:pr-0">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f0f9ff] dark:bg-slate-800 text-[#0095ff]">
                        <Star className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#0095ff]">
                          4.9<span className="text-lg">★</span>
                        </div>
                        <div className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                          Average Rating
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          Based on real customer reviews.
                        </div>
                      </div>
                    </div>

                    {/* Stat 3 */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:px-6 first:pl-0 last:pr-0">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f0f9ff] dark:bg-slate-800 text-[#0095ff]">
                        <Clock className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#0095ff]">30–60 Min</div>
                        <div className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                          Typical Repair Time
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          Most repairs completed while you wait.
                        </div>
                      </div>
                    </div>

                    {/* Stat 4 */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-4 md:px-6 first:pl-0 last:pr-0">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#f0f9ff] dark:bg-slate-800 text-[#0095ff]">
                        <ShieldCheck className="h-6 w-6" strokeWidth={1.5} />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-[#0095ff]">90 Days</div>
                        <div className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                          Warranty on Repairs
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                          Peace of mind with every repair we do.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ── END UNIFIED BACKGROUND WRAPPER ── */}
        </div>
      </div>

      {/* ── TESTIMONIALS ── */}
      <section className="relative overflow-hidden py-24 section-ice dark:section-ice dark:bg-slate-950">
        <SectionBackdrop wash="bg-white/20 dark:bg-slate-900/30" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#0095ff] mb-3">
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white">
                What Customers Say About Our Workshop
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
                Trusted local repairs that keep devices working and customers coming back.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {testimonials.map((t, i) => (
              <HoverLift key={t.name} delay={i * 0.1}>
                <Card className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white dark:bg-slate-950/95 dark:border-slate-800 p-8 shadow-[0_25px_60px_-30px_rgba(15,23,42,0.10)] transition-shadow duration-500 hover:shadow-[0_35px_90px_-40px_rgba(15,23,42,0.16)]">
                  <div
                    className="absolute -top-5 right-5 h-24 w-24 rounded-full bg-[#0095ff]/10 blur-2xl"
                    aria-hidden="true"
                  />
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0095ff]/10 text-[#10274b] dark:text-white shadow-sm">
                        <Star className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-slate-900 dark:text-white">5.0</div>
                        <div className="text-[11px] uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                          Rating
                        </div>
                      </div>
                    </div>
                    <div className="text-4xl leading-none text-[#0095ff]">“</div>
                  </div>

                  <p className="text-slate-700 dark:text-slate-200 leading-relaxed mb-8 flex-1">{t.text}</p>

                  <div className="mt-4 border-t border-slate-100 dark:border-slate-700 pt-5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-purple-blue text-white shadow-sm text-sm font-semibold">
                        {t.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-white">{t.name}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">Verified Customer</div>
                      </div>
                    </div>
                  </div>
                </Card>
              </HoverLift>
            ))}
          </div>
        </div>
      </section>

      {/* ── VISIT OUR STORE ── */}
      <section className="relative overflow-hidden py-24 bg-white dark:bg-slate-950">
        <SectionBackdrop wash="bg-slate-100/70 dark:bg-slate-900/50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <Reveal>
            <motion.div
              className="relative overflow-hidden rounded-[2.5rem] bg-sky-50 dark:bg-slate-900/80 dark:border-slate-700 border border-slate-200/70 p-10 md:p-12 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.12)]"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="pointer-events-none absolute -right-10 top-12 h-40 w-40 rounded-full bg-[#c7d8ff]/30 dark:bg-[#6e7fbf]/15 blur-3xl" />
              <div className="pointer-events-none absolute -left-10 bottom-14 h-48 w-48 rounded-full bg-[#e0e7ff]/40 dark:bg-[#5b8be1]/10 blur-3xl" />
              <div className="grid gap-14 xl:gap-20 lg:grid-cols-[1.3fr_0.85fr] lg:items-center">
                <motion.div
                  className="overflow-hidden rounded-[1.75rem] bg-slate-100 dark:bg-slate-950/95 min-h-[520px] aspect-[4/3]"
                  initial={{ opacity: 0, x: -16, scale: 0.98 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.18, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src={workshopImage}
                    alt="Repair workshop storefront"
                    className="w-full h-full object-contain"
                    style={{ objectPosition: 'center center' }}
                    loading="lazy"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: 0.1, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#5b21b6] dark:text-sky-300 mb-4">
                    Visit Our Store
                  </p>
                  <h3 className="text-4xl md:text-[3.5rem] font-bold tracking-tight text-slate-950 dark:text-white mb-4">
                    Come visit our workshop in Nuneaton
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-10 max-w-2xl leading-relaxed text-lg">
                    Drop in for a free diagnostic, friendly advice, or to browse our refurbished
                    stock and accessories. Our team is ready to assess your device and get it back
                    to perfect working order.
                  </p>
                  <div className="grid gap-5 mb-10 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e0f2fe] dark:bg-slate-800 text-[#0095ff] dark:text-sky-300 shadow-sm">
                        <Wrench className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#0095ff]">Address</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                          6 Harefield Road, Nuneaton, CV11 4HD
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e0f2fe] dark:bg-slate-800 text-[#0095ff] dark:text-sky-300 shadow-sm">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-[#003ea8] dark:text-sky-300">Call Us</div>
                        <div className="text-sm text-slate-500 dark:text-slate-400">07415 278767</div>
                      </div>
                    </div>
                  </div>
                  <motion.div
                    className="flex flex-wrap gap-4"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Button
                      asChild
                      size="lg"
                      className="rounded-xl bg-gradient-purple-blue hover:bg-gradient-purple-blue-hover text-white px-8 h-12 uppercase tracking-widest text-xs font-semibold shadow-sm"
                    >
                      <Link to="/contact">Get Directions</Link>
                    </Button>
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="rounded-xl border-2 border-[#0095ff] text-[#0095ff] bg-white dark:bg-slate-900/90 dark:text-white hover:bg-[#e0f2fe] dark:hover:bg-slate-800 px-8 h-12 uppercase tracking-widest text-xs font-semibold"
                    >
                      <Link to="/book">Book a Repair</Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </section>
      </div>
    </div>
    </Layout>
  );
}
