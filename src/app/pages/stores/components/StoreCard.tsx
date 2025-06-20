import { MapPin, Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


type Store = {
  location: string;
  hours: string;
};

export default function StoreCard({ store }: { store: Store }) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-sm bg-white">
      <div className="p-6">
        <div className=" gap-4">
          <div className="flex justify-start items-center pb-2">
            <div className="w-12 h-12 rounded-full flex items-center justify-center">
              {/* <Smartphone className="w-6 h-6 text-orange-500" /> */}
              <Image
                src={"/elephant.png"}
                alt="Elfo's Pizza Logo"
                width={60}
                height={60}
              />
            </div>
            <div className="pt-2">
              <h3 className="font-bold text-lg text-gray-900 mb-1">
                ELFO&apos;S PIZZA
              </h3>
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-start gap-2 text-gray-500 mb-2">
              <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="text-sm">{store.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 mb-4">
              <Clock className="w-4 h-4 text-black" />
              <span className="text-sm ">
                {" "}
                <span className="text-black">Open from</span> {store.hours}
              </span>
            </div>

            <Link
              href={{
                pathname: "/pages/store-menu",
                query: { location: store.location },
              }}
              className="w-full block bg-orange-500 hover:bg-orange-600 text-white py-1 cursor-pointer rounded-md text-center"
            >
              Dine-In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
