"use client";
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../../../../sanity/lib/client";
import { cartContext } from "@/global/context";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

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
  let { cartArray, dispatch, userData, loading } = useContext(cartContext);
  const [totalPrice, setTotalPrice] = useState(0);

  let router = useRouter();

  function PriceSubTotal() {
    let originalToSend: number = 0;
    for (let index = 0; index < cartArray.length; index++) {
      const element = cartArray[index];
      let subTotalPrice = element.quantity * element.price;
      originalToSend = originalToSend + subTotalPrice;
      if (subTotalPrice) {
        setTotalPrice(originalToSend);
        router.refresh();
      }
    }
  }

  useEffect(() => {
    PriceSubTotal();
  }, [allProductsForCart]);

  function handleRemove(product_id: string) {
    if (userData) {
      let user_id = userData.uuid;
      dispatch("removeFromCart", { product_id, user_id });
    }
  }

  useEffect(() => {
    if (cartArray.length !== 0) {
      let data = allProductsOfStore.filter((item: oneProductType) => {
        for (let index = 0; index < cartArray.length; index++) {
          if (cartArray[index].product_id === item._id) {
            return true;
          }
        }
      });
      setAllProductsForCart(data);
    }
  }, [cartArray]);

  async function handleIncrementByOne(product_id: string, price: any) {
    let stableQuantity: number = 0;
    cartArray.forEach((element: any) => {
      if (element.product_id == product_id) {
        stableQuantity = element.quantity;
      }
    });
    await dispatch("updateCart", {
      product_id: product_id,
      quantity: stableQuantity + 1,
      user_id: userData.uuid,
      price: price,
    });
  }

  async function handleDecrementByOne(product_id: string, price: any) {
    let stableQuantity: number = 0;
    cartArray.forEach((element: any) => {
      if (element.product_id == product_id) {
        stableQuantity = element.quantity;
      }
    });
    if (stableQuantity - 1 <= 0) {
      notificationError("Cannot accept lower than 1");
    } else {
      await dispatch("updateCart", {
        product_id: product_id,
        quantity: stableQuantity - 1,
        user_id: userData.uuid,
        price: price,
      });
    }
  }

  const notificationError = (title: string) => toast(`${title}`);

  return (
    <div className="mt-12 mb-12 px-4 py-2 min-h-screen">
      <Toaster />
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
                        <button
                          onClick={() => {
                            handleRemove(item._id);
                          }}
                        >
                          <BsTrash3 size={25} />
                        </button>
                      </div>
                      <div
                        className={`flex gap-3 ${
                          loading ? "opacity-25" : "opacity-100"
                        } items-center`}
                      >
                        <button
                          disabled={loading}
                          className="text-3xl"
                          onClick={() => {
                            handleIncrementByOne(item._id, item.price);
                          }}
                        >
                          +
                        </button>
                        <p>
                          {cartArray.map((subItem: any) => {
                            let matching = subItem.product_id === item._id;
                            let quantity = subItem.quantity;

                            if (matching) {
                              return quantity;
                            } else {
                              return "";
                            }
                          })}
                        </p>
                        <button
                          className="text-3xl"
                          onClick={() => {
                            handleDecrementByOne(item._id, item.price);
                          }}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
          </div> */}
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
              <p>{cartArray.length} product</p>
            </div>
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>${totalPrice}</p>
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
