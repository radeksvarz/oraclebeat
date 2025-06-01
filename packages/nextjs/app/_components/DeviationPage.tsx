"use client";

import { useState } from "react";
import DeviationModal from "~~/components/deviation-hunter/DeviationModal";
import HistoricalSummary from "~~/components/oracle-beat/HistoricalSummary";
import PriceChart from "~~/components/oracle-beat/PriceChart";
import PriceComparisonMatrix from "~~/components/oracle-beat/PriceComparisonMatrix";
import { usePythPrice } from "~~/hooks/oracle-beat/usePythPrice";

// EUR/USD price feed ID from Pyth Network
const EURUSD_PRICE_ID = "0xa995d00bb36a63cef7fd2c287dc105fc8f3d93779f062f09551b0af3e81ec30b";

export default function DeviationPage() {
  const [selectedAssetPair, setSelectedAssetPair] = useState("EUR/USD");
  const [selectedDataSources, setSelectedDataSources] = useState<string[]>(["sourceA", "sourceB", "sourceC"]);
  const [baseSource, setBaseSource] = useState("sourceA");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deviationData, setDeviationData] = useState<{
    assetPair: string;
    sources: string;
    deviation: {
      percentage: number;
      absolute: number;
    };
    timestamp: string;
  } | null>(null);

  const { data: pythPrice, isLoading: isPythLoading } = usePythPrice(EURUSD_PRICE_ID);

  const handleDeviationHunterClick = () => {
    setDeviationData({
      assetPair: selectedAssetPair,
      sources: "Pyth Network vs. ExchangeRate API",
      deviation: {
        percentage: 1.5,
        absolute: 25.0,
      },
      timestamp: "2024-07-26 14:30 UTC",
    });
    setIsModalOpen(true);
  };

  // Mock data for demonstration
  const mockPriceData = [
    {
      source: "Pyth Network",
      price: pythPrice?.price || 0,
      isBase: true,
    },
    {
      source: "Pyth Onchain Ethereum L1",
      price: 1.082847,
      deviationAbs: 0.000313,
      deviationPerc: 0.0289,
    },
    {
      source: "ExchangeRate API",
      price: 1.082216,
      deviationAbs: -0.000318,
      deviationPerc: -0.0294,
    },
  ];

  const mockHistoricalData = [
    {
      source: "Pyth Network",
      avgPrice: 1.082012,
      maxPrice: 1.083542,
      minPrice: 1.080534,
      isBase: true,
    },
    {
      source: "Pyth Onchain Ethereum L1",
      avgPrice: 1.082325,
      maxPrice: 1.083847,
      minPrice: 1.080847,
      avgDeviationAbs: 0.000313,
      avgDeviationPerc: 0.0289,
    },
    {
      source: "ExchangeRate API",
      avgPrice: 1.081834,
      maxPrice: 1.083312,
      minPrice: 1.080312,
      avgDeviationAbs: -0.000178,
      avgDeviationPerc: -0.0164,
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
              className="select select-bordered w-full bg-base-100 text-base-content border-2 border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
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
              className="select select-bordered w-full bg-base-100 text-base-content border-2 border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary h-[120px] [&>option]:py-2"
              id="dataSources"
              multiple
              value={selectedDataSources}
              onChange={e => setSelectedDataSources(Array.from(e.target.selectedOptions, option => option.value))}
            >
              <option value="sourceA" className="py-2">
                Pyth Network
              </option>
              <option value="sourceB" className="py-2">
                Pyth Onchain Ethereum L1
              </option>
              <option value="sourceC" className="py-2">
                ExchangeRate API
              </option>
            </select>
            <p className="text-xs text-base-content/60">Select multiple sources to compare</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-base-content/80" htmlFor="baseSource">
              Base Source for Deviation Check
            </label>
            <select
              className="select select-bordered w-full bg-base-100 text-base-content border-2 border-base-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
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

        <PriceComparisonMatrix
          assetPair={selectedAssetPair}
          lastUpdated={isPythLoading ? "Loading..." : "Just now"}
          priceData={mockPriceData}
          onDeviationHunterClick={handleDeviationHunterClick}
        />

        <PriceChart
          assetPair={selectedAssetPair}
          currentPrice={pythPrice?.price || 1.082534}
          change24h={{
            value: 0.001534,
            percentage: 0.142,
          }}
        />

        <HistoricalSummary data={mockHistoricalData} />

        {deviationData && (
          <DeviationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={deviationData} />
        )}
      </div>
    </main>
  );
}
