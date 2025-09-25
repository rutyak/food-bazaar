import Cart from "@/lib/models/Cart";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

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
    console.log(error.message);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: String(error),
      },
      { status: 500 }
    );
  }
}
