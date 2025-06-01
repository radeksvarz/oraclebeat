import { useCallback, useEffect, useRef, useState } from "react";
import { AssetPair, DataSource, PriceData } from "~~/types/oracle";
import { getPythPriceFromBlockscout } from "~~/utils/blockscout";

export const useRealtimePrices = (assetPair: AssetPair, selectedSources: DataSource[]) => {
  const [prices, setPrices] = useState<PriceData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use refs to store mutable values that we don't want to trigger re-renders
  const sourcesRef = useRef(selectedSources);
  sourcesRef.current = selectedSources;

  const fetchPythHermesPrice = async (source: DataSource): Promise<PriceData | null> => {
    try {
      const { hermesPriceFeedId, hermesApiUrl } = source.realtimeConfig;
      if (!hermesPriceFeedId || !hermesApiUrl) return null;

      const url = `${hermesApiUrl}?id=${hermesPriceFeedId}`;
      console.log("Fetching Hermes price from:", url);

      const response = await fetch(url);
      const data = await response.json();
      console.log("Hermes API response:", data);

      // The Hermes API returns a different structure
      const priceData = data?.result?.[0];
      if (!priceData) {
        console.error("No price data found in Hermes response");
        return null;
      }

      // Extract price components
      const price = priceData.price;
      const conf = priceData.conf;
      const expo = priceData.expo;
      const publishTime = priceData.publish_time;

      if (!price || !conf || expo === undefined || !publishTime) {
        console.error("Missing required price data fields", { price, conf, expo, publishTime });
        return null;
      }

      return {
        source: source.name,
        price: Number(price) * Math.pow(10, expo),
        timestamp: publishTime,
        confidence: Number(conf) * Math.pow(10, expo),
      };
    } catch (err) {
      console.error("Error fetching Pyth Hermes price:", err);
      return null;
    }
  };

  const fetchPythOnchainPrice = async (source: DataSource): Promise<PriceData | null> => {
    try {
      const { contractAddress, priceFeedId, blockscoutRpcUrl } = source.realtimeConfig;
      if (!contractAddress || !priceFeedId || !blockscoutRpcUrl) return null;

      const priceData = await getPythPriceFromBlockscout(blockscoutRpcUrl, contractAddress, priceFeedId);

      return {
        source: source.name,
        price: Number(priceData.price) * Math.pow(10, priceData.expo),
        timestamp: Number(priceData.publishTime),
        confidence: Number(priceData.conf) * Math.pow(10, priceData.expo),
      };
    } catch (err) {
      console.error("Error fetching Pyth on-chain price:", err);
      return null;
    }
  };

  const fetchTraditionalApiPrice = async (source: DataSource): Promise<PriceData | null> => {
    try {
      const { proxyEndpoint, parameters } = source.realtimeConfig;
      if (!proxyEndpoint) return null;

      const queryParams = new URLSearchParams(parameters);
      const response = await fetch(`/api/proxy${proxyEndpoint}?${queryParams}`);
      const data = await response.json();

      return {
        source: source.name,
        price: data.price,
        timestamp: data.timestamp,
      };
    } catch (err) {
      console.error("Error fetching traditional API price:", err);
      return null;
    }
  };

  const fetchPrices = useCallback(async () => {
    if (!sourcesRef.current.length) return;

    try {
      setIsLoading(true);
      setError(null);

      const pricePromises = sourcesRef.current.map(async source => {
        switch (source.realtimeConfig.method) {
          case "HermesAPI":
            return fetchPythHermesPrice(source);
          case "BlockscoutAPI":
            return fetchPythOnchainPrice(source);
          case "ProxyAPI":
            return fetchTraditionalApiPrice(source);
          default:
            return null;
        }
      });

      const results = await Promise.all(pricePromises);
      const validPrices = results.filter((price): price is PriceData => price !== null);

      // Calculate deviations if we have a base source
      if (validPrices.length > 0) {
        const basePrice = validPrices[0];
        basePrice.isBase = true;

        for (let i = 1; i < validPrices.length; i++) {
          const price = validPrices[i];
          price.deviationAbs = price.price - basePrice.price;
          price.deviationPerc = ((price.price - basePrice.price) / basePrice.price) * 100;
        }
      }

      setPrices(validPrices);
    } catch (err) {
      console.error("Error fetching prices:", err);
      setError("Failed to fetch price data");
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array since we use refs

  useEffect(() => {
    // Initial fetch
    fetchPrices();

    // Set up polling interval
    const interval = setInterval(fetchPrices, 5000); // Poll every 5 seconds

    // Cleanup
    return () => clearInterval(interval);
  }, [fetchPrices]); // Only fetchPrices as dependency

  // Update sources ref when selectedSources changes
  useEffect(() => {
    sourcesRef.current = selectedSources;
    fetchPrices(); // Fetch immediately when sources change
  }, [selectedSources, fetchPrices]);

  return { prices, isLoading, error, refetch: fetchPrices };
};
