"use client";

import OrderModal from "@/app/pages/menu/components/order-modal";
import { useHomeStore } from "@/app/store/homeStore";
import Image from "next/image";
import { useRef, useState } from "react";
import Link from "next/link";

export default function FeaturedSlider() {
  const { menuItems } = useHomeStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

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
    <div className="py-16 sm:py-20 text-black flex justify-center">
      <div className="w-full max-w-[95%] sm:max-w-[85%] md:max-w-[75%] text-center relative">
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold uppercase mb-10 sm:mb-16 [font-family:'Antonio',Helvetica]">
          Explore Featured Pizza’s
        </h2>

        <div className="relative flex items-center">
          {/* Left Arrow */}
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 z-10 p-2 text-2xl sm:text-3xl font-bold bg-white shadow-md rounded-full -ml-4 sm:-ml-10 cursor-pointer hover:bg-amber-200"
          >
            &lt;
          </button>

          {/* Slider */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar py-10 px-2"
          >
            {menuItems?.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl px-5 py-8 shadow-[0_10px_25px_rgba(0,0,0,0.3)] transition-shadow duration-300 flex-shrink-0 snap-start flex flex-col items-center"
                style={{
                  width: "90vw",
                  maxWidth: "350px",
                }}
              >
                <h3 className="text-base sm:text-lg font-bold uppercase mb-3 text-center">
                  {item.name}
                </h3>

                <p className="text-sm sm:text-base text-[#f47335] mb-5 font-bold text-center">
                  INR{" "}
                  {item?.variants.map((variant, idx) => (
                    <span key={idx}>
                      {variant.price}
                      {idx !== item.variants.length - 1 && " / "}
                    </span>
                  ))}
                </p>

                <div className="w-40 h-40 sm:w-48 sm:h-48 relative mb-6">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>

                <button
                  className="bg-[#f47335] hover:bg-[#f47335] text-white px-5 py-2 sm:px-6 sm:py-2 rounded-lg text-sm sm:text-base font-semibold mb-4 cursor-pointer [font-family:'Antonio',Helvetica]"
                  onClick={() => {
                    const transformedItem = {
                      name: item.name,
                      image: item.imageUrl,
                      category: "GENERAL",
                      prices: {
                        small: Number(
                          item.variants.find((v) => v.size === "small")
                            ?.price ?? 0
                        ),
                        medium: Number(
                          item.variants.find((v) => v.size === "medium")
                            ?.price ?? 0
                        ),
                        large: Number(
                          item.variants.find((v) => v.size === "large")
                            ?.price ?? 0
                        ),
                      },
                    };

                    setSelectedItem(transformedItem);
                    setIsOpen(true);
                  }}
                >
                  ORDER NOW
                </button>
                <Link href="/pages/build">
                  <p className="cursor-pointer text-sm sm:text-lg font-semibold [font-family:'Antonio',Helvetica] hover:underline">
                    MAKE IT MY OWN
                  </p>
                </Link>
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 z-10 p-2 text-2xl sm:text-3xl font-bold bg-white shadow-md rounded-full -mr-4 sm:-mr-10 cursor-pointer hover:bg-amber-200"
          >
            &gt;
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <OrderModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          item={selectedItem}
          searchResturanNo={null}
          searchResturanName={null}
        />
      )}
    </div>
  );
}
