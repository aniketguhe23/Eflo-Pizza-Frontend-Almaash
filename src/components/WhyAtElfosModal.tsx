// components/WhyAtElfosModal.tsx
"use client";

import Image from "next/image";

interface WhyAtElfosModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  image: string;
}

export default function WhyAtElfosModal({
  open,
  onClose,
  title,
  description,
  image,
}: WhyAtElfosModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full relative flex flex-col overflow-hidden">
        
        {/* Image - same style as cards */}
        <div className="w-full h-64 relative overflow-hidden">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        {/* Content */}
        <div className="p-6 text-center flex flex-col flex-1">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-gray-700 mb-6">{description}</p>

          {/* Bottom Close Button */}
          <button
            onClick={onClose}
            className="mt-auto bg-[#f04f04] text-white px-6 py-2 rounded-full font-bold hover:bg-[#d94303] transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
