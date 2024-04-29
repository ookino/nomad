"use server";

import { getCurrentUser } from "@/lib/auth-helpers";
import db from "@/lib/db";

export async function createReservation(data: any) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return { error: "Login to make a reservation" };
  }

  const { listingId, startDate, endDate, totalPrice } = data;
  console.log({ listingId, startDate, endDate, totalPrice });
  try {
    await db.listing.update({
      where: { id: listingId },
      data: {
        reservations: {
          create: {
            startDate,
            endDate,
            totalPrice,
            userId: currentUser.id,
          },
        },
      },
    });

    return { success: "Reservation successful " };
  } catch (error) {
    console.log(error);

    return { error: "Something went wrong, please try again later" };
  }
}

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export async function getReservations(params: IParams) {
  const { listingId, userId, authorId } = params;

  try {
    const query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query.authorId = { userId: authorId };
    }

    const reservations = await db.reservation.findMany({
      where: query,
      include: { listing: true },
      orderBy: {
        createdAt: "desc",
      },
    });

    return reservations;
  } catch (error) {
    console.log(error);

    throw new Error("Something went wrong, please try again later");
  }
}

//snaitize data
