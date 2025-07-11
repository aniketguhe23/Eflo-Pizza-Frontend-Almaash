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
};

export default function SearchBar({
  searchQuery,
  setSearchQuery,
  selectedCity,
  setSelectedCity,
  selectedLocality,
  setSelectedLocality,
  cities,
}: SearchBarProps) {
  // console.log(cities)
  return (
    <div className="flex-1 pt-10">
      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
        Find Elfo’s Pizza stores near you
      </h1>
      <p className="text-gray-600 mb-6">
        Pizza that finds your address faster than friends !!
      </p>

      <div className="flex flex-col sm:flex-row gap-4 items-center">
        {/* Left input + icon button group */}
        <div className="flex h-12 w-full max-w-sm rounded-md overflow-hidden border border-gray-300 bg-gray-200">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-black w-5 h-5" />
            <input
              type="text"
              placeholder="Enter city or locality"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-full pl-10 pr-4 bg-gray-200 text-black focus:outline-none"
            />
          </div>
          <button
            className="bg-[#f47335] hover:bg-orange-600 text-white px-4 flex items-center justify-center cursor-pointer"
            onClick={() => setSearchQuery(" ")}
          >
            {/* <MapPin className="w-5 h-5" /> */}Clear
          </button>
        </div>

        <span className=" font-medium">OR</span>

        {/* Right select group */}
        <div className="flex h-12 border border-gray-400 rounded-xl overflow-hidden text-black text-base">
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="appearance-none w-48 text-left px-4 outline-none bg-white"
          >
            <option value="">Select City</option>
            {cities?.map((city: any) => (
              <option key={city.id} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>

          {/* Divider */}
          <div className="w-px bg-gray-400" />

          <select
            value={selectedLocality}
            onChange={(e) => setSelectedLocality(e.target.value)}
            className="appearance-none w-56 text-center px-4 outline-none bg-white"
          >
            <option value="">Select Locality</option>
            {/* <option value="vijay-nagar">Vijay Nagar</option>
            <option value="golden-city">Golden City</option>
            <option value="civil-line">Civil Line</option>
            <option value="freeganj">Freeganj</option> */}
          </select>
        </div>
      </div>
    </div>
  );
}
