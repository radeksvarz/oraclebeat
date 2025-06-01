import { AssetPair } from "~~/types/oracle";

// This is a temporary mock of the config.json for development
// In production, this would be fetched from the backend
export const assetPairConfig: AssetPair[] = [
  {
    id: "EURUSD",
    displayName: "Euro / US Dollar",
    baseAsset: "EUR",
    quoteAsset: "USD",
    category: "FX",
    sources: [
      {
        name: "Pyth Network (Pythnet/Hermes)",
        type: "Web3 Oracle",
        realtimeConfig: {
          method: "HermesAPI",
          hermesPriceFeedId: "0xa995d00bb36a63cef7fd2c287dc105fc8f3d93779f062f09551b0af3e81ec30b",
          hermesApiUrl: "/api/proxy/pyth-hermes",
        },
        supportedChains: [],
      },
      {
        name: "Pyth Network (ETH L1 Contract)",
        type: "Web3 Oracle",
        realtimeConfig: {
          method: "BlockscoutAPI",
          contractAddress: "0x2880ab155794e7179c9ee2e38200202908c17b43",
          functionName: "getPriceUnsafe",
          priceFeedId: "0xa995d00bb36a63cef7fd2c287dc105fc8f3d93779f062f09551b0af3e81ec30b",
          blockscoutRpcUrl: "https://eth-mainnet.blockscout.com/api/eth-rpc",
        },
        supportedChains: ["ethereum"],
      },
      {
        name: "ExchangeRate API (USD Base)",
        type: "Traditional API",
        realtimeConfig: {
          method: "ProxyAPI",
          proxyEndpoint: "/realtime-exchangerate-api",
          parameters: {
            base: "USD",
            symbols: "EUR",
          },
        },
        characteristics: {
          dataFrequency: "Hourly",
          centralizationLevel: "Centralized (Commercial)",
          dataLatency: "Low",
          methodology: "Aggregated from various sources",
        },
      },
    ],
  },
  {
    id: "AAPLUSD",
    displayName: "Apple Inc. / US Dollar",
    baseAsset: "AAPL",
    quoteAsset: "USD",
    category: "Equity",
    sources: [
      {
        name: "Pyth Network (Pythnet/Hermes)",
        type: "Web3 Oracle",
        realtimeConfig: {
          method: "HermesAPI",
          hermesPriceFeedId: "0xca036814b7e8d752495b50937a06a090747444c803875508a8a65c952327429d",
          hermesApiUrl: "/api/proxy/pyth-hermes",
        },
        supportedChains: [],
      },
    ],
  },
];
