import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
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

    const { title, locationType, salary, type, author, location, description } =
      await req.json();

    // return NextResponse.json({
    //   user,
    //   title,
    //   description,
    // });

    const newJob = await db.job.create({
      data: {
        title,
        locationType,
        salary,
        type,
        author,
        location,
        description,
        authorEmail: user.email,
      },
    });
    return NextResponse.json(newJob);
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong!" });
  }
}
