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
    index?: number;
  }) => void;
  initialData?: {
    phone: string;
    houseNo: string;
    address: string;
    type: string;
    index?: number;
  } | null;
}

export default function DeliveryAddressModalNew({
  isOpen,
  onClose,
  onSave,
  initialData = null,
}: DeliveryAddressModalProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [doorNumber, setDoorNumber] = useState("");
  const [landmark, setLandmark] = useState("");
  const [addressType, setAddressType] = useState<"home" | "work" | "others">("home");
  const [index, setIndex] = useState<number | undefined>(undefined);

  const [errors, setErrors] = useState({
    doorNumber: "",
    landmark: "",
  });

  useEffect(() => {
    if (initialData) {
      setPhoneNumber(initialData.phone || "");
      setDoorNumber(initialData.houseNo || "");
      setLandmark(initialData.address || "");

      // Only set if it's one of the allowed types
      const type = ["home", "work", "others"].includes(initialData.type)
        ? (initialData.type as "home" | "work" | "others")
        : "home";
      setAddressType(type);

      setIndex(initialData.index);
    } else {
      setPhoneNumber("");
      setDoorNumber("");
      setLandmark("");
      setAddressType("home");
      setIndex(undefined);
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
      index,
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
          <div className="w-full">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Phone Number (Optional)"
              value={phoneNumber}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,15}$/.test(value)) setPhoneNumber(value); // allow only up to 15 digits
              }}
              maxLength={15}
              className="w-full p-3 border border-orange-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 text-base"
            />
            {phoneNumber && phoneNumber.length < 10 && (
              <p className="text-red-500 text-sm mt-1">
                Phone number must be at least 10 digits
              </p>
            )}
          </div>


          <input
            type="text"
            placeholder="House / Door No. *"
            value={doorNumber}
            onChange={(e) => setDoorNumber(e.target.value)}
            className={`w-full p-3 border ${errors.doorNumber ? "border-red-500" : "border-orange-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-orange-500 text-base`}
          />
          {errors.doorNumber && <p className="text-red-500 text-sm mt-1">{errors.doorNumber}</p>}

          <input
            type="text"
            placeholder="Address *"
            value={landmark}
            onChange={(e) => setLandmark(e.target.value)}
            className={`w-full p-3 border ${errors.landmark ? "border-red-500" : "border-orange-300"
              } rounded focus:outline-none focus:ring-2 focus:ring-orange-500 text-base`}
          />
          {errors.landmark && <p className="text-red-500 text-sm mt-1">{errors.landmark}</p>}

          {/* Address Type Selector */}
          <div className="flex flex-col sm:flex-row gap-2">
            {["home", "work", "others"].map((type) => (
              <button
                key={type}
                onClick={() => setAddressType(type as "home" | "work" | "others")}
                className={`flex-1 p-2 text-lg rounded border font-medium transition-all duration-200
                  ${addressType === type ? "bg-[#FF5B00] text-white" : "border-orange-300 text-gray-700"}
                `}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

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
