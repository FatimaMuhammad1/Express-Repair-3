import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";import { motion } from "framer-motion";

import {
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Clock,
  Facebook,
  Headphones,
  HelpCircle,
  Instagram,
  MessageCircle,
  Phone,
  Search,
  Send,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Star,
  Wrench,
  Zap,
  Laptop,
  Tablet,
  Cpu,
  HeartHandshake,
} from "lucide-react";

import { toast } from "sonner";

import { Layout } from "@/components/Layout";

import { SectionBackdrop } from "@/components/SectionBackdrop";
import { GoogleMapsIcon } from "@/components/GoogleMapsIcon";

import { Button } from "@/components/ui/button";



import { Card } from "@/components/ui/card";

import { themedCard, CARD_GRID } from "@/lib/theme-card";

import { cn } from "@/lib/utils";

import { Input } from "@/components/ui/input";

import { Label } from "@/components/ui/label";

import { Textarea } from "@/components/ui/textarea";

import { Reveal, Stagger, StaggerItem } from "@/components/about/Reveal";

import workshopImage from "@/assets/workshop.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact - Express Phone & Laptop Repair Nuneaton" },

      {
        name: "description",

        content:
          "Contact Express Phone & Laptop Repair in Nuneaton. Call 07415 278767, visit 6 Harefield Road, CV11 4HD, or send us a message. Free diagnostics, same-day repairs.",
      },
    ],
  }),

  component: ContactPage,
});

const contactChannels = [
  {
    icon: Phone,

    title: "Call us",

    value: "07415 278767",

    href: "tel:+447415278767",

    note: "Quotes, bookings and quick repair advice.",
    accentColor: "#F59E0B",
    accentLight: "#fef3c7",
    accentDark: "#b45309",
  },

  {
    icon: MessageCircle,

    title: "WhatsApp",

    value: "Send a photo",

    href: "https://wa.me/447415278767",

    note: "Fastest way to get a rough quote.",
    accentColor: "#25D366",
    accentLight: "#d1fae5",
    accentDark: "#128C7E",
  },

  {
    icon: GoogleMapsIcon,

    title: "Visit the shop",

    value: "6 Harefield Road",

    href: "https://www.google.com/maps/search/?api=1&query=6+Harefield+Road+Nuneaton+CV11+4HD",

    note: "Nuneaton, CV11 4HD. Walk-ins welcome.",
    accentColor: "#EC4899",
    accentLight: "#fbf1f7",
    accentDark: "#be123c",
  },
];

const helpTopics = [
  {
    icon: Wrench,
    title: "Book a repair",
    text: "Choose your device and issue.",
    to: "/book" as const,
  },

  {
    icon: Headphones,
    title: "Track your device",
    text: "Check repair progress.",
    to: "/profile" as const,
  },

  {
    icon: HelpCircle,
    title: "Read the FAQ",
    text: "Warranty, pricing and timing.",
    to: "/faq" as const,
  },
];

