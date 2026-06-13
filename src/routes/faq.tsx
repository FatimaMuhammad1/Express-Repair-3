import { createFileRoute, Link } from "@tanstack/react-router";

import { motion } from "framer-motion";

import {
  ArrowRight,
  Battery,
  CheckCircle2,
  Clock,
  Database,
  HelpCircle,
  MessageCircle,
  Phone,
  PoundSterling,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
} from "lucide-react";

import { Layout, PageHero } from "@/components/Layout";

import { SectionBackdrop } from "@/components/SectionBackdrop";
import { GoogleMapsIcon } from "@/components/GoogleMapsIcon";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";

import { Card } from "@/components/ui/card";

import { themedCard, CARD_GRID } from "@/lib/theme-card";

import { Reveal, Stagger, StaggerItem } from "@/components/about/Reveal";

import heroImage from "@/assets/faq-hero.png";

import workshopImage from "@/assets/workshop.jpg";

import logoAsset from "@/assets/express-logo.png.asset.json";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ - Express Phone & Laptop Repair Nuneaton" },

      {
        name: "description",

        content:
          "Answers to common questions about phone and laptop repairs, warranty, pricing and data safety in Nuneaton.",
      },
    ],
  }),

  component: FaqPage,
});

const sections = [
  {
    title: "General",

    icon: HelpCircle,

    summary: "Opening hours, location and walk-ins.",

    items: [
      {
        q: "What are your business hours?",
        a: "Monday to Saturday, 10:00 AM to 6:00 PM. Closed Sundays.",
      },

      { q: "Where are you located?", a: "6 Harefield Road, Nuneaton, CV11 4HD." },

      {
        q: "Do you accept walk-ins?",
        a: "Yes. Walk-ins are welcome. Calling ahead on 07415 278767 helps us prepare for your visit.",
      },
    ],
  },

  {
    title: "Repairs",

    icon: Wrench,

    summary: "Devices, timings and common repair questions.",

    items: [
      {
        q: "How long do repairs take?",
        a: "Most common repairs such as screens, batteries and charging ports are completed the same day, often within 30-60 minutes.",
      },

      {
        q: "What devices do you repair?",
        a: "Smartphones, tablets, laptops, smartwatches and most other electronic devices.",
      },

      {
        q: "Will my repair void the manufacturer warranty?",
        a: "Third-party repairs may affect your manufacturer warranty, but every repair we do is backed by our own 90-day warranty.",
      },
    ],
  },

  {
    title: "Warranty",

    icon: ShieldCheck,

    summary: "What is covered after a repair.",

    items: [
      {
        q: "How long is the repair warranty?",
        a: "90 days on parts and labour for every repair we carry out.",
      },

      {
        q: "What does the warranty cover?",
        a: "Failure of the replaced part under normal use. Accidental damage and liquid damage are not covered.",
      },

      {
        q: "How do I claim warranty?",
        a: "Bring your device and the repair receipt back to our Nuneaton store and we'll take care of it.",
      },
    ],
  },

  {
    title: "Pricing",

    icon: PoundSterling,

    summary: "Diagnostics, quotes and payment methods.",

    items: [
      {
        q: "Are diagnostics free?",
        a: "Yes. Diagnostics are 100% free, with no obligation to repair.",
      },

      {
        q: "Are there hidden fees?",
        a: "Never. You always get a clear price before we start any work.",
      },

      { q: "What payment methods do you accept?", a: "Cash and all major credit/debit cards." },
    ],
  },

  {
    title: "Data Safety",

    icon: Database,

    summary: "Privacy, backups and recovery options.",

    items: [
      {
        q: "Is my data safe during repair?",
        a: "Yes. We follow strict privacy protocols and do not access your personal data.",
      },

      {
        q: "Should I back up my device?",
        a: "We recommend a backup before any repair, although most repairs preserve all data.",
      },

      {
        q: "Can you recover lost data?",
        a: "Yes. We offer professional data recovery for many damaged devices.",
      },
    ],
  },
];

