"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectApiList from "@/app/api/ProjectApiList";

interface City {
  id: number;
  name: string;
}

interface CitySelectModalProps {
  onClose: () => void;
  onCitySelect: (city: string) => void;
}

export default function CitySelectModal({
  onClose,
  onCitySelect,
}: CitySelectModalProps) {
  const { api_getCities } = ProjectApiList();

  const [selected, setSelected] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedCity = localStorage.getItem("selectedCity");
    if (savedCity) {
      setSelected(savedCity);
    }

    const fetchCities = async () => {
      try {
        const res = await axios.get(api_getCities);
        setCities(res.data);
      } catch (err) {
        console.error("Error fetching cities:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleSave = () => {
    if (selected) {
      localStorage.setItem("selectedCity", selected);
      onCitySelect(selected);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[500] [font-family:'Barlow_Condensed',Helvetica]">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md">
        <h2 className="text-lg font-bold mb-4">Select Your City</h2>

        {loading ? (
          <p className="text-sm text-gray-600">Loading cities...</p>
        ) : (
          <select
            className="w-full border p-2 rounded mb-4"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">-- Select City --</option>
            {cities.map((city) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        )}

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-[#f47335] text-white rounded disabled:opacity-50 cursor-pointer"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
