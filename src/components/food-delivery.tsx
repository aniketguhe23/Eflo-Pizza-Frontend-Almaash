'use client'
import { useHomeStore } from "@/app/store/homeStore";
import Image from "next/image";

export default function FoodDeliveryHero() {
  const { data } = useHomeStore();

  return (
    <div className="relative w-full min-h-[300px] bg-[#f3f3f3] overflow-hidden rounded-3xl">
      {/* Background Image */}
    
      <Image
        src={data?.eleCardComp_img1 ? data.eleCardComp_img1 : "/foodDeliveryBg2.jpg"}
        alt="Background"
        fill
        className="object-cover opacity-90"
        priority
      />

      {/* Hero Content Container */}
      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-between relative z-10">
        {/* Text Content */}
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0 [font-family:'Aclonica',Helvetica]">
          <h1 className="text-4xl text-center text-black leading-tight">
            {data?.eleCardComp_title ? (
              data?.eleCardComp_title
            ) : (
              <> &quot;Hot. Fresh. Delivered Fast.&quot; </>
            )}
          </h1>
          <p className="text-4xl  mt-4 text-black font-medium text-center">
            {data?.eleCardComp_desc ? (
              data?.eleCardComp_desc
            ) : (
              <> Your cravings, conquered in minutes. </>
            )}
          </p>
        </div>

        {/* Mascot and Circle */}
        <div className=" relative flex justify-center items-end">
          <div className="w-96 h-96  bg-[#ED722E] rounded-full absolute top-20 right-25 translate-x-1/4 translate-y-1/4 z-0"></div>
          <div className="relative z-10">
            <img
              src={
                data?.eleCardComp_img2
                  ? data?.eleCardComp_img2
                  : "/elephant.png"
              }
              // src="/elephant.png"
              alt="Food delivery mascot"
              width={350}
              height={300}
              className="object-contain ml-5 scale-120"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
