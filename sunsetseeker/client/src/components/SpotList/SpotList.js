import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddSpot from '../AddSpot/AddSpot';
import ReactMapGL, { Marker } from "react-map-gl";
import Pin from "../AddSpot/Pin";


export default class SpotList extends Component {
  
    state = {
        sunsets: [],
        viewport: {
          latitude: 52.5200,
          longitude: 13.4050,
          zoom: 10,
          width: 600,
          height: 400,
          coordinates:"",
         } 
      };
      
      componentDidMount = () => {
        this.getData();
      };

      getData = () => {

        axios
          .get('server/list')
          .then(response => {
              console.log("sunsets list:",response.data)
            this.setState({
                sunsets: response.data,
            });
            console.log(this.state)
          })
          .catch(err => {
            console.log("error",err);
          });
      };

    render() {

    return(
        <div>
            <h2> List of Views next to the location </h2>
                {this.state.sunsets.map(sunset => {
                    return (
                        <div key={sunset._id}>
                            <h3>
                                <Link to={`/spotdetails/${sunset._id}`} > {sunset.title}</Link>
                                <span> <br/> <img src={sunset.img} style={{width:"100px"}}/></span>
                            </h3>
                        </div>
                    );
                })}
            

            <ReactMapGL
                {...this.state.viewport}
                mapboxApiAccessToken={ process.env.REACT_APP_MAPBOX_TOKEN }
                mapStyle="mapbox://styles/paolagaray/ckd0bdux30v981ilig8zxzd8p"
                onViewportChange={(viewport) => this.setState({viewport})}
            >

          
              {/* <Marker
                longitude={this.state.viewport.longitude}
                latitude={this.state.viewport.latitude}
                offsetTop={-20}
                offsetLeft={-10}
  
              >
    <Pin size={20} />
            </Marker> */}
            
            {this.state.sunsets.map(sunset => 
                <Marker 
                  key={sunset._id}
                  longitude={ sunset.longitude }
                  latitude={ sunset.latitude }
                  >
                   <Pin size={20} />
                   {/* <button class="marker-btn">
                    <img src = "/logo192.png" alt="sunset icon" />
                   </button> */}
                </Marker>
            )} 

            </ReactMapGL>

            <br/><br/>
            <button><Link to ={`/addSpot`}> Add a new Spot</Link></button>


        </div>
        );
    }
}