import { dbConnect } from "@/lib/dbConnect";
import Restaurant from "@/lib/models/Restaurant";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: any) {
  try {
    await dbConnect();

    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Id required" }, { status: 400 });
    }

    const { name, description, image, location, categories, rating } =
      await req.json();

    await Restaurant.findByIdAndUpdate(
      id,
      {
        name,
        description,
        image,
        location,
        categories,
        rating,
      },
      { new: true }
    );

    return NextResponse.json(
      { message: "Restaurant updated successully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      message: "Internal server error",
      error: String(error),
    });
  }
}
