"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import useCartStore, { OrderItem } from "@/app/store/useCartStore";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import ProjectApiList from "@/app/api/ProjectApiList";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { toast } from "react-toastify";

interface Price {
  small: number;
  medium?: number;
  large?: number;
}

interface MenuItem {
  name: string;
  prices: Price;
  image: string;
  category?: string;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem;
  searchResturanNo: any;
  searchResturanName: any;
}

const OrderModal: React.FC<OrderModalProps> = ({
  isOpen,
  onClose,
  item,
  searchResturanNo,
  searchResturanName,
}) => {
  const { api_getToppings } = ProjectApiList();

  const addItem = useCartStore((state) => state?.addItem);
  const setRestaurantNo = useCartStore((state) => state.setRestaurantNo);
  const setRestaurantAddress = useCartStore((state) => state.setRestaurantAddress);

  const [toppingData, setToppingData] = useState<Record<string, any[]> | null>(
    null
  );
  const [size, setSize] = useState<"small" | "medium" | "large">("medium");
  const [dough, setDough] = useState<"original" | "sour">("original");
  const [crust, setCrust] = useState<"garlic" | "original">("original");
  const [toppings, setToppings] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const isDrink = item.category === "DRINKS";
  const isDessert = item.category === "DESSERTS";

  const toggleTopping = (topping: string) => {
    setToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((t) => t !== topping)
        : [...prev, topping]
    );
  };

  const toggleSuggestion = (suggestion: string) => {
    setSuggestions((prev) =>
      prev.includes(suggestion)
        ? prev.filter((s) => s !== suggestion)
        : [...prev, suggestion]
    );
  };

  const sizePrice = item.prices[size] ?? 0;
  const toppingsPrice = Array.isArray(toppingData)
    ? toppingData
        .filter((t) => toppings.includes(t.name))
        .reduce((acc, curr) => acc + Number(curr.price || 0), 0)
    : 0;

  const totalPrice = sizePrice + toppingsPrice;

  const handleAddToCart = () => {
    const orderDetails: OrderItem = {
      id: uuidv4(),
      name: item.name,
      size: isDessert ? "small" : size,
      price: isDessert ? item.prices.small : isDrink ? sizePrice : totalPrice,
      quantity: 1,
      image: item.image,
      dough: !isDessert && !isDrink ? dough : undefined,
      crust: !isDessert && !isDrink ? crust : undefined,
      toppings: !isDessert && !isDrink ? toppings : [],
      suggestions: !isDessert && !isDrink ? suggestions : [],
    };
    setRestaurantNo(searchResturanNo);
    setRestaurantAddress(searchResturanName);
    addItem(orderDetails);
    onClose();
    toast.success(`${item.name} added to cart`);
  };


  useEffect(() => {
    const fetchToppings = async () => {
      try {
        const response = await axios.get(api_getToppings);
        const data = response?.data?.data || {};
        setToppingData(data);
      } catch (error) {
        console.error("Error fetching topping data:", error);
      }
    };

    fetchToppings();
  }, [api_getToppings]);

  // Place this near the top of your component
  const toppingScrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    toppingScrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    toppingScrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  // Place this near the top of your component
  const suggestionScrollRef = useRef<HTMLDivElement>(null);

  const scrollSuggestionLeft = () => {
    suggestionScrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollSuggestionRight = () => {
    suggestionScrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  // ✅ Moved after hooks to avoid violating Rules of Hooks
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-1000 flex items-center justify-center bg-black/80 [font-family:'Barlow_Condensed',Helvetica]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl h-[89vh] overflow-y-auto mx-4 md:mx-0 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-black text-2xl font-bold cursor-pointer"
        >
          <RxCross1 className="hover:text-red-600" />
        </button>

        {isDessert ? (
          <div className="bg-[#ffe6db] p-8 text-center flex flex-col items-center">
            <Image
              src={item.image}
              alt={item.name}
              width={300}
              height={300}
              className="mb-6 object-contain rounded-full"
            />
            <h2 className="text-2xl font-bold uppercase tracking-wider mb-4">
              {item.name}
            </h2>
            <button
              onClick={handleAddToCart}
              className="bg-black text-white py-2 px-6 text-sm hover:bg-gray-900 cursor-pointer"
            >
              ADD TO CART – INR {item.prices.small}
            </button>
          </div>
        ) : isDrink ? (
          <div className="bg-[#fde8dc] p-8 text-center flex flex-col items-center">
            <Image
              src={item.image}
              alt={item.name}
              width={250}
              height={250}
              className="mb-6 object-contain"
            />
            <h2 className="text-2xl font-bold uppercase">{item.name}</h2>

            <div className="flex bg-white rounded-full overflow-hidden mt-6">
              {(["small", "large"] as const).map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`px-6 py-2 text-sm font-bold transition-all cursor-pointer ${
                    size === s
                      ? "bg-orange-500 text-white"
                      : "text-black hover:text-orange-500"
                  }`}
                >
                  {s === "small" ? "SMALL (250 ml)" : "LARGE (400 ml)"}
                </button>
              ))}
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-black text-white py-2 px-6 mt-6 text-sm hover:bg-gray-900 cursor-pointer"
            >
              ADD TO CART – INR {sizePrice}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-[#fde8dc] flex justify-center items-center p-6">
              <Image
                src={item.image || "/pizza.png"}
                alt={item.name}
                width={400}
                height={400}
                className="rounded-full"
              />
            </div>

            <div className="p-6 flex flex-col justify-center space-y-4">
              <h2 className="text-3xl font-bold uppercase">{item.name}</h2>
              <p className="text-xl text-gray-700">
                Fresh{" "}
                {item.name.charAt(0).toUpperCase() +
                  item.name.slice(1).toLowerCase()}
              </p>

              {/* Size Selection */}
              <div className="flex bg-orange-100 rounded-full overflow-hidden w-full uppercase">
                {(["small", "medium", "large"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`w-full py-1 font-semibold uppercase cursor-pointer ${
                      size === s ? "bg-orange-500 text-white" : "text-black"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Dough Selection */}
              <div className="flex bg-orange-100 rounded-full overflow-hidden w-full">
                <button
                  onClick={() => setDough("original")}
                  className={`w-full py-1 font-semibold uppercase cursor-pointer ${
                    dough === "original"
                      ? "bg-orange-500 text-white"
                      : "text-black"
                  }`}
                >
                  Original Dough
                </button>
                <button
                  onClick={() => setDough("sour")}
                  className={`w-full py-1 font-semibold uppercase cursor-pointer ${
                    dough === "sour" ? "bg-orange-500 text-white" : "text-black"
                  }`}
                >
                  Sour Dough
                </button>
              </div>

              {/* Crust Selection */}
              <div className="flex bg-orange-100 rounded-full overflow-hidden w-full">
                <button
                  onClick={() => setCrust("garlic")}
                  className={`w-full py-1 font-semibold uppercase cursor-pointer ${
                    crust === "garlic"
                      ? "bg-orange-500 text-white"
                      : "text-black"
                  }`}
                >
                  Garlic Crust
                </button>
                <button
                  onClick={() => setCrust("original")}
                  className={`w-full py-1 font-semibold uppercase cursor-pointer ${
                    crust === "original"
                      ? "bg-orange-500 text-white"
                      : "text-black"
                  }`}
                >
                  Original Crust
                </button>
              </div>

              {/* Toppings */}
              <div>
                <p className="font-semibold text-base">Add topping</p>

                <div className="relative">
                  {/* Scroll Left Button */}
                  <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-orange-100"
                  >
                    <IoChevronBack className="text-xl" />
                  </button>

                  {/* Scrollable List */}
                  <div
                    ref={toppingScrollRef}
                    className="flex gap-2 overflow-x-auto flex-nowrap pb-2 no-scrollbar px-8"
                  >
                    {Array.isArray(toppingData) &&
                      toppingData.map((topping) => (
                        <div
                          key={topping.id}
                          className={`w-24 h-28 flex-shrink-0 flex flex-col items-center justify-center text-center cursor-pointer border-2 rounded-lg p-1 transition-all ${
                            toppings.includes(topping.name)
                              ? "border-orange-500"
                              : "border-transparent"
                          }`}
                          onClick={() => toggleTopping(topping.name)}
                        >
                          <div className="w-12 h-12 relative mb-1">
                            <Image
                              src={topping.image_url}
                              alt={topping.name}
                              fill
                              className="object-contain rounded-full"
                            />
                          </div>
                          <p className="text-xs mt-1 font-medium truncate w-full">
                            {topping.name}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            ₹{Number(topping.price).toFixed(0)}
                          </p>
                        </div>
                      ))}
                  </div>

                  {/* Scroll Right Button */}
                  <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-orange-100"
                  >
                    <IoChevronForward className="text-xl" />
                  </button>
                </div>
              </div>

              {/* Suggestions */}
              <div className="relative">
                {/* Scroll Left Button */}
                <p className="font-semibold mb-2 text-base">Suggestions</p>

                <button
                  onClick={scrollSuggestionLeft}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-orange-100"
                >
                  <IoChevronBack className="text-xl" />
                </button>

                {/* Scrollable Suggestions */}
                <div
                  ref={suggestionScrollRef}
                  className="flex gap-3 overflow-x-auto pb-1 no-scrollbar px-8"
                >
                  {["Jalapeños", "Mushrooms", "Corn", "Paneer", "Spinach"].map(
                    (label, i) => (
                      <div
                        key={label + i}
                        className={`min-w-[90px] w-[90px] flex-shrink-0 flex flex-col items-center justify-center text-center cursor-pointer border-2 rounded-lg p-1 transition-all ${
                          suggestions.includes(label)
                            ? "border-orange-500"
                            : "border-dashed border-gray-300"
                        }`}
                        onClick={() => toggleSuggestion(label)}
                      >
                        <Image
                          src="/garlic.png"
                          alt={label}
                          width={40}
                          height={40}
                          className="object-contain"
                        />
                        <p className="text-xs mt-1 font-medium">{label}</p>
                      </div>
                    )
                  )}
                </div>

                {/* Scroll Right Button */}
                <button
                  onClick={scrollSuggestionRight}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-orange-100"
                >
                  <IoChevronForward className="text-xl" />
                </button>
              </div>

              {/* Add to Cart */}
              <div className="flex justify-center items-center">
                <button
                  onClick={handleAddToCart}
                  className="bg-black text-white py-2 px-10 mt-4 hover:bg-gray-900 cursor-pointer"
                >
                  ADD TO CART – INR {totalPrice}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderModal;
