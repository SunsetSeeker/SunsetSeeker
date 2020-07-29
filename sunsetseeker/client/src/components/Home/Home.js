import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 
import Slideshow from "./Slideshow";
import slide1 from "./carousel1.jpg";
import slide2 from "./carousel2.jpg";
import slide3 from "./carousel3.jpg";

const s = {
  container: "screenW screenH dGray col",
  main: "flex8 white",
};
const slides = [slide1, slide2, slide3];

export default class Home extends Component {
render() {
  return (
    <div className="home">
        <br/>
        <h3>You're a sunset lover?</h3>
        {/* <span>🌞</span> */}
        <p>Use <b>sunsetseeker</b> to discover the best suns spots.</p>
        <button variant="danger"><Link to ={`/list`} style={{textDecoration: "none", color:"white"}}>Start exploring!</Link></button>
        <br/>
        <p>  </p>
        <div className={s.container}>
                <div className={s.main}>
                    <Slideshow slides={slides} />
                </div>
        </div>

    </div>
  )
 }
}