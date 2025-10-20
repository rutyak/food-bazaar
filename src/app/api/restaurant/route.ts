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

    const restaurants = await Restaurant.find();

    return NextResponse.json({
      message: "Restaurants fetched successfully",
      restaurants,
    });
  } catch (error: unknown) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
