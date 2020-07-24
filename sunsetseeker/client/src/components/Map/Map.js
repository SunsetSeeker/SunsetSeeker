import React from 'react'
import {Component} from 'react';
import ReactMapGL, { Marker } from "react-map-gl";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

 
class Map extends Component {
 
  state = {
    viewport: {
      width: 800,
      height: 600,
      latitude: 52.50393297616429,
      longitude: 13.34861493215348,
      zoom: 8
    }
  };
 
  render() {
    return (
      <ReactMapGL
        {...this.state.viewport}
        mapboxApiAccessToken={ process.env.REACT_APP_MAPBOX_TOKEN }
        onViewportChange={(viewport) => this.setState({viewport})}
      />
    );
  }
}

export default Map;