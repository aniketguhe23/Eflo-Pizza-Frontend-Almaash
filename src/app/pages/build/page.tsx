"use client";

import FoodDeliveryHero from "@/components/food-delivery";
import Header from "./components/header";
import HeroSection from "./components/HeroSection";
import Footer from "@/components/footer";
import BuildPizza from "./components/BuildPizza";

export default function Home() {
  return (
    <main className="min-h-screen bg-cover bg-center bg-no-repeat bg-white">
      <Header />
      <HeroSection />
      <BuildPizza />
      <div className="relative z-10 -mb-52 p-40">
        <FoodDeliveryHero />
      </div>
      <Footer />
    </main>
  );
}
