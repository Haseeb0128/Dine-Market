import React from "react";
import Image from "next/image";
import { BsCart2 } from "react-icons/bs";
import Link from "next/link";

export const Hero = () => {
  return (
    <div className="py-2 px-4 mt-5">
      <div className="container">
        <div className="grid lg:grid-cols-2 sm:grid-cols-1 grid-cols-1">
          <div className="flex flex-col items-center justify-center p-4">
            <div className="sm:my-12 my-12">
              <h1 className="scroll-m-20 text-5xl font-extrabold tracking-tight lg:text-6xl lg:w-96 sm:w-[600px] w-[190px]">
                An Industrial Take on Streetwear
              </h1>
              <p className="leading-7 [&:not(:first-child)]:mt-6 mb-6 md:w-72">
                Anyone can beat you but no one can beat your outfit as long as
                you wear Dine outfits.
              </p>
              <Link href={"/allproducts"}>
                <button className="w-[200px] h-[50px] bg-[#0F172A] text-white rounded-lg flex items-center justify-center gap-2">
                  <BsCart2 size={24} />
                  Start Shopping
                </button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center p-4">
            <div className="bg-[#FFECE3] rounded-full">
              <Image
                className="sm:hidden lg:flex hidden"
                src={"/header.png"}
                width={500}
                height={500}
                alt="Image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
