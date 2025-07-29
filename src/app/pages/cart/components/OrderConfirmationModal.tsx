// components/OrderConfirmationModal.tsx
"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";

export interface OrderResponse {
  data?: {
    address?: string;
    [key: string]: any;
  };
}

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderResponse: OrderResponse;
}

export default function OrderConfirmationModal({
  isOpen,
  onClose,
  orderResponse,
}: OrderConfirmationModalProps) {
  const router = useRouter();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 bg-opacity-50 [font-family:'Barlow_Condensed',Helvetica]">
      <div className="relative bg-white max-w-md w-full p-8 rounded-3xl border-4 border-orange-500 text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-orange-500 hover:bg-orange-100 rounded-full w-8 h-8 flex items-center justify-center text-xl cursor-pointer"
        >
          <RxCross1 className="hover:text-red-600" />
        </button>

        {/* Header */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
            <Image src="/elephant.png" alt="Mascot" width={40} height={40} />
          </div>
          <h2 className="text-base font-bold text-black tracking-wide mt-2">
            ELFOS' PIZZA
          </h2>
        </div>

        {/* Image & Confetti */}
        <div className="relative mb-8 flex justify-center items-center">
          <Image
            src="/elephant.png"
            alt="Celebrate"
            width={120}
            height={120}
            className="z-10"
          />
          <Image
            src="/celebrate.png"
            alt="Celebrate"
            width={40}
            height={40}
            className="absolute -top-3 right-[30%] animate-ping"
          />
        </div>

        {/* Success Message */}
        <h1 className="text-2xl font-bold text-black mb-2 tracking-wide">
          YAY!! ORDER RECEIVED
        </h1>
        <h1 className="text-xl font-bold text-black mb-6 tracking-wide">
          <span className="text-orange-600">
            #{orderResponse?.data?.Order_no}
          </span>
        </h1>

        {/* Address */}
        <div className="flex items-start space-x-3 mb-8 text-left justify-center">
          <span className="text-2xl mt-1">🏠</span>
          <div className="text-orange-500 font-medium leading-relaxed flex justify-center items-center">
            {orderResponse?.data?.address ?? "Address not available"}
          </div>
        </div>

        {/* Button */}
        <button
          onClick={() => router.push("/pages/myAccount")}
          className="text-black font-bold text-lg underline hover:text-orange-600 cursor-pointer"
        >
          View Order
        </button>
      </div>
    </div>
  );
}
