"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import queryString from "query-string";
import { IconType } from "react-icons/lib";

import { cn } from "@/lib/utils";

interface Props {
  icon: IconType;
  label: string;
  selected: boolean;
}

const CategoryCard: React.FC<Props> = ({ icon: Icon, label, selected }) => {
  const router = useRouter();
  const params = useSearchParams();

  const processCLick = useCallback(() => {
    let currentQuery = {};
    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updateQuery: any = {
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
