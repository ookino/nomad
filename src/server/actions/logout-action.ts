"use server";

import { redirect } from "next/navigation";

import { signOut } from "@/lib/auth";

export async function logout(path: string) {
  await signOut();
  redirect(path);
}
