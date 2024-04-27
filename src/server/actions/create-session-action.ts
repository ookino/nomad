"use server";

import { signIn } from "@/lib/auth";

export async function createSession(email: string) {
  await signIn("resend", { email, redirectTo: "/yaseer" });
  return { success: "Check you email for link" };
}

export async function OauthLogin(provider: "github" | "google" | "facebook") {
  await signIn(provider);
}
