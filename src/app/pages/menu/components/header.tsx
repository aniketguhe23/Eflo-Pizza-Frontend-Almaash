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
import useCartStore from "@/app/store/useCartStore";
import useBuildYourOwnPizzaCart from "@/app/store/useBuildYourOwnPizzaCart";
import DineInModal from "@/components/dineIn-modal";
import CitySelectModal from "@/components/modal/CitySelectModal";

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
    if (storedCity) setSelectedCity(storedCity);
  }, []);

  const handleCitySelect = (city: string) => setSelectedCity(city);

  const totalCartCount =
    orderItems.reduce((sum, item) => sum + item.quantity, 0) +
    pizzas.reduce((sum, pizza) => sum + (pizza.quantity || 1), 0);

  return (
    <>
      {/* Modals */}
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

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-black border-b px-4 lg:px-8 xl:px-12 py-2">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src={data?.nav_logo_img || "/elephant.png"}
              alt="Elfo's Pizza Logo"
              width={200}
              height={200}
              className="w-16 h-16 lg:w-12 lg:h-12"
            />
            <h1 className="text-white max-xl:hidden text-2xl lg:text-3xl sm:text-xl font-bold uppercase [font-family:'Barlow_Condensed',Helvetica] ">
              {data?.nav_logo_text || "ELFO'S PIZZA"}
            </h1>
            <h1 className="text-white xl:hidden lg:hidden text-xl lg:text-xl sm:text-xl font-bold uppercase [font-family:'Barlow_Condensed',Helvetica] ">
              {data?.nav_logo_text || "ELFO'S PIZZA"}
            </h1>
          </div>

          {/* Cart & Menu Toggle */}
          <div className="flex gap-4 items-center lg:hidden">
            <Link href="/pages/cart" className="relative">
              <ShoppingCart className="text-white h-7 w-7" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-white text-[#f47335] rounded-full w-4 h-4 flex items-center justify-center text-sm font-bold">
                  {totalCartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-white"
            >
              <Menu size={28} />
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 justify-start py-2">
            {/* Nav Links */}
            <nav className="flex gap-6 xl:gap-8 text-white text-2xl max-lg:text-xl max-xl:text-xl font-semibold [font-family:'Barlow_Condensed',Helvetica]">
              <Link
                href="/"
                className="hover:border-b-2 hover:border-white pb-1"
              >
                HOME
              </Link>
              <Link
                href="/pages/values"
                className="hover:border-b-2 hover:border-white pb-1"
              >
                VALUES
              </Link>
              <Link
                href="/pages/build"
                className="hover:border-b-2 hover:border-white pb-1"
              >
                BUILD YOUR OWN
              </Link>
              <Link
                href="/pages/menu"
                className="hover:border-b-2 hover:border-white pb-1"
              >
                MENU
              </Link>
            </nav>

            {/* City & Mode Toggle */}
            <div className="flex gap-3 items-center ml-4">
              <div
                className="bg-[#868383] text-black rounded-md flex items-center p-2 lg:p-1 lg:w-44 xl:w-56 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                <MapPin className="text-black mr-2 h-6 w-6 lg:h-5 lg:w-5" />
                <div className="flex flex-col text-xs lg:text-[0.6rem] py-2">
                  <span>Delivery In</span>
                  <span>{selectedCity || "Select your address"}</span>
                </div>
              </div>

              {/* Delivery / Pickup */}
              <div className="hidden lg:flex items-center [font-family:'Barlow_Condensed',Helvetica] mr-10">
                <button
                  onClick={() => setActiveTab("delivery")}
                  className={`px-3 py-[5px] lg:text-sm xl:text-base rounded-l-md font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
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
                  className={`px-3 py-1 lg:text-sm xl:text-base rounded-r-md font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                    activeTab === "pickup"
                      ? "bg-white text-black py-1.5"
                      : "bg-transparent text-white border border-white"
                  }`}
                >
                  <TbBus size={20} className="max-xl:hidden" />
                  Pickup/Dine in
                </button>
              </div>

              {/* Cart & Login */}
              <Link href="/pages/cart" className="relative lg:mr-2">
                <ShoppingCart className="text-white h-8 w-8 max-xl:h-6 max-xl:w-6" />{" "}
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-white text-[#f47335] rounded-full w-4 h-4 max-xl:h-3 max-xl:w-3 flex items-center justify-center text-sm max-xl:text-xs font-bold">
                    {totalCartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <AccountDropdown />
              ) : (
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="text-white font-semibold flex items-center gap-1 text-base lg:text-sm"
                >
                  <CircleUserRound className="h-7 w-7 lg:h-6 lg:w-6" /> SignIn
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile & Tablet Sidebar */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/70">
          <div className="bg-white w-[75%] p-6 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-[#f47335]">Menu</h2>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={24} />
              </button>
            </div>

            {/* Links */}
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

            {/* City */}
            <div
              onClick={() => {
                setIsModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 p-3 bg-[#f47335] rounded-md cursor-pointer text-white"
            >
              <MapPin className="w-5 h-5" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">Delivery In</span>
                <span className="text-xs">
                  {selectedCity || "Select your address"}
                </span>
              </div>
            </div>

            {/* Mode Toggle */}
            <div className="flex">
              {["delivery", "pickup"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => {
                    setActiveTab(mode as any);
                    if (mode === "pickup") setIsPickupModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-1/2 py-3 font-semibold flex flex-col items-center justify-center gap-1 ${
                    activeTab === mode
                      ? "bg-[#f47335] text-white"
                      : "border border-[#f47335] text-[#f47335]"
                  } ${mode === "delivery" ? "rounded-l-md" : "rounded-r-md"}`}
                >
                  {mode === "delivery" ? (
                    <PiHandCoinsFill size={20} />
                  ) : (
                    <TbBus size={20} />
                  )}
                  <span>
                    {mode === "delivery" ? "Delivery" : "Pickup/Dine in"}
                  </span>
                </button>
              ))}
            </div>

            {/* Auth */}
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

          {/* Backdrop */}
          <div className="w-[25%]" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}
    </>
  );
}
