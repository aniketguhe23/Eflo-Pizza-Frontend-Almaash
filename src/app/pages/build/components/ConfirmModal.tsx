"use client";
import React from "react";

type Category =
  | "sizes"
  | "doughTypes"
  | "crustTypes"
  | "sauces"
  | "cheeseOptions"
  | "toppings"
  | "extraSauces";

type SelectedOption =
  | { name: string | null; price: number; size: string }
  | { name: string | null; price: number; size: string }[]
  | null;

interface ConfirmModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  selectedOptions: Record<Category, SelectedOption>;
  totalPrice: number;
  quantity: number;
}

const formatCategory = (category: string) =>
  category.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase());

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  onClose,
  onConfirm,
  title = "Confirm Your Pizza",
  selectedOptions,
  totalPrice,
  quantity,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md px-6 py-6 text-center relative overflow-y-auto max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 text-sm cursor-pointer"
        >
          X
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-black mb-4">{title}</h2>

        {/* Selected Items */}
        <div className="mb-4 text-left text-sm max-h-52 overflow-y-auto pr-2 divide-y divide-gray-200">
          {Object.entries(selectedOptions).map(([category, value]) => {
            const formattedCategory = formatCategory(category);

            if (Array.isArray(value)) {
              return value.map((item, idx) =>
                item?.name ? (
                  <div
                    key={`${category}-${idx}`}
                    className="flex justify-between py-1"
                  >
                    <span className="capitalize">{formattedCategory}</span>
                    <span className="font-medium">
                      {item.name} ({item.size}) - ₹{item.price}
                    </span>
                  </div>
                ) : null
              );
            } else if (value?.name) {
              return (
                <div key={category} className="flex justify-between py-1">
                  <span className="capitalize">{formattedCategory}</span>
                  <span className="font-medium">
                    {value.name} ({value.size}) - ₹{value.price}
                  </span>
                </div>
              );
            }

            return null;
          })}
        </div>

        {/* Quantity & Total */}
        <p className="text-base font-semibold mb-2">
          Quantity: <span className="font-bold">{quantity}</span>
        </p>
        <p className="text-base font-semibold mb-4">
          Total Price: ₹{totalPrice}
        </p>

        {/* Buttons */}
        <div className="flex justify-center gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-[#F47834] text-white text-sm font-semibold rounded-md hover:bg-[#bc8567] cursor-pointer"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
