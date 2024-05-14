"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/constants";
import { updateListing } from "@/server/actions/listing-action";
import {
  Bed,
  CaretLeft,
  CaretRight,
  ClipboardText,
  Images,
  MapPin,
  Money,
  PencilSimple,
  SquaresFour,
} from "@phosphor-icons/react";
import { Listing } from "@prisma/client";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CategoryInput from "./category-input";
import Counter from "./counter";
import CountrySelect, { CountrySelectValue } from "./country-select";
import ImageUploader from "./image-uploader";
import TextEditor from "./text-editor/text-editor";
import { FormInput } from "./ui/custom-input";
import { Label } from "./ui/label";

interface Props {
  listing: Listing;
}

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const UpdateRentalDialog: React.FC<Props> = ({ listing }) => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    // defaultValues: {
    //   category: listing.category,
    //   location: listing.location,
    //   guestCount: listing.guestCount,
    //   roomCount: listing.roomCount,
    //   bathroomCount: listing.bathroomCount,
    //   images: listing.images,
    //   price: listing.price,
    //   title: listing.title,
    //   description: listing.description,
    // },
    values: {
      category: listing.category,
      location: listing.location,
      guestCount: listing.guestCount,
      roomCount: listing.roomCount,
      bathroomCount: listing.bathroomCount,
      images: listing.images,
      price: listing.price,
      title: listing.title,
      description: listing.description,
    },
  });

  const category = watch("category");
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const images = watch("images");
  const description = watch("description");

  const Map = useMemo(
    () => dynamic(() => import("./map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const setCustomValue = (
    id: string,
    value: string | number | string[] | CountrySelectValue
  ) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };
  const router = useRouter();

  const submit: SubmitHandler<FieldValues> = async (data) => {
    const { success, error } = await updateListing(data, listing.id);

    if (success) {
      toast.success(success);
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY);
      setOpen(false);
    }

    if (error) {
      toast.error(error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant={"secondary"} size={"sm"} className="w-full border">
          <PencilSimple weight="bold" />
        </Button>
      </DialogTrigger>
      <DialogContent className="z-[100] sm:max-w-[600px]">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-lg">Edit Listing</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue={STEPS.CATEGORY.toString()}>
          <TabsList className="mb-4">
            <TabsTrigger value={STEPS.CATEGORY.toString()}>
              <SquaresFour weight="bold" className=" h-4  w-4 lg:hidden" />
              <span className="hidden  lg:block">Category</span>
            </TabsTrigger>
            <TabsTrigger value={STEPS.LOCATION.toString()}>
              <MapPin weight="bold" className=" h-4  w-4 lg:hidden" />
              <span className="hidden  lg:block">Location</span>
            </TabsTrigger>
            <TabsTrigger value={STEPS.INFO.toString()}>
              {" "}
              <Bed weight="bold" className=" h-4  w-4 lg:hidden" />
              <span className="hidden  lg:block">Amenities</span>
            </TabsTrigger>
            <TabsTrigger value={STEPS.IMAGES.toString()}>
              {" "}
              <Images weight="bold" className=" h-4  w-4 lg:hidden" />
              <span className="hidden  lg:block">Images</span>
            </TabsTrigger>
            <TabsTrigger value={STEPS.DESCRIPTION.toString()}>
              <ClipboardText weight="bold" className=" h-4  w-4 lg:hidden" />
              <span className="hidden  lg:block">Description</span>
            </TabsTrigger>
            <TabsTrigger value={STEPS.PRICE.toString()}>
              {" "}
              <Money weight="bold" className=" h-4 w-4 lg:hidden" />
              <span className="hidden  lg:block">Price</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value={STEPS.CATEGORY.toString()} className="w-full">
            <div className="flex w-full flex-col gap-8">
              <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
                {CATEGORIES.map((item) => (
                  <div
                    key={item.label}
                    className="col-span-1 text-sm capitalize"
                  >
                    <CategoryInput
                      onClick={(category) =>
                        setCustomValue("category", category)
                      }
                      selected={category === item.label}
                      label={item.label}
                      icon={item.icon}
                    />
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value={STEPS.LOCATION.toString()}>
            <div className="flex w-full flex-col gap-8">
              <div className="z-[100]">
                <CountrySelect
                  value={location}
                  onChange={(value) => setCustomValue("location", value)}
                />
              </div>

              <div className=" z-0">
                <Map center={location?.latlng} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value={STEPS.INFO.toString()}>
            <div className="flex w-full flex-col gap-8">
              <div className="flex w-full flex-col gap-12 pb-8">
                <Counter
                  title="Guests"
                  subtitle="Maximum number of guests allowed "
                  value={guestCount}
                  onChange={(value) => setCustomValue("guestCount", value)}
                />
                <Counter
                  title="Rooms"
                  subtitle="How many rooms do you have"
                  value={roomCount}
                  onChange={(value) => setCustomValue("roomCount", value)}
                />
                <Counter
                  title="Bathroom"
                  subtitle="Maximum number of guests allowed "
                  value={bathroomCount}
                  onChange={(value) => setCustomValue("bathroomCount", value)}
                />
              </div>
            </div>
          </TabsContent>
          <TabsContent value={STEPS.IMAGES.toString()}>
            {/* To Avoid Image Upload from re-mounting - we change the visibility with css */}
            <div className={cn("flex w-full flex-col gap-8")}>
              <div className="flex w-full flex-col gap-4">
                <ImageUploader
                  onChange={(value) => setCustomValue("images", value)}
                  value={images}
                />

                {images.length > 0 && (
                  <div className="w-full ">
                    <Carousel className="w-full">
                      <CarouselContent>
                        {images.map((link: string, index: number) => (
                          <CarouselItem key={index + link}>
                            <div className="rounded-lg border border-dashed p-1">
                              <Image
                                width={50}
                                height={50}
                                src={link}
                                alt={link + index}
                                className="h-56 w-full rounded-md object-cover"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>

                      <div className="mt-2 flex gap-2">
                        <CarouselPrevious />
                        <CarouselNext />
                      </div>
                    </Carousel>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
          <TabsContent value={STEPS.DESCRIPTION.toString()}>
            <div className="flex w-full flex-col gap-8">
              <div className="flex w-full flex-col gap-4">
                <FormInput
                  label="Title"
                  id="title"
                  register={register}
                  errors={errors}
                  required
                />

                <div className="flex w-full flex-col gap-2">
                  <Label>Description</Label>
                  <TextEditor
                    value={description}
                    onChange={(value) => setCustomValue("description", value)}
                  />
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value={STEPS.PRICE.toString()}>
            <div className="flex w-full flex-col gap-8">
              <div className="flex w-full flex-col gap-4">
                <FormInput
                  label="Price"
                  id="price"
                  type="number"
                  register={register}
                  formatPrice
                  errors={errors}
                  required
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="flex flex-row gap-2">
          <Button
            className="w-full gap-4"
            size={"lg"}
            onClick={handleSubmit(submit)}
          >
            Update
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateRentalDialog;
