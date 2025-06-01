import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const priceFeedId = searchParams.get("id");

    if (!priceFeedId) {
      return NextResponse.json({ error: "Missing price feed ID" }, { status: 400 });
    }

    const response = await fetch(
      `https://xc-mainnet.pyth.network/api/latest_price_feeds?ids[]=${priceFeedId}&binary=false`,
    );

    if (!response.ok) {
      console.error("Pyth Hermes API error:", {
        status: response.status,
        statusText: response.statusText,
      });
      return NextResponse.json({ error: `Pyth Hermes API returned ${response.status}` }, { status: response.status });
    }

    // Try to parse the response text first to handle invalid JSON
    const responseText = await response.text();
    let data;
    try {
      data = JSON.parse(responseText);
    } catch {
      console.error("Failed to parse Pyth Hermes response:", responseText);
      return NextResponse.json({ error: "Invalid JSON response from Pyth Hermes" }, { status: 500 });
    }

    if (!data?.result?.length) {
      return NextResponse.json({ error: "No price data found" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching from Pyth Hermes:", error);
    return NextResponse.json({ error: "Failed to fetch from Pyth Hermes" }, { status: 500 });
  }
}
