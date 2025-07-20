import { MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export interface Store {
  id: number;
  name: string;
  location: string;
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
    <div className="border border-gray-200 rounded-lg shadow-sm bg-white">
      <div className="p-6">
        <div className="gap-4">
          <div className="flex justify-between items-center pb-2">
            <div className="flex items-center justify-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src={store.image || "/elephant.png"}
                  alt={`${store.name} Logo`}
                  width={60}
                  height={60}
                  className="object-cover"
                />
              </div>
              <div className="pt-2 ml-2">
                <h3 className="font-bold text-lg text-gray-900 mb-1">
                  {store.name.toUpperCase()}
                </h3>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="pt-2 ml-2">
                <h3 className=" text-sm text-gray-400 mb-1">
                  {store.restaurants_no}
                </h3>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex items-start gap-2 text-gray-500 mb-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{store.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <Clock className="w-4 h-4 text-black" />
              <span className="text-sm">
                <span className="text-black">Open from</span>{" "}
                {store.today_opening_time && store.today_closing_time
                  ? `${store.today_opening_time} to ${store.today_closing_time}`
                  : "Set restaurant hours first"}
              </span>
            </div>

            {store?.isClosed === true || store?.is_active === false ? (
              <div className="w-full block bg-gray-500 text-white py-1 rounded-md text-center cursor-not-allowed">
                Closed
              </div>
            ) : (
              <Link
                href={{
                  pathname: "/pages/store-menu",
                  query: { location: store.restaurants_no },
                }}
                className="w-full block bg-orange-500 hover:bg-orange-600 text-white py-1 rounded-md text-center"
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
