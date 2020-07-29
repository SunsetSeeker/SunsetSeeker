import React, { Component } from "react";
import { FaStar } from 'react-icons/fa';
import axios from "axios";
import "./StarRating.scss";
export default class Favorite extends Component { 
    state={
        rating: 0,
        hover: 0
    }
    handleHover = (value) => {
        this.setState({
            hover: value
        })
    }
    getAverageRating = (arrRating) => arrRating.reduce((a,v) => a + v,0) / arrRating.length;
    handleRating = (event) => {
        console.log(event.target.value) 
    axios
        .put(`/server/list/rating/${this.props.spotId}`, {
            rating: event.target.value,
        })
        .then((res) => {
            console.log(res, "RESPONSE");
        this.setState({
            rating: this.getAverageRating(res.data.rating)
        })
        });
    }
    componentDidMount() {
        this.setState({
            rating: this.getAverageRating(this.props.rating),
        })
    }
    render() {
return (
      <div>
        {[ ... Array(5)].map((star, i) => {
            const ratingValue = i + 1; 
            return (
                <label>
                    <input 
                        className='ratingstars'
                        type='radio' 
                        name='rating' 
                        value={ratingValue}
                        onClick = {(event) => this.handleRating(event)}
                         />
                    <FaStar 
                        className='star' 
                        color={ratingValue <= (this.state.hover || this.state.rating) ? "#ffc107" : "#e4e5e9"} 
                        size={60} 
                        onMouseEnter = {() => this.handleHover(ratingValue)}
                        onMouseLeave = {() => this.handleHover(null)}
                    />;
                </label> 
            );
        })}
      </div>
    );
    }
};