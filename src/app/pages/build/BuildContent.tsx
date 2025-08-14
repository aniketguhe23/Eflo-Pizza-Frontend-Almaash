"use client";

import FoodDeliveryHero from "@/components/food-delivery";
import HeroSection from "./components/HeroSection";
import Footer from "@/components/footer";
import BuildPizza from "./components/BuildPizza";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ProjectApiList from "@/app/api/ProjectApiList";
import Loader from "@/components/loader/Loader";
import useHomeDataStore from "@/app/store/useBuildYourOwnStore";
import BackToTopButton from "@/components/backToTop/BackToTopButton";
import Header from "@/components/header";
import { useSearchParams } from "next/navigation";

export default function BuildContent() {
  const { api_getBuildYourOwn } = ProjectApiList();
  const searchParams = useSearchParams();

  const { loading, setData, setLoading } = useHomeDataStore();
  const [pizzaSize, setPizzaSize] = useState("Medium");

  const updatePizzaSize = (size: string) => {
    if (["Small", "Medium", "Large"].includes(size)) {
      setPizzaSize(size);
    }
  };

  const fetchHomeData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${api_getBuildYourOwn}?size=${pizzaSize}`
      );
      const parsePrice = (p: any) => {
        const n = Number(p);
        return isNaN(n) ? 0 : n;
      };
      const parseOption = (option: any) => ({
        ...option,
        price: parsePrice(option.price),
        light_price: parsePrice(option.light_price),
        regular_price: parsePrice(option.regular_price),
        extra_price: parsePrice(option.extra_price),
        id: option.id.toString(),
      });
      const parseCategory = (items: any[] = []) => items.map(parseOption);

      const parsedData = {
        sizes: parseCategory(response.data.data.sizes),
        doughTypes: parseCategory(response.data.data.doughTypes),
        crustTypes: parseCategory(response.data.data.crustTypes),
        sauces: parseCategory(response.data.data.sauces),
        cheeseOptions: parseCategory(response.data.data.cheeseOptions),
        toppings: parseCategory(response.data.data.toppings),
        extraSauces: parseCategory(response.data.data.extraSauces),
      };

      setData(parsedData);
    } catch (error) {
      console.error("Error fetching home data:", error);
    } finally {
      setLoading(false);
    }
  }, [api_getBuildYourOwn, pizzaSize, setData, setLoading]);

  useEffect(() => {
    fetchHomeData();
  }, [fetchHomeData]);

  useEffect(() => {
    if (searchParams.get("from") === "homepage") {
      window.scrollTo({ top: 450, behavior: "smooth" });
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-cover bg-center bg-no-repeat bg-white">
        <Header />
        <HeroSection />
        <BuildPizza pizzaSize={pizzaSize} setPizzaSize={updatePizzaSize} />
        <div className="relative z-10 -mb-35 px-40 pb-10 max-sm:hidden max-lg:hidden">
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
