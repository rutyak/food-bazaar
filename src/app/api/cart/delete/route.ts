import Cart from "@/lib/models/Cart";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    await Cart.deleteMany({});

    return NextResponse.json({ message: "Cart deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({
      message: error.message || "Internal server error",
    });
  }
}
