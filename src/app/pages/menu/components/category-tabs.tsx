"use client";

interface CategoryTabsProps {
  categories: string[];
  onTabClick: (category: string) => void;
}

export default function CategoryTabs({ categories, onTabClick }: CategoryTabsProps) {
  return (
    <div className="flex justify-start overflow-x-auto scrollbar-hide">
      <div className="flex space-x-20 pb-1">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onTabClick(category)}
            className="text-2xl font-medium whitespace-nowrap text-gray-900 hover:text-orange-500 transition-colors cursor-pointer"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
