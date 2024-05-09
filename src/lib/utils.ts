import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Pixel GIF code adapted from https://stackoverflow.com/a/33919020/266535

export function rgbDataURL(r: number, g: number, b: number) {
  const keyStr =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  const triplet = (e1: number, e2: number, e3: number) =>
    keyStr.charAt(e1 >> 2) +
    keyStr.charAt(((e1 & 3) << 4) | (e2 >> 4)) +
    keyStr.charAt(((e2 & 15) << 2) | (e3 >> 6)) +
    keyStr.charAt(e3 & 63);

  return `data:image/gif;base64,R0lGODlhAQABAPAA${
    triplet(0, r, g) + triplet(b, 255, 255)
  }/yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==`;
}

export function formatToCurrency(
  number: number,
  locale: string = "en-US",
  currency: string = "USD",
  options: Intl.NumberFormatOptions = {}
): string {
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    ...options,
  });

  return formatter.format(number);
}
