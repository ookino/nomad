"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useTransition,
} from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/constants";
import { createReservation } from "@/server/actions/reservation";
import { Listing, Reservation, User } from "@prisma/client";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { Range } from "react-date-range";
import { toast } from "sonner";

import Container from "@/components/container";

import ListingHeader from "./listing-header";
import ListingInfo from "./listing-info";
import ListingReservation from "./listing-reservation";

interface IListingViewProps {
  listing: Listing & { user: User };
  reservations?: Reservation[];
  currentUser: User;
}

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};
const ListingView: React.FC<IListingViewProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];
    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  const handleCreateReservation = useCallback(async () => {
    startTransition(async () => {
      if (!currentUser) {
        toast.error("Login to make a reservation");
      }
      const { success, error } = await createReservation({
        listingId: listing.id,
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      });
      if (success) {
        toast.success(success);
        setDateRange(initialDateRange);
        //redirect to trips
        router.refresh();
      }
      if (error) {
        toast.error(error || "Error creating reservation");
      }
    });
  }, [
    currentUser,
    dateRange.endDate,
    dateRange.startDate,
    router,
    totalPrice,
    listing.id,
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const category = useMemo(() => {
    return CATEGORIES.find((item) => item.label === listing.category);
  }, [listing.category]);
  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <ListingHeader
            title={listing.title}
            images={listing.images}
            locationValue={listing.location}
            id={listing.id}
            currentUser={currentUser}
          />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.location}
            />

            <div className=" order-first mb-10  md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={handleCreateReservation}
                disabled={isPending}
                disabledDates={disabledDates}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingView;
