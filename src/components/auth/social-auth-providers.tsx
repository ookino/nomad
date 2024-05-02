import { OauthLogin } from "@/server/actions/create-session-action";

import { FacebookIcon } from "../icons/facebook-icon";
import { GithubIcon } from "../icons/github-icon";
import { GoogleIcon } from "../icons/google-icon";
import { Button } from "../ui/button";

export function SocialAuthenticationProvider() {
  async function onClick(provider: "google" | "facebook" | "github") {
    try {
      await OauthLogin(provider);
    } catch (error) {}
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
        <GoogleIcon className="h-4 w-4" />
      </Button>
      <Button
        size={"lg"}
        type="button"
        className="w-full gap-2 text-xs"
        variant={"outline"}
        onClick={() => onClick("github")}
      >
        <GithubIcon className="h-4 w-4" />
      </Button>
      <Button
        size={"lg"}
        type="button"
        className="w-full gap-2 text-xs"
        variant={"outline"}
        onClick={() => onClick("google")}
      >
        <FacebookIcon className="h-4 w-4" />
      </Button>
    </div>
  );
}
