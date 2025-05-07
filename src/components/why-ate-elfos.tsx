"use client";

import Image from "next/image";

const features = [
  {
    title: "How We Are Better",
    description:
      "Whether it is the use of fresh and authentic ingredients imported straight from Italy, or the cooking standard and technique we use, ELFO’S IS THE WAY.",
    image: "/list1.jpg",
  },
  {
    title: "Our Values",
    description:
      "Here at Esby’s, we value not only food quality but value the experience we promise. Our mission is that every Indian gets to taste authenticity in pizza at standard market prices.",
    image: "/list2.jpg",
  },
  {
    title: "Quality Above All",
    description:
      "We don’t use cheap or overprocessed ingredients. Whether it’s our signature sauce, toppings, originals fresh dough, or even the box itself, we invest in our ingredients to give you a quality pizza.",
    image: "/list3.jpg",
  },
];

export default function WhyAtElfos() {
  return (
    <section className=" py-20 text-black">
      <h2 className="text-5xl font-extrabold text-center uppercase mb-16 [font-family:'Antonio',Helvetica]">
        Why at Elfo’s?
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-3">
        {features.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-3xl shadow-2xl p-4 flex flex-col items-center text-center"
            style={{ height: "500px", width: "92%" }} // Custom height
          >
            <div className="w-full h-64 relative rounded-xl overflow-hidden mb-6">
              {" "}
              {/* Increased image height */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
            <h3 className="text-xl font-bold mb-3">{item.title}</h3>{" "}
            {/* Slightly larger title */}
            <p className="text-lg mb-6 px-2 [font-family:'Barlow_Condensed',Helvetica]">{item.description}</p>
            <button className="bg-[#fbf0ec] hover:bg-[#f9dfd6]  shadow-lg text-white text-sm font-bold px-6 py-3 rounded-full cursor-pointer transition">
              <span className="text-[#f04f04]">READ MORE</span>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
