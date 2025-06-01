export interface AssetPair {
  id: string;
  displayName: string;
  baseAsset: string;
  quoteAsset: string;
  category: string;
  sources: DataSource[];
}

export interface DataSource {
  name: string;
  type: "Web3 Oracle" | "Traditional API";
  realtimeConfig: RealtimeConfig;
  historicalConfig?: HistoricalConfig;
  supportedChains?: string[];
  characteristics?: SourceCharacteristics;
}

export interface RealtimeConfig {
  method: "HermesAPI" | "BlockscoutAPI" | "DirectRPC" | "ProxyAPI";
  hermesPriceFeedId?: string;
  hermesApiUrl?: string;
  contractAddress?: string;
  functionName?: string;
  priceFeedId?: string;
  blockscoutRpcUrl?: string;
  networkId?: number;
  decimalsMethod?: string;
  latestRoundDataMethod?: string;
  proxyEndpoint?: string;
  parameters?: Record<string, string>;
}

export interface HistoricalConfig {
  method: "ExternalAPI";
  apiEndpoint: string;
  historicalEndpointTemplate?: string;
  parameters: Record<string, string>;
  rateLimitPerMin?: number;
}

export interface SourceCharacteristics {
  dataFrequency: string;
  centralizationLevel: string;
  dataLatency: string;
  methodology: string;
}

export interface PriceData {
  source: string;
  price: number;
  timestamp: number;
  confidence?: number;
  deviationAbs?: number;
  deviationPerc?: number;
  isBase?: boolean;
}

// Pyth specific types
export interface PythPrice {
  price: string;
  conf: string;
  expo: number;
  publish_time: number;
}
