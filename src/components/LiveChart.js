import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { ChartTooltip } from "./ui/chart";

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 shadow-2xl min-w-[180px]">
      <p className="text-slate-400 text-sm mb-2">🕐 {label}</p>
      <div className="flex justify-between gap-4">
        <span className="text-slate-300 text-sm">Fiyat</span>
        <span className="text-white font-bold text-sm">
          ${payload[0].value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </span>
      </div>
    </div>
  );
};

export function LiveChart({ data, isUp }) {
  const lineColor = isUp ? "#00C49F" : "#FF4D4F";
  const gradientId = isUp ? "colorUp" : "colorDown";

  return (
    <div
      className="bg-slate-800 rounded-xl px-4 pt-4 pb-2 shadow-xl"
      style={{ height: "calc(100vh - 200px)" }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
        >
          <defs>
            <linearGradient id="colorUp" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00C49F" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00C49F" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorDown" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FF4D4F" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#FF4D4F" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />

          <XAxis
            dataKey="time"
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={{ stroke: "#334155" }}
            tickLine={false}
            interval="preserveStartEnd"
            padding={{ left: 10, right: 10 }}
          />

          <YAxis
            domain={([dataMin, dataMax]) => {
              const range = dataMax - dataMin || 1;
              return [dataMin - range * 0.1, dataMax + range * 0.1];
            }}
            tick={{ fill: "#94a3b8", fontSize: 11 }}
            axisLine={{ stroke: "#334155" }}
            tickLine={false}
            tickFormatter={(v) =>
              `$${v.toLocaleString("en-US", { maximumFractionDigits: 0 })}`
            }
          />

          <ChartTooltip content={<CustomTooltip />} />

          <Area
            type="natural"
            dataKey="price"
            stroke={lineColor}
            fillOpacity={1}
            fill={`url(#${gradientId})`}
            strokeWidth={2}
            isAnimationActive={false}
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}