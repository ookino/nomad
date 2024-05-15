"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { NomadLogo } from "./icons/nomad-logo";

const Logo = () => {
  const router = useRouter();
  return (
    <Link href={"/"}>
      <div className="w-32">
        <NomadLogo />
      </div>
    </Link>
    // <Image
    //   onClick={() => router.push("/")}
    //   alt="logo"
    //   width={100}
    //   height={100}
    //   className="w-32 cursor-pointer md:block"
    //   src={"/images/logo-type.svg"}
    // />
  );
};

export default Logo;
