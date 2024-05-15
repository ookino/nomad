"use client";

import { useCallback, useState, useTransition } from "react";
import { deleteListing } from "@/server/actions/listing-action";
import { Listing, User } from "@prisma/client";
import { toast } from "sonner";

import Container from "@/components/container";
import Heading from "@/components/heading";
import ListingCard from "@/components/listing-card";

interface IPropertiesViewProps {
  listings: Listing[];
  currentUser?: User | null;
}
const PropertiesView: React.FC<IPropertiesViewProps> = ({
  listings = [],
  currentUser,
}) => {
  const [deletingId, setDeletingId] = useState("");
  const [isPending, startTranstion] = useTransition();

  const cancel = useCallback(async (id: string) => {
    setDeletingId(id);
    startTranstion(async () => {
      const { success, error } = await deleteListing(id, "/properties");
      if (success) {
        toast.success(success);
      }

      if (error) {
        toast.error(error);
      }
    });
  }, []);

  return (
    <div className="mt-4">
      <Container>
        <Heading title="Properties" subtitle="Your listings" type="page" />
        <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {listings.map((listing) => (
            <ListingCard
              loading={isPending}
              key={listing.id}
              data={listing}
              actionId={listing.id}
              action={cancel}
              disabled={deletingId === listing.id}
              actionLabel={"Remove property"}
              currentUser={currentUser}
              editable
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default PropertiesView;
