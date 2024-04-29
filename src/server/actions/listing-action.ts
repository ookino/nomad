"use server";

import { redirect } from "next/navigation";
import { FieldValues } from "react-hook-form";

import { getCurrentUser } from "@/lib/auth-helpers";
import db from "@/lib/db";

export async function createListing(data: FieldValues) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/");
  }
  try {
    const listing = await db.listing.create({
      data: {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        images: data.images,
        category: data.category,
        location: data.location.value,
        roomCount: data.roomCount,
        guestCount: data.guestCount,
        bathroomCount: data.bathroomCount,
        userId: user.id as string,
        //    user: {
        //      connect: {
        //        id: user.id,
        //      },
        //    },
      },
    });
    return { success: "This is the success", listing };
  } catch (error) {
    console.log(error);
    return { error: "Could not create listing" };
  }
}

export async function getListings() {
  try {
    const listings = await db.listing.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (error: unknown) {
    throw new Error("Something went wrong while getting listings");
  }
}
