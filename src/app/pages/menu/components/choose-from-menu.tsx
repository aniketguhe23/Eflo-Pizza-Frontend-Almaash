"use client";

import { useState } from "react";
import CategoryTabs from "./category-tabs";
import MenuItems from "./menu-items";
import { menuData } from "./menuOptions";

// Menu categories
const categories = [
  "BASICS",
  "SPECIALS",
  "FEASTS",
  "GOURMET",
  "SIDES",
  "PASTAS",
  "DRINKS",
  "DESSERTS",
  "DEALS",
];

// Sample menu data

export default function ChooseFromMenu() {
  const [activeCategory, setActiveCategory] = useState("BASICS");

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 [font-family:'Barlow_Condensed',Helvetica]">
      <h1 className="text-4xl font-bold text-center mb-6 ">CHOOSE FROM MENU</h1>

      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="mt-8">
        <MenuItems items={menuData[activeCategory as keyof typeof menuData]} />
      </div>
    </main>
  );
}
