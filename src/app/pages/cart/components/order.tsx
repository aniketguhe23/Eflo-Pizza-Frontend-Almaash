"use client";

import ProjectApiList from "@/app/api/ProjectApiList";
import useBuildYourOwnPizzaCart from "@/app/store/useBuildYourOwnPizzaCart";
import useCartStore from "@/app/store/useCartStore";
import { useUserStore } from "@/app/store/useUserStore";
import axios from "axios";
import { Minus, Plus, Tag } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ConfirmOrderModal from "./ConfirmOrderModal";
import OrderConfirmationModal, {
  OrderResponse,
} from "./OrderConfirmationModal";

interface SuggestionItem {
  id: string | number;
  name: string;
  imageUrl: string;
  variants?: { price: number }[];
}

type AppliedCoupon = {
  code?: string;
  discountAmount?: number;
  discountPercent?: number;
};

interface OrdersProps {
  setShowRight: (value: boolean) => void;
  appliedCoupon: AppliedCoupon | null;
  onRemoveCoupon: () => void;
  selectedRestaurant: string | null; // 🔧 FIXED
  selectedAddress: string | null; // 🔧 FIXED
  selectedRestaurantNumber: string | null; // 🔧 FIXED
  deliveryType?: "delivery" | "pickup";
  setDeliveryType: React.Dispatch<
    React.SetStateAction<"delivery" | "pickup" | undefined>
  >;
}

