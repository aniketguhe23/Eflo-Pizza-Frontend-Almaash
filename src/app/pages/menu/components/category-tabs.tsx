"use client";

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function CategoryTabs({
  categories,
  activeCategory,
  setActiveCategory,
}: CategoryTabsProps) {
  return (
    <div className="flex justify-center overflow-x-auto">
      <div className="flex space-x-4 md:space-x-8 pb-1">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={
              `text-xl font-medium whitespace-nowrap transition-colors cursor-pointer` +
              (activeCategory === category
                ? "text-orange-500 font-bold cursor-pointer"
                : "text-gray-900 hover:text-orange-500 cursor-pointer")
            }
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
