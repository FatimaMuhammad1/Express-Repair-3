import { createFileRoute, Link } from "@tanstack/react-router";

import {
  Smartphone, Laptop, Tablet, Battery, Droplets, MonitorSmartphone, Bug,
  ArrowRight, CheckCircle2, Award, Truck, ShieldCheck, Zap, Search, Wrench,
} from "lucide-react";
import { Layout, PageHero } from "@/components/Layout";
import { Reveal } from "@/components/Reveal";
import { SectionBackdrop } from "@/components/SectionBackdrop";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/services-hero-section.png";
import svcMobileRepair from "@/assets/svc-mobile-repair.jpg";
import svcLaptopRepair from "@/assets/svc-laptop-repair.jpg";
import svcTabletRepair from "@/assets/svc-tablet-repair.jpg";
import svcScreenReplacement from "@/assets/svc-screen-replacement.jpg";
import svcBatteryReplacement from "@/assets/svc-battery-replacement.jpg";
import svcWaterDamage from "@/assets/svc-water-damage.jpg";
import svcSoftwareIssues from "@/assets/svc-software-issues.jpg";
import svcPhoneUnlocking from "@/assets/svc-phone-unlocking.jpg";
import svcChargingPort from "@/assets/svc-charging-port.jpg";
import svcChargingPortRepair from "@/assets/service-images/charging-port-repair.png";
import svcDeviceDiagnostics from "@/assets/service-images/Device-Diagnostics.png";
import svcComponentUpgrade from "@/assets/service-images/Component-Upgrade.png";
import svcFastChargingFix from "@/assets/service-images/Fast-Charging-Fix.png";
import svcWarrantyCheck from "@/assets/service-images/Warranty-Check.png";
import svcSecurityTuneUp from "@/assets/service-images/Security-Tune-Up.png";
import svcDisplayUpgrade from "@/assets/service-images/Display-Upgrade.png";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Repair Services - Express Phone & Laptop Repair Nuneaton" },
      { name: "description", content: "Professional phone, laptop, and tablet repair services in Nuneaton. Same-day repairs, free diagnostics, quality parts, 90-day warranty." },
    ],
  }),
  component: ServicesPage,
});

const serviceCategories = [
  { icon: Smartphone, img: svcMobileRepair, title: "Mobile Phone Repair", items: ["Screen replacement", "Charging port repair", "Speaker & microphone", "Camera repair", "Software issues"] },
  { icon: Laptop, img: svcLaptopRepair, title: "Laptop Repair", items: ["Keyboard replacement", "Battery replacement", "Overheating & fan", "SSD / RAM upgrades", "Screen repair"] },
  { icon: Tablet, img: svcTabletRepair, title: "Tablet Repair", items: ["Display repair", "Charging repair", "Software troubleshooting", "Battery replacement"] },
  { icon: MonitorSmartphone, img: svcScreenReplacement, title: "Screen Replacement", items: ["All major brands", "Same-day service", "Original-quality displays", "90-day warranty"], wip: false },
  { icon: Battery, img: svcBatteryReplacement, title: "Battery Replacement", items: ["Fast-draining batteries", "Swollen batteries", "Quality cells", "30-minute swap"], wip: false },
  { icon: Droplets, img: svcWaterDamage, title: "Water Damage", items: ["Free diagnostics", "Ultrasonic cleaning", "Component-level repair", "Emergency support"], wip: false },
  { icon: Bug, img: svcSoftwareIssues, title: "Software Issues", items: ["Device lag", "Virus removal", "OS installation", "Data backup & recovery"], wip: false },
  { icon: ShieldCheck, img: svcPhoneUnlocking, title: "Phone Unlocking", items: ["Network unlocking", "iCloud assistance", "Most makes & models", "Fast turnaround"], wip: false },
  { icon: Smartphone, img: svcChargingPortRepair, title: "Charging Port Repair", items: ["iPhone & Android", "Loose connections", "Genuine parts", "Same-day fix"], wip: false },
  { icon: Search, img: svcDeviceDiagnostics, title: "Device Diagnostics", items: ["Hardware testing", "Software analysis", "Performance check", "Free consultation"], wip: false },
  { icon: Wrench, img: svcComponentUpgrade, title: "Component Upgrade", items: ["RAM upgrades", "SSD installation", "GPU replacement", "Thermal pasting"], wip: false },
  { icon: Zap, img: svcFastChargingFix, title: "Fast Charging Fix", items: ["Charger diagnostics", "Cable replacement", "Power adapter repair", "Quick fix available"], wip: false },
  { icon: Award, img: svcWarrantyCheck, title: "Warranty Check", items: ["Service verification", "Repair history", "Part coverage", "Certification review"], wip: false },
  { icon: Smartphone, img: svcChargingPort, title: "Camera Repair", items: ["Front camera fix", "Rear lens replacement", "Focus & blur issues", "Same-day service"], wip: false },
  { icon: ShieldCheck, img: svcSecurityTuneUp, title: "Security Tune-Up", items: ["Malware removal", "System hardening", "Backup setup", "Performance boost"], wip: false },
  { icon: MonitorSmartphone, img: svcDisplayUpgrade, title: "Display Upgrade", items: ["Higher-res screens", "Anti-glare coating", "Touch sensitivity", "Premium glass"], wip: false },
];

