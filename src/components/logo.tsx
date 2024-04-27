"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      alt="logo"
      width={100}
      height={100}
      className="hidden w-28 md:block"
      src={"/images/logo-type.svg"}
    />
  );
};

export default Logo;
