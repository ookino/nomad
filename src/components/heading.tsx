"use client";

import React from "react";

import { cn } from "@/lib/utils";

interface Props {
  title?: string;
  subtitle?: string;
  type?: "card" | "page";
  center?: boolean;
}

const Heading: React.FC<Props> = ({
  title,
  subtitle,
  type = "page",
  center = false,
}) => {
  const card = type === "card";
  const page = type === "page";
  return (
    <div
      className={cn(
        "flex flex-col gap-1",
        card ? "gap-0" : "gap-1",
        center ? "items-center" : "items-start"
      )}
    >
      {page && <h1 className="text-xl font-medium ">{title}</h1>}
      {card && <h4 className="text-sm font-medium">{title}</h4>}
      <h6 className="text-xs  text-muted-foreground">{subtitle}</h6>
    </div>
  );
};

export default Heading;
