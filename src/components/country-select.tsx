"use client";

import Select from "react-select";

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
  const { getAll } = useCountries();
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
            <div>
              {option.label},{" "}
              <span className="text-muted-foreground">{option.region}</span>
            </div>
          </div>
        )}
        classNames={{
          control: () => "py-2 border",
        }}
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
