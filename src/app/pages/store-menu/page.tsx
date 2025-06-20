import React, { Suspense } from "react";
import Header from "../stores/components/header";
import Footer from "@/components/footer";
import PizzaRestaurant from "../stores/components/pizza-restaurant";

const Stores = () => {
  return (
    <div className="bg-[#f47335]">
      <Header />

      <Suspense fallback={<div className="text-center text-white p-8">Loading nearby restaurants...</div>}>
        <PizzaRestaurant />
      </Suspense>

      <Footer />
    </div>
  );
};

export default Stores;
