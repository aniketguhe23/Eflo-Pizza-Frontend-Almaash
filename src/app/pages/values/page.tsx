"use client";

import React, { useEffect, useState } from "react";
import HeroSection from "./components/hero-section";
import PizzaAboutSection from "./components/pizza-aboutsection";
import PizzaDeliverySection from "./components/PizzaDeliverySection";
import PizzaQualitySection from "./components/PizzaQualitySection";
import StoneBakedSection from "./components/StoneBakedSection";
import FoodDeliveryHero from "@/components/food-delivery";
import Footer from "@/components/footer";
import Header from "../menu/components/header";
import ProjectApiList from "@/app/api/ProjectApiList";
import axios from "axios";
import { useValuesStore } from "@/app/store/useValuesStore";
import Loader from "@/components/loader/Loader";

const Page = () => {
  const { api_getValueData } = ProjectApiList();

  const { valueData, loading, setValueData, setLoading } = useValuesStore();

  // const [showHeader, setShowHeader] = useState(true);
  // const [lastScrollY, setLastScrollY] = useState(0);


  useEffect(() => {
    const fetchValueData = async () => {
      try {
        const response = await axios.get(api_getValueData);
        setValueData(response?.data?.data[0]);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (!valueData) {
      fetchValueData();
    } else {
      setLoading(false);
    }
  }, [valueData, api_getValueData, setValueData, setLoading]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const currentScrollY = window.scrollY;

  //     if (currentScrollY === 0) {
  //       setShowHeader(true);
  //     } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
  //       setShowHeader(false);
  //     } else if (currentScrollY < lastScrollY) {
  //       setShowHeader(false);
  //     }

  //     setLastScrollY(currentScrollY);
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [lastScrollY]);

  if (loading)
    return (
      <div className="fixed inset-0 z-50 h-full w-full flex items-center justify-center bg-white">
        <Loader />
      </div>
    );

  return (
    <div>
      <div
        // className={`fixed top-0 w-full z-500 transition-transform duration-300 bg-black
        //   //  ${showHeader ? "translate-y-0" : "bg-black"}
        //   `}
      >
        <Header />
      </div>

      <div className="pt-20 relative z-10 -mt-20">
        <HeroSection />
      </div>
      <PizzaAboutSection />
      <PizzaQualitySection />
      <PizzaDeliverySection />
      <StoneBakedSection />
     <div className="relative z-10 -mb-35 px-40 pb-10 pt-10">
        <FoodDeliveryHero />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
