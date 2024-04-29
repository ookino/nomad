"use client";

import dynamic from "next/dynamic";
import { Icon as IconType } from "@phosphor-icons/react";

interface IListingCategoryProps {
  icon: IconType;
  label: string;
  description: string;
}
const ListingCategory: React.FC<IListingCategoryProps> = ({
  icon: Icon,
  label,
  description,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon className="h-12 w-12 text-muted-foreground" weight="duotone" />
        <div className="flex flex-col">
          <div className="font-medium">{label}</div>
          <div className="text-xs text-muted-foreground">{description}</div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
