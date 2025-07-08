"use client";

import { useEffect, useState } from "react";
import { LocateFixed, Search, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RxCross1 } from "react-icons/rx";
import ProjectApiList from "@/app/api/ProjectApiList";
import axios from "axios";

export default function DineInModal({ onClose }: { onClose: () => void }) {
  const [isOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState<any[]>([]);

  const { api_getCities } = ProjectApiList();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        if (searchTerm.trim()) {
          const res = await axios.get(
            `${api_getCities}?name=${encodeURIComponent(searchTerm)}`
          );
          const data = res.data?.data || res.data || [];
          setCities(data);
        } else {
          setCities([]);
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, [searchTerm]);

  return (
    <div className="p-4">
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-500">
          <div className="bg-[#ffd7c0] w-[400px] h-[600px] p-6 shadow-lg rounded relative flex flex-col">
            {/* Close Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={onClose}
                className="text-orange-600 hover:text-orange-800 text-xl font-bold cursor-pointer"
              >
                <RxCross1 className="hover:text-red-600" />
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center space-y-6 pb-24">
              {/* Pickup Button */}
              <button className="w-full flex items-center justify-center gap-2 bg-white text-orange-600 border-2 border-[#f47335] rounded-xl py-1 px-4 hover:bg-orange-50 font-medium text-xl">
                <Truck className="w-8 h-8 text-[#f47335]" />
                Pickup/Dine in
              </button>

              {/* Search Input */}
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Enter City"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white shadow-md rounded-xl py-2 px-4 pr-10 text-gray-700 placeholder:text-gray-500 focus:outline-none"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-orange-500" />
              </div>

              {/* Matched Cities from API */}
              {searchTerm && (
                <>
                  {cities.length > 0 ? (
                    <div className="w-full space-y-2 max-h-[26%] overflow-y-auto">
                      {cities.map((city: any) => (
                        <Link
                          key={city.id}
                          href={{
                            pathname: "/pages/stores",
                            query: { city: city.name },
                          }}
                          className="block w-full text-left px-4 py-2 bg-white text-gray-800 hover:bg-[#f47335] hover:text-white rounded-lg text-base"
                        >
                          {city.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-gray-500 text-sm">
                      No matching city found.
                    </p>
                  )}
                </>
              )}

              {/* Mascot and Info (only if nothing is typed) */}
              {!searchTerm && (
                <>
                  <div className="w-40 h-40 flex items-center justify-center">
                    <Image
                      src="/elephant.png"
                      alt="Elfo's Pizza Logo"
                      width={160}
                      height={160}
                    />
                  </div>
                  <p className="text-center text-gray-800 text-lg font-medium px-4">
                    Find a Elfo&apos;s to order online, see a menu, and get info
                  </p>
                </>
              )}
            </div>

            {/* Nearby Button Fixed at Bottom */}
            <div className="absolute bottom-4 left-6 right-6">
              <button className="w-full flex items-center justify-between gap-2 bg-[#ffd7c0] border border-orange-600 text-orange-600 rounded-xl py-3 px-4 font-bold text-lg">
                NEARBY
                <LocateFixed />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
