"use client";

import { useState } from "react";
import HistoricalSummary from "~~/components/oracle-beat/HistoricalSummary";
import PriceChart from "~~/components/oracle-beat/PriceChart";
import PriceComparisonMatrix from "~~/components/oracle-beat/PriceComparisonMatrix";

export default function DeviationPage() {
  const [selectedAssetPair, setSelectedAssetPair] = useState("EUR/USD");
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>(["sourceA", "sourceB", "sourceC"]);
  const [baseSource, setBaseSource] = useState("sourceA");

  // Mock data for demonstration
  const mockPriceData = [
    {
      source: "Pyth Network",
      price: 1850.75,
      isBase: true,
    },
    {
      source: "Pyth Onchain Ethereum L1",
      price: 1853.2,
      deviationAbs: 2.45,
      deviationPerc: 0.13,
    },
    {
      source: "ExchangeRate API",
      price: 1848.9,
      deviationAbs: -1.85,
      deviationPerc: -0.1,
    },
  ];

  const mockHistoricalData = [
    {
      source: "Pyth Network",
      avgPrice: 1845.0,
      maxPrice: 1855.0,
      minPrice: 1835.0,
      isBase: true,
    },
    {
      source: "Pyth Onchain Ethereum L1",
      avgPrice: 1852.5,
      maxPrice: 1860.0,
      minPrice: 1840.0,
      avgDeviationAbs: 7.5,
      avgDeviationPerc: 0.41,
    },
    {
      source: "ExchangeRate API",
      avgPrice: 1848.2,
      maxPrice: 1858.0,
      minPrice: 1838.5,
      avgDeviationAbs: 3.2,
      avgDeviationPerc: 0.17,
    },
  ];

  return (
    <main className="flex flex-1 justify-center py-8 px-4 sm:px-6 lg:px-8 bg-base-200">
      <div className="layout-content-container flex flex-col w-full max-w-7xl">
        <div className="mb-8 p-4 bg-base-100 rounded-lg shadow-sm">
          <h2 className="text-3xl font-bold text-base-content">Deviation Analysis</h2>
          <p className="text-base-content/70 mt-1">
            Compare real-time prices from multiple sources and analyze deviations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mb-8">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-base-content/80" htmlFor="assetPair">
              Asset Pair
            </label>
            <select
              className="select select-bordered w-full bg-base-100 text-base-content"
              id="assetPair"
              value={selectedAssetPair}
              onChange={e => setSelectedAssetPair(e.target.value)}
            >
              <option value="EUR/USD">EUR/USD</option>
              <option value="AAPL/USD">AAPL/USD</option>
              <option value="ETH/USD">ETH/USD</option>
              <option value="BTC/USD">BTC/USD</option>
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-base-content/80" htmlFor="dataSources">
              Data Sources
            </label>
            <select
              className="select select-bordered w-full bg-base-100 text-base-content"
              id="dataSources"
              multiple
              value={selectedDataSources}
              onChange={e => setSelectedDataSources(Array.from(e.target.selectedOptions, option => option.value))}
            >
              <option value="sourceA">Pyth Network</option>
              <option value="sourceB">Pyth Onchain Ethereum L1</option>
              <option value="sourceC">ExchangeRate API</option>
            </select>
            <p className="text-xs text-base-content/60">Select multiple sources to compare.</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-base-content/80" htmlFor="baseSource">
              Base Source for Deviation
            </label>
            <select
              className="select select-bordered w-full bg-base-100 text-base-content"
              id="baseSource"
              value={baseSource}
              onChange={e => setBaseSource(e.target.value)}
            >
              <option value="">None (Pairwise Deviations)</option>
              <option value="sourceA">Pyth Network</option>
              <option value="sourceB">Pyth Onchain Ethereum L1</option>
              <option value="sourceC">ExchangeRate API</option>
            </select>
          </div>
        </div>

        <PriceComparisonMatrix assetPair={selectedAssetPair} lastUpdated="Just now" priceData={mockPriceData} />

        <PriceChart
          assetPair={selectedAssetPair}
          currentPrice={1850.75}
          change24h={{
            value: 45.12,
            percentage: 2.5,
          }}
        />

        <HistoricalSummary data={mockHistoricalData} />
      </div>
    </main>
  );
}
