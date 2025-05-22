import React from "react";
import Image from "next/image";

const StoneBakedSection = () => {
  return (
    <section className="px-5 py-10 bg-white text-black [font-family:'Barlow_Condensed',Helvetica]">
      <div className="">
        <div className="text-center mb-12">
          <h2 className="text-5xl  text-orange-600">BEST PIZZA NEAR ME</h2>
          <p className="text-3xl font-semibold mt-2">
            {`BECAUSE...ELFO'S GIVES YOU STONE BAKED PIZZAS!`}
          </p>
        </div>

        {/* Icons Section */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
          <div className="flex items-center gap-4">
            {/* Icon Image */}
            <Image
              src="/VectorNew.png"
              alt="Pizza preparation"
              width={40} // adjust size as needed
              height={40}
              priority
            />
            <p className="text-center font-medium max-w-[200px]">
              PIZZA STONE OVENS FOR
              <br />
              AUTHENTIC PIZZA CRUSTS.
            </p>
          </div>

          <div className="w-px h-12 bg-gray-300 hidden md:block" />

          <div className="flex items-center gap-4">
            <Image
              src="/Vector.png"
              alt="Pizza preparation"
              width={40}
              height={40}
              priority
            />
            <p className="text-center font-medium max-w-[200px]">
              GAS FIRED OVENS TO GIVE
              <br />
              CRISPY PIZZA CRUSTS.
            </p>
          </div>
        </div>

        {/* Image and Text Content */}
        <div className=" flex justify-center items-center gap-12 ml-5">
          {/* Left Image */}
          <div>
            <Image
              src="/sauce.png"
              alt="Pizza preparation"
              width={550}
              height={350} // adjust height proportionally
              className="rounded-xl shadow-md"
              priority
            />
          </div>

          {/* Right Text */}
          <div className="max-w-xl">
            <h3 className="text-3xl mb-4 pr-70">
              BEST PIZZA IN INDIA MEANS... HIGEST QUALITY STANDARDS
            </h3>
            <p className="text-gray-700 text-sm font-semibold leading-relaxed [font-family:'Nunito_Sans',Helvetica] pr-30">
              Quality has to be first at Elfo’s Pizza. That is why we create
              each gourmet pizza using only the freshest ingredients - from
              Italian San Marzano tomatoes to authentic Italian dough prepared
              with 00-tipo flour. Every taste will represent an original slice
              of Italy. We are proud to bring the world’s flavors to Bhopal and
              make sure that everyone enjoys this gourmet pizza without ripping
              their pockets apart. Rich yet affordable, indulge in our pizzas
              with ease. Is the best pizza in Bhopal what you are looking for?
              Feel the perfect blend of taste and value with our gourmet pizza,
              which is not only high on taste but also pretty affordable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoneBakedSection;
