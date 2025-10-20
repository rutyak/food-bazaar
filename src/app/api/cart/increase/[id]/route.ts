import { dbConnect } from "@/lib/dbConnect";
import Cart from "@/lib/models/Cart";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: any) {
  try {
    await dbConnect();

    const { id } = params;

    const existingItem = await Cart.findOne({ itemId: id });
    if (!existingItem) {
      return NextResponse.json(
        {
          message: "Item does not exist",
        },
        { status: 404 }
      );
    }

    existingItem.quantity += 1;
    await existingItem.save();

    return NextResponse.json(
      { message: "Item quantity increased by one" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
