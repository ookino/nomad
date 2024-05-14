import Link from "next/link";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";

import { Separator } from "@/components/ui/separator";
import Container from "@/components/container";
import { WrksIcon } from "@/components/icons/wrks";
import Navbar from "@/components/navbar";

export default async function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full flex-col">
      <Navbar />
      <div className="min-h-screen flex-1 pb-20 pt-44 md:pt-28">{children}</div>
      <footer className=" w-full">
        <Container>
          <div className=" flex w-full justify-between border-t py-8">
            <div className="flex items-center gap-4">
              <div className="h-6 w-6 rounded-full  bg-muted"></div>
              <span className="text-sm tracking-tight text-muted-foreground">
                An Airbnb clone
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link href={"https://github.com/ookino/nomad"}>
                <GithubLogo className="h-6" weight="fill" />
              </Link>
              <Separator orientation="vertical" className="h-6" />
              <Link href={"https://okino.works"}>
                <div className="h-auto w-10">
                  <WrksIcon />
                </div>
              </Link>
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
}
