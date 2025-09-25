import { dbConnect } from "@/lib/dbConnect";
import Cart from "@/lib/models/Cart";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Id required" }, { status: 400 });
    }

    const deletedCart = await Cart.findOneAndDelete({ itemId: id });
    if (!deletedCart) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error: String(error),
      },
      { status: 500 }
    );
  }
}
