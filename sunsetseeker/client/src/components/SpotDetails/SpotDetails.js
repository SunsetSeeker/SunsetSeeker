import React, {Component} from "react";
import axios from "axios";
import EditSpot from '../EditSpot/EditSpot';
// import SpotList from '../SpotList/SpotList';
import AddComment from '../AddComment/AddComment';
import CommentList from '../CommentList/CommentList'; 
import { Link } from 'react-router-dom';
import StarRating from '../Rating/StarRating';  
import ReactMapGL, { Marker } from 'react-map-gl';
// import Rating from '../Rating/Rating';
import Pin from "../AddSpot/Pin";
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
        img: [],
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

    deleteImage = (singleImg) => {
      let newImgArr = this.state.img.filter(img => img !== singleImg)
      console.log("this is executed", this.state.img, singleImg, newImgArr)
      axios.put(`/server/list/deletepic/${this.state.id}`, {picUrl: newImgArr})
      .then((sunset)=>{
        console.log("updated:", sunset)
        this.setState({
          img: newImgArr
        })
      })
    }
    // handleRating = (value) => {
    //   const newRating = (this.state.rating + value) / 2;
    //   axios
    //     .put(`/rating/${props.match.params.id}`, {
    //       rating: newRating,
    //     })
    //     .then((res) => setRating(res.data.rating));
  
    //   // console.log(value);
    // };

    onDrop=(picture)=> {
      this.setState({
        img:this.state.img.concat(picture)
      }); 
    }  

    handleFile = element => {    
      this.setState({
        // uploadOn:true, 
        uploadText:"It's uploading.."
      }); 
      console.log(element);
      const uploadData=new FormData();
      console.log("SHOW ME THIS"+element.target) 
      uploadData.append("img", element.target.files[0]); 
      axios
      .post("/server/list/upload", uploadData)
      .then(response =>{
        this.setState({
          img:[...this.state.img,response.data.secure_url], 
          // uploadOn: false, 
          uploadText: "Upload successful."
        })
      })
      .catch(err=> console.log(err))
    };


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
        // setRating(response.data.rating);
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
              rating: response.data.rating,
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
      // console.log("component did mount", this.state)
  };

  exitEditing=()=> {
      this.setState({
      editForm: !this.state.editForm
    })
  }; 

  render() {
    // console.log(this.state);
    console.log("This state:", this.state)
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
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>
        {/* <img src={this.state.img} style={{width:"100px"}} alt="pics"/> */}
        {this.state.img.map(singleImg => {
                    return (
                    <div key={singleImg._id}><span> 
                    <br/> 
                    <img src={singleImg} style={{width:"100px"}} alt="pic"/></span>
                    </div>
                    );
                })}

        {allowedToDelete && (
          <button variant='danger' onClick={this.deleteProject}> Delete Spot </button>
        )}
         {allowedToEdit && (
          //  <div>
          //  <button varian='danger'>
          //    <Link 
          //    to={`/edit/${this.state.id}`} 
          //    title={this.state.title}
          //    style={{ textDecoration: 'none' }} 
          //   > Edit Spot </Link>
          //  </button>
          // </div>
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


            <h1> Rate this Spot </h1>
            <br/>
           

            <StarRating spotId={this.state.id} rating={this.state.rating} />

        <h2> Comments </h2>
        <CommentList spotId={this.state.id} />
        


        
        
        {this.state.editForm && (
          <div><br/>
            <button onClick={this.exitEditing}>Exit editing</button>
            <EditSpot
            {...this.state}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit} 
            deleteImage={this.deleteImage}
            handleFile={this.handleFile}
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
        
        <h6>Latitude: {this.state.viewport.latitude} </h6>
        <h6>Longitude: {this.state.viewport.longitude} </h6>

        </div>

      </div>
    );
  }
}