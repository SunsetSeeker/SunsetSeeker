import React, {Component} from "react";
import axios from "axios";
import EditSpot from '../EditSpot/EditSpot';
// import SpotList from '../SpotList/SpotList';
import AddComment from '../AddComment/AddComment';
import CommentList from '../CommentList/CommentList'; 
// import Rating from '../Rating/Rating';
import { Link } from 'react-router-dom';
import Pin from "../AddSpot/Pin";
import ReactMapGL, { Marker } from "react-map-gl";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";

export default class SpotDetails extends Component {
    state= {
        spot: null,
        error: null, 
        title: "", 
        description: "",
        commentForm: false,
        rating: 0,
        editForm: false,
        img: "",
        viewport: {}, 
        latitude: "",
        longitude: "",      
        id: this.props.match.params.spotId,
    };

    deleteProject = () => {
      axios.delete(`/server/list/${this.state.id}`)
        .then(() => {
        this.props.history.push(`/list`);
        })
    }   

    
    toggleEditForm=()=> {
    //   const id = this.props.match.params.spotId;
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
      
      axios.put(`/server/list/${this.state.id}`, {
        title: this.state.title, 
        description: this.state.description, 
        img: this.state.img, 
      })
      .then(response => {
        this.setState({
          spot: response.data, 
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
        // console.log(id, " here ");
        axios
          .get(`/server/list/${this.state.id}`)
          .then(response => {
            console.log("this is the axios response", response.data);
            this.setState({
              spot: response.data, 
              title: response.data.title,
              description: response.data.description,
              latitude: response.data.latitude,
              longitude: response.data.longitude,
              
              viewport: {
                latitude: response.data.latitude,
                longitude: response.data.longitude,
                zoom: 10,
                width: 600,
                height: 400,
                coordinates:"",
              },               
              
              img: response.data.img, 
              latitude: response.data.latitude,
              longitude: response.data.longitude,              
              
            });
          })
          .catch(err => {
            console.log(err.response);
            // handle err.response depending on err.response.status
            // if (err.response.status === 404) {
            //   this.setState({ error: "Not found" });
            // }
          });
      };

  componentDidMount = () => {
      this.getData();
      console.log("component did mount", this.state)
  };

  exitEditing=()=> {
      this.setState({
      editForm: !this.state.editForm
    })
  }; 

  render() {
    console.log(this.state);
    if (this.state.error) return <div>{this.state.error}</div>;
    if (!this.state.viewport) return <div>Loading..</div>;
    if (!this.state.spot) return (<></>) 


    let allowedToDelete = false;
    let allowedToEdit = false; 
    const user = this.props.user;
    // console.log(`this is the spot ${this.state.spot}`); 
    const owner = this.state.spot.owner;
    if (user && user._id === owner) allowedToDelete = true;
    if (user && user._id === owner) allowedToEdit = true; 
    console.log(`this is the user ${user._id}`);  
    console.log(`this is the owner ${owner}`); 
    return (
    <div>
      <Link to ={`/list`}>Go back to full list</Link>

     
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        <img src={this.state.img} style={{width:"100px"}} alt="cannot be shown"/>

        {allowedToDelete && (
          <button variant='danger' onClick={this.deleteProject}> Delete Spot </button>
        )}
         {allowedToEdit && (
          <button variant='danger' onClick={this.toggleEditForm}> Edit Spot </button>
        )}



        {/* <button onClick={this.toggleEditForm}> Edit Sunset Spot </button> */}
        {/* <button onClick={this.deleteProject}> Delete Spot </button> */}
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

            <h1>Comments: </h1>
                {/* <CommentList/> */}



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

            <h2> Comments </h2>

            <CommentList spotId={this.state.id} />
        
        
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



      <div> Map

        <ReactMapGL
            {...this.state.viewport}
            mapboxApiAccessToken={ process.env.REACT_APP_MAPBOX_TOKEN }
            mapStyle="mapbox://styles/paolagaray/ckd0bdux30v981ilig8zxzd8p"
            onViewportChange={(viewport) => this.setState({viewport})}
        > 
            <Marker
                    latitude = {this.state.latitude}
                    longitude =  {this.state.longitude}
                    offsetTop={-20}
                    offsetLeft={-10}
                  >
                    <Pin size={20} />
            </Marker>
        </ReactMapGL>
        
        <h6>Latitud: {this.state.viewport.latitude} </h6>
        <h6>Longitud: {this.state.viewport.longitude} </h6>

        </div>

      </div>
    );
  }
}