import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full px-4 sm:px-6 py-10 sm:py-16 mt-16 sm:mt-20 bg-white flex flex-col md:flex-row items-center justify-center gap-10 sm:gap-12 [font-family:'Barlow_Condensed',Helvetica] shadow-md">
      {/* Left - Image with Badge */}
      <div className="relative w-full md:w-1/2 flex justify-center">
        <div className="absolute -top-6 sm:-top-8 right-28 sm:right-56 rotate-[-25deg] bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-full shadow-lg text-lg sm:text-xl">
          DO IT
        </div>
        <div className="absolute top-8 sm:top-14 right-24 sm:right-50 rotate-[-15deg] bg-blue-600 text-white px-2 sm:px-3 py-1 rounded-full shadow-lg text-lg sm:text-xl">
          YOUR WAY
        </div>
        <Image
          src="/buildOwn.png"
          alt="Pizza"
          width={400}
          height={400}
          className="rounded-full object-cover rotate-[-15deg] pt-15 max-sm:w-[250px]"
        />
      </div>

      {/* Right - Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-left px-2 sm:px-0">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
          BUILD YOUR OWN ELFO’S PIZZA
        </h2>
        <p className="text-gray-700 text-base sm:text-lg font-bold leading-relaxed [font-family:'Nunito_Sans',Helvetica] sm:pr-40">
          Welcome to Esby Pizza – where your pizza is as unique as your taste!
          Explore our customizable, hand-crafted pizzas, made fresh with premium
          ingredients and endless topping possibilities to create your perfect
          flavor combination.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
