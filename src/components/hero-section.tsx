// import { useHomeStore } from "@/app/store/homeStore";
// import Image from "next/image";
// import Link from "next/link";

// export default function HeroSection() {
//   const { data } = useHomeStore();

//   return (
//     <section className="bg-[#f47335] w-full py-30 px-26 flex flex-col md:flex-row items-center justify-between">
//       <Image
//         src="/elephantBW.png" // Make sure this file is inside /public
//         alt="Elephant Left"
//         width={100}
//         height={100}
//         className="absolute bottom-70 left-4 opacity-70 z-0 -rotate-20"
//       />
//       <Image
//         src="/elephantBW.png"
//         alt="Elephant Right"
//         width={100}
//         height={100}
//         className="absolute top-40 right-4 opacity-70 z-0 -rotate-20"
//       />
//       <Image
//         src="/elephantBW.png"
//         alt="Elephant Center"
//         width={100}
//         height={100}
//         className="absolute bottom-1 left-1/2 -translate-x-1/2 opacity-70 z-0 -rotate-20"
//       />

//       {/* Left content */}
//       <div className="text-white max-w-3xl text-left pl-25 ">
//         <div className=" pr-80">
//           <h1 className="text-6xl font-bold leading-tight [font-family:'Gotham-Bold',Helvetica] uppercase  ">
//             {data?.hero_title_1 ?? <>TIMELESS DELICIOUS PIZZA</>}
//           </h1>
//         </div>

//         <h3 className="text-white font-bold text-lg tracking-wide mt-6 uppercase">
//           {data?.hero_title_2 ?? "Done the Elfo Way"}
//         </h3>

//         <p className="text-white mt-4 max-w-md mx-auto md:mx-0 text-md leading-relaxed font-semibold">
//           {data?.hero_title_3 ??
//             "Crafted with the finest, freshest ingredients and topped with our signature house-made sauces. Savor the highest quality flavors."}
//         </p>

//         {/* Buttons */}
//         <div className="flex gap-14 mt-8 justify-center md:justify-start">
//           <Link href="/pages/menu">
//             <button className="bg-white text-black font-extrabold text-2xl px-16 py-2 rounded-md hover:opacity-90 transition [font-family:'Barlow_Condensed',Helvetica] cursor-pointer">
//               {data?.hero_button_1 ?? "ORDER NOW"}
//             </button>
//           </Link>
//           <Link href="/pages/build">
//             <button className="bg-white bg-opacity-20 text-[#f47335] font-extrabold text-2xl px-12 py-2 rounded-md [font-family:'Barlow_Condensed',Helvetica] cursor-pointer">
//               {data?.hero_button_2 ?? "BUILD YOUR OWN"}
//             </button>
//           </Link>
//         </div>
//       </div>

//       {/* Pizza image */}
//       <div className="mt-0 md:ml-8">
//         <Image
//           src={data?.hero_img ?? `/pizza.png`}
//           alt="Pizza"
//           width={800}
//           height={800}
//           className="object-contain"
//         />
//       </div>
//     </section>
//   );
// }


import { useHomeStore } from "@/app/store/homeStore";
import Link from "next/link";

export default function HeroSection() {
  const { data } = useHomeStore();

  return (
  <section
  className="relative px-6 py-18 mt-10 flex flex-col items-center justify-center text-center bg-cover bg-center"
  style={{
    backgroundImage: `url('${data?.hero_img ?? "/hearobg.png"}')`,
  }}
>

      {/* Optional: Overlay to darken background for better readability */}
      <div className="absolute inset-0 bg-black opacity-10 z-0" />

      <div className="z-10 max-w-lg">
        <h2 className="text-white text-6xl font-bold leading-tight font-Aclonica">
          {data?.hero_title_1 ?? "TIMELESS DELICIOUS PIZZA"}
        </h2>

        <h3 className="text-white text-xl font-semibold mt-6">
          {data?.hero_title_2 ?? "DONE THE ELFO WAY"}
        </h3>

        <p className="text-white mt-4 max-w-md mx-auto">
          {data?.hero_title_3 ?? (
            <>
              Crafted with the finest, freshest ingredients and topped with our
              signature house-made sauces. Savor the highest quality flavors.
            </>
          )}
        </p>

        <div className="flex gap-4 mt-8 justify-center text-white">
          <Link href="/pages/menu">
            <button className="bg-[#f47335] hover:bg-[#f47335] px-13 py-3 rounded-md font-bold text-xl cursor-pointer">
              {data?.hero_button_1 ?? "order now"}
            </button>
          </Link>
          <Link href="/pages/build">
            <button className="bg-[#f47335] hover:bg-[#f47335] px-8 py-3 rounded-md font-bold text-xl cursor-pointer">
              {data?.hero_button_2 ?? "BUILD YOUR OWN"}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
