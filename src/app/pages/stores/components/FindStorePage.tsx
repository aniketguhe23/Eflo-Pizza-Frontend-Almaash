"use client";

import FilterButtons from "./FilterButtons";
import StoreCard from "./StoreCard";


const stores = [
  { id: 1, location: "VIJAY NAGAR / PALASIA MAIN ROADS, INDORE (M.P.)", hours: "10:00 AM to 1:00 AM" },
  { id: 2, location: "Golden City, Misrod, BHOPAL (M.P.)", hours: "10:00 AM to 1:00 AM" },
  { id: 3, location: "CIVIL LINE, DEWAS (M.P.)", hours: "10:00 AM to 1:00 AM" },
  { id: 4, location: "FREEGANJ AREA, UJJAIN (M.P.)", hours: "10:00 AM to 1:00 AM" },
];

export default function FindStorePage() {
  return (
    <div className="min-h-screen bg-gray-100 pt-35">
      {/* <HeaderStoreListing /> */}
      <FilterButtons />
      <div className=" mx-auto pb-8 bg-white px-55 pt-5">
        <h2 className="text-2xl text-gray-900 mb-6 ">
          Available for Dine-In Order
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </div>
    </div>
  );
}
