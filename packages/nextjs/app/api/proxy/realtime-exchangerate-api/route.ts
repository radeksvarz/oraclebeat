import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const base = searchParams.get("base");
    const symbols = searchParams.get("symbols");

    if (!base || !symbols) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const response = await fetch(`https://open.er-api.com/v6/latest/${base}`);
    const data = await response.json();

    if (data.result === "error") {
      return NextResponse.json({ error: data.error }, { status: 500 });
    }

    const rate = data.rates[symbols];
    if (rate === undefined) {
      return NextResponse.json({ error: "Invalid symbol" }, { status: 400 });
    }

    return NextResponse.json({
      price: 1 / rate, // Convert to base/quote format (e.g., EUR/USD)
      timestamp: Math.floor(data.time_last_update_unix),
    });
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    return NextResponse.json({ error: "Failed to fetch exchange rate" }, { status: 500 });
  }
}
