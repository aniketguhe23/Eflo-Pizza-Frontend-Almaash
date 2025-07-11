"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/header";
import Footer from "@/components/footer";
import FindStorePage from "./components/FindStorePage";
import HeaderStoreListing from "./components/HeaderStoreListing";
import ProjectApiList from "@/app/api/ProjectApiList";
import { useSearchParams } from "next/navigation";

const Stores = () => {
  const { api_getResturantData, api_getCities } = ProjectApiList();
  const searchParams = useSearchParams();
  const city = searchParams.get("city");

  const [resturantData, setResturantData] = useState<any[]>([]);
  const [searchResturan, setSearchResturant] = useState<string | null>(city);
  const [cities, setCities] = useState<any[]>([]);
  const [openNow, setOpenNow] = useState<boolean | undefined>(undefined);
  const [newlyOpen, setNewlyOpen] = useState(false);

  useEffect(() => {
    const fetchRestaurantList = async () => {
      try {
        // Build dynamic query
        let url = `${api_getResturantData}?`;

        if (!searchResturan && city) {
          // If city is from URL and no user search yet
          url += `city=${city}&`;
        } else if (searchResturan) {
          // If user searched something, only send address
          url += `address=${encodeURIComponent(searchResturan)}&`;
        }

        // ✅ Add openNow=true if you want to filter only open stores
        // ✅ Append query params
        if (openNow) url += `openNow=true&`;
        if (newlyOpen) url += `newlyOpen=true&`;

        const res = await axios.get(url);
        const fetched = res.data.data || [];
        setResturantData(fetched);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurantList();
  }, [searchResturan, openNow, newlyOpen]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get(api_getCities); // ✅ no query param
        const data = res.data?.data || res.data || [];
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []); // ✅ empty deps = only run once

  return (
    <div className="bg-[#f47335]">
      <Header />

      <div className="relative z-10 -mb-85 p-40">
        <HeaderStoreListing
          setSearchResturant={setSearchResturant}
          searchResturan={searchResturan}
          resturantData={resturantData}
          cities={cities}
        />
      </div>
      <div className="">
        <FindStorePage
          resturantData={resturantData}
          setOpenNow={setOpenNow}
          openNow={openNow}
          setNewlyOpen={setNewlyOpen}
          newlyOpen={newlyOpen}
        />
      </div>

      <Footer />
    </div>
  );
};

export default Stores;
