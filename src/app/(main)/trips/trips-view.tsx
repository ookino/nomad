"use client";

import { useCallback, useState, useTransition } from "react";
import { deleteReservation } from "@/server/actions/reservation-action";
import { Listing, Reservation, User } from "@prisma/client";
import { toast } from "sonner";

import Container from "@/components/container";
import Heading from "@/components/heading";
import ListingCard from "@/components/listing-card";

type ReservationWithListing = Reservation & { listing: Listing };

interface ITripsViewProps {
  reservations: ReservationWithListing[];
  currentUser?: User | null;
}
const TripsView: React.FC<ITripsViewProps> = ({
  reservations = [],
  currentUser,
}) => {
  const [deletingId, setDeletingId] = useState("");
  const [isPending, startTranstion] = useTransition();

  const cancel = useCallback(async (id: string) => {
    setDeletingId(id);
    startTranstion(async () => {
      const { success, error } = await deleteReservation(id, "/trips");
      if (success) {
        toast.success(success);
      }

      if (error) {
        toast.error(error);
      }

      setDeletingId("");
    });
  }, []);

  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you are on your way to"
        type="page"
      />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {reservations.map((reservation) => (
          <ListingCard
            loading={isPending && reservation.id === deletingId}
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            action={cancel}
            disabled={deletingId === reservation.id}
            actionLabel={"Cancel reservation"}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default TripsView;
