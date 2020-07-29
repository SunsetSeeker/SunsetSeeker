import React from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import slide1 from "./carousel1.jpg";
import slide2 from "./carousel2.jpg";
import slide3 from "./carousel3.jpg";

class CarouselSlideshow extends React.Component {
  render() {
    return (
      <Carousel
        autoPlay
        showThumbs={false}
        showArrows={false}
        showIndicators={false}
        showStatus={false}
      >
        <div>
          <img src={slide1} />
        </div>
        <div>
          <img src={slide2} />
        </div>
        <div>
          <img src={slide3} />
        </div>
      </Carousel>
    );
  }
}

export default CarouselSlideshow;
