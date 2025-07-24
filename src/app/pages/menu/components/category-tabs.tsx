"use client";

interface CategoryTabsProps {
  categories: string[];
  onTabClick: (category: string) => void;
}

export default function CategoryTabs({
  categories,
  onTabClick,
}: CategoryTabsProps) {
  return (
  <div className="flex justify-center overflow-x-auto scrollbar-hide max-sm:pl-16 ">
  <div className="flex space-x-8 sm:space-x-16 pb-2 px-4 sm:px-10">
    {categories.map((category) => (
      <button
        key={category}
        onClick={() => onTabClick(category)}
        className="text-lg sm:text-xl md:text-2xl font-medium whitespace-nowrap text-gray-900 hover:text-orange-500 transition-colors cursor-pointer"
      >
        {category}
      </button>
    ))}
  </div>
</div>

  );
}
