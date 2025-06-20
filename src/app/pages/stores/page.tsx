import React from "react";
import Header from "./components/header";
import Footer from "@/components/footer";
// import PizzaResturants from "./components/pizza-restaurant";
import FindStorePage from "./components/FindStorePage";
import HeaderStoreListing from "./components/HeaderStoreListing";

const stores = () => {
  return (
    <div className="bg-[#f47335]">
      <Header />
      {/* <PizzaResturants/> */}
      <div className="relative z-10 -mb-85 p-40  ">
        <HeaderStoreListing />
      </div>
      <FindStorePage />

      <Footer />
    </div>
  );
};

export default stores;
