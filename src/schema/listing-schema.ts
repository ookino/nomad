import { z } from "zod";

export const CreateListingSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  images: z.string().array(),
  category: z.string(),
  location: z.any().nullable(),
  roomCount: z.number(),
  guestCount: z.number(),
  bathroomCount: z.number(),
});

export type CreateListingType = z.infer<typeof CreateListingSchema>;
