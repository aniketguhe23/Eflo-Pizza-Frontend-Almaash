"use client";

import { useState } from "react";
import OrderModal from "./OrderDetailModal";

export default function OrdersSection() {
  const [showModal, setShowModal] = useState(false);

  const orders = [
    {
      title: "ELFO'S PIZZA",
      subtitle: "AREA COLONY",
      orderId: "ORDER #38482939746352",
      items: "7 CHEESE PIZZA (MED) X 1, SUPER PANEER (MED) X 1",
      total: "INR 787",
    },
    {
      title: "ELFO'S PIZZA",
      subtitle: "HOSHANGABAD ROAD",
      orderId: "ORDER #9574853674576456",
      items:
        "7 CHEESE PIZZA (MED) X 1, SUPER PANEER (MED) X 1\nSTUFFED GARLIC BREADSTICKS XL PINK LEMONADE X1",
      total: "INR 1223",
    },
  ];

  return (
    <>
      <div className="space-y-4">
        {orders.map((order, index) => (
          <div
            key={index}
            className=" rounded-lg bg-white  text-black [font-family:'Barlow_Condensed',Helvetica] shadow-md"
          >
            {/* Header */}
            <div className=" p-4 flex justify-center items-center">
              <div>
                <h3 className="text-3xl font-black leading-tight">
                  {order.title}{" "}
                  <span className=" italic text-base font-normal">
                    - {order.subtitle}
                  </span>
                </h3>
              </div>
            </div>

            {/* Order ID */}
            <div className="px-12 pt-4">
              <div className="flex justify-between">
                <p className="text-xl font-bold">{order.orderId}</p>
                <button
                  className="text-orange-500 text-lg font-semibold cursor-pointer hover:bg-orange-100 p-2"
                  onClick={() => setShowModal(true)}
                >
                  VIEW DETAILS
                </button>
              </div>
              <div className="border-t-2 border-dotted border-orange-500 w-[82%] my-2"></div>
            </div>

            {/* Items & Footer */}
            <div className="p-4 px-12 pt-0">
              <div className="flex justify-between">
                <p className="text-lg text-gray-500 mb-4 whitespace-pre-line">
                  {order.items}
                </p>
                <span className="font-bold text-gray-500">
                  TOTAL PAID : {order.total}
                </span>
              </div>

              <div className="flex justify-end items-end">
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-6 py-2  tracking-wider uppercase cursor-pointer">
                  RE - ORDER
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && <OrderModal onClose={() => setShowModal(false)} />}
    </>
  );
}
