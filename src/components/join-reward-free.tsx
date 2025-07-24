"use client";

import CreateAccountModal from "@/app/pages/auth/createAccount/CreateAccountModal";
import LoginModal from "@/app/pages/auth/login/LoginModal";
import { useUserStore } from "@/app/store/useUserStore";
import Link from "next/link";
import { useState } from "react";

export default function JoinRewardFree() {
  const { user } = useUserStore();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [createAccountData, setCreateAccountData] = useState<{
    waId: string;
    mobile: string;
  } | null>(null);

  return (
    <>
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          setShowLoginModal={setShowLoginModal}
          onTriggerCreateAccount={(data) => {
            setShowLoginModal(false);
            setCreateAccountData(data);
          }}
        />
      )}

      {createAccountData && (
        <CreateAccountModal
          onClose={() => setCreateAccountData(null)}
          waId={createAccountData.waId}
          mobile={createAccountData.mobile}
        />
      )}

      <div className="bg-[#eeeeee] py-4 sm:py-5 px-4 sm:px-6 md:px-10 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 text-base sm:text-lg md:text-xl lg:text-2xl font-bold [font-family:'Barlow_Condensed',Helvetica]">
        <span className="text-black uppercase tracking-wide text-center md:text-left">
          {user
            ? "You’re in! Get ready for cheesy goodness."
            : "JOIN ELFO’S REWARDS UNLOCK FREE"}
        </span>

        <div className="flex items-center gap-2 md:gap-3 text-center md:text-right">
          {user ? (
            <Link href="/pages/myAccount" className="relative uppercase">
              go to <span className="text-[#f47335] px-2 hover:underline">Profile</span>
            </Link>
          ) : (
            <button onClick={() => setShowLoginModal(true)}>
              <span className="text-[#f47335] cursor-pointer uppercase hover:underline">
                Join <span className="text-black px-2 hover:underline">OR</span> SIGN IN
              </span>
            </button>
          )}
        </div>
      </div>
    </>
  );
}
