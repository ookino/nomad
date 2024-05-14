import * as React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Input } from "./input";
import { Label } from "./label";

export interface InputProps {
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const FormInput = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      label,
      disabled,
      type = "text",
      formatPrice = false,
      register,
      required,
      errors,
    },
    ref
  ) => {
    return (
      //  <input
      //    type={type}
      //    className={cn(
      //      "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      //    )}
      //    ref={ref}
      //  />

      <div className={"relative flex w-full flex-col gap-2"}>
        <Label className={cn(errors[id] ? "text-destructive " : "")}>
          {label}
        </Label>

        <div className="relative">
          {formatPrice && (
            <span className="text-md absolute left-4 top-[10px] z-30 font-semibold">
              $
            </span>
          )}
          <Input
            id={id}
            disabled={disabled}
            {...register(id, { required })}
            placeholder="Catchy Title"
            type={type}
            className={cn(
              "peer",
              formatPrice ? "px-10 focus:px-8" : "px-2",
              errors[id] ? "border-destructive " : "border-input"
            )}
          />
        </div>
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };
