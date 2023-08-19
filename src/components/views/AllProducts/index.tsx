"use client";
import { FC } from "react";
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";
import Link from "next/link";
import React from "react";
import { Card } from "../Card";

export const AllProductsCompo: FC<{ ProductData: Array<oneProductType> }> = ({
  ProductData,
}) => {
  console.log("All data", ProductData);
  return (
    <div className="grid lg:grid-cols-4 sm:grid-cols-2 gap-10 px-4 py-2 mt-20 mb-20">
      {ProductData.map((item: oneProductType, index: number) => {
        return (
          <Link href={`/product/${item.slug.current}`}>
            <Card key={index} singleProductData={item} />
          </Link>
        );
      })}
    </div>
  );
};
