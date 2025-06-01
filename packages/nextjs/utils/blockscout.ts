import { decodeAbiParameters, encodeFunctionData } from "viem";

const PYTH_PRICE_ABI = [
  {
    name: "getPriceUnsafe",
    type: "function",
    stateMutability: "view",
    inputs: [{ name: "id", type: "bytes32" }],
    outputs: [
      {
        components: [
          { name: "price", type: "int64" },
          { name: "conf", type: "uint64" },
          { name: "expo", type: "int32" },
          { name: "publishTime", type: "uint64" },
        ],
        type: "tuple",
      },
    ],
  },
];

interface PythPriceResponse {
  price: bigint;
  conf: bigint;
  expo: number;
  publishTime: bigint;
}

export async function callBlockscoutRPC(
  rpcUrl: string,
  contractAddress: string,
  functionName: string,
  args: unknown[],
  abi: any[],
): Promise<any> {
  try {
    const data = encodeFunctionData({
      abi,
      functionName,
      args,
    });

    console.log("Calling Blockscout RPC with data:", {
      contractAddress,
      functionName,
      data,
    });

    const response = await fetch("/api/proxy/blockscout-rpc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contractAddress,
        data,
      }),
    });

    const result = await response.json();
    console.log("Blockscout RPC response:", result);

    if (result.error) {
      throw new Error(`RPC Error: ${JSON.stringify(result.error)}`);
    }

    if (!result.result || typeof result.result !== "string" || !result.result.startsWith("0x")) {
      throw new Error(`Invalid RPC response format: ${JSON.stringify(result)}`);
    }

    return result.result;
  } catch (error) {
    console.error("Error calling Blockscout RPC:", error);
    throw error;
  }
}

export async function getPythPriceFromBlockscout(
  rpcUrl: string,
  contractAddress: string,
  priceFeedId: string,
): Promise<PythPriceResponse> {
  try {
    const hexResult = await callBlockscoutRPC(rpcUrl, contractAddress, "getPriceUnsafe", [priceFeedId], PYTH_PRICE_ABI);

    if (!hexResult || hexResult === "0x") {
      throw new Error("Empty result from Blockscout RPC");
    }

    // Remove "0x" prefix if present for decoding
    const hexData = hexResult.startsWith("0x") ? hexResult.slice(2) : hexResult;

    // Ensure we have enough data (at least 32 bytes)
    if (hexData.length < 64) {
      throw new Error(`Invalid data length: ${hexData.length} chars`);
    }

    console.log("Decoding hex data:", hexData);

    const decoded = decodeAbiParameters(
      [
        {
          components: [
            { name: "price", type: "int64" },
            { name: "conf", type: "uint64" },
            { name: "expo", type: "int32" },
            { name: "publishTime", type: "uint64" },
          ],
          type: "tuple",
        },
      ],
      `0x${hexData}`,
    )[0];

    console.log("Decoded Pyth price:", decoded);

    return decoded;
  } catch (error) {
    console.error("Error getting Pyth price from Blockscout:", error);
    throw error;
  }
}
