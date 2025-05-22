import { useHomeStore } from "@/app/store/homeStore";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  const { data } = useHomeStore();


  return (
    <section
      className={`relative px-6 py-12 md:px-12 flex flex-col md:flex-row items-center ${
        data?.hero_bg_color ? `bg-[${data?.hero_bg_color}]` : "bg-[#f47335]"
      }`}
    >
      {/* Decorative elephant logos */}
      <div className="absolute flex justify-between items-center gap-4 opacity-50 mb-8 w-[90%]">
        <div className="mt-0 -rotate-16">
          <Image
            src="/elephantBW.png"
            alt="Decorative logo"
            width={120}
            height={120}
          />
        </div>
        <div className="mt-120 -rotate-16">
          <Image
            src="/elephantBW.png"
            alt="Decorative logo"
            width={120}
            height={120}
          />
        </div>
        <div className="-mt-120 -rotate-16">
          <Image
            src="/elephantBW.png"
            alt="Decorative logo"
            width={120}
            height={120}
          />
        </div>
      </div>

      {/* Left side content */}
      <div className=" z-10 mx-40">
        <h2 className="text-white text-6xl leading-tight pr-20  [font-family:'Aclonica',Helvetica]">
          {data?.hero_title_1 ? (
            data?.hero_title_1
          ) : (
            <>TIMELESS DELICIOUS PIZZA</>
          )}
        </h2>

        <h3 className="text-white text-xl font-semibold mt-6">
          {data?.hero_title_2 ? data?.hero_title_2 : <>DONE THE ELFO WAY</>}
        </h3>

        <p className="text-white mt-4 max-w-md">
          {data?.hero_title_3 ? (
            data?.hero_title_3
          ) : (
            <>
              {" "}
              Crafted with the finest, freshest ingredients and topped with our
              signature house-made sauces. Savor the highest quality flavors.
            </>
          )}
        </p>

        <div className="flex gap-4 mt-8">
          <Link href="/order">
            <button className="bg-white hover:bg-gray-200 [font-family:'Barlow_Condensed',Helvetica] px-8 py-3 rounded-md font-bold text-black  text-2xl cursor-pointer">
              {data?.hero_button_1 ? data?.hero_button_1 : <> order now</>}
            </button>
          </Link>
          <Link href="/build">
            <button className="bg-[#fbcbb2] hover:bg-white text-[#f47335] [font-family:'Barlow_Condensed',Helvetica] px-8 py-3 rounded-md font-bold text-2xl cursor-pointer">
              {data?.hero_button_2 ? data?.hero_button_2 : <> BUILD YOUR OWN</>}
            </button>
          </Link>
        </div>
      </div>

      {/* Right side pizza image */}
      <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
        <Image
          src={`${data?.hero_img ? data?.hero_img : "/pizzacopy.png"}`}
          alt="Delicious Pizza"
          width={600}
          height={600}
          className="rounded-full"
        />
      </div>
    </section>
  );
}
