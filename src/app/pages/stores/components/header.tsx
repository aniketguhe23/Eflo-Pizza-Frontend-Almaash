"use client";

import Image from "next/image";
import Link from "next/link";
import { useHomeStore } from "@/app/store/homeStore";
import Loader from "@/components/loader/Loader";
import { Menu, ShoppingCart, X } from "lucide-react";
import useCartStore from "@/app/store/useCartStore";
import useBuildYourOwnPizzaCart from "@/app/store/useBuildYourOwnPizzaCart";
import { useState } from "react";

export default function Header() {
  const { data } = useHomeStore();
  const { orderItems } = useCartStore();
  const { pizzas } = useBuildYourOwnPizzaCart();

  const [sidebarOpen, setSidebarOpen] = useState(false);
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
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 bg-[#f47335] [font-family:'Barlow_Condensed',Helvetica]">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo + Name */}
          <div className="flex items-center gap-2 w-auto sm:w-[23%]">
            <Link href="/">
              <Image
                src={data?.nav_logo_img || "/elephant.png"}
                alt="Elfo's Pizza Logo"
                width={50}
                height={50}
                className="w-12 h-12"
              />
            </Link>
            <Link
              href="/"
              className="text-white text-lg sm:text-xl font-semibold hover:underline uppercase"
            >
              {data?.nav_logo_text || "ELFO'S PIZZA"}
            </Link>
          </div>

          {/* Right: Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 text-xl text-white pr-6">
            <Link href="/" className="hover:underline">
              Home
            </Link>
            <Link href="/pages/stores" className="hover:underline">
              Store Locator
            </Link>
            <Link href="#" className="hover:underline">
              Contact Us
            </Link>
            <Link href="/pages/cart" className="relative">
              <ShoppingCart className="h-7 w-7" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-white text-[#f47335] rounded-full w-4 h-4 flex items-center justify-center text-xs font-bold">
                  {totalCartCount}
                </span>
              )}
            </Link>
          </div>

          {/* Right: Mobile Hamburger */}
          <div className="lg:hidden">
            <button onClick={() => setSidebarOpen(true)}>
              <Menu className="text-white h-8 w-8" />
            </button>
          </div>
        </div>
      </header>

      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-64 bg-white text-[#f47335] transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        } shadow-lg`}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b">
          <h2 className="text-xl font-semibold uppercase">
            {data?.nav_logo_text || "ELFO'S PIZZA"}
          </h2>
          <button onClick={() => setSidebarOpen(false)}>
            <X className="h-6 w-6 text-gray-700" />
          </button>
        </div>
        <nav className="flex flex-col gap-4 px-6 py-6 text-lg">
          <Link
            href="/"
            className="hover:underline"
            onClick={() => setSidebarOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/pages/stores"
            className="hover:underline"
            onClick={() => setSidebarOpen(false)}
          >
            Store Locator
          </Link>
          <Link
            href="#"
            className="hover:underline"
            onClick={() => setSidebarOpen(false)}
          >
            Contact Us
          </Link>
          <Link
            href="/pages/cart"
            className="flex items-center gap-2 hover:underline"
            onClick={() => setSidebarOpen(false)}
          >
            <ShoppingCart className="h-6 w-6" />
            Cart
            {totalCartCount > 0 && (
              <span className="ml-1 bg-[#f47335] text-white rounded-full px-2 text-sm font-bold">
                {totalCartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>

      {/* Backdrop when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 bg-opacity-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
}
