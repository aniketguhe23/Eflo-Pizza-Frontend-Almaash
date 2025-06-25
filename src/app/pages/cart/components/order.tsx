"use client";

import useBuildYourOwnPizzaCart from "@/app/store/useBuildYourOwnPizzaCart";
import useCartStore from "@/app/store/useCartStore";
import { Minus, Plus, Tag } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface OrdersProps {
  setShowRight: (value: boolean) => void;
}

export default function Orders({ setShowRight }: OrdersProps) {
  const { orderItems, addOns, updateQuantity, toggleAddOn, setAddOns } =
    useCartStore();
  const { pizzas, updatePizzaQuantity } = useBuildYourOwnPizzaCart();

  const initialAddOns = [
    {
      id: "cookies",
      name: "Cookies",
      price: 75,
      image: "/images/garlic.png",
      added: false,
    },
    {
      id: "lemonade",
      name: "Lemonade",
      price: 15,
      image: "/images/garlic.png",
      added: false,
    },
    {
      id: "garlic",
      name: "Garlic Bread",
      price: 15,
      image: "/images/garlic.png",
      added: false,
    },
    {
      id: "mushroom-soup",
      name: "Mushroom Soup",
      price: 15,
      image: "/images/garlic.png",
      added: false,
    },
  ];

  useEffect(() => {
    if (orderItems.length === 0 && pizzas.length === 0) {
      setAddOns([]);
    } else if (addOns.length === 0) {
      setAddOns(initialAddOns);
    }
  }, [orderItems.length, pizzas.length]);

  const orderItemsTotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const pizzaItemsTotal = pizzas.reduce((sum, pizza) => {
    const pizzaPrice = pizza?.selections
      ? Object.values(pizza.selections).reduce((acc, option) => {
          if (Array.isArray(option)) {
            return (
              acc +
              option.reduce((innerSum, o) => innerSum + (o?.price || 0), 0)
            );
          }
          return acc + (option?.price || 0);
        }, 0)
      : 0;

    return sum + pizzaPrice * (pizza.quantity || 1);
  }, 0);

  const addOnsTotal = addOns
    .filter((item) => item.added)
    .reduce((sum, item) => sum + item.price, 0);

  const itemTotal = orderItemsTotal + pizzaItemsTotal + addOnsTotal;
  const discount = 211;
  const gstAndCharges = 33.3;
  const total = itemTotal - discount + gstAndCharges;

  const handleProceedToPay = () => {
    const selectedAddOns = addOns.filter((a) => a.added);
    console.log("🧾 Final Order:", {
      orderItems,
      pizzas,
      addOns: selectedAddOns,
      billing: {
        itemTotal,
        discount,
        gstAndCharges,
        total,
      },
    });
  };

  const isCartEmpty = orderItems.length === 0 && pizzas.length === 0;

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen pt-10 rounded-lg mt-5">
      <div className="text-center py-6">
        <h1 className="text-orange-500 font-semibold text-lg">YOUR ORDER</h1>
      </div>

      {isCartEmpty ? (
        <div className="flex flex-col items-center justify-center h-[40vh] text-gray-500">
          <Image
            src="/empty-cart.png"
            alt="No items"
            width={180}
            height={180}
            className="mb-4"
          />
          <h2 className="text-lg font-semibold">No items in cart</h2>
          <p className="text-sm">
            You can still select Add-ons above. Try pairing with something!
          </p>
        </div>
      ) : (
        <>
          {/* Regular Items */}
          <div className="px-4 space-y-4">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-4 border-b border-gray-100"
              >
                <div className="w-20 h-20 mr-5">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={90}
                    height={90}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-base">
                    {item.name}
                  </h3>
                  <div className="mt-1 text-sm text-gray-600 space-y-1">
                    {item.size && (
                      <p>
                        <span className="font-medium text-gray-700">Size:</span>{" "}
                        {item.size}
                      </p>
                    )}
                    {item.dough && (
                      <p>
                        <span className="font-medium text-gray-700">
                          Dough:
                        </span>{" "}
                        {item.dough}
                      </p>
                    )}
                    {item.crust && (
                      <p>
                        <span className="font-medium text-gray-700">
                          Crust:
                        </span>{" "}
                        {item.crust}
                      </p>
                    )}
                    {item.toppings?.length ? (
                      <p>
                        <span className="font-medium text-gray-700">
                          Toppings:
                        </span>{" "}
                        {item.toppings.join(", ")}
                      </p>
                    ) : null}
                    {item.suggestions?.length ? (
                      <p>
                        <span className="font-medium text-gray-700">
                          Suggestions:
                        </span>{" "}
                        {item.suggestions.join(", ")}
                      </p>
                    ) : null}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{item.price}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Custom Pizza Items */}
            {pizzas.map((pizza, index) => {
              const totalPizzaPrice = Object.values(
                pizza.selections || {}
              ).reduce((sum, option) => {
                if (Array.isArray(option)) {
                  return sum + option.reduce((s, o) => s + (o?.price || 0), 0);
                }
                return sum + (option?.price || 0);
              }, 0);
              return (
                <div
                  key={`pizza-${index}`}
                  className="flex items-center justify-between py-4 border-b border-gray-100"
                >
                  <div className="w-20 h-20 mr-5">
                    <Image
                      src="/pizza.png"
                      alt="Custom Pizza"
                      width={90}
                      height={90}
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 text-base">
                      Custom Pizza #{index + 1}
                    </h3>
                    <div className="mt-1 text-sm text-gray-600 space-y-1">
                      {Object.entries(pizza.selections).map(([key, option]) => {
                        if (Array.isArray(option)) {
                          return option.map(
                            (o, i) =>
                              o?.name && (
                                <p key={`${key}-${i}`}>
                                  <span className="font-medium text-gray-700">
                                    {key
                                      .replace(/([A-Z])/g, " $1")
                                      .replace(/^./, (s) => s.toUpperCase())}
                                    :
                                  </span>{" "}
                                  {o.name}
                                </p>
                              )
                          );
                        }

                        return option?.name ? (
                          <p key={key}>
                            <span className="font-medium text-gray-700">
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (s) => s.toUpperCase())}
                              :
                            </span>{" "}
                            {option.name}
                          </p>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updatePizzaQuantity(index, -1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{pizza.quantity}</span>
                      <button
                        onClick={() => updatePizzaQuantity(index, 1)}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">
                        ₹{pizza.quantity * totalPizzaPrice}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 🍪 Add-ons Section */}
          {addOns.length > 0 && (
            <div className="px-6 py-8">
              <h2 className="text-center font-bold text-xl text-black mb-6">
                Pair it with
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {addOns.map((addOn) => (
                  <div
                    key={addOn.id}
                    className={`flex flex-col items-center border rounded-lg p-4 text-center shadow-sm transition-all duration-300 ${
                      addOn.added ? "border-orange-400" : "border-orange-200"
                    }`}
                  >
                    <div className="w-20 h-20 relative mb-3">
                      <Image
                        src={addOn.image || "/placeholder.svg"}
                        alt={addOn.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <h4 className="font-semibold text-sm text-gray-900 mb-1 uppercase">
                      {addOn.name}
                    </h4>
                    <p className="text-sm text-black font-medium mb-2">
                      INR {addOn.price}
                    </p>
                    <button
                      onClick={() => toggleAddOn(addOn.id)}
                      className={`w-full text-xs font-semibold px-3 py-1.5 rounded ${
                        addOn.added
                          ? "text-red-500 border border-red-400 bg-gray-100"
                          : "bg-orange-500 text-white hover:bg-orange-600"
                      }`}
                    >
                      {addOn.added ? "REMOVE" : "ADD"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Billing Summary */}
          <div className="px-4 py-6">
            <h2 className="text-center font-semibold text-gray-900 mb-4">
              Bill Detail
            </h2>

            <button
              className="w-full mb-6 bg-orange-200 hover:bg-orange-300 text-gray-900 font-semibold px-3 py-2 rounded cursor-pointer"
              onClick={() => setShowRight(true)}
            >
              <Tag className="w-4 h-4 inline mr-2" />
              APPLY DISCOUNT
            </button>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Item Total</span>
                <span className="font-semibold">₹{Math.round(itemTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-orange-500">Item discount</span>
                <span className="text-orange-500">-₹{discount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-sm">GST</span>
                <span className="font-semibold">₹{gstAndCharges}</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between">
                <span className="font-bold text-gray-900">TOTAL</span>
                <span className="font-bold text-gray-900">
                  ₹{Math.round(total)}
                </span>
              </div>
            </div>

            <button
              onClick={handleProceedToPay}
              className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white text-base font-semibold py-3 rounded"
            >
              Proceed to Pay
            </button>
          </div>
        </>
      )}
    </div>
  );
}
