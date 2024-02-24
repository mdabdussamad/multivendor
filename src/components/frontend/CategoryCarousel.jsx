"use client";

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Image from "next/image";
import Link from "next/link";
import { BaggageClaim } from "lucide-react";

export default function CategoryCarousel({ products }) {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      autoPlay={true}
      autoPlaySpeed={1000}
      keyBoardControl={true}
      customTransition="all .5"
      transitionDuration={500}
      containerClass="carousel-container"
      removeArrowOnDeviceType={["tablet", "mobile"]}
      //   deviceType={}
      dotListClass="custom-dot-list-style"
      itemClass="px-4"
    >
      {products.map((product, i) => {
        return (
          <div key={i} className="rounded-lg mr-3 bg-white dark:bg-slate-900 overflow-hidden border shadow">
            <Link href={`/products/${product.slug}`}>
              <Image
                src={product.imageUrl}
                alt={product.title}
                width={556}
                height={556}
                className="w-full h-48 object-cover"
              />
            </Link>
            <Link href={`/products/${product.slug}`}>
              <h2 className="text-center dark:text-slate-200 text-slate-800 my-2 font-semibold">
                {product.title}
              </h2>
            </Link>
            <div className="px-4">
              <div className="flex items-center justify-between gap-2 pb-3 dark:text-slate-200 text-slate-800">
                <p>NPR {product.salePrice}</p>
                <button className="flex items-center space-x-2 bg-lime-600 px-4 py-2 rounded-md text-white">
                  <BaggageClaim />
                  <span>Add</span>
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
}
