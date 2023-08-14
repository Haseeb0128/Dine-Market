"use client";
import Slider from "react-slick";
import { FC } from "react";
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card } from "../Card";
import Link from "next/link";

export const ProductCarousel: FC<{ ProductData: Array<oneProductType> }> = ({
  ProductData,
}) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="py-2 px-4 mb-20">
      <div className="text-center mb-10">
        <p className="mb-3">PRODUCTS</p>
        <h2 className="text-3xl font-bold">Check What We Have</h2>
      </div>
      <Slider {...settings}>
        {ProductData.map((item: oneProductType, index: number) => (
          <Link href={`/product/${item.slug.current}`}>
            <Card key={index} singleProductData={item} />
          </Link>
        ))}
      </Slider>
    </div>
  );
};
