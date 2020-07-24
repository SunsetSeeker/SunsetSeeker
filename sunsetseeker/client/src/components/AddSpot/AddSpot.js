import * as React from "react";
import { Component } from "react";
import axios from 'axios'; 

import Pin from "./Pin";

import { render } from "react-dom";
import MapGL, { Marker } from "react-map-gl";

import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import ReactMapGL from "react-map-gl";


export default class AddSpot extends Component {
  state={
    title:"", 
    description:"",

    viewport: {
      latitude: 52,
      longitude: 13,
      zoom: 15,
      width: 800,
      height: 600,
      coordinates:"",
    },
    marker: {
      latitude: 52.5196,
      longitude: 13.4069,
    },
    events: {},

  }; 



  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition((response) => {
      this.setState({
        viewport: {
          latitude: response.coords.latitude,
          longitude: response.coords.longitude,
          width: 800,
          height: 600,
          zoom: 15,
        },
        marker: {
          latitude: response.coords.latitude,
          longitude: response.coords.longitude,
        },
      });
    });
  };



  handleChange = event => {
    const name=event.target.name; 
    const value=event.target.value; 
    this.setState({
      [name]: value
    });
  }; 



  handleSubmit = event => {
    event.preventDefault(); 

    axios
    .post('/server/list', {
      title: this.state.title, 
      description: this.state.description,

      latitude: this.state.marker.latitude,
      longitude: this.state.marker.longitude,

    })
    .then((res) => {
      console.log(res.data);
      
      // this.props.getData();
      
      this.props.history.push(`/spotdetails/${res.data._id}`); 
    })
    .catch(err => {
      console.log(err); 
    });
  };


  _updateViewport = (viewport) => {
    this.setState({ viewport });
  };


  _logDragEvent(name, event) {
    this.setState({
      events: {
        ...this.state.events,
        [name]: event.lngLat,
      },
    });
  }


  _onMarkerDragStart = (event) => {
    this._logDragEvent("onDragStart", event);
  };

  _onMarkerDrag = (event) => {
    this._logDragEvent("onDrag", event);
  };

  _onMarkerDragEnd = (event) => {
    this._logDragEvent("onDragEnd", event);
    this.setState({
      marker: {
        longitude: event.lngLat[0],
        latitude: event.lngLat[1],
      },
    });
  };



  render(){
    const { viewport, marker } = this.state;
    console.log(viewport, marker)
    return(
      <div>
      <h2>Add a new sunset location:</h2>
      <form onSubmit={this.handleSubmit}>
        <label>Name of the place:</label> 
            <input 
            type="text" 
            id="title"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
            />
        <label>Tell us more about the place:</label>
            <input
            type="text"
            id="description"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            />
        <input type="submit" value="Add"/>
      </form>
      <br/><br/><br/>

      <div>
      <ReactMapGL
        {...this.state.viewport}
        mapStyle="mapbox://styles/paolagaray/ckd0bdux30v981ilig8zxzd8p"
        onViewportChange={(viewport) => this.setState({viewport})}
        mapboxApiAccessToken={ process.env.REACT_APP_MAPBOX_TOKEN }
      >
        <span className="DragAndDrop MediumTextBold">
            Drag and drop the pin to spot a hidden place
        </span>
          
          
            <Marker
                longitude={marker.longitude}
                latitude={marker.latitude}
                offsetTop={-20}
                offsetLeft={-10}
                draggable
                onDragStart={this._onMarkerDragStart}
                onDrag={this._onMarkerDrag}
                onDragEnd={this._onMarkerDragEnd}
              >
                <Pin size={20} />
            </Marker>
          

      </ReactMapGL>
      </div>

      </div>
    )
  }
}