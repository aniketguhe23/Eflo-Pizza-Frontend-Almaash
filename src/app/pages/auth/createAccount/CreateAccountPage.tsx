"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import Image from "next/image";
import ProjectApiList from "@/app/api/ProjectApiList";

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  dateOfBirth: string;
};

export default function CreateAccountPage() {
  const { api_createUserProfile } = ProjectApiList();

  const router = useRouter();
  const searchParams = useSearchParams();
  const waId = searchParams.get("waId");
  const mobile = searchParams.get("mobile") || "";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>();

  useEffect(() => {
    if (mobile) {
      setValue("mobile", mobile);
    }
  }, [mobile, setValue]);

  const onSubmit = async (data: FormValues) => {
    const res = await fetch(api_createUserProfile, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, waId }),
    });

    const result = await res.json();
    if (result.token) {
      localStorage.setItem("token", result.token);
      router.push("/pages/cart");
    }
    router.refresh();
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 to-[#ED722E] px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-6">
        <div className="flex flex-col items-center mb-4">
          <Image
            src="/elephant.png"
            alt="Elfo's Pizza Logo"
            width={60}
            height={60}
          />
          <h1 className="text-xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-500 text-sm text-center">
            Quick signup to continue 🍕
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              {...register("firstName", { required: "First name is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="John"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              {...register("lastName", { required: "Last name is required" })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <input
              type="tel"
              {...register("mobile", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Enter a valid number (10 to 15 digits)",
                },
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none bg-gray-100 cursor-not-allowed"
              placeholder="Enter mobile number"
              disabled
            />
            {errors.mobile && (
              <p className="text-red-500 text-xs mt-1">
                {errors.mobile.message}
              </p>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              {...register("dateOfBirth", {
                required: "Birth date is required",
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none"
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 text-xs mt-1">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-1 rounded-lg bg-[#ED722E] text-white font-medium text-sm hover:bg-orange-500 active:scale-95 transition cursor-pointer"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}
