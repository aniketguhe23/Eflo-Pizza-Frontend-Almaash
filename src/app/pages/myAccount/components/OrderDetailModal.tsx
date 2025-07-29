"use client";

import { RxCross1 } from "react-icons/rx";

interface OrderModalProps {
  onClose: () => void;
  order: any;
}

export default function OrderModal({ onClose, order }: OrderModalProps) {

  console.log(order?.packaging_charge)
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] flex flex-col overflow-hidden">
        {/* Sticky Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300 sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold text-gray-900 flex-1 text-center mr-8">
            Order # {order?.Order_no}
          </h2>
          <button
            onClick={onClose}
            className="text-orange-500 text-2xl font-bold hover:text-orange-600 cursor-pointer"
          >
            <RxCross1 className="hover:text-red-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto px-4 pb-6">
          {/* Restaurant Info */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                🍕
              </div>
              <div className="flex justify-center items-end space-x-1">
                <h3 className="font-bold text-xl text-gray-900">
                  ELFO&apos;S PIZZA
                </h3>
                <p className="text-sm text-gray-500 italic">
                  - {order?.restaurant.address}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mt-1">
                🏠
              </div>
              <div>
                <p className="text-sm">{order?.address}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center mt-3">
            <hr className="border-gray-600 w-[85%]" />
          </div>
          <div className="text-center py-3">
            <p className="text-base text-gray-600">
              Delivered on {new Date(order?.created_at).toLocaleString()}
            </p>
          </div>
          <div className="flex justify-center items-center">
            <hr className="border-gray-600 w-[85%]" />
          </div>

          {/* Items */}
          <div className="pt-4 px-4">
            <h3 className="text-lg font-bold text-center mb-4">
              {order?.items?.length} ITEM{order.items.length > 1 ? "S" : ""}
            </h3>
            <div className="space-y-4">
              {order.items.map((item: any, index: number) => {
                const quantity = item.quantity;
                const price = item.price || item.selections?.sizes?.price || 0;
                const name =
                  item.name ||
                  `CUSTOM PIZZA (${item.selections?.sizes?.name || "Regular"})`;
                const size =
                  item.size || item.selections?.sizes?.name || "Regular";

                return (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4"
                  >
                    {/* Left: Pizza Name and Size */}
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-900">
                        {name.toUpperCase()}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {size.toUpperCase()}
                      </p>
                    </div>

                    {/* Right: Quantity, Price, Icon */}
                    <div className="flex-1 flex items-center justify-between space-x-4 ">
                      <span className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">
                        {quantity}
                      </span>
                      <span className="font-bold text-orange-500">
                         {price}
                      </span>
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-xl font-bold text-orange-700">
                          {name?.charAt(0) || "P"}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Summary */}
          <div className="p-4 space-y-3">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-gray-600">Item Total</span>
              <span className="font-medium">₹{order?.item_total}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="text-orange-500">Item Discount</span>
              <span className="text-orange-500">-{order?.discount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 flex items-center">
                Delivery
                <span className="ml-2 bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                  i
                </span>
              </span>
              <span className="text-orange-500 font-medium">
                {order?.delivery ? order.delivery : "FREE"}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">GST</span>
              <span className="text-gray-700">₹{order?.gst}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Packaging Charge</span>
              <span className="text-gray-700">₹{order?.packaging_charge}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>TOTAL</span>
              <span className="text-orange-500">₹{order?.total_price}</span>
            </div>
            <p className="font-semibold text-black">
              Paid Via Credit/Debit card
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
