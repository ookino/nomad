"use client";

import { List, UserCircle } from "@phosphor-icons/react";
import { useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LoginDialog } from "./auth/login-dialog";
import RentalDialog from "./rental-dialog";
import { Button } from "./ui/button";

const UserMenu = () => {
  const session = useSession();
  console.log({ session });
  return (
    <div className="flex gap-2">
      {session.data && <RentalDialog />}

      {!session.data && <LoginDialog />}

      {session.data && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"secondary"}
              className=" gap-2 border px-2"
              size={"lg"}
            >
              <List weight="bold" className="hidden h-4 w-4 md:block" />
              <UserCircle weight="fill" className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="mr-2 w-[200px]  text-xs shadow-sm sm:mr-4 md:mr-10 xl:mr-20"
            sideOffset={8}
          ></DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default UserMenu;
