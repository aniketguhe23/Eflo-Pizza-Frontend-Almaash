"use client";

import { useCallback, useEffect, useState } from "react";
import OrderModal from "./OrderDetailModal";
import axios from "axios";
import ProjectApiList from "@/app/api/ProjectApiList";
import { useUserStore } from "@/app/store/useUserStore";
import { useRouter } from "next/navigation";
import RefundModal from "./RefundDialog";
import SupportModal from "./SupportModal";

export default function OrdersSection() {
  const { api_getOrderById } = ProjectApiList();
  const { user } = useUserStore();
  const router = useRouter();

  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [orderData, setOrderData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [refundOrder, setRefundOrder] = useState<any>(null);
  const [supportOrder, setSupportOrder] = useState<any>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${api_getOrderById}/${user?.waId}`);
      setOrderData(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, [api_getOrderById, user?.waId]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <>
      <div className="max-h-[80vh] overflow-y-auto space-y-4 pr-2 scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-orange-100">
        {loading ? (
          <p className="text-center text-gray-500 py-10">Loading orders...</p>
        ) : orderData.length === 0 ? (
          <div className="text-center text-xl text-gray-600 font-semibold py-12 space-y-4">
            <p>No order found. Please order! 🍕</p>
            <button
              onClick={() => router.push("/pages/menu")}
              className=" text-orange-600 underline cursor-pointer hover:underline-offset-8  px-6 py-2 rounded font-semibold text-lg transition"
            >
              Go to Menu
            </button>
          </div>
        ) : (
          orderData.map((order: any, index: number) => (
            <div
              key={index}
              className="rounded-lg bg-white text-black shadow-md [font-family:'Barlow_Condensed',Helvetica]"
            >
              {/* Order Content */}
              <div className="p-4 pb-0 flex justify-center items-center">
                <h3 className="text-3xl font-black leading-tight">
                  ELFO'S PIZZA
                </h3>
              </div>
              <div className="flex justify-center items-center">
                <h3 className="italic text-base font-normal">
                  - {order?.restaurant?.address}
                </h3>
              </div>

              <div className="px-12 pt-4">
                <div className="flex justify-between">
                  <div className="">
                    <p className="text-xl font-bold">{order?.Order_no}</p>
                    <p className="text-sm mt-1">
                      Status:{" "}
                      <span
                        className={`font-semibold ${
                          order?.order_status === "Pending"
                            ? "text-yellow-600"
                            : order?.order_status === "Confirmed"
                            ? "text-blue-600"
                            : order?.order_status === "Delivered"
                            ? "text-green-600"
                            : order?.order_status === "Cancelled"
                            ? "text-red-600"
                            : "text-gray-600"
                        }`}
                      >
                        {order?.order_status}
                      </span>
                    </p>
                  </div>
                  <button
                    className="text-orange-500 text-lg font-semibold cursor-pointer hover:bg-orange-100 p-2"
                    onClick={() => setSelectedOrder(order)}
                  >
                    VIEW DETAILS
                  </button>
                </div>
                <div className="border-t-2 border-dotted border-orange-500 w-[82%] my-2" />
              </div>

              <div className="p-4 px-12 pt-0">
                <div className="text-lg text-gray-500 mb-4 whitespace-pre-line flex justify-between items-end">
                  <div>
                    {order?.items?.map((item: any, i: number) => {
                      if (item.type === "preset") {
                        return (
                          <div key={i}>
                            {item.name?.toUpperCase()} (
                            {item.size?.toUpperCase()}) X {item.quantity}
                          </div>
                        );
                      } else if (item.type === "custom") {
                        const size =
                          item?.selections?.sizes?.name?.toUpperCase() ||
                          "CUSTOM";
                        return (
                          <div key={i}>
                            CUSTOM PIZZA ({size}) X {item.quantity}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                  <div>
                    <span className="font-bold text-gray-500">
                      TOTAL PAID : INR {order?.total_price}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center gap-3">
                  <div className="">
                    {order?.order_status !== "Delivered" &&
                      order?.order_status !== "Refunded" && (
                        <button
                          onClick={() => setSupportOrder(order)}
                          className="text-xs uppercase cursor-pointer hover:underline"
                        >
                          CONTACT SUPPORT
                        </button>
                      )}
                  </div>
                  <div className="">
                    <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm px-6 py-2 tracking-wider uppercase cursor-pointer">
                      RE - ORDER
                    </button>

                    {order?.order_status === "Refunded Requested" && (
                      <p>{order?.order_status}</p>
                    )}

                    {order?.order_status === "Cancelled" && (
                      <button
                        onClick={() => setRefundOrder(order)}
                        className="bg-red-500 hover:bg-red-600 text-white font-semibold text-sm px-6 py-2 tracking-wider uppercase cursor-pointer"
                      >
                        REQUEST REFUND
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedOrder && (
        <OrderModal
          onClose={() => setSelectedOrder(null)}
          order={selectedOrder}
        />
      )}

      {refundOrder && (
        <RefundModal
          open={true}
          onClose={() => setRefundOrder(null)}
          onSuccess={() => {
            setRefundOrder(null);
            fetchOrders();
          }}
          orderId={refundOrder?.Order_no} // assuming `id` is order ID
          restaurantId={refundOrder?.restaurant_name}
          amount={refundOrder?.total_price}
        />
      )}
      {supportOrder && user?.waId && (
        <SupportModal
          open={true}
          orderId={supportOrder?.Order_no}
          userId={user?.waId}
          restaurant_id={supportOrder?.restaurant_name} // 👈 add this line
          onClose={() => setSupportOrder(null)}
          onSuccess={() => setSupportOrder(null)}
        />
      )}
    </>
  );
}
