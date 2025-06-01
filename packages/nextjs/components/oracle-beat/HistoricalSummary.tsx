import { FC } from "react";
import FormattedPrice from "./FormattedPrice";
import { CONTRACTS, getBlockscoutContractUrl } from "~~/config/urls";

interface HistoricalData {
  source: string;
  avgPrice: number;
  maxPrice: number;
  minPrice: number;
  avgDeviationAbs?: number;
  avgDeviationPerc?: number;
  isBase?: boolean;
}

interface HistoricalSummaryProps {
  data: HistoricalData[];
}

const HistoricalSummary: FC<HistoricalSummaryProps> = ({ data }) => {
  return (
    <div className="bg-base-100 shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold text-base-content mb-4">Historical Data Summary</h3>
      <div className="overflow-x-auto @container">
        <table className="min-w-full divide-y divide-base-300">
          <thead className="bg-base-200">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider table-col-source"
                scope="col"
              >
                Source
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider table-col-avg"
                scope="col"
              >
                Average Price
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider table-col-max"
                scope="col"
              >
                Max Price
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider table-col-min"
                scope="col"
              >
                Min Price
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider table-col-hist-dev-abs"
                scope="col"
              >
                Avg. Deviation ($)
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider table-col-hist-dev-perc"
                scope="col"
              >
                Avg. Deviation (%)
              </th>
            </tr>
          </thead>
          <tbody className="bg-base-100 divide-y divide-base-300">
            {data.map((item, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-base-content table-col-source">
                  <div className="flex items-center gap-2">
                    <span>
                      {item.source}
                      {item.isBase && " (Base)"}
                    </span>
                    {item.source === "Pyth Onchain Ethereum L1" && (
                      <a
                        href={getBlockscoutContractUrl("ETH_MAINNET", CONTRACTS.PYTH_ONCHAIN_ETH_L1)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80"
                        title="View contract on Blockscout"
                      >
                        <span className="material-icons !text-base">open_in_new</span>
                      </a>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content/70 table-col-avg">
                  <FormattedPrice price={item.avgPrice} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content/70 table-col-max">
                  <FormattedPrice price={item.maxPrice} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content/70 table-col-min">
                  <FormattedPrice price={item.minPrice} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content/70 table-col-hist-dev-abs">
                  {item.isBase
                    ? "-"
                    : item.avgDeviationAbs
                      ? (item.avgDeviationAbs > 0 ? "+" : "") + "$" + Math.abs(item.avgDeviationAbs).toFixed(6)
                      : "-"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm table-col-hist-dev-perc">
                  {item.isBase ? (
                    "-"
                  ) : (
                    <span
                      className={
                        item.avgDeviationPerc && item.avgDeviationPerc > 0
                          ? "text-success font-medium"
                          : "text-error font-medium"
                      }
                    >
                      {item.avgDeviationPerc
                        ? (item.avgDeviationPerc > 0 ? "+" : "") + item.avgDeviationPerc.toFixed(4) + "%"
                        : "-"}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        @container (max-width: 800px) {
          .table-col-hist-dev-abs,
          .table-col-hist-dev-perc {
            display: none;
          }
        }
        @container (max-width: 640px) {
          .table-col-max,
          .table-col-min {
            display: none;
          }
        }
        @container (max-width: 480px) {
          .table-col-avg {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default HistoricalSummary;