function FaqPage() {
  return (
    <Layout>
      <div className="relative min-h-screen bg-[#F5F1ED] dark:bg-slate-950 section-frost dark:section-frost">
        <div className="pointer-events-none absolute inset-0 z-0" style={{ backgroundColor: "#F5F1ED" }}></div>
        <div className="relative z-10">
          <PageHero
            className="min-h-[48vh] md:min-h-[56vh]"
            image={heroImage}
            overlayClassName="bg-[linear-gradient(110deg,rgba(8,15,31,0.84)_0%,rgba(13,35,76,0.58)_38%,rgba(8,15,31,0.18)_72%,rgba(8,15,31,0.08)_100%)]"
            hideBottomFade
            title={<span className="sr-only">FAQ</span>}
          />

      
      <section className="relative py-20 md:py-24 overflow-hidden bg-white">
        <SectionBackdrop wash="bg-white/30" />

        <div className="relative z-10">
          <div className="mx-auto grid max-w-7xl items-start gap-8 px-4 lg:grid-cols-[0.76fr_1.24fr]">
            <Reveal className="lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-[2rem] border border-[#0095ff]/15 bg-gradient-to-br from-[#f0f9ff] via-[#dbeafe] to-[#f8fbff] shadow-[0_30px_90px_-30px_rgba(15,23,42,0.12)]">
                <div className="relative min-h-64">
                  <img
                    src={workshopImage}
                    alt="Express repair workshop"
                    className="h-full w-full min-h-64 object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="p-7">
                  <MessageCircle className="mb-4 h-8 w-8 text-[#0095ff]" />

                  <h2 className="text-3xl font-semibold text-[#0095ff]">Need a human answer?</h2>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    Send a photo on <span className="text-[#059669]">WhatsApp</span> or call the shop. We can usually point you in the right
                    direction quickly.
                  </p>

                  <div className="mt-6 grid gap-3">
                    <Button
                      asChild
                      className="rounded-xl bg-[#25D366] text-white hover:bg-[#20bd5a]"
                    >
                      <a href="https://wa.me/447415278767">Ask on WhatsApp</a>
                    </Button>

                    <Button
                      asChild
                      variant="outline"
                      className="rounded-xl border-2 border-[#0095ff] text-[#0078d4] bg-white hover:bg-[#e0f2fe]/40"
                    >
                      <a href="tel:+447415278767">Call 07415 278767</a>
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="space-y-8">
              {sections.map((section) => (
                <Reveal key={section.title}>
                  <Card
                    id={section.title.toLowerCase().replace(/\s+/g, "-")}
                    className="scroll-mt-28 overflow-hidden rounded-[1.75rem] border border-[#0095ff]/15 bg-gradient-to-br from-[#f0f9ff] via-[#dbeafe] to-[#f8fbff] shadow-[0_30px_80px_-40px_rgba(15,23,42,0.2)]"
                  >
                    <div className="border-b border-[#0095ff]/40 bg-[#e0f2fe]/50 p-6 md:p-7">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#0095ff]/60 bg-[#e0f2fe] text-[#0095ff]">
                          <section.icon className="h-5 w-5" />
                        </div>

                        <div>
                          <h2 className="text-2xl font-semibold text-slate-950">{section.title}</h2>

                          <p className="mt-1 text-sm text-slate-600">{section.summary}</p>
                        </div>
                      </div>
                    </div>

                    <Accordion type="single" collapsible className="divide-y divide-slate-200">
                      {section.items.map((item) => (
                        <AccordionItem
                          key={item.q}
                          value={item.q}
                          className="border-0 px-6 md:px-7"
                        >
                          <AccordionTrigger className="py-5 text-left text-base font-semibold text-slate-950 hover:text-[#0095ff] hover:no-underline">
                            {item.q}
                          </AccordionTrigger>

                          <AccordionContent className="pb-6 text-sm leading-7 text-slate-600">
                            {item.a}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </Card>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-20 md:py-24 bg-gradient-to-br from-[#f0f9ff] via-[#e0f2fe]/30 to-white">
        <SectionBackdrop wash="bg-[#f0f9ff]/50" />

        <div className="relative z-10 mx-auto max-w-7xl px-4">
          <motion.div
            className="relative overflow-hidden rounded-[2.5rem] border border-[#0095ff]/15 bg-gradient-to-br from-[#f0f9ff] via-[#dbeafe] to-[#f8fbff] p-8 md:p-12 shadow-[0_30px_90px_-30px_rgba(15,23,42,0.12)]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid gap-8 md:grid-cols-[0.92fr_1.08fr] md:items-center">
              <div>
                <GoogleMapsIcon className="mb-5 h-10 w-10 text-[#0095ff]" />

                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.32em] text-[#0095ff]">
                  Still unsure?
                </p>

                <h2 className="text-3xl font-semibold leading-tight text-[#0095ff] md:text-5xl">
                  Pop in or message us first.
                </h2>
              </div>

              <div>
                <p className="max-w-2xl text-sm leading-7 text-slate-600">
                  Bring your device to 6 Harefield Road, Nuneaton, CV11 4HD for a free initial
                  diagnosis, or send us the details before you visit.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="rounded-xl bg-gradient-purple-blue text-white hover:bg-gradient-purple-blue-hover"
                  >
                    <Link to="/contact">
                      Contact Us <MessageCircle className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="rounded-xl border-2 border-[#0095ff] text-[#0078d4] bg-white hover:bg-[#e0f2fe]/40"
                  >
                    <a href="tel:+447415278767">
                      <Phone className="mr-2 h-4 w-4" /> 07415 278767
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
    </div>
    </Layout>
  );
}
