"use client";

import { create } from "domain";
import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CATEGORIES } from "@/constants";
import {
  CreateListingSchema,
  CreateListingType,
} from "@/schema/listing-schema";
import { createListing } from "@/server/actions/listing-action";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretLeft } from "@phosphor-icons/react";
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

import CategoryInput from "./category-input";
import Counter from "./counter";
import CountrySelect, { CountrySelectValue } from "./country-select";
import ImageUploader from "./image-uploader";
import TextEditor from "./text-editor/text-editor";
import { FormInput } from "./ui/custom-input";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface Props {}

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

const RentalDialog: React.FC<Props> = () => {
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
    defaultValues: {
      category: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      images: [],
      price: 1,
      title: "",
      description: "",
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
  const back = () => {
    setStep((value) => value - 1);
  };
  const next = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }
    return "Continue";
  }, [step]);

  const submit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Submit1", { data });
    if (step !== STEPS.PRICE) {
      next();
      return;
    }
    console.log("Submit2", { data });
    const { success, error, listing } = await createListing(data);
    console.log("Submit Response", { success, error, listing });

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
        <Button variant={"ghost"} className=" gap-2 border text-xs" size={"lg"}>
          List your home
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-lg">List your Home</DialogTitle>
        </DialogHeader>

        {step === STEPS.CATEGORY && (
          <div className="flex w-full flex-col gap-8">
            <div>
              <h1 className="text-xl font-semibold">
                Which of these best describes your place ?
              </h1>
              <p className="text-xs text-muted-foreground">Pick a category</p>
            </div>

            <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
              {CATEGORIES.map((item) => (
                <div key={item.label} className="col-span-1 text-sm capitalize">
                  <CategoryInput
                    onClick={(category) => setCustomValue("category", category)}
                    selected={category === item.label}
                    label={item.label}
                    icon={item.icon}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {step === STEPS.LOCATION && (
          <div className="flex w-full flex-col gap-8">
            <div>
              <h1 className="text-xl font-semibold">
                Where is your property located
              </h1>
              <p className="text-xs text-muted-foreground">
                Let guests find you
              </p>
            </div>

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
        )}

        {step === STEPS.INFO && (
          <div className="flex w-full flex-col gap-8">
            <div>
              <h1 className="text-xl font-semibold">
                {" "}
                Share details about your property
              </h1>
              <p className="text-xs text-muted-foreground">
                What amenities/facilities do you have
              </p>
            </div>

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
        )}

        {/* To Avoid Image Upload from re-mounting - we change the visibility with css */}
        <div
          className={cn(
            "w-full flex-col gap-8",
            step === STEPS.IMAGES ? "flex" : "hidden"
          )}
        >
          <div>
            <h1 className="text-xl font-semibold"> Add Photos of your place</h1>
            <p className="text-xs text-muted-foreground">
              Let your guest know what your place looks like
            </p>
          </div>

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

        {step === STEPS.DESCRIPTION && (
          <div className="flex w-full flex-col gap-8">
            <div>
              <h1 className="text-xl font-semibold">
                How would you describe your place ?
              </h1>
              <p className="text-xs text-muted-foreground">
                Let the description be short and sweet.
              </p>
            </div>

            <div className="flex w-full flex-col gap-4">
              <FormInput
                label="Title"
                id="title"
                register={register}
                errors={errors}
                required
              />

              <div>
                <Label>Description</Label>
                <TextEditor
                  value={description}
                  onChange={(value) => setCustomValue("description", value)}
                />
              </div>
            </div>
          </div>
        )}

        {step === STEPS.PRICE && (
          <div className="flex w-full flex-col gap-8">
            <div>
              <h1 className="text-xl font-semibold">Set your price</h1>
              <p className="text-xs text-muted-foreground">
                How much do you charge per night
              </p>
            </div>

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
        )}

        <DialogFooter>
          {step !== STEPS.CATEGORY && (
            <Button
              className=""
              size={"lg"}
              variant={"secondary"}
              onClick={back}
            >
              <CaretLeft weight="bold" />
            </Button>
          )}

          <Button className="w-full" size={"lg"} onClick={handleSubmit(submit)}>
            {actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RentalDialog;
