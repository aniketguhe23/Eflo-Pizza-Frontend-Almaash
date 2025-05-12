import Image from "next/image"
import Link from "next/link"
import { GoChecklist } from "react-icons/go";


interface SpecialtyItemProps {
  image: string
  title: string
  description: string
}

export default function SpecialtyItem({ image, title, description }: SpecialtyItemProps) {
  return (
    <div className="relative w-full h-[350px] rounded-2xl overflow-hidden shadow-md">
      <img
        src={image || "/placeholder.svg"}
        alt={title}
        // fill
        className="object-cover w-full h-full scale-110" // zooms the image
      />

      {/* Gradient overlay on left */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-transparent" />

      {/* Text content over image */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10 max-w-xl pl-10">
        <h3 className="text-3xl  font-semibold text-black mb-3 uppercase [font-family:'Gotham-Bold',Helvetica] ">{title}</h3>
        <p className="text-sm font-bold text-black mb-5">{description}</p>

        <Link href="/order">
          <button className="bg-[#f47335] hover:bg-[#e5631d] [font-family:'Barlow_Condensed',Helvetica] transition-colors text-white px-4 py-2 rounded-md flex items-center text-xl font-semibold shadow cursor-pointer">
          <GoChecklist />

            <span className="mx-2">ORDER NOW</span>
            
          </button>
        </Link>
      </div>
    </div>
  )
}
