import type { Metadata } from "next";
import { ThemeProvider } from "@/theme";

import { poppins } from "../fonts";

import "./globals.css";

import { SessionProvider } from "next-auth/react";

import { auth } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Nomad BnB",
  description: "AirBnB Clone by Yaseer Okino",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors />
          <SessionProvider session={session}>{children}</SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
