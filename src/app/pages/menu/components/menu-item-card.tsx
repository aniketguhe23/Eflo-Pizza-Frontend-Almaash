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
}

interface MenuItemCardProps {
  item: MenuItem;
}

export default function MenuItemCard({ item }: MenuItemCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Format prices for display
  const formatPrices = () => {
    const parts = [];

    if (item.prices.small) {
      parts.push(`INR ${item.prices.small}`);
    }

    if (item.prices.medium) {
      parts.push(`${item.prices.medium}`);
    }

    if (item.prices.large) {
      parts.push(`${item.prices.large}`);
    }

    return parts.join(" / ");
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-xl overflow-hidden p-2 flex flex-col items-center transition-all duration-300 ease-in-out hover:shadow-[0_0_16px_4px_rgba(244,120,52,0.25)] hover:scale-[1.03] group">
        <h3 className="font-bold text-xl text-center mb-1">{item.name}</h3>
        <p className="text-orange-500 mb-4 text-xl">{formatPrices()}</p>

        <div className="w-32 h-32 relative mb-4">
          <Image
            src={item.image !== "" ? item.image : `/placeholder.svg`}
            alt={item.name}
            width={150}
            height={150}
            className="w-full h-full object-contain transition-transform duration-300 ease-in-out group-hover:scale-110"
            unoptimized={item.image.startsWith("http")}
          />
        </div>

        <button
          className="bg-orange-500 text-lg hover:bg-orange-600 text-white font-semibold cursor-pointer py-1 px-6 rounded-md mb-2 w-full max-w-[130px] text-center"
          onClick={() => setIsOpen(true)}
        >
          ORDER NOW
        </button>

        <p className="font-semibold text-center text-xl">MAKE IT MY OWN</p>
      </div>
      <OrderModal
        isOpen={isOpen}
        item={item}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
