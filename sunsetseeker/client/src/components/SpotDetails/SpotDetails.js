import React, {Component} from "react";
import axios from "axios";
// import { Button } from 'react-bootstrap';
import EditSpot from '../EditSpot/EditSpot';
import SpotList from '../SpotList/SpotList';
import AddComment from '../AddComment/AddComment';
import Rating from '../Rating/Rating';
import { Link } from 'react-router-dom';

import ReactMapGL, { Marker } from "react-map-gl";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default class SpotDetails extends Component {
    state= {
        spot: null,
        title: "", 
        description: "",
        latitude: "",
        longitude: "",
        commentForm: false,
        rating: 0,
        editForm: false,
        img: "", 
    };

    deleteProject = () => {
      const id = this.props.match.params.spotId;
      axios.delete(`/server/list/${id}`)
        .then(() => {
        this.props.history.push(`/list`);
        })

    }    
    
    toggleEditForm=()=> {
      const id = this.props.match.params.spotId;
      // console.log(id); 
      this.setState({
        editForm: !this.state.editForm
      })
    }; 

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name] : value
        });
    };

    handleClick = () => {
        this.setState({
          rating: this.state.rating + 1,
        });
      };

   toggleCommentForm = () => {
        this.setState({
            commentForm: !this.state.commentForm
        })
      }; 
   
    handleSubmit = event => {
      event.preventDefault(); 
      const id=this.props.match.params.spotId; 
      axios.put(`/server/list/${id}`, {
        title: this.state.title, 
        description: this.state.description, 
        img: this.state.img, 
      })
      .then(response => {
        this.setState({
          title: response.data.title, 
          description: response.data.description, 
          editForm: false, 
          img: this.state.img, 
        })
      })
      .catch(err => {
        console.log(err); 
      })
  
    }

    getData = () => {
        const id = this.props.match.params.spotId;
        // console.log(id, " here ");
        axios
          .get(`/server/list/${id}`)
          .then(response => {
            // console.log(response.data);
            this.setState({
              title: response.data.title,
              description: response.data.description,
              img: response.data.img, 
              latitude: response.data.latitude,
              longitude: response.data.longitude,
            });
          })
          .catch(err => {
            console.log(err.response);
            // handle err.response depending on err.response.status
            if (err.response.status === 404) {
              this.setState({ error: "Not found" });
            }
          });
      };

  componentDidMount = () => {
      this.getData();
  };

  exitEditing=()=> {
      this.setState({
      editForm: !this.state.editForm
    })
  }; 

  render() {
      console.log(this.state);
    if (this.state.error) return <div>{this.state.error}</div>;

    let allowedToDelete = false;
    // const user = this.props.user;
    // const owner = this.state.project.owner;
    // if (user && user._id === owner) allowedToDelete = true;
    return (
    <div>
      <Link to ={`/list`}>Go back to full list</Link>
     
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        <img src={this.state.img} style={{width:"100px"}} alt="cannot be shown"/>

        {allowedToDelete && (
          <button variant='danger' onClick={this.deleteSpot}> Delete Project </button>
        )}

        <button onClick={this.toggleEditForm}> Edit Sunset Spot </button>
        <button onClick={this.deleteProject}> Delete Spot </button>
        <button onClick={this.toggleCommentForm}> Add a Comment </button>
            
            {this.state.commentForm && (
                <AddComment
                    spotId = { this.state._id }
                    getData = { this.getData }
                    hideForm = {() => this.setState({ commentForm: false })}
                    {...this.props}
                />
            )}

            { this.state.commentForm }

            <h1> Rate this Spot </h1>
            <br/>
            <button
                onClick={this.handleClick}
                style={{
                    fontSize: "30px",
                    width: "200px",
                    height: "80px",
                    // backgroundColor: `${this.state.buttonColors[this.state.likeCounter]}`
                }}
                >
                {this.state.rating} Stars
            </button>
        
        {this.state.editForm && (
          <div><br/>
            <button onClick={this.exitEditing}>Exit editing</button>
          <EditSpot
          {...this.state}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          />
          
          </div>
        )}
      </div>
    );
  }
}
