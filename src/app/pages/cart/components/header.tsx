"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, MapPin } from "lucide-react";
import { useHomeStore } from "@/app/store/homeStore";
import Loader from "@/components/loader/Loader";
import { useUserStore } from "@/app/store/useUserStore";
import AccountDropdown from "./dropDown";
import CreateAccountModal from "../../auth/createAccount/CreateAccountModal";
import LoginModal from "../../auth/login/LoginModal";
import useCartStore from "@/app/store/useCartStore";
import useBuildYourOwnPizzaCart from "@/app/store/useBuildYourOwnPizzaCart";

interface deliveryProps {
  deliveryType?: "delivery" | "pickup";
  setDeliveryType: React.Dispatch<React.SetStateAction<"delivery" | "pickup" | undefined >>;
}

export default function Header({
  setDeliveryType,
  deliveryType,
}: deliveryProps) {
  const { data } = useHomeStore();
  const { orderItems } = useCartStore();
  const { pizzas } = useBuildYourOwnPizzaCart();

  const { user } = useUserStore();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [createAccountData, setCreateAccountData] = useState<{
    waId: string;
    mobile: string;
  } | null>(null);

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
      <header className="fixed top-0 left-0 right-0 z-50 px-4  bg-[#f47335] shadow-md [font-family:'Barlow_Condensed',Helvetica]">
        <div className="flex items-center justify-start h-20 ">
          {/* Left: Logo and Name */}
          <div className="flex items-center gap-2  w-[23%]">
            <Link href="/">
              <Image
                src={data?.nav_logo_img || "/elephant.png"}
                alt="Elfo's Pizza Logo"
                width={200}
                height={200}
                className="w-15 h-15"
              />
            </Link>
            <Link
              href="/"
              className="text-white text-xl font-semibold hover:underline uppercase"
            >
              {data?.nav_logo_text || "ELFO'S PIZZA"}
            </Link>
          </div>

          {/* Center: Toggle + Address */}
          <div className="flex items-center gap-4  w-[55%]">
            {/* Toggle */}
            <div className="flex items-center gap-4 pr-4 border-l border-white px-10 py-4">
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

            {/* Address Box */}
            <div className="bg-[#c05a29] opacity-70 text-black rounded-md flex items-center p-2 w-[50%]">
              <MapPin className="text-black mr-2 h-6 w-6" />
              <div className="flex flex-col">
                <span className="text-[1rem]">Delivery From</span>
                <span className="text-[.8rem]">Select your address</span>
              </div>
            </div>
          </div>

          {/* Right: Sign In & Cart */}
          <div className="flex items-center justify-end gap-4  w-[33%]">
            {/* <Link
            href="/pages/myAccount"
            className="text-white text-xl font-semibold hover:underline"
          >
            My Account
          </Link> */}

            {/* <AccountDropdown/> */}

            <div className="relative cursor-pointer mr-2">
              <Link href="/pages/cart" className="relative">
                <ShoppingCart className="text-white h-8 w-8" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-2 bg-white text-[#f47335] rounded-full w-4 h-4 flex items-center justify-center text-sm font-bold">
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
                className="text-white text-xl font-semibold hover:underline cursor-pointer"
              >
                SIGN IN / JOIN
              </button>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
