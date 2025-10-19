import { dbConnect } from "@/lib/dbConnect";
import MenuItem from "@/lib/models/MenuItem";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();

    const menuItems = await req.json();

    const addedMenuItems = [];

    for (let item of menuItems) {
      const {
        restaurantId,
        name,
        description,
        price,
        image,
        category,
        isVeg,
        rating,
      } = item;

      if (
        !restaurantId ||
        !name ||
        !description ||
        !price ||
        !image ||
        !category ||
        !rating
      ) {
        return NextResponse.json({ message: "All fields required" });
      }

      let addedmenuItem = await MenuItem.create({
        restaurantId,
        name,
        description,
        price,
        image,
        category,
        isVeg,
        rating,
      });

      addedMenuItems.push(addedmenuItem);
    }

    return NextResponse.json(
      {
        message: "Menu items added successfully",
        menuItem: addedMenuItems,
      },
      { status: 201 }
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

export async function GET(req: Request) {
  try {
    await dbConnect();

    const allMenu = await MenuItem.aggregate([
      {
        $lookup: {
          from: "restaurants",
          localField: "restaurantId",
          foreignField: "_id",
          as: "restaurant",
        },
      },
      { $unwind: "$restaurant" },

      //group by restaurant and category
      {
        $group: {
          _id: { restaurantId: "$restaurantId", category: "$category" },
          items: { $push: "$$ROOT" },
          restaurant: { $first: "$restaurant" },
        },
      },

      // group by restaurantId
      {
        $group: {
          _id: "$_id.restaurantId",
          restaurant: { $first: "$restaurant" },
          categories: {
            $push: {
              category: "$_id.category",
              items: "$items",
            },
          },
        },
      },

      {
        $project: {
          restaurantId: "$_id",
          restaurant: 1,
          categories: 1,
        },
      },
    ]);

    return NextResponse.json({ message: "Menu fetched successfully", allMenu });
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
