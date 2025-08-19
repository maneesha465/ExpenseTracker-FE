import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Cell, ResponsiveContainer, Legend } from 'recharts';
import { CustomTooltip } from './CustomTooltip';
import { CustomLegend } from './CustomLegend';

export const CustomePieChart = ({ data, label, totalAmount, colors, showTextAnchor }) => {
  const [animatedAmount, setAnimatedAmount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseFloat(totalAmount?.toString().replace(/[^0-9.-]+/g, '')) || 0;

    if (start === end) return;

    const duration = 800;
    const increment = end / (duration / 10);

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        start = end;
        clearInterval(interval);
      }
      setAnimatedAmount(Math.round(start));
    }, 10);

    return () => clearInterval(interval);
  }, [totalAmount]);

  return (
    <div className="relative w-full" style={{ height: 380 }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="amount"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={130}
            innerRadius={100}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
        </PieChart>
      </ResponsiveContainer>

      {/* ✅ Center overlay with animation */}
      {showTextAnchor && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none animate-fade-in">
          <span className="text-sm text-gray-500">{label}</span>
          <span className="text-2xl font-bold text-gray-800 tracking-tight">
            {animatedAmount === 0 && totalAmount <= 0
              ? 'No Income'
              : `$${animatedAmount.toLocaleString()}`}
          </span>
        </div>
      )}
    </div>
  );
};
