"use client";

import Image from "next/image";
import Link from "next/link";
import { CircleUserRound, MapPin, Menu, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import { TbBus } from "react-icons/tb";
import { PiHandCoinsFill } from "react-icons/pi";
import { useHomeStore } from "@/app/store/homeStore";
import { useUserStore } from "@/app/store/useUserStore";
import AccountDropdown from "@/app/pages/cart/components/dropDown";
import LoginModal from "@/app/pages/auth/login/LoginModal";
import CreateAccountModal from "@/app/pages/auth/createAccount/CreateAccountModal";
import DineInModal from "./dineIn-modal";
import useCartStore from "@/app/store/useCartStore";
import useBuildYourOwnPizzaCart from "@/app/store/useBuildYourOwnPizzaCart";
import CitySelectModal from "./modal/CitySelectModal";

export default function Header() {
  const { data } = useHomeStore();
  const { user } = useUserStore();
  const { orderItems } = useCartStore();
  const { pizzas } = useBuildYourOwnPizzaCart();

  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"delivery" | "pickup">("delivery");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [createAccountData, setCreateAccountData] = useState<{
    waId: string;
    mobile: string;
  } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedCity = localStorage.getItem("selectedCity");
    if (storedCity) {
      setSelectedCity(storedCity);
    }
  }, []);

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  const totalCartCount =
    orderItems.reduce((sum, item) => sum + item.quantity, 0) +
    pizzas.reduce((sum, pizza) => sum + (pizza.quantity || 1), 0);

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

      {isPickupModalOpen && (
        <DineInModal onClose={() => setIsPickupModalOpen(false)} />
      )}
      {isModalOpen && (
        <CitySelectModal
          onClose={() => setIsModalOpen(false)}
          onCitySelect={handleCitySelect}
        />
      )}

      <header
        className={`fixed top-0 left-0 w-full z-50 flex flex-col lg:flex-row items-center justify-between px-4 xl:px-12 border-b border-white ${
          data?.nav_bg_color ? `bg-[${data?.nav_bg_color}]` : "bg-[#f47335]"
        }`}
      >
        <div className="flex items-center justify-between w-full lg:w-auto py-2">
          <div className="flex items-center gap-2 xl:gap-1  ">
            <Image
              src={data?.nav_logo_img || "/elephant.png"}
              alt="Elfo's Pizza Logo"
              width={200}
              height={200}
              className="w-16 h-16"
            />
            <h1 className="text-white max-xl:hidden text-2xl lg:text-3xl sm:text-xl font-bold uppercase [font-family:'Barlow_Condensed',Helvetica] ">
              {data?.nav_logo_text || "ELFO'S PIZZA"}
            </h1>
            <h1 className="text-white xl:hidden lg:hidden text-xl lg:text-xl sm:text-xl font-bold uppercase [font-family:'Barlow_Condensed',Helvetica] ">
              {data?.nav_logo_text || "ELFO'S PIZZA"}
            </h1>
          </div>

          <div className="flex gap-5">
            <Link href="/pages/cart" className="relative lg:hidden">
              <ShoppingCart className="text-white h-8 w-8" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-white text-[#f47335] rounded-full w-4 h-4 flex items-center justify-center text-sm font-bold">
                  {totalCartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden text-white"
            >
              <Menu size={30} />
            </button>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8 [font-family:'Barlow_Condensed',Helvetica] text-2xl max-lg:text-xl ">
          <Link
            href="/"
            className="text-white font-semibold hover:border-b-2 hover:border-white pb-1"
          >
            HOME
          </Link>
          <Link
            href="/pages/values"
            className="text-white font-semibold hover:border-b-2 hover:border-white pb-1"
          >
            VALUES
          </Link>
          <Link
            href="/pages/build"
            className="text-white font-semibold hover:border-b-2 hover:border-white pb-1"
          >
            BUILD YOUR OWN
          </Link>
          <Link
            href="/pages/menu"
            className="text-white font-semibold hover:border-b-2 hover:border-white pb-1"
          >
            MENU
          </Link>
        </nav>

        <div className="flex items-center gap-4 mt-4 lg:mt-0 w-full lg:w-[50%] max-sm:hidden max-lg:hidden">
          <div
            className="bg-[#c05a29] text-black rounded-md flex items-center p-2 w-[60%] lg:w-[40%] cursor-pointer"
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

          <div className="hidden lg:flex items-center [font-family:'Barlow_Condensed',Helvetica] ">
            <button
              onClick={() => setActiveTab("delivery")}
              className={`px-3 py-[5px] text-base lg:text-sm xl:text-base rounded-l-md font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === "delivery"
                  ? "bg-white text-black"
                  : "bg-transparent text-white border border-white"
              }`}
            >
              <PiHandCoinsFill size={20} className="max-xl:hidden" />
              Delivery
            </button>

            <button
              onClick={() => {
                setActiveTab("pickup");
                setIsPickupModalOpen(true);
              }}
              className={`px-3 py-1 text-base lg:text-sm xl:text-base rounded-r-md font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === "pickup"
                  ? "bg-white text-black"
                  : "bg-transparent text-white border border-white"
              }`}
            >
              <TbBus size={20} className="max-xl:hidden" />
              Pickup/Dine in
            </button>
          </div>

          <div className="flex justify-end items-center gap-5 w-[20%]">
            <Link href="/pages/cart" className="relative">
              <ShoppingCart className="text-white h-8 w-8" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-white text-[#f47335] rounded-full w-4 h-4 flex items-center justify-center text-sm font-bold">
                  {totalCartCount}
                </span>
              )}
            </Link>

            {user ? (
              <AccountDropdown />
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-white text-base font-semibold hover:underline flex justify-center items-center gap-1 cursor-pointer"
              >
                <CircleUserRound className="text-white h-9 w-9" /> SignIn
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 bg-opacity-70 flex xl:hidden">
          <div className="bg-white w-[75%] p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#f47335]">Menu</h2>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold text-gray-800"
            >
              HOME
            </Link>
            <Link
              href="/pages/values"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold text-gray-800"
            >
              VALUES
            </Link>
            <Link
              href="/pages/build"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold text-gray-800"
            >
              BUILD YOUR OWN
            </Link>
            <Link
              href="/pages/menu"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-semibold text-gray-800"
            >
              MENU
            </Link>

            <hr className="border-gray-300" />

            <div
              onClick={() => {
                setIsModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-3 bg-[#f47335] rounded-md cursor-pointer text-white"
            >
              <MapPin className="w-5 h-5" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Delivery From</span>
                <span className="text-xs">
                  {selectedCity || "Select your address"}
                </span>
              </div>
            </div>

            <div className="flex">
              <button
                onClick={() => {
                  setActiveTab("delivery");
                  setMobileMenuOpen(false);
                }}
                className={`w-1/2 py-3 rounded-l-md font-semibold flex flex-col items-center justify-center gap-1 ${
                  activeTab === "delivery"
                    ? "bg-[#f47335] text-white"
                    : "border border-[#f47335] text-[#f47335]"
                }`}
              >
                <PiHandCoinsFill size={20} />
                <span>Delivery</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab("pickup");
                  setIsPickupModalOpen(true);
                  setMobileMenuOpen(false);
                }}
                className={`w-1/2 py-3 rounded-r-md font-semibold flex flex-col items-center justify-center gap-1 ${
                  activeTab === "pickup"
                    ? "bg-[#f47335] text-white"
                    : "border border-[#f47335] text-[#f47335]"
                }`}
              >
                <TbBus size={20} />
                <span>Pickup/Dine in</span>
              </button>
            </div>

            <div className="mt-4">
              {user ? (
                <AccountDropdown />
              ) : (
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-[#f47335] font-semibold"
                >
                  <CircleUserRound className="w-6 h-6" />
                  Sign In
                </button>
              )}
            </div>
          </div>

          <div className="w-[25%]" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </>
  );
}
