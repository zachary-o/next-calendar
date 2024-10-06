import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Props {
  selectedYear: number;
  yearsArray: number[];
  setSelectedYear: (year: number) => void;
}

export const YearSelect: React.FC<Props> = ({
  selectedYear,
  yearsArray,
  setSelectedYear,
}) => {
  return (
    <Select
      value={selectedYear.toString()}
      onValueChange={(value) => setSelectedYear(Number(value))}
    >
      <SelectTrigger className="px-2 h-8">
        <SelectValue placeholder={selectedYear} />
      </SelectTrigger>
      <SelectContent className="max-h-48">
        {yearsArray.map((year) => (
          <SelectItem
            key={year}
            value={year.toString()}
            onClick={() => setSelectedYear(year)}
          >
            {year}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
