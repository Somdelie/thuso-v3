import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const users = await db.user.findMany(); // Fetch all users

    if (users) {
      console.log(users);
      return NextResponse.json(users);
    } else {
      return NextResponse.json(
        { message: "Failed to get users" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error getting users:", error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
