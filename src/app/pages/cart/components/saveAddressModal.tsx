"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RxCross1 } from "react-icons/rx";

interface DeliveryAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: {
    phoneNumber: string;
    doorNumber: string;
    landmark: string;
    addressType: string;
    addressKey?: "home" | "work" | "others";
  }) => void;
  initialData?: {
    phoneNumber: string;
    doorNumber: string;
    landmark: string;
    addressType: "Home" | "Work" | "Other";
    addressKey: "home" | "work" | "others";
  } | null;
}

export default function DeliveryAddressModal({
  isOpen,
  onClose,
  onSave,
  initialData = null,
}: DeliveryAddressModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [doorNumber, setDoorNumber] = useState("");
  const [landmark, setLandmark] = useState("");
  const [addressType, setAddressType] = useState<"Home" | "Work" | "Other">("Home");
  const [addressKey, setAddressKey] = useState<"home" | "work" | "others">("home");

  const [errors, setErrors] = useState({
    doorNumber: "",
    landmark: "",
  });

  useEffect(() => {
    if (initialData) {
      setPhoneNumber(initialData.phoneNumber);
      setDoorNumber(initialData.doorNumber);
      setLandmark(initialData.landmark);
      setAddressType(initialData.addressType);
      setAddressKey(initialData.addressKey);
    } else {
      setPhoneNumber("");
      setDoorNumber("");
      setLandmark("");
      setAddressType("Home");
      setAddressKey("home");
    }
    setErrors({ doorNumber: "", landmark: "" });
  }, [initialData, isOpen]);

  const validate = () => {
    const newErrors = {
      doorNumber: doorNumber.trim() ? "" : "Address is required",
      landmark: landmark.trim() ? "" : "Landmark is required",
    };
    setErrors(newErrors);
    return !newErrors.doorNumber && !newErrors.landmark;
  };

  const handleSave = () => {
    if (!validate()) return;

    const addressData = {
      phoneNumber,
      doorNumber,
      landmark,
      addressType,
      addressKey,
    };

    onSave(addressData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 sm:px-0">
      <div className="bg-white w-full sm:max-w-md rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-lg sm:text-xl font-bold text-center flex-1">
            {initialData ? "EDIT DELIVERY ADDRESS" : "SAVE DELIVERY ADDRESS"}
          </h2>
          <button onClick={onClose} className="h-8 w-8 text-orange-500 hover:text-orange-600 font-bold text-xl">
            <RxCross1 className="hover:text-red-600" />
          </button>
        </div>

        {/* Map Section */}
        <div className="relative h-40 sm:h-56 bg-gray-100 mx-4 mt-4 rounded-lg overflow-hidden">
          <Image src="/MAPS.png" alt="Map Route" fill className="object-cover" />
        </div>

        {/* Form Section */}
        <div className="px-4 py-4 space-y-4">
          {/* Phone Number */}
          <input
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="Phone Number (Optional)"
            value={phoneNumber}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d{0,15}$/.test(value)) setPhoneNumber(value);
            }}
            maxLength={15}
            className="w-full p-3 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 text-base"
          />

          {/* Door Number */}
          <div>
            <input
              type="text"
              placeholder="Door / Flat No./ House *"
              value={doorNumber}
              onChange={(e) => setDoorNumber(e.target.value)}
              className={`w-full p-3 border ${
                errors.doorNumber ? "border-red-500" : "border-orange-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-orange-500 text-base`}
            />
            {errors.doorNumber && <p className="text-red-500 text-sm mt-1">{errors.doorNumber}</p>}
          </div>

          {/* Landmark */}
          <div>
            <input
              type="text"
              placeholder="Landmark *"
              value={landmark}
              onChange={(e) => setLandmark(e.target.value)}
              className={`w-full p-3 border ${
                errors.landmark ? "border-red-500" : "border-orange-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-orange-500 text-base`}
            />
            {errors.landmark && <p className="text-red-500 text-sm mt-1">{errors.landmark}</p>}
          </div>

          {/* Address Type Toggle */}
          <div className="flex flex-col sm:flex-row gap-2">
            {["Home", "Work", "Others"].map((type) => {
              const isDisabled = !!initialData;
              const isSelected = addressType === type;

              return (
                <button
                  key={type}
                  onClick={() => {
                    if (!isDisabled) {
                      setAddressType(type as "Home" | "Work" | "Other");
                      setAddressKey(type.toLowerCase() as "home" | "work" | "others");
                    }
                  }}
                  disabled={isDisabled}
                  className={`flex-1 p-2 text-lg rounded border font-medium transition-all duration-200
                    ${isSelected ? "bg-[#FF5B00] text-white" : "border-orange-300 text-gray-700"}
                    ${isDisabled ? "cursor-not-allowed" : "hover:bg-orange-100 cursor-pointer"}`}
                >
                  {type}
                </button>
              );
            })}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSave}
            className="w-full bg-[#FF5B00] hover:bg-orange-600 text-white font-semibold py-3 rounded text-base"
          >
            {initialData ? "UPDATE ADDRESS" : "SAVE ADDRESS & PROCEED"}
          </button>
        </div>
      </div>
    </div>
  );
}
