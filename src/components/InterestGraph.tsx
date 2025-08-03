import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { mainFormSchema } from "../schemas/mainForm";
import { calculateChartData } from "../utils/interest";
import z from "zod";

// Custom tooltip formatter for currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Custom tooltip component
const CustomTooltip = ({ active, payload, label, milestones }: any) => {
  if (active && payload && payload.length) {
    // Find milestones for this year
    const yearMilestones = milestones.filter(
      (milestone: any) => Math.abs(milestone.year - label) < 0.5 // Within 0.5 years
    );

    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg font-sans">
        <p className="font-semibold text-gray-800">Year {label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {formatCurrency(entry.value)}
          </p>
        ))}
        {yearMilestones.length > 0 && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <p className="text-xs font-semibold text-gray-600 mb-1">
              Milestones:
            </p>
            {yearMilestones.map((milestone: any, index: number) => (
              <p
                key={index}
                className="text-xs"
                style={{ color: milestone.color }}
              >
                🎉 {milestone.label}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  }
  return null;
};

// Calculate milestone years
const calculateMilestones = (chartData: any[]) => {
  const milestones: {
    year: number;
    label: string;
    color: string;
    labelPosition?: "insideTopRight" | "insideBottomRight";
  }[] = [];

  // Define milestone amounts
  const milestoneAmounts = [
    { amount: 1000, label: "First $1K", color: "#10B981" },
    { amount: 10000, label: "First $10K", color: "#3B82F6" },
    { amount: 100000, label: "First $100K", color: "#8B5CF6" },
    { amount: 500000, label: "First $500K", color: "#EC4899" },
    { amount: 1000000, label: "First $1M", color: "#F59E0B" },
    { amount: 2500000, label: "First $2.5M", color: "#F59E0B" },
    { amount: 5000000, label: "First $5M", color: "#EF4444" },
    { amount: 10000000, label: "First $10M", color: "#7C3AED" },
  ];

  // Find when each milestone is reached
  milestoneAmounts.forEach(({ amount, label, color }) => {
    const milestonePoint = chartData.find(
      (point) => point.totalAmount >= amount
    );
    if (milestonePoint && milestonePoint.relativeYear > 0) {
      milestones.push({
        year: milestonePoint.relativeYear,
        label,
        color,
      });
    }
  });

  // Find when interest in a year exceeds contributions in a year
  // Only show this milestone if there are actual contributions
  const hasContributions = chartData.some(
    (point) => point.contributionsFromPeriod > 0
  );

  if (hasContributions) {
    const interestExceedsContributions = chartData.find(
      (point) =>
        point.interestEarnedFromPeriod > point.contributionsFromPeriod &&
        point.relativeYear > 0
    );

    if (interestExceedsContributions) {
      milestones.push({
        year: interestExceedsContributions.relativeYear,
        label: "Interest > Contributions",
        color: "#06B6D4",
      });
    }
  }

  return milestones;
};

export function InterestGraph({
  data,
}: {
  data: z.infer<typeof mainFormSchema>;
}) {
  const chartData = calculateChartData({ data });
  const milestones = calculateMilestones(chartData);

  return (
    <div className="aspect-square bg-white border-base-300 rounded-lg p-4 col-span-2">
      <h3 className="text-lg font-semibold text-gray-800 mb-4 font-sans">
        Investment Growth Over Time
      </h3>
      <ResponsiveContainer className="min-h-[400px]">
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 60,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="relativeYear" />
          <YAxis tickFormatter={formatCurrency} />
          <Tooltip content={<CustomTooltip milestones={milestones} />} />
          <Legend
            wrapperStyle={{
              fontSize: "12px",
              paddingTop: "10px",
            }}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
          />

          {/* Milestone reference lines */}
          {milestones.map((milestone, index) => (
            <ReferenceLine
              key={index}
              x={milestone.year}
              stroke={milestone.color}
              strokeDasharray="5 5"
              strokeWidth={2}
              label={{
                value: milestone.label,
                position: milestone.labelPosition || "insideTopRight",
                fill: milestone.color,
                fontSize: 11,
                fontWeight: "bold",
                offset: 10,
              }}
            />
          ))}

          <Line
            type="monotone"
            dataKey="totalAmount"
            name="Total Amount"
            stroke="var(--color-primary)"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="inflationAdjustedAmount"
            name="Inflation Adjusted Total"
            stroke="var(--color-warning)"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="cumulativeInterest"
            name="Interest Earned"
            stroke="var(--color-accent)"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="cumulativeContributions"
            name="Total Contributions"
            stroke="var(--color-secondary)"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
