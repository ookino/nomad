"use client";

import { useCallback, useMemo } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Listing, Reservation, User } from "@prisma/client";
import { format } from "date-fns";

import { rgbDataURL } from "@/lib/utils";
import useCountries from "@/hooks/useCountries";

import HeartButton from "./heart-button";
import { Button } from "./ui/button";

interface ListingCardProps {
  data: Listing;
  reservation?: Reservation;
  action?: (id: string) => void;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null;
  disabled?: boolean;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  reservation,
  action,
  actionId = "",
  actionLabel,
  currentUser,
  disabled,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.location);

  const handelCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      action?.(actionId);
    },
    [actionId, disabled, action]
  );

  const price = useMemo(() => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return data.price;
  }, [reservation, data.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/listings/${data.id}`)}
      className="group col-span-1 cursor-pointer"
    >
      <div className="flex w-full flex-col gap-0">
        <div className=" relative aspect-square w-full overflow-hidden rounded-lg">
          <Image
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
            quality={75}
            fill
            placeholder="blur"
            blurDataURL={rgbDataURL(119, 119, 119)}
            alt="listing"
            src={data.images[0]}
            className=" h-full w-full object-cover transition group-hover:scale-110"
          />

          <div className="absolute right-4 top-4">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="mt-3 text-sm font-medium">
          {location?.region}, {location?.label}
        </div>
        <div className="text-sm  text-muted-foreground">
          {reservationDate || data.category}
        </div>
        <div className="mt-2 flex items-center gap-1 text-sm">
          <div className="font-medium">$ {price}</div>
          {!reservation && (
            <div className=" font-normal text-muted-foreground">night</div>
          )}
        </div>

        {action && actionLabel && (
          <div className="mt-4 w-full">
            <Button
              size={"sm"}
              disabled={disabled}
              onClick={handelCancel}
              className="w-full"
            >
              {actionLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
