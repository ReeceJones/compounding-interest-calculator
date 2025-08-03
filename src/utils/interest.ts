import z from "zod";
import { mainFormSchema } from "../schemas/mainForm";

interface ChartDataPoint {
  relativeYear: number;
  interestEarnedFromPeriod: number;
  cumulativeInterest: number;
  contributionsFromPeriod: number;
  cumulativeContributions: number;
  totalAmount: number;
  inflationAdjustedAmount: number;
}

export function calculateChartData({
  data,
}: {
  data: z.infer<typeof mainFormSchema>;
}) {
  const {
    principal,
    contributionFrequency,
    expectedContributionGrowth,
    contributionAmount,
    interestRate,
    compoundingFrequency,
    expectedInflationRate,
    years,
  } = data;

  const chartData: ChartDataPoint[] = [
    {
      relativeYear: 0,
      interestEarnedFromPeriod: 0,
      cumulativeInterest: 0,
      contributionsFromPeriod: 0,
      cumulativeContributions: 0,
      totalAmount: principal,
      inflationAdjustedAmount: principal,
    },
  ];
  const days = years * 365;

  const dailyInterestRate = getDailyRate(interestRate, compoundingFrequency);
  const dailyInflationRate = getDailyRate(expectedInflationRate, "yearly");
  const contributionsPerDay = getContributionsFromPeriod(
    contributionFrequency,
    contributionAmount
  );
  const dailyContributionGrowth = getDailyRate(
    expectedContributionGrowth,
    "yearly"
  );

  for (let day = 1; day < days; day++) {
    const previousPeriod = chartData[chartData.length - 1];

    const interestEarnedFromPeriod =
      previousPeriod.totalAmount * dailyInterestRate;
    const cumulativeInterest =
      previousPeriod.cumulativeInterest + interestEarnedFromPeriod;
    const contributionsFromPeriod =
      Math.pow(1 + dailyContributionGrowth, day) * contributionsPerDay;
    const cumulativeContributions =
      previousPeriod.cumulativeContributions + contributionsFromPeriod;
    const totalAmount =
      previousPeriod.totalAmount +
      interestEarnedFromPeriod +
      contributionsFromPeriod;
    const inflationAdjustedAmount =
      totalAmount / Math.pow(1 + dailyInflationRate, day);

    chartData.push({
      relativeYear: day / 365,
      interestEarnedFromPeriod,
      cumulativeInterest,
      contributionsFromPeriod,
      cumulativeContributions,
      totalAmount,
      inflationAdjustedAmount,
    });
  }

  // now only return points that are on the year markers
  // return chartData.filter((point) => point.relativeYear % 1 === 0);
  return chartData.reduce((acc, point) => {
    if (point.relativeYear % 1 === 0) {
      acc.push(point);
    } else {
      acc[acc.length - 1].contributionsFromPeriod +=
        point.contributionsFromPeriod;
      acc[acc.length - 1].interestEarnedFromPeriod +=
        point.interestEarnedFromPeriod;
    }
    return acc;
  }, [] as ChartDataPoint[]);
}

function getDailyRate(
  interestRate: number,
  frequency: "daily" | "monthly" | "quarterly" | "yearly"
) {
  const daysInPeriod = getDaysInPeriod(frequency);
  return Math.pow(1 + interestRate / 100, 1 / daysInPeriod) - 1;
}

function getContributionsFromPeriod(
  contributionFrequency: "daily" | "monthly" | "quarterly" | "yearly",
  contributionAmount: number
) {
  const daysInPeriod = getDaysInPeriod(contributionFrequency);
  return contributionAmount / daysInPeriod;
}

function getDaysInPeriod(
  frequency: "daily" | "monthly" | "quarterly" | "yearly"
) {
  switch (frequency) {
    case "daily":
      return 1;
    case "monthly":
      return 30;
    case "quarterly":
      return 91;
    case "yearly":
      return 365;
  }
}
