"use client";

import { useTheme } from "next-themes";
import BeatLoader from "react-spinners/BeatLoader";
import Propagate from "react-spinners/PropagateLoader";

export function PropagateLoader() {
  const theme = useTheme();
  return <Propagate color="#ea580c" />;
}

export function Beat({ alt }: { alt?: boolean }) {
  const { theme } = useTheme();

  const light = theme === "light";
  const dark = theme === "dark";

  return (
    <BeatLoader
      size={10}
      color={
        light
          ? alt
            ? "#0a0a0a"
            : "#f5f5f5"
          : dark
            ? alt
              ? "#f5f5f5"
              : "#0a0a0a"
            : "#71717a"
      }
    />
  );
}
