"use client";

import { useHomeStore } from "@/app/store/homeStore";
import Image from "next/image";
import { useRef } from "react";

export default function FeaturedSlider() {
  const { menuItems } = useHomeStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="py-20 text-black flex justify-center ">
      <div className="w-full max-w-[75%] text-center relative">
        <h2 className="text-5xl font-extrabold uppercase mb-20 [font-family:'Antonio',Helvetica]">
          Explore Featured Pizza’s
        </h2>

        <div className="relative flex items-center">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 z-10 p-2 text-3xl font-bold bg-white shadow-md rounded-full -ml-10 cursor-pointer hover:bg-amber-200"
          >
            &lt;
          </button>

          {/* Slider */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto no-scrollbar px-35 py-10 scroll-smooth snap-x snap-mandatory" 
          >
            {menuItems?.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-10 shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-shadow duration-300 flex-shrink-0 snap-start flex flex-col items-center ml-5"
                style={{ width: "350px" }}
              >
                <h3 className="text-base font-bold uppercase mb-3 text-center">
                  {item.name}
                </h3>

                <p className="text-base text-[#f47335] mb-5 font-bold">
                  INR{" "}
                  {item.variants.map((variant, idx) => (
                    <span key={idx}>
                      {variant.price}
                      {idx !== item.variants.length - 1 && " / "}
                    </span>
                  ))}
                </p>

                <div className="w-48 h-48 relative mb-6">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <button className="bg-[#f47335] hover:bg-[#f47335] text-white px-6 py-2 rounded-lg text-base font-semibold mb-4 cursor-pointer [font-family:'Antonio',Helvetica]">
                  ORDER NOW
                </button>
                <p className="text-lg font-semibold [font-family:'Antonio',Helvetica]">
                  MAKE IT MY OWN
                </p>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 z-10 p-2 text-3xl font-bold bg-white shadow-md rounded-full -mr-10 cursor-pointer hover:bg-amber-200"
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
