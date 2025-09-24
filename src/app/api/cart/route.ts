import Cart from "@/lib/models/Cart";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { itemId, name, price, image, isVeg, quantity } = await req.json();

    const addedItem = await Cart.create({
      itemId,
      name,
      price,
      image,
      isVeg,
      quantity,
    });

    return NextResponse.json({
      message: "Add to cart successfully",
      addedItem,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Internal server error",
      error: String(error),
    });
  }
}

export async function GET(req: Request) {
  try {
    const carts = await Cart.find();

    return NextResponse.json(
      {
        message: "Carts fetched successfully",
        carts,
      },
      { status: 500 }
    );
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    const deletedCart = await Cart.findByIdAndDelete(id);
    if (!deletedCart) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error(error?.message);
  }
}
