import * as React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

import { cn } from "@/lib/utils";

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

      <div className={"relative w-full"}>
        {formatPrice && (
          <span className="text-md absolute left-4 top-[18px] z-30 font-semibold">
            $
          </span>
        )}
        <input
          id={id}
          disabled={disabled}
          {...register(id, { required })}
          placeholder=""
          type={type}
          className={cn(
            "peer flex  w-full rounded-md border  bg-background  py-5 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            formatPrice ? "px-10 focus:px-8" : "px-2",
            errors[id] ? "border-destructive " : "border-input"
          )}
        />
        <label
          className={cn(
            "absolute top-5 z-10 origin-[0] -translate-y-4 scale-95 transform text-xs text-muted-foreground duration-150 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75",
            formatPrice ? "pl-10" : "pl-2 peer-focus:top-6 peer-focus:pl-4",
            errors[id] ? "text-destructive " : ""
          )}
        >
          {label}
        </label>
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };
