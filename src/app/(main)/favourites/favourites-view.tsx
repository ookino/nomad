"use client";

import { Listing, User } from "@prisma/client";

import Container from "@/components/container";
import Heading from "@/components/heading";
import ListingCard from "@/components/listing-card";

interface IReservationsViewProps {
  favourites: Listing[];
  currentUser?: User | null;
}
const FavouritesView: React.FC<IReservationsViewProps> = ({
  favourites = [],
  currentUser,
}) => {
  return (
    <div className="mt-4">
      <Container>
        <Heading
          title="Favourites"
          subtitle="Trips you want to go on"
          type="page"
        />
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {favourites.map((favourite) => (
            <ListingCard
              key={favourite.id}
              data={favourite}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default FavouritesView;