const hours = [
  { label: "Monday-Friday", time: "10 AM - 6 PM" },

  { label: "Saturday", time: "10 AM - 6 PM" },

  { label: "Sunday", time: "Closed" },

  { label: "Typical wait", time: "Under 15 min" },
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

const servicesOverview = [
  {
    icon: Smartphone,
    title: "Phone Repair",
    desc: "Screen, battery, charging port & more",
    link: "/services",
  },

  {
    icon: Laptop,
    title: "Laptop Repair",
    desc: "Keyboard, battery, SSD upgrades & more",
    link: "/services",
  },

  {
    icon: Tablet,
    title: "Tablet Repair",
    desc: "Display, charging & software fixes",
    link: "/services",
  },

  {
    icon: Cpu,
    title: "Phone Unlocking",
    desc: "Network unlock for most models",
    link: "/services",
  },
];

const trustItems = [
  { icon: Star, label: "4.9★ Average Rating", desc: "From 1,000+ reviews" },

  { icon: Zap, label: "Same-Day Service", desc: "Most repairs completed same day" },

  { icon: Search, label: "Free Diagnostics", desc: "No charge to check the issue" },

  { icon: ShieldCheck, label: "90-Day Warranty", desc: "On every repair we complete" },
];

const pricingPreview = [
  { service: "Screen Repair", price: "from £39" },

  { service: "Battery Replacement", price: "from £29" },

  { service: "Charging Port Fix", price: "from £25" },

  { service: "Water Damage Repair", price: "from £49" },

  { service: "Software Issue", price: "from £19" },

  { service: "Laptop Service", price: "from £39" },
];

const fieldClass =
  "h-12 rounded-lg border-[#0095ff]/60 dark:border-slate-700 bg-[#f0f9ff]/30 dark:bg-slate-900/50 px-4 shadow-none focus-visible:ring-[#0095ff] dark:text-white";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Phone validation
    const phoneRegex = /^(\+44|0)[1-9]\d{8,9}$/;
    if (formData.phone && !phoneRegex.test(formData.phone.replace(/\s/g, ""))) {
      toast.error("Please enter a valid UK phone number (e.g., 07415 278767 or +447415278767)");
      return;
    }
    
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/view/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Message sent! We'll get back to you soon.");
        setFormData({ name: "", phone: "", email: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (err) {
      toast.error("Could not reach the server.");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Layout>

      {/* ── UNIFIED BACKGROUND WRAPPER (All content below hero) ── */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-950 section-frost dark:section-frost">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.48] dark:opacity-0"
          style={{
            backgroundColor: "#F5F1ED",
          }}
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-white/30 dark:bg-slate-950/30" aria-hidden />
        <div className="relative z-10">
          {/* ── CONTACT CHANNELS ── */}

      <section className="relative py-14">
        <div className="mx-auto max-w-7xl px-4">
          <Stagger className="grid overflow-hidden rounded-[2rem] border border-slate-200/70 dark:border-slate-800 bg-white dark:bg-slate-900/80 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.2)] md:grid-cols-3">
            {contactChannels.map((channel, index) => (
              <StaggerItem key={channel.title} className="h-full">
                <a
                  href={channel.href}
                  target={channel.href.startsWith("http") ? "_blank" : undefined}
                  rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                  className={`group relative flex h-full min-h-44 flex-col justify-between border-slate-200 dark:border-slate-800 p-6 transition-all ${
                    index < contactChannels.length - 1 ? "border-b md:border-b-0 md:border-r" : ""
                  }`}
                  style={{ backgroundColor: `${channel.accentColor}08` }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = `${channel.accentColor}15`)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = `${channel.accentColor}08`)}
                >
                  <div className="absolute inset-x-8 top-0 h-1 bg-gradient-to-r from-transparent via-[#0095ff] to-transparent opacity-50" />
                  <div className="absolute inset-x-8 top-0 h-1" style={{ background: `linear-gradient(90deg, transparent, ${channel.accentColor}, transparent)`, opacity: "0.5" }} />

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                        {channel.title}
                      </div>

                      <div className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white transition-colors" style={{ color: channel.accentDark }}>
                        {channel.value}
                      </div>
                    </div>

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-1" style={{ backgroundColor: `${channel.accentColor}20`, color: channel.accentDark, borderColor: `${channel.accentColor}40` }}>
                      <channel.icon className="h-6 w-6" />
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-6 text-slate-600 dark:text-slate-400">{channel.note}</p>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── QUICK ROUTES ── */}

    

      {/* ── CONTACT FORM + SIDEBAR ── */}

      <section className="relative py-20 md:py-24 overflow-hidden bg-white dark:bg-transparent">
        <SectionBackdrop />

        <div className="relative z-10">
          <div className="mx-auto grid max-w-7xl items-start gap-6 px-4 lg:grid-cols-[1.08fr_0.92fr]">
            <Reveal className="h-full">
              <Card className="relative overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 p-7 md:p-10 shadow-sm">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#059669] via-[#d1fae5] to-[#059669]" />

                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#059669]">
                  Send a message
                </p>

                <h2 className="text-3xl font-semibold leading-tight text-slate-950 dark:text-white md:text-4xl">
                  Tell us what needs fixing.
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-400">
                  Include the device model, the issue, and any photos you can send by <span className="text-[#059669] dark:text-emerald-400">WhatsApp</span>
                  later. We will get back to you as soon as possible.
                </p>

                <form
                  onSubmit={handleContactSubmit}
                  className="mt-8 space-y-5"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="cname" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Name
                      </Label>

                      <Input 
                        id="cname" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={fieldClass} 
                        placeholder="Your name" 
                      />
                    </div>

                    <div>
                      <Label htmlFor="cphone" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Phone
                      </Label>

                      <Input
                        id="cphone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className={fieldClass}
                        placeholder="07xxx xxxxxx"
                      />
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="cemail" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Email
                      </Label>

                      <Input
                        id="cemail"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={fieldClass}
                        placeholder="you@email.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="csubject" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Subject
                      </Label>

                      <Input
                        id="csubject"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className={fieldClass}
                        placeholder="Repair quote, warranty, etc."
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="cmsg" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      Message
                    </Label>

                    <Textarea
                      id="cmsg"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="mt-2 rounded-lg border-[#0095ff]/60 dark:border-slate-700 bg-[#f0f9ff]/30 dark:bg-slate-900/50 px-4 py-3 shadow-none focus-visible:ring-[#0095ff] dark:text-white"
                      placeholder="Tell us about your device and the issue..."
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="w-full rounded-xl bg-gradient-purple-blue text-white hover:bg-gradient-purple-blue-hover"
                  >
                    {isLoading ? "Sending..." : <><Send className="mr-2 h-4 w-4" /> Send Message</>}
                  </Button>
                </form>
              </Card>
            </Reveal>

            <div className="grid gap-6">
              <Reveal delay={0.08}>
                <Card className="overflow-hidden rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/80 text-slate-950 dark:text-white shadow-sm">
                  <div className="relative min-h-56">
                    <img
                      src={workshopImage}
                      alt="Express repair shop"
                      className="h-full w-full min-h-56 object-cover"
                      loading="lazy"
                    />
                  </div>

                  <div className="p-7">
                    <GoogleMapsIcon className="mb-4 h-8 w-8 text-[#059669]" />

                    <h3 className="text-3xl font-semibold text-slate-950 dark:text-white">Visit our store</h3>

                    <p className="mt-3 text-sm leading-7 text-slate-600">
                      6 Harefield Road, Nuneaton, CV11 4HD
                    </p>

                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <Button
                        asChild
                        className="rounded-xl bg-gradient-purple-blue text-white hover:bg-gradient-purple-blue-hover"
                      >
                        <a
                          href="https://www.google.com/maps/search/?api=1&query=6+Harefield+Road+Nuneaton+CV11+4HD"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Get Directions
                        </a>
                      </Button>

                      <Button
                        asChild
                        variant="outline"
                        className="rounded-xl border-2 border-[#0095ff] text-[#0078d4] dark:text-sky-300 bg-white dark:bg-slate-900/80 dark:border-sky-500 hover:bg-[#e0f2fe]/40"
                      >
                        <a href="tel:+447415278767">Call the Shop</a>
                      </Button>
                    </div>
                  </div>
                </Card>
              </Reveal>

              <Reveal delay={0.12}>
                <Card className="rounded-[1.75rem] border-[#25D366]/25 dark:border-emerald-800/50 bg-[#25D366]/[0.07] dark:bg-emerald-950/20 p-7 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#25D366]/15 dark:bg-emerald-950/50 text-[#128C7E] dark:text-emerald-400 ring-1 ring-[#25D366]/25 dark:ring-emerald-600/30">
                      <MessageCircle className="h-6 w-6" />
                    </div>

                    <div>
                          <h3 className="text-2xl font-semibold text-slate-950 dark:text-white">Chat on <span className="text-[#059669] dark:text-emerald-400">WhatsApp</span></h3>

                          <p className="mt-2 text-sm leading-7 text-slate-600">
                            Send photos of the damage and we can usually point you in the right
                            direction quickly.
                          </p>
                        </div>
                  </div>

                  <Button
                    asChild
                    className="mt-6 w-full rounded-sm bg-[#25D366] text-white hover:bg-[#20bd5a]"
                  >
                    <a href="https://wa.me/447415278767">Open WhatsApp</a>
                  </Button>
                </Card>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── OPENING HOURS ── */}

      <section className="relative overflow-hidden py-20 md:py-24 bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe]/30 to-white dark:bg-transparent dark:from-transparent dark:to-transparent">
        <SectionBackdrop wash="bg-[#f0f9ff]/50 dark:bg-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <motion.div
            className="relative overflow-hidden rounded-[2.5rem] border border-[#0095ff]/15 dark:border-slate-800 bg-gradient-to-br from-[#f0f9ff] via-[#dbeafe] to-[#f8fbff] dark:from-slate-900/80 dark:via-slate-900/70 dark:to-slate-950/85 p-8 md:p-12 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.12)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid gap-8 md:grid-cols-[0.85fr_1.15fr]">
              <div>
                <Clock className="mb-5 h-9 w-9 text-[#0095ff]" />

                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#0095ff]">
                  Opening hours
                </p>

                <h2 className="text-3xl font-semibold leading-tight text-[#0095ff] md:text-5xl">
                  Walk in when it suits.
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-slate-600">
                  Bring your device in for a free initial diagnosis. Most common repairs can be
                  handled the same day.
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {hours.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-[#0095ff]/40 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 p-5"
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                      {item.label}
                    </div>

                    <div className="mt-2 text-lg font-semibold text-[#0095ff] dark:text-sky-300">{item.time}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-[#0095ff]/30 pt-8">
              <Button
                asChild
                className="rounded-xl bg-gradient-purple-blue text-white hover:bg-gradient-purple-blue-hover"
              >
                <Link to="/book">Book a Repair</Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-xl border-2 border-[#25D366] text-[#059669] dark:text-emerald-400 bg-white dark:bg-slate-900/80 hover:bg-[#d1fae5]/40 dark:hover:bg-emerald-950/40"
              >
                <a href="https://wa.me/447415278767">Ask on WhatsApp</a>
              </Button>

              <div className="ml-auto flex gap-2">
                <Button
                  asChild
                  size="icon"
                  variant="outline"
                  className="rounded-xl border-[#0095ff] text-[#0095ff] dark:text-sky-300 bg-white dark:bg-slate-900/80 hover:bg-[#e0f2fe]/40 dark:hover:bg-slate-800"
                >
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-4 w-4" />
                  </a>
                </Button>

                <Button
                  asChild
                  size="icon"
                  variant="outline"
                  className="rounded-xl border-[#0095ff] text-[#0095ff] dark:text-sky-300 bg-white dark:bg-slate-900/80 hover:bg-[#e0f2fe]/40 dark:hover:bg-slate-800"
                >
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── NEW: TESTIMONIALS ── */}


      {/* ── NEW: OUR SERVICES OVERVIEW ── */}



      {/* ── NEW: PRICING PREVIEW ── */}

  

      {/* ── NEW: TRUST BADGES ── */}

    

      {/* ── NEW: MAP & LOCATION ── */}

      <section className="relative py-24 overflow-hidden bg-white dark:bg-transparent">
        <SectionBackdrop wash="bg-white/40 dark:bg-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-4">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] items-center">
            <Reveal>
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#bfdbfe]/60 dark:border-sky-500/30 bg-[#f0f9ff] dark:bg-slate-800 px-5 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#0095ff] dark:text-sky-400 shadow-sm mb-4">
                  <GoogleMapsIcon className="h-4 w-4" />
                  Find us
                </span>

                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-950 dark:text-white mt-5 mb-4">
                  Right in the heart of Nuneaton.
                </h2>

                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-6">
                  Drop by our Harefield Road workshop for a free diagnostic, friendly advice, or to
                  browse our accessories. No appointment needed for walk-ins.
                </p>

                <div className="flex items-start gap-4 mb-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#e0f2fe] dark:bg-slate-800 text-[#0095ff] dark:text-sky-400">
                    <GoogleMapsIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 dark:text-white">Address</div>

                    <div className="text-sm text-slate-600 mt-1">
                      6 Harefield Road, Nuneaton, CV11 4HD
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="rounded-xl bg-gradient-purple-blue text-white hover:bg-gradient-purple-blue-hover"
                  >
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=6+Harefield+Road+Nuneaton+CV11+4HD"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open in Google Maps
                    </a>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="rounded-xl border-2 border-[#0095ff] text-[#0078d4] dark:text-sky-300 bg-white dark:bg-slate-900/80 hover:bg-[#e0f2fe]/40 dark:hover:bg-slate-800"
                  >
                    <a href="https://wa.me/447415278767">Message for Directions</a>
                  </Button>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="relative overflow-hidden rounded-[2rem] border border-[#bfdbfe]/40 dark:border-slate-800 bg-[#f0f9ff] dark:bg-slate-900/80 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.2)]">
                <div className="aspect-[4/3] w-full">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2437.5!2d-1.466!3d52.523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDMxJzIyLjgiTiAxwrAyOCcwMC4wIlc!5e0!3m2!1sen!2suk!4v1"
                    width="100%"
                    height="100%"
                    style={{ minHeight: 400 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Express Phone & Laptop Repair - Nuneaton Location"
                    className="rounded-[2rem]"
                  />
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 rounded-xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm px-5 py-4 shadow-lg ring-1 ring-white/80 dark:ring-slate-800">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-purple-blue text-white">
                    <GoogleMapsIcon className="h-6 w-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-slate-950 dark:text-white">
                      Express Phone & Laptop Repair
                    </div>

                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      6 Harefield Road, Nuneaton, CV11 4HD
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── NEW: FINAL CTA ── */}

      <section className="relative overflow-hidden py-20 md:py-24 bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe]/30 to-white dark:bg-transparent dark:from-transparent dark:to-transparent">
        <SectionBackdrop wash="bg-[#f0f9ff]/50 dark:bg-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Reveal>
            <div className="rounded-[2.5rem] border border-[#0095ff]/15 dark:border-sky-600/30 bg-gradient-to-br from-[#f0f9ff] via-[#dbeafe] to-[#f8fbff] dark:from-slate-900/80 dark:via-slate-900/70 dark:to-slate-950/85 p-10 md:p-14 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.12)]">
              <Sparkles className="h-6 w-6 text-[#06b6d4] mx-auto mb-4" />

              <h2 className="text-4xl md:text-5xl font-semibold text-[#0095ff] dark:text-sky-300 mb-6">
                Ready to get your device fixed?
              </h2>

              <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
                Drop in for a free diagnostic, or book online and we'll have a slot ready for you.
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="rounded-xl bg-gradient-purple-blue text-white hover:bg-gradient-purple-blue-hover font-semibold h-12 uppercase tracking-widest text-xs px-8 shadow-sm"
                >
                  <Link to="/book">
                    <Calendar className="mr-2 h-4 w-4" />
                    Book a Repair
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-xl border-2 border-[#0095ff] text-[#0078d4] dark:text-sky-300 dark:border-sky-500 bg-white dark:bg-slate-900/80 hover:bg-[#e0f2fe]/40 dark:hover:bg-slate-800 h-12 uppercase tracking-widest text-xs px-8 font-semibold"
                >
                  <a href="tel:+447415278767">
                    <Phone className="mr-2 h-4 w-4" />
                    Call 07415 278767
                  </a>
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
