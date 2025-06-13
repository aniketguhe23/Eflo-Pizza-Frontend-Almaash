"use client";
import Image from "next/image";
import React, { useState } from "react";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import type { PizzaOption } from "./BuildPizza";
import { pizzaOptions } from "./pizzaOptions";

type Category = keyof typeof pizzaOptions;

interface SelectionCardModalProps {
  open: boolean;
  handleClose: () => void;
  option: PizzaOption;
  category: Category;
  onAddToCart: (
    category: Category,
    optionName: string | null,
    size: string,
    price: number
  ) => void;
  isSelected: boolean;
  selectedOptions: Record<string, { price: number } | null | undefined>;
}

const SelectionCardModal: React.FC<SelectionCardModalProps> = ({
  open,
  handleClose,
  option,
  category,
  onAddToCart,
  isSelected,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("Regular");

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const handleSizeSelect = (option: string) => {
    setSize(option);
  };

  if (!open) return null;

  // Example price calculation logic (customize as needed)
  const basePrice = option.inclusive
    ? 0
    : parseInt(option.price?.replace(/\D/g, "") || "0");

  const totalPrice = basePrice * quantity;

  const handleAddClick = () => {
    if (isSelected) {
      onAddToCart(category, null, size, 0); // Removing
    } else {
      onAddToCart(category, option.name, size, totalPrice); // Adding
    }
  };

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
          {/* Image */}
          {option?.image && (
            <div className="w-44 h-44 rounded-full overflow-hidden">
              <Image
                src={option.image || "/placeholder.svg"}
                alt={option.name || "pizza option"}
                width={176}
                height={176}
                className="rounded-full object-cover"
              />
            </div>
          )}

          {/* Info */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold uppercase tracking-wide">
              {option.name.toUpperCase()}
            </h2>
            <p className="font-bold text-lg mt-2">
              • {option.inclusive ? "INCLUSIVE" : option.price}
            </p>
          </div>
        </div>

        {/* Size Selector */}
        <div className="mt-8 grid grid-cols-3 gap-0 text-center text-xl font-bold rounded-lg overflow-hidden shadow-lg border border-gray-300 mx-5">
          {["Light", "Regular", "Extra"].map((opt) => (
            <button
              key={opt}
              onClick={() => handleSizeSelect(opt)}
              className={`py-4 transition duration-200  ${
                size === opt
                  ? "bg-orange-500 text-white"
                  : "bg-white text-black cursor-pointer hover:bg-orange-200 "
              }`}
            >
              {opt.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between bg-[#ed722e] font-bold px-6 py-4">
          {/* Quantity */}
          <div className="flex items-center gap-3 text-2xl mb-3 md:mb-0">
            <span className="tracking-wide">QTY.</span>
            <FaMinusCircle onClick={decrement} className="cursor-pointer" />
            <span className="text-xl">{quantity}</span>
            <FaPlusCircle onClick={increment} className="cursor-pointer" />
          </div>

          {/* Total Price */}
          <div className="text-xl tracking-wide pl-10">
            TOTAL:{" "}
            <span className="ml-1 font-medium">
              {option.inclusive ? "Included" : `INR ${totalPrice}`}
            </span>
          </div>

          {/* Add to Cart */}
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
