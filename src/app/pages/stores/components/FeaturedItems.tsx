import Image from "next/image";

type FeaturedItem = {
  id: string | number;
  name: string;
  image: string;
  price: number;
};


export default function FeaturedItems({ items }: { items: FeaturedItem[] }) {
  return (
    <div className="mb-8">
      <h2 className="text-xl text-center mb-6 relative">
        <span className="bg-[#eeeeee] px-4 relative z-10">FEATURED ITEMS</span>
        <div className="absolute inset-0 flex items-center z-0">
          <div className="w-full border-t border-black" />
        </div>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((item:FeaturedItem) => (
          <div
            key={item.id}
            className="bg-black text-white rounded-xl overflow-hidden shadow-lg relative"
          >
            <div className="relative h-60 w-full">
              {/* Product Image */}
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
              />

              {/* Gradient overlays */}
              <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent p-4 pointer-events-none" />
              <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-black/90 to-transparent pointer-events-none" />
              <div className="absolute top-0 bottom-0 right-0 w-1/5 bg-gradient-to-l from-black/80 to-transparent pointer-events-none" />

              {/* Text content */}
              <div className="absolute top-0 left-0 right-0 p-4 z-10">
                <div className="w-5 h-5 border border-green-700 rounded-sm flex items-center justify-center bg-white">
                  <div className="w-3 h-3 bg-green-700 rounded-full" />
                </div>
                <h3 className="pt-2 pr-40">{item.name}</h3>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                <p className="text-lg ">₹ {item.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
