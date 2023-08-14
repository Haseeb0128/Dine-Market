import React from "react";
import Image from "next/image";

export const Promotions = () => {
  return (
    <div className="container flex flex-col mt-20 mb-20 mx-auto py-2 px-4">
      <div className="text-center mb-4">
        <p>Promotions</p>
        <h2 className="scroll-m-20 pb-2 text-3xl font-bold tracking-tight transition-colors first:mt-0">
          Our Promotions Events
        </h2>
      </div>
      {/* Grid */}
      <div>
        <div className="grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-4">
          <div className="flex flex-col gap-4">
            <div className="bg-[#D6D6D8] flex md:flex-row sm:flex-row flex-col items-center justify-between">
              <div className="flex flex-col lg:ml-8 md:ml-8 sm:ml-8 mt-8 md:mt-0">
                <h2 className="text-3xl font-bold">Get upto 60%</h2>
                <p>For the summer season</p>
              </div>
              <Image
                className="lg:mr-8 md:mr-8 sm:mr-8"
                src={"/event1.png"}
                width={250}
                height={250}
                alt="image"
              />
            </div>
            <div className="bg-[#212121] text-white flex flex-col items-center justify-center p-8">
              <h2 className="text-4xl font-bold mb-4">Get 30% Off</h2>
              <p>USE PROMO CODE</p>
              <h2 className="text-2xl font-bold bg-[#474747] lg:px-[40px] lg:py-2 sm:px-[40px] sm:py-2 px-[20px] py-2 rounded-lg">
                DINEWEEKENDSALE
              </h2>
            </div>
          </div>
          <div className="flex md:flex-row sm:flex-row flex-col gap-4">
            <div className="bg-[#EFE1C7] flex flex-col justify-between w-full">
              <div className="mt-4 ml-4">
                <p>Flex Sweatshirt</p>
                <p>$100</p>
              </div>
              <Image
                className="mx-auto"
                src={"/event2.png"}
                width={260}
                height={260}
                alt="image"
              />
            </div>
            <div className="bg-[#D7D7D9] flex flex-col justify-between w-full">
              <div className="mt-4 ml-4">
                <p>Flex Push Button Bomber</p>
                <p>$100</p>
              </div>
              <Image
                className="mx-auto"
                src={"/event3.png"}
                width={260}
                height={260}
                alt="image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
