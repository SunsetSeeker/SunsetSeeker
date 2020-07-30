import React, { Component } from "react";
import { FaStar } from 'react-icons/fa';
import axios from "axios";
import "./Favorites.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faStar,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";

const heart = <FontAwesomeIcon icon = { faHeart } />;



export default class Favorites extends Component { 
    state={
        favorite: false,
        likes: this.props.likes,
    }

    handleFavorites = () => {
        axios
        .put(`/server/list/favorites/${this.props.spotId}`)
        .then((res) => {
            console.log(res.data, "RESPONSE");
        this.setState({
          likes: res.data.likes,
        favorite: true,
        })
        });
    }

    render() {
      return (
        <div>
          <button
            onClick={ this.handleFavorites }
            className= {this.state.favorite === true ? "FavoriteActive" : "Favorite"} 
            >
        { heart } 
        </button>
        </div>
          );
    }
};

