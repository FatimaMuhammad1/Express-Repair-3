export interface RevenueEntry {
  amount: number | string;
  date?: string;
  created_at?: string;
}

export function buildBusinessOverviewData(revenueEntries: RevenueEntry[] | null | undefined) {
  if (!Array.isArray(revenueEntries) || revenueEntries.length === 0) {
    return [];
  }

  const monthlyData: Record<string, { revenue: number; profit: number; expenses: number }> = {};

  revenueEntries.forEach((entry) => {
    const dateValue = entry.date || entry.created_at;
    if (!dateValue) return;

    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) return;

    const monthKey = date.toLocaleString("default", { month: "short", year: "2-digit" });

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { revenue: 0, profit: 0, expenses: 0 };
    }

    const amount = Number(entry.amount || 0);
    monthlyData[monthKey].revenue += amount;
    monthlyData[monthKey].profit += amount * 0.7;
  });

  return Object.entries(monthlyData)
    .map(([name, data]) => ({ name, ...data }))
    .slice(-6);
}
