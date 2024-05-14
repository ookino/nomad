import type { Metadata } from "next";
import { ThemeProvider } from "@/theme";
import { Analytics } from "@vercel/analytics/react";

import { poppins } from "../fonts";

import "./globals.css";

import { SessionProvider } from "next-auth/react";

import { auth } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Nomad BnB",
  description: "AirBnB Clone by Okino",
  openGraph: {
    title: "Nomad BnB",
    description: "AirBnB Clone by Okino Works",
    url: "http://nomad.okino.works",
    siteName: "Nomad BnB",

    images: [
      {
        url: "https://res.cloudinary.com/dthxhulp6/image/upload/v1714675330/nomad-og-800_hm8dmb.png",
        width: 800,
        height: 600,
        alt: "Nomad OG - 800",
      },
      // {
      //   url: "https://res.cloudinary.com/dthxhulp6/image/upload/v1714675330/nomad-og-1800_msfpde.png",
      //   width: 1800,
      //   height: 1600,
      //   alt: "Nomad OG - 1800x1600",
      // },
      {
        url: "https://res.cloudinary.com/okino1234/image/upload/v1715702996/nomad-og-1200_mtcacn.png",
        width: 1200,
        height: 627,
        alt: "Nomad OG - 1200x627",
      },
    ],
    locale: "en_US",
    type: "website",
  },
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
        <Analytics />
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
