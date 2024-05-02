"use client";

import { useRouter } from "next/navigation";
import {
  CalendarDots,
  Heart,
  HouseLine,
  List,
  Path,
  UserCircle,
} from "@phosphor-icons/react";
import { useSession } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { LoginDialog } from "./auth/login-dialog";
import RentalDialog from "./rental-dialog";
import { Button } from "./ui/button";

const UserMenu = () => {
  const session = useSession();
  const router = useRouter();

  return (
    <div className="flex gap-2">
      {session.data && <RentalDialog />}

      {!session.data && <LoginDialog />}

      {session.data && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant={"secondary"}
              className=" gap-2 border px-2 py-2"
              size={"sm"}
            >
              <List weight="bold" className="hidden h-4 w-4 md:block" />
              <UserCircle weight="fill" className="h-6 w-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="mr-2 flex w-[200px] flex-col  py-2 text-xs shadow-sm sm:mr-4 md:mr-10 xl:mr-20"
            sideOffset={8}
          >
            <DropdownMenuItem
              className="gap-2 py-2 text-xs"
              onClick={() => router.push("/trips")}
            >
              <Path weight="duotone" className="gap-2 text-primary" /> Trips
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 py-2 text-xs"
              onClick={() => router.push("/favourites")}
            >
              <Heart weight="duotone" className=" text-primary " /> Favourites
            </DropdownMenuItem>
            <DropdownMenuItem
              className="gap-2 py-2 text-xs"
              onClick={() => router.push("/properties")}
            >
              <HouseLine weight="duotone" className="text-primary" /> Properties
            </DropdownMenuItem>

            <DropdownMenuItem
              className="gap-2 py-2 text-xs"
              onClick={() => router.push("/reservations")}
            >
              <CalendarDots weight="duotone" className="text-primary" />
              Reservations
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default UserMenu;
