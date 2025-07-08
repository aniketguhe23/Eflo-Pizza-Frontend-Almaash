"use client";

import React, { Suspense, useEffect, useState } from "react";
import Header from "../stores/components/header";
import Footer from "@/components/footer";
import PizzaRestaurant from "../stores/components/pizza-restaurant";
import ProjectApiList from "@/app/api/ProjectApiList";
import axios from "axios";
import { useSearchParams } from "next/navigation";

const Stores = () => {
  const { api_getResturantDataById } = ProjectApiList();
  const searchParams = useSearchParams();
  const location = searchParams.get("location");

  const [resturantData, setResturantData] = useState();
  const [searchResturanNo, setSearchResturantNo] = useState<string>("");
  const [searchResturanName, setSearchResturantName] = useState<string>("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get(`${api_getResturantDataById}/${searchResturanNo ? searchResturanNo :location}`);
        setResturantData(res.data.data);
        // console.log("User Data:", res.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [searchResturanNo]);


  return (
    <div className="bg-[#f47335]">
      <Header />

      <Suspense
        fallback={
          <div className="text-center text-white p-8">
            Loading nearby restaurants...
          </div>
        }
      >
        <PizzaRestaurant
          resturantData={resturantData}
          setSearchResturantNo={setSearchResturantNo}
          setSearchResturantName={setSearchResturantName}
          searchResturanName={searchResturanName}
          searchResturanNo={searchResturanNo}
        />
      </Suspense>

      <Footer />
    </div>
  );
};

export default Stores;
