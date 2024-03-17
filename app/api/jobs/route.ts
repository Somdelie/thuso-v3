import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const user = await currentUser();
  // console.log(user);

  try {
    if (!user?.email) {
      return NextResponse.json(
        { message: "Log in to continue" },
        { status: 401 }
      );
    }

    const { title, locationType, salary, type, location, description } =
      await req.json();

    const newJob = await db.job.create({
      data: {
        title,
        locationType,
        salary,
        type,
        // author: user.id, // Assuming author is stored as id in your database
        location,
        description,
        authorEmail: user.email,
      },
    });

    // Check if newJob is successfully created
    if (newJob) {
      return NextResponse.json({ message: "Job created successfully!" });
    } else {
      return NextResponse.json(
        { message: "Failed to create job" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}
