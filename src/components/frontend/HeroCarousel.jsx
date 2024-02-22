"use client";
import Carousel from "nuka-carousel";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HeroCarousel({ banners }) {
  const config = {
    nextButtonClassName: "rounded-full",
    nextButtonText: <ChevronRight />,
    pagingDotsClassName: "me-2 w-4 h-4",
    prevButtonClassName: "rounded-full",
    prevButtonText: <ChevronLeft />,
  };

  return (
    <Carousel
      defaultControlsConfig={config}
      autoplay
      className="rounded-md overflow-hidden"
      wrapAround
    >
      {banners.map((banner, i) => {
        return (
          <Link key={i} href={banner.link} className="">
            <Image
              width={712}
              height={384}
              src={banner.imageUrl}
              alt={banner.title}
              className="w-full"
            />
          </Link>
        );
      })}
    </Carousel>
  );
}
