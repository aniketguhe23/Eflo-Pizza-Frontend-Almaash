"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, MapPin, Menu, X } from "lucide-react";
import { useHomeStore } from "@/app/store/homeStore";
import Loader from "@/components/loader/Loader";
import { useUserStore } from "@/app/store/useUserStore";
import AccountDropdown from "./dropDown";
import CreateAccountModal from "../../auth/createAccount/CreateAccountModal";
import LoginModal from "../../auth/login/LoginModal";
import useCartStore from "@/app/store/useCartStore";
import useBuildYourOwnPizzaCart from "@/app/store/useBuildYourOwnPizzaCart";
import CitySelectModal from "@/components/modal/CitySelectModal";
import { PiHandCoinsFill } from "react-icons/pi";
import { TbBus } from "react-icons/tb";
import DineInModal from "@/components/dineIn-modal";

// interface deliveryProps {
//   deliveryType?: "delivery" | "pickup";
//   // setDeliveryType: React.Dispatch<
//   //   React.SetStateAction<"delivery" | "pickup" | undefined>
//   // >;
// }

export default function Header(
  {
    // setDeliveryType,
    // deliveryType,
  }
) {
  const { data } = useHomeStore();
  const { orderItems } = useCartStore();
  const { pizzas } = useBuildYourOwnPizzaCart();
  const restaurantAddress = useCartStore((state) => state.restaurantAddress);

  const { user } = useUserStore();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showMobileDeliveryOptions, setShowMobileDeliveryOptions] =
    useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [createAccountData, setCreateAccountData] = useState<{
    waId: string;
    mobile: string;
  } | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"delivery" | "pickup">(
    restaurantAddress ? "pickup" : "delivery"
  );

  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);

  useEffect(() => {
    const storedCity = localStorage.getItem("selectedCity");
    if (storedCity) {
      setSelectedCity(storedCity);
    }
  }, []);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  // Calculate total quantity
  const totalCartCount =
    orderItems.reduce((sum, item) => sum + item.quantity, 0) +
    pizzas.reduce((sum, pizza) => sum + (pizza.quantity || 1), 0);

  if (!data)
    return (
      <div className="fixed inset-0 z-50 h-full w-full flex items-center justify-center bg-white">
        <Loader />
      </div>
    );

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

      {isModalOpen && (
        <CitySelectModal
          onClose={() => setIsModalOpen(false)}
          onCitySelect={handleCitySelect}
        />
      )}

      {isPickupModalOpen && (
        <DineInModal onClose={() => setIsPickupModalOpen(false)} />
      )}
      <>
        {/* Mobile Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full w-64 bg-[#f47335] z-[999] transform transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:hidden`}
        >
          <div className="flex items-center justify-between p-4 border-b border-white">
            <h2 className="text-white text-lg font-bold">Elfo's</h2>
            <X
              className="text-white w-6 h-6 cursor-pointer"
              onClick={() => setSidebarOpen(false)}
            />
          </div>
          <div className="flex flex-col p-4 gap-4 text-white text-lg font-semibold ">
            <Link href="/" onClick={() => setSidebarOpen(false)}>
              Home
            </Link>
            <Link href="/pages/cart" onClick={() => setSidebarOpen(false)}>
              Cart
            </Link>
            <Link href="/pages/menu" onClick={() => setSidebarOpen(false)}>
              Menu
            </Link>
            <Link href="/pages/build" onClick={() => setSidebarOpen(false)}>
              Build Your Own
            </Link>
            <Link href="/pages/values" onClick={() => setSidebarOpen(false)}>
              Values
            </Link>
            {user ? (
              <AccountDropdown />
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-white text-base sm:text-xl font-semibold hover:underline cursor-pointer"
              >
                SIGN IN / JOIN
              </button>
            )}
            {/* Add more links as needed */}
          </div>
        </div>

        {/* Backdrop when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-[998] lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Header */}
        <header className="fixed top-0 left-0 right-0 z-50 px-4 bg-[#f47335] shadow-md [font-family:'Barlow_Condensed',Helvetica]">
          <div className="flex flex-wrap items-center justify-between h-auto py-2 gap-4 sm:gap-0">
            {/* Left: Logo and Name */}
            <div className="flex items-center gap-2 w-full sm:w-[23%] justify-between sm:justify-start">
              {/* Hamburger menu (mobile only) */}

              <div className="flex justify-center items-center">
                <Menu
                  className="text-white w-10 h-10 cursor-pointer lg:hidden"
                  onClick={() => setSidebarOpen(true)}
                />
                <div className="flex sm:hidden justify-end w-full mb-2">
                  <button
                    onClick={() =>
                      setShowMobileDeliveryOptions(!showMobileDeliveryOptions)
                    }
                    className="text-white text-sm font-semibold bg-[#c05a29] px-3 py-1 rounded"
                  >
                    {showMobileDeliveryOptions
                      ? "Hide Options"
                      : "Delivery Options"}
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2 ">
                <Link href="/">
                  <Image
                    src={data?.nav_logo_img || "/elephant.png"}
                    alt="Elfo's Pizza Logo"
                    width={200}
                    height={200}
                    className="w-12 h-12 sm:w-15 sm:h-15"
                  />
                </Link>
                <Link
                  href="/"
                  className="text-white text-lg sm:text-xl font-semibold hover:underline uppercase"
                >
                  {data?.nav_logo_text || "ELFO'S PIZZA"}
                </Link>
              </div>
            </div>

            {/* Center: Toggle + Address (hidden on very small screens if needed) */}
            {/* <div className=" sm:flex flex-row items-center gap-4 w-[55%] max-sm:w-full">
              <div className="flex items-center gap-4 px-4 py-4 w-full sm:px-10 sm:py-4 sm:w-auto sm:border-l  border-white">
                <label className="flex items-center gap-1 text-white font-semibold text-xl cursor-pointer">
                  <input
                    type="radio"
                    checked={deliveryType === "delivery"}
                    onChange={() => setDeliveryType("delivery")}
                    className="accent-black cursor-pointer"
                  />
                  Delivery
                </label>
                <label className="flex items-center gap-1 text-white font-semibold text-xl cursor-pointer">
                  <input
                    type="radio"
                    checked={deliveryType === "pickup"}
                    onChange={() => setDeliveryType("pickup")}
                    className="accent-black cursor-pointer"
                  />
                  Pickup/Dine in
                </label>
              </div>

              <div
                className="bg-[#c05a29] text-black rounded-md flex items-center p-2 w-[40%] max-sm:w-full cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <MapPin className="text-black mr-2 h-6 w-6" />
                <div className="flex flex-col">
                  <span className="text-[.8rem]">Delivery From</span>
                  <span className="text-[.6rem]">
                    {selectedCity || "Select your address"}
                  </span>
                </div>
              </div>
            </div> */}

            {/* Toggle button (Mobile only) */}

            {/* Toggle + Address Section */}
            <div
              className={`${
                showMobileDeliveryOptions ? "flex" : "hidden"
              } max-sm:flex-col sm:flex sm:flex-row items-center gap-4  sm:w-[55%]`}
            >
              {/* Toggle */}
              <div className="hidden lg:flex items-center [font-family:'Barlow_Condensed',Helvetica]">
                <button
                  onClick={() => setActiveTab("delivery")}
                  className={`px-3 py-[5px] rounded-l-md font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    activeTab === "delivery"
                      ? "bg-white text-black"
                      : "bg-transparent text-white border border-white"
                  }`}
                >
                  <PiHandCoinsFill size={20} />
                  Delivery
                </button>
                <button
                  onClick={() => {
                    setActiveTab("pickup");
                    setIsPickupModalOpen(true);
                  }}
                  className={`px-3 py-1 rounded-r-md font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    activeTab === "pickup"
                      ? "bg-white text-black py-1.5"
                      : "bg-transparent text-white border border-white"
                  }`}
                >
                  <TbBus size={20} />
                  Pickup/Dine in
                </button>
              </div>

              {/* Address */}
              <div
                className="bg-[#c05a29] text-black rounded-md flex items-center p-2  sm:w-[40%] cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <MapPin className="text-black mr-2 h-6 w-6" />
                <div className="flex flex-col">
                  <span className="text-[.8rem]">Delivery From</span>
                  <span className="text-[.6rem]">
                    {selectedCity || "Select your address"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Cart + Sign In */}
            <div className="flex items-center justify-end gap-4  sm:w-[22%] max-sm:hidden">
              <div className="relative cursor-pointer mr-5">
                <Link href="/pages/cart" className="relative">
                  <ShoppingCart className="text-white h-7 w-7 sm:h-8 sm:w-8" />
                  {totalCartCount > 0 && (
                    <span className="absolute -top-1 -right-2 bg-white text-[#f47335] rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
                      {totalCartCount}
                    </span>
                  )}
                </Link>
              </div>
              <div className="mr-15 max-sm:hidden max-lg:hidden">
                {user ? (
                  <AccountDropdown />
                ) : (
                  <button
                    onClick={() => setShowLoginModal(true)}
                    className="text-white text-base sm:text-xl font-semibold hover:underline cursor-pointer "
                  >
                    SIGN IN / JOIN
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>
      </>
    </>
  );
}
