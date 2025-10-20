import { dbConnect } from "@/lib/dbConnect";
import Restaurant from "@/lib/models/Restaurant";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: any) {

  try {
    await dbConnect();

    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Id required" }, { status: 400 });
    }

    const { name, description, image, location, categories, rating } =
      await req.json();

    const restaurant = await Restaurant.findByIdAndUpdate(
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
      { message: "Restaurant updated successully", restaurant },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: any) {
  try {
    await dbConnect();

    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Id required" }, { status: 400 });
    }

    await Restaurant.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Restaurant deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
