import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const RevenueChart = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Revenue Trends</h2>

        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Live Data
        </span>
      </div>

      <div className="h-[300px] md:h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -10, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#f3f4f6"
              vertical={false}
            />

            <XAxis
              dataKey="day"
              stroke="#9ca3af"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={10}
              minTickGap={30}
            />

            <YAxis
              stroke="#9ca3af"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `$${value}`}
              tickCount={isMobile ? 5 : 7}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "none",
                borderRadius: "8px",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                padding: "8px 12px",
              }}
              itemStyle={{ color: "#fff", fontWeight: 500, fontSize: "12px" }}
              labelStyle={{
                color: "#9ca3af",
                fontSize: "11px",
                marginBottom: "4px",
              }}
              formatter={(value) => [`$${value}`, "Revenue"]}
              cursor={{
                stroke: "#2563eb",
                strokeWidth: 1,
                strokeDasharray: "4 4",
              }}
            />

            <Area
              type="basis"
              dataKey="totalSale"
              stroke="#2563eb"
              strokeWidth={isMobile ? 2 : 3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              activeDot={{ r: 6, strokeWidth: 0, fill: "#2563eb" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
