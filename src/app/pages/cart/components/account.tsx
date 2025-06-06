import Link from "next/link";
import React from "react";
import {
  IoPersonCircleSharp,
  IoLocationSharp,
  IoWalletSharp,
  IoCloseSharp,
} from "react-icons/io5";

interface AccountComponentProps {
  showLeft: boolean;
  setShowLeft: (value: boolean) => void;
}

const AccountComponent: React.FC<AccountComponentProps> = ({ showLeft, setShowLeft }) => {
  if (!showLeft) return null;

  return (
    <div className="w-full md:w-[360px] h-screen bg-gray-300 p-4 flex flex-col gap-6 relative pt-15">
      {/* Account Section */}
      <div className="bg-white p-4 rounded shadow flex items-start gap-4 mt-10 relative">
        <div className="rounded w-12 h-12 flex items-center justify-center mt-1">
          <IoPersonCircleSharp size={24} />
        </div>

        <div>
          <h2 className="font-bold text-sm tracking-wide">ACCOUNT</h2>
          <p className="text-sm text-gray-600 mb-3">
            To place your order now, log in to your existing account or sign up.
          </p>
          <div className="flex gap-2">
            <button className="px-4 py-1 border border-orange-500 text-orange-500 text-sm font-semibold">
              LOG IN
            </button>
            <Link href="/pages/authPages/signIn">
              <button className="px-4 py-1 bg-orange-500 text-white text-sm font-semibold  cursor-pointer">
                SIGN UP
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Delivery Address Section */}
      <div className="bg-white p-4 rounded shadow flex items-center gap-4">
        <div className="w-10 h-10 bg-white flex justify-center items-center shadow">
          <IoLocationSharp size={24} />
        </div>
        <span className="text-gray-700 font-medium">Delivery address</span>
      </div>

      {/* Payment Section */}
      <div className="bg-white p-4 rounded shadow flex items-center gap-4">
        <div className="w-10 h-10 bg-white flex justify-center items-center shadow">
          <IoWalletSharp size={24} />
        </div>
        <span className="text-gray-700 font-medium">Payment</span>
      </div>

      <button
        onClick={() => setShowLeft(false)}
        className="absolute bottom-4 right-4 text-orange-500 text-xl"
      >
        <IoCloseSharp />
      </button>
    </div>
  );
};

export default AccountComponent;
