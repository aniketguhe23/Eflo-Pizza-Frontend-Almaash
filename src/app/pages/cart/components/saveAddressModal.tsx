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
  const [addressType, setAddressType] = useState<"Home" | "Work" | "Other">(
    "Home"
  );
  const [addressKey, setAddressKey] = useState<"home" | "work" | "others">(
    "home"
  );

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
  }, [initialData, isOpen]);

  const handleSave = () => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 [font-family:'Barlow_Condensed',Helvetica]">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-center flex-1">
            {initialData ? "EDIT DELIVERY ADDRESS" : "SAVE DELIVERY ADDRESS"}
          </h2>
          <button
            onClick={onClose}
            className="h-8 w-8 text-orange-500 hover:text-orange-600 font-bold text-xl cursor-pointer"
          >
            <RxCross1 className="hover:text-red-600" />
          </button>
        </div>

        {/* Map Section */}
        <div className="relative h-56 bg-gray-100 mx-4 mt-4 rounded-lg overflow-hidden">
          <Image
            src="/MAPS.png"
            alt="Map Route"
            fill
            className="object-cover"
          />
          {/* <div className="absolute bottom-1 right-1 flex flex-col gap-1">
            <button className="h-6 w-6 bg-white border border-gray-500 flex items-center justify-center text-lg font-bold">
              +
            </button>
            <button className="h-6 w-6 bg-white border border-gray-500 flex items-center justify-center text-lg font-bold">
              −
            </button>
          </div> */}
        </div>

        {/* Form Section */}
        <div className="p-4 space-y-4">
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full p-3 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="Door / Flat No./ House"
            value={doorNumber}
            onChange={(e) => setDoorNumber(e.target.value)}
            className="w-full p-3 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="text"
            placeholder="Landmark"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            className="w-full p-3 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />

          {/* Address Type Toggle */}
          <div className="flex gap-2">
            {["Home", "Work", "Others"].map((type) => {
              const isDisabled = !!initialData; // disable in edit mode
              const isSelected = addressType === type;

              return (
                <button
                  key={type}
                  onClick={() => {
                    if (!isDisabled) {
                      setAddressType(type as "Home" | "Work" | "Other");
                      setAddressKey(
                        type.toLowerCase() as "home" | "work" | "others"
                      );
                    }
                  }}
                  disabled={isDisabled}
                  className={`flex-1 p-2 rounded border text-lg font-medium transition-all duration-200
          ${
            isSelected
              ? "bg-[#FF5B00] text-white"
              : "border-orange-300 text-gray-700"
          }
          ${
            isDisabled
              ? " cursor-not-allowed"
              : "hover:bg-orange-100 cursor-pointer"
          }`}
                >
                  {type}
                </button>
              );
            })}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSave}
            className="w-full bg-[#FF5B00] hover:bg-orange-600 text-white font-semibold py-3 rounded text-base cursor-pointer"
          >
            {initialData ? "UPDATE ADDRESS" : "SAVE ADDRESS & PROCEED"}
          </button>
        </div>
      </div>
    </div>
  );
}
