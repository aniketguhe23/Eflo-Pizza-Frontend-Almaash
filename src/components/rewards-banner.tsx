"use client";
import { useHomeStore } from "@/app/store/homeStore";
import Image from "next/image";
import Link from "next/link";

export default function RewardsBanner() {
  const { data } = useHomeStore();

  return (
    <div className="py-8 px-12 flex flex-col md:flex-row items-center justify-center gap-8 mt-15">
      {/* Left side - Pizza image with background image */}
      <div className="relative ml-60">
        {/* Background Image */}
        <img
          src={`${data?.hero2_img1 ? data?.hero2_img1 : "/pizzaBW.jpg"}`}
          alt="Background Decoration"
          width={200}
          height={200}
          className="absolute inset-0 w-full h-full object-cover -ml-30 -rotate-12 rounded-2xl" // Opacity to blend into background
        />

        {/* Foreground Image (Pizza) */}
        <img
          src={`${data?.hero2_img2 ? data?.hero2_img2 : "/pizza2.jpg"}`}
          alt="Specialty Pizza"
          width={250}
          height={250}
          className="relative rounded-lg" // Ensure it remains above background image
        />
      </div>

      {/* Middle - Rewards image */}
      <div className="relative ">
        <img
          src={`${data?.hero2_img3 ? data?.hero2_img3 : "/pizzatag.png"}`}
          // src="/pizzatag.png"
          alt="Rewards Dish"
          width={150}
          height={150}
        />
      </div>

      {/* Right side - Rewards info */}
      <div className="bg-gradient-to-l from-[#ffc2a0] to-white rounded-lg p-6 w-[30rem] text-black [font-family:'Antonio',Helvetica] text-2xl">
        <h3 className="font-bold">
          {data?.hero2_title_1 ? (
            data?.hero2_title_1
          ) : (
            <>JOIN ELFO&apos;S REWARDS UNLOCK</>
          )}
        </h3>
        <p className="font-bold">
          <span className="text-orange-600 ">
            {data?.hero2_title_2 ? data?.hero2_title_2 : <>FREE CHIPOTLE</>}
          </span>
          .
        </p>

        <div className="flex justify-start gap-20 mt-4">
          <Link href="/account/create">
            <button className="text-lg font-semibold bg-white text-black px-4 py-2 rounded cursor-pointer border border-white hover:border-gray-300">
              {data?.hero2_button_1 ? (
                data?.hero2_button_1
              ) : (
                <> CREATE AN ACCOUNT</>
              )}
            </button>
          </Link>
          <Link href="/account/login">
            <button className="text-lg font-semibold text-black px-4 py-2 rounded cursor-pointer hover:bg-white">
              {data?.hero2_button_2 ? (
                data?.hero2_button_2
              ) : (
                <>     SIGN IN</>
              )}
              
          
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
