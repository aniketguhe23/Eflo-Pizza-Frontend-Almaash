import Image from "next/image";

type MenuItem = {
  id: string | number;
  name: string;
  price: number;
  description: string;
  image: string;
  available: boolean;
};

export default function MenuItems({ items }: { items: MenuItem[] }) {
  return (
    <div>
      <h2 className="text-xl  text-center mb-6 relative">
        <span className="bg-[#eeeeee] px-4 relative z-10">MENU</span>
        <div className="absolute inset-0 flex items-center z-0">
          <div className="w-full border-t border-black"></div>
        </div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item:MenuItem) => (
          <div
            key={item.id}
            className={`flex items-center justify-between bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.12)] p-4 ${
              !item.available ? "border-red-500 border" : ""
            }`}
          >
            {/* Left side */}
            <div className="flex-1">
              {/* VEG Icon  */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 border border-green-700 rounded-sm flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-700 rounded-full" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold">{item.name}</h3>

              {/* Price */}
              <p className="text-base font-bold mb-1">₹ {item.price}</p>

              {/* Description */}
              <p className="text-base text-gray-600">{item.description}</p>
            </div>

            {/* Right side - Image & ADD */}
            <div className="relative w-40 h-30 rounded-lg">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded-lg"
              />
              <div className="absolute -inset-3 flex items-end justify-center">
                {item.available ? (
                  <button className="text-xs px-3 py-1 bg-white text-gray-800 rounded-lg shadow hover:bg-gray-100 cursor-pointer">
                    ADD +
                  </button>
                ) : (
                  <span className="text-xs px-2 py-1 bg-red-600 text-white rounded">
                    OUT OF STOCK
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
