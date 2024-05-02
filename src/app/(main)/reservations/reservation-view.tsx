"use client";

import { useCallback, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteReservation } from "@/server/actions/reservation-action";
import { Listing, Reservation, User } from "@prisma/client";
import { toast } from "sonner";

import Container from "@/components/container";
import Heading from "@/components/heading";
import ListingCard from "@/components/listing-card";

type ReservationWithListing = Reservation & { listing: Listing };

interface IReservationsViewProps {
  reservations: ReservationWithListing[];
  currentUser?: User | null;
}
const ReservationsView: React.FC<IReservationsViewProps> = ({
  reservations = [],
  currentUser,
}) => {
  const [deletingId, setDeletingId] = useState("");
  const [isPending, startTranstion] = useTransition();
  const router = useRouter();

  const cancel = useCallback(async (id: string) => {
    setDeletingId(id);
    startTranstion(async () => {
      const { success, error } = await deleteReservation(id, "/reservations");
      if (success) {
        toast.success(success);
      }

      if (error) {
        toast.error(error);
      }
    });
  }, []);

  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Reservations on your properties"
        type="page"
      />
      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            disabled={deletingId === reservation.id}
            currentUser={currentUser}
            actionId={reservation.id}
            action={cancel}
            actionLabel={"Cancel guest reservation"}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsView;
