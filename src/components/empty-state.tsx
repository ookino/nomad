"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Empty, SmileyXEyes } from "@phosphor-icons/react";

import Heading from "./heading";
import { Button } from "./ui/button";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  actionDialog?: React.ReactNode;
}
const EmptyState: React.FC<EmptyStateProps> = ({
  title = "No listings available for this category",
  subtitle = "Change category or view all listings",
  showReset,
  actionDialog = undefined,
}) => {
  const router = useRouter();
  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center gap-4">
      <div className=" flex flex-col items-center">
        <SmileyXEyes weight="light" className="h-20 w-20 text-primary" />
        <Heading title={title} subtitle={subtitle} center />
      </div>

      {showReset && !actionDialog && (
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

      {actionDialog && <div>{actionDialog}</div>}

      {}
    </div>
  );
};

export default EmptyState;
