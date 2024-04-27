"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { CATEGORIES } from "@/constants";

import CategoryCard from "./category-card";
import Container from "./container";

interface Props {}

const Categories: React.FC<Props> = () => {
  const params = useSearchParams();
  const category = params.get("category");
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  if (!isHomePage) {
    return null;
  }

  return (
    <div>
      <Container>
        <div className="flex w-full items-center justify-between gap-4 overflow-x-scroll">
          {CATEGORIES.map((item) => {
            return (
              <CategoryCard
                key={item.label}
                icon={item.icon}
                label={item.label}
                selected={category === item.label}
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
