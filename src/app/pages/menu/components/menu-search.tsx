'use client';

import React, { useState } from "react";
import OrderModal from "./order-modal";
import Image from "next/image";

// sample Items:
const sampleItems = [
  {
    name: "MARGHERITA (CHEESE)",
    prices: { small: 199, medium: 279, large: 499 },
    image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
  },
  {
    name: "CHEESE & TOMATO",
    prices: { small: 189, medium: 279, large: 499 },
    image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
  },
  {
    name: "MARGHERITA (CHEESE)",
    prices: { small: 209, medium: 279, large: 499 },
    image: `https://res.cloudinary.com/dnkfvkyre/image/upload/v1747202665/item_images/xkfzmqpzayofb1hwmi79.png`,
  },
];

const MenuSearch = () => {
  const [query, setQuery] = useState("");
  const [filteredItems, setFilteredItems] = useState<typeof sampleItems>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<(typeof sampleItems)[number] | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const filtered = sampleItems.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(value ? filtered : []);
  };

  const handleSelect = (item: (typeof sampleItems)[number]) => {
    setSelectedItem(item); // set selected item
    setIsOpen(true);       // open modal
    // setQuery(item.name);   // set input to item name
    setFilteredItems([]);  // close dropdown
  };

  return (
    <div className="relative ">
      {filteredItems.length > 0 && (
        <div className="fixed inset-0 bg-black/50 z-10"></div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-10 text-center relative z-20">
        <h1 className="text-3xl font-extrabold uppercase mb-3 [font-family:'Barlow_Condensed',Helvetica]">
          SELECT FROM ELFO’S DELICIOUS MENU
        </h1>
        <p className="text-base mb-8 [font-family:'Nunito_Sans',Helvetica]">
          Welcome to Elfo’s Pizza - where passion meets flavor! Discover
          hand-crafted, mouthwatering pizzas with unique toppings, made fresh with
          premium ingredients and irresistible combinations.
        </p>

        <div className="relative max-w-xl mx-auto text-left">
          <div className="flex">
            <div className="relative flex-grow">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M16.65 16.65A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
                />
              </svg>
              <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Pizza, Drinks, Sides"
                className="w-full rounded-l-md border border-gray-300 pl-10 pr-4 py-2 focus:outline-none [font-family:'Nunito_Sans',Helvetica] bg-white"
              />
            </div>
            <button
              type="submit"
              className="bg-orange-600 text-white px-6 rounded-r-md hover:bg-orange-700 transition cursor-pointer"
            >
              Search
            </button>
          </div>

          {filteredItems.length > 0 && (
            <div className="absolute w-full bg-[#fff4ee] border border-orange-200 shadow-lg rounded-md mt-2 z-30 max-h-110 overflow-auto">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-around bg-[#fff4ee] border border-orange-100 mb-5 hover:bg-[#ffb992] transition-shadow duration-300"
                >
                  <div className="rounded-full overflow-hidden border-2 border-orange-300 bg-white flex items-center justify-center my-2">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={130}
                      height={130}
                      className="object-cover w-full h-full rounded-full"
                    />
                  </div>

                  <div className="flex-col justify-start items-start mr-12">
                    <h3 className="text-2xl font-extrabold uppercase tracking-wide text-[#1e1e1e] [font-family:'Barlow_Condensed',Helvetica]">
                      {item.name}
                    </h3>
                    <p className="text-xl font-bold mt-2 tracking-wide text-[#222] [font-family:'Nunito_Sans',Helvetica]">
                      INR {item.prices.small} / {item.prices.medium} / {item.prices.large}
                    </p>
                    <div className="mt-5">
                      <button
                        onClick={() => handleSelect(item)}
                        className="bg-[#f47834] hover:bg-orange-600 text-white text-xl font-extrabold py-2 px-6 rounded-xl transition-all duration-200 shadow-md uppercase tracking-wider cursor-pointer border border-black"
                      >
                        SELECT
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Order Modal */}
      {selectedItem && (
        <OrderModal
          isOpen={isOpen}
          item={selectedItem}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default MenuSearch;
