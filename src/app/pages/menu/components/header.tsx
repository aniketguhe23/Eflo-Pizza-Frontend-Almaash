"use client";

import Image from "next/image";
import Link from "next/link";
import { CircleUserRound, MapPin, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { TbBus } from "react-icons/tb";
import { PiHandCoinsFill } from "react-icons/pi";
import { useHomeStore } from "@/app/store/homeStore";
import AccountDropdown from "../../cart/components/dropDown";
import { useUserStore } from "@/app/store/useUserStore";
import CreateAccountModal from "../../auth/createAccount/CreateAccountModal";
import LoginModal from "../../auth/login/LoginModal";
import DineInModal from "@/components/dineIn-modal";
// import DineInModal from "./dineIn-modal"; // ✅ Import your modal

export default function Header() {
  const { data } = useHomeStore();
  const { user } = useUserStore();

  const [activeTab, setActiveTab] = useState<"delivery" | "pickup">("delivery");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [createAccountData, setCreateAccountData] = useState<{
    waId: string;
    mobile: string;
  } | null>(null);
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false); // ✅ State for modal

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

      {/* Header */}
        <header
        className={`fixed top-0 left-0 w-full z-50 flex flex-col md:flex-row items-center justify-between px-12 bg-black`}
      >
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Image
            src={data?.nav_logo_img || "/elephant.png"}
            alt="Elfo's Pizza Logo"
            width={200}
            height={200}
            className="w-20 h-20"
          />
          <h1 className="text-white text-3xl font-bold [font-family:'Barlow_Condensed',Helvetica] uppercase">
            {data?.nav_logo_text || "ELFO'S PIZZA"}
          </h1>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 [font-family:'Barlow_Condensed',Helvetica] text-2xl">
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

        {/* Right Section */}
        <div className="flex items-center gap-4 mt-4 md:mt-0 w-[50%]">
          {/* Location Info */}
          <div className="bg-[#f4f4f4] opacity-70 text-black rounded-md flex items-center p-2 w-[40%]">
            <MapPin className="text-black mr-2 h-6 w-6" />
            <div className="flex flex-col">
              <span className="text-[.8rem]">Delivery From</span>
              <span className="text-[.6rem]">Select your address</span>
            </div>
          </div>

          {/* Delivery / Pickup Toggle */}
          <div className="flex items-center [font-family:'Barlow_Condensed',Helvetica] ml-3">
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
                setIsPickupModalOpen(true); // ✅ Open modal
              }}
              className={`px-3 py-1 rounded-r-md font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                activeTab === "pickup"
                  ? "bg-white text-black"
                  : "bg-transparent text-white border border-white"
              }`}
            >
              <TbBus size={20} />
              Pickup/Dine in
            </button>
          </div>

          {/* Cart + Account */}
          <div className="flex justify-end items-center gap-5 w-[20%]">
            <div className="relative">
              <Link href="/pages/cart" className="relative">
                <ShoppingCart className="text-white h-8 w-8" />
                <span className="absolute -top-2 -right-2 bg-white text-[#f47335] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                  0
                </span>
              </Link>
            </div>

            {user ? (
              <AccountDropdown />
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-white text-base font-semibold hover:underline flex justify-center items-center gap-1"
              >
                <CircleUserRound className="text-white h-9 w-9" /> SignIn
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
