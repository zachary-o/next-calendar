"use client"

import React from "react"
import { useFormContext } from "react-hook-form"
import { RequiredSymbol } from "./required-symbol"
import { Input } from "../ui/input"
import { ClearButton } from "./clear-button"
import { ErrorText } from "./error-text"

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string
  label: string
  required?: boolean
  className?: string
}

export const FormInput: React.FC<Props> = ({
  name,
  label,
  required,
  className,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext()

  const value = watch(name)
  const errorText = errors?.[name]?.message as string

  const onClickClearInput = () => {
    setValue(name, "", { shouldValidate: true })
  }

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}
      <div className="relative">
        <Input className="h-10 text-md rounded-sm" {...props} {...register(name)} />
        {value && <ClearButton onClick={onClickClearInput} />}
      </div>
      {errorText && <ErrorText className="mt-2" text={errorText} />}
    </div>
  )
}
