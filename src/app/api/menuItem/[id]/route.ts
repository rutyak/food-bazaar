import { dbConnect } from "@/lib/dbConnect";
import MenuItem from "@/lib/models/MenuItem";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: any) {

  try {
    await dbConnect();

    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "Id required" }, { status: 400 });
    }

    const body = await req.json();

    const menuItem = await MenuItem.findByIdAndUpdate(id, body, {
      new: true,
    });

    return NextResponse.json(
      { message: "Menu updated successfully", menuItem },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }: any) {
  try {
    await dbConnect();

    const { id } = params;
    
    if (!id) {
      return NextResponse.json({ message: "Id required" }, { status: 400 });
    }

    await MenuItem.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "MenuItem deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
