"use client";

import { PropagateLoader } from "@/components/loaders";

const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <PropagateLoader />
    </div>
  );
};

export default Loading;
