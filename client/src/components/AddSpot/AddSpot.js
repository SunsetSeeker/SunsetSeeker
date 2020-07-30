import * as React from "react";
// import './AddSpot.css';
import { Component } from "react";
import axios from 'axios'; 
import { FaPen } from 'react-icons/fa';
// import FileInput from './FileInput'; 
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
    file:[], 
    uploadText: "Choose a photo", 
    viewport: {
      latitude: 52,
      longitude: 13,
      zoom: 10,
      width: 600,
      height: 400,
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
          width: 600,
          height: 400,
          zoom: 10,
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
    this.setState({
      // uploadOn:true, 
      uploadText:"It's uploading.."
    }); 
    console.log(element);
    const uploadData=new FormData();
    console.log("SHOW ME THIS"+element.target) 
    uploadData.append("img", element.target.files[0]); 
    // for (var x=0; x<element.target.file.length; x++) {
    //   uploadData.append("img", element.target.file[x])
    // }
    console.log("THIS IS HAPPENING")
    axios
    .post("/server/list/upload", uploadData)
    .then(response =>{
      this.setState({
        file:[...this.state.file,response.data.secure_url], 
        // uploadOn: false, 
        uploadText: "Upload successful."
      })
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
      //added this again in order to check file upload to Mongo
      this.setState({
        title:" ", 
        description:" ", 
        file: " ", 
      })        
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
  removeFile(f) {
    this.setState({file:this.state.file.filter((x) => x!==f)}); 
  }
  render(){
    const { viewport, marker } = this.state;
    // console.log(this.state.file)
    // console.log(viewport, marker)
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
            required
            />
        <label>Tell us more about the place:</label>
            <input
            type="text"
            id="description"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            />
            <div className="fileInput">
              <label htmlFor="image" className="editButton">
                <FaPen />
              </label>
              <input 
              type="file" 
              id="photo"
              name="photo"
              data-cloudinary-field="img_id"
              //style={{display: "none"}}
              // onChange={this.handleFile}
              onChange={(event)=> this.handleFile(event)}
              />
              {this.state.uploadText}
              {this.state.uploadText=="It's uploading.." && (
              <div className="bouncing-loader">
              <div></div>
              <div></div>
              <div></div>
              </div>              
              )}
              <br/>
              <br/>
              {/* {this.state.file.map((f) => (
                <div className="filepreview" onClick={this.removeFile.bind(this, f)}>{f.name}</div>
              ))} */}
              {/* showing the pictures when uploaded: */}
              {this.state.file.length !==0 && this.state.file.map(pic=>{
                return <>
                <img src={pic} style={{width: "100px"}}></img>
                </>
              })}
          </div>
          {/* <FileInput handleFile={this.handleFile} /> */}
              {this.state.uploadText!=="It's uploading.." && (
               <button type="submit" value="Add"> Add this spot</button> 
              )}
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