"use client";

import { Range } from "react-date-range";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Calendar from "@/components/calendar";

interface IListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<IListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div className="flex w-full flex-col gap-4 overflow-hidden rounded-lg border">
      <div className="flex items-center gap-1 px-4 pt-6">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="text-muted-foreground">night</div>
      </div>

      <Separator />

      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />

      <Separator />

      <div className="px-4">
        <Button
          size={"lg"}
          className="w-full"
          disabled={disabled}
          onClick={onSubmit}
        >
          Reserve
        </Button>
      </div>

      <Separator />

      <div className="flex w-full items-center justify-between px-4 pb-4">
        <span className=" font-medium text-muted-foreground">Total Cost</span>
        <span className="text-xl font-medium">$ {totalPrice}</span>
      </div>
    </div>
  );
};

export default ListingReservation;
