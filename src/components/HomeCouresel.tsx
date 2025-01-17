"use client";

import { Carousel } from "flowbite-react";
import i1 from "../assets/HLBanner.jpeg";
import i2 from "../assets/HLBanner.jpeg";

const data = [i1, i2];

export function HomeCouresel() {
  return (
    <div className="relative h-full sm:h-64 md:h-[700px] xl:h-96 2xl:h-96 w-full">
      <Carousel leftControl="" rightControl="">
        {data.map((banner, i) => {
          return (
            <img
              key={i}
              src={banner}
              alt="..."
              className="h-full w-full"
            />
          );
        })}
      </Carousel>
    </div>
  );
}