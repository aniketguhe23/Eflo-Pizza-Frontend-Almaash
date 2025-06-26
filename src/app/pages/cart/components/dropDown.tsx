"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useUserStore } from "@/app/store/useUserStore";
import { useRouter } from "next/navigation";
import { CircleUserRound } from "lucide-react";

export default function AccountDropdown() {
  const [open, setOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const logout = useUserStore((state) => state.logout);
  const router = useRouter();

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setShowConfirmModal(true);
  };

  const confirmLogout = () => {
    logout();
    setShowConfirmModal(false);
    setOpen(false);
    router.push("/");
  };

  const cancelLogout = () => {
    setShowConfirmModal(false);
  };

  return (
    <div
      className="relative inline-block text-left [font-family:'Barlow_Condensed',Helvetica]"
      ref={dropdownRef}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-white text-xl font-semibold hover:underline cursor-pointer"
      >
        <CircleUserRound className="text-white h-9 w-9" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-50">
          <ul className="py-2 text-base text-gray-700">
            <li>
              <Link
                href="/pages/myAccount"
                className="block px-4 py-2 transition-transform duration-200 ease-in-out hover:scale-105"
              >
                My Account
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 cursor-pointer text-gray-700 transition-transform duration-200 ease-in-out hover:text-red-800 hover:scale-105"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Slide-In Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center">
          <div className="relative">
            <div
              className={`
                transform transition-transform duration-300 ease-out
                bg-white rounded-lg shadow-xl p-6 w-80 max-w-full text-center
                translate-x-0 opacity-100
              `}
            >
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Are you sure you want to sign out?
              </h2>
              <div className="flex justify-center gap-4">
                <button
                  onClick={confirmLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition cursor-pointer"
                >
                  Yes, Sign Out
                </button>
                <button
                  onClick={cancelLogout}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
