import React, { Component } from 'react';
import axios from 'axios';

export default class AddComment extends Component {

    state = {
        //name: '',
        commentfromuser: '',
      };

      handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name] : value
        });
        
    }; 


    handleSubmit = event => {
        event.preventDefault();
        const { commentfromuser } = this.state;
    const id = this.props.match.params.spotId;
        axios
          .post(`/server/comment/new/${id}`, {
            comment: commentfromuser
          })
          .then((newComment) => {
            this.props.getData();
            this.props.hideForm();
          })
          .catch(err => {
            console.log(err);
          });
      };
      render() {
        return (

    <div>
      <h2>Add a new comment </h2>
      <form onSubmit={this.handleSubmit}>
        <label> Whats your comment about this spot? </label>
            <input
            type="text"
            id="comment"
            name="commentfromuser"
            value={this.state.commentfromuser}
            onChange={this.handleChange}
            />
        <input type="submit" value="Add"/>
      </form>
    </div>

        );
    } 
}