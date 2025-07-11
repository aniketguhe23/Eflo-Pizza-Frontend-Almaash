"use client";

import { useState } from "react";
import OrderModal from "./order-modal";
import Image from "next/image";

interface Price {
  small: number;
  medium?: number;
  large?: number;
}

interface MenuItem {
  name: string;
  prices: Price;
  image: string;
  category: string;
  is_available: boolean; // ✅ Add this
}

interface MenuItemCardProps {
  item: MenuItem;
  searchResturanNo: any;
  searchResturanName: any;
}

export default function MenuItemCard({
  item,
  searchResturanNo,
  searchResturanName,
}: MenuItemCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formatPrices = () => {
    const parts = [];
    if (item.prices.small) parts.push(`INR ${item.prices.small}`);
    if (item.prices.medium) parts.push(`${item.prices.medium}`);
    if (item.prices.large) parts.push(`${item.prices.large}`);
    return parts.join(" / ");
  };

  const isDisabled = !item.is_available;

  return (
    <>
      <div
        className={`rounded-lg p-2 shadow-md overflow-hidden flex flex-col items-center transition-all duration-300 ease-in-out ${
          isDisabled
            ? "bg-gray-200 opacity-60 cursor-not-allowed"
            : "bg-white hover:shadow-[0_0_20px_6px_rgba(244,120,52,0.25)] hover:scale-[1.03]"
        } group`}
      >
        <h3 className="font-bold text-xl text-center mb-1">{item.name}</h3>
        <p className="text-orange-500 mb-4 text-xl">{formatPrices()}</p>

        <div className="w-32 h-32 relative mb-4">
          <Image
            src={item.image !== "" ? item.image : `/placeholder.svg`}
            alt={item.name}
            width={150}
            height={150}
            className={`w-full h-full object-contain transition-transform duration-300 ease-in-out ${
              isDisabled ? "" : "group-hover:scale-110"
            }`}
            unoptimized={item.image.startsWith("http")}
          />
        </div>

        {isDisabled ? (
          <p className="bg-gray-400 text-white font-semibold py-1 px-6 rounded-md w-full max-w-[130px] text-center mb-2">
            Unavailable
          </p>
        ) : (
          <button
            className="bg-orange-500 text-lg hover:bg-orange-600 text-white font-semibold cursor-pointer py-1 px-6 rounded-md mb-2 w-full max-w-[130px] text-center"
            onClick={() => setIsOpen(true)}
          >
            ORDER NOW
          </button>
        )}

        <p className="font-semibold text-center text-xl">MAKE IT MY OWN</p>
      </div>

      <OrderModal
        isOpen={isOpen}
        item={item}
        searchResturanNo={searchResturanNo}
        searchResturanName={searchResturanName}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
