"use client";

import { useHomeStore } from "@/app/store/homeStore";
import Image from "next/image";
import { useState } from "react";
import WhyAtElfosModal from "@/components/WhyAtElfosModal";

export default function WhyAtElfos() {
  const { data } = useHomeStore();
  const [selectedCard, setSelectedCard] = useState<null | {
    title: string;
    description: string;
    image: string;
  }>(null);

  const features = [
    {
      title: data?.whyElfo_title1 || "How We Are Better",
      description:
        data?.whyElfo_desc1 ||
        "Whether it is the use of fresh and authentic ingredients imported straight from Italy, or the cooking standard and technique we use, ELFO’S IS THE WAY.",
      image: data?.whyElfo_img1 || "/list1.jpg",
    },
    {
      title: data?.whyElfo_title2 || "Our Values",
      description:
        data?.whyElfo_desc2 ||
        "Here at Esby’s, we value not only food quality but value the experience we promise. Our mission is that every Indian gets to taste authenticity in pizza at standard market prices.",
      image: data?.whyElfo_img2 || "/list2.jpg",
    },
    {
      title: data?.whyElfo_title3 || "Quality Above All",
      description:
        data?.whyElfo_desc3 ||
        "We don’t use cheap or overprocessed ingredients. Whether it’s our signature sauce, toppings, fresh dough, or even the box, we invest in ingredients to give you quality pizza.",
      image: data?.whyElfo_img3 || "/list3.jpg",
    },
  ];

  return (
    <section
      className="py-20 text-black"
      style={{
        backgroundImage: "url('/whybg.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
      }}
    >
      <h2 className="text-5xl font-extrabold text-center uppercase mb-16 [font-family:'Antonio',Helvetica]">
        {data?.whyElfo_maintitle ? data.whyElfo_maintitle : "Why at Elfo’s?"}
      </h2>

      {/* Responsive Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-3xl shadow-2xl p-4 flex flex-col items-center text-center"
          >
            <div className="w-full h-64 relative rounded-xl overflow-hidden mb-6">
              <Image
                src={feature.image}
                alt={feature.title}
                fill
                className="object-cover"
              />
            </div>

            <h3 className="text-2xl font-bold mb-3 [font-family:var(--font-abhaya-libre)]">
              {feature.title}
            </h3>
            <p className="text-lg mb-6 px-2 [font-family:'Barlow_Condensed',Helvetica]">
              {feature.description.length > 100
                ? feature.description.slice(0, 100) + "..."
                : feature.description}
            </p>
            <button
              onClick={() => setSelectedCard(feature)}
              className="bg-[#fbf0ec] hover:bg-[#f9dfd6] shadow-lg text-sm font-bold px-6 py-3 rounded-full transition"
            >
              <span className="text-[#f04f04]">READ MORE</span>
            </button>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedCard && (
        <WhyAtElfosModal
          open={true}
          onClose={() => setSelectedCard(null)}
          title={selectedCard.title}
          description={selectedCard.description}
          image={selectedCard.image}
        />
      )}
    </section>
  );
}
