"use client";

import Image from "next/image";
import { getListingById } from "@/server/actions/listing-action";
import { Listing, Reservation, User } from "@prisma/client";

import { getCurrentUser } from "@/lib/auth-helpers";
import useCountries from "@/hooks/useCountries";
import Container from "@/components/container";
import EmptyState from "@/components/empty-state";
import HeartButton from "@/components/heart-button";

interface IListingHeaderProps {
  title: string;
  images: string[];
  locationValue: string;
  id: string;
  currentUser: User;
}
const ListingHeader: React.FC<IListingHeaderProps> = ({
  title,
  images,
  locationValue,
  id,
  currentUser,
}) => {
  const { getByValue } = useCountries();
  const location = getByValue(locationValue);
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">{`${location?.region}, ${location?.label}`}</p>
      </div>

      <div className="relative h-[60vh] w-full overflow-hidden rounded-xl">
        <Image
          alt="Image"
          src={images[0]}
          fill
          className="w-full object-cover"
        />

        <div className="absolute right-5 top-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default ListingHeader;
