"use client";

import ProjectApiList from "@/app/api/ProjectApiList";
import axios from "axios";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

interface Coupon {
  id: string;
  code: string;
  description: string;
  minOrderAmount?: number;
  discountAmount?: number;
  discountPercent?: number;
  expiresAt?: string;
}

interface DiscountComponentProps {
  showRight: boolean;
  setShowRight: (value: boolean) => void;
  onApplyCoupon: (coupon: Coupon) => void;
  appliedCoupon: Coupon | null;
}


const DiscountComponent: React.FC<DiscountComponentProps> = ({
  showRight,
  setShowRight,
  onApplyCoupon,
}) => {
  const { api_getCoupons } = ProjectApiList();

  const [loading, setLoading] = useState(true);
  const [couponData, setCouponData] = useState<Coupon[]>([]);
  const [manualCode, setManualCode] = useState("");

  const handleManualApply = () => {
    const found = couponData.find(
      (c) => c.code.toUpperCase() === manualCode.toUpperCase()
    );
    if (found) {
      onApplyCoupon(found);
      setShowRight(false);
    } else {
      alert("Invalid coupon code");
    }
  };

  const fetchCoupons = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(api_getCoupons);
      setCouponData(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoading(false);
    }
  }, [api_getCoupons]);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  if (!showRight) return null;

  return (
    <div className="w-lg bg-white h-screen p-6 border-l border-gray-200 flex flex-col mt-10">
      {/* Close Button */}
      <div className="flex justify-end mb-6 mt-6">
        <button onClick={() => setShowRight(false)}>
          <IoClose size={28} className="text-orange-500 cursor-pointer" />
        </button>
      </div>

      {/* Manual Code Input */}
      <div className="flex items-center mb-8 rounded-full overflow-hidden border border-orange-300 bg-white">
        <input
          value={manualCode}
          onChange={(e) => setManualCode(e.target.value)}
          type="text"
          placeholder="Enter coupon code"
          className="flex-1 px-4 py-3 text-sm outline-none"
        />
        <button
          onClick={handleManualApply}
          className="bg-orange-500 text-white px-5 py-3 text-sm font-semibold cursor-pointer"
        >
          APPLY
        </button>
      </div>

      {/* Title */}
      <h2 className="text-center font-bold text-2xl text-black mb-6 tracking-wide [font-family:'Barlow_Condensed',Helvetica]">
        AVAILABLE COUPONS
      </h2>

      {/* Coupon List */}
      <div className="overflow-y-auto no-scrollbar space-y-6 pr-2 flex-1 pb-10">
        {couponData.length === 0 && !loading && (
          <p className="text-center text-gray-500">No coupons available.</p>
        )}

        {couponData.map((coupon, index) => (
          <div
            key={coupon.id || index}
            onClick={() => setManualCode(coupon.code)}
            className={`bg-[#FFE6DB] p-6 rounded-[20px] ${
              manualCode === coupon.code
                ? "border-4 border-orange-500"
                : "border-2 border-[#ED722E]"
            } shadow text-center flex flex-col items-center space-y-2 cursor-pointer hover:shadow-lg transition`}
          >
            <div className="flex justify-center items-center gap-4">
              <Image
                src={"/elephant.png"}
                alt="Coupon Icon"
                width={60}
                height={60}
              />
              <h3 className="font-extrabold text-xl text-black uppercase">
                {coupon.code}
              </h3>
            </div>

            <p className="text-[15px] text-orange-500 font-bold leading-snug px-8 text-center">
              {coupon.description}
            </p>

            {coupon.minOrderAmount && (
              <p className="text-[15px] text-gray-800 font-bold">
                On Order Above ₹{coupon.minOrderAmount}
              </p>
            )}

            {coupon.discountAmount && (
              <p className="text-[15px] text-green-700 font-semibold">
                Flat ₹{coupon.discountAmount} OFF
              </p>
            )}

            {coupon.discountPercent && (
              <p className="text-[15px] text-green-700 font-semibold">
                {coupon.discountPercent}% OFF
              </p>
            )}

            {coupon.expiresAt && (
              <p className="text-xs text-gray-500 italic">
                Expires on {new Date(coupon.expiresAt).toLocaleDateString()}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountComponent;
