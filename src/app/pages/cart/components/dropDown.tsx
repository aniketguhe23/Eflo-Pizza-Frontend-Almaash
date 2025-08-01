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

  const handleLogout = () => setShowConfirmModal(true);
  const confirmLogout = () => {
    logout();
    setShowConfirmModal(false);
    setOpen(false);
    router.push("/");
  };
  const cancelLogout = () => setShowConfirmModal(false);

  return (
    <div ref={dropdownRef} className="relative inline-block text-left">
      {/* Avatar Button */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="text-white text-xl font-semibold hover:underline cursor-pointer"
      >
        <CircleUserRound className="h-9 w-9 text-white max-sm:text-black max-lg:text-black" />
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div
          className={`
    absolute z-50 max-lg:z-[999] w-44 rounded-md shadow-lg
    bg-white text-gray-800 mt-2
    right-0 top-full

    max-lg:left-12 max-lg:top-0
    lg:left-1/2 lg:transform lg:-translate-x-1/2
  `}
        >
          <ul className="py-2 text-base">
            <li>
              <Link
                href="/pages/myAccount"
                className="block px-4 py-2 transition-transform duration-200 hover:scale-105 hover:text-orange-600"
              >
                My Account
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 transition-transform duration-200 hover:scale-105 text-red-700"
              >
                Sign Out
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-xl p-6 w-80 max-w-full text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Are you sure you want to sign out?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Yes, Sign Out
              </button>
              <button
                onClick={cancelLogout}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
