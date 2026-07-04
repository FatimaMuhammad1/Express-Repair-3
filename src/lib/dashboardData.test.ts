import { describe, expect, it } from "vitest";
import { buildBusinessOverviewData } from "./dashboardData";

describe("buildBusinessOverviewData", () => {
  it("aggregates revenue entries into monthly chart points", () => {
    const result = buildBusinessOverviewData([
      { amount: 120, date: "2024-01-15" },
      { amount: 80, date: "2024-01-20" },
      { amount: 200, date: "2024-02-05" },
    ]);

    expect(result).toEqual([
      { name: "Jan 24", revenue: 200, profit: 140, expenses: 0 },
      { name: "Feb 24", revenue: 200, profit: 140, expenses: 0 },
    ]);
  });

  it("returns an empty array when no revenue data exists", () => {
    expect(buildBusinessOverviewData([])).toEqual([]);
    expect(buildBusinessOverviewData(null as any)).toEqual([]);
  });
});
