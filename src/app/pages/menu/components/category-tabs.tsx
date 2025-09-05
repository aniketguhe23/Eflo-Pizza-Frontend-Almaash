"use client";

interface CategoryTabsProps {
  categories: { name: string; created_at: string }[];
  onTabClick: (category: string) => void;
}

export default function CategoryTabs({ categories, onTabClick }: CategoryTabsProps) {
  // Fixed order
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

  // Helper: normalize names (remove apostrophes, spaces, lowercase)
  const normalize = (str: string) =>
    str.replace(/['’]/g, "").toLowerCase().trim();

  // Try to find closest match from order list
  const findClosestMatch = (catName: string) => {
    const normCat = normalize(catName);

    // Exact normalized match
    let match = categoryOrder.find((order) => normalize(order) === normCat);
    if (match) return match;

    // Partial match
    match = categoryOrder.find((order) => normalize(order).includes(normCat) || normCat.includes(normalize(order)));
    if (match) return match;

    return null; // no match found
  };

  // Build ordered categories
  const orderedCategories = categoryOrder
    .map((orderName) =>
      categories.find((cat) => findClosestMatch(cat.name) === orderName)
    )
    .filter((cat): cat is { name: string; created_at: string } => Boolean(cat));

  return (
    <div className="flex justify-center overflow-x-auto scrollbar-hide max-sm:pl-16">
      <div className="flex space-x-8 sm:space-x-16 pb-2 px-4 sm:px-10">
        {orderedCategories.map((cat) => (
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
