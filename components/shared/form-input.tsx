"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Input } from "../ui/input";
import { ClearButton } from "./clear-button";
import { DayPicker } from "./day-picker";
import { ErrorText } from "./error-text";
import { RequiredSymbol } from "./required-symbol";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  required?: boolean;
  date?: boolean;
  daysInMonth?: number | undefined;
  firstDayOfMonth?: number | undefined;
  className?: string;
}

export const FormInput: React.FC<Props> = ({
  name,
  label,
  required,
  date,
  daysInMonth,
  firstDayOfMonth,
  className,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const value = watch(name);
  const errorText = errors?.[name]?.message as string;
  console.log("value", value);

  const onClickClearInput = (): void => {
    setValue(name, "", { shouldValidate: true });
  };

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Input
          className="h-10 text-md rounded-sm"
          {...props}
          {...register(name)}
        />
        <div className="flex flex-column items-center gap-3 absolute right-4 top-1/2 -translate-y-1/2 ">
          {value && <ClearButton onClick={onClickClearInput} />}
          {date && (
            <DayPicker
              value={value}
              daysInMonth={daysInMonth}
              firstDayOfMonth={firstDayOfMonth}
            />
          )}
        </div>
      </div>
      {errorText && <ErrorText className="mt-2" text={errorText} />}
    </div>
  );
};
