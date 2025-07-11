"use client";

export default function LocationLoader() {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[500] [font-family:'Barlow_Condensed',Helvetica]">
      <div className="bg-white rounded-lg shadow-xl p-6 w-[90%] max-w-md text-center">
        <h2 className="text-lg font-bold text-[#f47335]">Setting up your location...</h2>
        <p className="text-sm text-gray-600 mt-2">Please wait</p>
      </div>
    </div>
  );
}
