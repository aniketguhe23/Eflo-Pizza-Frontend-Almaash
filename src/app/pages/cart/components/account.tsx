"use client";

import React, { useState } from "react";
import {
  IoPersonCircleSharp,
  IoLocationSharp,
  IoWalletSharp,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";
import { TiTick } from "react-icons/ti";
import DeliveryAddressModal from "./saveAddressModal";
import { useUserStore } from "@/app/store/useUserStore";
import LoginModal from "../../auth/login/LoginModal";
import CreateAccountModal from "../../auth/createAccount/CreateAccountModal";
import useCartStore from "@/app/store/useCartStore";
import useBuildYourOwnPizzaCart from "@/app/store/useBuildYourOwnPizzaCart";

interface AccountComponentProps {
  showLeft: boolean;
  setShowLeft: (value: boolean) => void;
}

export default function AccountComponent({
  showLeft,
  setShowLeft,
}: AccountComponentProps) {
  const { user } = useUserStore();
  const { orderItems, addOns } = useCartStore();
  const { pizzas } = useBuildYourOwnPizzaCart();

  const [showSelector, setShowSelector] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    "House 43, Phase 1, Golden City, Misroad Bhopal, Madhya Pradesh 462047, INDIA (13)"
  );
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [createAccountData, setCreateAccountData] = useState<{
    waId: string;
    mobile: string;
  } | null>(null);
  const [showModal, setShowModal] = useState(false);

  const itemTotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const pizzaItemsTotal = pizzas.reduce((sum, pizza) => {
   const price = Object.values(pizza.selections || {}).reduce((acc, option) => {
  if (Array.isArray(option)) {
    return acc + option.reduce((sum, item) => sum + item.price, 0);
  } else {
    return acc + (option?.price || 0);
  }
}, 0);

    return sum + price * (pizza.quantity || 1);
  }, 0);

  const addOnsTotal = addOns
    .filter((item) => item.added)
    .reduce((sum, item) => sum + item.price, 0);

  const discount = 211;
  const gstAndCharges = 33.3;
  const total = itemTotal + pizzaItemsTotal + addOnsTotal - discount + gstAndCharges;

  const handleSave = (addressData: unknown) => {
    console.log("Saved address:", addressData);
  };

  const handlePlaceOrder = () => {
    const orderData = {
      user: user || null,
      address: selectedAddress,
      orderItems: orderItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        dough: item.dough,
        crust: item.crust,
        toppings: item.toppings,
        suggestions: item.suggestions,
      })),
      customPizzas: pizzas.map((pizza) => ({
        selections: pizza.selections,
        quantity: pizza.quantity,
      })),
      addOns: addOns.filter((item) => item.added),
      summary: {
        itemTotal: Math.round(itemTotal + pizzaItemsTotal + addOnsTotal),
        discount,
        gstAndCharges,
        total: Math.round(total),
      },
    };

    console.log("Placing Order with the following data:", orderData);
  };

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

      <div
        className={`${
          showLeft ? "w-[450px]" : "w-[80px]"
        } transition-all duration-300 h-screen bg-gray-300 p-4 flex flex-col gap-6 relative pt-15 overflow-hidden`}
      >
        {/* Toggle Button */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full px-4">
          <button
            onClick={() => setShowLeft(!showLeft)}
            className="w-full py-2 rounded-md bg-white text-orange-500 shadow font-semibold flex items-center justify-center gap-2"
          >
            {showLeft ? (
              <IoChevronBack className="w-5 h-5" />
            ) : (
              <IoChevronForward className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Account Info */}
        <div className="bg-white p-4 rounded shadow flex items-start gap-4 mt-10">
          <div className="rounded w-10 h-10 flex items-center justify-center mt-1">
            <IoPersonCircleSharp size={showLeft ? 24 : 20} />
          </div>
          {showLeft && (
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
                    Mob: <span className="font-medium pl-1">{user.mobile}</span>
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
          )}
        </div>

        {/* Delivery Address */}
        <div className="bg-white p-4 rounded flex justify-between items-start">
          <div className="flex gap-4 items-center">
            <div className="rounded w-10 h-10 flex items-center justify-center mt-1">
              <IoLocationSharp size={showLeft ? 25 : 20} fill="black" />
            </div>
            {showLeft && (
              <div>
                <p className="font-bold text-sm flex justify-start items-center">
                  DELIVERY ADDRESS <TiTick className="text-orange-500 w-5 h-5 ml-1" />
                </p>
                <p className="font-semibold text-sm mt-1">HOME</p>
                <p className="text-sm text-gray-700 mt-0.5 line-clamp-2">
                  {selectedAddress}
                </p>
              </div>
            )}
          </div>
          {showLeft && (
            <button
              className="text-[#ED722E] text-sm font-semibold underline hover:no-underline cursor-pointer"
              onClick={() => setShowSelector(true)}
            >
              CHANGE
            </button>
          )}
        </div>

        {/* Address Selector */}
        {showLeft && showSelector && (
          <div className="bg-white p-4 rounded shadow">
            <div className="flex items-center mb-4">
              <div className="w-8 h-8 bg-[#A49FAF] text-white rounded flex items-center justify-center mr-3">
                <IoLocationSharp size={20} />
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
                <p className="text-xs text-gray-600">{selectedAddress}</p>
                <div className="mt-3 flex justify-center">
                  <button
                    className="text-[#ED722E] text-sm border border-[#ED722E] px-4 py-1 rounded hover:bg-[#ED722E] hover:text-white transition cursor-pointer"
                    onClick={() => {
                      setSelectedAddress(selectedAddress);
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

        {/* Payment Method */}
        <div className="bg-white p-4 rounded shadow flex items-center gap-4">
          <div className="w-10 h-10 bg-white flex justify-center items-center">
            <IoWalletSharp size={showLeft ? 24 : 20} />
          </div>
          {showLeft && (
            <div className="py-5">
              <span className="font-bold text-base">CHOOSE PAYMENT METHOD</span>
              <div className="mt-4">
                <button
                  className="bg-[#FF5B00] text-white px-16 py-2 cursor-pointer"
                  onClick={handlePlaceOrder}
                >
                  Proceed to Pay
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delivery Modal */}
      <DeliveryAddressModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
      />
    </>
  );
}
