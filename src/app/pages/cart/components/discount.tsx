import React from "react";
import { IoClose } from "react-icons/io5";

interface DiscountComponentProps {
  showRight: boolean;
  setShowRight: (value: boolean) => void;
}

const coupons = [
  {
    code: "ESBYFRIST",
    description:
      "Get flat 30% off upto rupees 200 on your first order at Esby's",
    condition: "Only on Order above INR 350",
    image: "/elephant.png",
  },
  {
    code: "ICICIFOOD",
    description: "Get flat 30% off upto rupees 200",
    condition: "Only on Order above INR 350 using ICICI bank credit card",
    image: "/elephant.png",
  },
  {
    code: "ESBYFRIST",
    description:
      "Get flat 30% off upto rupees 200 on your first order at Esby's",
    condition: "Only on Order above INR 350",
    image: "/elephant.png",
  },
  {
    code: "ICICIFOOD",
    description: "Get flat 30% off upto rupees 200",
    condition: "Only on Order above INR 350 using ICICI bank credit card",
    image: "/elephant.png",
  },
];

const DiscountComponent: React.FC<DiscountComponentProps> = ({
  showRight,
  setShowRight,
}) => {
  if (!showRight) return null;

  return (
    <div className="max-w-lg bg-white h-screen p-6 border-l border-gray-200 flex flex-col mt-10">
      {/* Close Button */}
      <div className="flex justify-end mb-6 mt-6">
        <button onClick={() => setShowRight(false)}>
          <IoClose size={28} className="text-orange-500 cursor-pointer" />
        </button>
      </div>

      {/* Coupon Input */}
      <div className="flex items-center mb-8 rounded-full overflow-hidden border border-orange-300 bg-white">
        <input
          type="text"
          placeholder="Enter coupon code"
          className="flex-1 px-4 py-3 text-sm outline-none"
        />
        <button className="bg-orange-500 text-white px-5 py-3 text-sm font-semibold  cursor-pointer">
          APPLY
        </button>
      </div>

      {/* Title */}
      <h2 className="text-center font-bold text-2xl text-black mb-6 tracking-wide [font-family:'Barlow_Condensed',Helvetica]">
        AVAILABLE COUPONS
      </h2>

      {/* Coupons List */}
      <div className="overflow-y-auto no-scrollbar space-y-6 pr-2 flex-1 pb-10">
        {coupons.map((coupon, index) => (
          <div
            key={index}
            className="bg-[#FFE6DB] p-6 rounded-[20px] border-2 border-[#ED722E] shadow text-center flex flex-col items-center space-y-2"
          >
            <div className="flex justify-center items-center">
              <img src={coupon.image} alt="Coupon Icon" className="h-10 mb-2" />
              <h3 className="font-extrabold text-xl text-black uppercase">
                {coupon.code}
              </h3>
            </div>
            <p className="text-[15px] text-orange-500 font-bold leading-snug px-14">
              {coupon.description}
            </p>
            <p className="text-[15px] text-gray-800 font-bold">
              {coupon.condition}
            </p>
            <p className="text-sm text-orange-500 underline cursor-pointer">
              + More
            </p>
            <button className="bg-[#ED722E] text-white px-10 py-2 rounded-md text-base font-bold w-[150px] mt-2 shadow cursor-pointer">
              APPLY
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountComponent;
