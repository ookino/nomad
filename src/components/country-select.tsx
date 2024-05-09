/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useTheme } from "next-themes";
import Select from "react-select";

import { cn } from "@/lib/utils";
import useCountries from "@/hooks/useCountries";

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

const CountrySelect: React.FC<CountrySelectProps> = ({ value, onChange }) => {
  const { setTheme, theme } = useTheme();
  const { getAll } = useCountries();

  const customStyles = {
    option: (defaultStyles: any, state: { isSelected: any }) => ({
      ...defaultStyles,
      color: state.isSelected
        ? "#212529"
        : theme === "light"
          ? "#1c1917"
          : "#fafaf9",
      backgroundColor: state.isSelected
        ? "#a0a0a0"
        : theme === "light"
          ? "#fafaf9"
          : "#1c1917",
    }),

    control: (defaultStyles: any) => ({
      ...defaultStyles,
      backgroundColor: theme === "light" ? "#fafaf9" : "#1c1917",
      padding: "10px",

      boxShadow: "none",
    }),
    singleValue: (defaultStyles: any) => ({ ...defaultStyles, color: "#fff" }),
  };
  return (
    <div>
      <Select
        placeholder="Anywhere in the world"
        isClearable
        options={getAll()}
        value={value}
        onChange={(value) => onChange(value as CountrySelectValue)}
        formatOptionLabel={(option: CountrySelectValue) => (
          <div className="items-centre flex flex-row gap-3">
            <div>{option.flag}</div>
            <div className="text-foreground">
              {option.label},{" "}
              <span className="text-muted-foreground">{option.region}</span>
            </div>
          </div>
        )}
        styles={customStyles}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: { ...theme.colors, primary: "orange", primary25: "" },
        })}
      />
    </div>
  );
};

export default CountrySelect;
