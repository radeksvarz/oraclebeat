import { useEffect, useState } from "react";

interface PriceData {
  price: string;
  conf: string;
  expo: number;
  publish_time: number;
}

interface PythPriceResponse {
  binary: {
    encoding: string;
    data: string[];
  };
  parsed: Array<{
    id: string;
    price: PriceData;
    ema_price: PriceData;
    metadata: {
      slot: number;
      proof_available_time: number;
      prev_publish_time: number;
    };
  }>;
}

interface PythPrice {
  price: number;
  confidence: number;
  timestamp: number;
}

const POLLING_INTERVAL = 3000; // 3 seconds

export const usePythPrice = (priceId: string) => {
  const [data, setData] = useState<PythPrice | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const response = await fetch(
          `https://hermes.pyth.network/v2/updates/price/latest?ids[]=${priceId}&parsed=true`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch Pyth price");
        }

        const responseData = (await response.json()) as PythPriceResponse;

        if (!responseData?.parsed?.[0]?.price) {
          throw new Error("Invalid price data format");
        }

        const priceData = responseData.parsed[0].price;
        const price = parseFloat(priceData.price);
        const conf = parseFloat(priceData.conf);
        const expo = priceData.expo;

        setData({
          price: price * Math.pow(10, expo),
          confidence: conf * Math.pow(10, expo),
          timestamp: priceData.publish_time,
        });
        setError(null);
      } catch (err) {
        console.error("Error fetching Pyth price:", err);
        setError(err instanceof Error ? err : new Error("Failed to fetch price"));
      } finally {
        setIsLoading(false);
      }
    };

    // Initial fetch
    fetchPrice();

    // Set up polling
    const intervalId = setInterval(fetchPrice, POLLING_INTERVAL);

    // Cleanup
    return () => clearInterval(intervalId);
  }, [priceId]);

  return { data, error, isLoading };
};
