import React, { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { addLike, removeLike } from "@/server/actions/favourite-action";
import { User } from "@prisma/client";
import { toast } from "sonner";

interface IUseFavourite {
  listingId: string;
  currentUser?: User | null;
}

const useFavourite = ({ listingId, currentUser }: IUseFavourite) => {
  const router = useRouter();

  const hasFavourite = useMemo(() => {
    const list = currentUser?.favouriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavourite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) {
        toast.error("You must be logged in to like listings");
        return;
      }
      try {
        let status;
        if (hasFavourite) {
          status = await removeLike(listingId);
        } else {
          status = await addLike(listingId);
        }
        router.refresh();
        toast.success(status.success);
      } catch (error) {
        toast.error("Something went wrong, please try again later");
      }
    },
    [listingId, currentUser, router, hasFavourite]
  );

  return { hasFavourite, toggleFavourite };
};

export default useFavourite;
