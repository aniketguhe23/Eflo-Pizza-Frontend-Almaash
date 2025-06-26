"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import SelectionCardModal from "./SelectionCard";
import useHomeDataStore from "@/app/store/useBuildYourOwnStore";
import ConfirmModal from "./ConfirmModal";
import { useRouter } from "next/navigation";
import useBuildYourOwnPizzaCart from "@/app/store/useBuildYourOwnPizzaCart";
import { toast } from "react-toastify";
import { PizzaOption } from "./pizza";

type Category =
  | "sizes"
  | "doughTypes"
  | "crustTypes"
  | "sauces"
  | "cheeseOptions"
  | "toppings"
  | "extraSauces";

type ExtendedPizzaOption = PizzaOption & {
  id: string;
  image_url?: string;
  image?: string;
  size?: string;
};

type Selection =
  | { name: string | null; size: string; price: number }
  | { name: string | null; size: string; price: number }[]
  | null;

// Helper to check which categories are multi-select
const isMultiSelectCategory = (category: Category) =>
  ["sauces", "cheeseOptions", "toppings", "extraSauces"].includes(category);

// Type guard to check if selection is array
function isMultiSelection(
  selection: Selection
): selection is { name: string | null; size: string; price: number }[] {
  return Array.isArray(selection);
}

