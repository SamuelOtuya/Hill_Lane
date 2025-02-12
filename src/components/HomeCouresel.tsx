"use client";

import { Carousel } from "flowbite-react";
import i1 from "../assets/HLBanner.jpeg";
import i2 from "../assets/HLBanner.jpeg";

const data = [i1, i2];

export function HomeCouresel() {
  return (
    <div className="h-56 sm:h-80 md:h-[450px] lg:h-[450px] xl:h-[500px] 2xl:h-[600px] w-full">
      <Carousel leftControl="" rightControl="">
        {data.map((banner, i) => (
          <img
            key={i}
            src={banner}
            alt="Banner Image"
            className="h-full w-full object-contain"
          />
        ))}
      </Carousel>
    </div>
  );
}
