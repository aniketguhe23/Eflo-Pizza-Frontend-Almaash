"use client";

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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-10 gap-y-15">
      {items.map((item, index) => (
        <MenuItemCard key={`${item.name}-${index}`} item={item} />
      ))}
    </div>
  );
}
