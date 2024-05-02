/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { CaretLeft } from "@phosphor-icons/react";
import { formatISO } from "date-fns";
import qs from "query-string";
import { Range } from "react-date-range";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Calendar from "./calendar";
import Counter from "./counter";
import CountrySelect, { CountrySelectValue } from "./country-select";
import Heading from "./heading";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

export function SearchDialog({ trigger }: { trigger: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(STEPS.LOCATION);
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [location, setLocation] = useState<CountrySelectValue>();

  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const params = useSearchParams();

  const Map = useMemo(
    () => dynamic(() => import("./map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );
  console.log("location:", location);
  const router = useRouter();

  const back = useCallback(() => {
    setStep((value) => value - 1);
  }, []);
  const next = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const submit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return next();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = qs.parse(params.toString());

      const updatedQuery: any = {
        ...currentQuery,
        locationValue: location?.value,
        guestCount,
        roomCount,
        bathroomCount,
      };

      if (dateRange.startDate) {
        updatedQuery.startDate = formatISO(dateRange.startDate);
      }

      if (dateRange.endDate) {
        updatedQuery.endDate = formatISO(dateRange.endDate);
      }

      const url = qs.stringifyUrl(
        {
          url: "/",
          query: updatedQuery,
        },
        { skipNull: true }
      );

      setStep(STEPS.LOCATION);
      router.replace(url);
      setOpen(false);
    }
  }, [
    step,
    roomCount,
    guestCount,
    bathroomCount,
    dateRange,
    next,
    params,
    router,
    location?.value,
  ]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader className="border-b pb-4">
          <DialogTitle>Filter</DialogTitle>
        </DialogHeader>

        {step === STEPS.LOCATION && (
          <div className=" flex flex-col gap-8">
            <Heading title="Where do you want to go" />
            <CountrySelect
              value={location}
              onChange={(value) => setLocation(value)}
            />
            <Separator />

            <div className=" z-0">
              <Map center={location?.latlng} />
            </div>
          </div>
        )}

        {step === STEPS.DATE && (
          <div className=" flex flex-col gap-8">
            <Heading title="When do you plan on going" />
            <Calendar
              value={dateRange}
              onChange={(value) => setDateRange(value.selection)}
            />
          </div>
        )}

        {step === STEPS.INFO && (
          <div className="flex w-full flex-col gap-8">
            <div>
              <h1 className="text-xl font-semibold"> More Information</h1>
              <p className="text-xs text-muted-foreground">
                What amenities/facilities would you need
              </p>
            </div>

            <div className="flex w-full flex-col gap-12 pb-8">
              <Counter
                title="Guests"
                subtitle="How many people"
                value={guestCount}
                onChange={(value) => setGuestCount(value)}
              />
              <Counter
                title="Rooms"
                subtitle="How many rooms do you need"
                value={roomCount}
                onChange={(value) => setRoomCount(value)}
              />
              <Counter
                title="Bathroom"
                subtitle="How many bathrooms do you need"
                value={bathroomCount}
                onChange={(value) => setBathroomCount(value)}
              />
            </div>
          </div>
        )}

        <DialogFooter>
          {step !== STEPS.LOCATION && (
            <Button
              className=""
              size={"lg"}
              variant={"secondary"}
              onClick={back}
            >
              <CaretLeft weight="bold" />
            </Button>
          )}

          <Button className="w-full" size={"lg"} onClick={submit}>
            {actionLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
