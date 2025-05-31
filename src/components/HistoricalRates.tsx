import { useState } from 'react'
import { format } from 'date-fns'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { date: '2024-01-01', rate: 1.1220 },
  { date: '2024-01-08', rate: 1.1280 },
  { date: '2024-01-15', rate: 1.1240 },
  { date: '2024-01-22', rate: 1.1320 },
  { date: '2024-01-29', rate: 1.1260 },
].map(item => ({
  ...item,
  formattedDate: format(new Date(item.date), 'MMM d')
}))

export default function HistoricalRates() {
  const [selectedMonth, setSelectedMonth] = useState('January 2024')
  const lastRate = data[data.length - 1].rate
  const firstRate = data[0].rate
  const change = ((lastRate - firstRate) / firstRate * 100).toFixed(2)
  const isPositive = parseFloat(change) > 0

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Historical FX Rates</h2>
        <div className="flex items-center space-x-4 mt-4 md:mt-0">
          <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600">
            <span className="sr-only">Previous month</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="text-gray-300">{selectedMonth}</span>
          <button className="p-2 rounded-lg bg-gray-700 hover:bg-gray-600">
            <span className="sr-only">Next month</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl font-bold">{lastRate.toFixed(4)}</span>
          <span className={`text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? '+' : ''}{change}%
          </span>
          <span className="text-gray-400 text-sm">Last 30 Days</span>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="formattedDate"
              stroke="#6B7280"
              tick={{ fill: '#6B7280' }}
            />
            <YAxis
              stroke="#6B7280"
              tick={{ fill: '#6B7280' }}
              domain={['auto', 'auto']}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                color: '#F3F4F6',
              }}
            />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
} 