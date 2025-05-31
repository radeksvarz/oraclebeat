import { FC } from "react";

interface DataSourceSelectorProps {
  web3Oracle: string;
  traditionalSource: string;
  onWeb3OracleChange: (value: string) => void;
  onTraditionalSourceChange: (value: string) => void;
  disabled: boolean;
}

const DataSourceSelector: FC<DataSourceSelectorProps> = ({
  web3Oracle,
  traditionalSource,
  onWeb3OracleChange,
  onTraditionalSourceChange,
  disabled,
}) => {
  const web3Oracles = [
    { value: "pythnetwork", label: "Pyth Network" },
    { value: "pythonchain", label: "Pyth Onchain Ethereum L1" },
    { value: "chainlink", label: "Chainlink Ethereum L1" },
    { value: "tellor", label: "Tellor" },
    { value: "redstone", label: "Redstone" },
  ];

  const traditionalSources = [
    { value: "exchangerateapi", label: "ExchangeRate API" },
    { value: "bloomberg", label: "Bloomberg" },
    { value: "reuters", label: "Reuters" },
    { value: "yahoo", label: "Yahoo Finance" },
  ];

  return (
    <div className="p-6 bg-slate-50 rounded-lg border border-slate-200 relative">
      {disabled && <div className="disabled-overlay" />}
      <h3 className="text-slate-800 text-lg font-semibold mb-1">2. Select Data Sources</h3>
      <p className="text-xs text-slate-500 mb-3">
        {disabled
          ? "Please select an asset pair first to activate source selection."
          : "Select one or more sources from each category for comparison."}
      </p>
      <div className="grid grid-cols-1 gap-4">
        <label className="flex flex-col">
          <span className="text-sm font-medium text-slate-700 mb-1.5">Web3 Oracles</span>
          <select
            className="form-select w-full rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border-slate-300 bg-white h-12 px-4 text-base appearance-none"
            value={web3Oracle}
            onChange={e => onWeb3OracleChange(e.target.value)}
            disabled={disabled}
            style={{
              backgroundImage: `url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e')`,
              backgroundPosition: "right 0.5rem center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "1.5em 1.5em",
            }}
          >
            <option value="">Select Oracle</option>
            {web3Oracles.map(oracle => (
              <option key={oracle.value} value={oracle.value}>
                {oracle.label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col">
          <span className="text-sm font-medium text-slate-700 mb-1.5">Traditional APIs/Info</span>
          <select
            className="form-select w-full rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 border-slate-300 bg-white h-12 px-4 text-base appearance-none"
            value={traditionalSource}
            onChange={e => onTraditionalSourceChange(e.target.value)}
            disabled={disabled}
            style={{
              backgroundImage: `url('data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 fill=%27none%27 viewBox=%270 0 20 20%27%3e%3cpath stroke=%27%236b7280%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%271.5%27 d=%27M6 8l4 4 4-4%27/%3e%3c/svg%3e')`,
              backgroundPosition: "right 0.5rem center",
              backgroundRepeat: "no-repeat",
              backgroundSize: "1.5em 1.5em",
            }}
          >
            <option value="">Select Source</option>
            {traditionalSources.map(source => (
              <option key={source.value} value={source.value}>
                {source.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <style jsx>{`
        .disabled-overlay {
          display: block;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(243, 244, 246, 0.5);
          z-index: 10;
          border-radius: 0.5rem;
        }
        .form-select:disabled {
          background-color: #f3f4f6;
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default DataSourceSelector;
