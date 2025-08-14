"use client";

import { useRef, useState, useMemo } from "react";
import Image from "next/image";
import SelectionCardModal from "./SelectionCard";
import useHomeDataStore from "@/app/store/useBuildYourOwnStore";
import type { PizzaOption, Category } from "@/app/store/build-pizza";

import ConfirmModal from "./ConfirmModal";
import useBuildYourOwnPizzaCart from "@/app/store/useBuildYourOwnPizzaCart";
import { toast } from "react-toastify";

type ExtendedPizzaOption = PizzaOption & {
  id: string;
  image_url?: string;
  image?: string;
  size?: string;
  light_price?: number | string;
  regular_price?: number | string;
  extra_price?: number | string;
  price?: number | string;
};

type BuildPizzaProps = {
  pizzaSize: string;
  setPizzaSize: (size: string) => void;
};

type SelectionItem = {
  name: string | null;
  size: string;
  price: number;
  qty?: number;
};
type Selection = SelectionItem | SelectionItem[] | null;

const isMultiSelectCategory = (category: Category) =>
  ["sauces", "cheeseOptions", "toppings", "extraSauces"].includes(category);

function isMultiSelection(selection: Selection): selection is SelectionItem[] {
  return Array.isArray(selection);
}

const formatCategoryName = (category: Category) => {
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
      return "Sauces";
    default:
      return category
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
  }
};

