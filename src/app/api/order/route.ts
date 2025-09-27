import Order from "@/lib/models/Order";
import { CartType } from "@/types/cart";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const orders: CartType[] = await req.json();

    console.log("cart in order api: ", orders);

    if (!Array.isArray(orders) || orders.length === 0) {
      return NextResponse.json(
        { message: "orders must be a non-empty array" },
        { status: 400 }
      );
    }

    const allOrders = await Order.create({ items: orders });

    return NextResponse.json({
      message: "Order created successfully",
      allOrders,
    });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
