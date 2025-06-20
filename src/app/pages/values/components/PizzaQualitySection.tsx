import React from "react";
import Image from "next/image";
import { useValuesStore } from "@/app/store/useValuesStore";

const PizzaQualitySection = () => {
  const { valueData } = useValuesStore();

  return (
    <section className="bg-[#FEF6E4] py-16 px-6 md:px-12 [font-family:'Barlow_Condensed',Helvetica]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 items-center gap-10">
        {/* Left Column: Text */}
        <div className="text-black">
          <h2 className="text-4xl font-semibold uppercase">
            {valueData?.best_pizza_heading ?? "Best Pizza Near You Means"}
          </h2>
          <h3 className="text-4xl text-orange-500 font-semibold uppercase">
            {valueData?.best_pizza_heading2 ??
              "Every Ingredient is the  Highest Quality."}
          </h3>

          <p className="text-lg font-semibold pt-4 pb-5">
            {valueData?.best_pizza_title ??
              "Best Pizza In Bhopal Means…Our Pizza, Your Rules"}
          </p>

          <p className="text-sm text-gray-700 font-semibold leading-relaxed [font-family:'Nunito_Sans',Helvetica]">
            {valueData?.best_pizza_desc ??
              "At Elfo’s Pizza, we pride ourselves on being the first in Bhopal to make full customization of your pizzas according to your taste. With our customized delivery near you, your dream pizza is a few steps away. Looking for “delivery near me”? Come right this way because Elfo’s Pizza is hot and fresh every time. Craving something delicious? Don’t wait; order online now and find out why Elfo’s Pizza is the ultimate choice for pizza lovers. Order online today!"}
          </p>
        </div>

        {/* Right Column: Image & CTA */}
        <div className="flex flex-col items-center justify-center gap-16">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-8 rounded shadow transition-all duration-200 cursor-pointer ml-10">
            ORDER NOW
          </button>

          <div className="relative w-[220px] h-[220px] ml-32">
            {/* Background Image - larger & moved left */}
            <div className="absolute top-1/2 left-1/2 w-[250px] h-[250px] -translate-x-[65%] -translate-y-1/2 z-0">
              <Image
                src= {valueData?.best_pizza_img1 ??
              "qualitySection2.png"}
                alt="Background Decoration"
                width={250}
                height={250}
                className="object-contain"
              />
            </div>

            {/* Foreground Image (Pizza) */}
            <div className="absolute top-1/2 left-1/2 w-[190px] h-[190px] -translate-x-1/2 -translate-y-1/2 z-10 border rounded-full overflow-hidden shadow-lg">
              <Image
              src= {valueData?.best_pizza_img2 ??
              "pizzacopy.png"}
                // src="/pizzacopy.png"
                alt="Specialty Pizza"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PizzaQualitySection;
