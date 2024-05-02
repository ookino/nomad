import { getListings } from "@/server/actions/listing-action";

import { getCurrentUser } from "@/lib/auth-helpers";
import EmptyState from "@/components/empty-state";
import RentalDialog from "@/components/rental-dialog";

import PropertiesView from "./properties-view";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized, Please Login" />;
  }

  const listings = await getListings({
    userId: currentUser.id,
  });

  if (listings.length === 0) {
    return (
      <div>
        <EmptyState
          title="No Properties found"
          subtitle="Looks like you haven't created any properties"
          actionDialog={<RentalDialog />}
        />
      </div>
    );
  }

  return <PropertiesView listings={listings} currentUser={currentUser} />;
};

export default PropertiesPage;
