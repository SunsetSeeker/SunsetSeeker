import React, { Component } from 'react';
import './Profile.css'
import axios from "axios";
import Favorite from '../Favorites/Favorites';



export default class Profile extends Component {
  state={
    user: {}
  }

componentDidMount() {
  axios.get("/server/list/favorites")
  .then(response => this.setState({ user: response.data}))
}

  render() {
    if(!this.state.user.favorites) return <div> loading.. </div>
    return(
        <div>
            {this.state.user.favorites.map(place => {
              return (
                <div>
                <p>{place.title}</p>
                // <Favorite spotId={place._id} />
                </div>
              )
            })}
        </div>
      )
    }
  }; 
 
