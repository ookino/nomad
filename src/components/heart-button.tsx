"use client";

import { Heart } from "@phosphor-icons/react";
import { User } from "@prisma/client";

import { cn } from "@/lib/utils";
import useFavourite from "@/hooks/useFavourite";

interface HeartButtonProps {
  listingId: string;
  currentUser?: User | null;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
}) => {
  const { hasFavourite, toggleFavourite } = useFavourite({
    listingId,
    currentUser,
  });

  return (
    <div
      className="hover relative:opacity-80 cursor-pointer transition"
      onClick={toggleFavourite}
    >
      <Heart className={cn("absolute  h-6 w-6 fill-background")} />

      <Heart
        weight={"fill"}
        className={cn(
          "h-6 w-6",
          hasFavourite ? "fill-rose-600" : "fill-muted-foreground/50"
        )}
      />
    </div>
  );
};

export default HeartButton;

// the below code
