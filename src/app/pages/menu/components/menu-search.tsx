"use client";

import React, { useEffect, useState } from "react";
import OrderModal from "./order-modal";
import Image from "next/image";

const MenuSearch = ({ menuData }: any) => {
  const [query, setQuery] = useState("");
  const [allItems, setAllItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Flatten menuData into a single array of items
  useEffect(() => {
    if (menuData) {
      const flatItems = Object.values(menuData).flat();
      setAllItems(flatItems);
    }
  }, [menuData]);

  // Handle search input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    const filtered = allItems.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredItems(value ? filtered : []);
  };

  // Handle select and open modal
  const handleSelect = (item: any) => {
    setSelectedItem(item);
    setIsOpen(true);
    setFilteredItems([]);
  };

  return (
    <div className="relative">
      {filteredItems.length > 0 && (
        <div className="fixed inset-0 bg-black/50 z-10"></div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-10 text-center relative z-20">
        <h1 className="text-3xl font-extrabold uppercase mb-3 [font-family:'Barlow_Condensed',Helvetica]">
          SELECT FROM ELFO’S DELICIOUS MENU
        </h1>
        <p className="text-base mb-8 [font-family:'Nunito_Sans',Helvetica]">
          Welcome to Elfo’s Pizza - where passion meets flavor! Discover
          hand-crafted, mouthwatering pizzas with unique toppings, made fresh
          with premium ingredients and irresistible combinations.
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

          {/* Search Results */}
          {filteredItems.length > 0 && (
            <div className="absolute w-full bg-[#fff4ee] border border-orange-200 shadow-lg rounded-md mt-2 z-30 max-h-110 overflow-auto">
              {filteredItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-around bg-[#fff4ee] border border-orange-100 mb-5 hover:bg-[#ffb992] transition-shadow duration-300"
                >
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-orange-300 bg-white flex items-center justify-center my-2 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-col justify-start items-start mr-12">
                    <h3 className="text-2xl font-extrabold uppercase tracking-wide text-[#1e1e1e] [font-family:'Barlow_Condensed',Helvetica]">
                      {item.name}
                    </h3>
                    <p className="text-xl font-bold mt-2 tracking-wide text-[#222] [font-family:'Nunito_Sans',Helvetica]">
                      INR {item.prices.small || "-"} /{" "}
                      {item.prices.medium || "-"} / {item.prices.large || "-"}
                    </p>
                    <div className="mt-5">
                      <button
                        onClick={() => handleSelect(item)}
                        className="bg-[#f47834] hover:bg-orange-600 text-white text-md font-extrabold py-2 px-6 rounded-xl transition-all duration-200 shadow-md uppercase tracking-wider cursor-pointer border border-black"
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
          searchResturanNo={selectedItem} // ✅ already passed
          searchResturanName={selectedItem?.name || ""} // ✅ FIX: add this line
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default MenuSearch;
