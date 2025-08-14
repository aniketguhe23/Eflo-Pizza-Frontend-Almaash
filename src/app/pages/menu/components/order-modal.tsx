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
  description?: string;
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
  const { api_getToppings, api_getBreadSize } = ProjectApiList();

  const addItem = useCartStore((state) => state?.addItem);
  const setRestaurantNo = useCartStore((state) => state.setRestaurantNo);
  const setRestaurantAddress = useCartStore(
    (state) => state.setRestaurantAddress
  );

  const [toppingData, setToppingData] = useState<Record<string, any[]> | null>(
    null
  );
  const [size, setSize] = useState<"small" | "medium" | "large">("small");
  const [dough, setDough] = useState<"pan style" | "thin style">("pan style");
  const [crust, setCrust] = useState<"garlic" | "original">("original");
  const [toppings, setToppings] = useState<string[]>([]);
  const [breadSize, setBreadSize] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedBread, setSelectedBread] = useState<any>(null);

  const handleSizeChange = (s: "small" | "medium" | "large") => {
    const selectedPrice = item.prices[s] ?? 0;
    if (selectedPrice === 0) {
      toast.error("Size not available");
      return;
    }
    setSize(s);

    // Find breadSize data matching the clicked size
    const matched = breadSize.find(
      (b: any) => b.name.toLowerCase() === s.toLowerCase()
    );
    setSelectedBread(matched || null);
  };

  useEffect(() => {
    // Default to "small" bread
    const defaultBread = breadSize.find(
      (b: any) => b.name.toLowerCase() === "small"
    );
    setSelectedBread(defaultBread || null);
  }, [breadSize]);

  const isDrink = item.category === "DRINKS";
  const isDessert = item.category === "DESSERTS";

  const toggleTopping = (topping: string) => {
    // if (sizePrice > 0) {
    //   return; // Disable toggling if sizePrice is greater than 0
    // }
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
        .reduce((acc, curr) => acc + Number(curr.regular_price || 0), 0)
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
        const formattedSize =
          size.charAt(0).toUpperCase() + size.slice(1).toLowerCase();

        const response = await axios.get(
          `${api_getToppings}?pizza_size=${formattedSize}`
        );
        const data = response?.data?.data || {};
        setToppingData(data);
      } catch (error) {
        console.error("Error fetching topping data:", error);
      }
    };

    fetchToppings();
  }, [api_getToppings, size]);

  useEffect(() => {
    const fetchToppings = async () => {
      try {
        const response = await axios.get(`${api_getBreadSize}`);
        const data = response?.data?.data || {};
        setBreadSize(data);
      } catch (error) {
        console.error("Error fetching topping data:", error);
      }
    };

    fetchToppings();
  }, [api_getBreadSize]);

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

  // useEffect(() => {
  //   const selectedPrice = item.prices[size] ?? 0;
  //   if (selectedPrice === 0) {
  //     toast.error("Size not available");
  //   }
  // }, [size, item.prices]);

  // ✅ Moved after hooks to avoid violating Rules of Hooks
  if (!isOpen) return null;

  // console.log(item, "item ============>");

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 [font-family:'Barlow_Condensed',Helvetica]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-3xl max-h-[95vh] overflow-y-auto mx-2 sm:mx-4 md:mx-0 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-black text-2xl font-bold cursor-pointer z-50"
        >
          <RxCross1 className="hover:text-red-600" />
        </button>

        {isDessert ? (
          <div className="bg-[#ffe6db] p-4 sm:p-8 text-center flex flex-col items-center">
            <Image
              src={item.image}
              alt={item.name}
              width={250}
              height={250}
              className="mb-4 sm:mb-6 object-contain rounded-full"
            />
            <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wider mb-3 sm:mb-4">
              {item.name}
            </h2>
            <button
              // onClick={handleAddToCart}
              onClick={() => {
                const price = item.prices.small ?? 0;
                if (price <= 0) {
                  toast.error("Size not available");
                  return;
                }
                handleAddToCart();
              }}
              className="bg-black text-white py-2 px-4 sm:px-6 text-sm hover:bg-gray-900 cursor-pointer"
            >
              ADD TO CART – INR {item.prices.small}
            </button>
          </div>
        ) : isDrink ? (
          <div className="bg-[#fde8dc] p-4 sm:p-8 text-center flex flex-col items-center">
            <Image
              src={item.image}
              alt={item.name}
              width={200}
              height={200}
              className="mb-4 sm:mb-6 object-contain w-[150px] h-[150px] sm:w-[200px] sm:h-[200px]"
            />
            <h2 className="text-xl sm:text-2xl font-bold uppercase">
              {item.name}
            </h2>

            <div className="flex bg-white rounded-full overflow-hidden mt-4 sm:mt-6">
              {(["small", "medium", "large"] as const).map((s) => (
                <button
                  key={s}
                  // onClick={() => setSize(s)}
                  onClick={() => {
                    const selectedPrice = item.prices[s] ?? 0;
                    if (selectedPrice === 0) {
                      toast.error("Size not available");
                      return;
                    }
                    setSize(s);
                  }}
                  className={`px-4 sm:px-6 py-2 text-sm font-bold transition-all cursor-pointer ${
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
              onClick={() => {
                if (sizePrice <= 0) {
                  toast.error("Please select size");
                  return;
                }
                handleAddToCart();
              }}
              className="bg-black text-white py-2 px-4 sm:px-6 mt-4 sm:mt-6 text-sm hover:bg-gray-900 cursor-pointer"
            >
              ADD TO CART – INR {sizePrice}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-[1400px] mx-auto">
            {/* Left Image */}
            <div className="bg-[#fde8dc] flex flex-col justify-center items-center p-3 sm:p-6 relative">
              <Image
                src={item.image || "/pizza.png"}
                alt={item.name}
                width={300}
                height={300}
                className={`object-contain transition-all duration-300 ease-in-out
        ${
          size === "small"
            ? "w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] rotate-3"
            : ""
        }
        ${
          size === "medium"
            ? "w-[180px] h-[180px] sm:w-[230px] sm:h-[230px] rotate-6"
            : ""
        }
        ${
          size === "large"
            ? "w-[220px] h-[220px] sm:w-[270px] sm:h-[270px] rotate-12"
            : ""
        }
      `}
              />

              {/* Selected Bread Info */}
              {selectedBread && (
                <div className="bg-white p-2 rounded-lg shadow-md text-center text-xs sm:text-sm md:text-base mb-16">
                  <p className="font-semibold">
                    {selectedBread.name} – {selectedBread.size}
                  </p>
                </div>
              )}

              {/* Description fixed at bottom */}
              {item.description && (
                <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-300 h-20 max-sm:h-16 flex items-center overflow-y-auto no-scrollbar">
                  <p className="text-xs sm:text-sm md:text-base whitespace-normal break-words">
                    {item.description}
                  </p>
                </div>
              )}
            </div>

            {/* Right Options */}
            <div className="p-3 sm:p-6 flex flex-col justify-center space-y-3 sm:space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold uppercase break-words">
                {item.name}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 capitalize">
                Fresh {item.name.toLowerCase()}
              </p>

              {/* Size Selection */}
              <div className="flex bg-orange-100 rounded-full overflow-hidden w-full uppercase text-xs sm:text-sm md:text-base">
                {(["small", "medium", "large"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      const selectedPrice = item.prices[s] ?? 0;
                      if (selectedPrice === 0) {
                        toast.error("Size not available");
                        return;
                      }
                      setSize(s);
                      handleSizeChange(s);
                    }}
                    className={`w-full py-1 font-semibold uppercase cursor-pointer ${
                      size === s ? "bg-orange-500 text-white" : "text-black"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>

              {/* Dough Selection */}
              <div className="flex bg-orange-100 rounded-full overflow-hidden w-full text-xs sm:text-sm md:text-base">
                <button
                  onClick={() => setDough("pan style")}
                  className={`w-full py-1 font-semibold uppercase cursor-pointer ${
                    dough === "pan style"
                      ? "bg-orange-500 text-white"
                      : "text-black"
                  }`}
                >
                  Pan Style
                </button>
                <button
                  onClick={() => setDough("thin style")}
                  className={`w-full py-1 font-semibold uppercase cursor-pointer ${
                    dough === "thin style"
                      ? "bg-orange-500 text-white"
                      : "text-black"
                  }`}
                >
                  Thin Style
                </button>
              </div>

              {/* Crust Selection */}
              <div className="flex bg-orange-100 rounded-full overflow-hidden w-full text-xs sm:text-sm md:text-base">
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
                <p className="font-semibold text-xs sm:text-sm md:text-base mb-1">
                  Add topping
                </p>

                <div className="relative">
                  {/* Scroll Left Button */}
                  <button
                    onClick={scrollLeft}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-orange-100"
                  >
                    <IoChevronBack className="text-lg sm:text-xl" />
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
                          className={`w-16 sm:w-20 md:w-24 h-20 sm:h-24 md:h-28 flex-shrink-0 flex flex-col items-center justify-center text-center border-2 rounded-lg p-1 transition-all ${
                            toppings.includes(topping.name)
                              ? "border-orange-500"
                              : "border-transparent"
                          } ${
                            sizePrice <= 0
                              ? "pointer-events-none opacity-50"
                              : "cursor-pointer"
                          }`}
                          onClick={() => {
                            if (sizePrice > 0) toggleTopping(topping.name);
                          }}
                        >
                          <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 relative mb-1">
                            <Image
                              src={topping.image_url}
                              alt={topping.name}
                              fill
                              className="object-contain rounded-full"
                            />
                          </div>
                          <p className="text-[9px] sm:text-[10px] md:text-xs mt-1 font-medium truncate w-full">
                            {topping.name}
                          </p>
                          <p className="text-[8px] sm:text-[9px] md:text-[10px] text-gray-500">
                            ₹{Number(topping.regular_price).toFixed(0)}
                          </p>
                        </div>
                      ))}
                  </div>

                  {/* Scroll Right Button */}
                  <button
                    onClick={scrollRight}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md rounded-full p-1 hover:bg-orange-100"
                  >
                    <IoChevronForward className="text-lg sm:text-xl" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <div className="flex justify-center items-center">
                <button
                  onClick={handleAddToCart}
                  disabled={totalPrice <= 0 || sizePrice <= 0}
                  className={`bg-black text-white py-2 px-4 sm:px-6 md:px-10 mt-4 text-xs sm:text-sm md:text-base rounded-md 
          ${
            totalPrice > 0 && sizePrice > 0
              ? "cursor-pointer hover:bg-gray-900"
              : "cursor-not-allowed opacity-70"
          }
        `}
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
