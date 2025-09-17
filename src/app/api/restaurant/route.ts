import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  console.log("searchParams: ", searchParams);
  const lat = searchParams.get("lat") || "12.9351929";
  const lng = searchParams.get("lng") || "77.62448069999999";

  try {
    const swiggyUrl = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`;

    const response = await fetch(swiggyUrl, {
      headers: {
        "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      },
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`swiggy API error: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("swiggy proxy error: ", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch restaurants",
      },
      { status: 500 }
    );
  }
}
