"use client";

import dynamic from "next/dynamic";
import { Bathtub, Bed, Icon, Users } from "@phosphor-icons/react";
import { User } from "@prisma/client";

import useCountries from "@/hooks/useCountries";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

import ListingCategory from "./listing-category";

const Map = dynamic(() => import("@/components/map"), { ssr: false });
interface IListingInfoProps {
  user: User;
  category:
    | {
        icon: Icon;
        label: string;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
}
const ListingInfo: React.FC<IListingInfoProps> = ({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  locationValue,
  category,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="gap col-span-4 flex w-full flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="mt-4 flex flex-row items-center  gap-2 font-medium ">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.image || ""} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div>Hosted by {user?.name}</div>
        </div>
        <Separator className="my-4" />
        <div className="flex flex-row items-center gap-4 px-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users weight="bold" className="h-6 w-6" />{" "}
            <span>{guestCount} guests</span>
          </div>
          <div className="flex items-center gap-2">
            <Bed weight="bold" className="h-6 w-6" />{" "}
            <span>{roomCount} rooms</span>
          </div>
          <div className="flex items-center gap-2">
            <Bathtub weight="bold" className="h-6 w-6" />{" "}
            <span>{bathroomCount} bathrooms</span>
          </div>
        </div>

        <Separator className="my-4" />
        {category && <ListingCategory {...category} />}
        <Separator className="my-4" />

        <div
          dangerouslySetInnerHTML={{ __html: description }}
          className="editorOutput text-sm text-secondary-foreground"
        />
        <Separator className="my-4" />

        <Map center={coordinates} />
      </div>
    </div>
  );
};

export default ListingInfo;
