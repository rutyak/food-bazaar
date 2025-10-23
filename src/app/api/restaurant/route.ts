import { dbConnect } from "@/lib/dbConnect";
import Restaurant from "@/lib/models/Restaurant";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { name, description, image, location, categories, rating } =
      await req.json();

    if (
      !name ||
      !description ||
      !image ||
      !location ||
      !categories ||
      !rating
    ) {
      throw new Error("All fields required");
    }

    const restaurantInfo = await Restaurant.create({
      name,
      description,
      image,
      location,
      categories,
    });

    return NextResponse.json({
      message: "Restaurant added successfully",
      restaurant: restaurantInfo,
    });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "1", 10);
    const skip = (page - 1) * limit;

    const totalRestaurants = await Restaurant.countDocuments();

    const restaurants = await Restaurant.find().skip(skip).limit(limit);

    const hasMore = skip + restaurants.length < totalRestaurants;

    return NextResponse.json({
      message: "Restaurants fetched successfully",
      restaurants,
      page,
      total: totalRestaurants,
      hasMore,
    });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
