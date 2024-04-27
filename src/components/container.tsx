"use client";

import React from "react";

interface Props {
  children: React.ReactNode;
}

const Container: React.FC<Props> = ({ children }) => {
  return (
    <div className=" mx-auto max-w-[2520px] px-2 sm:px-4  md:px-10 xl:px-20">
      {children}
    </div>
  );
};

export default Container;
