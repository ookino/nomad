import { Suspense } from "react";
import { getListingsByUserId } from "@/server/actions/listing-action";
import { getReservations } from "@/server/actions/reservation-action";

import { getCurrentUser } from "@/lib/auth-helpers";
import { LoginDialog } from "@/components/auth/login-dialog";
import EmptyState from "@/components/empty-state";
import ListingsSkeleton from "@/components/listings-skeleton";
import RentalDialog from "@/components/rental-dialog";

import ReservationsView from "./reservation-view";

const ReservationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized, Please Login"
        subtitle={"Login"}
        actionDialog={<LoginDialog />}
      />
    );
  }

  const listings = await getListingsByUserId(currentUser.id);

  if (!listings) {
    return (
      <EmptyState
        title="No listing found"
        subtitle="You have not created any listing"
        actionDialog={<RentalDialog />}
      />
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No reservations found"
        subtitle={"You have no reservations on any of your properties"}
      />
    );
  }

  return (
    <Suspense fallback={<ListingsSkeleton />}>
      <ReservationsView reservations={reservations} currentUser={currentUser} />
    </Suspense>
  );
};

export default ReservationPage;
