"use client";

import { useHomeStore } from "@/app/store/homeStore";
import Image from "next/image";

export default function WhyAtElfos() {
  const { data } = useHomeStore();

  return (
    <section className="py-20 text-black">
      <h2 className="text-5xl font-extrabold text-center uppercase mb-16 [font-family:'Antonio',Helvetica]">
        {data?.whyElfo_maintitle ? (
          data?.whyElfo_maintitle
        ) : (
          <> Why at Elfo’s?</>
        )}
      </h2>
      <div className="max-w-6xl mx-auto grid grid-cols-3">
        {/* Feature 1 */}
        <div
          className="bg-white rounded-3xl shadow-2xl p-4 flex flex-col items-center text-center"
          style={{ height: "500px", width: "92%" }}
        >
          <div className="w-full h-64 relative rounded-xl overflow-hidden mb-6">
            <img
              src={
                data?.whyElfo_img1
                  ? data?.whyElfo_img1
                  : "/list1.jpg"
              }
              alt="How We Are Better"
              className="object-cover"
            />
          </div>
          <h3 className="text-2xl font-bold mb-3 [font-family:var(--font-abhaya-libre)]">
            {data?.whyElfo_title1 ? (
              data?.whyElfo_title1
            ) : (
              <> How We Are Better</>
            )}
          </h3>
          <p className="text-lg mb-6 px-2 [font-family:'Barlow_Condensed',Helvetica]">
           
            {
                data?.whyElfo_desc1
                  ? data?.whyElfo_desc1 
                  : " Whether it is the use of fresh and authentic ingredients imported straight from Italy, or the cooking standard and technique we use, ELFO’S IS THE WAY."
              }
          </p>
          <button className="bg-[#fbf0ec] hover:bg-[#f9dfd6] shadow-lg text-white text-sm font-bold px-6 py-3 rounded-full cursor-pointer transition">
            <span className="text-[#f04f04]">READ MORE</span>
          </button>
        </div>

        {/* Feature 2 */}
        <div
          className="bg-white rounded-3xl shadow-2xl p-4 flex flex-col items-center text-center"
          style={{ height: "500px", width: "92%" }}
        >
          <div className="w-full h-64 relative rounded-xl overflow-hidden mb-6">
            <img
              src={
                data?.whyElfo_img2
                  ? data?.whyElfo_img2
                  : "/list2.jpg"
              }
              alt="Our Values"
              className="object-cover"
            />
          </div>
          <h3 className="text-2xl font-bold mb-3 [font-family:var(--font-abhaya-libre)]">
            {data?.whyElfo_title2 ? data?.whyElfo_title2 : <> Our Values</>}
          </h3>
          <p className="text-lg mb-6 px-2 [font-family:'Barlow_Condensed',Helvetica]">
             {
                data?.whyElfo_desc2
                  ? data?.whyElfo_desc2
                  : " Here at Esby’s, we value not only food quality but value the experience we promise. Our mission is that every Indian gets to taste authenticity in pizza at standard market prices."
              }
            
          </p>
          <button className="bg-[#fbf0ec] hover:bg-[#f9dfd6] shadow-lg text-white text-sm font-bold px-6 py-3 rounded-full cursor-pointer transition">
            <span className="text-[#f04f04]">READ MORE</span>
          </button>
        </div>

        {/* Feature 3 */}
        <div
          className="bg-white rounded-3xl shadow-2xl p-4 flex flex-col items-center text-center"
          style={{ height: "500px", width: "92%" }}
        >
          <div className="w-full h-64 relative rounded-xl overflow-hidden mb-6">
            <img
              src={
                data?.whyElfo_img3
                  ? data?.whyElfo_img3
                  : "/list3.jpg"
              }
              alt="Quality Above All"
              className="object-cover"
            />
          </div>
          <h3 className="text-2xl font-bold mb-3 [font-family:var(--font-abhaya-libre)]">
            {data?.whyElfo_title3 ? (
              data?.whyElfo_title3
            ) : (
              <> Quality Above All</>
            )}
          </h3>
          <p className="text-lg mb-6 px-2 [font-family:'Barlow_Condensed',Helvetica]">
             {
                data?.whyElfo_desc3
                  ? data?.whyElfo_desc3
                  : " We don’t use cheap or overprocessed ingredients. Whether it’s our signature sauce, toppings, fresh dough, or even the box, we invest in ingredients to give you quality pizza."
              }
            
          </p>
          <button className="bg-[#fbf0ec] hover:bg-[#f9dfd6] shadow-lg text-white text-sm font-bold px-6 py-3 rounded-full cursor-pointer transition">
            <span className="text-[#f04f04]">READ MORE</span>
          </button>
        </div>
      </div>
    </section>
  );
}
