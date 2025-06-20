"use client";
import {  Info, Search, MapPin } from "lucide-react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { BiSolidPhoneCall } from "react-icons/bi";



export default function HeaderSection() {

   const searchParams = useSearchParams();
  const location = searchParams.get("location");


  return (
    <div className=" p-4">
      <div className=" mx-4 flex  items-center gap-14">
        {/* Card Section */}
        <div className="bg-white shadow rounded-lg p-4 w-[40%] relative flex justify-between items-start gap-4">
          {/* Left section */}
          <div className="flex-col">
            <div>
              {/* Mascot Image + Title */}
              <div className="flex items-center">
                <Image
                  src="/elephant.png"
                  alt="Elfo Logo"
                  width={50}
                  height={50}
                />
                <h2 className="text-2xl font-bold text-black pl-2 pt-2 [font-family:'Barlow_Condensed',Helvetica]">
                  ELFO’S PIZZA
                </h2>
              </div>

              {/* Address */}
              <div className="mt-2 pl-2">
                <div className="flex items-center text-sm text-gray-400 mt-1 gap-1">
                  <MapPin className="w-4 h-4" />
                  <span className="">{location}</span>
                </div>
              </div>
            </div>

            {/* Open Button */}
            <button className="border border-orange-500 text-orange-600 hover:bg-[#f47335] hover:text-white cursor-pointer text-sm font-medium rounded px-10 py-1 mt-3 w-fit mx-auto">
              Open
            </button>
          </div>

          {/* Right icons - bottom right */}
          <div className="absolute bottom-4 right-4 flex items-center gap-5">
            <button className="text-gray-600 hover:text-gray-700">
              <BiSolidPhoneCall  className="w-6 h-6" />

            </button>
            <button className="text-gray-600 hover:text-gray-700">
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search and Veg Section */}
        <div className="flex-1 flex items-center justify-between gap-4 mt-2">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
            <input
              type="text"
              placeholder="Enter city or locality"
              className="w-full pl-3 pr-4 py-3 rounded-lg text-sm bg-gray-300 placeholder:text-gray-900 focus:outline-none"
            />
          </div>

          <div className="flex justify-center items-center gap-2 border border-gray-400 px-2 py-3 rounded-md bg-white">
            <div className="flex items-center gap-2 ">
                <div className="w-5 h-5 border border-green-700 rounded-sm flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-700 rounded-full" />
                </div>
              </div>
            <h1 className="text-sm text-black font-medium">Pure Veg</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
