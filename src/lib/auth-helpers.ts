import { auth } from "@/lib/auth";

export const currentUser = async () => {
  const session = await auth();
  console.log("hbjnkm", { user: session?.user });
  return session?.user;
};
