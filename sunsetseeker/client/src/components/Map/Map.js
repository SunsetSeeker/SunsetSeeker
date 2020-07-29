import React from 'react'
import {Component} from 'react';
import mapboxgl from 'mapbox-gl';
import ReactMapGL, { Marker } from "react-map-gl";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from "axios"

import MapBoxGLDraw from '@mapbox/mapbox-gl-draw'
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'


 
class Map extends React.Component {


 
  componentDidMount() {

    // Creates new map instance
    const map = new mapboxgl.Map({
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      container: this.mapWrapper,
      style: 'mapbox://styles/mapbox/streets-v10',
      center: [-73.985664, 40.748514],
      zoom: 12
    });


    const draw = new MapBoxGLDraw()
    
    // {
    //   displayControlsDefault: true,
    //   controls: {
    //     line_string: true,
    //     trash: true,
    //   },
    //   styles: [
    //     // ACTIVE (being drawn)
    //     // line stroke
    //     {
    //       id: 'gl-draw-line',
    //       type: 'line',
    //       filter: ['all', ['==', '$type', 'LineString'], ['!=', 'mode', 'static']],
    //       layout: {
    //         'line-cap': 'round',
    //         'line-join': 'round',
    //       },
    //       paint: {
    //         'line-color': '#3b9ddd',
    //         'line-dasharray': [0.2, 2],
    //         'line-width': 4,
    //         'line-opacity': 0.7,
    //       },
    //     },
    //     // vertex point halos
    //     {
    //       id: 'gl-draw-polygon-and-line-vertex-halo-active',
    //       type: 'circle',
    //       filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
    //       paint: {
    //         'circle-radius': 10,
    //         'circle-color': '#FFF',
    //       },
    //     },
    //     // vertex points
    //     {
    //       id: 'gl-draw-polygon-and-line-vertex-active',
    //       type: 'circle',
    //       filter: ['all', ['==', 'meta', 'vertex'], ['==', '$type', 'Point'], ['!=', 'mode', 'static']],
    //       paint: {
    //         'circle-radius': 6,
    //         'circle-color': '#3b9ddd',
    //       },
    //     },
    //   ],
    // });


    // Creates new directions control instance
    const directions = new MapboxDirections({
      accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
      unit: 'metric',
      profile: 'mapbox/driving',
    });

    // Integrates directions control with map
    map.addControl(directions, 'top-left');
    map.addControl(draw, "top-right")
  }

  render() {
    return (
      // Populates map by referencing map's container property
      <div ref={el => (this.mapWrapper = el)} className="mapWrapper" />
    );
  }


}



export default Map;