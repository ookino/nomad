"use client";

import { DateRange, Matcher } from "react-day-picker";

import { Calendar as SCalender } from "@/components/ui/calendar";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface ICalenderProps {
  value: DateRange;
  onChange: (value: DateRange) => void;
  disabledDates?: Matcher[];
}
const Calendar: React.FC<ICalenderProps> = ({
  value,
  onChange,
  disabledDates = [],
}) => {
  const pastDays: Matcher = { before: new Date() };

  const disabledDays = [pastDays, ...(disabledDates as Matcher[])];
  return (
    <div className="w-full">
      <SCalender
        className="w-full"
        mode="range"
        selected={value}
        disabled={disabledDays}
        onSelect={(dates) => {
          return onChange((dates as DateRange) || []);
        }}
      />
    </div>
  );
};

export default Calendar;
