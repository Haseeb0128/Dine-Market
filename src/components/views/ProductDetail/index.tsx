"use client";
import { FC, useState } from "react";
import Image from "next/image";
import { BsCart2 } from "react-icons/bs";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "../../../../sanity/lib/client";
import {
  imagesType,
  oneProductType,
} from "@/components/utils/ProductsDataArrayAndType";
import { useContext } from "react";
import { cartContext } from "@/global/context";
import toast, { Toaster } from "react-hot-toast";

const builder: any = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

const ProductDetail: FC<{ item: oneProductType }> = ({ item }) => {
  let { dispatch } = useContext(cartContext);
  const [imageForPreview, setImageForPreview] = useState<String>(
    item.image[0]._key
  );
  const [quantity, setQuantity] = useState<number>(1);

  function incrementQuantity() {
    setQuantity(quantity + 1);
  }
  function decrementQuantity() {
    if (quantity !== 0 && quantity !== 1) {
      setQuantity(quantity - 1);
    }
  }
  function handleAddToCart() {
    let dataToAddInCart = {
      productID: item._id,
      quantity: quantity,
    };
    dispatch({ payload: "addToCart", data: dataToAddInCart });
    notification(item.productname);
  }

  const notification = (title: string) =>
    toast(`${quantity} ${title} added to cart!`);

  return (
    <div className="px-4 py-2 min-h-screen mt-10 mb-10">
      <Toaster />
      <div className="grid lg:grid-cols-3">
        <div className="lg:p-6 lg:col-span-2">
          <div className="flex lg:flex-row sm:flex-row flex-col-reverse gap-4 justify-center">
            <div className="flex lg:flex-col sm:flex-col gap-2">
              {item.image.map((subItem: imagesType, index: number) => {
                return (
                  <Image
                    onClick={() => {
                      setImageForPreview(subItem._key);
                    }}
                    src={urlFor(subItem).url()}
                    width={80}
                    height={80}
                    key={index}
                    alt={subItem.alt}
                    className="cursor-pointer"
                  />
                );
              })}
            </div>
            {item.image.map((subItem: imagesType, index: number) => {
              if (subItem._key === imageForPreview) {
                return (
                  <Image
                    src={urlFor(subItem).url()}
                    width={450}
                    height={450}
                    alt={subItem.alt}
                  />
                );
              }
            })}
          </div>
        </div>
        <div className="lg:py-6">
          <div className="sm:pl-6 lg:pl-0 mt-5 lg:mt-0">
            <div className="flex flex-col gap-6">
              <h3 className="text-3xl font-semibold">{item.productname}</h3>
              <h3 className="text-xl">{item.productTypes[0]}</h3>
              <div className="flex flex-col gap-1">
                <p className="font-semibold">Select Size:</p>
                <div className="flex gap-3">
                  {item.sizes.map((subItem: string, index: number) => {
                    return (
                      <button
                        key={index}
                        className="bg-[#0F172A] text-white rounded-full w-[45px] h-[45px] flex items-center justify-center"
                      >
                        {subItem}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex gap-5 items-center">
                <p className="font-semibold">Quantity:</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={incrementQuantity}
                    className="bg-[#0F172A] text-white rounded-lg p-2 w-[40px] h-[40px] text-2xl flex items-center justify-center"
                  >
                    +
                  </button>
                  {quantity}
                  <button
                    onClick={decrementQuantity}
                    className="bg-[#0F172A] text-white rounded-lg p-2 w-[40px] h-[40px] text-2xl flex items-center justify-center"
                  >
                    -
                  </button>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => {
                    handleAddToCart();
                  }}
                  className="flex gap-2 p-4 sm:px-12 bg-[#0F172A] text-white rounded-lg "
                >
                  <BsCart2 size={24} />
                  Add to Cart
                </button>
                <p className="text-2xl font-bold">${item.price}.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:p-6 sm:p-6 p-1 mt-12">
        <p className="text-2xl font-bold">Product Information</p>
        <hr className="my-8" />
        <div className="p-1 flex flex-col gap-6">
          <div className="grid lg:grid-cols-4 sm:grid-cols-4 gap-6 lg:gap-0 sm:gap-0">
            <div className="lg:col-span-1 sm:col-span-1 col-span-3">
              <p className="font-bold">PRODUCT DETAILS</p>
            </div>
            <div className="col-span-3">
              <p>{item.description[0].children[0].text}</p>
            </div>
          </div>
          <div className="grid lg:grid-cols-4 sm:grid-cols-4 gap-6 lg:gap-0 sm:gap-0">
            <div className="lg:col-span-1 sm:col-span-1 col-span-3">
              <p className="font-bold">PRODUCT CARE</p>
            </div>
            <div className="col-span-3">
              <div className="px-4">
                <ul className="list-disc">
                  <li>Hand wash using cold water.</li>
                  <li>Do not using bleach.</li>
                  <li>Hang it to dry.</li>
                  <li>Iron on low temperature.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
