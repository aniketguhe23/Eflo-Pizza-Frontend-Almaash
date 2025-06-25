"use client";

import { useEffect, useState } from "react";
import {
  Smartphone,
  CreditCard,
  MapPin,
  Gift,
  ShoppingBag,
} from "lucide-react";
import OrdersSection from "./components/OrdersSection";
import RewardsSection from "./components/RewardsSection";
import PaymentsSection from "./components/PaymentsSection";
import AddressesSection from "./components/AddressesSection";
import AppSection from "./components/AppSection";
import Header from "../cart/components/header";
import CustomEditProfileModal from "./components/editProfileSection";
import { useUserStore } from "@/app/store/useUserStore";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";

export default function MyAccount() {
  const { user } = useUserStore();
  const router = useRouter();

  const [activeSection, setActiveSection] = useState("orders");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sidebarItems = [
    { id: "orders", label: "ORDERS", icon: ShoppingBag },
    { id: "app", label: "OUR APP", icon: Smartphone },
    { id: "rewards", label: "REWARDS", icon: Gift },
    { id: "payments", label: "PAYMENTS", icon: CreditCard },
    { id: "addresses", label: "ADDRESSES", icon: MapPin },
  ];

  
  useEffect(() => {
    if (!user) {
      const timeout = setTimeout(() => {
        router.push("/");
      }, 500);
      
      return () => clearTimeout(timeout); // cleanup
    }
  }, [user]);
  
  if (!user)
    return (
      <div className="fixed inset-0 z-50 h-full w-full flex items-center justify-center bg-white">
        <Loader />
      </div>
    );
  return (
    <>
      <Header />
      <div className="min-h-screen mt-25  [font-family:'Barlow_Condensed',Helvetica] shadow-md ">
        {/* Header */}

        <div className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            {/* Section 1: MY ACCOUNT */}
            <div className="text-center">
              <h1 className="text-4xl font-bold text-orange-500 mb-2 italic">
                MY ACCOUNT
              </h1>
            </div>
          </div>

          <div className="max-w-full mx-auto px-4 ">
            {/* Section 2: Divider */}
            <div className="border-t-5 border-dotted border-[#ED722E] w-full my-4 "></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-4xl font-bold">
                  {" "}
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-gray-600 text-xl pt-2">{user?.mobile}</p>
              </div>
              <button
                className="border border-orange-500 text-orange-500 font-semibold px-10 py-3 rounded hover:bg-orange-100 text-xl cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              >
                EDIT PROFILE
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto p-4 bg-[#fbdecf] rounded">
          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="w-80 h-[600px] bg-[#ED722E] rounded-lg overflow-hidden flex flex-col">
              {sidebarItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={`w-full p-4  text-left font-bold  cursor-pointer transition-colors ${
                    activeSection === id
                      ? "bg-[#fbdecf] text-black ml-5 mt-2"
                      : "text-white"
                  }`}
                >
                  <div className="flex items-center gap-3 text-2xl">
                    <Icon className="w-5 h-5" />
                    {label}
                  </div>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 rounded-lg p-6">
              {activeSection === "orders" && <OrdersSection />}
              {activeSection === "app" && <AppSection />}
              {activeSection === "rewards" && <RewardsSection />}
              {activeSection === "payments" && <PaymentsSection />}
              {activeSection === "addresses" && <AddressesSection />}
            </div>
          </div>
        </div>
      </div>
      <CustomEditProfileModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
}
