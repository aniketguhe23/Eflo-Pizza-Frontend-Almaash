"use client";

import Header from "./components/header";
import React, { useEffect, useState, Suspense } from "react";
import HeroSection from "./components/hero-section";
import FoodDeliveryHero from "@/components/food-delivery";
import Footer from "@/components/footer";
import ChooseFromMenu from "./components/choose-from-menu";
import MenuSearch from "./components/menu-search";
import BackToTopButton from "@/components/backToTop/BackToTopButton";
import Loader from "@/components/loader/Loader";
import { useSearchParams } from "next/navigation";

// Child component that uses useSearchParams
function MenuPageContent({
  menuData,
  setMenuData,
}: {
  menuData: Record<string, any[]> | null;
  setMenuData: React.Dispatch<
    React.SetStateAction<Record<string, any[]> | null>
  >;
}) {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (searchParams.get("from") === "homepage") {
      window.scrollTo({
        top: 500,
        behavior: "smooth",
      });
    }
  }, [searchParams]);

  return (
    <>
      <MenuSearch menuData={menuData} />
      <ChooseFromMenu menuData={menuData} setMenuData={setMenuData} />
    </>
  );
}

const Page = () => {
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuData, setMenuData] = useState<Record<string, any[]> | null>(null);

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
      <Header />

      <div className="pt-20 relative z-10 -mt-20">
        <HeroSection />
      </div>

      {/* Wrap useSearchParams inside Suspense */}
      <Suspense fallback={<Loader />}>
        <MenuPageContent menuData={menuData} setMenuData={setMenuData} />
      </Suspense>

      <div className="relative z-10 -mb-35 px-40 pb-10 max-sm:hidden max-lg:hidden">
        <FoodDeliveryHero />
      </div>

      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Page;
