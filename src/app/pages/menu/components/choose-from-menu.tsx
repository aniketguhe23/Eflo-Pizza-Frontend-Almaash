"use client";

import { useEffect, useRef, useState } from "react";
import CategoryTabs from "./category-tabs";
import MenuItems from "./menu-items";
import axios from "axios";
import ProjectApiList from "@/app/api/ProjectApiList";
import Loader from "@/components/loader/Loader";
import { usePathname, useSearchParams } from "next/navigation";

export default function ChooseFromMenu({
  searchResturanNo,
  setMenuData,
  menuData,
  searchResturanName,
}: any) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const restaurantNo = searchParams.get("location");
  const { api_getMainMenuItems, api_getItemsOfResturant } = ProjectApiList();

  const headingRefs = useRef<Record<string, HTMLHeadingElement | null>>({});
  const [categories, setCategories] = useState<
    { name: string; created_at: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fixed manual category order
  const categoryOrder = [
    "BASICS",
    "SPECIALS",
    "FEASTS",
    "GOURMET",
    "SIDES",
    "PASTAS",
    "DRINKS",
    "DESSERTS",
  ];

  // ✅ Normalizer (removes apostrophes, spaces, lowercase)
  const normalize = (str: string) =>
    str.replace(/['’]/g, "").toLowerCase().trim();

  // ✅ Match category name to closest order entry
  const findClosestMatch = (catName: string) => {
    const normCat = normalize(catName);

    // Exact normalized match
    let match = categoryOrder.find((order) => normalize(order) === normCat);
    if (match) return match;

    // Partial match
    match = categoryOrder.find(
      (order) =>
        normalize(order).includes(normCat) || normCat.includes(normalize(order))
    );
    if (match) return match;

    return null; // No match
  };

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
        const isMenuPage = pathname === "/pages/menu";
        const apiUrl = isMenuPage
          ? api_getMainMenuItems
          : `${api_getItemsOfResturant}/${
              searchResturanNo ? searchResturanNo : restaurantNo
            }/items`;

        const response = await axios.get(apiUrl);
        const data = response?.data?.data || {};

        const categoryArray = Object.keys(data).map((name) => ({
          name,
          created_at: data[name][0]?.created_at || new Date().toISOString(),
        }));

        // ✅ Sort according to defined order using fuzzy matching
        const sortedCategories = categoryOrder
          .map((orderName) =>
            categoryArray.find((cat) => findClosestMatch(cat.name) === orderName)
          )
          .filter(
            (cat): cat is { name: string; created_at: string } => Boolean(cat)
          );

        // ✅ Optionally push unmatched categories to the end
        const unmatchedCategories = categoryArray.filter(
          (cat) => !findClosestMatch(cat.name)
        );

        setCategories([...sortedCategories, ...unmatchedCategories]);
        setMenuData(data);
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuData();
  }, [
    pathname,
    api_getMainMenuItems,
    api_getItemsOfResturant,
    searchResturanNo,
  ]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 [font-family:'Barlow_Condensed',Helvetica] bg-white">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">
        CHOOSE FROM MENU
      </h1>

      <CategoryTabs categories={categories} onTabClick={scrollToCategory} />

      {!menuData || categories.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          No menu items available.
        </p>
      ) : (
        <div className="mt-16 space-y-20">
          {categories.map((category) => (
            <section key={category.name}>
              <h2
                ref={(el) => {
                  headingRefs.current[category.name] = el;
                }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10"
              >
                {category.name}
              </h2>
              <MenuItems
                items={menuData?.[category.name] || []}
                searchResturanNo={searchResturanNo}
                searchResturanName={searchResturanName}
              />
            </section>
          ))}
        </div>
      )}
    </main>
  );
}
