"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  CalendarDot,
  CalendarDots,
  MapPinArea,
  Users,
} from "@phosphor-icons/react";
import { differenceInDays } from "date-fns";

import useCountries from "@/hooks/useCountries";

import { SearchDialog } from "./search-dialog";

const Search = () => {
  const params = useSearchParams();

  const { getByValue } = useCountries();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const location = useMemo(() => {
    if (locationValue) {
      return ` ${getByValue(locationValue)?.flag} ${getByValue(locationValue)?.label}`;
    }

    return "Any Where";
  }, [getByValue, locationValue]);

  const duration = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} days`;
    }

    return "Any Week";
  }, [startDate, endDate]);

  const guest = useMemo(() => {
    if (guestCount) {
      return `${guestCount} guests`;
    }

    return "1 Guest";
  }, [guestCount]);

  return (
    <SearchDialog
      trigger={
        <div className="flex w-full items-center md:w-fit">
          <div className=" flex h-12 w-full items-center justify-center rounded-lg border  text-xs font-medium">
            <div className="flex h-9 items-center gap-3 text-nowrap rounded-lg px-4 text-xs md:px-4">
              <MapPinArea className="h-4 w-4" weight="bold" /> {location}
            </div>
            <div className="flex h-9 items-center gap-3 rounded-lg px-4 md:px-4">
              <CalendarDots className="h-4 w-4" weight="bold" />
              {duration}
            </div>
            <div className="flex h-9 items-center gap-3 rounded-lg px-4 md:px-4">
              <Users className="h-4 w-4" weight="bold" />
              {guest}
            </div>
          </div>
        </div>
      }
    />
  );
};

export default Search;
