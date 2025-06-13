"use client";


interface OrderModalProps {
  onClose: () => void;
}

export default function OrderModal({ onClose }: OrderModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <h2 className="text-lg font-bold text-gray-900 flex-1 text-center mr-8">
            Order # 38482939746352
          </h2>
          <button
            onClick={onClose}
            className="text-orange-500 text-2xl font-bold hover:text-orange-600 transition-colors cursor-pointer"
          >
            X
          </button>
        </div>

        {/* Restaurant Info */}
        <div className="p-4 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="flex justify-center items-end space-x-1">
              <h3 className="font-bold text-xl text-gray-900">ELFO&apos;S PIZZA</h3>
              <p className="text-sm text-gray-500 italic">- ARERA COLONY</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mt-1">
              <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <div>
              <p className="text-sm">
                <span className="font-semibold">Home :</span> Golden City, Mirsrod, Bhopal,
              </p>
              <p className="text-sm">Madhya Pradesh 462047, INDIA (13)</p>
            </div>
          </div>
        </div>

        {/* Dividers and delivery info */}
        <div className="flex justify-center items-center mt-3">
          <hr className="border-gray-600 w-[85%]" />
        </div>
        <div className="p-4 text-center">
          <p className="text-base text-gray-600">
            Delivered on Wed, Jan 15 - 2025 at 07:36 PM
          </p>
        </div>
        <div className="flex justify-center items-center">
          <hr className="border-gray-600 w-[85%]" />
        </div>

        {/* Items */}
        <div className="p-4 px-10">
          <h3 className="text-lg font-bold text-center mb-4">2 ITEMS</h3>
          <div className="space-y-4">
            {/* 7-Cheese Pizza */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">7-CHEESE PIZZA</h4>
                <p className="text-sm text-gray-500">MEDIUM</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">1</span>
                <span className="font-bold text-orange-500">610</span>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <div className="w-10 h-10 bg-orange-300 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Supper Paneer */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h4 className="font-bold text-gray-900">SUPPER PANEER</h4>
                <p className="text-sm text-gray-500">SMALL</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="bg-gray-100 px-2 py-1 rounded text-sm font-medium">1</span>
                <span className="font-bold text-orange-500">355</span>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <div className="w-10 h-10 bg-orange-400 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="p-4 space-y-3 px-15 ">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-gray-600">Item Total</span>
            <span className="font-medium">965</span>
          </div>
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="text-orange-500">Item discount</span>
            <span className="text-orange-500">-211</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 flex items-center">
              Delivery
              <span className="ml-2 bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">i</span>
            </span>
            <span className="text-orange-500 font-medium">FREE</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">GST and Restaurant Charges</span>
            <span className="text-gray-700">33.3</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>TOTAL</span>
            <span className="text-orange-500">787</span>
          </div>
          <div className="">
            <p className="font-semibold text-black">Paid Via Credit/Debit card</p>
          </div>
        </div>
      </div>
    </div>
  );
}
