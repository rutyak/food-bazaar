import { dbConnect } from "@/lib/dbConnect";
import Cart from "@/lib/models/Cart";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const { itemId, name, price, image, isVeg, quantity } = await req.json();

    if (!itemId || !name || !price || !image || !quantity) {
      return NextResponse.json(
        { message: "All fields required" },
        { status: 400 }
      );
    }

    let addedItem;
    const existingCart = await Cart.findOne({ itemId });

    if (existingCart) {
      existingCart.quantity += quantity;
      addedItem = await existingCart.save();
    } else {
      addedItem = await Cart.create({
        itemId,
        name,
        price,
        image,
        isVeg,
        quantity,
      });
    }

    return NextResponse.json(
      {
        message: "Add to cart successfully",
        addedItem,
      },
      { status: 201 }
    );
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
