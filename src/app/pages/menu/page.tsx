"use client";
import Header from "./components/header";
import React, { useEffect, useState } from "react";
import HeroSection from "./components/hero-section";
import FoodDeliveryHero from "@/components/food-delivery";
import Footer from "@/components/footer";
import ChooseFromMenu from "./components/choose-from-menu";
import MenuSearch from "./components/menu-search";

const Page = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY) {
        setShowHeader(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div>
      <div
        className={`fixed top-0 w-full z-500 transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "bg-black"
        }`}
      >
        <Header />
      </div>

      <div className="pt-20 relative z-10 -mt-20">
        <HeroSection />
      </div>

      <MenuSearch />
      <ChooseFromMenu />

      <div className="relative z-10 -mb-52 p-30">
        <FoodDeliveryHero />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
