"use client";

import React from "react";
import { FingerprintSimple } from "@phosphor-icons/react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { LoginForm } from "./login-form";

export function LoginDialog() {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={"secondary"}
          className=" gap-2 border text-xs"
          size={"lg"}
        >
          <FingerprintSimple weight="bold" className="h-4 w-4" />
          Login
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="border-b pb-4">
          <DialogTitle>Login or Signup</DialogTitle>
        </DialogHeader>
        <div className="">
          <LoginForm />
        </div>
      </DialogContent>
    </Dialog>
  );
}
