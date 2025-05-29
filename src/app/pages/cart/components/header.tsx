"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, MapPin } from "lucide-react";
import { useHomeStore } from "@/app/store/homeStore";
import Loader from "@/components/loader/Loader";

export default function Header() {
  const { data } = useHomeStore();
  const [activeTab, setActiveTab] = useState<"delivery" | "pickup">("delivery");

  //   console.log(data,"------->")

  if (!data)
    return (
      <div className="fixed inset-0 z-50 h-full w-full flex items-center justify-center bg-white">
        <Loader />
      </div>
    );

  return (
      <header className="fixed top-0 left-0 right-0 z-50 px-4  bg-[#f47335] shadow-md [font-family:'Barlow_Condensed',Helvetica]">
      <div className="flex items-center justify-start h-20 ">
        {/* Left: Logo and Name */}
        <div className="flex items-center gap-2  w-[23%]">
          <Image
            src={data?.nav_logo_img || "/elephant.png"}
            alt="Elfo's Pizza Logo"
            width={200}
            height={200}
            className="w-15 h-15"
          />
          <Link
            href="/"
            className="text-white text-xl font-semibold hover:underline"
          >
            {data?.nav_logo_text || "ELFO'S PIZZAsssssss"}
          </Link>
        </div>

        {/* Center: Toggle + Address */}
        <div className="flex items-center gap-4  w-[55%]">
          {/* Toggle */}
          <div className="flex items-center gap-4 pr-4 border-l border-white px-10 py-4">
            <label className="flex items-center gap-1 text-white font-semibold text-xl cursor-pointer">
              <input
                type="radio"
                checked={activeTab === "delivery"}
                onChange={() => setActiveTab("delivery")}
                className="accent-black cursor-pointer"
              />
              Delivery
            </label>
            <label className="flex items-center gap-1 text-white font-semibold text-xl cursor-pointer">
              <input
                type="radio"
                checked={activeTab === "pickup"}
                onChange={() => setActiveTab("pickup")}
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
          <Link
            href="/signin"
            className="text-white text-xl font-semibold hover:underline"
          >
            SIGN IN / JOIN
          </Link>

          <div className="relative cursor-pointer">
            <ShoppingCart className="text-white h-7 w-7" />
            <span className="absolute -top-1 -right-1 bg-white text-[#f47335] rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold">
              0
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
