"use client";

import React from "react";
import FilterButtons from "./FilterButtons";
import StoreCard from "./StoreCard";

// types.ts
export interface Store {
  id: number;
  name: string;
  location: string;
  hours: string;
  image?: string;
  restaurants_no?: string;
  isClosed: boolean;
}

interface RawRestaurant {
  id: number;
  name: string;
  address: string;
  opening_time: string;
  closing_time: string;
  logo?: string;
  restaurants_no?: string;
  isClosed: boolean;
}

interface FindStorePageProps {
  resturantData: RawRestaurant[] | RawRestaurant | null | undefined;
  setOpenNow: any;
  openNow: any;
  setNewlyOpen:any,
  newlyOpen:any,
}

export default function FindStorePage({
  resturantData,
  setOpenNow,
  openNow,
  setNewlyOpen,
  newlyOpen,
}: FindStorePageProps) {
  let restaurantsArray: Store[] = [];

  // console.log(resturantData)

  if (Array.isArray(resturantData)) {
    restaurantsArray = resturantData
      .filter((store) => store && store.id && store.name) // Defensive check
      .map((store) => ({
        id: store.id,
        name: store.name,
        location: store.address,
        hours: `${store.opening_time} AM to ${store.closing_time} PM`,
        image: store.logo,
        restaurants_no: store.restaurants_no,
        isClosed: store.isClosed ?? true,
      }));
  } else if (resturantData && resturantData.id) {
    restaurantsArray = [
      {
        id: resturantData.id,
        name: resturantData.name,
        location: resturantData.address,
        hours: `${resturantData.opening_time} AM to ${resturantData.closing_time} PM`,
        image: resturantData.logo,
        restaurants_no: resturantData.restaurants_no,
        isClosed: resturantData.isClosed ?? true,
      },
    ];
  }

  return (
    <div className="min-h-screen bg-gray-100 pt-35">
      <div className="mx-auto pb-8 bg-white px-55 pt-5 relative z-10">
        <FilterButtons
          setOpenNow={setOpenNow}
          openNow={openNow}
          setNewlyOpen={setNewlyOpen}
          newlyOpen={newlyOpen}
        />
        <h2 className="text-2xl text-gray-900 mb-6">
          Available for Dine-In Order
        </h2>

        {restaurantsArray.length === 0 ? (
          <div className="flex  min-h-[300px]">
            <p className="text-gray-600 text-lg font-medium">
              No restaurants found with this search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {restaurantsArray?.map((store) => (
              <StoreCard key={store.id} store={store} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
