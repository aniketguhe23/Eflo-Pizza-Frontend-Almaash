"use client";

import useCartStore from "@/app/store/useCartStore";
import { Minus, Plus, Tag } from "lucide-react";
import Image from "next/image";

interface OrdersProps {
  setShowRight: (value: boolean) => void;
}

export default function Orders({ setShowRight }: OrdersProps) {
  const { orderItems, addOns, updateQuantity, toggleAddOn } = useCartStore();

  const itemTotal =
    orderItems.reduce(
      (sum: any, item: any) => sum + item.price * item.quantity,
      0
    ) +
    addOns
      .filter((item: any) => item.added)
      .reduce((sum: any, item: any) => sum + item.price, 0);
  const discount = 211;
  const gstAndCharges = 33.3;
  const total = itemTotal - discount + gstAndCharges;

  if (orderItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] text-gray-500">
        <Image
          src="/empty-cart.png"
          alt="No items"
          width={180}
          height={180}
          className="mb-4"
        />
        <h2 className="text-lg font-semibold">No items in cart</h2>
        <p className="text-sm">
          Your order list is empty. Add something yummy!
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen pt-15 rounded-lg mt-5">
      <div className="text-center py-6">
        <h1 className="text-orange-500 font-semibold text-lg">YOUR ORDER</h1>
      </div>

      {/* Order List */}
      <div className="px-4 space-y-4">
        {orderItems?.map((item: any) => (
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

              <div className="mt-1  text-sm text-gray-600">
                <p>
                  <span className="font-medium text-gray-700">Size:</span>{" "}
                  <span className="capitalize">{item.size}</span>
                </p>

                {item.dough && (
                  <p>
                    <span className="font-medium text-gray-700">Dough:</span>{" "}
                    <span className="capitalize">{item.dough}</span>
                  </p>
                )}

                {item.crust && (
                  <p>
                    <span className="font-medium text-gray-700">Crust:</span>{" "}
                    <span className="capitalize">{item.crust}</span>
                  </p>
                )}

                {item.toppings && item.toppings.length > 0 && (
                  <p>
                    <span className="font-medium text-gray-700">Toppings:</span>{" "}
                    {item.toppings.map((top: string, idx: number) => (
                      <span key={idx} className="capitalize">
                        {top}
                        {idx !== item.toppings.length - 1 && ", "}
                      </span>
                    ))}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <div className="text-right">
                <p className="font-semibold">{item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add-ons */}
      {addOns.length > 0 && (
        <div className="px-4 py-6">
          <h2 className="text-center font-semibold text-gray-900 mb-4">
            Pair it with
          </h2>
          <div className="grid grid-cols-4 gap-3">
            {addOns.map((addOn: any) => (
              <div
                key={addOn.id}
                className="border border-orange-200 rounded-lg shadow-sm p-3 text-center"
              >
                <div className="w-12 h-12 mx-auto mb-2">
                  <Image
                    src={addOn.image || "/placeholder.svg"}
                    alt={addOn.name}
                    width={48}
                    height={48}
                    className="rounded object-cover"
                  />
                </div>
                <h4 className="font-semibold text-xs text-gray-900 mb-1">
                  {addOn.name}
                </h4>
                <p className="text-xs text-gray-600 mb-2">INR {addOn.price}</p>
                <button
                  onClick={() => toggleAddOn(addOn.id)}
                  className={`w-full h-7 text-xs rounded ${
                    addOn.added
                      ? "bg-gray-100 text-red-500 border border-red-400"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
                >
                  {addOn.added ? "REMOVE" : "ADD"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bill Detail */}
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
            <span className="font-semibold">{Math.round(itemTotal)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-orange-500">Item discount</span>
            <span className="text-orange-500">-{discount}</span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="text-gray-600">Delivery</span>
              <div className="w-4 h-4 rounded-full bg-gray-300 ml-2 flex items-center justify-center">
                <span className="text-xs text-white">i</span>
              </div>
            </div>
            <span className="text-orange-500 font-semibold">FREE</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-600 text-sm">
              GST and Restaurant Charges
            </span>
            <span className="font-semibold">{gstAndCharges}</span>
          </div>

          <div className="border-t pt-3 mt-3">
            <div className="flex justify-between">
              <span className="font-bold text-gray-900">TOTAL</span>
              <span className="font-bold text-gray-900">
                {Math.round(total)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
