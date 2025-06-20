import Image from "next/image";

export default function AppDownloadCard() {
  return (
    <div className="w-80 h-70 aspect-square">
      <div className="bg-[#f47335] rounded-xl p-4 text-white text-center w-full h-full flex flex-col justify-center">
        <h3 className="text-xl mb-2">Get The App Now!</h3>
        <div className="flex items-center justify-center gap-2 mb-3 border rounded-2xl">
          <div className="rounded-full flex items-center justify-center">
            <Image
              src={"/elephant.png"}
              alt="Elfo's Pizza Logo"
              width={60}
              height={60}
            />
          </div>
          <div className="flex items-center justify-center">
            <h1 className="font-semibold">ELFO&apos;S PIZZA</h1>
          </div>
        </div>
        <p className="text-xl mb-4">Available Now</p>
        <div className="flex gap-2 justify-center">
          <div className="bg-black rounded-lg px-3 py-2 text-xs text-white">
            <div>Download on the</div>
            <div className="font-bold">App Store</div>
          </div>
          <div className="bg-black rounded-lg px-3 py-2 text-xs text-white">
            <div>Get it on</div>
            <div className="font-bold">Google Play</div>
          </div>
        </div>
      </div>
    </div>
  );
}
