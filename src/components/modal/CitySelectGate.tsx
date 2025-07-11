"use client";

import { useEffect, useState } from "react";
import CitySelectModal from "./CitySelectModal";

interface Props {
  children: React.ReactNode;
}

export default function CitySelectGate({ children }: Props) {
  const [showCityModal, setShowCityModal] = useState(false);

  useEffect(() => {
    const city = localStorage.getItem("selectedCity");
    if (!city) {
      setShowCityModal(true); // Show modal only on first visit
    }
  }, []);

  const handleCitySelect = (city: string) => {
    localStorage.setItem("selectedCity", city);
    location.reload(); // Optional: reload to fetch city-based data
    setShowCityModal(false);
  };

  return (
    <>
      {showCityModal && (
        <CitySelectModal
          onClose={() => setShowCityModal(false)} // Allow closing without selection
          onCitySelect={handleCitySelect}
        />
      )}
      {children}
    </>
  );
}
