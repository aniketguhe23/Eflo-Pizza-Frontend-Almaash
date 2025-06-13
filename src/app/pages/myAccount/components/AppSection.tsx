"use client";

import Image from "next/image";

export default function AppSection() {
  return (
    <div className="flex-col justify-center items-center text-center space-y-6">
      <div className=" rounded-lg p-8">
        <div className="w-20 h-20 bg-orange-500 rounded-lg mx-auto mb-4 flex items-center justify-center">
          <Image
            src="/elephant-orange.png"
            alt="Download on App Store"
            width={120}
            height={40}
            className="rounded border border-black"
          />
        </div>
        <h2 className="text-4xl font-bold mb-2">DOWNLOAD OUR APP NOW!</h2>
        <p className="text-gray-600 mb-6 text-lg">
          DOWNLOAD OUR APP FOR EXCLUSIVE BENEFITS AND EASY ORDERING.....
        </p>
        <div className="flex justify-center gap-4">
          <Image
            src="/Download App Store.png"
            alt="Download on App Store"
            width={120}
            height={40}
            className="rounded"
          />
          <Image
            src="/Download play Store.png.png"
            alt="Get it on Google Play"
            width={120}
            height={40}
            className="rounded"
          />
        </div>
      </div>
    </div>
  );
}