export default function BuildPizza() {
  const { data } = useHomeDataStore();
  const router = useRouter();
  const { addPizza } = useBuildYourOwnPizzaCart();

  const categories: Category[] = [
    "sizes",
    "doughTypes",
    "crustTypes",
    "sauces",
    "cheeseOptions",
    "toppings",
    "extraSauces",
  ];

  const [selectedOptions, setSelectedOptions] = useState<
    Record<Category, Selection>
  >({
    sizes: null,
    doughTypes: null,
    crustTypes: null,
    sauces: [],
    cheeseOptions: [],
    toppings: [],
    extraSauces: [],
  });

  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [pizzaQuantity, setPizzaQuantity] = useState(1);

  const sectionRefs = useRef<Record<Category, HTMLDivElement | null>>(
    Object.fromEntries(categories.map((c) => [c, null])) as Record<
      Category,
      HTMLDivElement | null
    >
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [modalOption, setModalOption] = useState<{
    category: Category;
    option: PizzaOption;
  } | null>(null);

  const handleScrollToCategory = (category: Category) => {
    const element = sectionRefs.current[category];
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center", // 👈 center it in the viewport
        inline: "nearest",
      });
    }
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
    setSelectedOptions((prev) => {
      if (isMultiSelectCategory(category)) {
        const existing =
          (prev[category] as {
            name: string | null;
            size: string;
            price: number;
          }[]) || [];

        const alreadySelected = existing.find(
          (item) => item.name === optionName
        );
        const updated = alreadySelected
          ? existing.filter((item) => item.name !== optionName)
          : [...existing, { name: optionName, size, price }];
        return { ...prev, [category]: updated };
      } else {
        return {
          ...prev,
          [category]: {
            name: optionName,
            size,
            price,
          },
        };
      }
    });
    handleModalClose();
  };

  const totalPrice = Object.entries(selectedOptions).reduce((acc, [, val]) => {
    if (Array.isArray(val)) {
      return acc + val.reduce((sum, item) => sum + item.price, 0);
    } else if (val?.price) {
      return acc + val.price;
    }
    return acc;
  }, 0);

  const handleConfirm = () => {
    addPizza({
      selections: selectedOptions,
      quantity: pizzaQuantity,
    });

    setConfirmModalOpen(false);
    setSelectedOptions({
      sizes: null,
      doughTypes: null,
      crustTypes: null,
      sauces: [],
      cheeseOptions: [],
      toppings: [],
      extraSauces: [],
    });

       toast.success(`Items added to cart`);
  };

  const validateSelections = () => {
    const requiredSelections: Category[] = [
      "sizes",
      "doughTypes",
      "crustTypes",
    ];

    const missing = requiredSelections.filter((category) => {
      const value = selectedOptions[category];

      // Check for null or logically empty
      if (!value) return true;

      // If value is an object, check internal fields
      if (!Array.isArray(value)) {
        return (
          value.name === null || value.size.trim() === "" || value.price === 0
        );
      }

      return false;
    });

    if (missing.length === requiredSelections.length) {
      toast.error(
        "Please select Size, Dough Type, and Crust Type to continue!",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      return false;
    }

    if (missing.length > 0) {
      toast.error(
        `Please select ${missing
          .map((cat) =>
            cat
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())
          )
          .join(", ")} before proceeding.`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      );
      return false;
    }

    return true;
  };

  return (
    <>
      <div className="mx-auto px-4 py-8 [font-family:'Barlow_Condensed',Helvetica] shadow-md">
        <h1 className="text-4xl font-bold text-center mb-8">
          BUILD YOUR OWN PIZZA
        </h1>

        <div className="flex justify-center mb-7 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category}
              className="px-8 py-2 font-medium text-2xl cursor-pointer text-black hover:text-[#f47834] uppercase"
              onClick={() => handleScrollToCategory(category)}
            >
              {(() => {
                switch (category) {
                  case "doughTypes":
                    return "Dough";
                  case "crustTypes":
                    return "Crust";
                  case "cheeseOptions":
                    return "Cheese";
                  case "sauces":
                    return "Sauce";
                  case "extraSauces":
                    return " Sauces";
                  default:
                    return category
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase());
                }
              })()}
            </button>
          ))}
        </div>

        {categories.map((category) => (
          <div
            key={category}
            ref={(el) => {
              sectionRefs.current[category] = el;
            }}
            className="mb-14 mx-15 pt-10 pb-5"
          >
            <h2 className="text-3xl font-bold text-center mb-6 uppercase">
                {(() => {
                switch (category) {
                  case "doughTypes":
                    return "Dough";
                  case "crustTypes":
                    return "Crust";
                  case "cheeseOptions":
                    return "Cheese";
                  case "sauces":
                    return "Sauce";
                  case "extraSauces":
                    return " Sauces";
                  default:
                    return category
                      .replace(/([A-Z])/g, " $1")
                      .replace(/^./, (str) => str.toUpperCase());
                }
              })()}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-6">
              {((data?.[category] || []) as ExtendedPizzaOption[]).map(
                (option) => {
                  const name = option.name;
                  const description =
                    category === "sizes" && option.size ? option.size : "";
                  const price = option.price;
                  const image =
                    option.image_url || option.image || "/placeholder.svg";

                  const current = selectedOptions[category];
                  const isSelected = isMultiSelection(current)
                    ? current.some((sel) => sel.name === name)
                    : current?.name === name;

                  return (
                    <div
                      key={option.id}
                      className={`rounded-lg p-6 flex flex-col sm:flex-row items-center justify-center shadow-lg transition-all ${
                        isSelected ? "bg-[#f47834]" : "bg-[#fbe0d0]"
                      }`}
                    >
                      {image !== "/placeholder.svg" && (
                        <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden bg-white flex items-center justify-center mb-4 sm:mb-0 sm:mr-6">
                          <Image
                            src={image}
                            alt={name}
                            width={160}
                            height={160}
                            className="rounded-full object-cover"
                          />
                        </div>
                      )}

                      <div className="flex flex-col items-center justify-center text-center sm:text-left">
                        <h3 className="text-xl sm:text-2xl font-bold uppercase mb-1">
                          {name}
                        </h3>
                        {description && (
                          <p className="text-base font-medium mb-1">
                            {description}
                          </p>
                        )}
                        <span className="text-md sm:text-lg font-bold uppercase mb-2">
                          • INR {price}
                        </span>

                        <button
                          className={`font-bold py-2 px-6 rounded-md text-lg uppercase mt-2 cursor-pointer ${
                            isSelected
                              ? "bg-white text-black"
                              : "bg-[#f47834] text-white"
                          }`}
                          onClick={() =>
                            handleOptionSelect(category, {
                              name,
                              description,
                              price,
                              image,
                              inclusive: false,
                            })
                          }
                        >
                          {isSelected ? "SELECTED" : "SELECT"}
                        </button>
                      </div>
                    </div>
                  );
                }
              )}
            </div>
          </div>
        ))}

        <div className="flex flex-col sm:flex-row justify-between items-center bg-[#f47834] text-black px-6 py-2 w-full rounded sticky bottom-0 z-20 gap-3 sm:gap-0">
          <div className="flex items-center gap-4 text-xl font-bold">
            <span>Qty:</span>
            <button
              onClick={() => setPizzaQuantity((prev) => Math.max(1, prev - 1))}
              className="bg-black text-white w-7 h-7 flex items-center justify-center rounded-full"
            >
              -
            </button>
            <span>{pizzaQuantity}</span>
            <button
              onClick={() => setPizzaQuantity((prev) => prev + 1)}
              className="bg-black text-white w-7 h-7 flex items-center justify-center rounded-full"
            >
              +
            </button>
          </div>

          <div className="text-xl font-bold text-center">
            Total: INR {totalPrice * pizzaQuantity}
          </div>

          <button
            onClick={() => {
              if (validateSelections()) {
                setConfirmModalOpen(true);
              }
            }}
            className="bg-black text-white text-xl font-bold px-12 sm:px-56 py-2 uppercase tracking-wider hover:opacity-90 transition-all cursor-pointer"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {modalOption && (
        <SelectionCardModal
          open={modalOpen}
          handleClose={handleModalClose}
          option={modalOption.option}
          category={modalOption.category}
          onAddToCart={handleAddToCart}
          isSelected={(() => {
            const current = selectedOptions[modalOption.category];
            if (!current) return false;

            return isMultiSelection(current)
              ? current.some((sel) => sel.name === modalOption.option.name)
              : current.name === modalOption.option.name;
          })()}
          selectedOptions={selectedOptions}
        />
      )}

      <ConfirmModal
        open={confirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        onConfirm={handleConfirm}
        title="Confirm Your Pizza"
        selectedOptions={selectedOptions}
        totalPrice={totalPrice * pizzaQuantity}
        quantity={pizzaQuantity}
      />
    </>
  );
}
