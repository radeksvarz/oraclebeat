import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { rpcUrl, method, params } = body;

    if (!rpcUrl || !method) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    const response = await fetch(rpcUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method,
        params: params || [],
      }),
    });

    if (!response.ok) {
      console.error("Blockscout RPC error:", {
        status: response.status,
        statusText: response.statusText,
      });
      return NextResponse.json({ error: `Blockscout RPC returned ${response.status}` }, { status: response.status });
    }

    // Try to parse the response text first to handle invalid JSON
    const responseText = await response.text();
    let result;
    try {
      result = JSON.parse(responseText);
    } catch {
      console.error("Failed to parse Blockscout response:", responseText);
      return NextResponse.json({ error: "Invalid JSON response from Blockscout" }, { status: 500 });
    }

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error proxying Blockscout RPC call:", error);
    return NextResponse.json({ error: "Failed to proxy Blockscout RPC call" }, { status: 500 });
  }
}
