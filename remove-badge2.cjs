const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "src", "routes", "index.tsx");
let content = fs.readFileSync(file, "utf8");
let original = content;

// Build the lines individually with 20-space indentation, then join with \n
const indent = " ".repeat(20);
const blockLines = [
  `${indent}<div className="absolute left-6 top-6 z-10 w-40 rounded-[1.75rem] border border-white/80 bg-white/95 px-4 py-4 shadow-[0_28px_60px_-40px_rgba(15,23,42,0.35)] backdrop-blur-xl ring-1 ring-white/90">`,
  `${indent}  <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-[#f3e8ff] text-[#7e22ce] mb-3 shadow-sm">`,
  `${indent}    <Clock className="h-5 w-5" />`,
  `${indent}  </div>`,
  `${indent}  <div className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#6b21a8] mb-2">Express repair</div>`,
  `${indent}  <div className="text-sm font-bold text-slate-900 leading-tight mb-2">Same-day <span className="block text-[#a855f7]">Service</span></div>`,
  `${indent}  <div className="text-[12px] text-[#5e718d] leading-5 mb-4">Most repairs in 30–60 minutes.</div>`,
  `${indent}  <div className="rounded-full bg-[#f3e8ff] px-2 py-1.5 text-[10px] font-semibold text-[#6b21a8] shadow-sm">`,
  `${indent}    Free diagnostic`,
  `${indent}  </div>`,
  `${indent}</div>`,
  ``, // blank line
];
const oldBlock = blockLines.join("\n");

console.log("Looking for block...");
console.log("Block found in file:", content.includes(oldBlock));

if (content.includes(oldBlock)) {
  content = content.replace(oldBlock, "");
  console.log("Removed floating Express Repair badge.");
} else {
  console.log("Badge block not found. Will try a different approach.");
}

if (content !== original) {
  fs.writeFileSync(file, content, "utf8");
  console.log("File saved.");
} else {
  console.log("No changes applied.");
}
