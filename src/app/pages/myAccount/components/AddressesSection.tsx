"use client";

export default function AddressesSection() {
  const addresses = [
    {
      label: "HOME",
      address: `House 43, Phase 1, Golden City,\nMisroad Bhopal, Madhya Pradesh\n462047, INDIA (13)`,
    },
    {
      label: "FLAT",
      address: `Rtviz utopia, Kolivery Village, Mahatma\nPhule Nagar , Kalina, Santacruz East,\nMumbai, Maharashtra , India\n(pool B-703)`,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-3xl font-bold mb-4">MANAGE ADDRESSES</h3>
      {addresses.map((addr, index) => (
        <div key={index} className="border border-[#ED722E] shadow-sm bg-white p-4 pl-10">
          <h4 className="text-lg font-bold mb-2">{addr.label}</h4>
          <p className="text-base text-gray-600 mb-4 whitespace-pre-line">
            {addr.address}
          </p>
          <div className="flex gap-2">
            <button className="border  border-[#ED722E] cursor-pointer text-orange-500 font-semibold px-4 py-2 rounded hover:bg-orange-50">
              EDIT
            </button>
            <button className="border  border-[#ED722E] cursor-pointer text-orange-500 font-semibold px-4 py-2 rounded hover:bg-orange-50">
              DELETE
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
