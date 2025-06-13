"use client";

import { useState, useEffect, useRef } from "react";

interface CustomEditProfileModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

type PhoneState = "display" | "edit" | "verify" | "otp";
type EmailState = "display" | "edit" | "verify" | "otp";

export default function CustomEditProfileModal({
  isOpen,
  setIsOpen,
}: CustomEditProfileModalProps) {
  const [phoneState, setPhoneState] = useState<PhoneState>("display");
  const [emailState, setEmailState] = useState<EmailState>("display");

  const [phoneNumber, setPhoneNumber] = useState("9343607321");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");

  const [email, setEmail] = useState("shashwatbharadwaj2@gmail.com");
  const [newEmail, setNewEmail] = useState("");
  const [emailOtp, setEmailOtp] = useState("");

  const modalRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close modal
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        resetStates();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        resetStates();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey);
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handlePhoneChange = () => {
    setNewPhoneNumber(phoneNumber);
    setPhoneState("edit");
  };

  const handlePhoneVerify = () => {
    setPhoneState("otp");
    // Simulate sending OTP
    console.log("Sending OTP to:", newPhoneNumber);
  };

  const handlePhoneConfirm = () => {
    // Simulate OTP verification
    if (phoneOtp) {
      setPhoneNumber(newPhoneNumber);
      setPhoneState("display");
      setPhoneOtp("");
      console.log("Phone number updated successfully");
    }
  };

  const handleEmailChange = () => {
    setNewEmail(email);
    setEmailState("edit");
  };

  const handleEmailVerify = () => {
    setEmailState("otp");
    // Simulate sending OTP
    console.log("Sending OTP to:", newEmail);
  };

  const handleEmailConfirm = () => {
    // Simulate OTP verification
    if (emailOtp) {
      setEmail(newEmail);
      setEmailState("display");
      setEmailOtp("");
      console.log("Email updated successfully");
    }
  };

  const resetStates = () => {
    setPhoneState("display");
    setEmailState("display");
    setPhoneOtp("");
    setEmailOtp("");
    setNewPhoneNumber("");
    setNewEmail("");
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4 [font-family:'Barlow_Condensed',Helvetica]">
          <div
            ref={modalRef}
            className="bg-white rounded-lg w-full max-w-xs overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
          >
            {/* Modal Header */}
            <div className="p-6 pb-4 flex items-center justify-between">
              <h2 id="modal-title" className="text-3xl font-bold text-black">
                EDIT PROFILE
              </h2>
              <button
                onClick={() => {
                  setIsOpen(false);
                  resetStates();
                }}
                className="text-orange-500 hover:text-orange-600 cursor-pointer"
                aria-label="Close"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="px-6 pb-6 space-y-8 ">
              {/* Phone Number Section */}
              <div className="space-y-4">
                <label className="block text-lg font-bold text-black ">
                  {phoneState === "otp" ? "New Phone Number" : "Phone Number"}
                </label>

                {phoneState === "display" && (
                  <>
                    <div className="text-gray-600 text-base">{phoneNumber}</div>
                    <button
                      onClick={handlePhoneChange}
                      className="border border-orange-500 text-orange-500 hover:bg-orange-50 font-bold px-8 py-2 rounded cursor-pointer"
                    >
                      CHANGE
                    </button>
                  </>
                )}

                {phoneState === "edit" && (
                  <>
                    <input
                      type="text"
                      value={newPhoneNumber}
                      onChange={(e) => setNewPhoneNumber(e.target.value)}
                      className="w-full border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded p-2"
                      placeholder="Enter phone number"
                    />
                    <button
                      onClick={handlePhoneVerify}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-2 rounded cursor-pointer"
                    >
                      VERIFY
                    </button>
                  </>
                )}

                {phoneState === "otp" && (
                  <>
                    <input
                      type="text"
                      value={newPhoneNumber}
                      onChange={(e) => setNewPhoneNumber(e.target.value)}
                      className="w-full border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded p-2 mb-4"
                    />
                    <input
                      type="text"
                      value={phoneOtp}
                      onChange={(e) => setPhoneOtp(e.target.value)}
                      placeholder="OTP"
                      className="w-full border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded p-2"
                    />
                    <button
                      onClick={handlePhoneConfirm}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-2 rounded cursor-pointer"
                    >
                      CONFIRM
                    </button>
                  </>
                )}
              </div>

              {/* Email Section */}
              <div className="space-y-4">
                <label className="block text-lg font-bold text-black">
                  {emailState === "otp" ? "New Email ID" : "EMAIL ID"}
                </label>

                {emailState === "display" && (
                  <>
                    <div className="text-gray-600 text-base break-all">
                      {email}
                    </div>
                    <button
                      onClick={handleEmailChange}
                      className="border border-orange-500 text-orange-500 hover:bg-orange-50 font-bold px-8 py-2 rounded cursor-pointer"
                    >
                      CHANGE
                    </button>
                  </>
                )}

                {emailState === "edit" && (
                  <>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded p-2"
                      placeholder="Enter email address"
                    />
                    <button
                      onClick={handleEmailVerify}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-2 rounded cursor-pointer"
                    >
                      VERIFY
                    </button>
                  </>
                )}

                {emailState === "otp" && (
                  <>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded p-2 mb-4"
                    />
                    <input
                      type="text"
                      value={emailOtp}
                      onChange={(e) => setEmailOtp(e.target.value)}
                      placeholder="OTP"
                      className="w-full border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded p-2"
                    />
                    <button
                      onClick={handleEmailConfirm}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-2 rounded cursor-pointer"
                    >
                      CONFIRM
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
