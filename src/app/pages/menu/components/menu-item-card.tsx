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
    <div className="bg-white rounded-lg shadow-md overflow-hidden p-4 flex flex-col items-center">
      <h3 className="font-bold text-xl text-center mb-1">{item.name}</h3>
      <p className="text-orange-500 mb-4 text-xl">{formatPrices()}</p>

      <div className="w-48 h-48 relative mb-4">
        <Image
          src={item.image !== "" ? item.image : `/placeholder.svg`}
          alt={item.name}
          width={192}
          height={192}
          className="w-full h-full object-contain"
          unoptimized={item.image.startsWith("http")} // Optional: to avoid errors on external images without next.config setup
        />
      </div>

      <button
        className="bg-orange-500 text-xl hover:bg-orange-600 text-white font-semibold cursor-pointer py-2 px-6 rounded-md mb-2 w-full max-w-[200px] text-center"
        onClick={() => setIsOpen(true)}
      >
        ORDER NOW
      </button>

      <p className=" font-semibold text-center text-xl">MAKE IT MY OWN</p>

      <OrderModal
        isOpen={isOpen}
        item={item}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
