"use client";

import { useEffect, useRef, useState } from "react";
import CategoryTabs from "./category-tabs";
import MenuItems from "./menu-items";
import axios from "axios";
import ProjectApiList from "@/app/api/ProjectApiList";
import Loader from "@/components/loader/Loader";

export default function ChooseFromMenu() {
  const { api_getMainMenuItems } = ProjectApiList();

  const headingRefs = useRef<Record<string, HTMLHeadingElement | null>>({});
  const [menuData, setMenuData] = useState<Record<string, any[]> | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get(api_getMainMenuItems);
        const data = response?.data?.data || {};

        setMenuData(data);
        setCategories(Object.keys(data)); // dynamically set categories from keys
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [api_getMainMenuItems]);


  if (loading)
    return (
      <div className="fixed in set-0 z-50 h-full w-full flex items-center justify-center bg-white">
        <Loader />
      </div>
    );

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
              className="text-4xl font-bold text-center mb-16"
            >
              {category}
            </h2>

            <MenuItems items={menuData?.[category] || []} />
          </section>
        ))}
      </div>
    </main>
  );
}
