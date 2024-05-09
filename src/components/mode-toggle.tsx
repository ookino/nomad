"use client";

import { Moon, Sun } from "@phosphor-icons/react";
import { useTheme } from "next-themes";

import { cn } from "@/lib/utils";

import { Button } from "./ui/button";

export function ModeToggle() {
  const { setTheme, theme } = useTheme();

  const size = "w-4 h-4 p-0";
  const variant = "ghost";

  const handleThemeChange = () => {
    if (theme === "dark") {
      setTheme("light");
      return;
    }
    if (theme === "light") {
      setTheme("dark");
      return;
    }
  };

  return (
    <Button
      size={"sm"}
      variant={"secondary"}
      onClick={handleThemeChange}
      className="w-full"
    >
      {theme === "light" && <Moon weight="bold" className={cn(size)} />}
      {theme === "dark" && <Sun weight="bold" className={cn(size)} />}
    </Button>
  );
}
