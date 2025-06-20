"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import AppDownloadCard from "./AppDownloadCard";


export default function HeaderStoreListing() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedLocality, setSelectedLocality] = useState("");

  return (
    <div className=" px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex gap-6">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
              selectedLocality={selectedLocality}
              setSelectedLocality={setSelectedLocality}
            />
            <AppDownloadCard />
          </div>
        </div>
      </div>
    </div>
  );
}
