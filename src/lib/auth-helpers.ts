import { auth } from "@/lib/auth";

import db from "./db";

export const getCurrentUser = async () => {
  const session = await auth();

  // if (!session?.user) {
  //   throw new Error("Something went wrong - User session not valid");
  // }

  try {
    const user = await db.user.findUnique({
      where: {
        id: session?.user?.id,
      },
    });

    if (!user) {
      throw new Error("Something went wrong - User not found");
    }

    return user;
  } catch (error) {}
};