export default function BuildPizza({
  pizzaSize,
  setPizzaSize,
}: BuildPizzaProps) {
  const { data } = useHomeDataStore();
  const { addPizza } = useBuildYourOwnPizzaCart();

  const [quantity, setQuantity] = useState(1);

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
    sizes: pizzaSize
      ? {
          name: pizzaSize,
          size: pizzaSize,
          price: data?.sizes?.find((s) => s.name === pizzaSize)?.price || 0,
        }
      : null,
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
  // const [modalOption, setModalOption] = useState<{
  //   category: Category;
  //   option: PizzaOption;
  // } | null>(null);

  const [modalOption, setModalOption] = useState<{
    category: Category;
    option: PizzaOption;
  } | null>(null);

  const handleScrollToCategory = (category: Category) => {
    sectionRefs.current[category]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  };

  const handleOptionSelect = (category: Category, option: PizzaOption) => {
    if (category === "sizes") {
      // Update pizzaSize globally and locally with price from data
      const foundSize = data?.sizes.find((s) => s.name === option.name);
      setPizzaSize(option.name || "Medium");
      setSelectedOptions((prev) => ({
        ...prev,
        sizes: {
          name: option.name,
          size: option.size || "",
          price: foundSize ? foundSize.price : 0,
        },
      }));
      return;
    }

    // Open modal for other categories
    setModalOption({ category, option });
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalOption(null);
  };

  const handleModalAddOrRemove = (
    category: Category,
    optionName: string | null,
    size: string,
    price: number,
    qty?: number
  ) => {
    setSelectedOptions((prev) => {
      const newSelections = { ...prev };

      if (isMultiSelectCategory(category)) {
        const existing = (prev[category] as SelectionItem[]) || [];
        // find exact match by name + size
        const idx = existing.findIndex(
          (item) => item.name === optionName && item.size === size
        );

        if (idx > -1) {
          // remove only the exact name+size variant
          newSelections[category] = existing.filter((_, i) => i !== idx);
        } else {
          // add variant (include qty if provided)
          newSelections[category] = [
            ...existing,
            { name: optionName, size, price, qty: qty ?? 1 },
          ];
        }
      } else {
        // single-select categories (doughTypes, crustTypes, sizes)
        const current = prev[category] as SelectionItem | null;
        if (
          !Array.isArray(current) &&
          current?.name === optionName &&
          current.size === size
        ) {
          // same variant already selected -> toggle off
          newSelections[category] = null;
        } else {
          newSelections[category] = {
            name: optionName,
            size,
            price,
            qty: qty ?? 1,
          };
        }
      }

      return newSelections;
    });
  };

  const totalPricePerPizza = useMemo(() => {
    return Object.values(selectedOptions).reduce((acc, val) => {
      if (Array.isArray(val)) {
        return (
          acc + val.reduce((sum, item) => sum + item.price * (item.qty ?? 1), 0)
        );
      } else if (val?.price) {
        return acc + val.price * (val.qty ?? 1);
      }
      return acc;
    }, 0);
  }, [selectedOptions]);

  // Multiply by quantity to get total price shown
  const totalPrice = totalPricePerPizza * quantity;

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

    toast.success("Items added to cart");
  };

  const validateSelections = () => {
    const requiredSelections: Category[] = [
      "sizes",
      "doughTypes",
      "crustTypes",
    ];

    const missing = requiredSelections.filter((category) => {
      const value = selectedOptions[category];
      if (!value) return true;
      if (!Array.isArray(value)) {
        return (
          value.name === null || value.size.trim() === "" || value.price === 0
        );
      }
      return false;
    });

    if (missing.length > 0) {
      toast.error(
        missing.length === requiredSelections.length
          ? "Please select Size, Dough Type, and Crust Type to continue!"
          : `Please select ${missing
              .map(formatCategoryName)
              .join(", ")} before proceeding.`,
        { position: "top-right", autoClose: 5000, theme: "dark" }
      );
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="mx-auto px-4 py-8 [font-family:'Barlow_Condensed',Helvetica] ">
        <h1 className="text-4xl font-bold text-center mb-8">
          BUILD YOUR OWN PIZZA
        </h1>

        {/* Category Navigation */}
        <div className="flex justify-center mb-7 items-center">
          <div className="w-[300px] sm:w-full overflow-x-auto sm:flex sm:justify-center">
            <div className="flex px-4 sm:px-0 w-max">
              {categories.map((category) => (
                <button
                  key={category}
                  className="px-8 py-2 font-medium text-2xl cursor-pointer text-black hover:text-[#f47834] uppercase"
                  onClick={() => handleScrollToCategory(category)}
                >
                  {formatCategoryName(category)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Options Sections */}
        {categories.map((category) => (
          <div
            key={category}
            ref={(el) => {
              sectionRefs.current[category] = el;
            }}
            className="mb-14 mx-15 max-sm:mx-0 pt-10 pb-5"
          >
            <h2 className="text-3xl font-bold text-center mb-6 uppercase">
              {formatCategoryName(category)}
            </h2>

            {Array.isArray(data?.[category]) && data[category].length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 max-sm:grid-cols-2 gap-6 px-6">
                {(data?.[category] || []).map((option: ExtendedPizzaOption) => {
                  const name = option.name;
                  const description =
                    category === "sizes" && option.size ? option.size : "";
                  const image =
                    option.image_url || option.image || "/placeholder.svg";

                  const current = selectedOptions[category];
                  const isSelected = isMultiSelection(current)
                    ? current.some((sel) => sel.name === name)
                    : current?.name === name;

                  let selectedVariantText = "";
                  if (isSelected) {
                    if (isMultiSelection(current)) {
                      const sel = current.find((s) => s.name === name);
                      if (sel) {
                        selectedVariantText = `${sel.size}${
                          sel.qty && sel.qty > 1 ? ` x${sel.qty}` : ""
                        } • INR ${sel.price}`;
                      }
                    } else if (current) {
                      selectedVariantText = `${current.size}${
                        (current as any).qty && (current as any).qty > 1
                          ? ` x${(current as any).qty}`
                          : ""
                      } • INR ${current.price}`;
                    }
                  }

                  const isSinglePriceCategory = [
                    "doughTypes",
                    "crustTypes",
                    "sizes",
                  ].includes(category);

                  const unselectedPrices = !isSelected ? (
                    isSinglePriceCategory ? (
                      <span className="text-md sm:text-lg font-bold uppercase mb-2">
                        INR {option.price ?? "N/A"}
                      </span>
                    ) : (
                      <div className="mb-2 flex flex-row gap-2 justify-center sm:justify-start">
                        {option.light_price !== undefined && (
                          <span className="text-md sm:text-lg font-bold uppercase">
                            INR {option.light_price}
                          </span>
                        )}
                        {option.regular_price !== undefined && (
                          <span className="text-md sm:text-lg font-bold uppercase">
                            / {option.regular_price}
                          </span>
                        )}
                        {option.extra_price !== undefined && (
                          <span className="text-md sm:text-lg font-bold uppercase">
                            / {option.extra_price}
                          </span>
                        )}
                      </div>
                    )
                  ) : null;

                  return (
                    <div
                      key={option.id}
                      className={`rounded-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-center shadow-lg transition-all gap-4 sm:gap-6 ${
                        isSelected ? "bg-[#f47834]" : "bg-[#fbe0d0]"
                      }`}
                    >
                      {image !== "/placeholder.svg" && (
                        <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-white flex items-center justify-center flex-shrink-0">
                          <Image
                            src={image}
                            alt={name}
                            width={160}
                            height={160}
                            className="rounded-full object-cover"
                          />
                        </div>
                      )}

                      <div className="flex flex-col items-center text-center w-full">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold uppercase mb-1 break-words">
                          {name}
                        </h3>

                        {description && (
                          <p className="text-sm sm:text-base font-medium mb-1 break-words">
                            {description}
                          </p>
                        )}

                        {isSelected ? (
                          <span className="text-sm sm:text-md md:text-lg font-bold uppercase mb-2">
                            {selectedVariantText}
                          </span>
                        ) : (
                          <div className="mb-2">{unselectedPrices}</div>
                        )}

                        <button
                          className={`rounded-md py-2 px-3 text-sm sm:text-lg font-semibold w-full sm:w-36 cursor-pointer transition-colors ${
                            isSelected
                              ? "bg-white text-black hover:bg-white"
                              : "bg-[#f47834] text-black hover:bg-[#da5c03]"
                          }`}
                          onClick={() => handleOptionSelect(category, option)}
                        >
                          {isSelected ? "Selected" : "Add"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-gray-500 text-lg">
                Not available for this Pizza Size
              </p>
            )}
          </div>
        ))}

        <div className="sticky bottom-0 left-0 right-0 bg-[#f47834] px-6 py-2 rounded-md flex items-center justify-between z-50">
          {/* Qty Section */}
          <div className="flex items-center gap-3">
            <span className="font-bold text-lg">Qty:</span>
            <button
              onClick={() => setQuantity((q) => (q > 1 ? q - 1 : 1))}
              className="bg-black text-white w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold"
            >
              −
            </button>
            <span className="text-lg font-bold">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="bg-black text-white w-8 h-8 flex items-center justify-center rounded-full text-lg font-bold"
            >
              +
            </button>
          </div>

          {/* Total Section */}
          <div className="flex items-center gap-8">
            <span className="font-bold text-lg">Total: INR {totalPrice}</span>
          </div>
          <div className="flex items-center gap-8">
            <button
              className="bg-black text-white px-6 py-3 rounded cursor-pointer font-bold hover:bg-gray-900 max-sm:px-3 max-sm:py-2"
              onClick={() => {
                if (validateSelections()) {
                  setConfirmModalOpen(true);
                }
              }}
            >
              ADD TO CART
            </button>
          </div>
        </div>

        {/* Confirm Add to Cart Modal */}
        <ConfirmModal
          open={confirmModalOpen}
          onClose={() => setConfirmModalOpen(false)}
          onConfirm={handleConfirm}
          quantity={pizzaQuantity}
          totalPrice={totalPrice}
          selectedOptions={selectedOptions}
        />

        {/* Option Selection Modal */}
        {modalOption && (
          <SelectionCardModal
            open={modalOpen}
            onClose={handleModalClose}
            category={modalOption.category}
            option={modalOption.option}
            onAddOrRemove={handleModalAddOrRemove}
            selectedItems={selectedOptions[modalOption.category]}
            pizzaSize={pizzaSize}
          />
        )}
      </div>
    </>
  );
}
