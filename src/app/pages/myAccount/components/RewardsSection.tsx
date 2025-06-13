"use client";

export default function RewardsSection() {
  return (
    <div className="space-y-6 text-center">
<h2 className="text-4xl font-bold mb-2">ESBY&apos;S REWARD PROGRAM</h2>
      <p className="text-orange-500 text-3xl font-semibold mb-2 italic pt-5 pb-5">
        GET FLAT 10% OFF FOR EVERY 10 POINTS
      </p>
      <p className="text-lg text-gray-600 mb-4">
        1 POINT FOR EVERY INR 200 SPENT
      </p>
      <div className="text-3xl font-bold mb-6">YOUR POINTS : 6</div>

      <h3 className="text-lg font-semibold mb-4 italic">Your rewards...</h3>
      <div className="max-w-sm mx-auto border rounded-lg shadow-sm bg-white p-6">
        <div className="flex justify-center items-center">
          <div className=" w-[40%] pr-2">
            <div className="text-2xl font-bold">FLAT 10% OFF</div>
            <div className="text-sm text-gray-600">VALID TILL 26-2-2025</div>
          </div>
          <div className="border-l-2 border-dotted border-gray-500 pl-4">
            <div className="text-sm text-gray-600">USE CODE:</div>
            <div className="font-bold text-2xl ">ESBY2536477</div>
          </div>
        </div>
      </div>
    </div>
  );
}
