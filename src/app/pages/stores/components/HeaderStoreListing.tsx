"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import AppDownloadCard from "./AppDownloadCard";


export default function HeaderStoreListing({setSearchResturant,searchResturan,cities}:any) {
  // const [searchQuery, setSearchQuery] = useState("");
  // const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocality, setSelectedLocality] = useState("");

  return (
    <div className=" px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex gap-6">
            <SearchBar
              searchQuery={searchResturan}
              setSearchQuery={setSearchResturant}
              selectedCity={searchResturan}
              setSelectedCity={setSearchResturant}
              selectedLocality={selectedLocality}
              setSelectedLocality={setSelectedLocality}
              cities={cities}

            />
            <AppDownloadCard />
          </div>
        </div>
      </div>
    </div>
  );
}
