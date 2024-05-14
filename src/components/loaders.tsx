"use client";

import { useTheme } from "next-themes";
import BeatLoader from "react-spinners/BeatLoader";
import Propagate from "react-spinners/PropagateLoader";

export function PropagateLoader() {
  const theme = useTheme();
  return <Propagate color="#ea580c" />;
}

export function Beat() {
  const { theme } = useTheme();

  const light = theme === "light";
  const dark = theme === "dark";

  return (
    <BeatLoader
      size={10}
      color={light ? "#f4f4f5" : dark ? "#0a0a0a" : "#71717a"}
    />
  );
}
