// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { CircleUserRound, MapPin, ShoppingCart } from "lucide-react";
// import { useState } from "react";
// import { TbBus } from "react-icons/tb";
// import { PiHandCoinsFill } from "react-icons/pi";
// import { useHomeStore } from "@/app/store/homeStore";
// import DineInModal from "@/components/dineIn-modal";
// // import DineInModal from "./dineIn-modal"; // ✅ Make sure the path is correct

// export default function Header() {
//   const { data } = useHomeStore();
//   const [activeTab, setActiveTab] = useState<"delivery" | "pickup">("delivery");
//   const [isPickupModalOpen, setIsPickupModalOpen] = useState(false); // ✅ Modal state

//   return (
//     <>
//       {/* ✅ Modal Rendering */}
//       {isPickupModalOpen && (
//         <DineInModal onClose={() => setIsPickupModalOpen(false)} />
//       )}

//       <header
//         className={`flex flex-col md:flex-row items-center justify-between px-6 md:px-12 bg-transparent`}
//       >
//         {/* Logo and Name */}
//         <div className="flex items-center gap-4">
//           <Image
//             src={data?.nav_logo_img || "/elephant.png"}
//             alt="Elfo's Pizza Logo"
//             width={200}
//             height={200}
//             className="w-20 h-20"
//           />
//           <h1 className="text-white text-3xl font-bold [font-family:'Barlow_Condensed',Helvetica] uppercase">
//             {data?.nav_logo_text || "ELFO'S PIZZA"}
//           </h1>
//         </div>

//         {/* Navigation */}
//         <nav className="hidden md:flex items-center gap-8 [font-family:'Barlow_Condensed',Helvetica] text-2xl">
//           <Link
//             href="/"
//             className="text-white font-semibold hover:border-b-2 hover:border-white pb-1"
//           >
//             HOME
//           </Link>
//           <Link
//             href="/pages/values"
//             className="text-white font-semibold border-b-2 border-white pb-1"
//           >
//             VALUES
//           </Link>
//           <Link
//             href="/pages/build"
//             className="text-white font-semibold hover:border-b-2 hover:border-white pb-1"
//           >
//             BUILD YOUR OWN
//           </Link>
//           <Link
//             href="/pages/menu"
//             className="text-white font-semibold hover:border-b-2 hover:border-white pb-1"
//           >
//             MENU
//           </Link>
//         </nav>

//         {/* Delivery & Pickup Toggle + Icons */}
//         <div className="flex items-center gap-4 mt-4 md:mt-0 w-[50%]">
//           <div className="bg-[#f4f4f4] opacity-70 text-black rounded-md flex items-center p-2 w-[40%]">
//             <MapPin className="text-black mr-2 h-6 w-6" />
//             <div className="flex flex-col">
//               <span className="text-[.8rem]">Delivery From</span>
//               <span className="text-[.6rem]">Select your address</span>
//             </div>
//           </div>

//           {/* Toggle Buttons */}
//           <div className="flex items-center [font-family:'Barlow_Condensed',Helvetica] ml-10">
//             <button
//               onClick={() => setActiveTab("delivery")}
//               className={`px-3 py-[5px] rounded-l-md font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
//                 activeTab === "delivery"
//                   ? "bg-white text-black"
//                   : "bg-transparent text-white border border-white"
//               }`}
//             >
//               <PiHandCoinsFill size={20} />
//               Delivery
//             </button>
//             <button
//               onClick={() => {
//                 setActiveTab("pickup");
//                 setIsPickupModalOpen(true); // ✅ Open modal
//               }}
//               className={`px-3 py-1 rounded-r-md font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
//                 activeTab === "pickup"
//                   ? "bg-white text-black"
//                   : "bg-transparent text-white border border-white"
//               }`}
//             >
//               <TbBus size={20} />
//               Pickup/Dine in
//             </button>
//           </div>

//           {/* Account and Cart Icons */}
//           <div className="flex justify-end items-center gap-5 w-[15%]">
//             <Link href="/pages/myAccount" className="relative">
//               <CircleUserRound className="text-white h-9 w-9" />
//             </Link>

//             <div className="relative">
//               <Link href="/pages/cart" className="relative">
//                 <ShoppingCart className="text-white h-8 w-8" />
//                 <span className="absolute -top-2 -right-2 bg-white text-[#f47335] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
//                   0
//                 </span>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </header>
//     </>
//   );
// }
