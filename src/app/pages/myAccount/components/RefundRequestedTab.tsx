"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import ProjectApiList from "@/app/api/ProjectApiList";
import { useUserStore } from "@/app/store/useUserStore";

interface Refund {
  id: number;
  Order_no: string;
  user_id: string;
  restaurant_id: string;
  amount: string;
  reason: string;
  created_at: string;
  status: "pending" | "approved" | "refunded" | "rejected";
}

const STATUS_LABELS = {
  pending: "⏳ Pending",
  approved: "✅ Approved",
  refunded: "💸 Refunded",
  rejected: "❌ Rejected",
};

export default function RefundRequestedTab() {
  const { api_getAllRefunds } = ProjectApiList();
  const { user } = useUserStore();
  const [refunds, setRefunds] = useState<Refund[]>([]);


  useEffect(() => {
    const fetchRefunds = async () => {
      try {
        const res = await axios.get(
          `${api_getAllRefunds}?user_id=${user?.waId}`
        );
        setRefunds(res.data.data);
      } catch (error) {
        console.error("Failed to fetch refunds", error);
      }
    };

    fetchRefunds();
  }, []);

  const groupedRefunds: Record<string, Refund[]> = refunds.reduce(
    (acc, refund) => {
      acc[refund.status] = acc[refund.status] || [];
      acc[refund.status].push(refund);
      return acc;
    },
    {} as Record<string, Refund[]>
  );

  return (
    <div className="flex flex-col items-center text-center space-y-6 p-4">
      <div className="w-full max-w-3xl overflow-y-auto max-h-[550px] border border-gray-300 rounded-lg p-4 no-scrollbar">
        {refunds.length === 0 ? (
          <p className="text-gray-500">No refund requests found.</p>
        ) : (
          Object.keys(STATUS_LABELS).map((statusKey) =>
            groupedRefunds[statusKey]?.length ? (
              <div key={statusKey} className="mb-6">
                <h2 className="text-xl font-bold mb-3 text-left text-gray-700">
                  {STATUS_LABELS[statusKey as keyof typeof STATUS_LABELS]}
                </h2>
                <div className="space-y-4 max-h-[200px] overflow-y-auto pr-2">
                  {groupedRefunds[statusKey].map((refund) => (
                    <div
                      key={refund.id}
                      className="bg-white shadow-md rounded-lg p-4 text-left"
                    >
                      <p>
                        <span className="font-semibold">Order No:</span>{" "}
                        {refund.Order_no}
                      </p>
                      <p>
                        <span className="font-semibold">Amount:</span> ₹
                        {refund.amount}
                      </p>
                      <p>
                        <span className="font-semibold">Reason:</span>{" "}
                        {refund.reason}
                      </p>
                      <p>
                        <span className="font-semibold">Status:</span>{" "}
                        {refund.status}
                      </p>
                      <p>
                        <span className="font-semibold">Requested On:</span>{" "}
                        {new Date(refund.created_at).toLocaleString("en-IN", {
                          timeZone: "Asia/Kolkata",
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null
          )
        )}
      </div>
    </div>
  );
}
