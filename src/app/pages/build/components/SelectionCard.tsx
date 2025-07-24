import Image from "next/image";
import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { PizzaOption } from "./pizza";
// import type { PizzaOption } from "./BuildPizza";

type Category =
  | "sizes"
  | "doughTypes"
  | "crustTypes"
  | "sauces"
  | "cheeseOptions"
  | "toppings"
  | "extraSauces";

interface Selection {
  name: string | null;
  size: string;
  price: number;
}

interface SelectionCardModalProps {
  open: boolean;
  handleClose: () => void;
  option: PizzaOption & { image_url?: string };
  category: Category;
  onAddToCart: (
    category: Category,
    optionName: string | null,
    size: string,
    price: number
  ) => void;
  isSelected: boolean;
  selectedOptions: Record<Category, Selection | Selection[] | null>;
}

// Utility: Check if a category allows multiple selections
// const isMultiSelectCategory = (category: Category) =>
//   ["sauces", "cheeseOptions", "toppings", "extraSauces"].includes(category);

const SelectionCardModal: React.FC<SelectionCardModalProps> = ({
  open,
  handleClose,
  option,
  category,
  onAddToCart,
  isSelected,
}) => {
  const [size, setSize] = useState("Regular");

  if (!open) return null;

  const basePrice = option.inclusive
    ? 0
    : parseFloat(option.price?.toString() || "0");

  const totalPrice = basePrice;

  const handleAddClick = () => {
    const name = isSelected ? null : option.name;
    const price = option.inclusive ? 0 : totalPrice;
    onAddToCart(category, name, size, price);
  };

  const showSizeSelector = !["sizes", "doughTypes", "crustTypes"].includes(
    category
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 [font-family:'Barlow_Condensed',Helvetica]">
      <div className="bg-[#ffd4b8] rounded-md w-full max-w-2xl relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-3 text-xl text-black hover:text-red-600 p-1"
        >
          <RxCross1 className="cursor-pointer font-bold" />
        </button>

        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4">
          {option.image && option.image !== "/placeholder.svg" && (
            <div className="w-44 h-44 rounded-full overflow-hidden">
              <Image
                src={option.image}
                alt={option.name || "pizza option"}
                width={176}
                height={176}
                className="rounded-full object-cover"
              />
            </div>
          )}

          <div className="text-center">
            <h2 className="text-3xl font-extrabold uppercase tracking-wide">
              {option.name.toUpperCase()}
            </h2>
            <p className="font-bold text-lg mt-2">
              • {option.inclusive ? "INCLUSIVE" : `INR ${option.price}`}
            </p>
          </div>
        </div>

        {/* Size Selector */}
        {showSizeSelector && (
          <div className="mt-8 grid grid-cols-3 gap-0 text-center text-xl font-bold rounded-lg overflow-hidden shadow-lg border border-gray-300 mx-5">
            {["Light", "Regular", "Extra"].map((opt) => (
              <button
                key={opt}
                onClick={() => setSize(opt)}
                className={`py-4 transition duration-200 ${
                  size === opt
                    ? "bg-orange-500 text-white"
                    : "bg-white text-black hover:bg-orange-200"
                }`}
              >
                {opt.toUpperCase()}
              </button>
            ))}
          </div>
        )}

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between bg-[#ed722e] font-bold px-6 py-4 max-sm:justify-center max-sm:items-center">
          <div className="text-xl tracking-wide pl-10">
            TOTAL:{" "}
            <span className="ml-1 font-medium">
              {option.inclusive ? "Included" : `INR ${totalPrice}`}
            </span>
          </div>

          <button
            onClick={handleAddClick}
            className="bg-black hover:bg-gray-900 text-white px-10 py-2 text-sm tracking-wide cursor-pointer rounded-md"
          >
            {isSelected ? "REMOVE" : "ADD"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectionCardModal;
