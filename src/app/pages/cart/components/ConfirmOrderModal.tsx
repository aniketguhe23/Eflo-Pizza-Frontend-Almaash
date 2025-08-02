"use client";

import React from "react";

interface ConfirmOrderModalProps {
  open: boolean;
  deliveryType: "delivery" | "pickup";
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmOrderModal: React.FC<ConfirmOrderModalProps> = ({
  open,
  onClose,
  onConfirm,
  deliveryType,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 [font-family:'Barlow_Condensed',Helvetica]">
      <div className="bg-white rounded-xl shadow-lg p-6 w-[90%] max-w-md animate-fade-in text-center flex flex-col items-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Confirm Your Order
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Are you sure you want to place this order for{" "}
          <span className="uppercase font-bold">
            {deliveryType == "pickup" ? "pickup/dinein" : deliveryType}
          </span>{" "}
          ?
        </p>
        <div className="flex justify-center gap-3 w-full">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 text-sm w-1/2 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-orange-500 hover:bg-orange-600 text-white text-sm w-1/2 cursor-pointer"
          >
            Yes, Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrderModal;
