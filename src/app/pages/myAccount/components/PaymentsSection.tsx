"use client";

export default function PaymentsSection() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-3xl font-bold mb-4">Saved Cards</h3>
        <div className=" shadow-sm bg-white p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center">
                <div className="w-6 h-6 bg-orange-400 rounded-full opacity-80"></div>
              </div>
              <div>
                <div className="font-semibold text-xl">XXXX-XXXXXXXX-4663</div>
                <div className="text-sm text-gray-600">VALID TILL 02/2028</div>
              </div>
            </div>
            <button className="text-orange-500 text-lg font-semibold cursor-pointer">
              DELETE
            </button>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-3xl font-bold mb-4">Saved UPI</h3>
        <div className=" shadow-sm bg-white p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-blue-600 font-bold text-lg">paytm</div>
              <div className="font-semibold text-2xl">9343607321@paytm</div>
            </div>
            <button className="text-orange-500 text-lg font-semibold cursor-pointer">
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
