"use client";

interface CategoryTabsProps {
  categories: { name: string; created_at: string }[];
  onTabClick: (category: string) => void;
}

export default function CategoryTabs({ categories, onTabClick }: CategoryTabsProps) {
  // Define your desired order
  const categoryOrder = [
    "BASICS",
    "SPECIALS",
    "FEASTS",
    "GOURMET",
    "SIDERS",
    "PASTAS",
    "DRINK'S",
    "DESSERT",
  ];

  // Sort categories based on the defined order
  const sortedCategories = [...categories].sort(
    (a, b) =>
      categoryOrder.indexOf(a.name.toUpperCase()) -
      categoryOrder.indexOf(b.name.toUpperCase())
  );

  return (
    <div className="flex justify-center overflow-x-auto scrollbar-hide max-sm:pl-16">
      <div className="flex space-x-8 sm:space-x-16 pb-2 px-4 sm:px-10">
        {sortedCategories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onTabClick(cat.name)}
            className="text-lg sm:text-xl md:text-2xl font-medium whitespace-nowrap text-gray-900 hover:text-orange-500 transition-colors cursor-pointer"
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
