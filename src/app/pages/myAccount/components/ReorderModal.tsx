"use client";

import React from "react";
import { Dialog } from "@mui/material";
import { OrderItem } from "@/app/store/useCartStore"; // or your correct type
import { useRouter } from "next/navigation";
import useCartStore from "@/app/store/useCartStore";

interface Props {
  open: boolean;
  onClose: () => void;
  order: any;
}

export default function ReorderModal({ open, onClose, order }: Props) {
  const router = useRouter();
  const { addItem, resetCart } = useCartStore();

const handleReorder = () => {
  resetCart(); // optional

  order?.items?.forEach((item: any) => {
    if (item.type === "preset") {
      const newItem: OrderItem = {
        id: item.id || Date.now().toString(),
        name: item.name,
        size: item.size,
        price: item.price,
        quantity: item.quantity,
        image: item.image || "",
        dough: item.dough,
        crust: item.crust,
        toppings: item.toppings || [],
        suggestions: item.suggestions || [],
        type: item.type,
      };
      addItem(newItem);
    }

    if (item.type === "custom") {
      const s = item.selections;

      const totalPrice =
        (s?.sizes?.price || 0) +
        (s?.doughTypes?.price || 0) +
        (s?.crustTypes?.price || 0) +
        (s?.sauces?.reduce((sum: number, s: any) => sum + (s.price || 0), 0) || 0) +
        (s?.cheeseOptions?.reduce((sum: number, c: any) => sum + (c.price || 0), 0) || 0) +
        (s?.toppings?.reduce((sum: number, t: any) => sum + (t.price || 0), 0) || 0) +
        (s?.extraSauces?.reduce((sum: number, e: any) => sum + (e.price || 0), 0) || 0);

      const customItem: OrderItem = {
        id: Date.now().toString(),
        name: "Custom Pizza",
        size: s?.sizes?.name || "Regular",
        price: totalPrice,
        quantity: item.quantity,
        image: "", // if you want a default image
        dough: s?.doughTypes?.name,
        crust: s?.crustTypes?.name,
        toppings: [
          ...(s?.toppings?.map((t: any) => t.name) || []),
          ...(s?.cheeseOptions?.map((c: any) => c.name) || []),
          ...(s?.sauces?.map((s: any) => s.name) || []),
          ...(s?.extraSauces?.map((e: any) => e.name) || []),
        ],
        suggestions: [],
        type: "custom",
      };

      addItem(customItem);
    }
  });

  onClose();
  router.push("/pages/cart");
};


  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <div className="p-6 space-y-4">
        <h2 className="text-2xl font-bold text-center">Reorder Items</h2>

        <div className="space-y-2 max-h-[50vh] overflow-y-auto">
          {order?.items?.map((item: any, i: number) => (
            <div
              key={i}
              className="border p-3 rounded bg-gray-50 flex justify-between"
            >
              <div>
                <p className="font-semibold text-sm">{item.name}</p>
                <p className="text-xs text-gray-500">
                  {item.size || item?.selections?.sizes?.name} × {item.quantity}
                </p>
              </div>
              <div className="text-sm font-bold">₹ {item.price}</div>
            </div>
          ))}
        </div>

        <button
          onClick={handleReorder}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 font-semibold rounded"
        >
          Proceed to Checkout
        </button>
      </div>
    </Dialog>
  );
}
