"use client";

import Image from "next/image";
import Link from "next/link";
import { useHomeStore } from "@/app/store/homeStore";
import Loader from "@/components/loader/Loader";
import { ShoppingCart } from "lucide-react";
import useCartStore from "@/app/store/useCartStore";
import useBuildYourOwnPizzaCart from "@/app/store/useBuildYourOwnPizzaCart";

export default function Header() {
  const { data } = useHomeStore();
  const { orderItems } = useCartStore();
  const { pizzas } = useBuildYourOwnPizzaCart();

  // Calculate total quantity
  const totalCartCount =
    orderItems.reduce((sum, item) => sum + item.quantity, 0) +
    pizzas.reduce((sum, pizza) => sum + (pizza.quantity || 1), 0);

  if (!data)
    return (
      <div className="fixed inset-0 z-50 h-full w-full flex items-center justify-center bg-white">
        <Loader />
      </div>
    );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 px-4  bg-[#f47335]  [font-family:'Barlow_Condensed',Helvetica]">
        <div className="flex items-center justify-between h-20 ">
          {/* Left: Logo and Name */}
          <div className="flex items-center gap-2  w-[23%]">
            <Link href="/">
              <Image
                src={data?.nav_logo_img || "/elephant.png"}
                alt="Elfo's Pizza Logo"
                width={200}
                height={200}
                className="w-15 h-15"
              />
            </Link>
            <Link
              href="/"
              className="text-white text-xl font-semibold hover:underline uppercase "
            >
              {data?.nav_logo_text || "ELFO'S PIZZA"}
            </Link>
          </div>

          {/* Right: Sign In & Cart */}
          <div className="flex items-center justify-end gap-30 text-2xl text-white pr-10 ">
            <div className=" cursor-pointer mr-2 hover:underline">
              <Link href="/">Home</Link>
            </div>
            <div className=" cursor-pointer mr-2 hover:underline">
              <Link href="/pages/stores">Store Locator</Link>
            </div>
            <div className=" cursor-pointer mr-2 hover:underline">
              <Link href="#">Contact Us</Link>
            </div>
            <Link href="/pages/cart" className="relative">
              <ShoppingCart className="text-white h-8 w-8" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-white text-[#f47335] rounded-full w-4 h-4 flex items-center justify-center text-sm font-bold">
                  {totalCartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
