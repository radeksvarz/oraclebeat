## Proposed JSON Configuration File for Asset Pair Registration

For the hackathon, managing asset pair registration via a static JSON configuration file is a pragmatic and efficient approach. This file will serve as the single source of truth for all supported asset pairs and their corresponding data source mappings.

-----

### `config.json` Structure Proposal

This structure accounts for various types of asset pairs and the specific details needed to retrieve data from different oracle types, including the `ExchangeRate API`.

```json
{
  "supportedAssetPairs": [
    {
      "id": "EURUSD",
      "displayName": "Euro / US Dollar",
      "baseAsset": "EUR",
      "quoteAsset": "USD",
      "category": "FX",
      "sources": [
        {
          "name": "Pyth Network (Pythnet/Hermes)",
          "type": "Web3 Oracle",
          "realtimeConfig": {
            "method": "HermesAPI",
            "hermesPriceFeedId": "0xa995d00bb36a63cef7fd2c287dc105fc8f3d93779f062f09551b0af3e81ec30b",
            "hermesApiUrl": "https://hermes.pyth.network/v2/updates/price/latest"
          },
          "supportedChains": []
        },
        {
          "name": "Pyth Network (ETH L1 Contract)",
          "type": "Web3 Oracle",
          "realtimeConfig": {
            "method": "BlockscoutAPI",
            "contractAddress": "0x4305FB66699C3B2702D4d05CF36551390A4c69C6",
            "functionName": "getPriceUnsafe",
            "priceFeedId": "0xa995d00bb36a63cef7fd2c287dc105fc8f3d93779f062f09551b0af3e81ec30b",
            "blockscoutRpcUrl": "https://eth.blockscout.com/api/eth-rpc"
          },
          "supportedChains": ["ethereum"]
        },
        {
          "name": "Chainlink (ETH L1)",
          "type": "Web3 Oracle",
          "realtimeConfig": {
            "method": "DirectRPC",
            "contractAddress": "0x1a87e2b7a957867201c1074092b76F1F9e4d02F3",
            "networkId": 1,
            "decimalsMethod": "decimals",
            "latestRoundDataMethod": "latestRoundData"
          },
          "supportedChains": ["ethereum"]
        },
        {
          "name": "European Central Bank (ECB)",
          "type": "Traditional API",
          "realtimeConfig": {
            "method": "ProxyAPI",
            "proxyEndpoint": "/api/proxy/realtime-ecb-eurusd"
            // The actual external ECB API URL/key is handled by the proxy backend
          },
          "historicalConfig": {
            "method": "ExternalAPI",
            "apiEndpoint": "https://api.ecb.europa.eu/stats/data/EXR/D.EUR.USD.SP00.A",
            "parameters": {
                "format": "json"
            },
            "rateLimitPerMin": 60 // Example rate limit guidance for backend
          },
          "characteristics": {
            "dataFrequency": "Daily",
            "centralizationLevel": "Centralized (Official)",
            "dataLatency": "Low (end-of-day)",
            "methodology": "Official reference rates"
          }
        },
        {
          "name": "ExchangeRate API (USD Base)",
          "type": "Traditional API",
          "realtimeConfig": {
            "method": "ProxyAPI",
            "proxyEndpoint": "/api/proxy/realtime-exchangerate-api",
            "parameters": {
                "base": "USD",
                "symbols": "EUR" // Requesting EUR rate against USD base
            }
          },
          "historicalConfig": {
            "method": "ExternalAPI",
            "apiEndpoint": "https://open.er-api.com/v6/latest/USD",
            "historicalEndpointTemplate": "https://open.er-api.com/v6/{YYYY-MM-DD}/USD",
            "parameters": {},
            "rateLimitPerMin": 100 // Example rate limit guidance for backend
          },
          "characteristics": {
            "dataFrequency": "Hourly",
            "centralizationLevel": "Centralized (Commercial)",
            "dataLatency": "Low",
            "methodology": "Aggregated from various sources"
          }
        }
      ]
    },
    {
      "id": "AAPLUSD",
      "displayName": "Apple Inc. / US Dollar",
      "baseAsset": "AAPL",
      "quoteAsset": "USD",
      "category": "Equity",
      "sources": [
        {
          "name": "Pyth Network (Pythnet/Hermes)",
          "type": "Web3 Oracle",
          "realtimeConfig": {
            "method": "HermesAPI",
            "hermesPriceFeedId": "0xca036814b7e8d752495b50937a06a090747444c803875508a8a65c952327429d",
            "hermesApiUrl": "https://hermes.pyth.network/v2/updates/price/latest"
          },
          "supportedChains": []
        },
        {
          "name": "Alpha Vantage (Stock API)",
          "type": "Traditional API",
          "realtimeConfig": {
            "method": "ProxyAPI",
            "proxyEndpoint": "/api/proxy/realtime-alphavantage",
            "parameters": {
                "function": "GLOBAL_QUOTE",
                "symbol": "AAPL"
            }
          },
          "historicalConfig": {
            "method": "ExternalAPI",
            "apiEndpoint": "https://www.alphavantage.co/query",
            "parameters": {
                "function": "TIME_SERIES_DAILY",
                "symbol": "AAPL",
                "outputsize": "full"
            },
            "rateLimitPerMin": 5
          },
          "characteristics": {
            "dataFrequency": "Real-time",
            "centralizationLevel": "Centralized (Commercial)",
            "dataLatency": "Low",
            "methodology": "Aggregated from exchanges"
          }
        }
      ]
    }
    // ... add more asset pairs (e.g., Gold/USD, BTC/USD from other oracles)
  ]
}
```

