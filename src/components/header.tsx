"use client";
import Image from "next/image";
import Link from "next/link";
import { CircleUserRound, MapPin, ShoppingCart, User } from "lucide-react";
import { FaRegUserCircle } from "react-icons/fa";
import { useState } from "react";

export default function Header() {
  const [activeTab, setActiveTab] = useState<"delivery" | "pickup">("delivery");

  return (
    <header className="flex flex-col md:flex-row items-center justify-between px-6  md:px-12 bg-[#f47335]">
      <div className="flex items-center gap-4">
        <Image
          src="/elephant.png"
          alt="Elfo's Pizza Logo"
          width={200}
          height={200}
          className="w-20 h-20"
        />
        <h1 className="text-white text-3xl font-bold [font-family:'Barlow_Condensed',Helvetica]">
          ELFO'S PIZZA
        </h1>
      </div>

      <nav className="hidden md:flex items-center gap-8 [font-family:'Barlow_Condensed',Helvetica]  text-2xl ">
        <Link
          href="/"
          className="text-white font-semibold border-b-2 border-white pb-1"
        >
          HOME
        </Link>
        <Link
          href="/build"
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

      <div className="flex items-center gap-4 mt-4 md:mt-0 w-[50%]">
        <div className="bg-[#c05a29] text-black rounded-md flex items-center p-2 w-[40%]">
          <MapPin className="text-black mr-2 h-6 w-6" />
          <div className="flex flex-col">
            <span className="text-[.8rem]">Delivery From</span>
            <span className="text-[.6rem]">Select your address</span>
          </div>
        </div>

        <div className="flex items-center [font-family:'Barlow_Condensed',Helvetica] ml-10">
      <button
        onClick={() => setActiveTab("delivery")}
        className={`px-3 py-[5px] rounded-l-md font-semibold transition-all duration-200 cursor-pointer ${
          activeTab === "delivery"
            ? "bg-white text-black"
            : "bg-transparent text-white border border-white"
        }`}
      >
        Delivery
      </button>
      <button
        onClick={() => setActiveTab("pickup")}
        className={`px-3 py-1 rounded-r-md font-semibold transition-all duration-200 cursor-pointer ${
          activeTab === "pickup"
            ? "bg-white text-black"
            : "bg-transparent text-white border border-white"
        }`}
      >
        Pickup/Dine in
      </button>
    </div>

        <div className="flex justify-end items-center gap-5  w-[20%]">
          <CircleUserRound className="text-white h-9 w-9" />
          {/* <CircleUserRound /> */}

          <div className="relative">
            <ShoppingCart className="text-white h-8 w-8" />
            <span className="absolute -top-2 -right-2 bg-white text-[#f47335] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
              0
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
