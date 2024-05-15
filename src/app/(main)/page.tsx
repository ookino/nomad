import { Suspense } from "react";
import {
  getListings,
  IGetListingsPayload,
} from "@/server/actions/listing-action";
import { Listing } from "@prisma/client";

import { getCurrentUser } from "@/lib/auth-helpers";
import Container from "@/components/container";
import EmptyState from "@/components/empty-state";
import ListingCard from "@/components/listing-card";
import ListingsSkeleton from "@/components/listings-skeleton";

interface IProps {
  searchParams: IGetListingsPayload;
}

export default async function Home({ searchParams }: IProps) {
  const listings = await getListings(searchParams);
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
      <Suspense fallback={<ListingsSkeleton />}>
        <Container>
          <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
            {listings.map((listing: Listing) => (
              <ListingCard key={listing.id} data={listing} currentUser={user} />
            ))}
          </div>
        </Container>
      </Suspense>
    </div>
  );
}
