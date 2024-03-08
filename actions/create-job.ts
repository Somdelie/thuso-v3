"use server";
import * as z from "zod";
import { db } from "@/lib/db";
import { createJobSchema } from "@/schemas";

export async function create(values: z.infer<typeof createJobSchema>) {
  const validatedFields = createJobSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { title, description, locationType, salary, type, location } =
    validatedFields.data;

  await db.job.create({
    data: {
      title,
      description,
      locationType,
      salary,
      type,
      location,
    },
  });
}
