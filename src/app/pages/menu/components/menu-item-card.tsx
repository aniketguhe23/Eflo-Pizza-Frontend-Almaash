"use client";

import { useState } from "react";
import OrderModal from "./order-modal";
import Image from "next/image";
import Link from "next/link";

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
  const prices: number[] = [];

  if (item.prices.small) prices.push(item.prices.small);
  if (item.prices.medium) prices.push(item.prices.medium);
  if (item.prices.large) prices.push(item.prices.large);

  if (prices.length === 0) return ""; // no prices available

  return `INR ${prices.join(" / ")}`;
};


  const isDisabled = !item.is_available;


  return (
    <>
      <div
        className={`rounded-lg p-2 sm:p-2 max-[640px]:p-1 shadow-md overflow-hidden flex flex-col items-center transition-all duration-300 ease-in-out ${isDisabled
          ? "bg-gray-200 opacity-60 cursor-not-allowed"
          : "bg-white hover:shadow-[0_0_20px_6px_rgba(244,120,52,0.25)] hover:scale-[1.03]"
          } group max-w-[90vw] sm:max-w-none`}
      >
        <h3 className="font-bold text-xl sm:text-xl max-[640px]:text-base text-center mb-1">
          {item.name}
        </h3>
        <p className="text-orange-500 mb-4 text-xl sm:text-xl max-[640px]:text-base">
          {formatPrices()}
        </p>

        <div className="w-32 h-32 sm:w-32 sm:h-32 max-[640px]:w-24 max-[640px]:h-24 relative mb-4">
          <Image
            src={item.image !== "" ? item.image : `/placeholder.svg`}
            alt={item.name}
            width={150}
            height={150}
            className={`w-full h-full object-contain transition-transform duration-300 ease-in-out ${isDisabled ? "" : "group-hover:scale-110"
              }`}
            unoptimized={item.image.startsWith("http")}
          />
        </div>

        {isDisabled ? (
          <p className="bg-gray-400 text-white font-semibold py-1 px-6 rounded-md w-full max-w-[130px] text-center mb-2 text-sm sm:text-base">
            Unavailable
          </p>
        ) : (
          <button
            className="bg-orange-500 text-lg sm:text-lg max-[640px]:text-sm hover:bg-orange-600 text-white font-semibold cursor-pointer py-1 px-6 rounded-md mb-2 w-full max-w-[130px] text-center"
            onClick={() => setIsOpen(true)}
          >
            ORDER NOW
          </button>
        )}

        {!["SIDES", "PASTAS", "DRINKS", "DESSERTS"].includes(item?.category) && (
          <Link href="/pages/build">
            <p className="cursor-pointer text-sm sm:text-lg font-semibold [font-family:'Antonio',Helvetica] hover:underline">
              MAKE IT MY OWN
            </p>
          </Link>
        )}

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
