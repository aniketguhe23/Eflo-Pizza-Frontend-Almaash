"use client";

import ProjectApiList from "@/app/api/ProjectApiList";
import { useUserStore } from "@/app/store/useUserStore";
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
  isExpired?: boolean;
  is_coustom?: boolean; // ✅ added
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
  const { user } = useUserStore();
  const { api_getCoupons, api_getUsedCoupons } = ProjectApiList();

  const [loading, setLoading] = useState(true);
  const [couponData, setCouponData] = useState<Coupon[]>([]);
  const [usedCouponData, setUsedCouponData] = useState<any>([]);
  const [manualCode, setManualCode] = useState("");
  const [showCustom, setShowCustom] = useState(false); // ✅ toggle between regular/custom

  const handleManualApply = () => {
    const found = couponData.find(
      (c) => c.code.toUpperCase() === manualCode.toUpperCase()
    );
    if (found) {
      if (found.isExpired) {
        alert("❌ This coupon has expired.");
      } else {
        onApplyCoupon(found);
        setShowRight(false);
      }
    } else {
      alert("❌ Invalid coupon code.");
    }
  };

  const fetchCoupons = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${api_getCoupons}?active=true&isExpired=false`
      );
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

  const fetchUsedCoupons = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api_getUsedCoupons}/${user?.waId}`);
      setUsedCouponData(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoading(false);
    }
  }, [api_getUsedCoupons, user?.waId]);

  useEffect(() => {
    fetchUsedCoupons();
  }, [fetchUsedCoupons]);

  if (!showRight) return null;

  // ✅ Filter applied: hide used & filter by is_coustom
  const filteredCoupons = couponData
    .filter(
      (coupon) =>
        !usedCouponData.some((used: any) => used.coupon_id === coupon.id)
    )
    .filter((coupon) =>
      showCustom ? coupon.is_coustom === true : coupon.is_coustom === false
    );

  return (
    <div className="w-full sm:w-[450px] max-w-[100vw] min-w-[300px] bg-white h-screen p-4 sm:p-6 border-l border-gray-200 flex flex-col mt-10 overflow-hidden">
      {/* Close Button */}
      <div className="flex justify-end mb-4 sm:mb-6 mt-4 sm:mt-6">
        <button onClick={() => setShowRight(false)}>
          <IoClose size={26} className="text-orange-500 cursor-pointer" />
        </button>
      </div>

      {/* Manual Code Input */}
      <div className="flex items-center mb-4 sm:mb-6 rounded-full overflow-hidden border border-orange-300 bg-white">
        <input
          value={manualCode}
          onChange={(e) => setManualCode(e.target.value)}
          type="text"
          placeholder="Enter coupon code"
          className="flex-1 px-4 py-2 sm:py-3 text-sm outline-none"
        />
        <button
          onClick={handleManualApply}
          className="bg-orange-500 text-white px-4 sm:px-5 py-2 sm:py-3 text-sm font-semibold cursor-pointer"
        >
          APPLY
        </button>
      </div>

      {/* Toggle Regular / Custom */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-full text-sm font-bold ${
            !showCustom ? "bg-orange-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setShowCustom(false)}
        >
          Regular Coupons
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-bold ${
            showCustom ? "bg-orange-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setShowCustom(true)}
        >
          Custom Coupons
        </button>
      </div>

      {/* Title */}
      <h2 className="text-center font-bold text-xl sm:text-2xl text-black mb-4 sm:mb-6 tracking-wide">
        {showCustom ? "CUSTOM COUPONS" : "AVAILABLE COUPONS"}
      </h2>

      {/* Coupon List */}
      <div className="overflow-y-auto no-scrollbar space-y-4 sm:space-y-6 pr-1 sm:pr-2 flex-1 pb-8 sm:pb-10">
        {filteredCoupons.length === 0 && !loading && (
          <p className="text-center text-gray-500">No coupons available.</p>
        )}

        {filteredCoupons.map((coupon, index) => {
          const isSelected = manualCode === coupon.code;
          return (
            <div
              key={coupon.id || index}
              onClick={() => {
                if (!coupon.isExpired) {
                  setManualCode(coupon.code);
                }
              }}
              className={`bg-[#FFE6DB] p-4 sm:p-6 rounded-[16px] sm:rounded-[20px] ${
                isSelected
                  ? "border-4 border-orange-500"
                  : "border-2 border-[#ED722E]"
              } shadow text-center flex flex-col items-center space-y-2 ${
                coupon.isExpired
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer hover:shadow-lg"
              } transition`}
            >
              {/* Coupon content */}
              <div className="flex justify-center items-center gap-4 flex-wrap">
                <Image
                  src="/elephant.png"
                  alt="Coupon Icon"
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <h3 className="font-extrabold text-lg sm:text-xl text-black uppercase">
                  {coupon.code}
                </h3>
              </div>

              <p className="text-sm sm:text-[15px] text-orange-500 font-bold leading-snug px-4 sm:px-8 text-center">
                {coupon.description}
              </p>

              {coupon.minOrderAmount && (
                <p className="text-sm sm:text-[15px] text-gray-800 font-bold">
                  On Order Above ₹{coupon.minOrderAmount}
                </p>
              )}

              {coupon.discountAmount && (
                <p className="text-sm sm:text-[15px] text-green-700 font-semibold">
                  Flat ₹{coupon.discountAmount} OFF
                </p>
              )}

              {coupon.discountPercent && (
                <p className="text-sm sm:text-[15px] text-green-700 font-semibold">
                  {coupon.discountPercent}% OFF
                </p>
              )}

              {coupon.expiresAt && (
                <p className="text-xs text-gray-500 italic">
                  Expires on {new Date(coupon.expiresAt).toLocaleDateString()}
                </p>
              )}

              {coupon.isExpired && (
                <p className="text-xs text-red-500 font-semibold mt-1">
                  Expired
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DiscountComponent;
