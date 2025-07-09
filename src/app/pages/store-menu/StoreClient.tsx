"use client";

import React, { useEffect, useState } from "react";
import PizzaRestaurant from "../stores/components/pizza-restaurant";
import ProjectApiList from "@/app/api/ProjectApiList";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const StoreClient = () => {
  const { api_getResturantDataById } = ProjectApiList();
  const searchParams = useSearchParams();
  const location = searchParams.get("location");

  const [resturantData, setResturantData] = useState<any>();
  const [searchResturanNo, setSearchResturantNo] = useState<string>("");
  const [searchResturanName, setSearchResturantName] = useState<string>("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(
          `${api_getResturantDataById}/${searchResturanNo || location}`
        );
        setResturantData(res.data.data);
      } catch (error) {
        console.error("Error fetching restaurant data:", error);
      }
    };

    fetchUserProfile();
  }, [searchResturanNo, location]);

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
