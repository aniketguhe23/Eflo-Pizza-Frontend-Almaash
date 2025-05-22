"use client";

import React from "react";
import Image from "next/image";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white flex-col">
      <Image
        src="/loader.gif"
        alt="Loading..."
        width={208}   // Adjust to match your GIF’s width (w-52 = 13rem = 208px)
        height={208}  // Adjust to match your GIF’s height (h-52 = 13rem = 208px)
        className="object-contain"
      />
    </div>
  );
};

export default Loader;
