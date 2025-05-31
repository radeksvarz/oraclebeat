import { FC } from "react";

interface PriceChartProps {
  assetPair: string;
  currentPrice: number;
  change24h: {
    value: number;
    percentage: number;
  };
}

const PriceChart: FC<PriceChartProps> = ({ assetPair, currentPrice, change24h }) => {
  const timeRanges = ["1H", "6H", "1D", "7D", "1M"];

  return (
    <div className="bg-base-100 shadow-lg rounded-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <div>
          <h3 className="text-gray-800 text-xl font-semibold leading-normal">{assetPair} Historical Price</h3>
          <p className="text-gray-500 text-sm">Interactive chart displaying price trends over time.</p>
        </div>
        <div className="mt-3 md:mt-0">
          <p className="text-gray-800 text-4xl font-bold tracking-tight">${currentPrice.toFixed(2)}</p>
          <div className="flex items-center gap-1 text-sm">
            <p className="text-gray-500">24h Change:</p>
            <p
              className={`font-medium flex items-center ${change24h.percentage > 0 ? "text-green-600" : "text-red-600"}`}
            >
              <span className="material-icons text-base mr-0.5">
                {change24h.percentage > 0 ? "arrow_upward" : "arrow_downward"}
              </span>
              {change24h.percentage > 0 ? "+" : ""}
              {change24h.percentage.toFixed(1)}% ({change24h.value > 0 ? "+" : ""}${change24h.value.toFixed(2)})
            </p>
          </div>
        </div>
      </div>
      <div className="relative h-96 bg-gray-50 rounded-md p-4 border border-secondary">
        <div className="flex items-center justify-center h-full text-gray-400">
          <span className="material-icons text-5xl mr-2">insights</span>
          <p>Interactive Historical Price Graph Area</p>
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-auto">
          <div className="flex items-center gap-2 bg-blue-600/10 border border-blue-600/30 p-3 rounded-lg shadow-md animate-pulse">
            <span className="material-icons text-blue-600 text-xl">lightbulb</span>
            <p className="text-blue-600 text-sm font-medium">
              Found a deviation? Select point/range & contribute insight to earn Merits!
            </p>
            <button className="ml-2 text-blue-600 hover:text-blue-500">
              <span className="material-icons text-xl">close</span>
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4 space-x-2">
        {timeRanges.map(range => (
          <button
            key={range}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              range === "1D"
                ? "text-white bg-blue-600 border border-blue-600"
                : "text-blue-600 border border-blue-600 hover:bg-blue-600/10"
            }`}
          >
            {range}
          </button>
        ))}
        <button className="px-3 py-1.5 text-xs font-medium text-blue-600 border border-blue-600 rounded-md hover:bg-blue-600/10">
          <span className="material-icons text-sm">date_range</span>
        </button>
      </div>
    </div>
  );
};

export default PriceChart;
