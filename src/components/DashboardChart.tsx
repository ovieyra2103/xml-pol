import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { formatCurrency } from '@/lib/utils';

interface DashboardChartProps {
  data: {
    name: string;
    value: number;
  }[];
  title: string;
}

export const DashboardChart = ({ data, title }: DashboardChartProps) => {
  return (
    <div className="w-full h-[400px] bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl shadow-sm border border-gray-200">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="name" 
            stroke="#6B7280"
            tick={{ fill: '#6B7280' }}
          />
          <YAxis 
            tickFormatter={(value) => formatCurrency(value)}
            stroke="#6B7280"
            tick={{ fill: '#6B7280' }}
          />
          <Tooltip 
            formatter={(value: number) => formatCurrency(value)}
            contentStyle={{ 
              backgroundColor: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '0.75rem',
              padding: '0.75rem'
            }}
          />
          <Bar 
            dataKey="value" 
            fill="url(#colorGradient)"
            radius={[4, 4, 0, 0]}
          />
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#60A5FA" stopOpacity={0.6}/>
            </linearGradient>
          </defs>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};