"use client";
import Header from "./components/header";
import React, { useEffect, useState } from "react";
import HeroSection from "./components/hero-section";
import PizzaAboutSection from "./components/pizza-aboutsection";
import PizzaDeliverySection from "./components/PizzaDeliverySection";
import PizzaQualitySection from "./components/PizzaQualitySection";
import StoneBakedSection from "./components/StoneBakedSection";
import FoodDeliveryHero from "@/components/food-delivery";
import Footer from "@/components/footer";

const Page = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY === 0) {
        // At the top, always show header
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down beyond 100px, hide header
        setShowHeader(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up but NOT at top, keep header hidden
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
        className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
          showHeader ? "translate-y-0" : "-translate-y-full"
        }`}
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
      <div className="relative z-10 -mb-52 p-30">
        <FoodDeliveryHero />
      </div>
      <Footer />
    </div>
  );
};

export default Page;
