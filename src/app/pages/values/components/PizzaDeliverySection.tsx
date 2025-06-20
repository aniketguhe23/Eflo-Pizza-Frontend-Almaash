import React from "react";
import Image from "next/image";
import { useValuesStore } from "@/app/store/useValuesStore";

const PizzaDeliverySection = () => {
  const { valueData } = useValuesStore();

  return (
    <section className="bg-[#4CAF50] py-16 px-6 md:px-12 bg-[url('/greenBG.jpg')] bg-repeat opacity-95 [font-family:'Barlow_Condensed',Helvetica] ">
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 items-center gap-10">
        {/* Left: Text */}
        <div className="text-white space-y-6">
          <h2 className="text-4xl  uppercase">
            “ {valueData?.pizza_delivery_heading ?? "Pizza Delivery Near Me"} ”
          </h2>
          <h3 className="text-2xl md:text-3xl uppercase">
            {valueData?.pizza_delivery_title ?? "By Elfo’s Pizza"}
          </h3>
          <p className="text-sm  font-light leading-relaxed [font-family:'Nunito_Sans',Helvetica]">
            {valueData?.pizza_delivery_desc ??
              "Looking for delicious pizza delivery near me? Come to Elfo’s Pizza, where you get scrumptious pizzas delivered right to your doorstep in Bopal. Be it a pizza near me or reliable delivery services you are looking for; we’ve got you covered. At Elfo’s Pizza, be proud that we serve the best pizzas in Bhopal, made with high-quality ingredients and delivered right at your door. Enjoy HOT and scrumptious pizza delivery near me that will satiate your craving any given moment. Ditch the search for “pizza near me” and taste the difference with Elfo’s Pizza. Order now and let our delivery team bring the flavor right to your doorstep!"}
          </p>
        </div>

        {/* Right: Image + CTA */}
        <div className="flex flex-col items-center justify-center">
          <Image
            src={valueData?.pizza_delivery_img ?? "/elephant.png"}
            alt="Cute elephant mascot"
            width={200}
            height={200}
            className="w-auto h-auto"
          />
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-10 rounded-md shadow-md transition-all duration-200 cursor-pointer whitespace-nowrap">
            ORDER NOW
          </button>
        </div>
      </div>
    </section>
  );
};

export default PizzaDeliverySection;
