import { getMetadata } from "~~/utils/scaffold-eth/getMetadata";

export const oracleBeatMetadata = {
  home: getMetadata({
    title: "Oracle Beat - Compare Web3 Oracles & TradFi Data",
    description:
      "Compare real-time and historical price data from Web3 oracles and traditional financial sources across FX, equities, and commodities.",
  }),
  deviation: getMetadata({
    title: "Deviation Analysis - Oracle Beat",
    description: "Analyze price deviations between different data sources and oracles in real-time.",
  }),
};
