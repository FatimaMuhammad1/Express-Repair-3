const fs = require("fs");
const path = require("path");

const colorMap = {
  // Brand Blues -> Purples
  "#005fee": "#a855f7", // brand
  "#0047c4": "#9333ea", // brand hover
  "#0095ff": "#c084fc", // primary
  "#00c3ff": "#e879f9", // primary light
  "#003ea8": "#7e22ce", // brand deep
  "#003a8f": "#6b21a8",
  "#002c67": "#581c87",
  "#0066d9": "#9333ea",
  "#008cff": "#c084fc",
  "#0044d6": "#7e22ce",

  // Light Blues -> Light Purples
  "#eef2ff": "#faf5ff",
  "#eff6ff": "#faf5ff",
  "#c7d2fe": "#e9d5ff",
  "#1e40af": "#6b21a8",
  "#1e3a8a": "#581c87",
  "#3b82f6": "#a855f7",
  "#6366f1": "#c084fc",
  "#a5b4fc": "#e9d5ff",

  // Yellows -> Cyan/Dark
  "#fef3c7": "#0f172a", // amber-100 to slate-900
  "#fffbeb": "#1e293b", // amber-50 to slate-800
  "#fde68a": "#334155", // amber-200 to slate-700
  "#b45309": "#22d3ee", // amber-700 to cyan-400
  "#d97706": "#06b6d4", // amber-600 to cyan-500
  "#fcd34d": "#334155", // amber-300 to slate-700
  "#fbbf24": "#06b6d4", // amber-400 to cyan-500
  "#fff4ca": "#1e293b",
  "#ffe69b": "#334155",
  "#fef9c3": "#1e293b",
  "#fde9a8": "#06b6d4",
  "#fff7dd": "#ffffff", // header background, make it white
  "#fff7d2": "#0f172a", // testimonial cards
  "#fff9e5": "#0f172a",
  "#fdf3d8": "#0f172a",
  "#fdfbf4": "#f8fafc",
  "#fffaf0": "#f8fafc",
  "#fffef8": "#f8fafc",
  "#f5f0eb": "#f1f5f9",
};

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(filePath));
    } else if (filePath.endsWith(".tsx") || filePath.endsWith(".ts") || filePath.endsWith(".css")) {
      results.push(filePath);
    }
  });
  return results;
}

const files = walkDir(path.join(__dirname, "src"));

files.forEach((file) => {
  let content = fs.readFileSync(file, "utf8");
  let original = content;

  // Replace colors
  for (const [oldColor, newColor] of Object.entries(colorMap)) {
    const regex = new RegExp(oldColor, "gi");
    content = content.replace(regex, newColor);
  }

  if (content !== original) {
    fs.writeFileSync(file, content, "utf8");
    console.log(`Updated ${file}`);
  }
});
