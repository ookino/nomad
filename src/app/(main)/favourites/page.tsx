import { getFavouriteListing } from "@/server/actions/favourite-action";

import { getCurrentUser } from "@/lib/auth-helpers";
import { LoginDialog } from "@/components/auth/login-dialog";
import EmptyState from "@/components/empty-state";

import FavouritesView from "./favourites-view";

const FavouritesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized, Please Login"
        subtitle={""}
        actionDialog={<LoginDialog />}
      />
    );
  }

  const favourites = await getFavouriteListing();

  if (favourites.length === 0) {
    return (
      <EmptyState
        title="No favourites found"
        subtitle="You have not liked any listing"
      />
    );
  }

  return <FavouritesView favourites={favourites} currentUser={currentUser} />;
};

export default FavouritesPage;
