"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Listing } from "@prisma/client";
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
    return { error: "Could not create listing" };
  }
}

export interface IGetListingsPayload {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}
export async function getListings(params: IGetListingsPayload) {
  const {
    userId,
    guestCount,
    roomCount,
    bathroomCount,
    startDate,
    endDate,
    locationValue,
    category,
  } = params;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const query: any = {};

  if (userId) {
    query.userId = userId;
  }

  if (category) {
    query.category = category;
  }

  if (roomCount) {
    query.roomCount = {
      gte: +roomCount,
    };
  }

  if (bathroomCount) {
    query.bathroomCount = {
      gte: +bathroomCount,
    };
  }

  if (guestCount) {
    query.guestCount = {
      gte: +guestCount,
    };
  }

  if (locationValue) {
    query.location = locationValue;
  }

  if (startDate && endDate) {
    query.NOT = {
      reservations: {
        some: {
          OR: [
            {
              startDate: {
                lte: startDate,
              },
              endDate: {
                gte: endDate,
              },
            },
            {
              startDate: {
                gte: startDate,
              },
              endDate: {
                lte: endDate,
              },
            },
          ],
        },
      },
    };
  }

  try {
    const listings = await db.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (error: unknown) {
    throw new Error("Something went wrong while getting listings");
  }
}

export async function getListingsByUserId(userId: string) {
  try {
    const listings = await db.listing.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return listings;
  } catch (error: unknown) {
    throw new Error("Something went wrong while getting listings");
  }
}

export async function deleteListing(listingId: string, path: string) {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) {
      redirect("/");
    }

    if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid Id");
    }

    await db.listing.deleteMany({
      where: {
        id: listingId,
        userId: currentUser.id,
      },
    });

    revalidatePath(path);
    return { success: "Listing deleted" };
  } catch (error) {
    return { error: "Listing could not be deleted, try again later" };
  }
}

export async function getListingById(listingId: string) {
  try {
    const listing = await db.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return listing;

    // return { ...listing, createdAt: listing.createdAt.toISOString() };
  } catch (error: unknown) {
    throw new Error("Something went wrong while getting listings");
  }
}
