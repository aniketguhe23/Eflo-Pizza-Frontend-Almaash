"use client";

import { useEffect, useState } from "react";
import {
  Smartphone,
  CreditCard,
  MapPin,
  Gift,
  ShoppingBag,
  MessageSquare,
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
import SessionExpiredModal from "@/components/SessionExpiredModal";
import { useFetchUser } from "@/app/hook/useFetchUser";
import ChatSection from "./components/ChatSection";

export default function MyAccount() {
  const { isSessionExpired } = useFetchUser(); // ✅ call the hook
  const { user } = useUserStore();
  const router = useRouter();

  const [activeSection, setActiveSection] = useState("orders");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deliveryType, setDeliveryType] = useState<"delivery" | "pickup">();

  const sidebarItems = [
    { id: "orders", label: "ORDERS", icon: ShoppingBag },
    { id: "app", label: "OUR APP", icon: Smartphone },
    { id: "rewards", label: "REWARDS", icon: Gift },
    { id: "payments", label: "PAYMENTS", icon: CreditCard },
    { id: "addresses", label: "ADDRESSES", icon: MapPin },
    { id: "chatSection", label: "CHAT", icon: MessageSquare },
  ];

  useEffect(() => {
    if (!user) {
      const timeout = setTimeout(() => {
        router.push("/");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [user]);

  if (isSessionExpired) return <SessionExpiredModal visible />; // ✅ modal + redirect

  if (!user)
    return (
      <div className="fixed inset-0 z-50 h-full w-full flex items-center justify-center bg-white">
        <Loader />
      </div>
    );

  return (
    <>
      <Header setDeliveryType={setDeliveryType} deliveryType={deliveryType} />
      <div className="min-h-screen mt-25  [font-family:'Barlow_Condensed',Helvetica] shadow-md ">
        <div className="bg-white">
          <div className="max-w-6xl mx-auto px-4 py-4">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-orange-500 mb-2 italic">
                MY ACCOUNT
              </h1>
            </div>
          </div>

          <div className="max-w-full mx-auto px-4 ">
            <div className="border-t-5 border-dotted border-[#ED722E] w-full my-4 "></div>
          </div>

          <div className="max-w-6xl mx-auto px-4 py-6">
            <div className="flex justify-between items-start gap-10 flex-wrap">
              {/* User Info Section */}
              <div className="flex flex-col space-y-2 text-xl text-gray-700">
                <h2 className="text-4xl font-bold text-black mb-2">
                  {user?.firstName} {user?.lastName}
                </h2>
                <div>
                  <span className="font-semibold">mobile:</span> {user?.mobile}
                </div>
                <div>
                  <span className="font-semibold">email:</span> {user?.email} ,<span className="font-semibold"> DOB:</span>{" "}
                  {user?.dateOfBirth} 
                </div>
               
              </div>

              {/* Edit Button */}
              <div className="shrink-0">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="border border-orange-500 text-orange-500 font-semibold px-8 py-3 rounded hover:bg-orange-100 text-xl"
                >
                  EDIT PROFILE
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-4 bg-[#fbdecf] rounded">
          <div className="flex gap-6">
            <div className="w-80 h-[600px] bg-[#ED722E] rounded-lg overflow-hidden flex flex-col">
              {sidebarItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  className={`w-full p-4 text-left font-bold cursor-pointer transition-colors ${
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

            <div className="flex-1 rounded-lg p-6">
              {activeSection === "orders" && <OrdersSection />}
              {activeSection === "app" && <AppSection />}
              {activeSection === "rewards" && <RewardsSection />}
              {activeSection === "payments" && <PaymentsSection />}
              {activeSection === "addresses" && <AddressesSection />}
              {activeSection === "chatSection" && <ChatSection />}
            </div>
          </div>
        </div>
      </div>
      <CustomEditProfileModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  );
}
