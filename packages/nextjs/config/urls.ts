export const BLOCKSCOUT_URLS = {
  ETH_MAINNET: "https://eth.blockscout.com",
} as const;

export const CONTRACTS = {
  PYTH_ONCHAIN_ETH_L1: "0x4305FB66699C3B2702D4d05CF36551390A4c69C6",
} as const;

export const getBlockscoutContractUrl = (network: keyof typeof BLOCKSCOUT_URLS, address: string) => {
  return `${BLOCKSCOUT_URLS[network]}/address/${address}?tab=read_write_proxy`;
};
