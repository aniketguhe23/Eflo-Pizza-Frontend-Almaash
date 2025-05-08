import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative px-6 py-12 md:px-12 flex flex-col md:flex-row items-center bg-[#f47335]">
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
        <h2 className="text-white text-5xl md:text-6xl leading-tight  [font-family:'Aclonica',Helvetica]">
          TIMELESS
          <br />
          DELICIOUS
          <br />
          PIZZA
        </h2>

        <h3 className="text-white text-xl font-semibold mt-6">
          DONE THE ELFO WAY
        </h3>

        <p className="text-white mt-4 max-w-md">
          Crafted with the finest, freshest ingredients and topped with our
          signature house-made sauces. Savor the highest quality flavors.
        </p>

        <div className="flex gap-4 mt-8">
          <Link href="/order">
            <button className="bg-white hover:bg-gray-200 [font-family:'Barlow_Condensed',Helvetica] px-8 py-3 rounded-md font-bold text-black  text-2xl cursor-pointer">
              ORDER NOW
            </button>
          </Link>
          <Link href="/build">
            <button className="bg-[#fbcbb2] hover:bg-white text-[#f47335] [font-family:'Barlow_Condensed',Helvetica] px-8 py-3 rounded-md font-bold text-2xl cursor-pointer">
              BUILD YOUR OWN
            </button>
          </Link>
        </div>
      </div>

      {/* Right side pizza image */}
      <div className="md:w-1/2 mt-12 md:mt-0 flex justify-center">
        <Image
          src="/pizzacopy.png"
          alt="Delicious Pizza"
          width={600}
          height={600}
          className="rounded-full"
        />
      </div>
    </section>
  );
}
