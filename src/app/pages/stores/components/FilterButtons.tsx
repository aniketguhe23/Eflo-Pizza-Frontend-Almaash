import { ChevronDown } from "lucide-react";

export default function FilterButtons({
  openNow,
  setOpenNow,
  setNewlyOpen,
  newlyOpen,
}: any) {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 relative z-[5000]">
      <div className="flex gap-4 justify-center flex-wrap">
        {/* Order Now Button - not toggling anything here for now */}
        {/* <button
          onClick={() => setOpenNow((prev: any) => !prev)}
          className="h-10 px-6 bg-white border border-gray-400 rounded-xl flex items-center gap-1 hover:bg-gray-100 cursor-pointer"
        >
          Order Now <ChevronDown className="w-4 h-4" />
        </button> */}

        {/* Open Now Button - toggle style based on `openNow` */}
        <button
          onClick={() => setOpenNow((prev: any) => !prev)}
          className={`h-10 px-6 rounded-xl cursor-pointer border ${
            openNow
              ? "bg-orange-500 text-white border-orange-500 hover:bg-orange-600"
              : "bg-white border-gray-400 hover:bg-gray-100 text-black"
          }`}
        >
          Open Now
        </button>

        {/* Newly Open - not active yet */}
        <button
          onClick={() => setNewlyOpen((prev: any) => !prev)}
          className={`h-10 px-6 rounded-xl cursor-pointer border ${
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
