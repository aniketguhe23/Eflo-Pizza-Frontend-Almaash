"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
// import { PizzaOption } from "@/app/store/useBuildYourOwnStore";
import { RxCross1 } from "react-icons/rx";
import { PizzaOption, Category } from "@/app/store/build-pizza";

interface SelectionCardModalProps {
  open: boolean;
  onClose: () => void;
  category: Category;
  option: PizzaOption;
  onAddOrRemove: (
    category: Category,
    optionName: string | null,
    size: string,
    price: number,
    qty?: number
  ) => void;
  selectedItems: any;
  pizzaSize: string;
}

const sizeOptions = ["Light", "Regular", "Extra"];
const doughOptions = ["Thin", "Thick", "Cheese Burst"];
const crustOptions = ["Classic", "Stuffed", "Pan"];

export default function SelectionCardModal({
  open,
  onClose,
  category,
  option,
  onAddOrRemove,
  selectedItems,
}: SelectionCardModalProps) {
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedDough, setSelectedDough] = useState(doughOptions[0]);
  const [selectedCrust, setSelectedCrust] = useState(crustOptions[0]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (open) {
      // determine existing selection for this option (if any)
      if (Array.isArray(selectedItems)) {
        const existing = selectedItems.find(
          (item: any) => item.name === option.name
        );
        if (existing) {
          if (existing.size) setSelectedSize(existing.size);
          if (existing.qty) setQuantity(existing.qty);
        } else {
          setSelectedSize("Regular");
          setQuantity(1);
        }
      } else if (selectedItems?.name === option.name) {
        // single selection stored
        setSelectedSize(selectedItems.size || "Regular");
        setQuantity((selectedItems as any).qty || 1);
      } else {
        setSelectedSize("Regular");
        setQuantity(1);
      }

      // for dough/crust you can also prefill the specific selectors:
      if (showDoughSelector && selectedItems?.name === option.name) {
        setSelectedDough((selectedItems as any).size || doughOptions[0]);
        setQuantity((selectedItems as any).qty || 1);
      }
      if (showCrustSelector && selectedItems?.name === option.name) {
        setSelectedCrust((selectedItems as any).size || crustOptions[0]);
        setQuantity((selectedItems as any).qty || 1);
      }

      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open, selectedItems, option.name]);

  if (!open) return null;

  const showSizeSelector = [
    "sauces",
    "cheeseOptions",
    "toppings",
    "extraSauces",
  ].includes(category);

  const showDoughSelector = category === "doughTypes";
  const showCrustSelector = category === "crustTypes";

  const noImage = !option.image_url;
  const noSelector =
    !showSizeSelector && !showDoughSelector && !showCrustSelector;
  const centerContent = noImage && noSelector;

  // Price getter updated to handle dough/crust categories if needed
  const getPriceForSize = () => {
    if (showSizeSelector) {
      switch (selectedSize) {
        case "Light":
          return option.light_price || 0;
        case "Regular":
          return option.regular_price || 0;
        case "Extra":
          return option.extra_price || 0;
        default:
          return option.price || 0;
      }
    }
    return option.price || 0;
  };

  const price = getPriceForSize();
  const totalPrice = price * quantity;

  // ✅ Detect if this option is already selected
  const currentVariant = showDoughSelector
    ? selectedDough
    : showCrustSelector
    ? selectedCrust
    : selectedSize;

  const isSelected = Array.isArray(selectedItems)
    ? selectedItems.some(
        (item: any) => item.name === option.name && item.size === currentVariant
      )
    : selectedItems?.name === option.name &&
      selectedItems?.size === currentVariant;

  const handleConfirmClick = () => {
    const selectedOptionForSend = showDoughSelector
      ? selectedDough
      : showCrustSelector
      ? selectedCrust
      : selectedSize;

    if (isSelected) {
      // remove the exact variant (qty not needed for removal)
      onAddOrRemove(category, option.name, selectedOptionForSend, price);
    } else {
      // add variant including quantity
      onAddOrRemove(
        category,
        option.name,
        selectedOptionForSend,
        price,
        quantity
      );
    }

    onClose();
  };

  // If dough or crust, render simplified UI
  if (showDoughSelector || showCrustSelector) {
    return (
      <>
        <div className="fixed inset-0 bg-black/60 z-50" onClick={onClose} />
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="bg-[#fdd7c1] rounded-xl shadow-lg w-full max-w-[600px] relative flex flex-col min-h-[150px] sm:min-h-[180px]">
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-black hover:text-gray-800 text-xl sm:text-2xl font-bold cursor-pointer"
            >
              <RxCross1 className="hover:text-red-600" />
            </button>

            {/* Title and Price */}
            <div className="flex flex-col items-center justify-center flex-grow pt-8 sm:pt-10 px-4 text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-black mb-2">
                {option.name}
              </h2>
              <div className="text-lg sm:text-xl font-bold text-black">
                • INR {price.toFixed(2)}
              </div>
            </div>

            {/* Bottom bar */}
            <div className="bg-[#f47834] text-black font-bold text-sm sm:text-md px-4 sm:px-6 py-2 sm:py-3 rounded-b-xl flex justify-end items-center">
              <button
                onClick={handleConfirmClick}
                className="bg-black text-white font-bold px-4 sm:px-6 py-2 rounded hover:bg-gray-900 cursor-pointer text-sm sm:text-base"
              >
                {isSelected ? "REMOVE" : "SELECT"}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Otherwise render full detailed modal
  return (
    <>
    {/* Overlay */}
<div className="fixed inset-0 bg-black/60 z-50" onClick={onClose}></div>

{/* Modal */}
<div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
  <div
    className={`bg-[#fdd7c1] rounded-xl shadow-lg w-full max-w-[600px] relative flex flex-col 
      ${centerContent ? "h-auto justify-center items-center" : "min-h-[300px]"}`}
  >
    {/* Close button */}
    <button
      onClick={onClose}
      className="absolute top-3 right-3 text-black hover:text-gray-800 text-xl sm:text-2xl font-bold cursor-pointer"
    >
      <RxCross1 className="hover:text-red-600" />
    </button>

    {centerContent ? (
      <div className="w-full px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-black my-6 sm:my-8">
            {option.name}
          </h2>
          <ul className="list-disc list-inside text-black font-semibold text-lg sm:text-xl mt-2">
            {option.light_price !== undefined && (
              <span className="text-lg sm:text-2xl font-bold uppercase">
                INR {option.light_price}
              </span>
            )}
            {option.regular_price !== undefined && (
              <span className="text-lg sm:text-2xl font-bold uppercase">
                / {option.regular_price}
              </span>
            )}
            {option.extra_price !== undefined && (
              <span className="text-lg sm:text-2xl font-bold uppercase">
                / {option.extra_price}
              </span>
            )}
          </ul>
        </div>

        {/* Add/Remove Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-[#f47834] text-black font-bold text-base sm:text-lg px-4 sm:px-6 py-3 rounded-b-xl mt-5 gap-3 sm:gap-0">
          <div>
            TOTAL :{" "}
            <span className="font-normal text-lg sm:text-xl pl-1">
              INR {totalPrice}
            </span>
          </div>

          <button
            onClick={handleConfirmClick}
            className="bg-black text-white font-bold px-4 sm:px-6 py-2 rounded-md hover:bg-gray-900 cursor-pointer text-sm sm:text-base"
          >
            {isSelected ? "REMOVE" : "SELECT"}
          </button>
        </div>
      </div>
    ) : (
      <>
        {/* Top Section */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 p-4 sm:p-6">
          {option.image_url && (
            <div className="w-28 h-28 sm:w-44 sm:h-44 rounded-full overflow-hidden border-2 border-[#f47834] flex-shrink-0">
              <Image
                src={option.image_url}
                alt={option.name}
                width={175}
                height={150}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div className="flex flex-col justify-center text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-wide text-black mb-1">
              {option.name}
            </h2>
            <ul className="list-disc list-inside text-black font-semibold text-lg sm:text-xl mt-2">
              {option.light_price !== undefined && (
                <span className="text-lg sm:text-2xl font-bold uppercase">
                  INR {option.light_price}
                </span>
              )}
              {option.regular_price !== undefined && (
                <span className="text-lg sm:text-2xl font-bold uppercase">
                  / {option.regular_price}
                </span>
              )}
              {option.extra_price !== undefined && (
                <span className="text-lg sm:text-2xl font-bold uppercase">
                  / {option.extra_price}
                </span>
              )}
            </ul>
          </div>
        </div>

        {/* Size Selector */}
        {showSizeSelector && (
          <div className="flex border border-white rounded-md shadow-inner m-4 sm:m-6">
            {sizeOptions.map((size) => {
              const active = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`flex-1 py-2 sm:py-3 font-bold uppercase transition-colors text-base sm:text-lg cursor-pointer ${
                    active
                      ? "bg-[#f47834] text-black"
                      : "bg-white text-black hover:bg-[#fdbb81]"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        )}

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-[#f47834] text-black font-bold text-base sm:text-lg px-4 sm:px-6 py-3 rounded-b-xl gap-3 sm:gap-0">
          <div>
            TOTAL :{" "}
            <span className="font-normal text-lg sm:text-xl pl-1">
              INR {totalPrice}
            </span>
          </div>

          <button
            onClick={handleConfirmClick}
            className="font-bold px-4 sm:px-6 py-2 rounded cursor-pointer text-sm sm:text-base bg-black text-white hover:bg-gray-900"
          >
            {isSelected ? "REMOVE" : "SELECT"}
          </button>
        </div>
      </>
    )}
  </div>
</div>

    </>
  );
}
