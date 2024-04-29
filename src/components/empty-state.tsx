"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Empty, SmileyXEyes } from "@phosphor-icons/react";

import { Button } from "./ui/button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}
const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No listings available for this category",
  subtitle = "Change category or view all listings",
  showReset,
}) => {
  const router = useRouter();
  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center gap-4">
      <div className=" flex flex-col items-center">
        <SmileyXEyes weight="duotone" className="h-24 w-24 text-destructive" />
        <h1 className="mt-4 text-center text-2xl font-semibold">{title}</h1>
        <p className="text-md text-center text-muted-foreground">{subtitle}</p>
      </div>

      {showReset && (
        <div>
          <Button
            className="border"
            variant={"secondary"}
            onClick={() => router.push("/")}
          >
            Reset
          </Button>
        </div>
      )}
    </div>
  );
};

export default EmptyState;
