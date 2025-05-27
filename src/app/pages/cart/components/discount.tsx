import React from "react";
import { IoClose } from "react-icons/io5";

const DiscountComponent = ({ showRight, setShowRight }: any) => {
  if (!showRight) return null;

  return (
    <div className="max-w-sm bg-[#fff6f1] h-screen p-4 border-l border-gray-200 flex flex-col">
      {/* Close Button */}
      <div className="flex justify-end mb-4">
        <button onClick={() => setShowRight(false)}>
          <IoClose size={28} className="text-orange-500" />
        </button>
      </div>

      {/* Coupon Input */}
      <div className="flex items-center mb-6 rounded-full overflow-hidden border border-orange-300 bg-white">
        <input
          type="text"
          placeholder="Enter coupon code"
          className="flex-1 px-4 py-2 text-sm outline-none"
        />
        <button className="bg-orange-500 text-white px-4 py-2 text-sm font-semibold">
          APPLY
        </button>
      </div>

      {/* Title */}
      <h2 className="text-center font-bold text-lg text-black mb-4">
        AVAILABLE COUPONS
      </h2>

      {/* Coupons List */}
      <div className="overflow-y-auto space-y-4 pr-2 flex-1">
        {/* Coupon Card */}
        <div className="bg-[#ffe6db] p-4 rounded-xl border border-orange-300 shadow-sm">
          <h3 className="font-bold text-lg text-black mb-1">ESBYFRIST</h3>
          <p className="text-sm text-orange-500 mb-1">
            Get flat 30% off upto rupees 200 on your first order at Esby's
          </p>
          <p className="text-xs text-gray-800 font-semibold mb-2">
            Only on Order above INR 350
          </p>
          <p className="text-xs text-gray-500 mb-2">+ More</p>
          <button className="bg-orange-500 text-white px-4 py-1 rounded text-sm font-medium">
            APPLY
          </button>
        </div>

        {/* Coupon Card */}
        <div className="bg-[#ffe6db] p-4 rounded-xl border border-orange-300 shadow-sm">
          <h3 className="font-bold text-lg text-black mb-1">ICICIFOOD</h3>
          <p className="text-sm text-orange-500 mb-1">
            Get flat 30% off upto rupees 200
          </p>
          <p className="text-xs text-gray-800 font-semibold mb-2">
            Only on Order above INR 350 using ICICI bank credit card
          </p>
          <p className="text-xs text-gray-500 mb-2">+ More</p>
          <button className="bg-orange-500 text-white px-4 py-1 rounded text-sm font-medium">
            APPLY
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountComponent;
