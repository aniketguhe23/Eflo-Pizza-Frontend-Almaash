import Image from "next/image";
import Link from "next/link";
import { GoChecklist } from "react-icons/go";

interface SpecialtyItemProps {
  image: string;
  title: string;
  description: string;
  imagePosition?: "left" | "right"; // optional if you want to reverse gradient direction
}

export default function SpecialtyItem({
  image,
  title,
  description,
  imagePosition = "left",
}: SpecialtyItemProps) {
  return (
    <div className="relative w-full h-[350px] rounded-2xl overflow-hidden shadow-md">
      {/* Full background image */}
      <Image
        src={image || "/placeholder.svg"}
        alt={title}
        fill
        className="object-cover"
      />

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 ${
          imagePosition === "right"
            ? "bg-gradient-to-r from-white via-[#fef6ec]/10 to-transparent"
            : "bg-gradient-to-l from-white via-[#fef6ec]/10 to-transparent"
        }`}
      />

      {/* Text content */}
      <div className="absolute inset-0 flex items-center justify-end px-8 md:px-16 z-10 text-center">
        <div className="max-w-md">
          <div className=" ">
            <h3 className="text-3xl font-semibold text-black mb-3 uppercase [font-family:'Gotham-Bold',Helvetica]">
              {title}
            </h3>
          </div>
          <p className="text-base font-semibold text-black mb-6 leading-snug">
            {description}
          </p>

          <Link href="/order">
            <button className="bg-[#f47335] hover:bg-[#e5631d] [font-family:'Barlow_Condensed',Helvetica] transition-colors text-white px-4 py-2 rounded-md flex items-center justify-center mx-auto text-xl font-semibold shadow cursor-pointer">
              <GoChecklist />
              <span className="mx-2">ORDER NOW</span>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
