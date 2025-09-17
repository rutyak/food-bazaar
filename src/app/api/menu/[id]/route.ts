import { NextRequest, NextResponse } from "next/server";


export async function GET(
  request: NextRequest,
  {params}: {params: Promise<{ id: string }>}
) {
  const { id } = await params;
  console.log("id: ", id);

  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat") || "12.9351929";
  const lng = searchParams.get("lng") || "77.62448069999999";

  try {
    const swiggyMenuUrl = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${id}`;
    const res = await fetch(swiggyMenuUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
      },
    });

    if (!res.ok) {
      console.log("error: ", res.status, res.statusText);
      return NextResponse.json({
        success: false,
        error: `Failed to fetch ${res.status}`,
      });
    }

    const data = await res.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("error: ", error);
    return NextResponse.json({
      success: false,
      error: "Failed to fetch menu data",
    });
  }
}
