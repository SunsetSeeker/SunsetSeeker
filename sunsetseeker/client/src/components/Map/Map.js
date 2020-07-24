import React from 'react'
import {Component} from 'react';
import ReactMapGL, { Marker } from "react-map-gl";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from "axios"
 
class Map extends Component {
 
  state = {
    viewport: {
      width: 800,
      height: 600,
      latitude: this.props.latitude || 52.50393297616429,
      longitude: this.props.longitude || 13.34861493215348,
      zoom: 15,
      coordinates:"",
      //place: "berlin"
    }
  };

  // getAddressCords=(address)=>{
  //   let mapboxUrl=()=>{
  //     return `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?types=address&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
  //     axios.get(mapboxUrl()).then(({data:{features}})=> {
  //       this.setState({
  //         coordinates:features[0].center
  //       }) }).catch(err=>console.log("error",err))
  // }


  // componentDidMount(){
  //    this.getAddressCords("sao paulo")
  //   //this.getAddressCords(this.state.place)
  // }
 


  render() {
    console.log("hello")
    console.log(this.state.coordinates)
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={ process.env.REACT_APP_MAPBOX_TOKEN }
        mapStyle="mapbox://styles/paolagaray/ckd03bp5n0n8e1ip8h490lib1"
        onViewportChange={(viewport) => this.setState({viewport})}
      />
    );
  }
}


export default Map;