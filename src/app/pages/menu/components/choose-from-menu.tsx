"use client";

import { useRef } from "react";
import CategoryTabs from "./category-tabs";
import MenuItems from "./menu-items";
import { menuData } from "./menuOptions";

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

export default function ChooseFromMenu() {
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToCategory = (category: string) => {
    const section = sectionRefs.current[category];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 [font-family:'Barlow_Condensed',Helvetica]">
      <h1 className="text-4xl font-bold text-center mb-6">CHOOSE FROM MENU</h1>

      <CategoryTabs categories={categories} onTabClick={scrollToCategory} />

      <div className="mt-12 space-y-24">
        {categories.map((category) => (
          <section
            key={category}
            ref={(el) => {
              sectionRefs.current[category] = el as HTMLDivElement | null;
            }}
          >
            <h2 className="text-3xl font-bold text-center mb-6">{category}</h2>
            <MenuItems items={menuData[category as keyof typeof menuData]} />
          </section>
        ))}
      </div>
    </main>
  );
}
