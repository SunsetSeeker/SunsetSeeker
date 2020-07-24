import React, {Component} from "react";
import axios from "axios";
// import { Button } from 'react-bootstrap';
//import EditSpot from '../EditSpot/EditSpot';
import SpotList from '../SpotList/SpotList';
import AddComment from '../AddComment/AddComment';
import Rating from '../Rating/Rating';


export default class SpotDetails extends Component {

    state= {
        spot: null,
        title: "", 
        description: "",
        commentForm: false,
        rating: 0,
          }; 

deleteProject = () => {
    const id = this.props.match.params.spotId;
    axios.delete(`/server/list/${id}`)
        .then(() => {
        this.props.history.push(`/list`);
        })

    }              

    handleChange = event => {
        const { title, description } = event.target;
        this.setState({
            [title] : title
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
    }


      getData = () => {
        const id = this.props.match.params.spotId;
        console.log(id, " here ");
        axios
          .get(`/server/list/${id}`)
          .then(response => {
            console.log(response.data);
            this.setState({
              title: response.data.title,
              description: response.data.description
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

  render() {
      console.log(this.state);
    if (this.state.error) return <div>{this.state.error}</div>;

    let allowedToDelete = false;
    // const user = this.props.user;
    // const owner = this.state.project.owner;
    // if (user && user._id === owner) allowedToDelete = true;
    return (
      <div>
       
        <h1>{this.state.title}</h1>
        <p>{this.state.description}</p>

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
        
      </div>
    );
  }

}