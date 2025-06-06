"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MenuItemCard from "./menu-item-card";

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

interface MenuItemsProps {
  items: MenuItem[];
}

export default function MenuItems({ items }: MenuItemsProps) {
  const [startIndex, setStartIndex] = useState(0);

  const showPrevious = () => {
    setStartIndex(Math.max(0, startIndex - 1));
  };

  const showNext = () => {
    setStartIndex(Math.min(items.length - 3, startIndex + 1));
  };

  // Determine if we should show navigation buttons
  const showPreviousButton = startIndex > 0;
  const showNextButton = startIndex < items.length - 3;

  // Get visible items
  const visibleItems = items.slice(startIndex, startIndex + 3);

  return (
    <div className="relative">
      {/* Left navigation button */}
      <button
        onClick={showPrevious}
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full shadow-md p-2 cursor-pointer ${
          !showPreviousButton ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!showPreviousButton}
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      {/* Menu items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {visibleItems.map((item, index) => (
          <MenuItemCard key={`${item.name}-${index}`} item={item} />
        ))}

        {/* Add empty placeholders if we have fewer than 3 items */}
        {Array.from({ length: Math.max(0, 3 - visibleItems.length) }).map(
          (_, index) => (
            <div key={`empty-${index}`} className="hidden md:block" />
          )
        )}
      </div>

      {/* Right navigation button */}
      <button
        onClick={showNext}
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full shadow-md p-2 cursor-pointer ${
          !showNextButton ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!showNextButton}
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
