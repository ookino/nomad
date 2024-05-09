"use client";

import React from "react";
import { Icon } from "@phosphor-icons/react";

import { cn } from "../lib/utils";

interface Props {
  icon: Icon;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}

const CategoryInput: React.FC<Props> = ({
  icon: Icon,
  label,
  selected,
  onClick,
}) => {
  return (
    <div
      className={cn(
        "gap flex cursor-pointer flex-col rounded-md border p-4 hover:border-foreground hover:bg-muted",
        selected && "border-foreground bg-muted"
      )}
      onClick={() => onClick(label)}
    >
      <Icon className="h-6 w-6" />
      <div className="text-sm font-semibold">{label}</div>
    </div>
  );
};

export default CategoryInput;
