"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import Header from "./components/header";
import Footer from "@/components/footer";
import FindStorePage from "./components/FindStorePage";
import HeaderStoreListing from "./components/HeaderStoreListing";
import ProjectApiList from "@/app/api/ProjectApiList";


const Stores = () => {
  const { api_getResturantData, api_getCities } = ProjectApiList();

  const [resturantData, setResturantData] = useState<any[]>([]);
  const [searchResturan, setSearchResturant] = useState<string>("");
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    const fetchRestaurantList = async () => {
      try {
        const res = await axios.get(
          `${api_getResturantData}?search=${encodeURIComponent(
            searchResturan || searchResturan
          )}`
        );
        const fetched = res.data.data || [];
        setResturantData(fetched);
        // console.log("Fetched Restaurants:", fetched);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };

    fetchRestaurantList();
  }, [searchResturan]);

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

      <FindStorePage resturantData={resturantData} />

      <Footer />
    </div>
  );
};

export default Stores;
