import { getReservations } from "@/server/actions/reservation-action";

import { getCurrentUser } from "@/lib/auth-helpers";
import EmptyState from "@/components/empty-state";

import TripsView from "./trips-view";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized, Please Login" />;
  }

  const reservations = await getReservations({
    userId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <div>
        <EmptyState
          title="No Trips found"
          subtitle="Looks like you haven't reserved any trips"
        />
      </div>
    );
  }

  return <TripsView reservations={reservations} currentUser={currentUser} />;
};

export default TripsPage;
