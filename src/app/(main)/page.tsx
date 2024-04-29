import { getListings } from "@/server/actions/listing-action";
import { Listing } from "@prisma/client";

import { auth } from "@/lib/auth";
import { getCurrentUser } from "@/lib/auth-helpers";
import Container from "@/components/container";
import EmptyState from "@/components/empty-state";
import ListingCard from "@/components/listing-card";

export default async function Home() {
  const listings = await getListings();
  const user = await getCurrentUser();

  if (listings.length === 0) {
    return (
      <div>
        <EmptyState showReset />
      </div>
    );
  }

  return (
    <div className="w-full flex-col gap-4">
      <Container>
        <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {listings.map((listing: Listing) => (
            <ListingCard key={listing.id} data={listing} currentUser={user} />
          ))}
        </div>
      </Container>
    </div>
  );
}
