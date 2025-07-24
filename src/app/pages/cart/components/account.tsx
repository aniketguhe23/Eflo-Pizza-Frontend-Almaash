"use client";

import React, { useEffect, useState } from "react";
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
import axios from "axios";
import ProjectApiList from "@/app/api/ProjectApiList";
import { GiForkKnifeSpoon } from "react-icons/gi";

interface AccountComponentProps {
  showLeft: boolean;
  setShowLeft: (value: boolean) => void;
  deliveryType?: "delivery" | "pickup";
  selectedRestaurant: string | null;
  setSelectedRestaurant: (value: string | null) => void;
  selectedRestaurantNumber: string | null;
  setSelectedRestaurantNumber: (value: string | null) => void;
  setDeliveryType: React.Dispatch<
    React.SetStateAction<"delivery" | "pickup" | undefined>
  >;
  selectedAddress: string | null;
  setSelectedAddress: (value: string | null) => void;
}

export default function AccountComponent({
  showLeft,
  setShowLeft,
  deliveryType,
  selectedRestaurant,
  setSelectedRestaurant,
  selectedAddress,
  setSelectedAddress,
  setSelectedRestaurantNumber,
  selectedRestaurantNumber,
}: AccountComponentProps) {
  const { user } = useUserStore();
  const { orderItems, addOns } = useCartStore();
  const { pizzas } = useBuildYourOwnPizzaCart();
  const restaurantNo = useCartStore((state) => state.restaurantNo);
  const restaurantAddress = useCartStore((state) => state.restaurantAddress);

  const { api_updateUserProfile, api_getResturantData } = ProjectApiList();

  const [showSelector, setShowSelector] = useState(false);
  const [resturantData, setResturantData] = useState<any[]>([]);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [createAccountData, setCreateAccountData] = useState<{
    waId: string;
    mobile: string;
  } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editAddressData, setEditAddressData] = useState<any>(null);
  const [restaurantSearch, setRestaurantSearch] = useState("");
  const [editRestaurant, setEditRestaurant] = useState(false);

  // const restaurantOptions = [
  //   {
  //     id: "r1",
  //     name: "Elfo’s Pizza - Bhopal",
  //     address: "Misroad, Golden City",
  //   },
  //   { id: "r2", name: "Elfo’s Pizza - Indore", address: "MG Road" },
  //   { id: "r3", name: "Elfo’s Pizza - Raipur", address: "Ambuja Mall Road" },
  //   { id: "r4", name: "Elfo’s Pizza - Nagpur", address: "Sitabuldi" },
  // ];

  const filteredRestaurants = resturantData.filter(
    (rest) =>
      rest.name.toLowerCase().includes(restaurantSearch.toLowerCase()) ||
      rest.address.toLowerCase().includes(restaurantSearch.toLowerCase())
  );

  const parseAddress = (addr: string) => {
    const [doorNumber = "", landmark = "", phoneNumber = ""] = addr.split(",");
    return {
      doorNumber: doorNumber.trim(),
      landmark: landmark.trim(),
      phoneNumber: phoneNumber.trim(),
    };
  };

  const itemTotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const pizzaItemsTotal = pizzas.reduce((sum, pizza) => {
    const price = Object.values(pizza.selections || {}).reduce(
      (acc, option) => {
        if (Array.isArray(option)) {
          return acc + option.reduce((s, item) => s + item.price, 0);
        }
        return acc + (option?.price || 0);
      },
      0
    );
    return sum + price * (pizza.quantity || 1);
  }, 0);
  const addOnsTotal = addOns
    .filter((item) => item.added)
    .reduce((sum, item) => sum + item.price, 0);

  const discount = 211;
  const gstAndCharges = 33.3;
  const total =
    itemTotal + pizzaItemsTotal + addOnsTotal - discount + gstAndCharges;

  const handleSave = async ({
    phoneNumber,
    doorNumber,
    landmark,
    addressType,
    addressKey,
  }: {
    phoneNumber: string;
    doorNumber: string;
    landmark: string;
    addressType: string;
    addressKey?: "home" | "work" | "others";
  }) => {
    const fullAddress = `${doorNumber}, ${landmark}, ${phoneNumber}`;
    const key = addressKey || addressType.toLowerCase();

    try {
      const response = await axios.put(
        `${api_updateUserProfile}/${user?.waId}`,
        {
          addressType: key,
          addressValue: fullAddress,
        }
      );

      if (response.data.status === "success") {
        setSelectedAddress(fullAddress);
        setShowSelector(false);
        setEditAddressData(null);
        window.location.reload();
      }
    } catch (error) {
      console.error("Axios error:", error);
    }
  };

  const handlePlaceOrder = async () => {
    const mergedItems = [
      ...orderItems.map((item) => ({
        type: "preset",
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
      ...pizzas.map((pizza) => ({
        type: "custom",
        selections: pizza.selections,
        quantity: pizza.quantity,
      })),
    ];

    const payload = {
      user_id: user?.waId || null,
      address: selectedAddress,
      restaurant_name: selectedRestaurant,
      type: deliveryType,
      items: mergedItems,
      addon: addOns.filter((item) => item.added),
      discount: Math.round(discount),
      delivery: null,
      gst: gstAndCharges,
      item_total: Math.round(itemTotal + pizzaItemsTotal + addOnsTotal),
      total_price: Math.round(total),
    };

    // console.log(payload)
  };

  const selectedCity = localStorage.getItem("selectedCity");

  useEffect(() => {
    const fetchRestaurantList = async () => {
      try {
        const res = await axios.get(
          `${api_getResturantData}?city=${selectedCity}&isClosed=false&is_active=true&address=${encodeURIComponent(
            restaurantSearch
          )}`
        );
        const fetched = res.data.data || [];
        setResturantData(fetched);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurantList();
  }, [restaurantSearch, selectedCity]);

  return (
    <>
      {/* Login / Signup */}
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
        className={`transition-all duration-300 ${
          showLeft ? "w-[450px]" : "w-[80px] max-sm:w-[50px]"
        } h-screen bg-gray-300 p-4 max-sm:p-1 max-sm:pt-8 flex flex-col gap-6 relative pt-15 overflow-hidden`}
      >
        <div className="h-full overflow-y-auto flex flex-col gap-6 pb-28 no-scrollbar">
          {/* Account */}
          <div className="bg-white p-4 max-sm:p-1 rounded shadow flex items-start gap-4 mt-10 [font-family:'Barlow_Condensed',Helvetica]">
            <div className="w-10 h-10 flex justify-center items-center">
              <IoPersonCircleSharp size={showLeft ? 24 : 20} />
            </div>
            {showLeft &&
              (user ? (
                <div className="text-2xl">
                  <p className="text-gray-600 text-base">Welcome back,</p>
                  <h2 className="font-semibold">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-base text-gray-600 mt-1">
                    Mob: {user.mobile}
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-2 text-left">
                  <h2 className="font-bold text-lg text-black">ACCOUNT</h2>
                  <p className="text-gray-500 text-sm">
                    To place your order now, log in to your existing account or
                    sign up.
                  </p>
                  <div className="flex gap-3 mt-2">
                    <button
                      onClick={() => setShowLoginModal(true)}
                      className="border-2 border-orange-500 text-orange-500 px-6 py-1 cursor-pointer font-bold text-sm hover:bg-orange-50"
                    >
                      LOG IN
                    </button>
                  </div>
                </div>
              ))}
          </div>

          {/* Delivery Address */}
          {showLeft &&
            user &&
            (selectedAddress && !showSelector ? (
              // ✅ Show selected address card by default
              <div className="bg-white p-4 rounded shadow flex items-start gap-4 [font-family:'Barlow_Condensed',Helvetica]">
                <div className="rounded w-10 h-10 flex items-center justify-center mt-1">
                  <IoLocationSharp size={24} fill="black" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-xl flex items-center">
                    DELIVERY ADDRESS{" "}
                    <TiTick className="text-orange-500 w-5 h-5 ml-1" />
                  </p>
                  <p className="text-base text-gray-700 mt-1 line-clamp-2">
                    {selectedAddress}
                  </p>
                </div>
                <button
                  className="text-[#ED722E] text-sm font-semibold underline hover:no-underline cursor-pointer mt-1"
                  onClick={() => setShowSelector(true)}
                >
                  CHANGE
                </button>
              </div>
            ) : (
              // 👇 Show address selector only when explicitly opened
              <div className="bg-white p-4 rounded shadow">
                {/* Header */}
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 bg-[#A49FAF] text-white rounded flex items-center justify-center mr-3">
                    <IoLocationSharp size={20} />
                  </div>
                  <div className="[font-family:'Barlow_Condensed',Helvetica]">
                    <p className="font-bold text-xl">SELECT DELIVERY ADDRESS</p>
                    <p className="text-xs text-gray-700">
                      YOU HAVE A SAVED ADDRESS IN THIS LOCATION
                    </p>
                  </div>
                </div>

                {/* Address Cards */}
                <div className="max-h-72 overflow-x-auto pb-2">
                  <div className="flex gap-4 px-1">
                    {["home", "work", "others"].map((key) => {
                      const label = key.toUpperCase();
                      const value =
                        user[
                          `address_${key}` as
                            | "address_home"
                            | "address_work"
                            | "address_others"
                        ];
                      if (!value) return null;
                      const parsed = parseAddress(value);

                      return (
                        <div
                          key={key}
                          className="min-w-[250px] max-w-sm border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow flex-shrink-0 flex flex-col justify-between h-32"
                        >
                          <div className="p-4">
                            <div className="flex justify-between items-center mb-2">
                              <p className="font-semibold text-sm text-gray-800">
                                {label}
                              </p>
                              <button
                                onClick={() =>
                                  setEditAddressData({
                                    phoneNumber: parsed.phoneNumber,
                                    doorNumber: parsed.doorNumber,
                                    landmark: parsed.landmark,
                                    addressType:
                                      label[0] + label.slice(1).toLowerCase(),
                                    addressKey: key as
                                      | "home"
                                      | "work"
                                      | "others",
                                  })
                                }
                                className="text-xs text-blue-600 hover:underline cursor-pointer"
                              >
                                EDIT
                              </button>
                            </div>
                            <p className="text-xs text-gray-600 leading-snug">
                              {parsed.doorNumber}, {parsed.landmark}
                              <br />
                              {parsed.phoneNumber}
                            </p>
                          </div>

                          <button
                            className="w-full text-[#ED722E] text-sm border-t rounded-b-md border-black px-4 py-1 cursor-pointer hover:bg-[#ED722E] hover:text-white transition-colors"
                            onClick={() => {
                              setSelectedAddress(value);
                              setShowSelector(false); // ✅ Hide selector after choosing
                            }}
                          >
                            DELIVERY HERE
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Add New Button */}
                {!(
                  user.address_home &&
                  user.address_work &&
                  user.address_others
                ) && (
                  <div className="text-center mt-4">
                    <button
                      onClick={() => setShowModal(true)}
                      className="bg-[#ED722E] text-white px-4 py-2 rounded hover:bg-orange-600 text-sm"
                    >
                      ADD NEW
                    </button>
                  </div>
                )}
              </div>
            ))}

          {/* Restaurant Section */}
          {restaurantAddress ? (
            // ✅ Show data if external restaurantNo is provided
            <div className="bg-white p-4 rounded shadow [font-family:'Barlow_Condensed',Helvetica]">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded flex items-center justify-center mr-3 ">
                  <GiForkKnifeSpoon size={showLeft ? 24 : 20} />
                </div>
                <div className="flex">
                  <p className="font-bold text-xl">SELECTED RESTAURANT</p>
                  <TiTick className="text-orange-500 w-5 h-5 ml-1" />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="text-base text-gray-700 pl-11">
                  {restaurantAddress}
                </p>
              </div>
            </div>
          ) : (
            // ❌ If no external restaurantNo, allow selection via internal state
            <div className="bg-white p-4 rounded shadow [font-family:'Barlow_Condensed',Helvetica]">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 rounded flex items-center justify-center mr-3">
                  <GiForkKnifeSpoon size={20} />
                </div>
                <div className="flex">
                  <p className="font-bold text-xl">SELECTED RESTAURANT</p>
                  {selectedRestaurantNumber && (
                    <TiTick className="text-orange-500 w-5 h-5 ml-1" />
                  )}
                </div>
              </div>

              {selectedRestaurantNumber && !editRestaurant ? (
                <div className="flex justify-between items-center">
                  <p className="text-base text-gray-700 pl-11">
                    {selectedRestaurant}
                  </p>
                  <button
                    className="text-[#ED722E] text-sm font-semibold underline hover:no-underline"
                    onClick={() => setEditRestaurant(true)}
                  >
                    CHANGE
                  </button>
                </div>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Search restaurant..."
                    value={restaurantSearch}
                    onChange={(e) => setRestaurantSearch(e.target.value)}
                    className="w-full px-3 py-2 text-sm border rounded outline-none focus:ring-2 ring-orange-300 mb-3"
                  />
                  <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                    {filteredRestaurants.length ? (
                      filteredRestaurants.map((rest) => (
                        <button
                          key={rest.id}
                          onClick={() => {
                            setSelectedRestaurant(rest.address);
                            setSelectedRestaurantNumber(rest.restaurants_no);
                            setEditRestaurant(false);
                          }}
                          className={`w-full text-left border rounded px-3 py-2 text-sm transition cursor-pointer ${
                            selectedRestaurantNumber === rest.restaurants_no
                              ? "border-orange-500 bg-orange-50"
                              : "border-gray-300 hover:border-orange-400"
                          }`}
                        >
                          <p className="font-semibold text-gray-800">
                            {rest.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            {rest.address}
                          </p>
                        </button>
                      ))
                    ) : (
                      <>
                        {!selectedCity ? (
                          <p className="text-sm text-gray-500">
                            No City is selected
                          </p>
                        ) : (
                          <p className="text-sm text-gray-500">
                            No matching restaurants found.
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Payment Section */}
          {showLeft ? (
            <div className="bg-white p-4 rounded shadow flex items-center gap-4 [font-family:'Barlow_Condensed',Helvetica]">
              <div className="w-10 h-10 bg-white flex justify-center items-center">
                <IoWalletSharp size={24} />
              </div>
              <div>
                <p className="font-bold text-xl">CHOOSE PAYMENT METHOD</p>
                <div className="mt-4">
                  <button
                    className="bg-[#FF5B00] text-white px-16 py-2 cursor-pointer"
                    onClick={handlePlaceOrder}
                  >
                    Proceed to Pay
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-3 rounded shadow flex items-center justify-center">
              <IoWalletSharp size={24} title="Payment Options" />
            </div>
          )}

          {/* Toggle Button */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full px-1">
            <button
              onClick={() => setShowLeft(!showLeft)}
              className="w-full py-2 rounded-md bg-white text-orange-500 shadow font-semibold flex items-center justify-center gap-2 cursor-pointer"
            >
              {showLeft ? (
                <IoChevronBack className="w-5 h-5" />
              ) : (
                <IoChevronForward className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Modal for Address */}
      <DeliveryAddressModal
        isOpen={showModal || !!editAddressData}
        onClose={() => {
          setShowModal(false);
          setEditAddressData(null);
        }}
        onSave={handleSave}
        initialData={editAddressData}
      />
    </>
  );
}
