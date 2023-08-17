"use client";
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../../../../sanity/lib/client";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

const CartComp = ({
  allProductsOfStore,
}: {
  allProductsOfStore: Array<oneProductType>;
}) => {
  const [allProductsForCart, setAllProductsForCart] = useState<any>([]);
  useEffect(() => {
    let stateStorage: any = localStorage.getItem("cart") as string;
    stateStorage = JSON.parse(stateStorage);
    if (stateStorage) {
      let data = allProductsOfStore.filter((item: oneProductType) => {
        for (let index = 0; index < stateStorage.length; index++) {
          if (stateStorage[index].productID === item._id) {
            return true;
          }
        }
      });
      setAllProductsForCart(data);
    }
  }, []);
  return (
    <div className="mt-12 mb-12 px-4 py-2 min-h-screen">
      <h2 className="scroll-m-20 text-3xl font-bold tracking-tight transition-colors first:mt-0">
        Shopping Cart
      </h2>
      <div className="mt-10 grid lg:grid-cols-4 gap-4">
        <div className="col-span-3 p-1">
          {allProductsForCart &&
            allProductsForCart.map((item: oneProductType, index: number) => {
              return (
                <div
                  key={index}
                  className="grid lg:grid-cols-4 sm:grid-cols-4 p-1 mb-10"
                >
                  <div className="sm:col-span-1 p-1">
                    <Image
                      className="mx-auto rounded-lg"
                      src={urlFor(item.image[0]).url()}
                      width={240}
                      height={240}
                      alt={item.image[0].alt}
                    />
                  </div>
                  <div className="lg:col-span-3 sm:col-span-3 p-1 flex justify-between">
                    <div className="flex flex-col justify-between lg:px-6">
                      <p className="text-2xl">{item.productname}</p>
                      <p className="font-semibold">{item.productTypes[0]}</p>
                      <p className="font-bold">Delivery Estimation</p>
                      <p>5 working days</p>
                      <p className="text-xl font-semibold">${item.price}</p>
                    </div>
                    <div className="flex flex-col justify-between items-center">
                      <div>
                        <button>
                          <BsTrash3 size={25} />
                        </button>
                      </div>
                      <div className="flex gap-3 items-center">
                        <button className="text-3xl">+</button>
                        <p>1</p>
                        <button className="text-3xl">-</button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          <div className="grid lg:grid-cols-4 sm:grid-cols-4 p-1 mb-10">
            <div className="sm:col-span-1 p-1">
              <Image
                className="mx-auto rounded-lg"
                src={"/raglan sweatshirt.png"}
                width={240}
                height={240}
                alt="image"
              />
            </div>
            <div className="lg:col-span-3 sm:col-span-3 p-1 flex justify-between">
              <div className="flex flex-col justify-between lg:px-6">
                <p className="text-2xl">Cameryn Sash Tie Dress</p>
                <p className="font-semibold">Dress</p>
                <p className="font-bold">Delivery Estimation</p>
                <p>5 working days</p>
                <p className="text-xl font-semibold">$100</p>
              </div>
              <div className="flex flex-col justify-between items-center">
                <div>
                  <button>
                    <BsTrash3 size={25} />
                  </button>
                </div>
                <div className="flex gap-3 items-center">
                  <button className="text-3xl">+</button>
                  <p>1</p>
                  <button className="text-3xl">-</button>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="grid lg:grid-cols-4 sm:grid-cols-4 p-1 mb-10">
            <div className="sm:col-span-1 p-1">
              <Image
                className="mx-auto rounded-lg"
                src={"/raglan sweatshirt.png"}
                width={240}
                height={240}
                alt="image"
              />
            </div>
            <div className="lg:col-span-3 sm:col-span-3 p-1 flex justify-between">
              <div className="flex flex-col justify-between lg:px-6">
                <p className="text-2xl">Raglan Sweatshirt</p>
                <p className="font-semibold">Dress</p>
                <p className="font-bold">Delivery Estimation</p>
                <p>5 working days</p>
                <p className="text-xl font-semibold">$100</p>
              </div>
              <div className="flex flex-col justify-between items-center">
                <div>
                  <button>
                    <BsTrash3 size={25} />
                  </button>
                </div>
                <div className="flex gap-3 items-center">
                  <button className="text-3xl">+</button>
                  <p>1</p>
                  <button className="text-3xl">-</button>
                </div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="sm:col-span-3 lg:col-span-1 col-span-3 p-1">
          <div className="p-1 flex flex-col gap-6 justify-between w-full">
            <h2 className="font-bold text-xl">Order Summary</h2>
            <div className="flex justify-between">
              <p>Quantity</p>
              <p>1 product</p>
            </div>
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>$100</p>
            </div>
            <button className="rounded-lg bg-[#0F172A] text-white p-2">
              Procede to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartComp;
