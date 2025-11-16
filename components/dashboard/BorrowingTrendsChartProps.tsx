"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TrendData {
  month: string;
  borrowed: number;
}

interface BorrowingTrendsChartProps {
  data: TrendData[];
}

const BorrowingTrendsChart = ({ data }: BorrowingTrendsChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" stroke="#6C757D" fontSize={12} />
        <YAxis stroke="#6C757D" fontSize={12} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="borrowed"
          name="Books Borrowed"
          stroke="#2C5F7C" // A color that fits your primary theme
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default BorrowingTrendsChart;