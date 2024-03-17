import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Extract the 'id' parameter from the URL path
    const id = req.url.split("/").pop();

    // Check if id is present
    if (!id) {
      return NextResponse.json(
        { message: "ID parameter is missing" },
        { status: 400 }
      );
    }

    const user = await db.user.findUnique({
      where: { id },
    });

    if (user) {
      console.log(user);
      return NextResponse.json(user);
    } else {
      return NextResponse.json(
        { message: "Failed to get user" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error getting user:", error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
