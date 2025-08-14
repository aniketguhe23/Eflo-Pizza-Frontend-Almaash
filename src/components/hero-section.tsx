import { useHomeStore } from "@/app/store/homeStore";
import Link from "next/link";

export default function HeroSection() {
  const { data } = useHomeStore();

  return (
    <section
      className="relative px-6 py-30 mt-10 flex flex-col items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage: `url('${data?.hero_img ?? "/hearobg.png"}')`,
      }}
    >
      <div className="absolute inset-0 bg-black opacity-10 z-0" />

      <div className="z-10 max-w-xl px-4">
        {/* Title */}
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight font-Aclonica">
          {data?.hero_title_1 ?? "TIMELESS DELICIOUS PIZZA"}
        </h2>

        {/* Subtitle */}
        <h3 className="text-white text-lg sm:text-xl md:text-2xl mt-4 sm:mt-6 font-semibold">
          {data?.hero_title_2 ?? "DONE THE ELFO WAY"}
        </h3>

        {/* Paragraph */}
        <p className="text-white text-sm sm:text-base md:text-lg mt-4 max-w-md mx-auto">
          {data?.hero_title_3 ?? (
            <>
              Crafted with the finest, freshest ingredients and topped with our
              signature house-made sauces. Savor the highest quality flavors.
            </>
          )}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6 sm:mt-8 justify-center text-white">
          <Link href="/pages/menu?from=homepage">
            <button className="bg-[#f47335] hover:bg-[#f47335] px-6 sm:px-10 py-2 sm:py-3 rounded-md font-bold text-lg sm:text-xl cursor-pointer">
              {data?.hero_button_1 ?? "ORDER NOW"}
            </button>
          </Link>
          <Link href="/pages/build?from=homepage">
            <button className="bg-[#f47335] hover:bg-[#f47335] px-6 sm:px-8 py-2 sm:py-3 rounded-md font-bold text-lg sm:text-xl cursor-pointer">
              {data?.hero_button_2 ?? "BUILD YOUR OWN"}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
