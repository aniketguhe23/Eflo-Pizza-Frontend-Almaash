import { useHomeStore } from "@/app/store/homeStore";
import Link from "next/link";

export default function HeroSection() {
  const { data } = useHomeStore();

  return (
    <section
      className={`
        relative px-6 py-30 mt-10  flex flex-col items-center justify-center text-center
        bg-[url('/hearobg.png')] bg-cover bg-center`}
    >
      {/* Optional: Overlay to darken background for better readability */}
      <div className="absolute inset-0 bg-black opacity-10 z-0" />

      <div className="z-10 max-w-lg">
        <h2 className="text-white text-6xl leading-tight [font-family:'Aclonica',Helvetica]">
          {data?.hero_title_1 ?? "TIMELESS DELICIOUS PIZZA"}
        </h2>

        <h3 className="text-white text-xl font-semibold mt-6">
          {data?.hero_title_2 ?? "DONE THE ELFO WAY"}
        </h3>

        <p className="text-white mt-4 max-w-md mx-auto">
          {data?.hero_title_3 ?? (
            <>
              Crafted with the finest, freshest ingredients and topped with our
              signature house-made sauces. Savor the highest quality flavors.
            </>
          )}
        </p>

        <div className="flex gap-4 mt-8 justify-center text-white">
          <Link href="/pages/menu">
            <button className="bg-[#f47335] hover:bg-[#f2550d]  [font-family:'Barlow_Condensed',Helvetica] px-13 py-3 rounded-md font-bold text-2xl cursor-pointer">
              {data?.hero_button_1 ?? "order now"}
            </button>
          </Link>
          <Link href="/pages/build">
            <button className="bg-[#f47335]   hover:bg-[#f2550d] [font-family:'Barlow_Condensed',Helvetica] px-8 py-3 rounded-md font-bold text-2xl cursor-pointer">
              {data?.hero_button_2 ?? "BUILD YOUR OWN"}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
