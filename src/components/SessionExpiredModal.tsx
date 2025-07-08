"use client";

import LoginModal from "@/app/pages/auth/login/LoginModal";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  visible: boolean;
}

export default function SessionExpiredModal({ visible }: Props) {
  const router = useRouter();
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (!visible) return null;

  return (
    <>
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          setShowLoginModal={setShowLoginModal}
          onTriggerCreateAccount={(data) => {
            setShowLoginModal(false);
            // setCreateAccountData(data);
          }}
        />
      )}

      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded shadow-md max-w-sm w-full text-center">
          <h2 className="text-lg font-bold mb-3 text-red-600">
            Session Expired
          </h2>
          <p className="text-gray-700 mb-5">
            Your session has expired. <br />
            Please choose an option below.
          </p>
          <div className="flex justify-center gap-4  text-sm ">
            <button
              onClick={() => router.push("/")}
              className="bg-gray-200 text-black px-4 py-1 cursor-pointer rounded hover:bg-gray-300 transition"
            >
              Go to Home Page
            </button>
            <button
              onClick={() => setShowLoginModal(true)}
              className="bg-orange-500 text-white  px-4 py-1 cursor-pointer rounded hover:bg-orange-600 transition"
            >
              Login Again
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
