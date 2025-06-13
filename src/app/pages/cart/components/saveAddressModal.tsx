"use client";

import React from "react";
import Image from "next/image";

interface DeliveryAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (address: {
    phoneNumber: string;
    doorNumber: string;
    landmark: string;
    addressType: string;
  }) => void;
}

export default function DeliveryAddressModal({
  isOpen,
  onClose,
  onSave,
}: DeliveryAddressModalProps) {
  const [phoneNumber, setPhoneNumber] = React.useState(
    "14, Phase 2, Golden City, Misrod, Bh..."
  );
  const [doorNumber, setDoorNumber] = React.useState("");
  const [landmark, setLandmark] = React.useState("");
  const [addressType, setAddressType] = React.useState("Home");

  const handleSave = () => {
    const addressData = {
      phoneNumber,
      doorNumber,
      landmark,
      addressType,
    };
    onSave(addressData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white w-full max-w-md max-h-[90vh] overflow-y-auto rounded-lg shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-bold text-center flex-1">
            SAVE DELIVERY ADDRESS
          </h2>
          <button
            onClick={onClose}
            className="h-8 w-8 text-orange-500 hover:text-orange-600 font-bold text-xl cursor-pointer"
          >
            X
          </button>
        </div>

        {/* Map Section */}
        <div className="relative h-64 bg-gray-100 mx-4 mt-4 rounded-lg overflow-hidden">
          <Image
            src="/MAPS.png"
            alt="Map Route"
            fill
            className="object-cover"
          />

          {/* Zoom controls */}
          <div className="absolute bottom-1 right-1 flex flex-col gap-1">
            <button className="h-6 w-6 bg-white border border-gray-500 flex items-center justify-center text-lg font-bold">
              +
            </button>
            <button className="h-6 w-6 bg-white border border-gray-500 flex items-center justify-center text-lg font-bold">
              −
            </button>
          </div>
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
            {["Home", "Work", "Other"].map((type) => (
              <button
                key={type}
                onClick={() => setAddressType(type)}
                className={`flex-1 p-2 rounded border text-sm font-medium ${
                  addressType === type
                    ? "bg-[#FF5B00] text-white"
                    : "border-orange-300 text-gray-700 hover:bg-orange-100"
                } cursor-pointer`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSave}
            className="w-full bg-[#FF5B00] hover:bg-orange-600 text-white font-semibold py-3 rounded text-base cursor-pointer"
          >
            SAVE ADDRESS & PROCEED
          </button>
        </div>
      </div>
    </div>
  );
}
