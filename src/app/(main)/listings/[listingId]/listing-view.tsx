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
import { createReservation } from "@/server/actions/reservation-action";
import { Listing, Reservation, User } from "@prisma/client";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { DateRange } from "react-day-picker";
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
  from: new Date(),
  to: new Date(),
  // key: "selection",
};
const ListingView: React.FC<IListingViewProps> = ({
  listing,
  currentUser,
  reservations = [],
}) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [totalPrice, setTotalPrice] = useState(listing.price);
  // const [dateRange, setDateRange] = useState<Range>(initialDateRange);
  const [range, setRange] = useState<DateRange>(initialDateRange);

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
      const { success, error } = await createReservation({
        listingId: listing.id,
        totalPrice,
        startDate: range?.from,
        endDate: range?.to,
      });
      if (success) {
        toast.success(success);
        setRange(initialDateRange);
        router.push("/trips");
        router.refresh();
      }
      if (error) {
        toast.error(error || "Error creating reservation");
      }
    });
  }, [range?.to, range?.from, router, totalPrice, listing.id]);

  useEffect(() => {
    if (range?.to && range.from) {
      const dayCount = differenceInCalendarDays(range.to, range.from);
      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [range, listing.price]);

  const category = useMemo(() => {
    return CATEGORIES.find((item) => item.label === listing.category);
  }, [listing.category]);
  return (
    <Container>
      <div className="mx-auto mt-8 max-w-screen-lg">
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
                loading={isPending}
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setRange(value)}
                dateRange={range}
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
