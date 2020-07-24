import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddComment from '../AddComment/AddComment';

export default class CommentList extends Component {

    state = {
        comments: []
      };
    
      componentDidMount = () => {
        this.getData();
      };
    
      getData = () => {

        axios
          .get(`/server/comment`)
          .then(response => {
              console.log("testeTste",response)
            this.setState({
                sunsets: response.data
            });
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
                        </h3>
                    </div>
                );
            })}
        </div>
        );
    }
}