-----

### Key Sections and Their Purpose (Reiterated with updates):

1.  **`supportedAssetPairs` (Array of Objects):**

      * This is the top-level array containing definitions for each tradable asset pair.

2.  **Asset Pair Object (e.g., `EURUSD`):**

      * **`id` (String):** A unique identifier for the asset pair (e.g., "EURUSD", "AAPLUSD"). This is what the frontend will use internally.
      * **`displayName` (String):** A user-friendly name for display in the UI.
      * **`baseAsset` (String):** The symbol for the base currency/asset (e.g., "EUR", "AAPL").
      * **`quoteAsset` (String):** The symbol for the quote currency/asset (e.g., "USD").
      * **`category` (String):** Helps categorize the asset (e.g., "FX", "Equity", "Commodity", "Crypto"). Useful for filtering.
      * **`sources` (Array of Objects):** A list of data sources available for this specific asset pair.

3.  **Source Object (within `sources` array):**

      * **`name` (String):** The display name of the data source (e.g., "Pyth Network (Pythnet/Hermes)", "European Central Bank (ECB)").
      * **`type` (String):** Categorization ("Web3 Oracle" or "Traditional API").
      * **`realtimeConfig` (Object, Optional):** Defines how to get **real-time** data for this source.
          * **`method` (String):** Specifies the integration method:
              * `"HermesAPI"`: For direct calls to Pyth's Hermes API.
              * `"BlockscoutAPI"`: For calling on-chain contracts via Blockscout's RPC API.
              * `"DirectRPC"`: For direct `wagmi` / `ethers.js` calls to specific on-chain oracle contracts (e.g., Chainlink).
              * `"ProxyAPI"`: For traditional APIs that require the Real-time Data Proxy Backend.
          * **Specific fields based on `method`:** Contains relevant details like `hermesPriceFeedId`, `contractAddress`, `functionName`, `priceFeedId`, `blockscoutRpcUrl`, `proxyEndpoint`, `parameters` for the proxy.
      * **`historicalConfig` (Object, Optional):** Defines how to get **historical** data for this source (primarily used by the Main Backend for ingestion).
          * **`method` (String):** `"ExternalAPI"` for calls to external historical APIs (e.g., ECB, Alpha Vantage, ExchangeRate API).
          * **`apiEndpoint` (String):** The base URL for the historical API (e.g., for latest endpoint, if historical template is different).
          * **`historicalEndpointTemplate` (String, Optional):** A template URL for fetching historical data for specific dates (e.g., `https://open.er-api.com/v6/{YYYY-MM-DD}/USD`).
          * **`parameters` (Object):** Any fixed parameters for the historical API.
          * **`rateLimitPerMin` (Number, Optional):** A hint for the backend's ingestion logic.
      * **`supportedChains` (Array of Strings, Optional):** For Web3 oracles, lists the blockchain networks where this specific feed is active (e.g., "ethereum", "arbitrum"). Crucial for frontend filtering and guiding user selection.
      * **`characteristics` (Object):** Contains metadata about the source for the "Source Comparison Matrix."
          * `dataFrequency`, `centralizationLevel`, `dataLatency`, `methodology`, etc.

-----

### How this fits the Architecture:

  * **Main Backend (Vercel Serverless Functions):**
      * On startup or via a cold start, the backend will **load this JSON file**.
      * It will expose endpoints like `/api/v1/asset-pairs` and `/api/v1/sources?assetPair=<pair>` by processing this configuration.
      * Its historical data ingestion cron jobs will use the `historicalConfig` details (including the `historicalEndpointTemplate` for the `ExchangeRate API`) from this file to fetch and store data in Vercel KV.
  * **Frontend:**
      * Will fetch the list of asset pairs and their sources from the **Main Backend's** `/api/v1/asset-pairs` and `/api/v1/sources` endpoints.
      * For real-time data, it will use the `realtimeConfig` details (e.g., `hermesApiUrl`, `contractAddress`, `proxyEndpoint`) to make the appropriate direct API calls or calls to the **Real-time Data Proxy Backend**.
  * **Real-time Data Proxy Backend:**
      * Will have endpoints (e.g., `/api/proxy/realtime-exchangerate-api`) that map to the `proxyEndpoint` values in this JSON file. It will then use its internal, secure API keys (if `ExchangeRate API` requires one, though its public tier is often free) to fulfill the request from the external traditional API.

This structure provides a clean, centralized way to manage all asset pairs and their associated data sources for the hackathon, allowing for easy expansion and modification without code changes, and explicitly integrating the `ExchangeRate API`.