"use client";

import ProjectApiList from "@/app/api/ProjectApiList";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import axios from "axios";

type OtplessUser = {
  userId: string;
  identities: {
    identityValue: string;
    identityType?: string;
  }[];
};

declare global {
  interface Window {
    otpless: (user: OtplessUser) => void;
  }
}

export default function LoginPage() {
  const router = useRouter();
  const { api_otplessCallback } = ProjectApiList();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://otpless.com/v4/auth.js";
    script.id = "otpless-sdk";
    script.type = "text/javascript";
    script.setAttribute("data-appid", "HH4FMVL4I4B6B16IZZJH");
    document.body.appendChild(script);

    // Handle OTPless callback
    window.otpless = async (otplessUser: OtplessUser) => {
      const waId = otplessUser.userId;
      const mobile = otplessUser.identities[0]?.identityValue || "Unknown";

      try {
        const res = await axios.post(api_otplessCallback, { waId, mobile });
        const data = res.data;

        if (!data.userExists) {
          router.push(
            `/pages/auth/createAccount?waId=${waId}&mobile=${encodeURIComponent(
              mobile
            )}`
          );
        } else if (data.token) {
          localStorage.setItem("token", data.token);
          router.push("/pages/cart");
        }
      } catch (error) {
        console.error("OTPless login failed:", error);
      }
    };
  }, [api_otplessCallback, router]); // ✅ fixed missing dependencies

  return (
    <div className="flex justify-center items-center mt-10">
      <div id="otpless-login-page"></div>
    </div>
  );
}
