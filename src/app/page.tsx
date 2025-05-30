"use client";

import { useEffect } from "react";
import axios from "axios";
import Header from "@/components/header";
import HeroSection from "@/components/hero-section";
import SpecialtiesSection from "@/components/specialties-section";
import FeaturedSlider from "@/components/featured-slider";
import WhyAtElfos from "@/components/why-ate-elfos";
import Footer from "@/components/footer";
import FoodDeliveryHero from "@/components/food-delivery";
import ProjectApiList from "./api/ProjectApiList";
import { useHomeStore } from "./store/homeStore";
import Loader from "@/components/loader/Loader";
import JoinRewardFree from "@/components/join-reward-free";

export default function Home() {
  const { api_getHomeData, api_getHomeMenuItems } = ProjectApiList();

  const { data, loading, setData, setLoading, setMenuItems } = useHomeStore();

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get(api_getHomeData);
        setData(response?.data?.data[0]);
      } catch (error) {
        console.error("Error fetching home data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchMenuItems = async () => {
      try {
        const response = await axios.get(api_getHomeMenuItems);
        setMenuItems(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    if (!data) {
      fetchHomeData();
    } else {
      setLoading(false);
    }

    fetchMenuItems();
  }, [
    data,
    api_getHomeData,
    api_getHomeMenuItems,
    setData,
    setMenuItems,
    setLoading,
  ]);

  if (loading)
    return (
      <div className="fixed inset-0 z-50 h-full w-full flex items-center justify-center bg-white">
        <Loader />
      </div>
    );

  return (
    <main
      className="min-h-screen bg-cover bg-center bg-no-repeat bg-white"
      // style={{
      //   backgroundImage: "url('/elephantPointers.png')",
      // }}
    >
      <Header />
      <HeroSection />
      <JoinRewardFree />
      <SpecialtiesSection />
      <FeaturedSlider />
      <WhyAtElfos />
      <div className="relative z-10 -mb-55 p-40">
        <FoodDeliveryHero />
      </div>
      <Footer />
    </main>
  );
}
