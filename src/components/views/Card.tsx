import { FC } from "react";
import { oneProductType } from "../utils/ProductsDataArrayAndType";
import { client } from "../../../sanity/lib/client";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";

const builder = imageUrlBuilder(client);
function urlFor(source: any) {
  return builder.image(source);
}

export const Card: FC<{ singleProductData: oneProductType }> = ({
  singleProductData,
}) => {
  return (
    <div>
      <div className="w-[260px] mx-auto">
        <Image
          src={urlFor(singleProductData.image[0]).url()}
          width={300}
          height={300}
          alt={singleProductData.image[0].alt}
        />
        {/* <p className="text-[18px] font-semibold">{props.id}</p> */}
        <p className="text-[18px] font-bold">{singleProductData.productname}</p>
        <p className="font-semibold text-gray-500">
          {singleProductData.productTypes[0]}
        </p>
        <p className="text-xl font-semibold">${singleProductData.price}</p>
      </div>
    </div>
  );
};