export default function Orders({
  setShowRight,
  appliedCoupon,
  onRemoveCoupon,
  deliveryType,
  selectedRestaurant,
  selectedAddress,
  selectedRestaurantNumber,
}: OrdersProps) {
  const { orderItems, updateQuantity, resetCart, addSuggestionToOrder } =
    useCartStore();
  const { pizzas, updatePizzaQuantity, clearPizzas } =
    useBuildYourOwnPizzaCart();
  const { user } = useUserStore();
  const restaurantNo = useCartStore((state) => state.restaurantNo);

  const { api_createOrder, api_getSuggestions } = ProjectApiList();

  // const [selectedAddress, setSelectedAddress] = useState<string | null>(
  //   "House 43, Phase 1, Golden City, Misroad Bhopal, Madhya Pradesh 462047, INDIA (13)"
  // );
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showConfirMationModal, setShowConfirMationModal] = useState(false);
  const [orderResponse, setOrderResponse] = useState<OrderResponse>({});
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);

  const getSuggestions = async () => {
    try {
      const res = await axios.get(api_getSuggestions);
      const suggestionsData = res.data.data;
      setSuggestions(suggestionsData);
    } catch (err) {
      toast.error("❌ Failed to fetch suggestions. Please try again.");
      console.error("Suggestion fetch failed:", err);
    }
  };

  useEffect(() => {
    getSuggestions();
  }, []);

  const orderItemsTotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const pizzaItemsTotal = pizzas.reduce((sum, pizza) => {
    const pizzaPrice = pizza?.selections
      ? Object.values(pizza.selections).reduce((acc, option) => {
          if (Array.isArray(option)) {
            return (
              acc +
              option.reduce((innerSum, o) => innerSum + (o?.price || 0), 0)
            );
          }
          return acc + (option?.price || 0);
        }, 0)
      : 0;
    return sum + pizzaPrice * (pizza.quantity || 1);
  }, 0);

  const itemTotal = orderItemsTotal + pizzaItemsTotal;

  let discount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountAmount) {
      discount = Number(appliedCoupon.discountAmount);
    } else if (appliedCoupon.discountPercent) {
      discount = (itemTotal * Number(appliedCoupon.discountPercent)) / 100;
    }
  }

  const gstAndCharges = 33.3;
  const total = itemTotal - discount + gstAndCharges;

  const submitOrder = async () => {
    const mergedItems = [
      ...orderItems.map((item) => ({
        type: "preset",
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        size: item.size,
        dough: item.dough,
        crust: item.crust,
        toppings: item.toppings,
        suggestions: item.suggestions,
      })),
      ...pizzas.map((pizza) => ({
        type: "custom",
        selections: pizza.selections,
        quantity: pizza.quantity,
      })),
    ];

    const payload = {
      user_id: user?.waId || null,
      address: selectedAddress,
      restaurant_name: restaurantNo ? restaurantNo : selectedRestaurantNumber,
      type: deliveryType,
      items: mergedItems,
      discount: Math.round(discount),
      delivery: null,
      payment_method: "COD",
      payment_status: "Unpaid",
      gst: gstAndCharges,
      item_total: Math.round(itemTotal),
      total_price: Math.round(total),
    };

    // console.log(payload);
    try {
      const res = await axios.post(api_createOrder, payload);
      setOrderResponse(res?.data);
      toast.success("✅ Order placed successfully!");
      setShowConfirmModal(false);
      // ✅ Empty the cart
      resetCart();
      clearPizzas();
      setShowConfirMationModal(true);
    } catch (err) {
      toast.error("❌ Failed to place the order. Please try again.");
      console.error("Order placement failed:", err);
    }
  };

  const handleProceedToPay = () => {
    if (!selectedRestaurantNumber && !restaurantNo) {
      toast.error("Please select a restaurant before placing the order.");
      return;
    }
    if (!selectedAddress) {
      toast.error("Please select a Address before placing the order.");
      return;
    }
    if (!deliveryType) {
      toast.error("Please select a Pickup/Delivery before placing the order.");
      return;
    }
    setShowConfirmModal(true);
  };

  const isCartEmpty = orderItems.length === 0 && pizzas.length === 0;

  const mergedItems = [
    ...orderItems.map((item) => ({
      type: "order" as const,
      id: item.id,
      name: item.name,
      image: item.image || "/placeholder.svg",
      quantity: item.quantity,
      price: item.price,
      extra: {
        size: item.size,
        dough: item.dough,
        crust: item.crust,
        toppings: item.toppings,
        suggestions: item.suggestions,
      },
      fromSuggestion: item.fromSuggestion,
    })),
    ...pizzas.map((pizza, index) => {
      const price = Object.values(pizza.selections || {}).reduce(
        (sum, option) => {
          if (Array.isArray(option)) {
            return sum + option.reduce((s, o) => s + (o?.price || 0), 0);
          }
          return sum + (option?.price || 0);
        },
        0
      );
      return {
        type: "pizza" as const,
        id: `pizza-${index}`,
        name: `Custom Pizza #${index + 1}`,
        image: "/pizza.png",
        quantity: pizza.quantity,
        price,
        selections: pizza.selections,
        index,
      };
    }),
  ];
  return (
    <>
      <div className="max-w-4xl mx-auto bg-white min-h-screen pt-10 rounded-lg mt-8 [font-family:'Barlow_Condensed',Helvetica]">
        <div className="text-center py-6">
          <h1 className="text-orange-500 font-semibold text-2xl">YOUR ORDER</h1>
        </div>

        {isCartEmpty ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-gray-500 px-4 text-center">
            <Image
              src="/empty-cart.png"
              alt="No items"
              width={180}
              height={180}
              className="mb-4 w-28 sm:w-36 md:w-44 lg:w-48 h-auto"
            />
            <h2 className="text-base sm:text-lg md:text-xl font-semibold">
              No items in cart
            </h2>
            <p className="text-sm sm:text-base">
              You can still select Add-ons above. Try pairing with something!
            </p>
          </div>
        ) : (
          <>
            <div className="px-2 sm:px-4 space-y-4">
              {mergedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4 border-b border-gray-100"
                >
                  {/* Image */}
                  <div className="w-20 h-20 shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-full object-cover w-20 h-20"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 w-full md:w-auto">
                    <h3 className="font-semibold text-lg sm:text-xl text-gray-900">
                      {item.name}
                    </h3>

                    {/* Item extras or selections */}
                    <div className="mt-1 text-sm sm:text-base text-gray-600 flex flex-wrap gap-x-2 gap-y-1">
                      {item.type === "order" &&
                        !item.fromSuggestion &&
                        item.extra &&
                        Object.entries(item.extra).map(
                          ([key, val]) =>
                            val && (
                              <span key={key}>
                                <span className="capitalize">{key}:</span>{" "}
                                {Array.isArray(val) ? val.join(", ") : val}
                              </span>
                            )
                        )}

                      {item.type === "pizza" &&
                        item.selections &&
                        Object.entries(item.selections).map(([key, val]) => {
                          if (Array.isArray(val)) {
                            return val.map((v, i) => (
                              <span key={`${key}-${i}`}>
                                <span className="font-medium">{key}:</span>{" "}
                                {v.name},
                              </span>
                            ));
                          }
                          return val?.name ? (
                            <span key={key}>
                              <span className="font-medium">{key}:</span>{" "}
                              {val.name},
                            </span>
                          ) : null;
                        })}
                    </div>
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          item.type === "order"
                            ? updateQuantity(item.id, -1)
                            : updatePizzaQuantity(item.index, -1)
                        }
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() =>
                          item.type === "order"
                            ? updateQuantity(item.id, 1)
                            : updatePizzaQuantity(item.index, 1)
                        }
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-right min-w-[70px]">
                      <p className="font-semibold whitespace-nowrap">
                        ₹{item.quantity * item.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {suggestions?.length > 0 && (
              <div className="px-4 mt-5 pb-8">
                <h2 className="text-center font-semibold text-gray-900 mb-6 text-xl">
                  Pair it with
                </h2>
                <div className="flex flex-wrap justify-center gap-4">
                  {suggestions?.map((item) => (
                    <div
                      key={item?.id}
                      className="w-[140px]  border border-orange-300 rounded-lg p-4 flex flex-col items-center text-center"
                    >
                      <Image
                        src={item?.imageUrl}
                        alt={item?.name}
                        width={100}
                        height={100}
                        className="mb-3 rounded object-cover w-[100px] h-[100px] max-sm:w-[50px] max-sm:h-[50px]"
                      />

                      <h3 className="font-bold max-sm:text-xs text-sm text-gray-800 mb-1 uppercase">
                        {item?.name}
                      </h3>
                      <p className="text-sm text-gray-600 font-semibold mb-3">
                        INR {item?.variants?.[0]?.price || 15}
                      </p>
                      <button
                        onClick={() => addSuggestionToOrder(item)}
                        className="text-orange-500 font-bold hover:underline text-sm cursor-pointer"
                      >
                        ADD
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="px-4 py-6">
              <h2 className="text-center font-semibold text-gray-900 mb-4">
                Bill Detail
              </h2>
              <button
                className="w-full mb-6 bg-orange-200 hover:bg-orange-300 text-gray-900 font-semibold px-3 py-2 rounded cursor-pointer"
                onClick={() => setShowRight(true)}
              >
                <Tag className="w-4 h-4 inline mr-2" />
                APPLY DISCOUNT
              </button>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Item Total</span>
                  <span className="font-semibold">
                    ₹{Math.round(itemTotal)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-500">
                    {appliedCoupon?.code
                      ? `${appliedCoupon.code} Discount`
                      : "Item Discount"}
                  </span>
                  <div className="flex items-center gap-2">
                    {appliedCoupon?.code && (
                      <button
                        onClick={onRemoveCoupon}
                        className="text-[11px] text-red-500 hover:underline hover:text-red-600 cursor-pointer"
                      >
                        remove
                      </button>
                    )}
                    <span className="text-orange-500">
                      -₹{Math.round(discount)}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 text-sm">GST</span>
                  <span className="font-semibold">₹{gstAndCharges}</span>
                </div>
                <div className="border-t pt-3 mt-3 flex justify-between">
                  <span className="font-bold text-gray-900">TOTAL</span>
                  <span className="font-bold text-gray-900">
                    ₹{Math.round(total)}
                  </span>
                </div>
              </div>
              <button
                onClick={handleProceedToPay}
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white text-base font-semibold py-3 rounded cursor-pointer"
              >
                Proceed to Pay
              </button>
            </div>
          </>
        )}
      </div>
      <ConfirmOrderModal
        open={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={submitOrder}
      />
      <OrderConfirmationModal
        isOpen={showConfirMationModal}
        onClose={() => setShowConfirMationModal(false)}
        orderResponse={orderResponse}
      />
    </>
  );
}
