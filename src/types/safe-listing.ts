import { Listing } from "@prisma/client";

export type SafeListing = Omit<Listing, "createdAt"> & {
  creaatedAt: string;
};
