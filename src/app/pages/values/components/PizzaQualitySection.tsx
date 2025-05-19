import React from "react";
import Image from "next/image";

const PizzaQualitySection = () => {
  return (
    <section className="bg-[#FEF6E4] py-16 px-6 md:px-12 [font-family:'Barlow_Condensed',Helvetica]">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 items-center gap-10">
        {/* Left Column: Text */}
        <div className=" text-black">
          <h2 className="text-4xl  font-semibold uppercase">
            Best Pizza Near You Means
          </h2>
          <h3 className="text-4xl  text-orange-500 font-semibold uppercase">
            Every Ingredient is the <br /> Highest Quality.
          </h3>

          <p className="text-lg font-semibold pt-4 pb-5">
            Best Pizza In Bhopal Means…Our Pizza, Your Rules
          </p>

          <p className="text-sm  text-gray-700 font-semibold leading-relaxed [font-family:'Nunito_Sans',Helvetica]">
            At Elfo’s Pizza, we pride ourselves on being the first in Bhopal to
            make full customization of your pizzas according to your taste. With
            our customized delivery near you, your dream pizza is a few steps
            away. Looking for “delivery near me”? Come right this way because
            Elfo’s Pizza is hot and fresh every time. Craving something
            delicious? Don’t wait; order online now and find out why Elfo’s
            Pizza is the ultimate choice for pizza lovers. Order online today!
          </p>
        </div>

        {/* Right Column: Image & CTA */}
        <div className="flex flex-col items-end justify-center gap-16">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded shadow transition-all duration-200 cursor-pointer">
            ORDER NOW
          </button>

          <div className="relative ml-60">
            {/* Background Image */}
            <img
              src="/qualitySection2.png"
              alt="Background Decoration"
              width={800} // ⬅️ increased from 600
              height={800} // ⬅️ increased from 600
              className="absolute inset-0 object-cover -ml-20 -rotate-12 scale-110 z-0"
            />

            {/* Foreground Image (Pizza) */}
            <img
              src="/pizzacopy.png"
              alt="Specialty Pizza"
              width={220} // ⬅️ slightly larger
              height={220}
              className="relative z-10 border rounded-full p-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PizzaQualitySection;
