import * as React from "react";
import { Component } from "react";
import axios from 'axios'; 
import FileInput from './FileInput'; 
import { Link } from 'react-router-dom';

import Pin from "./Pin";

import { render } from "react-dom";
import MapGL, { Marker } from "react-map-gl";

import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import ReactMapGL from "react-map-gl";


export default class AddSpot extends Component {
  state={
    title:"", 
    description:"",
    file:"", 
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

onDrop=(picture)=> {
    this.setState({
      file:this.state.file.concat(picture)
    }); 
  }   
   

  handleChange = event => {
    const name=event.target.name; 
    const value=event.target.value; 
    this.setState({
      [name]: value
    });
  }; 
  handleFile = element => {
    const uploadData=new FormData(); 
    uploadData.append("img", element.target.files[0]); 

    console.log("THIS IS THE"+element)
    this.setState({
      uploadOn:true 
    }); 
    axios
    .post("/server/list/upload", uploadData)
    .then(response =>{
      this.setState({file:response.data})
    })
    .catch(err=> console.log(err))
  };


  handleSubmit = event => {
    event.preventDefault(); 

    axios
    .post('/server/list', {
      title: this.state.title, 
      description: this.state.description,
      file: this.state.file,
      latitude: this.state.marker.latitude,
      longitude: this.state.marker.longitude,
      })
    .then((res) => {
      console.log(res.data);
      
      // this.props.getData();
      
      this.props.history.push(`/spotdetails/${res.data._id}`);           
//     })
//     .then((res) => {
//       console.log(res)
//       this.setState({
//         title:" ", 
//         description:" ", 
//         file:" ", 
//       }); 
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
        <button><Link to ={`/list`}>Go back toverview</Link></button>
      <h2>Add a new sunset location:</h2>
      <form 
      onSubmit={this.handleSubmit}
      encType="multipart/form-data"
      >
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
          <input 
          type="file" 
          id="photo"
          name="photo"
          onChange={this.handleFile}
          />
          {/* <FileInput handleFile={this.handleFile} /> */}
        <button type="submit" value="Add"> Add this spot</button>
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