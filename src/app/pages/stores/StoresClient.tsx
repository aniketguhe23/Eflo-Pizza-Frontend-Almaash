// 🔁 src/app/pages/stores/StoresClient.tsx
"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Header from "./components/header";
import Footer from "@/components/footer";
import FindStorePage from "./components/FindStorePage";
import HeaderStoreListing from "./components/HeaderStoreListing";
import ProjectApiList from "@/app/api/ProjectApiList";
import axios from "axios";

const StoresClient = () => {
  const { api_getResturantData, api_getCities, api_getLocality } = ProjectApiList();
  const searchParams = useSearchParams();
  const city = searchParams.get("city");

  const [resturantData, setResturantData] = useState<any[]>([]);
  const [searchResturan, setSearchResturant] = useState<string | null>(null);
  const [cities, setCities] = useState<any[]>([]);
  const [citieId, setCitieId] = useState<any>("");
  const [locality, setLocality] = useState<any[]>([]);
  const [openNow, setOpenNow] = useState<boolean | undefined>(undefined);
  const [newlyOpen, setNewlyOpen] = useState(false);
  const [selectedLocality, setSelectedLocality] = useState(" ");

  useEffect(() => {
    if (city && !searchResturan) {
      setSearchResturant(city);
    }
  }, [city]);

  useEffect(() => {
    const fetchRestaurantList = async () => {
      try {
        let url = `${api_getResturantData}?`;

        if (!searchResturan && city) {
          url += `city=${city}&`;
        } else if (searchResturan || selectedLocality) {
          url += `address=${encodeURIComponent(searchResturan || selectedLocality)}&`;
        }

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
  }, [searchResturan, openNow, newlyOpen, selectedLocality]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const res = await axios.get(api_getCities);
        const data = res.data?.data || res.data || [];
        setCities(data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    if (!citieId) return;

    const fetchLocality = async () => {
      try {
        const res = await axios.get(`${api_getLocality}/${citieId}`);
        const data = res.data?.data || res.data || [];
        setLocality(data);
      } catch (error) {
        console.error("Error fetching localities:", error);
      }
    };

    fetchLocality();
  }, [citieId]);

  return (
    <div className="bg-[#f47335]">
      <Header />

      <div className="relative z-10 -mb-85 p-40">
        <HeaderStoreListing
          setSearchResturant={setSearchResturant}
          searchResturan={searchResturan}
          resturantData={resturantData}
          setCitieId={setCitieId}
          setSelectedLocality={setSelectedLocality}
          selectedLocality={selectedLocality}
          cities={cities}
          locality={locality}
        />
      </div>

      <FindStorePage
        resturantData={resturantData}
        setOpenNow={setOpenNow}
        openNow={openNow}
        setNewlyOpen={setNewlyOpen}
        newlyOpen={newlyOpen}
      />

      <Footer />
    </div>
  );
};

export default StoresClient;
