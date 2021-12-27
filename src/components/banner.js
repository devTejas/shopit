import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const Banner = () => {
  return (
    <div className="relative">
      <div className="absolute w-full bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoplay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img loading="lazy" src="/assets/slide1.jpg" alt="scrollable-api" />
        </div>
        <div>
          <img loading="lazy" src="/assets/slide2.jpg" alt="scrollable-api" />
        </div>
        <div>
          <img loading="lazy" src="/assets/slide3.jpg" alt="scrollable-api" />
        </div>
      </Carousel>
    </div>
  );
};

export default Banner;
