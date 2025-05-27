"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ShoppingCart, MapPin } from "lucide-react";
import axios from "axios";

interface HeaderData {
  nav_logo_img: string;
  nav_logo_text: string;
}

export default function Header() {
  const [data, setData] = useState<HeaderData>();
  const [activeTab, setActiveTab] = useState<"delivery" | "pickup">("delivery");

  useEffect(() => {
    const fetchHeader = async () => {
      try {
        const res = await axios.get("/api/home/nav");
        setData(res.data);
      } catch (error) {
        console.error("Error fetching header:", error);
      }
    };
    fetchHeader();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 bg-[#f47335] shadow-md">
      <div className="flex items-center justify-between h-20">
        {/* Left: Logo and Name */}
        <div className="flex items-center gap-2">
          <Image
            src={data?.nav_logo_img || "/elephant.png"}
            alt="Elfo's Pizza Logo"
            width={40}
            height={40}
            className="w-10 h-10"
          />
          <h1 className="text-black text-lg md:text-xl font-bold [font-family:'Barlow_Condensed',Helvetica]">
            {data?.nav_logo_text || "ELFO'S PIZZA"}
          </h1>
        </div>

        {/* Center: Toggle + Address */}
        <div className="flex items-center gap-4">
          {/* Toggle */}
          <div className="flex items-center gap-4 pr-4 border-l border-white">
            <label className="flex items-center gap-1 text-white font-semibold text-sm cursor-pointer">
              <input
                type="radio"
                checked={activeTab === "delivery"}
                onChange={() => setActiveTab("delivery")}
                className="accent-black"
              />
              Delivery
            </label>
            <label className="flex items-center gap-1 text-white font-semibold text-sm cursor-pointer">
              <input
                type="radio"
                checked={activeTab === "pickup"}
                onChange={() => setActiveTab("pickup")}
                className="accent-black"
              />
              Pickup/Dine in
            </label>
          </div>

          {/* Address Box */}
          <div className="bg-[#c05a29] rounded-md px-4 py-2 text-black flex items-start justify-center flex-col text-xs shadow">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm font-semibold">Delivery From</span>
            </div>
            <span className="text-[0.65rem] mt-1 ml-6">Select your address</span>
          </div>
        </div>

        {/* Right: Sign In & Cart */}
        <div className="flex items-center gap-4">
          <Link
            href="/signin"
            className="text-white text-sm font-semibold hover:underline"
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
