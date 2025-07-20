"use client";

import { useForm } from "react-hook-form";
import React from "react";
import { useUserStore } from "@/app/store/useUserStore";
import axios from "axios";
import ProjectApiList from "@/app/api/ProjectApiList";

type RefundFormFields = {
  order_id: string;
  user_id: string;
  restaurant_id?: string;
  amount: string;
  reason?: string;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  orderId: number;
  restaurantId?: number;
  amount: number;
};

export default function RefundModal({
  open,
  onClose,
  onSuccess,
  orderId,
  restaurantId,
  amount,
}: Props) {
  const { api_createRefund } = ProjectApiList();
  const { user } = useUserStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RefundFormFields>();

  const onSubmit = async (data: RefundFormFields) => {
    try {
      const payload = {
        ...data,
        Order_no: orderId, // 👈 Use Order_no instead of order_id
        user_id: user?.waId,
        amount: Number(amount),
        restaurant_id: restaurantId,
      };

      await axios.post(api_createRefund, payload); // ✅ Axios request

      onSuccess?.();
      reset();
      onClose();
    } catch (error) {
      console.error("Refund creation failed:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-lg">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-red-500 text-xl font-bold"
        >
          ×
        </button>

        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Create Refund
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Order ID *
            </label>
            <input
              type="text"
              {...register("order_id", { required: true })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
            {errors.order_id && (
              <p className="text-sm text-red-500">Order ID is required</p>
            )}
          </div> */}

          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              User ID *
            </label>
            <input
              type="text"
              {...register("user_id", { required: true })}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
            {errors.user_id && (
              <p className="text-sm text-red-500">User ID is required</p>
            )}
          </div> */}

          {/* <div>
            <label className="block text-sm font-medium text-gray-700">
              Restaurant ID
            </label>
            <input
              type="text"
              {...register("restaurant_id")}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div> */}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount *
            </label>
            <p>Rs {amount}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reason
            </label>
            <textarea
              rows={3}
              {...register("reason")}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {isSubmitting ? "Submitting..." : "Submit Refund"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
