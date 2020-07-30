import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddSpot from '../AddSpot/AddSpot';
import MapGL, { Marker, GeolocateControl} from "react-map-gl";
import Pin from "../AddSpot/Pin";
import "./SpotList.scss";


import DeckGL, { GeoJsonLayer } from "deck.gl";
import Geocoder from "react-map-gl-geocoder";



 import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
 import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';


export default class SpotList extends Component {
  
    state = {
        sunsets: [],
        viewport: {
          latitude: 52.5200,
          longitude: 13.4050,
          zoom: 10,
          width: 500,
          height: 300,
          coordinates:"",
         },
         searchResultLayer: null
      };

      mapRef = React.createRef();

      handleOnResult = event => {
        this.setState({
          searchResultLayer: new GeoJsonLayer({
            id: "search-result",
            data: event.result.geometry,
            getFillColor: [255, 0, 0, 128],
            getRadius: 1000,
            pointRadiusMinPixels: 10,
            pointRadiusMaxPixels: 10
          })
        })
      }

      geocoder = new MapboxGeocoder({
        accessToken: process.env.REACT_APP_MAPBOX_TOKEN,
       // mapboxgl: mapboxgl
      });


      componentDidMount = () => {
        this.getData();
        // map.addControl(
        //   geocoder
        //   );
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
      const geolocateStyle ={
        float: 'left',
        margin: '15px',
        padding: '5px'
      };

      const { viewport, searchResultLayer} = this.state;

    return(
        <div className="list">
            <h3> List of Views next to the location </h3>
                {this.state.sunsets.map(sunset => {
                    return (
                        <div className="sunset-card" key={sunset._id}>
                            <table>
                                <tr>

                                  <td>
                                  <img className="sunset-list-img" src={ sunset.img[0] } style={{width:"100px"}} alt="pic"/>
                                  </td>
                                  
                                  <td>
                                      <h4 className="sunset-title-list">{sunset.title}</h4>
                                  </td>
                                  
                                  <td>
                                      <Link  to={`/spotdetails/${sunset._id}`}> <button id="sunset-list-btn" className="part" variant="danger">See details</button></Link>
                                  </td>

                                </tr>
                            </table>
                        </div>
                    );
                })}

                <br/>

            <MapGL
               ref={this.mapRef}
                {...this.state.viewport}
                mapboxApiAccessToken={ process.env.REACT_APP_MAPBOX_TOKEN }
                mapStyle="mapbox://styles/paolagaray/ckd0bdux30v981ilig8zxzd8p"
                onViewportChange={(viewport) => this.setState({viewport})}
            >

            <GeolocateControl
                      style={geolocateStyle}
                      positionOptions={{enableHighAccuracy: true}}
                      trackUserLocation={true}
                    />

            <Geocoder 
                      mapRef={this.mapRef}
                      onResult={this.handleOnResult}
                      onViewportChange={(viewport) => this.setState({viewport})}
                      mapboxApiAccessToken={ process.env.REACT_APP_MAPBOX_TOKEN }
                      position='top-right'
              />
            
            {this.state.sunsets.map(sunset => 
                <Marker 
                  key={sunset._id}
                  longitude={ sunset.longitude }
                  latitude={ sunset.latitude }
                  >
                   {/* <Pin size={5} /> */}

                   {/* <button class="marker-btn">
                    <img src = { sunset.img } alt="sunset icon" />
                   </button> */}
                   
                   <Link to={`/spotdetails/${sunset._id}`}>
                   <img className="marker-btn-img" src = { sunset.img[0] } alt="sunset icon" />
                  </Link>
                </Marker>
            )} 
            
            </MapGL>
                <Link  to ='/addSpot'> <button className="part" variant="danger">Add a new sunset</button></Link>
            <br/><br/>

        </div>
        );
    }
}