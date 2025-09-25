import { dbConnect } from "@/lib/dbConnect";
import Cart from "@/lib/models/Cart";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const { id } = params;

    console.log("decrease quantity hit: ", id);

    const existingItem = await Cart.findOne({ itemId: id });
    if (!existingItem) {
      return NextResponse.json(
        {
          message: "Item not exist",
        },
        { status: 404 }
      );
    }

    existingItem.quantity -= 1;
    await existingItem.save();

    return NextResponse.json(
      { message: "Item quantity increased by 1" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error: String(error),
      },
      { status: 500 }
    );
  }
}
