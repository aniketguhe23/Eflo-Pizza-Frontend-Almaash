// components/HeroSection.tsx
import React from "react";
import Image from "next/image";
import { useValuesStore } from "@/app/store/useValuesStore";

const HeroSection = () => {
    const { valueData } = useValuesStore();
  

  return (
    <div className="relative bg-black text-white h-[450px] flex items-center justify-center overflow-hidden">
      {/* Pizza image on the left */}
      <Image
        src={valueData?.hero_bg ?? "/pizzablack.jpg"}
        alt="Background"
        fill
        className="object-cover opacity-90"
        priority
      />

      {/* Centered content */}
      <div className="relative z-20 text-center text-white [font-family:'Barlow_Condensed',Helvetica]">
        <h1 className="text-5xl font-semibold uppercase">{valueData?.hero_title ?? "Our Valuessssss"}</h1>
        <p className="mt-2 text-orange-500  text-2xl">
          {valueData?.hero_subtitle ?? "Home > Our Values "}
        </p>
      </div>
    </div>
  );
};

export default HeroSection;
