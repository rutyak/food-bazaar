import { dbConnect } from "@/lib/dbConnect";
import MenuItem from "@/lib/models/MenuItem";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    await dbConnect();

    const { id } = params;

    const menuItems = await MenuItem.find({ restaurantId: id }).populate(
      "restaurantId"
    );

    return NextResponse.json(
      { message: "Menu fetched successfully", menuItems },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      message: "Internal server error",
      error: String(error),
    });
  }
}
