/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, useSearchParams } from "next/navigation";
import { CaretLeft, Steps } from "@phosphor-icons/react";
import { formatISO } from "date-fns";
import qs from "query-string";
import { DateRange } from "react-day-picker";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: new Date(),
  });

  const params = useSearchParams();

  const Map = useMemo(
    () => dynamic(() => import("./map"), { ssr: false }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

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

      if (dateRange.from) {
        updatedQuery.from = formatISO(dateRange.from);
      }

      if (dateRange.to) {
        updatedQuery.to = formatISO(dateRange.to);
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
    roomCount,
    guestCount,
    bathroomCount,
    dateRange,
    params,
    router,
    location?.value,
  ]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <Tabs defaultValue={STEPS.LOCATION.toString()} className="w-full">
          <TabsList>
            <TabsTrigger value={STEPS.LOCATION.toString()}>
              Location
            </TabsTrigger>
            <TabsTrigger value={STEPS.DATE.toString()}>Date</TabsTrigger>
            <TabsTrigger value={STEPS.INFO.toString()}>
              Facilities & Amenities
            </TabsTrigger>
          </TabsList>
          <TabsContent value={STEPS.LOCATION.toString()} className="pt-4">
            <div className=" flex flex-col gap-8">
              <CountrySelect
                value={location?.value}
                onChange={(value) => setLocation(value)}
              />
              <Separator />

              <div className=" z-0">
                <Map center={location?.latlng} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value={STEPS.DATE.toString()} className="pt-4">
            <div className=" flex flex-col gap-8 ">
              <Calendar
                value={dateRange}
                onChange={(value) => setDateRange(value)}
              />
            </div>
          </TabsContent>
          <TabsContent value={STEPS.INFO.toString()} className="pt-4">
            <div className="flex w-full flex-col gap-8">
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
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button className="w-full" size={"lg"} onClick={submit}>
            Filter
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
