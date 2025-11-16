"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface CategoryData {
  name: string;
  value: number;
  color: string;
}

interface CategoryDistributionChartProps {
  data: CategoryData[];
}

const CategoryDistributionChart = ({
  data,
}: CategoryDistributionChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={110}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryDistributionChart;