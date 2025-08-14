// components/HeroSection.tsx
import React from "react";
import Image from "next/image";
import { useValuesStore } from "@/app/store/useValuesStore";

const HeroSection = () => {
  const { valueData } = useValuesStore();

  return (
    <div className="relative bg-black text-white h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <Image
        src={valueData?.hero_bg ?? "/pizzablack.jpg"}
        alt="Background"
        fill
        className="object-cover opacity-90"
        priority
      />

      {/* Centered content */}
      <div className="relative z-20 text-center text-white [font-family:'Barlow_Condensed',Helvetica] px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold uppercase">
          {valueData?.hero_title ?? "Our Values"}
        </h1>
        <p className="mt-2 text-lg sm:text-xl md:text-2xl text-orange-500">
          {valueData?.hero_subtitle ?? "Home > Our Values "}
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
