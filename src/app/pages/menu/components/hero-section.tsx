"use client";

import React from "react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <div className="relative bg-black text-white h-[300px] sm:h-[400px] md:h-[450px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src="/menuHeaderc.jpg"
        alt="Menu Background"
        fill
        className="object-cover opacity-90"
        priority
      />

      {/* Overlay Content */}
      <div className="relative z-20 text-center px-4 [font-family:'Barlow_Condensed',Helvetica]">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold uppercase">
          Menu
        </h1>
        <p className="mt-2 text-lg sm:text-xl md:text-2xl text-orange-500">
          <span className="">Home</span> &gt; Menu
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
