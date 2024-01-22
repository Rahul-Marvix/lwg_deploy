"use client";
import img1 from "../../../assets/carousel1.jpg";
import img2 from "../../../assets/carousel2.jpg";
import img3 from "../../../assets/carousel3.jpg";
import { Carousel, IconButton } from "@material-tailwind/react";
import Image from "next/image";
export default function CarouselCustomArrows() {
  return (
    <Carousel
    autoplay 
    interval={1000}
    loop
      className="rounded-xl z-10"
      prevArrow={({ handlePrev }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handlePrev}
          className="!absolute top-2/4 left-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </IconButton>
      )}
      nextArrow={({ handleNext }) => (
        <IconButton
          variant="text"
          color="white"
          size="lg"
          onClick={handleNext}
          className="!absolute top-2/4 !right-4 -translate-y-2/4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </IconButton>
      )}
    >
      <Image src={img1}  alt="image 1" className="h-full w-full object-cover" />
      <Image src={img2}  alt="image 2" className="h-full w-full object-cover" />
      {/* <Image src={img3} height={500} alt="image 2" className="h-full w-full object-cover" /> */}
     
    </Carousel>
  );
}
