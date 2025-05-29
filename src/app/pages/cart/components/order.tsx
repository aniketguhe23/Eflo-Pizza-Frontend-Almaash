"use client";

import { useState } from "react";
import { Minus, Plus, Tag } from "lucide-react";
import Image from "next/image";

// Custom Button
const Button = ({
  children,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className={`px-3 py-1 rounded text-sm font-medium ${className}`}
    {...props}
  >
    {children}
  </button>
);

// Custom Card
const Card = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`rounded-lg shadow-sm ${className}`}>{children}</div>;

// Custom CardContent
const CardContent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`p-4 ${className}`}>{children}</div>;

interface OrderItem {
  id: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
}

interface AddOnItem {
  id: string;
  name: string;
  price: number;
  image: string;
  added: boolean;
}

interface OrdersProps {
  setShowRight: (value: boolean) => void;
}

export default function Orders({ setShowRight }: OrdersProps) {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([
    {
      id: "1",
      name: "7-CHEESE PIZZA",
      size: "MEDIUM",
      price: 610,
      quantity: 1,
      image: "/pizza2.jpg",
    },
    {
      id: "2",
      name: "SUPPER PANEER",
      size: "MEDIUM",
      price: 355,
      quantity: 1,
      image: "/pizza2.jpg",
    },
  ]);

  const [addOns, setAddOns] = useState<AddOnItem[]>([
    {
      id: "1",
      name: "COOKIES & ICE CREAM",
      price: 75,
      image: "/pizza2.jpg",
      added: false,
    },
    {
      id: "2",
      name: "LEMONADE",
      price: 15,
      image: "/pizza2.jpg",
      added: false,
    },
    {
      id: "3",
      name: "GARLIC BREAD",
      price: 15,
      image: "/pizza2.jpg",
      added: false,
    },
    {
      id: "4",
      name: "MUSHROOM SOUP",
      price: 15,
      image: "/pizza2.jpg",
      added: false,
    },
  ]);

  const updateQuantity = (id: string, change: number) => {
    setOrderItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const toggleAddOn = (addOnId: string) => {
    setAddOns((items) =>
      items.map((item) =>
        item.id === addOnId ? { ...item, added: !item.added } : item
      )
    );
  };

  const itemTotal =
    orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0) +
    addOns
      .filter((item) => item.added)
      .reduce((sum, item) => sum + item.price, 0);
  const discount = 211;
  const gstAndCharges = 33.3;
  const total = itemTotal - discount + gstAndCharges;

  return (
    <div className="max-w-4xl mx-auto bg-white min-h-screen pt-15  rounded-lg">
      {/* Header */}
      <div className="text-center py-6">
        <h1 className="text-orange-500 font-semibold text-lg">YOUR ORDER</h1>
      </div>

      {/* Order Items */}
      <div className="px-4 space-y-4">
        {orderItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between py-4 border-b border-gray-100"
          >
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.size}</p>
              <button className="text-orange-500 text-sm">
                SEE CUSTOMIZATION
              </button>
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
                <p className="font-semibold">{item.price}</p>
              </div>

              <div className="w-16 h-16">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  width={64}
                  height={64}
                  className="rounded-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pair it with section */}
      <div className="px-4 py-6">
        <h2 className="text-center font-semibold text-gray-900 mb-4">
          Pair it with
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {addOns.map((addOn) => (
            <Card key={addOn.id} className="border border-orange-200">
              <CardContent className="p-3 text-center">
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
                <Button
                  onClick={() => toggleAddOn(addOn.id)}
                  className={`w-full h-7 text-xs ${
                    addOn.added
                      ? "bg-gray-100 text-red-500 border border-red-400"
                      : "bg-orange-500 hover:bg-orange-600 text-white"
                  }`}
                >
                  {addOn.added ? "REMOVE" : "ADD"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Bill Detail */}
      <div className="px-4 py-6">
        <h2 className="text-center font-semibold text-gray-900 mb-4">
          Bill Detail
        </h2>

        <Button
          className="w-full mb-6 bg-orange-200 hover:bg-orange-300 text-gray-900 font-semibold cursor-pointer"
          onClick={() => setShowRight(true)}
        >
          <Tag className="w-4 h-4 mr-2" />
          APPLY DISCOUNT
        </Button>

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
