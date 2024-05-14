"use client";

import { usePathname, useRouter } from "next/navigation";
import { logout } from "@/server/actions/logout-action";
import { SignOut } from "@phosphor-icons/react";

import { Button } from "./ui/button";

export function LogoutButton() {
  const router = useRouter();
  const path = usePathname();

  async function onClick() {
    await logout(path);
  }

  return (
    <Button
      variant={"secondary"}
      size={"sm"}
      onClick={onClick}
      className="w-full"
    >
      <SignOut weight="bold" className="h-4 w-4" />
    </Button>
  );
}
