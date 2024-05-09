"use client";

import { logout } from "@/server/actions/logout-action";
import { SignOut } from "@phosphor-icons/react";

import { Button } from "./ui/button";

export function LogoutButton() {
  function onClick() {
    logout();
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
