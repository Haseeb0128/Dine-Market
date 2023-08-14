import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Jewellery = () => {
  return (
    <div className="mb-20 mt-20 py-2 px-4 container mx-auto">
      <div className="flex flex-col gap-5">
        <div>
          <h1 className="text-5xl font-extrabold tracking-tight lg:w-[450px] sm:w-[650px] mb-3">
            Unique and Authentic Vintage Designer Jewellery
          </h1>
        </div>
        <div className="grid lg:grid-cols-2 gap-4 lg:gap-0">
          <div className="grid lg:grid-cols-2 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xl font-bold lg:w-[200px]">
                  Using Good Quality Materials
                </p>
                <p className="lg:w-[200px]">
                  Lorem ipsum dolor sit amt, consectetur adipiscing elit.
                </p>
              </div>
              <div>
                <p className="text-xl font-bold lg:w-[200px]">
                  Modern Fashion Design
                </p>
                <p className="lg:w-[200px]">
                  Lorem ipsum dolor sit amt, consectetur adipiscing elit.
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xl font-bold lg:w-[200px]">
                  100% Handmade Products
                </p>
                <p className="lg:w-[200px]">
                  Lorem ipsum dolor sit amt, consectetur adipiscing elit.
                </p>
              </div>
              <div>
                <p className="text-xl font-bold lg:w-[200px]">
                  Discount for Bulk Orders
                </p>
                <p className="lg:w-[200px]">
                  Lorem ipsum dolor sit amt, consectetur adipiscing elit.
                </p>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 sm:grid-cols-2 gap-3 lg:gap-0 sm:gap-0">
            <div>
              <Image
                className="mx-auto"
                src={"/image9.png"}
                width={255}
                height={255}
                alt="image"
              />
            </div>
            <div>
              <div className="sm:mt-16 lg:mt-0">
                <p className="mb-5">
                  This piece is ethically crafted in our small family-owned
                  workshop in Peru with unmatched attention to detail and care.
                  The Natural color is the actual natural color of the fiber,
                  undyed and 100% traceable.
                </p>
                <Link href={"/allproducts"}>
                  <button className="bg-[#0F172A] rounded-lg text-white p-3">
                    See all products
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
