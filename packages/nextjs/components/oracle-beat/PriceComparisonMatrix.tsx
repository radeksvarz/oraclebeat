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
          <h3 className="text-gray-800 text-xl font-semibold leading-normal">Real-Time Price Comparison Matrix</h3>
          <p className="text-gray-500 text-sm">
            {assetPair} - Last updated: {lastUpdated}
          </p>
        </div>
        <button className="mt-4 sm:mt-0 flex items-center gap-2 px-4 py-2 bg-yellow-400 text-gray-800 font-semibold rounded-lg hover:bg-yellow-500 transition-colors shadow-md">
          <span className="material-icons text-lg">crisis_alert</span>
          Deviation Hunter
          <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">Earn Merits</span>
        </button>
      </div>
      <div className="overflow-x-auto @container">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider table-col-source"
                scope="col"
              >
                Source
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider table-col-price"
                scope="col"
              >
                Current Price
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider table-col-dev-abs"
                scope="col"
              >
                Deviation from Base ($)
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider table-col-dev-perc"
                scope="col"
              >
                Deviation from Base (%)
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {priceData.map((data, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 table-col-source">
                  {data.source}
                  {data.isBase && " (Base)"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 table-col-price">
                  ${data.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm table-col-dev-abs">
                  {data.isBase ? (
                    "-"
                  ) : (
                    <span
                      className={
                        data.deviationAbs && data.deviationAbs > 0
                          ? "text-green-600 font-medium"
                          : "text-red-600 font-medium"
                      }
                    >
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
                    <span
                      className={
                        data.deviationPerc && data.deviationPerc > 0
                          ? "text-green-600 font-medium"
                          : "text-red-600 font-medium"
                      }
                    >
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
