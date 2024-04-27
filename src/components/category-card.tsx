"use client";

import React, { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@phosphor-icons/react";
import queryString from "query-string";

import { cn } from "../lib/utils";

interface Props {
  icon: Icon;
  label: string;
  selected: boolean;
}

type UpdateQuery<T extends Record<string, string>> = {
  [K in keyof T]: string;
};

const CategoryCard: React.FC<Props> = ({ icon: Icon, label, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const processCLick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updateQuery: UpdateQuery<{ [key: string]: string }> = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === "label") {
      delete updateQuery.category;
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updateQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);
  return (
    <div
      className={cn(
        "flex cursor-pointer flex-col items-center justify-center gap-1 transition hover:text-foreground",
        selected ? "text-foreground" : " text-muted-foreground"
      )}
      onClick={processCLick}
    >
      <Icon
        weight="duotone"
        className={cn(
          "h-8 w-8 text-muted-foreground hover:text-foreground",
          selected ? "text-foreground" : ""
        )}
      />
      <span className="text-xs capitalize">{label}</span>
    </div>
  );
};

export default CategoryCard;
