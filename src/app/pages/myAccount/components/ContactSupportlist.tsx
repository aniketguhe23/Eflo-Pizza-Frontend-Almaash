"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProjectApiList from "@/app/api/ProjectApiList";
import { useUserStore } from "@/app/store/useUserStore";

interface SupportRequest {
  id: number;
  order_id: string;
  user_id: string;
  restaurant_id: string;
  subject: string;
  message: string;
  status: "pending" | "resolved" | "rejected";
  created_at: string;
}

export default function ContactSupportList() {
  const { api_getAllContactSupport } = ProjectApiList();
  const { user } = useUserStore();
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);

  useEffect(() => {
    const fetchSupportRequests = async () => {
      if (!user?.waId) return;

      try {
        const res = await axios.get(
          `${api_getAllContactSupport}?user_id=${user.waId}`
        );
        const data = res.data.data || [];
        // Sort by latest
        setSupportRequests(
          data.sort(
            (a: SupportRequest, b: SupportRequest) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          )
        );
      } catch (error) {
        console.error("Failed to fetch support requests", error);
      }
    };

    fetchSupportRequests();
  }, [user?.waId]);

  return (
    <div className="flex flex-col items-center text-center space-y-6 p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Support Requests</h2>

      <div className="w-full max-w-3xl overflow-y-auto max-h-[550px] border border-gray-300 rounded-lg p-4 no-scrollbar">
        {supportRequests.length === 0 ? (
          <p className="text-gray-500">No support requests found.</p>
        ) : (
          <div className="space-y-4">
            {supportRequests.map((support) => (
              <div
                key={support.id}
                className="bg-white shadow-md rounded-lg p-4 text-left"
              >
                <p>
                  <span className="font-semibold">Order ID:</span>{" "}
                  <span className="font-bold"> #{support.order_id}</span>
                </p>
                <p>
                  <span className="font-semibold">Subject:</span>{" "}
                  {support.subject}
                </p>
                <p>
                  <span className="font-semibold">Message:</span>{" "}
                  {support.message}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span
                    className={
                      support.status === "resolved"
                        ? "text-green-600"
                        : support.status === "rejected"
                        ? "text-red-600"
                        : "text-yellow-600"
                    }
                  >
                    {support.status}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Created:</span>{" "}
                  {new Date(support.created_at).toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
