import { getListingById } from "@/server/actions/listing-action";
import { getReservations } from "@/server/actions/reservation-action";
import { User } from "@prisma/client";

import { getCurrentUser } from "@/lib/auth-helpers";
import EmptyState from "@/components/empty-state";

import ListingView from "./listing-view";

interface IParams {
  listingId: string;
}
const ListingPage = async ({ params }: { params: IParams }) => {
  const listing = await getListingById(params.listingId);
  const reservations = await getReservations({
    listingId: params.listingId,
  });
  const currentUser = await getCurrentUser();

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingView
      listing={listing}
      currentUser={currentUser as User}
      reservations={reservations}
    />
  );
};

export default ListingPage;
