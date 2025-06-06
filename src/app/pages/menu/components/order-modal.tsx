"use client";

import React, { useState } from "react";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";
import useCartStore, { OrderItem } from "@/app/store/useCartStore";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";  // for App Router (Next.js 13+)

interface Price {
  small: number;
  medium?: number;
  large?: number;
}

interface MenuItem {
  name: string;
  prices: Price;
  image: string;
  category: string;
}

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: MenuItem;
}

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose, item }) => {

    const router = useRouter();

  
  const addItem = useCartStore((state) => state?.addItem);

  const [size, setSize] = useState<"small" | "medium" | "large">("medium");
  const [dough, setDough] = useState<"original" | "sour">("original");
  const [crust, setCrust] = useState<"garlic" | "original">("garlic");
  const [toppings, setToppings] = useState<string[]>([]);

  if (!isOpen) return null;

  const toggleTopping = (topping: string) => {
    setToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((t) => t !== topping)
        : [...prev, topping]
    );
  };

  const sizePrice = item.prices[size] ?? 0;
  const doughPrice = dough === "original" ? 0 : 20;
  const crustPrice = crust === "original" ? 0 : 30;
  const toppingsPrice = toppings.length * 15;
  const totalPrice = sizePrice + doughPrice + crustPrice + toppingsPrice;

  const isDrink = item.category === "DRINKS";
  const isDessert = item.category === "DESSERTS";

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
  };

  addItem(orderDetails);
  onClose();
  router.push("/pages/cart");
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 [font-family:'Barlow_Condensed',Helvetica]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl mx-4 md:mx-0 overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-black text-2xl font-bold cursor-pointer"
        >
          <RxCross1 className="hover:text-red-600" />
        </button>

        {/* 🍨 DESSERTS LAYOUT */}
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
          // 🍹 DRINKS LAYOUT
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
          // 🍕 PIZZA or OTHER ITEM LAYOUT
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

              {/* Dough */}
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

              {/* Crust */}
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
                <p className="font-semibold mb-2 text-xl">Add topping</p>
                <div className="flex justify-between gap-4">
                  {[
                    { label: "Basil", src: "/basil.png" },
                    { label: "Extra Cheese", src: "/cheese.png" },
                    { label: "Garlic", src: "/garlic.png" },
                  ].map(({ label, src }) => (
                    <div
                      key={label}
                      className={`w-32 h-30 flex flex-col items-center justify-center text-center cursor-pointer border-2 rounded-lg p-2 transition-all ${
                        toppings.includes(label)
                          ? "border-orange-500"
                          : "border-transparent"
                      }`}
                      onClick={() => toggleTopping(label)}
                    >
                      <Image
                        src={src}
                        alt={label}
                        width={74}
                        height={74}
                        className="object-contain"
                      />
                      <p className="text-sm mt-2 font-medium">{label}</p>
                    </div>
                  ))}
                </div>
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
