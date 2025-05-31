import { FC } from "react";

interface AssetSelectorProps {
  baseAsset: string;
  quoteAsset: string;
  onBaseAssetChange: (value: string) => void;
  onQuoteAssetChange: (value: string) => void;
}

const AssetSelector: FC<AssetSelectorProps> = ({ baseAsset, quoteAsset, onBaseAssetChange, onQuoteAssetChange }) => {
  const assets = [
    { value: "EUR", label: "EUR (Euro)" },
    { value: "USD", label: "USD (US Dollar)" },
    { value: "CZK", label: "CZK (Czech Koruna)" },
    { value: "AAPL", label: "AAPL (Apple Inc.)" },
    { value: "BTC", label: "BTC (Bitcoin)" },
    { value: "ETH", label: "ETH (Ethereum)" },
  ];

  return (
    <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
      <h3 className="text-slate-800 text-lg font-semibold mb-3">1. Select Asset Pair</h3>
      <div className="grid grid-cols-1 gap-4">
        <label className="flex flex-col">
          <span className="text-sm font-medium text-slate-700 mb-1.5">Base Asset</span>
          <select
            className="form-select w-full rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border-slate-300 bg-white h-12 px-4 text-base appearance-none"
            value={baseAsset}
            onChange={e => onBaseAssetChange(e.target.value)}
            style={{
              backgroundImage: `url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e')`,
              backgroundPosition: "right 0.5rem center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "1.5em 1.5em",
            }}
          >
            {assets.map(asset => (
              <option key={asset.value} value={asset.value}>
                {asset.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium text-slate-700 mb-1.5">Quote Asset</span>
          <select
            className="form-select w-full rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border-slate-300 bg-white h-12 px-4 text-base appearance-none"
            value={quoteAsset}
            onChange={e => onQuoteAssetChange(e.target.value)}
            style={{
              backgroundImage: `url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e')`,
              backgroundPosition: "right 0.5rem center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "1.5em 1.5em",
            }}
          >
            {assets.map(asset => (
              <option key={asset.value} value={asset.value}>
                {asset.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default AssetSelector;
