import { FC } from "react";
import { usePythPrice } from "~~/hooks/oracle-beat/usePythPrice";

// EUR/USD price feed ID from Pyth Network
const EURUSD_PRICE_ID = "0xa995d00bb36a63cef7fd2c287dc105fc8f3d93779f062f09551b0af3e81ec30b";

export const PythPriceCell: FC = () => {
  const { data, error, isLoading } = usePythPrice(EURUSD_PRICE_ID);

  if (isLoading) {
    return (
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 table-col-price">
        <div className="animate-pulse flex space-x-4">
          <div className="h-2 w-24 bg-slate-200 rounded"></div>
        </div>
      </td>
    );
  }

  if (error) {
    return <td className="px-6 py-4 whitespace-nowrap text-sm text-red-500 table-col-price">Error loading price</td>;
  }

  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 table-col-price">${data?.price.toFixed(4)}</td>
  );
};
