"use server";

import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/auth-helpers";
import db from "@/lib/db";

export async function addLike(listingId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/");
  }
  try {
    if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid listing");
    }

    const likedIds = [...(currentUser.favouriteIds || [])];

    likedIds.push(listingId);

    await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favouriteIds: likedIds,
      },
    });

    return { success: "Listing added to Favourite list" };
  } catch (error) {
    return { error: "Could not add listing to favourite list" };
  }
}

export async function removeLike(listingId: string) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    redirect("/");
  }
  try {
    if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid listing");
    }

    let likedIds = [...(currentUser.favouriteIds || [])];

    likedIds = likedIds.filter((id) => id !== listingId);

    await db.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        favouriteIds: likedIds,
      },
    });

    return { success: "Listing removed to Favourite list" };
  } catch (error) {
    return { error: "Could not remove listing from favourite list" };
  }
}
