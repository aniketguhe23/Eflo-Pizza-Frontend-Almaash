"use client";

import { useState } from "react";
import Orders from "./components/order";
import AccountSection from "./components/account";
import DiscountComponent from "./components/discount";
import Header from "./components/header";
import { useUserStore } from "@/app/store/useUserStore";
import UserBootstrap from "@/app/hook/UserBootstrap";

const Page = () => {
  const { user } = useUserStore();

  const [showLeft, setShowLeft] = useState(true);
  const [showRight, setShowRight] = useState(false);


  return (
    <>
      {!user && <UserBootstrap />}
    
      <Header />
      <div className="flex h-screen overflow-hidden">
        {/* Left Sidebar */}
        <AccountSection showLeft={showLeft} setShowLeft={setShowLeft} />

        {/* Main Content */}
        <div className="flex-1 relative overflow-y-auto no-scrollbar">
          {!showLeft && (
            <button
              className="absolute left-0 top-4 bg-gray-100 px-2 py-1 border border-gray-300 text-sm z-10"
              onClick={() => setShowLeft(true)}
            >
              Show Account
            </button>
          )}

          <Orders setShowRight={setShowRight} />
        </div>

        {/* Right Sidebar */}
        <DiscountComponent showRight={showRight} setShowRight={setShowRight} />
      </div>
    </>
  );
};

export default Page;
