"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";

import { Calendar as SCalender } from "@/components/ui/calendar";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface ICalenderProps {
  value: any;
  onChange: (value: any) => void;
  disabledDates?: Date[];
}
const Calendar: React.FC<ICalenderProps> = ({
  value,
  onChange,
  disabledDates,
}) => {
  return (
    <div>
      <DateRange
        rangeColors={["#ea580c"]}
        ranges={[value]}
        date={new Date()}
        onChange={onChange}
        direction="vertical"
        showDateDisplay={false}
        minDate={new Date()}
        disabledDates={disabledDates}
      />

      {/* <SCalender
        className="w-full"
        mode="range"
        numberOfMonths={1}
        onSelect={onChange}
        selected={value || new Date()}
        disabled={disabledDates}
      /> */}
    </div>
  );
};

export default Calendar;
