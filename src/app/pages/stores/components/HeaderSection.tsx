"use client";

import ProjectApiList from "@/app/api/ProjectApiList";
import axios from "axios";
import { Info, Search, MapPin } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { BiSolidPhoneCall } from "react-icons/bi";

export default function HeaderSection({
  resturantData,
  setSearchResturantNo,
  setSearchResturantName,
}: any) {
  const { api_getResturantData, api_getResturantGeneralSettings } =
    ProjectApiList();

  const [restaurantSettings, setRestaurantSettings] = useState<any>(null);

  const [searchResturantData, setSearchResturantData] = useState<any[]>([]);
  const [searchResturan, setSearchResturant] = useState<string>("");
  // const [searchResturanName, setSearchResturanName] = useState<string>("");
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch restaurants based on search
  useEffect(() => {
    const fetchRestaurantList = async () => {
      try {
        if (!searchResturan) {
          setSearchResturantData([]);
          setIsDropdownVisible(false);
          return;
        }
        const res = await axios.get(
          `${api_getResturantData}?search=${encodeURIComponent(searchResturan)}`
        );
        const fetched = res.data.data || [];
        setSearchResturantData(fetched);
        setIsDropdownVisible(true);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurantList();
  }, [searchResturan]);

  useEffect(() => {
    const fetchGeneralSettings = async () => {
      if (!resturantData?.restaurants_no) return;

      try {
        const res = await axios.get(
          `${api_getResturantGeneralSettings}/${resturantData.restaurants_no}`
        );
        const settings = res?.data?.data?.[0] || null;
        setRestaurantSettings(settings);
      } catch (error) {
        console.error("Error fetching restaurant general settings:", error);
      }
    };

    fetchGeneralSettings();
  }, [resturantData?.restaurants_no]);

  // Auto-close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="p-4">
      <div className="mx-4 flex flex-col lg:flex-row items-start gap-6 lg:gap-14">
        {/* Card Section */}
        <div className="bg-white shadow rounded-lg p-4 w-full lg:w-[40%] relative flex flex-col lg:flex-row justify-between items-start gap-4">
          {/* Left section */}
          <div className="flex-col w-full">
            <div>
              <div className="flex items-center">
                <Image
                  src="/elephant.png"
                  alt="Elfo Logo"
                  width={50}
                  height={50}
                />
                <h2 className="text-2xl font-bold text-black pl-2 pt-2 [font-family:'Barlow_Condensed',Helvetica]">
                  {resturantData?.name}
                </h2>
              </div>

              <div className="mt-2 pl-2">
                <div className="flex items-center text-sm text-gray-400 mt-1 gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{resturantData?.address}</span>
                </div>
              </div>
            </div>

            <button className="border border-orange-500 text-orange-600 text-sm font-medium rounded px-10 py-1 mt-3 w-fit mx-auto lg:mx-0">
              Open
            </button>
          </div>

          <div className="absolute bottom-4 right-4 flex items-center gap-5 lg:static lg:mt-4">
            <button className="text-gray-600 hover:text-gray-700">
              <BiSolidPhoneCall className="w-6 h-6" />
            </button>
            <button className="text-gray-600 hover:text-gray-700">
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search and Veg Section */}
        <div className="w-full">
          {restaurantSettings && (
            <div className="flex flex-wrap gap-2 text-sm text-gray-700 mt-2">
              {restaurantSettings.home_delivery && (
                <span className="px-3 py-1 border border-gray-300 rounded-md bg-white">
                  Home Delivery
                </span>
              )}
              {restaurantSettings.dine_in && (
                <span className="px-3 py-1 border border-gray-300 rounded-md bg-white">
                  Dine In
                </span>
              )}
              {restaurantSettings.take_away && (
                <span className="px-3 py-1 border border-gray-300 rounded-md bg-white">
                  Take Away
                </span>
              )}
              {restaurantSettings.subscription_based_order && (
                <span className="px-3 py-1 border border-gray-300 rounded-md bg-white">
                  Subscription
                </span>
              )}
              {restaurantSettings.cutlery && (
                <span className="px-3 py-1 border border-gray-300 rounded-md bg-white">
                  Cutlery
                </span>
              )}
              {restaurantSettings.instant_order && (
                <span className="px-3 py-1 border border-gray-300 rounded-md bg-white">
                  Instant Order
                </span>
              )}
              {restaurantSettings.extra_packaging_charge && (
                <span className="px-3 py-1 border border-gray-300 rounded-md bg-white">
                  Extra Packaging
                </span>
              )}
              {restaurantSettings.scheduled_delivery && (
                <span className="px-3 py-1 border border-gray-300 rounded-md bg-white">
                  Scheduled Delivery
                </span>
              )}
              {/* {restaurantSettings.veg && (
      <span className="px-3 py-1 border border-gray-300 rounded-md bg-white">
        Veg
      </span>
    )}
    {restaurantSettings.non_veg && (
      <span className="px-3 py-1 border border-gray-300 rounded-md bg-white">
        Non-Veg
      </span>
    )} */}
            </div>
          )}

          <div className="w-full flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mt-4 lg:mt-2 relative">
            {/* Search Box */}
            <div className="relative w-full" ref={dropdownRef}>
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-black w-4 h-4" />
              <input
                type="text"
                placeholder="Enter city or locality"
                className="w-full pl-3 pr-10 py-3 rounded-lg text-sm bg-gray-300 placeholder:text-gray-900 focus:outline-none"
                value={searchResturan}
                onChange={(e) => {
                  setSearchResturant(e.target.value);
                  setIsDropdownVisible(true);
                }}
              />

              {/* Dropdown */}
              {searchResturan &&
                isDropdownVisible &&
                searchResturantData.length > 0 && (
                  <div className="absolute z-100 mt-2 w-full bg-white shadow-lg rounded-md max-h-60 overflow-y-auto border border-gray-200">
                    {searchResturantData?.map((restaurant, index) => {
                      const isInactive =
                        restaurant?.isClosed || !restaurant?.is_active;

                      return (
                        <div
                          key={index}
                          className={`px-4 py-2 hover:bg-gray-100 ${
                            isInactive
                              ? "cursor-not-allowed opacity-60"
                              : "cursor-pointer"
                          }`}
                          onClick={() => {
                            if (isInactive) return;
                            setSearchResturant("");
                            setSearchResturantNo(restaurant.restaurants_no);
                            setSearchResturantName(restaurant.address);
                            setIsDropdownVisible(false);
                          }}
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-black font-medium">
                              {restaurant.name}
                            </p>
                            {isInactive ? (
                              <p className="text-sm text-red-500 font-semibold">
                                Closed
                              </p>
                            ) : (
                              <p className="text-sm text-green-500 font-medium">
                                Open
                              </p>
                            )}
                          </div>

                          <p className="text-sm text-gray-500">
                            {restaurant.address}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}
            </div>

            {/* Pure Veg Tag */}
            {restaurantSettings && (
              <>
                {restaurantSettings.veg && (
                  <div className="flex justify-center items-center gap-2 border border-green-700 px-3 py-3 rounded-md bg-white">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border border-green-700 rounded-sm flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-700 rounded-full" />
                      </div>
                    </div>
                    <h1 className="text-sm text-black font-medium"> Veg</h1>
                  </div>
                )}

                {restaurantSettings.non_veg && (
                  <div className="flex justify-center items-center gap-2 border border-red-700 px-3 py-3 rounded-md bg-white">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 border border-red-700 rounded-sm flex items-center justify-center">
                        <div className="w-3 h-3 bg-red-700 rounded-full" />
                      </div>
                    </div>
                    <h1 className="text-sm text-black font-medium">Non Veg</h1>
                  </div>
                )}
              </>
            )}

            {/* Render restaurant features */}
          </div>
        </div>
      </div>
    </div>
  );
}
