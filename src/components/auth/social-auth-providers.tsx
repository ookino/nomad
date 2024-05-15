"use client";

import { useState, useTransition } from "react";
import { OauthLogin } from "@/server/actions/create-session-action";

import { FacebookIcon } from "../icons/facebook-icon";
import { GithubIcon } from "../icons/github-icon";
import { GoogleIcon } from "../icons/google-icon";
import { Beat } from "../loaders";
import { Button } from "../ui/button";

export function SocialAuthenticationProvider() {
  const [provider, setProvider] = useState("");
  const [isPending, startTransition] = useTransition();
  async function onClick(provider: "google" | "facebook" | "github") {
    setProvider(provider);
    startTransition(async () => {
      try {
        await OauthLogin(provider);
      } catch (error) {}
    });
  }
  return (
    <div className="flex w-full items-center gap-4">
      <Button
        type="button"
        size={"lg"}
        className="w-full gap-2 text-xs"
        variant={"outline"}
        onClick={() => onClick("google")}
      >
        {isPending && provider === "google" ? (
          <Beat alt />
        ) : (
          <GoogleIcon className="h-4 w-4" />
        )}
      </Button>
      <Button
        size={"lg"}
        type="button"
        className="w-full gap-2 text-xs"
        variant={"outline"}
        onClick={() => onClick("github")}
        disabled
      >
        {isPending && provider === "github" ? (
          <Beat alt />
        ) : (
          <GithubIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
