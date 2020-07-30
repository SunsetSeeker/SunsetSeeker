import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import CarouselSlideshow from "./CarouselSlideshow";

// import Slideshow from "./Slideshow";
// import slide1 from "./carousel1.jpg";
// import slide2 from "./carousel2.jpg";
// import slide3 from "./carousel3.jpg";
// import slide4 from './carousel4.jpg'; 
// import Carousel from "./CarouselSlideshow";
// const s = {
//   container: "screenW screenH dGray col",
//   main: "flex8 white",
// };
// const slides = [slide1, slide2, slide3, slide4];


export default class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="home-text">
          <h2 className="heading">Are you a <span className="underline--magical">sunset lover?</span></h2>
          {/* <span>🌞</span> */}
          <p>
            Use <b>suncatcher</b> to discover the best sun spots.
          </p>
          <br />
          <Link to={`/list`}>
            <button className="explore" variant="danger">
              Start exploring!
            </button>
          </Link>
        </div>
        <div className="home-slideshow">
          <CarouselSlideshow />
        </div>
      </div>
    );
  }
}