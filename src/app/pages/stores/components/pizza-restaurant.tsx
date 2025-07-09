"use client";

import HeaderSection from "./HeaderSection";
import ChooseFromMenu from "../../menu/components/choose-from-menu";
import MenuSearch from "../../menu/components/menu-search";
import { useState } from "react";

export default function PizzaRestaurant({
  resturantData,
  searchResturanNo,
  setSearchResturantNo,
  setSearchResturantName,
  searchResturanName,
}: any) {
  const [menuData, setMenuData] = useState<Record<string, any[]> | null>(null);


  return (
    <div className="min-h-screen bg-[#eeeeee] mt-20">
      <HeaderSection
        resturantData={resturantData}
        setSearchResturantNo={setSearchResturantNo}
        setSearchResturantName={setSearchResturantName}
      />
      <div className="bg-white">
        <MenuSearch menuData={menuData} />
        <ChooseFromMenu
          searchResturanNo={searchResturanNo}
          searchResturanName={searchResturanName}
          setMenuData={setMenuData}
          menuData={menuData}
        />
      </div>
    </div>
  );
}
