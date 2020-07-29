import React, { Component } from 'react';
import './Profile.css'
import axios from "axios";
import Favorites from '../Favorites/Favorites';
import SpotDetails from '../SpotDetails/SpotDetails';
import StarRating from '../Rating/StarRating';



export default class Profile extends Component {
  state={
    user: {}
  }

  

componentDidMount() {
  axios.get("/server/list/favorites")
  .then(response => this.setState({ user: response.data}))  
}

  render() {
    console.log(this.state.user.favorites)
    if(!this.state.user.favorites) return <div> loading.. </div>
    return(
        <div>
            {this.state.user.favorites.map(place => {
              return (
                <div>
                  <p>{place.title}</p>
                  <img className="images" src = { place.img } alt="sunset icon" />
                  <StarRating spotId={place.id} rating={place.rating} />
                </div>
              )
            })}
        </div>
      )
    }
  }; 
 
