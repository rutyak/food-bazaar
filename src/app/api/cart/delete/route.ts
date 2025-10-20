import Cart from "@/lib/models/Cart";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    await Cart.deleteMany({});

    return NextResponse.json({ message: "Cart deleted successfully" });
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
