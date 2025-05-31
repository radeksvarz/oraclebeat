import { useState } from 'react'

const dataSources = [
  { id: 'oracle-a', name: 'Oracle A', type: 'oracle' },
  { id: 'oracle-b', name: 'Oracle B', type: 'oracle' },
  { id: 'oracle-c', name: 'Oracle C', type: 'oracle' },
  { id: 'oracle-d', name: 'Oracle D', type: 'oracle' },
  { id: 'traditional-1', name: 'Traditional API 1', type: 'traditional' },
  { id: 'traditional-2', name: 'Traditional API 2', type: 'traditional' },
  { id: 'traditional-3', name: 'Traditional API 3', type: 'traditional' },
  { id: 'traditional-4', name: 'Traditional API 4', type: 'traditional' },
  { id: 'traditional-5', name: 'Traditional API 5', type: 'traditional' },
  { id: 'traditional-6', name: 'Traditional API 6', type: 'traditional' },
]

export default function DataSourceSelector() {
  const [selectedSources, setSelectedSources] = useState<string[]>([])

  const toggleSource = (sourceId: string) => {
    setSelectedSources(prev =>
      prev.includes(sourceId)
        ? prev.filter(id => id !== sourceId)
        : [...prev, sourceId]
    )
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Select Data Sources</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {dataSources.map((source) => (
          <button
            key={source.id}
            onClick={() => toggleSource(source.id)}
            className={`p-3 rounded-lg text-sm font-medium transition-colors ${
              selectedSources.includes(source.id)
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {source.name}
          </button>
        ))}
      </div>
    </div>
  )
} 