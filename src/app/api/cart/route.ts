import { dbConnect } from "@/lib/dbConnect";
import Cart from "@/lib/models/Cart";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, price, image, isVeg, quantity } = await req.json();

    const addedItem = await Cart.create({
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
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error?.message,
      },
      { status: 500 }
    );
  }
}

