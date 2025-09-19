import { dbConnect } from "@/lib/dbConnect";
import MenuItem from "@/lib/models/MenuItem";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await dbConnect();
    console.log("connection established");

    const menuItems = await req.json();

    const addedMenuItems = [];

    for (let item of menuItems) {
      const { restaurantId, name, description, price, image, category, isVeg } =
        item;

      if (
        !restaurantId ||
        !name ||
        !description ||
        !price ||
        !image ||
        !category
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
