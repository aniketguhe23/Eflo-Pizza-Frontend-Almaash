"use client";
import { useRef, useState } from "react";
import { pizzaOptions } from "./pizzaOptions";
import Image from "next/image";
import SelectionCardModal from "./SelectionCard";

type Category = keyof typeof pizzaOptions;

export interface PizzaOption {
  name: string;
  description?: string;
  price?: string;
  image?: string;
  inclusive: boolean;
}

export default function BuildPizza() {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<
      Category,
      { name: string | null; size: string; price: number } | null
    >
  >({
    SIZES: null,
    DOUGH: null,
    SAUCE: null,
    CHEESE: null,
    TOPPING: null,
    SAUCES: null,
    CRUST: null,
  });

  const categories: Category[] = [
    "SIZES",
    "DOUGH",
    "CRUST",
    "SAUCE",
    "CHEESE",
    "TOPPING",
    "SAUCES",
  ];

  const sectionRefs = useRef<Record<Category, HTMLDivElement | null>>({
    SIZES: null,
    DOUGH: null,
    SAUCE: null,
    CHEESE: null,
    TOPPING: null,
    SAUCES: null,
    CRUST: null,
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOption, setModalOption] = useState<{
    category: Category;
    option: PizzaOption;
  } | null>(null);

  const handleScrollToCategory = (category: Category) => {
    sectionRefs.current[category]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleOptionSelect = (category: Category, option: PizzaOption) => {
    setModalOption({ category, option });
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalOption(null);
  };

  const handleAddToCart = (
    category: Category,
    optionName: string | null,
    size: string,
    price: number
  ) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: {
        name: optionName,
        size,
        price,
      },
    }));
    handleModalClose();
  };

  // Calculate total price from selected options
  const totalPrice = Object.values(selectedOptions).reduce((acc, val) => {
    if (val && val.price) {
      return acc + val.price;
    }
    return acc;
  }, 0);

  // Final Add to Cart handler
  const handleFinalAddToCart = () => {
    // You can send this data to API or context store as needed
    console.log("Final Selected Items:", selectedOptions);
    alert(`Added to cart! Total price: INR ${totalPrice}`);
  };

  return (
    <>
      <div className="mx-auto px-4 py-8 [font-family:'Barlow_Condensed',Helvetica] shadow-md">
        <h1 className="text-4xl font-bold text-center mb-8">
          BUILD YOUR OWN PIZZA
        </h1>

        {/* Navigation */}
        <div className="flex justify-center mb-7 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              className="px-8 py-2 font-medium text-2xl cursor-pointer text-black hover:text-[#f47834]"
              onClick={() => handleScrollToCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sections */}
        {categories.map((category) => (
          <div
            key={category}
            ref={(el) => {
              sectionRefs.current[category] = el;
            }}
            className="mb-14 mx-15 pt-10 pb-5"
          >
            <h2 className="text-3xl font-bold text-center mb-6">{category}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6">
              {pizzaOptions[category].map((option: PizzaOption) => (
                <div
                  key={option.name}
                  className={`rounded-lg p-6 flex flex-col sm:flex-row items-center justify-center shadow-lg transition-all ${
                    selectedOptions[category]?.name === option.name
                      ? "bg-[#f47834]"
                      : "bg-[#fbe0d0]"
                  }`}
                >
                  {option?.image && (
                    <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden bg-white flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
                      <Image
                        src={option.image || "/placeholder.svg"}
                        alt={option.name || "pizza option"}
                        width={160}
                        height={160}
                        className="rounded-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex flex-col items-center justify-center  text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold uppercase mb-1">
                      {option.name}
                    </h3>
                    <h3 className="text-xl sm:text-2xl font-bold uppercase mb-1">
                      {option.description}
                    </h3>

                    <span className="text-md sm:text-lg font-bold uppercase mb-2">
                      • {option.inclusive ? "INCLUSIVE" : option.price}
                    </span>

                    <button
                      className={`font-bold py-2 px-6 rounded-md text-lg uppercase mt-2 cursor-pointer ${
                        selectedOptions[category]?.name === option.name
                          ? "bg-white text-black"
                          : "bg-[#f47834] text-white"
                      }`}
                      onClick={() => handleOptionSelect(category, option)}
                    >
                      {
                        selectedOptions[category]?.name === option.name
                          ? "SELECTED"
                          : "SELECT"
                      }
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Finish Button */}
        <div className="flex justify-between items-center bg-[#f47834] text-black px-6 py-2 w-full rounded sticky bottom-0 z-20">
          {/* Total */}
          <div className="text-xl">
            <span className="mr-1 font-bold">Total:</span>
            <span>INR {totalPrice}</span>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleFinalAddToCart}
            className="bg-black text-white text-xl font-bold px-56 py-2 uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Modal */}
      {modalOption && (
        <SelectionCardModal
          open={modalOpen}
          handleClose={handleModalClose}
          option={modalOption.option}
          category={modalOption.category}
          onAddToCart={handleAddToCart}
          isSelected={
            selectedOptions[modalOption.category]?.name ===
            modalOption.option.name
          }
          selectedOptions={selectedOptions}
        />
      )}
    </>
  );
}
