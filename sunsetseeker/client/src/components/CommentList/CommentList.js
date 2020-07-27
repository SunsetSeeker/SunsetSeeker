import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddComment from '../AddComment/AddComment';

export default class CommentList extends Component {

    state = {
        comments: [],
        message: "",
      };
    
      componentDidMount = () => {
        this.getData();
      };
    
      getData = () => {

        axios
          .get(`/server/commentlist/${this.props.spotId}`)
          .then(response => {
              console.log("teste teste",response)
              if(response.data.length == 0) {
                this.setState({
                  message: "no comments",
              });
              } else {
                this.setState({
                  comments: response.data,
              });
              }
          })
          .catch(err => {
            console.log("error",err);
          });
      };

   render() {
     return (
       <div>
        <h1> Test </h1> 
        {this.state.message && <p>{this.state.message}</p>}
        { this.state.comments.map(comment => {
          return (
            <p key={comment._id}>{comment.text}</p>
          )
        }) } 
      </div>
     )

   }
}