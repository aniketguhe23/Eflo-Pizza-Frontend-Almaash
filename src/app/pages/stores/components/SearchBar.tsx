import { Search, MapPin } from "lucide-react";

type City = {
  id: string | number;
  name: string;
};

type SearchBarProps = {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  selectedCity: string;
  setSelectedCity: (value: string) => void;
  selectedLocality: string;
  setSelectedLocality: (value: string) => void;
  cities: City[];
  locality: any;
  setCitieId: any;
};

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  selectedLocality,
  setSelectedLocality,
  cities,
  locality,
  setCitieId,
}: SearchBarProps) {
  // console.log(cities)
  return (
    <div className="flex-1 pt-10 max-sm:pt-1 px-4 sm:px-0">
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 text-center lg:text-left">
        Find Elfo’s Pizza stores near you
      </h1>
      <p className="text-sm sm:text-base text-gray-600 mb-6 text-center lg:text-left">
        Pizza that finds your address faster than friends !!
      </p>

      <div className="flex flex-col lg:flex-row gap-4 lg:items-center items-stretch">
        {/* Left input + icon button group */}
        <div className="flex w-full lg:max-w-sm rounded-md overflow-hidden border border-gray-300 bg-gray-200">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
            <input
              type="text"
              placeholder="Enter city or locality"
              value={searchQuery || ""}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-full pl-10 pr-4 p-3 bg-gray-200 text-black focus:outline-none"
            />
          </div>
          <button
            className="bg-[#f47335] hover:bg-orange-600 text-white px-4 text-sm flex items-center justify-center"
            onClick={() => {
              setSearchQuery(" "), setSelectedLocality(""), setSelectedCity("");
            }}
          >
            Clear
          </button>
        </div>

        <span className="font-medium text-center lg:text-left">OR</span>

        {/* Right select group */}
        <div className="flex flex-col lg:flex-row gap-2 lg:gap-0 lg:h-12 border border-gray-400 rounded-xl overflow-hidden text-black text-sm w-full lg:w-auto">
          <select
            value={selectedCity || ""}
            onChange={(e) => {
              const selectedCityName = e.target.value;
              setSelectedCity(selectedCityName);

              const selectedCityObj = cities.find(
                (city) => city.name === selectedCityName
              );
              if (selectedCityObj) {
                setCitieId(selectedCityObj.id);
              }
            }}
            className="appearance-none w-full lg:w-48 px-4 py-2 lg:py-0 outline-none bg-white"
          >
            <option value="">Select City</option>
            {cities?.map((city: any) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>

          {/* Divider (hidden on tablet and below) */}
          <div className="hidden lg:block w-px bg-gray-400" />

          <select
            value={selectedLocality}
            onChange={(e) => setSelectedLocality(e.target.value)}
            className="appearance-none w-full lg:w-56 px-4 py-2 lg:py-0 outline-none bg-white"
          >
            <option value="">Select Locality</option>
            <option value="">All</option>
            {locality?.map((locality: any) => (
              <option key={locality.id} value={locality.name}>
                {locality.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
