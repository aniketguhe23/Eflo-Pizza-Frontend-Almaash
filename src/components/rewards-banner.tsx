import Image from "next/image";
import Link from "next/link";

export default function RewardsBanner() {
  return (
    <div className="py-8 px-12 flex flex-col md:flex-row items-center justify-center gap-8 mt-15">
      {/* Left side - Pizza image with background image */}
      <div className="relative ml-60">
        {/* Background Image */}
        <Image
          src="/pizzaBW.jpg" // Replace with your actual image path
          alt="Background Decoration"
          width={200} // Adjust as needed
          height={200} // Adjust as needed
          className="absolute inset-0 w-full h-full object-cover -ml-30 -rotate-12 rounded-2xl" // Opacity to blend into background
        />

        {/* Foreground Image (Pizza) */}
        <Image
          src="/pizza2.jpg"
          alt="Specialty Pizza"
          width={250}
          height={250}
          className="relative rounded-lg" // Ensure it remains above background image
        />
      </div>

      {/* Middle - Rewards image */}
      <div className="relative ">
        <Image
          src="/pizzatag.png"
          alt="Rewards Dish"
          width={150}
          height={150}
        />
      </div>

      {/* Right side - Rewards info */}
      <div className="bg-gradient-to-l from-[#ffc2a0] to-white rounded-lg p-6 w-[30rem] text-black [font-family:'Antonio',Helvetica] text-2xl">
        <h3 className="font-bold  ">JOIN ELFO'S REWARDS</h3>
        <p className="font-bold">
          UNLOCK <span className="text-orange-600 ">FREE CHIPOTLE</span>.
        </p>

        <div className="flex justify-start gap-20 mt-4">
          <Link href="/account/create">
            <button className="text-lg font-semibold bg-white text-black px-4 py-2 rounded cursor-pointer border border-white hover:border-gray-300">
              CREATE AN ACCOUNT
            </button>
          </Link>
          <Link href="/account/login">
            <button className="text-lg font-semibold text-black px-4 py-2 rounded cursor-pointer hover:bg-white">
              SIGN IN
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
