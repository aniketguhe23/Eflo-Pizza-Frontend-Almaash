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
  const headingRefs = useRef<Record<string, HTMLHeadingElement | null>>({});

  const scrollToCategory = (category: string) => {
    const heading = headingRefs.current[category];
    if (heading) {
      heading.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    }
  };

  return (
    <main className="max-w-7xl mx-auto py-8 [font-family:'Barlow_Condensed',Helvetica] bg-white">
      <h1 className="text-4xl font-bold text-center mb-15">CHOOSE FROM MENU</h1>

      <CategoryTabs categories={categories} onTabClick={scrollToCategory} />

      <div className="mt-25 space-y-24">
        {categories.map((category) => (
          <section key={category}>
            <h2
              ref={(el) => {
                headingRefs.current[category] = el;
              }}
              className="text-4xl font-bold text-start mb-6"
            >
              {category}
            </h2>

            <MenuItems items={menuData[category as keyof typeof menuData]} />
          </section>
        ))}
      </div>
    </main>
  );
}
