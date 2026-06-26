import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: any;
  gradient: string;
}

export function StatCard({ title, value, icon: Icon, gradient }: StatCardProps) {
  let colorClass = "text-blue-500 bg-blue-500/10";
  if (gradient.includes("emerald") || gradient.includes("green")) colorClass = "text-emerald-500 bg-emerald-500/10";
  else if (gradient.includes("amber") || gradient.includes("orange")) colorClass = "text-amber-500 bg-amber-500/10";
  else if (gradient.includes("rose") || gradient.includes("red")) colorClass = "text-rose-500 bg-rose-500/10";
  else if (gradient.includes("violet") || gradient.includes("purple")) colorClass = "text-violet-500 bg-violet-500/10";
  else if (gradient.includes("slate") || gradient.includes("gray")) colorClass = "text-slate-400 bg-slate-500/10";

  return (
    <motion.div
      className="rounded-xl bg-[#11131E] p-5 transition-all flex items-center gap-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`p-3 rounded-xl ${colorClass}`}>
        <Icon className="h-5 w-5" strokeWidth={2.5} />
      </div>
      <div>
        <p className="text-xs font-medium text-slate-400 mb-0.5">{title}</p>
        <p className="text-2xl font-bold text-white tracking-tight">{value}</p>
      </div>
    </motion.div>
  );
}
