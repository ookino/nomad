/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { revalidatePath } from "next/cache";

import { getCurrentUser } from "@/lib/auth-helpers";
import db from "@/lib/db";

export async function createReservation(data: any) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return { error: "Login to make a reservation" };
  }

  const { listingId, startDate, endDate, totalPrice } = data;

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
    return { error: "Something went wrong, please try again later" };
  }
}

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
  reservationId?: string;
}

export async function getReservations(params: IParams) {
  const { listingId, userId, authorId } = params;

  try {
    let query: any = {};

    if (listingId) {
      query.listingId = listingId;
    }

    if (userId) {
      query.userId = userId;
    }

    if (authorId) {
      query = {
        listing: {
          userId: authorId,
        },
      };
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

export async function deleteReservation(reservationId: string, path: string) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return { error: "Login to make a reservation" };
    }
    if (!reservationId || typeof reservationId !== "string") {
      return { error: "Invalid Id" };
    }
    await db.reservation.deleteMany({
      where: {
        id: reservationId,
        OR: [
          {
            userId: currentUser.id,
          },
          {
            listing: { userId: currentUser.id },
          },
        ],
      },
    });
    revalidatePath(path);
    return { success: "Reservation deleted" };
  } catch (error) {
    return { error: "Couldn't delete reservation" };
  }
}

//snaitize data
