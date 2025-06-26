"use client";

import Image from "next/image";
import Link from "next/link";
import { CircleUserRound, MapPin, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { TbBus } from "react-icons/tb";
import { PiHandCoinsFill } from "react-icons/pi";
import { useHomeStore } from "@/app/store/homeStore";
import DineInModal from "@/components/dineIn-modal";
import useCartStore from "@/app/store/useCartStore";
import useBuildYourOwnPizzaCart from "@/app/store/useBuildYourOwnPizzaCart";
import AccountDropdown from "../../cart/components/dropDown";
import { useUserStore } from "@/app/store/useUserStore";
import LoginModal from "../../auth/login/LoginModal";
import CreateAccountModal from "../../auth/createAccount/CreateAccountModal";
// import DineInModal from "./dineIn-modal"; // ✅ Make sure this exists

export default function Header() {
  const { data } = useHomeStore();
  const { user } = useUserStore();
  const { orderItems } = useCartStore();
  const { pizzas } = useBuildYourOwnPizzaCart();

  const [activeTab, setActiveTab] = useState<"delivery" | "pickup">("delivery");
  const [isPickupModalOpen, setIsPickupModalOpen] = useState(false); // ✅ Modal control
    const [showLoginModal, setShowLoginModal] = useState(false);
  const [createAccountData, setCreateAccountData] = useState<{
    waId: string;
    mobile: string;
  } | null>(null);

  // Calculate total quantity
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
      {/* ✅ Modal rendering */}
      {isPickupModalOpen && (
        <DineInModal onClose={() => setIsPickupModalOpen(false)} />
      )}

      <header className="fixed top-0 left-0 right-0 z-50 flex flex-col md:flex-row items-center justify-between px-6 md:px-12 bg-[#f47335] shadow-md border-b border-white">
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

        {/* Delivery & Cart */}
        <div className="flex items-center gap-4 mt-4 md:mt-0 w-[50%]">
          <div className="bg-[#c05a29] opacity-70 text-black rounded-md flex items-center p-2 w-[40%]">
            <MapPin className="text-black mr-2 h-6 w-6" />
            <div className="flex flex-col">
              <span className="text-[.8rem]">Delivery From</span>
              <span className="text-[.6rem]">Select your address</span>
            </div>
          </div>

          <div className="flex items-center [font-family:'Barlow_Condensed',Helvetica] ml-10">
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

          <div className="flex justify-end items-center gap-5 w-[20%]">
            <div className="relative">
              <Link href="/pages/cart" className="relative">
                <ShoppingCart className="text-white h-8 w-8" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-white text-black rounded-full w-4 h-4 flex items-center justify-center text-sm font-bold">
                    {totalCartCount}
                  </span>
                )}
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
