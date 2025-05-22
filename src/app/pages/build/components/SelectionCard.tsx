import Image from "next/image";
import React, { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { FaMinusCircle } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";

interface SelectionCardModalProps {
  open: boolean;
  handleClose: () => void;
}

const SelectionCardModal: React.FC<SelectionCardModalProps> = ({
  open,
  handleClose,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("Regular");

  const handleSizeSelect = (option: string) => {
    setSize(option);
  };

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4">
      <div className="bg-[#ffd4b8]  rounded-md w-full max-w-2xl relative">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-2 right-3 text-xl  text-black hover:text-red-600 p-1"
        >
          <RxCross1 className="cursor-pointer font-bold" />
        </button>

        {/* Top Section */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4">
          {/* Image */}
          <div className="w-44 h-44 rounded-full overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png"
              alt="Mozzarella"
              width={176} // equals 44 * 4 (Tailwind uses 1rem = 4px)
              height={176}
              className="rounded-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="text-center">
            <h2 className="text-3xl font-extrabold uppercase tracking-wide">
              MOZZERELLA
            </h2>
            <p className="font-bold text-lg mt-2">• INCLUSIVE</p>
          </div>
        </div>

        {/* Size Selector */}
        <div className="mt-8 grid grid-cols-3 gap-0 text-center text-xl font-bold rounded-lg overflow-hidden shadow-lg border border-gray-300 mx-5">
          {["Light", "Regular", "Extra"].map((option) => (
            <button
              key={option}
              onClick={() => handleSizeSelect(option)}
              className={`py-4 transition duration-200  ${
                size === option
                  ? "bg-orange-500 text-white"
                  : "bg-white text-black cursor-pointer hover:bg-orange-200 "
              }`}
            >
              {option.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-8 flex flex-col md:flex-row items-center justify-between bg-[#ed722e] font-bold px-6 py-4">
          {/* Quantity */}
          <div className="flex items-center gap-3 text-2xl mb-3 md:mb-0">
            <span className="tracking-wide">QTY.</span>
            {/* <button
             
              onClick={decrement}
              className="bg-white text-black rounded-full w-8 h-8 flex items-center justify-center text-xl font-bold cursor-pointer"
            >
             -
            </button> */}
            <FaMinusCircle onClick={decrement} className="cursor-pointer" />

            <span className="text-xl">{quantity}</span>

            <FaPlusCircle onClick={increment} className="cursor-pointer" />
          </div>

          {/* Total Price */}
          <div className="text-xl tracking-wide pl-10">
            TOTAL: <span className="ml-1 font-medium">INR 279</span>
          </div>

          {/* Add to Cart */}
          <button className="bg-black hover:bg-gray-900 text-white px-17 py-2  text-sm tracking-wide cursor-pointer">
            ADD TO CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectionCardModal;
