import { FC } from "react";

interface PriceData {
  source: string;
  price: number;
  deviationAbs?: number;
  deviationPerc?: number;
  isBase?: boolean;
}

interface PriceComparisonMatrixProps {
  assetPair: string;
  lastUpdated: string;
  priceData: PriceData[];
}

const PriceComparisonMatrix: FC<PriceComparisonMatrixProps> = ({ assetPair, lastUpdated, priceData }) => {
  return (
    <div className="bg-base-100 shadow-lg rounded-lg p-6 mb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <div>
          <h3 className="text-xl font-semibold text-base-content">Real-Time Price Comparison Matrix</h3>
          <p className="text-base-content/70 text-sm">
            {assetPair} - Last updated: {lastUpdated}
          </p>
        </div>
        <button className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-4 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary font-semibold rounded-lg transition-colors">
          <span className="material-icons !text-[20px] !leading-none">monitoring</span>
          <span>Deviation Hunter</span>
          <span className="bg-primary text-primary-content text-xs font-bold px-2 py-0.5 rounded-full">
            Earn Merits
          </span>
        </button>
      </div>
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
                className="px-6 py-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider table-col-price"
                scope="col"
              >
                Current Price
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider table-col-dev-abs"
                scope="col"
              >
                Deviation from Base ($)
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-base-content/70 uppercase tracking-wider table-col-dev-perc"
                scope="col"
              >
                Deviation from Base (%)
              </th>
            </tr>
          </thead>
          <tbody className="bg-base-100 divide-y divide-base-300">
            {priceData.map((data, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-base-content table-col-source">
                  {data.source}
                  {data.isBase && " (Base)"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-base-content/70 table-col-price">
                  ${data.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm table-col-dev-abs">
                  {data.isBase ? (
                    "-"
                  ) : (
                    <span className={data.deviationAbs && data.deviationAbs > 0 ? "text-success" : "text-error"}>
                      {data.deviationAbs
                        ? (data.deviationAbs > 0 ? "+" : "") + "$" + Math.abs(data.deviationAbs).toFixed(2)
                        : "-"}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm table-col-dev-perc">
                  {data.isBase ? (
                    "-"
                  ) : (
                    <span className={data.deviationPerc && data.deviationPerc > 0 ? "text-success" : "text-error"}>
                      {data.deviationPerc
                        ? (data.deviationPerc > 0 ? "+" : "") + data.deviationPerc.toFixed(2) + "%"
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
        @container (max-width: 600px) {
          .table-col-dev-abs {
            display: none;
          }
        }
        @container (max-width: 480px) {
          .table-col-dev-perc {
            display: none;
          }
        }
      `}</style>
    </div>
  );
};

export default PriceComparisonMatrix;
