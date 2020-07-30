import React from "react";
import axios from "axios";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import slide1 from "./carousel1.jpg";
import slide2 from "./carousel2.jpg";
import slide3 from "./carousel3.jpg";
import slide4 from './carousel4.jpg'; 
import slide5 from "./carousel5.jpg";
import slide6 from "./carousel6.jpg";
import slide7 from './carousel7.jpg'; 
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
        <div>
          <img src={slide4} />
        </div>
        <div>
          <img src={slide5} />
        </div>
        <div>
          <img src={slide6} />
        </div>
        <div>
          <img src={slide7} />
        </div>
      </Carousel>
    );
  }
}
export default CarouselSlideshow;