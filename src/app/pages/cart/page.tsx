"use client";

import { useEffect, useState } from "react";
import Orders from "./components/order";
import AccountSection from "./components/account";
import DiscountComponent from "./components/discount";
import Header from "./components/header";
import { useUserStore } from "@/app/store/useUserStore";
import UserBootstrap from "@/app/hook/UserBootstrap";
import CitySelectGate from "@/components/modal/CitySelectGate";
import ProjectApiList from "@/app/api/ProjectApiList";
import axios from "axios";
import useCartStore from "@/app/store/useCartStore";

interface Coupon {
  id: string;
  code: string;
  description: string;
  minOrderAmount?: number;
  discountAmount?: number;
  discountPercent?: number;
  expiresAt?: string;
}

type Size = "small" | "medium" | "large";

interface MenuItem {
  id: number;
  name: string;
  image: string;
  category: string;
  is_available: boolean;
  prices: Record<Size, number | null>;
}

type Menu = Record<string, MenuItem[]>;


const Page = () => {
  const { user } = useUserStore();
  const { api_getItemsOfResturant } = ProjectApiList();
  const restaurantNo = useCartStore((state) => state.restaurantNo);

  const [showLeft, setShowLeft] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth >= 768; // true for md and above
    }
    return false;
  });
  const [loading, setLoading] = useState(true);
const [menuData, setMenuData] = useState<Menu>({});
  const [categories, setCategories] = useState<string[]>([]);

  const [showRight, setShowRight] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null); // ✅ Fix added
  const [hydrated, setHydrated] = useState(false);
  const [deliveryType, setDeliveryType] = useState<any>("delivery");
  const [selectedRestaurant, setSelectedRestaurant] = useState<string | null>(
    null
  );
  const [selectedRestaurantNumber, setSelectedRestaurantNumber] = useState<
    string | null
  >(null);

  const [selectedAddress, setSelectedAddress] = useState<string | null>(
    user?.address_home || null
  );

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const apiUrl = `${api_getItemsOfResturant}/${selectedRestaurantNumber ? selectedRestaurantNumber : restaurantNo}/items`;

        const response = await axios.get(apiUrl);
        const data = response?.data?.data || {};

        setMenuData(data);
        setCategories(Object.keys(data));
      } catch (error) {
        console.error("Error fetching menu data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (selectedRestaurantNumber || restaurantNo) {
      fetchMenuData();
    }
  }, [api_getItemsOfResturant, selectedRestaurantNumber,restaurantNo]);

  // console.log(menuData, "menuData=================>");

  useEffect(() => setHydrated(true), []);
  if (!hydrated) return null;

  return (
    <>
      {!user && <UserBootstrap />}

      <CitySelectGate>
        <Header setDeliveryType={setDeliveryType} deliveryType={deliveryType} />
        <div className="flex h-screen overflow-hidden">
          {/* Left Sidebar */}
          <AccountSection
            showLeft={showLeft}
            setShowLeft={setShowLeft}
            deliveryType={deliveryType}
            setDeliveryType={setDeliveryType} // ✅ FIXED: pass the missing prop
            selectedRestaurant={selectedRestaurant}
            setSelectedRestaurant={setSelectedRestaurant}
            setSelectedRestaurantNumber={setSelectedRestaurantNumber}
            selectedRestaurantNumber={selectedRestaurantNumber}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />

          {/* Main Content */}
          <div className="flex-1 relative overflow-y-auto no-scrollbar">
            {!showLeft && (
              <button
                className="absolute left-0 top-4 bg-gray-100 px-2 py-1 border border-gray-300 text-sm z-10 max-sm:hidden"
                onClick={() => setShowLeft(true)}
              >
                Show Account
              </button>
            )}

            <Orders
              setShowRight={setShowRight}
              appliedCoupon={appliedCoupon}
              deliveryType={deliveryType}
              onRemoveCoupon={() => setAppliedCoupon(null)}
              setDeliveryType={setDeliveryType}
              selectedRestaurant={selectedRestaurant}
              selectedAddress={selectedAddress}
              selectedRestaurantNumber={selectedRestaurantNumber}
              menuData={menuData}
            />
          </div>

          {/* Right Sidebar */}
          <DiscountComponent
            showRight={showRight}
            setShowRight={setShowRight}
            appliedCoupon={appliedCoupon}
            onApplyCoupon={(coupon) => setAppliedCoupon(coupon)}
          />
        </div>
      </CitySelectGate>
    </>
  );
};

export default Page;
