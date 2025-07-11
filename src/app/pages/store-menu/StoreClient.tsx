"use client";

import React, { useEffect, useState } from "react";
import PizzaRestaurant from "../stores/components/pizza-restaurant";
import ProjectApiList from "@/app/api/ProjectApiList";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import useCartStore from "@/app/store/useCartStore"; // ← import Zustand store

const StoreClient = () => {
  const { api_getResturantDataById } = ProjectApiList();
  const searchParams = useSearchParams();
  const location = searchParams.get("location");

  const [resturantData, setResturantData] = useState<any>();
  const [searchResturanNo, setSearchResturantNo] = useState<string>("");
  const [searchResturanName, setSearchResturantName] = useState<string>("");

  const setRestaurantNo = useCartStore((state) => state.setRestaurantNo);
  const setRestaurantAddress = useCartStore(
    (state) => state.setRestaurantAddress
  );

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const res = await axios.get(
  //         `${api_getResturantDataById}/${searchResturanNo || location}`
  //       );

  //       const data = res.data.data;

  //       setResturantData(data);

  //       if (!searchResturanNo && location) {
  //         setRestaurantNo(data.restaurants_no);
  //         setRestaurantAddress(data.address);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching restaurant data:", error);
  //     }
  //   };

  //   fetchUserProfile();
  // }, [searchResturanNo, location]);

  useEffect(() => {
  const fetchUserProfile = async () => {
    try {
      const restaurantId = searchResturanNo || location;

      // 🛑 If no ID from either place, stop here
      if (!restaurantId) return;

      // ✅ Fetch the restaurant data
      const res = await axios.get(`${api_getResturantDataById}/${restaurantId}`);
      const data = res.data.data;

      // ✅ Set local state (needed for UI)
      setResturantData(data);
      setSearchResturantNo(data.restaurants_no);
      setSearchResturantName(data.address);

      // ✅ Set global Zustand state (needed for cart/order)
      setRestaurantNo(data.restaurants_no);
      setRestaurantAddress(data.address);
    } catch (error) {
      console.error("Error fetching restaurant data:", error);
    }
  };

  fetchUserProfile();
}, [searchResturanNo, location]);

useEffect(() => {
  console.log("Global restaurant:", searchResturanNo, searchResturanName);
}, [searchResturanNo, searchResturanName]);



  return (
    <PizzaRestaurant
      resturantData={resturantData}
      setSearchResturantNo={setSearchResturantNo}
      setSearchResturantName={setSearchResturantName}
      searchResturanName={searchResturanName}
      searchResturanNo={searchResturanNo}
    />
  );
};

export default StoreClient;
