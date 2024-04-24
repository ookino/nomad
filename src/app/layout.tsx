import type { Metadata } from "next";
import { ThemeProvider } from "@/theme";

import { poppins } from "../fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "Nomad BnB",
  description: "AirBnB Clone by Yaseer Okino",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
