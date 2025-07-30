import { ChevronDown } from "lucide-react";

export default function FilterButtons({
  openNow,
  setOpenNow,
  setNewlyOpen,
  newlyOpen,
}: any) {
  return (
    <div className="max-w-6xl  mx-auto px-4 max-sm:px-0 py-12 relative z-[5000] max-sm:z-[0] max-sm:mt-8">
      {/* Flex column on small screens, row on md+ screens */}
      <div className="flex sm:justify-center  gap-4 items-center">
        {/* Open Now Button */}
        <button
          onClick={() => setOpenNow((prev: any) => !prev)}
          className={`max-sm:w-full   h-10 max-sm:h-12 px-6 max-sm:px-16 rounded-xl cursor-pointer border transition ${
            openNow
              ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
              : "bg-white border-gray-400 hover:bg-gray-100 text-black"
          }`}
        >
          Open Now
        </button>

        {/* Newly Open Button */}
        <button
          onClick={() => setNewlyOpen((prev: any) => !prev)}
          className={`max-sm:w-full  h-10 max-sm:h-12 px-6 max-sm:px-16 rounded-xl cursor-pointer border transition ${
            newlyOpen
              ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
              : "bg-white border-gray-400 hover:bg-gray-100 text-black"
          }`}
        >
          Newly Open
        </button>
      </div>
    </div>
  );
}