const pricing = [
  { label: "Screen Repair", price: "from £39" },
  { label: "Battery Replacement", price: "from £29" },
  { label: "Charging Port", price: "from £25" },
  { label: "Water Damage", price: "from £49" },
  { label: "Software Fix", price: "from £19" },
  { label: "Laptop Service", price: "from £39" },
];

function ServicesPage() {
  return (
    <Layout>
      <PageHero
        image={heroImage}
        imageAlt="Phone, laptop and tablet repair services at Express workshop"
        overlayClassName="bg-[linear-gradient(110deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.14)_45%,rgba(0,0,0,0.04)_80%,transparent_100%)]"
        className="min-h-[52vh]"
        title={<span className="sr-only">Repair Services</span>}

      />

      <div className="relative overflow-hidden bg-white dark:bg-slate-950 section-frost dark:section-frost">
        <SectionBackdrop />
        <div className="relative z-10">
          <section className="py-24 bg-transparent">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between mb-14">
                <div className="max-w-3xl">
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0095ff] mb-3">Our Services</p>
                  <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-950 dark:text-white">Repair solutions for phones, tablets and laptops.</h2>
                  <p className="text-[#0f3b6f] dark:text-slate-300 mt-4 max-w-2xl">Trusted repairs with honest advice, transparent pricing and expert support from our Nuneaton workshop.</p>
                </div>
                <Button asChild size="lg" className="self-start rounded-lg bg-[#0095ff] hover:bg-[#0080dd] text-white px-8 h-12 uppercase tracking-widest text-xs font-semibold shadow-md">
                  <Link to="/book">Book a Repair</Link>
                </Button>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {serviceCategories.map((c, i) => (
                  <Reveal key={c.title} delay={(i % 4) * 0.08}>
                    <Card className="group relative flex flex-col rounded-[1.5rem] border border-slate-300 bg-white dark:bg-slate-950/95 dark:border-slate-800 overflow-hidden h-full shadow-sm hover:shadow-lg hover:border-slate-400 transition-all duration-300">
                      {/* Image Section */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 flex-shrink-0">
                        {c.wip ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-[#e8f4ff] text-[#0095ff] text-3xl font-bold tracking-[0.24em] uppercase">
                            WIP
                          </div>
                        ) : (
                          <>
                            <img src={c.img} alt={c.title} loading="lazy" className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent" />
                          </>
                        )}
                        {/* Colored circular badge icon */}
                        <div className={`absolute top-3 left-3 flex h-12 w-12 items-center justify-center rounded-full shadow-md text-white`}
                          style={{
                            backgroundColor: [
                              "#0066cc", // blue
                              "#22c55e", // green
                              "#f97316", // orange
                              "#ec4899", // pink
                              "#a855f7", // purple
                              "#06b6d4", // cyan
                              "#eab308", // yellow
                              "#14b8a6", // teal
                            ][i % 8],
                          }}
                        >
                          <c.icon className="w-6 h-6" />
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="p-5 flex flex-col flex-grow">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 leading-tight">{c.title}</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed flex-grow">
                          {c.items.slice(0, 2).join(", ")}
                        </p>
                      </div>
                    </Card>
                  </Reveal>
                ))}
              </div>

              <Reveal>
                <div className="relative overflow-hidden rounded-[2.5rem] border border-slate-200 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900/85 dark:to-slate-950/95 dark:border-slate-800 shadow-xl px-8 py-16 mt-20">
                  <div className="relative max-w-4xl mx-auto">
                    <div className="text-center mb-14">
                      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0095ff] mb-4">Transparent Pricing</p>
                      <h3 className="text-4xl md:text-5xl font-bold text-[#0f3b6f] dark:text-white mb-4">Fair Prices. No Hidden Fees.</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">Free diagnostics. Final price confirmed before any repair.</p>
                    </div>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {pricing.map((p, i) => (
                        <Reveal key={p.label} delay={(i % 3) * 0.06}>
                          <Card className="group p-6 flex items-center justify-between rounded-[1.5rem] border border-[#b3d9ff] bg-white dark:bg-slate-900/80 dark:border-slate-700 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-[#0095ff]/30">
                            <span className="font-semibold text-slate-900 dark:text-white">{p.label}</span>
                            <span className="text-[#0095ff] font-bold text-lg">{p.price}</span>
                          </Card>
                        </Reveal>
                      ))}
                    </div>
                    <div className="relative mt-12 text-center">
                      <Button asChild size="lg" className="rounded-lg bg-[#0095ff] hover:bg-[#0080dd] text-white px-8 h-12 uppercase tracking-widest text-xs font-semibold shadow-lg">
                        <Link to="/book">Book Repair Now <ArrowRight className="w-4 h-4 ml-2" /></Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </section>
        </div>
      </div>

      <section className="relative py-28 bg-gradient-to-b from-[#f0f7ff] to-white dark:from-slate-950 dark:to-slate-950 dark:bg-slate-950">
        <div className="relative max-w-6xl mx-auto px-4">
          <Reveal>
            <div className="text-center mb-16">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0095ff] mb-3"></p>
              <h2 className="text-5xl md:text-6xl font-serif font-bold text-[#0f3b6f] dark:text-white mb-6">Quality You Can Trust</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">Fast, honest repairs backed by quality parts and expert technicians. We make the process simple, clear and worry-free.</p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, t: "Expert Technicians", d: "Skilled professionals certified in device repair." },
              { icon: Zap, t: "Same Day Repairs", d: "Most repairs completed quickly without delays." },
              { icon: Award, t: "Quality Parts", d: "Genuine components for lasting performance." },
              { icon: Truck, t: "Fast Service", d: "Quick turnaround without cutting corners." },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 0.08}>
                <div className="flex flex-col items-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e8f4ff] dark:bg-slate-800 text-[#0095ff] dark:text-sky-300 mb-6 shadow-sm border border-[#b3d9ff]/50 dark:border-slate-700">
                    <f.icon className="h-10 w-10 stroke-[1.5]" />
                  </div>
                  <h3 className="font-bold text-[#0f3b6f] dark:text-white text-lg mb-2">{f.t}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24 bg-[#f0f7ff] dark:bg-slate-950">
        <SectionBackdrop wash="bg-[#f0f7ff]/70 dark:bg-slate-900/50" />
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#b3d9ff]/40 dark:bg-[#5b8be1]/15 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-white/80 dark:bg-slate-800/30 blur-3xl" aria-hidden />
        <div className="relative z-10 mx-auto max-w-4xl px-4">
          <Reveal>
            <Card className="relative overflow-hidden rounded-[2.5rem] border border-[#b3d9ff]/70 dark:border-slate-700 bg-white dark:bg-slate-900/80 p-10 text-center shadow-[0_30px_90px_-40px_rgba(0,149,255,0.18)] md:p-14">
              <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#0095ff] to-transparent" aria-hidden />
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#0095ff]"></p>
              <h2 className="mb-4 text-4xl font-bold text-[#0f3b6f] dark:text-white md:text-5xl">Ready to get your device fixed?</h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-slate-600 dark:text-slate-400">Drop in for a free diagnostic or book a repair online. We&apos;ll handle the rest.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild size="lg" className="h-12 rounded-lg bg-[#0095ff] px-8 text-xs font-semibold uppercase tracking-widest text-white shadow-md hover:bg-[#0080dd]">
                  <Link to="/book">Book a Repair</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 rounded-lg border-2 border-[#0095ff] bg-white dark:bg-slate-900/90 dark:text-white px-8 text-xs font-semibold uppercase tracking-widest text-[#0095ff] hover:bg-[#f0f7ff] dark:hover:bg-slate-800">
                  <Link to="/contact">Visit the Shop</Link>
                </Button>
              </div>
            </Card>
          </Reveal>
        </div>
      </section>
    </Layout>
  );
}

export default ServicesPage;
