import * as z from "zod";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { createJobSchema } from "@/schemas";
import { NextResponse } from "next/server";

export async function create(
  values: z.infer<typeof createJobSchema>,
  req: Request
) {
  const validatedFields = createJobSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }
  const user = await currentUser();

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
    //   locationType,
    //   salary,
    //   type,
    //   author,
    //   location,
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
