"use client";

import React, { useState } from "react";
import {
  IoPersonCircleSharp,
  IoLocationSharp,
  IoWalletSharp,
  IoCloseSharp,
} from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import DeliveryAddressModal from "./saveAddressModal";
import { useUserStore } from "@/app/store/useUserStore";
// import LoginModal from "../../auth/login/page";
// import CreateAccountModal from "../../auth/createAccount/components/CreateAccountModal";
import LoginModal from "../../auth/login/LoginModal";
import CreateAccountModal from "../../auth/createAccount/CreateAccountModal";

interface AccountComponentProps {
  showLeft: boolean;
  setShowLeft: (value: boolean) => void;
}

export default function AccountComponent({
  showLeft,
  setShowLeft,
}: AccountComponentProps) {
  const { user } = useUserStore();
  // const router = useRouter();

  const [showSelector, setShowSelector] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    "House 43, phase 1, Golden city, misroad Bhopal, Madhya Pradesh, 462047, INDIA (13)"
  );

  // const [activeTab, setActiveTab] = useState<"delivery" | "pickup">("delivery");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [createAccountData, setCreateAccountData] = useState<{
    waId: string;
    mobile: string;
  } | null>(null);

  const [showModal, setShowModal] = useState(false);
  // Removed savedAddress state, since it's unused

  const handleSave = (addressData: unknown) => {
    console.log("Saved address:", addressData);
    // You can add logic to setSelectedAddress or persist data
  };

  if (!showLeft) return null;

  return (
    <>
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          setShowLoginModal={setShowLoginModal}
          onTriggerCreateAccount={(data) => {
            setShowLoginModal(false);
            setCreateAccountData(data);
          }}
        />
      )}

      {createAccountData && (
        <CreateAccountModal
          onClose={() => setCreateAccountData(null)}
          waId={createAccountData.waId}
          mobile={createAccountData.mobile}
        />
      )}
      <div className="w-[500px] h-screen bg-gray-300 p-4 flex flex-col gap-6 relative pt-15">
        {/* Account Section */}
        <div className="bg-white p-4 rounded shadow flex items-start gap-4 mt-10 relative">
          <div className="rounded w-12 h-12 flex items-center justify-center mt-1">
            <IoPersonCircleSharp size={24} />
          </div>

          <div>
            {user ? (
              <div className="text-gray-800 mb-4">
                <p className="text-base text-gray-600 font-medium mb-1">
                  Welcome back,
                </p>
                <h2 className="text-xl font-semibold text-black leading-tight">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="text-sm text-gray-600 mt-2 flex justify-start items-center">
                  Mob : <span className="font-medium pl-1">{user.mobile}</span>
                </p>
              </div>
            ) : (
              <>
                <h2 className="font-bold text-sm tracking-wide">ACCOUNT</h2>
                <p className="text-sm text-gray-600 mb-3">
                  To place your order now, log in to your existing account or
                  sign up.
                </p>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-1 bg-orange-500 text-white text-sm font-semibold cursor-pointer"
                    onClick={() => setShowLoginModal(true)}
                  >
                    SIGN UP
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Delivery Address Section */}
        {!showSelector && selectedAddress && (
          <div className="bg-white p-4 rounded flex justify-between items-start">
            <div className="flex gap-4">
              <div className="min-w-[36px] h-9 bg-black text-white rounded-md flex items-center justify-center mt-1">
                <IoLocationSharp size={20} />
              </div>
              <div>
                <p className="font-bold text-sm flex justify-start items-center">
                  DELIVERY ADDRESS{" "}
                  <TiTick className="text-orange-500 w-6 h-6" />
                </p>
                <p className="font-semibold text-sm mt-1">HOME</p>
                <p className="text-sm text-gray-700 mt-0.5">
                  {selectedAddress}
                </p>
              </div>
            </div>
            <button
              className="text-[#ED722E] text-sm font-semibold underline hover:no-underline cursor-pointer"
              onClick={() => setShowSelector(true)}
            >
              CHANGE
            </button>
          </div>
        )}

        {showSelector && (
          <div className="bg-white p-4 rounded shadow">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-[#A49FAF] text-white rounded flex items-center justify-center mr-3">
                <IoLocationSharp />
              </div>
              <div>
                <p className="font-bold text-base">SELECT DELIVERY ADDRESS</p>
                <p className="text-xs text-gray-700">
                  YOU HAVE A SAVED ADDRESS IN THIS LOCATION
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border rounded p-3">
                <p className="font-bold text-sm mb-1">HOME</p>
                <p className="text-xs text-gray-600">
                  House 43, Phase 1, Golden City, Misroad Bhopal, Madhya Pradesh
                  462047, INDIA (13)
                </p>
                <div className="mt-3 flex justify-center">
                  <button
                    className="text-[#ED722E] text-sm border border-[#ED722E] px-4 py-1 rounded hover:bg-[#ED722E] hover:text-white transition cursor-pointer"
                    onClick={() => {
                      setSelectedAddress(
                        "House 43, Phase 1, Golden City, Misroad Bhopal, Madhya Pradesh 462047, INDIA (13)"
                      );
                      setShowSelector(false);
                    }}
                  >
                    DELIVERY HERE
                  </button>
                </div>
              </div>

              <div className="border rounded p-3 flex flex-col justify-between">
                <div>
                  <p className="font-bold text-sm mb-1">ADD NEW ADDRESS</p>
                  <p className="text-xs text-gray-600">(Live Location)</p>
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    className="bg-[#ED722E] text-white px-4 py-1 rounded hover:bg-orange-600 text-sm cursor-pointer"
                    onClick={() => setShowModal(true)}
                  >
                    ADD NEW
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <div className="w-10 h-10 bg-white flex justify-center items-center shadow">
            <IoWalletSharp size={24} />
          </div>
          <div className="py-5">
            <span className="font-bold text-base">CHOOSE PAYMENT METHOD</span>
            <div className="mt-4">
              <button className="bg-[#FF5B00] text-white px-30 py-2 cursor-pointer">
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowLeft(false)}
          className="absolute bottom-4 right-4 text-orange-500 text-xl cursor-pointer"
        >
          <IoCloseSharp />
        </button>
      </div>

      <DeliveryAddressModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />
    </>
  );
}
