import * as z from "zod";
import { getUserById } from "@/data/user";
import { db } from "@/lib/db";
import { EditUserSchema } from "@/schemas";
import { currentUser } from "@/lib/auth";

export const editUser = async (
  userId: string,
  values: z.infer<typeof EditUserSchema>
) => {
  // Check if the user performing the action is an admin
  const user = await currentUser();

  if (user?.role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(userId);

  if (!dbUser) {
    return { error: "User not found" };
  }

  // Update the user with the allowed fields
  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "User updated successfully" };
};

export const getUsers = async () => {
  const users = await db.user.findMany({
    where: { isAproved: true },
    orderBy: { createdAt: "desc" },
  });

  console.log(users);
};
