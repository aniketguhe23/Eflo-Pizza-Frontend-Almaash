"use client";

import ProjectApiList from "@/app/api/ProjectApiList";
import { useUserStore } from "@/app/store/useUserStore";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface CustomEditProfileModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: string;
}

export default function CustomEditProfileModal({
  isOpen,
  setIsOpen,
}: CustomEditProfileModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { user, setUser } = useUserStore();
  const { api_updateUserProfileDetails } = ProjectApiList();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormData>();

  // Populate default values when modal opens
  useEffect(() => {
    if (isOpen && user) {
      setValue("firstName", user.firstName || "");
      setValue("lastName", user.lastName || "");
      setValue("email", user.email || "");
      setValue("dateOfBirth", user.dateOfBirth || "");
    }
  }, [isOpen, user, setValue]);

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close modal on ESC key
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }
    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const onSubmit = async (data: ProfileFormData) => {
    if (!user?.waId) return alert("User ID missing");

    try {
      setLoading(true);
      const payload = {
        ...data,
        waId: user.waId,
      };

      const res = await axios.put(`${api_updateUserProfileDetails}/${user?.waId}`, payload);
      if (res.data) {
        setUser(res.data); // optional: update store
      }

      setIsOpen(false);
      window.location.reload();
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 [font-family:'Barlow_Condensed',Helvetica]">
          <div
            ref={modalRef}
            className="bg-white rounded-lg w-full max-w-sm overflow-hidden"
            role="dialog"
            aria-modal="true"
          >
            {/* Header */}
            <div className="p-6 pb-4 flex items-center justify-between">
              <h2 className="text-3xl font-bold text-black">EDIT PROFILE</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-orange-500 hover:text-orange-600 cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="px-6 pb-6 space-y-6">
              {/* First Name */}
              <div>
                <label className="block text-lg font-bold text-black">First Name</label>
                <input
                  {...register("firstName", { required: true })}
                  type="text"
                  className="w-full border border-orange-500 rounded p-2 focus:ring-2 focus:ring-orange-500"
                />
                {errors.firstName && (
                  <span className="text-red-500 text-sm">First name is required</span>
                )}
              </div>

              {/* Last Name */}
              <div>
                <label className="block text-lg font-bold text-black">Last Name</label>
                <input
                  {...register("lastName", { required: true })}
                  type="text"
                  className="w-full border border-orange-500 rounded p-2 focus:ring-2 focus:ring-orange-500"
                />
                {errors.lastName && (
                  <span className="text-red-500 text-sm">Last name is required</span>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-lg font-bold text-black">Email</label>
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className="w-full border border-orange-500 rounded p-2 focus:ring-2 focus:ring-orange-500"
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">Email is required</span>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-lg font-bold text-black">Date of Birth</label>
                <input
                  {...register("dateOfBirth", { required: true })}
                  type="date"
                  className="w-full border border-orange-500 rounded p-2 focus:ring-2 focus:ring-orange-500"
                />
                {errors.dateOfBirth && (
                  <span className="text-red-500 text-sm">Date of birth is required</span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className={`mt-4 bg-orange-500 text-white hover:bg-orange-600 font-bold px-6 py-2 rounded w-full cursor-pointer ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Saving..." : "SAVE CHANGES"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
