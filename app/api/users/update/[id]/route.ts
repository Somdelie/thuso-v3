import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const loggedInUser = await currentUser();

  if (loggedInUser?.role !== "ADMIN") {
    return NextResponse.json({ message: "Invalid method" }, { status: 400 });
  }
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

    // Parse the JSON body of the request
    const body = await req.json();

    // Update the user in the database
    const updatedUser = await db.user.update({
      where: { id },
      data: { ...body },
    });

    if (updatedUser) {
      // console.log("User updated:", updatedUser);
      revalidatePath("/admin");
      return NextResponse.json(
        {
          message: "User updated successfully!",
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to update user" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
