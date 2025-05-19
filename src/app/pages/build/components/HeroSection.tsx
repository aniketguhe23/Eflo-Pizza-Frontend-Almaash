import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="w-full px-6 py-16 bg-white flex flex-col md:flex-row items-center justify-center gap-12 [font-family:'Barlow_Condensed',Helvetica]">
      {/* Left - Image with Badge */}
      <div className="relative w-1/2 flex justify-center">
        <div className="absolute -top-8 right-56 rotate-[-25deg] bg-blue-600 text-white px-3 py-1 rounded-full shadow-lg text-xl">
          DO IT
        </div>
        <div className="absolute right-50 rotate-[-15deg] bg-blue-600 text-white px-3 py-1 rounded-full shadow-lg text-xl">
          YOUR WAY
        </div>
        <Image
          src="/buildOwn.png" // Replace with actual image path
          alt="Pizza"
          width={400}
          height={400}
          className="rounded-full object-cover rotate-[-15deg] pt-15"
        />
      </div>

      {/* Right - Text Section */}
      <div className="w-full md:w-1/2 text-center md:text-left">
        <h2 className="text-5xl font-extrabold mb-4">
          BUILD YOUR OWN ELFO’S PIZZA
        </h2>
        <p className="text-gray-700 text-lg font-bold leading-relaxed [font-family:'Nunito_Sans',Helvetica] pr-40">
          Welcome to Esby's Pizza – where your pizza is as unique as your taste!
          Explore our customizable, hand-crafted pizzas, made fresh with premium
          ingredients and endless topping possibilities to create your perfect
          flavor combination.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
