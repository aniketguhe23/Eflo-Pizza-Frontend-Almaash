import Image from "next/image";
import Link from "next/link";
import { GoChecklist } from "react-icons/go";

interface SpecialtyItemProps {
  image: string;
  title: string;
  description: string;
  imagePosition?: "left" | "right";
}

export default function SpecialtyItem({
  image,
  title,
  description,
  imagePosition = "left",
}: SpecialtyItemProps) {
  return (
    <div
      className={`bg-[#fef6ec] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-md ${
        imagePosition === "right" ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="relative md:w-1/2">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          width={600}
          height={400}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#fef6ec] via-[#fef6ec]/30 to-transparent md:block hidden" />
      </div>

      <div className="md:w-1/2 p-8 flex flex-col justify-center bg-[#fef6ec] text-center">
        <h3 className="text-3xl  font-semibold text-black mb-3 uppercase [font-family:'Gotham-Bold',Helvetica]">
          {title}
        </h3>
        <p className="text-base font-semibold text-black mb-6 leading-snug">
          {description}
        </p>

        <Link href="/order">
          <button className="bg-[#f47335] hover:bg-[#e5631d] [font-family:'Barlow_Condensed',Helvetica] transition-colors text-white px-4 py-2 rounded-md flex items-center text-xl font-semibold shadow float-end cursor-pointer">
            <GoChecklist />

            <span className="mx-2">ORDER NOW</span>
          </button> 
        </Link>
      </div>
    </div>
  );
}
