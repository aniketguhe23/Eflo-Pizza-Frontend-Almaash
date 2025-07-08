"use client";

import FoodDeliveryHero from "@/components/food-delivery";
// import Header from "./components/header";
import HeroSection from "./components/HeroSection";
import Footer from "@/components/footer";
import BuildPizza from "./components/BuildPizza";
import { useCallback, useEffect } from "react";
import axios from "axios";
import ProjectApiList from "@/app/api/ProjectApiList";
import Loader from "@/components/loader/Loader";
import useHomeDataStore from "@/app/store/useBuildYourOwnStore";
import BackToTopButton from "@/components/backToTop/BackToTopButton";
import Header from "@/components/header";

export default function Home() {
  const { api_getBuildYourOwn } = ProjectApiList();

  const { loading, setData, setLoading } = useHomeDataStore();

  const fetchHomeData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(api_getBuildYourOwn);
      setData(response?.data?.data);
    } catch (error) {
      console.error("Error fetching home data:", error);
    } finally {
      setLoading(false);
    }
  }, [api_getBuildYourOwn, setData, setLoading]);

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  if (loading)
    return (
      <div className="fixed inset-0 z-50 h-full w-full flex items-center justify-center bg-white">
        <Loader />
      </div>
    );

  return (
    <>
      <main className="min-h-screen bg-cover bg-center bg-no-repeat bg-white">
        <Header />
        <HeroSection />
        <BuildPizza />
        <div className="relative z-10 -mb-35 px-40 pb-10">
          <FoodDeliveryHero />
        </div>
        <Footer />
      </main>
      <div className="relative z-10">
        <BackToTopButton />
      </div>
    </>
  );
}
