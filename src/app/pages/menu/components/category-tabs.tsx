"use client";

interface CategoryTabsProps {
  categories: { name: string; created_at: string }[];
  onTabClick: (category: string) => void;
}

export default function CategoryTabs({ categories, onTabClick }: CategoryTabsProps) {
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

  const normalize = (str: string) =>
    str.replace(/['’]/g, "").toLowerCase().trim();

  const findClosestMatch = (catName: string) => {
    const normCat = normalize(catName);

    let match = categoryOrder.find((order) => normalize(order) === normCat);
    if (match) return match;

    match = categoryOrder.find(
      (order) =>
        normalize(order).includes(normCat) || normCat.includes(normalize(order))
    );
    return match || null;
  };

  const orderedCategories = categoryOrder
    .map((orderName) =>
      categories.find((cat) => findClosestMatch(cat.name) === orderName)
    )
    .filter((cat): cat is { name: string; created_at: string } => Boolean(cat));

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex space-x-6 sm:space-x-10 md:space-x-16 justify-start sm:justify-center px-4 sm:px-10 pb-2">
        {orderedCategories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => onTabClick(cat.name)}
            className="text-lg sm:text-lg md:text-2xl font-medium whitespace-nowrap text-gray-900 hover:text-orange-500 transition-colors cursor-pointer"
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}
