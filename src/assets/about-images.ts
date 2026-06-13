/**
 * About page images — add files to: public/about/
 *
 * Recommended format: JPG for photos, PNG for logos/badges.
 * Hero background: 1920×1080 or wider (landscape).
 */
export const ABOUT_IMAGES = {
  /** Hero section full-width background (workshop, team, or devices) */
  heroBg: "/about/about-hero-bg.jpg",

  /** Our Story — wide storefront or team at bench */
  storyWorkshop: "/about/about-story-workshop.jpg",

  /** Timeline sidebar — collage, awards, or heritage */
  timeline: "/about/about-timeline.jpg",

  /** Repair journey — technician repairing a device */
  process: "/about/about-process.jpg",

  workshopBench: "/about/about-workshop-bench.jpg",
  workshopSolder: "/about/about-workshop-solder.jpg",
  workshopDiagnostics: "/about/about-workshop-diagnostics.jpg",

  /** Smart repair / tracking UI screenshot */
  techDashboard: "/about/about-tech-dashboard.jpg",

  /** Quality promise — customer handoff or QA */
  qualityHandoff: "/about/about-quality-handoff.jpg",

  community: "/about/about-community.jpg",
  storesMap: "/about/about-stores-map.jpg",

  cert1: "/about/about-cert-1.png",
  cert2: "/about/about-cert-2.png",
  partner1: "/about/about-partner-1.png",
  partner2: "/about/about-partner-2.png",
} as const;

/** Team headshots — square 800×800 recommended */
export const TEAM_PHOTOS: Record<string, string> = {
  "Arjun Singh": "/about/team-arjun-singh.jpg",
  "Meera Joshi": "/about/team-meera-joshi.jpg",
  "Rahul Verma": "/about/team-rahul-verma.jpg",
  "Anika Roy": "/about/team-anika-roy.jpg",
  "Vikram Patel": "/about/team-vikram-patel.jpg",
  "Sana Khan": "/about/team-sana-khan.jpg",
};
