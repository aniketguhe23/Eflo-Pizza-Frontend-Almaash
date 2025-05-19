import Image from "next/image";
import React from "react";

const PizzaAboutSection = () => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-12 [font-family:'Barlow_Condensed',Helvetica]">
      {/* Left Side */}
      <div className="flex flex-col gap-8">
        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/pizzaAbout.jpg"
            alt="Pizza preparation"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h3 className="text-orange-600 font-semibold uppercase text-xl">
            Nearest Shop
          </h3>
          <h2 className="text-2xl md:text-3xl  leading-tight uppercase pr-30">
            We are the top pizza shop near you
          </h2>
          <p className="mt-1 font-semibold">
            At Elfo&apos;s We Give Gourmet Quality At Fast Food Prices!
          </p>

          <div className="relative mt-6 space-y-4 uppercase">
            <div className="relative flex  gap-4 before:absolute before:top-0 before:left-0 before:w-full before:h-[2px] before:bg-[#e5e5e5] before:shadow-md before:z-[-1] justify-center items-center  pt-3">
              <p className="text-orange-600 text-5xl font-extrabold">YES</p>
              <p className="font-semibold text-xl pr-20">
                To authentic recipes, imported ingredients
              </p>
            </div>

            <div className="relative flex justify-center  items-center gap-4 before:absolute before:top-0 before:left-0 before:w-full before:h-[2px] before:bg-[#e5e5e5] before:shadow-md before:z-[-1] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#e5e5e5] after:shadow-md after:z-[-1] pb-3 pt-3">
              <p className="text-black text-5xl font-extrabold">NO</p>
              <p className="font-semibold text-xl pr-35 pl-3">
                To low quality and sub-par ingredients
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col gap-8">
        <div>
          <h3 className="text-orange-600 font-semibold uppercase text-2xl">
            About
          </h3>
          <h2 className="text-2xl md:text-3xl  mt-2 leading-tight pr-33 pt-5">
            We believe that Elfo’s Pizza is the best in India
          </h2>
          <p className="mt-3 font-bold">Veg & Jain pizza near you</p>
          <p className="mt-2 text-xs text-gray-700 [font-family:'Nunito_Sans',Helvetica]">
            If you’re craving a delicious vegetarian pizza with fresh
            ingredients and bold flavors, Elfo’s pizza is your ultimate
            destination! From classic vegetarian margherita to fully loaded
            veggie delights and expertly crafted Jain pizza made without onion
            and garlic, we have something for every vegetarian food lover. At
            Elfo’s Pizza, we pride ourselves on delivering high-quality,
            flavorful vegetarian options that cater to Jain and other dietary
            preferences. Visit us today or order online to enjoy the best
            vegetarian pizza experience in town!
          </p>
        </div>

        <div className="relative w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
          <Image
            src="/about2.png"
            alt="Pizzeria interior"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default PizzaAboutSection;
