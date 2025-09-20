import { dbConnect } from "@/lib/dbConnect";
import MenuItem from "@/lib/models/MenuItem";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

interface Params {
  params: { id: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    await dbConnect();

    const { id } = params;

    const menuItems = await MenuItem.aggregate([
      { $match: { restaurantId: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "restaurants",
          localField: "restaurantId",
          foreignField: "_id",
          as: "restaurant",
        },
      },
      { $group: { _id: "$category", items: { $push: "$$ROOT" } } },
      { $project: { category: "$_id", items: 1 } },
    ]);

    console.log("menuItems: ", menuItems);

    return NextResponse.json(
      { message: "Menu fetched successfully", menuItems },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({
      message: "Internal server error",
      error: String(error),
    });
  }
}
