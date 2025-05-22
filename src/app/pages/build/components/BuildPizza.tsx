import { useState } from "react";
import { pizzaOptions } from "./pizzaOptions";
import Image from "next/image";

type Category = keyof typeof pizzaOptions;

export interface PizzaOption {
  name: string;
  description?: string;
  price?: string;
  image?: string;
  inclusive: boolean;
}

export default function BuildPizza() {
  const [activeCategory, setActiveCategory] = useState<Category>("SIZES");
  const [selectedOptions, setSelectedOptions] = useState<
    Record<Category, string | null>
  >({
    SIZES: null,
    DOUGH: null,
    SAUCE: null,
    CHEESE: null,
    TOPPING: null,
    SAUCES: null,
    CRUST: null,
  });

  const categories: Category[] = [
    "SIZES",
    "DOUGH",
    "SAUCE",
    "CHEESE",
    "TOPPING",
    "SAUCES",
    "CRUST",
  ];

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category);
  };

  const handleOptionSelect = (category: Category, optionName: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: prev[category] === optionName ? null : optionName,
    }));
  };

  return (
    <div className=" mx-auto px-4 py-8 [font-family:'Barlow_Condensed',Helvetica] shadow-md">
      <h1 className="text-4xl font-bold text-center mb-8">
        BUILD YOUR OWN PIZZA
      </h1>

      {/* Navigation */}
      <div className="flex justify-center mb-7 overflow-x-auto">
        {categories?.map((category: Category, index) => (
          <button
            key={index}
            className={`px-4 py-2 font-medium text-xl cursor-pointer ${
              activeCategory === category ? "text-[#f47834]" : "text-black"
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {String(category)}
          </button>
        ))}
      </div>

      {/* Category Title */}
      <h2 className="text-2xl font-bold text-center mb-10">
        {String(activeCategory)}
      </h2>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-6 overflow-y-auto h-[350px] p-4 mx-50 no-scrollbar">
        {pizzaOptions[activeCategory].map((option: PizzaOption) => (
          <div
            key={option?.name}
            className={` rounded-lg p-6 flex flex-row items-center justify-center w-[80%] h-45 ml-15 shadow-lg ${
              selectedOptions[activeCategory] === option.name
                ? "bg-[#f47834]"
                : "bg-[#fbe0d0]"
            }`}
          >
            {option?.image && (
              <div className="w-40 h-40 rounded-full overflow-hidden bg-white flex items-center justify-center mr-6">
                <Image
                  src={option?.image || "/placeholder.svg"}
                  alt={option?.name || "pizza option"}
                  width={160}
                  height={160}
                  className="rounded-full object-cover"
                />
              </div>
            )}

            <div className="flex flex-col justify-center items-center text-center flex-1">
              <h3 className="text-2xl font-bold mb-1 uppercase">
                {option.name}
              </h3>

              <div className="my-2">
                <span className=" text-lg font-bold uppercase">
                  • {option.inclusive ? "INCLUSIVE" : option.price}
                </span>
              </div>

              <button
                className={`bg-[#f47834]  font-bold py-2 px-6 rounded-md text-lg uppercase mt-2 cursor-pointer ${
                  selectedOptions[activeCategory] === option.name
                    ? "bg-white text-black"
                    : "bg-[#f47834] text-white"
                }`}
                onClick={() => handleOptionSelect(activeCategory, option.name)}
              >
                SELECT
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
