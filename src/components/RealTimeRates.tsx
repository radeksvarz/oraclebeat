export default function RealTimeRates() {
  const rates = [
    { source: 'Oracle A', rate: '1.1234', deviation: '+0.01%' },
    { source: 'Oracle B', rate: '1.1230', deviation: '-0.02%' },
    { source: 'Traditional API 1', rate: '1.1232', deviation: '0.00%' },
    { source: 'Traditional API 2', rate: '1.1235', deviation: '+0.03%' },
    { source: 'Traditional API 3', rate: '1.1231', deviation: '-0.01%' },
  ]

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Real-Time FX Rates</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-400 border-b border-gray-700">
              <th className="pb-3 font-medium">Source</th>
              <th className="pb-3 font-medium">Rate</th>
              <th className="pb-3 font-medium">Deviation from Base</th>
            </tr>
          </thead>
          <tbody>
            {rates.map((rate, index) => (
              <tr
                key={index}
                className="border-b border-gray-700 last:border-0"
              >
                <td className="py-4">{rate.source}</td>
                <td className="py-4 font-mono">{rate.rate}</td>
                <td className={`py-4 ${
                  rate.deviation.startsWith('+') 
                    ? 'text-green-400'
                    : rate.deviation.startsWith('-')
                    ? 'text-red-400'
                    : 'text-gray-400'
                }`}>
                  {rate.deviation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
} 