import Carousel from "nuka-carousel";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HeroCarousel() {
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
      <Link href="#" className="">
        <Image
          width={712}
          height={384}
          src="/banners/1.jpg"
          alt=""
          className="w-full"
        />
      </Link>
      <Link href="#" className="">
        <Image
          width={712}
          height={384}
          src="/banners/2.jpg"
          alt=""
          className="w-full"
        />
      </Link>
      <Link href="#" className="">
        <Image
          width={712}
          height={384}
          src="/banners/3.png"
          alt=""
          className="w-full"
        />
      </Link>
      <Link href="#" className="">
        <Image
          width={712}
          height={384}
          src="/banners/4.jpg"
          alt=""
          className="w-full"
        />
      </Link>
      <Link href="#" className="">
        <Image
          width={712}
          height={384}
          src="/banners/5.png"
          alt=""
          className="w-full"
        />
      </Link>
    </Carousel>
  );
}
