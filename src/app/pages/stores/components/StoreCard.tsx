import { MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface Store {
  id: number;
  name: string;
  location: string;
  locality: string;
  hours: string;
  image?: string;
  restaurants_no?: string;
  isClosed: boolean;
  is_active: boolean;
  today_closing_time: string;
  today_opening_time: string;
}

interface StoreCardProps {
  store: Store;
}

export default function StoreCard({ store }: StoreCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm bg-white w-full max-w-md mx-auto">
      <div className="p-4 sm:p-6">
        <div className="gap-4">
          {/* Top section: Logo and Store Name */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2 gap-3">
            {/* Logo + Name */}
            <div className="flex items-center">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src={store.image || "/elephant.png"}
                  alt={`${store.name} Logo`}
                  width={56}
                  height={56}
                  className="object-cover"
                />
              </div>
              <div className="ml-3">
                <h3 className="font-bold text-base sm:text-lg text-gray-900">
                  {store.name.toUpperCase()}
                </h3>
              </div>
            </div>

            {/* Store number */}
            <div>
              <h3 className="text-sm text-gray-400">{store.restaurants_no}</h3>
            </div>
          </div>

          {/* Location and Timings */}
          <div className="flex-1">
            <div className="flex items-start gap-2 text-gray-500 mb-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="text-sm sm:text-base">
                {`${store.locality}, ${store.location}`
                  .toLowerCase()
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <Clock className="w-4 h-4 text-black" />
              <span className="text-sm sm:text-base">
                <span className="text-black">Open from</span>{" "}
                {store.today_opening_time && store.today_closing_time
                  ? `${store.today_opening_time} to ${store.today_closing_time}`
                  : "Set restaurant hours first"}
              </span>
            </div>

            {/* Dine-In / Closed Button */}
            {store?.isClosed === true || store?.is_active === false ? (
              <div className="w-full block bg-gray-500 text-white py-2 rounded-md text-center cursor-not-allowed text-sm sm:text-base">
                Closed
              </div>
            ) : (
              <Link
                href={{
                  pathname: "/pages/store-menu",
                  query: { location: store.restaurants_no },
                }}
                className="w-full block bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-md text-center text-sm sm:text-base"
              >
                Dine-In
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
